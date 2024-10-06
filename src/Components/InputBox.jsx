function InputBox(props) {
  console.log(props);
  const { taskType } = props;
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
        <select name="TaskType" id="taskType">
          <option disabled defaultValue>
            Select
          </option>
          {taskType.map((task) => {
            return <option value={task}>{task}</option>;
          })}
        </select>
        <button>Aufgabe hinzufügen</button>
      </form>
    </div>
  );
}

export default InputBox;
