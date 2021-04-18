import { useState, useRef } from "react";

import { postRequest } from "./utilityFunctions";

export default function useTasks(vars) { // You could use this var to set something on the local state.

  const timeOutVar = useRef(null);

  //states
  const [tasks, setTasks] = useState([]);

  /*************** Dont edit below this line ***************/
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
    const { } = vars;
    setIsLoading(true);
    startTimeout();
    switch (req) {
      case "":
        api += "";
        dataparam = {};
        onSuccess = (data) => { // This is a callback that executes at post request success. i.e. data is the res.data returned by the server
            setTasks(data);
        }
        break;
      default:
    }
    if (req !== "" || typeof req !== "undefined") makePostRequest(req, api, dataparam, null, onSuccess);
  };

  return [
    tasks,
    makeRequest,
  ];
}
