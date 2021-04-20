import { useState, useRef, useMemo } from "react";

import { postRequest } from "./utilityFunctions";

function createColors () {
  const colors = ['green', 'blue', 'red', 'yellow', 'indigo', 'purple', 'pink'];
  const levels = ['50', '200', '400', '600', '800'];
  const colorVariants = [];

  
  for (const level of levels) {
    for (const color of colors) {
      colorVariants.push({color, level})
    };
  };

  return colorVariants;
};

const mapData = (colorVariants, setQueueTasks, setDoingTasks, setDoneTasks, setTasks = () => {}) => (data) => {
  if (!data || !data.tasks || !data.tasks.list) return;

  const queueTasks_ = [];
  const doingTasks_ = [];
  const doneTasks_ = [];

  const categoriesList = [];

  //Listing Categories
  for (const task of data.tasks.list) {
    task.categories.forEach(item=>{
      const catId = categoriesList.indexOf(item);
      if (catId < 0 && colorVariants.length > categoriesList.length) {
        categoriesList.push(item);
      }
    });
  };
  
  // Segregating tasks
  for (const task of data.tasks.list) {
    const taskCategories = task.categories;
    const task_ = {...task};
    task_.categories = taskCategories.map(item => {
        let catListId = categoriesList.indexOf(item);
        if (catListId < 0) {
          catListId = categoriesList.length - 1;
        }
        return({colorVariant: colorVariants[catListId], label:item})
      });
      
    switch (task.taskgroup) {
      case "queue":
        queueTasks_.push(task_);
        break;
      case "doing":
        doingTasks_.push(task_);
        break;
      case "done":
        doneTasks_.push(task_);
        break;
      default:
        break;
    };
  };

  setTasks(data);
  setQueueTasks(queueTasks_);
  setDoingTasks(doingTasks_);
  setDoneTasks(doneTasks_);
};

const filterFx = (field, filterTxt) => arr => {
  return arr.filter(item => ( JSON.stringify(item[field]).toLowerCase().indexOf(filterTxt.toLowerCase()) >= 0 ));
};

export default function useTasks(vars) { // You could use this var to set something on the local state.

  const timeOutVar = useRef(null);
  const colorVariants = useMemo(createColors, []);

  //states
  const [tasks, setTasks] = useState([]);
  const [queueTasks, setQueueTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  /*************** Dont edit below this line ***************/
  
  const [isLoading, setIsLoading] = useState(false);

  function startTimeout() {
    timeOutVar.current = setTimeout(function () {
    alert("Server Timeout");
    setIsLoading(false);
    }, 30000);
  }

  function stopTimeout() {
    clearTimeout(timeOutVar.current);
  }

  const onRequestSuccess = (req, resData, onSuccess) => {
    const { data, oFlag, oMessage } = resData;
    if (oFlag) {
        onSuccess(data);
    } else {
        console.log(req, ': ', oMessage);
    };
  };

  const onRequestFail = (req, status) => {
    if (status === 401 || status === 403) {
      alert('Unauthorized.')
    }

    console.log(
      "Server Error: Please contact your server administrator.",
    );

    alert(status || 'Server Error. Please reload the page.');
  
  };

  const makePostRequest = (req, api, dataparam, loginToken, onSuccess) => {
    postRequest(api, dataparam, loginToken)
      .then((res) => {
        stopTimeout();
        setIsLoading(false);
        if (res.status !== 200 && res.status !== 201) {
          onRequestFail(req, res.status);
        } else {
          onRequestSuccess(req, res.data, onSuccess);  
        }
      })
      .catch((err) => {
        stopTimeout();
        setIsLoading(false);
        onRequestFail(req, (err && err.response) ? err.response.status: '');
        console.log("makePostRequest_err: ", err);
      });
  };

  /*************** Dont edit above this line ***************/

  const makeRequest = (req, vars = {}, callback) => {
    var api = "";
    var dataparam = {};
    let onSuccess = () => {};
    setIsLoading(true);
    switch (req) {
      case "get":
        api += "get-tasks";
        dataparam = {};
        onSuccess = mapData(colorVariants, setQueueTasks, setDoingTasks, setDoneTasks, setTasks);
        break;
      case "add":
        api += "append-task";
        dataparam = {id: null, ...vars};
        onSuccess = data => {
          mapData(colorVariants, setQueueTasks, setDoingTasks, setDoneTasks, setTasks)(data);
          callback();
        }
        break;
        case "edit":
          api += "append-task";
          dataparam = vars;
          onSuccess = data => {
            mapData(colorVariants, setQueueTasks, setDoingTasks, setDoneTasks, setTasks)(data);
            callback();
          }
          break;
          case "delete":
            api += "delete-task";
            dataparam = vars;
            onSuccess = data => {
              mapData(colorVariants, setQueueTasks, setDoingTasks, setDoneTasks, setTasks)(data);
              callback();
            }
            break;
          case "filter":
            const filterField= vars.field;
            const filterTxt = vars.filterTxt;
            
            if (filterTxt === '') {
              mapData(colorVariants, setQueueTasks, setDoingTasks, setDoneTasks)(tasks);
            } else {
              setQueueTasks(filterFx(filterField, filterTxt));
              setDoingTasks(filterFx(filterField, filterTxt));
              setDoneTasks(filterFx(filterField, filterTxt));
            }
            setIsLoading(false);
            return;
      default:
    }
    startTimeout();
    if (req !== "" || typeof req !== "undefined") makePostRequest(req, api, dataparam, null, onSuccess);
  };

  return {
    queueTasks,
    doingTasks,
    doneTasks,
    isLoading,
    setTasks: makeRequest,
  };
}
