function TaskBoxes({ tasks }) {
  return (
    <>
      {tasks.map((task, i) => {
        return (
          <div key={i}>
            <h2>{task}</h2>
            <ul>{/* <TasklistFor /> */}</ul>
          </div>
        );
      })}
    </>
  );
}

export default TaskBoxes;
