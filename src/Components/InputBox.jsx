import { useEffect, useState } from "react";

function InputBox({ ...props }) {
  console.log(props);
  const { taskTypes } = props;
  const [tasksObjArr, setTasksObjArr] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function buildTasksObjArr(tasksObjArr) {
    const newTasksObjArr = [...tasksObjArr];
    taskTypes.map((tasktype, i) => {
      newTasksObjArr.push({ tasktype });
    });
    console.log(newTasksObjArr);

    return newTasksObjArr;
  }

  useEffect(() => {
    setTasksObjArr(buildTasksObjArr(tasksObjArr));
  }, []);

  return (
    <div>
      <form>
        <input type="text" placeholder="Aufgabe" />
        <label htmlFor="prio">Priorität: </label>
        <select name="Prio" id="prio">
          <option disabled defaultValue>
            Select
          </option>
          <option value="low">niedrig</option>
          <option value="normal">normal</option>
          <option value="high">hoch</option>
          <option value="critical">kritisch</option>
        </select>
        <label htmlFor="taskType">Aufgaben Typ: </label>
        <select
          name="TaskType"
          id="taskType"
          value={inputValue}
          onChange={(e) => {
            e.preventDefault();
            setInputValue(e.value);
          }}
        >
          <option>Select</option>
          {taskTypes.map((task, i) => {
            return (
              <option key={(i + 1) * Math.random()} value={task}>
                {task}
              </option>
            );
          })}
        </select>
        <button type="submit">Aufgabe hinzufügen</button>
      </form>
    </div>
  );
}

export default InputBox;
