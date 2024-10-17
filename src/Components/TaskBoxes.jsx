import { useEffect, useState } from "react";

function TaskBoxes({ tasks }) {
  const [taskObjArr, setTaskObjArr] = useState([]);

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

  useEffect(() => {
    setTaskObjArr(loadTaskList(taskObjArr));
  }, []);

  return (
    <>
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
    </>
  );
}

export default TaskBoxes;
