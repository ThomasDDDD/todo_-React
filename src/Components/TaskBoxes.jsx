import { useContext, useEffect } from "react";
import { AppContext } from "../utils/AppContext";

function TaskBoxes() {
  const { taskObjArr, setTaskObjArr, loadTaskList, deleteTask } =
    useContext(AppContext);

  useEffect(() => {
    setTaskObjArr(loadTaskList(taskObjArr));
  }, []);

  return (
    <div className="taskTypeBoxContainer">
      {taskObjArr?.map((obj) => (
        <div className="taskBoxContainer" key={obj.tasktypeId}>
          <h2>{obj.tasktype}</h2>
          {obj.tasks?.map((task) => (
            <div className="taskBox" key={task.taskId}>
              <h4>{task.taskname}</h4>

              <input type="checkbox" id={task.taskId}></input>
              <label htmlFor={task.taskId}>Erledigt</label>
              <button
                onClick={() =>
                  setTaskObjArr(
                    deleteTask({
                      tasktypeId: obj.tasktypeId,
                      taskId: task.taskId,
                    })
                  )
                }
              >
                Task Entfernen
              </button>
              <p>{`Priorität: ${task.prio}`}</p>
              <p>{`Fällig am: ${new Date(
                task.due
              ).toLocaleDateString()} um: ${new Date(task.due)
                .toLocaleTimeString()
                .slice(0, 5)} Uhr`}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TaskBoxes;
