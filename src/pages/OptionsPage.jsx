import { useState } from "react";
import AppWorkingPage from "./AppWorkingPage.jsx";

function OptionsPage() {
  const [taskListArr, setTaskListArr] = useState(["private", "job"]);
  const [inputValue, setInputvalue] = useState("");
  return (
    <>
      <h1>Options</h1>
      <p>Welcome, at first set up your todo task types. We pre set up "private" and "job" for you.</p>
      <input onChange={(e) => setInputvalue(e.target.value)} type="text" placeholder="Add a Tasktype"></input>
      <button
        onClick={() => {
          setTaskListArr([...taskListArr, inputValue]);
          console.log(taskListArr);
        }}
      >
        Add your task type
      </button>

      <p>Or remove present from your List</p>
      <select onChange={(e) => setInputvalue(e.target.value)}>
        <option disabled defaultValue>
          Select
        </option>
        {taskListArr.map((task) => {
          return <option value={task}>{task}</option>;
        })}
      </select>
      <button
        onClick={() => {
          setTaskListArr(() => {
            const taskList = [...taskListArr];
            console.log(taskList);
            const i = taskList.findIndex((value) => value === inputValue);
            taskList.splice(i, 1);
            return taskList;
          });
          console.log(taskListArr);
        }}
      >
        Remove your task type
      </button>
      {/* <button onClick={() => AppWorkingPage(taskListArr)}>Start ToDo App</button> */}
    </>
  );
}

export default OptionsPage;
