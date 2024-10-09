import { useEffect, useState } from "react";
import InputBox from "../Components/InputBox.jsx";
import TaskBoxes from "../Components/TaskBoxes.jsx";

function AppWorkingPage() {
  const [taskListArr, setTaskListArr] = useState(["private", "job"]);
  function loadTaskList(taskListArr) {
    if (localStorage.getItem("TaskList")) {
      const loadetTaskList = JSON.parse(localStorage.getItem("TaskList"));
      return loadetTaskList;
    } else {
      console.log("no data to load");
      return [...taskListArr];
    }
  }

  useEffect(() => {
    setTaskListArr(loadTaskList(taskListArr));
  }, []);

  return (
    <>
      <InputBox taskTypes={taskListArr} />
      {/* <TaskBoxes tasks={taskListArr} /> */}
    </>
  );
}
export default AppWorkingPage;
