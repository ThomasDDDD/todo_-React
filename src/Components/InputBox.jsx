import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../utils/AppContext";
import { NavLink } from "react-router-dom";

function InputBox() {
  const { taskObjArr, setTaskObjArr, loadTaskList, safeTaskList } = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");
  const inputAdd = useRef(null);

  function addTask(e) {
    const newTaskObjArr = [...taskObjArr];
    const taskToEdit = newTaskObjArr.find((taskObj) => e.target.elements.tasktype.value === taskObj.tasktype);

    const newTask = {
      taskname: e.target.elements.taskname.value,
      prio: e.target.elements.prio.value,
      due: e.target.elements.dueDate.value,
      taskId: Math.floor(taskToEdit.tasktypeId * Math.random() * 1000),
    };
    taskToEdit.tasks = [...taskToEdit.tasks, newTask];

    const taskList = [...taskObjArr];
    const newTaskObjToEdit = taskList.find((taskObj) => taskObj.tasktype === taskToEdit.tasktype);
    const i = taskList.indexOf(newTaskObjToEdit);
    if (i !== -1) {
      taskList.splice(i, 1, taskToEdit);
    }
    safeTaskList(taskList);
    inputAdd.current.value = "";
    return taskList;
  }

  useEffect(() => {
    setTaskObjArr(loadTaskList(taskObjArr));
  }, []);

  return (
    <>
      <form
        className="formInputTask"
        onSubmit={(e) => {
          e.preventDefault();
          setTaskObjArr(addTask(e));
        }}
      >
        <input ref={inputAdd} type="text" name="taskname" placeholder="Aufgabe" />
        <label htmlFor="taskType">Aufgaben Typ: </label>
        <select
          name="tasktype"
          id="taskType"
          value={inputValue}
          onChange={(e) => {
            e.preventDefault();
            setInputValue(e.value);
          }}
        >
          <option>Select</option>
          {taskObjArr.map((taskTypeObj) => {
            return (
              <option key={taskTypeObj.tasktypeId} value={taskTypeObj.tasktype}>
                {taskTypeObj.tasktype}
              </option>
            );
          })}
        </select>
        <label htmlFor="prio">Priorität: </label>
        <select name="prio" id="prio">
          <option>Select</option>
          <option value="low">niedrig</option>
          <option value="normal">normal</option>
          <option value="high">hoch</option>
          <option value="critical">kritisch</option>
        </select>
        <input type="datetime-local" name="dueDate"></input>
        <button type="submit">Aufgabe hinzufügen</button>
      </form>
      <NavLink className="navLink" onClick={() => safeTaskList(taskObjArr)} to="/">
        zurück
      </NavLink>
    </>
  );
}

export default InputBox;
