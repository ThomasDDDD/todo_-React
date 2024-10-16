import { useEffect, useState } from "react";

function InputBox() {
  const [taskObjArr, setTaskObjArr] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function loadTaskList(taskObjArr) {
    if (localStorage.getItem("TaskList")) {
      const loadetTaskObjArr = JSON.parse(localStorage.getItem("TaskList"));
      return loadetTaskObjArr;
    } else {
      console.log("no data to load");
      return [...taskObjArr];
    }
  }

  function safeTaskList(taskObjArr) {
    localStorage.setItem("TaskList", JSON.stringify(taskObjArr));
  }

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
    return taskList;
  }

  function deleteTask(deleteObj) {
    console.log(deleteObj);
    console.log(taskObjArr);
    const taskTypeToEdit = taskObjArr.find((tasktype) => tasktype.tasktypeId === deleteObj.tasktypeId);
    const i = taskObjArr.indexOf(taskTypeToEdit);
    console.log(taskTypeToEdit);
    console.log(i);
    const tasksArrToPutIn = taskTypeToEdit.tasks.filter((task) => task.taskId !== deleteObj.taskId);
    console.log(tasksArrToPutIn);
    const newTaskObjToPutIn = { ...taskTypeToEdit, tasks: tasksArrToPutIn };
    const newTaskObjArr = [...taskObjArr];
    newTaskObjArr.splice(i, 1, newTaskObjToPutIn);

    // const newTaskObjArr = taskObjArr.filter(taskType);
    safeTaskList(newTaskObjArr);
    return newTaskObjArr;
  }

  useEffect(() => {
    setTaskObjArr(loadTaskList(taskObjArr));
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTaskObjArr(addTask(e));
        }}
      >
        <input type="text" name="taskname" placeholder="Aufgabe" />
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
      {taskObjArr?.map((obj) => (
        <div className="typeBox" key={obj.tasktypeId}>
          <h2>{obj.tasktype}</h2>
          {obj.tasks?.map((task) => (
            <div className="taskBox" key={task.taskId}>
              <h4>{task.taskname}</h4>

              <input type="checkbox" id={task.taskId}></input>
              <label htmlFor={task.taskId}>Erledigt</label>
              <button onClick={() => setTaskObjArr(deleteTask({ tasktypeId: obj.tasktypeId, taskId: task.taskId }))}>
                Task Entfernen
              </button>
              <p>{`Priorität: ${task.prio}`}</p>
              <p>{`Fällig am: ${new Date(task.due).toLocaleDateString()} um: ${new Date(task.due)
                .toLocaleTimeString()
                .slice(0, 5)} Uhr`}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default InputBox;
