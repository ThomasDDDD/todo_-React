import { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../utils/AppContext";

function OptionsPage() {
  const { taskObjArr, setTaskObjArr, toSetTaskObjArr, removeTaskType, loadTaskList, safeTaskList } =
    useContext(AppContext);
  const [inputValueToRem, setInputvalueToRem] = useState({});
  const inputAdd = useRef(null);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      toSetTaskObjArr();
    }
  }

  useEffect(() => {
    setTaskObjArr(loadTaskList(taskObjArr));
  }, []);

  return (
    <div className="OptionsPage">
      <h1>Options</h1>
      <p>Welcome, at first set up your todo task types. We pre set up "private" and "job" for you.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTaskObjArr(toSetTaskObjArr(e));
          inputAdd.current.value = "";
        }}
      >
        <input
          ref={inputAdd}
          // onChange={(e) => setInputvalueToAdd(e.currentTarget.value)}
          type="text"
          name="AddTaskTypeInput"
          placeholder="Add a Tasktype"
          onKeyDown={handleKeyDown}
        ></input>
        <button type="submit">Add your task type</button>
      </form>
      <p>Or remove present from your List</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTaskObjArr(removeTaskType(e));
        }}
      >
        <select
          value={inputValueToRem.tasktype}
          name="RemTaskTypeSelect"
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
        <button type="submit">Remove your task type</button>
      </form>
      {/* <button onClick={() => safeTaskList(taskObjArr)}>safe task list</button>
      <button onClick={() => setTaskObjArr(loadTaskList(taskObjArr))}>load task list</button> */}
      <div>
        <NavLink className="navLink" onClick={() => safeTaskList(taskObjArr)} to="/">
          zurück
        </NavLink>
      </div>
    </div>
  );
}

export default OptionsPage;
