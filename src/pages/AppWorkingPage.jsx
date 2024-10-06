import InputBox from "../Components/InputBox.jsx";
import TaskBoxes from "../Components/TaskBoxes.jsx";

function AppWorkingPage(props) {
  const { taskType } = props;
  console.log(taskType);
  return (
    <>
      <InputBox taskType={taskType} />
      <TaskBoxes tasks={taskType} />
    </>
  );
}
export default AppWorkingPage;
