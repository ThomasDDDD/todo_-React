import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [taskObjArr, setTaskObjArr] = useState([
    {
      tasktype: "private",
      tasks: [],
      tasktypeId: Math.floor(Math.random() * 10000),
    },
    {
      tasktype: "job",
      tasks: [],
      tasktypeId: Math.floor(Math.random() * 10000),
    },
  ]);

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

  function toSetTaskObjArr(e) {
    if (e.target.children.AddTaskTypeInput.value) {
      const newTaskObjArr = [
        ...taskObjArr,
        {
          tasktype: e.target.children.AddTaskTypeInput.value,
          tasks: [],
          tasktypeId: Math.floor(Math.random() * 10000),
        },
      ];
      safeTaskList(newTaskObjArr);
      return newTaskObjArr;
    } else {
      return taskObjArr;
    }
  }

  function removeTaskType(e) {
    const taskList = [...taskObjArr];
    const newTaskObjToDelete = taskList.find(
      (taskObj) =>
        taskObj.tasktype === e.target.children.RemTaskTypeSelect.value
    );
    const i = taskList.indexOf(newTaskObjToDelete);
    if (i !== -1) {
      taskList.splice(i, 1);
    }
    safeTaskList(taskList);
    return taskList;
  }

  function deleteTask(deleteObj) {
    const taskTypeToEdit = taskObjArr.find(
      (tasktype) => tasktype.tasktypeId === deleteObj.tasktypeId
    );
    const i = taskObjArr.indexOf(taskTypeToEdit);
    const tasksArrToPutIn = taskTypeToEdit.tasks.filter(
      (task) => task.taskId !== deleteObj.taskId
    );
    const newTaskObjToPutIn = { ...taskTypeToEdit, tasks: tasksArrToPutIn };
    const newTaskObjArr = [...taskObjArr];
    newTaskObjArr.splice(i, 1, newTaskObjToPutIn);
    safeTaskList(newTaskObjArr);
    return newTaskObjArr;
  }

  return (
    <AppContext.Provider
      value={{
        taskObjArr,
        setTaskObjArr,
        toSetTaskObjArr,
        removeTaskType,
        loadTaskList,
        safeTaskList,
        deleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
