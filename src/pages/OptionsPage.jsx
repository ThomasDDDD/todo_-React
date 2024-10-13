import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

function OptionsPage() {
  const [taskObjArr, setTaskObjArr] = useState([
    { tasktype: "private", tasks: [], tasktypeId: Math.floor(Math.random() * 10000) },
    { tasktype: "job", tasks: [], tasktypeId: Math.floor(Math.random() * 10000) },
  ]);
  const [inputValueToAdd, setInputvalueToAdd] = useState("");
  const [inputValueToRem, setInputvalueToRem] = useState({});
  const inputAdd = useRef(null);

  function safeTaskList(taskObjArr) {
    localStorage.setItem("TaskList", JSON.stringify(taskObjArr));
    setInputvalueToAdd("");
  }

  function loadTaskList(taskObjArr) {
    if (localStorage.getItem("TaskList")) {
      const loadetTaskObjArr = JSON.parse(localStorage.getItem("TaskList"));
      setInputvalueToAdd("");
      return loadetTaskObjArr;
    } else {
      console.log("no data to load");
      return [...taskObjArr];
    }
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      toSetTaskObjArr();
    }
  }
  function toSetTaskObjArr() {
    if (inputValueToAdd) {
      setTaskObjArr([
        ...taskObjArr,
        { tasktype: inputValueToAdd, tasks: [], tasktypeId: Math.floor(Math.random() * 10000) },
      ]);
    }
    inputAdd.current.value = "";
  }

  useEffect(() => {
    setTaskObjArr(loadTaskList(taskObjArr));
  }, []);

  return (
    <>
      <h1>Options</h1>
      <p>Welcome, at first set up your todo task types. We pre set up "private" and "job" for you.</p>
      <input
        ref={inputAdd}
        onChange={(e) => setInputvalueToAdd(e.currentTarget.value)}
        type="text"
        placeholder="Add a Tasktype"
        onKeyDown={handleKeyDown}
      ></input>
      <button
        onClick={() => {
          toSetTaskObjArr();
        }}
      >
        Add your task type
      </button>
      <p>Or remove present from your List</p>
      <select
        value={inputValueToRem.tasktype}
        onChange={(e) => {
          setInputvalueToRem(e.target.value);
        }}
      >
        <option>Select</option>
        {taskObjArr.map((tasktypeObj) => {
          return (
            <option key={tasktypeObj.tasktypeId} value={tasktypeObj.tasktype}>
              {tasktypeObj.tasktype}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          setTaskObjArr(() => {
            const taskList = [...taskObjArr];
            const newTaskObjToDelete = taskList.find((taskObj) => taskObj.tasktype === inputValueToRem);
            const i = taskList.indexOf(newTaskObjToDelete);
            if (i !== -1) {
              taskList.splice(i, 1);
            }
            return taskList;
          });
        }}
      >
        Remove your task type
      </button>
      <button onClick={() => safeTaskList(taskObjArr)}>safe task list</button>
      <button onClick={() => setTaskObjArr(loadTaskList(taskObjArr))}>load task list</button>
      <div>
        <NavLink to="/">zurück</NavLink>
      </div>
    </>
  );
}

export default OptionsPage;
