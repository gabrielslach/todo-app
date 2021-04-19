import { useState, useRef, useMemo } from "react";

import { postRequest } from "./utilityFunctions";

function createColors () {
  const colors = ['green', 'blue', 'red', 'yellow', 'indigo', 'purple', 'pink','gray'];
  const levels = ['100', '300'];
  const colorVariants = [];

  
  for (const level of levels) {
    for (const color of colors) {
      colorVariants.push({color, level})
    };
  };

  return colorVariants;
};

export default function useTasks(vars) { // You could use this var to set something on the local state.

  const timeOutVar = useRef(null);
  const colorVariants = useMemo(createColors, []);

  //states
  const [queueTasks, setQueueTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  /*************** Dont edit below this line ***************/
  
  const [isLoading, setIsLoading] = useState(false);

  function startTimeout() {
    timeOutVar.current = setTimeout(function () {
    console.log("Server Timeout");
    }, 120000);
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

  const makeRequest = (req, vars = {}) => {
    var api = "";
    var dataparam = {};
    let onSuccess = () => {};
    setIsLoading(true);
    startTimeout();
    switch (req) {
      case "get":
        api += "get-tasks";
        dataparam = {};
        onSuccess = (data) => { // This is a callback that executes at post request success. i.e. data is the res.data returned by the server
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
            task.categories = taskCategories.map(item => {
                let catListId = categoriesList.indexOf(item);
                if (catListId < 0) {
                  catListId = categoriesList.length - 1;
                }
                return({colorVariant: colorVariants[catListId], label:item})
              });
              
            switch (task.taskgroup) {
              case "queue":
                queueTasks_.push(task);
                break;
              case "doing":
                doingTasks_.push(task);
                break;
              case "done":
                doneTasks_.push(task);
                break;
              default:
                break;
            };
          };

          setQueueTasks(queueTasks_);
          setDoingTasks(doingTasks_);
          setDoneTasks(doneTasks_);
        }
        break;
      case "add":
        api += "append-task";
        dataparam = {id: null, ...vars};
        onSuccess = data => {
          console.log(data)
        }
        break;
      default:
    }
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
