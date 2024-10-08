import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function safeTaskList(taskListArr) {
  localStorage.setItem("TaskList", JSON.stringify(taskListArr));
}
function loadTaskList(taskListArr) {
  if (localStorage.getItem("TaskList")) {
    const loadetTaskList = JSON.parse(localStorage.getItem("TaskList"));
    return loadetTaskList;
  } else {
    console.log("no data to load");
    return [...taskListArr];
  }
}

function OptionsPage() {
  const [taskListArr, setTaskListArr] = useState(["private", "job"]);
  const [inputValue, setInputvalue] = useState("");

  useEffect(() => {
    setTaskListArr(loadTaskList(taskListArr));
  }, []);

  return (
    <>
      <h1>Options</h1>
      <p>Welcome, at first set up your todo task types. We pre set up "private" and "job" for you.</p>
      <input onChange={(e) => setInputvalue(e.currentTarget.value)} type="text" placeholder="Add a Tasktype"></input>

      <button
        onClick={() => {
          setTaskListArr([...taskListArr, inputValue]);
          console.log(taskListArr);
        }}
      >
        Add your task type
      </button>

      <p>Or remove present from your List</p>
      <select
        value={inputValue}
        onChange={(e) => {
          setInputvalue(e.currentTarget.value);
        }}
      >
        <option>Select</option>
        {taskListArr.map((task, i) => {
          return (
            <option key={i * Math.random()} value={task}>
              {task}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          setTaskListArr(() => {
            const taskList = [...taskListArr];
            console.log(inputValue);
            const i = taskList.indexOf(inputValue);
            if (i !== -1) {
              taskList.splice(i, 1);
            }
            return taskList;
          });
        }}
      >
        Remove your task type
      </button>

      <button onClick={() => safeTaskList(taskListArr)}>safe task list</button>

      <button onClick={() => setTaskListArr(loadTaskList(taskListArr))}>load task list</button>

      <div>
        <NavLink to="/">zurück</NavLink>
      </div>
    </>
  );
}

export default OptionsPage;
