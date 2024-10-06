function TaskBoxes({ tasks }) {
  return (
    <>
      {tasks.map((task) => {
        return (
          <div>
            <h2>{task}</h2>
            <ul>{/* <TasklistFor /> */}</ul>
          </div>
        );
      })}
    </>
  );
}

export default TaskBoxes;
