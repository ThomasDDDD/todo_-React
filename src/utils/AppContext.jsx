import { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [taskObjArr, setTaskObjArr] = useState([
    { tasktype: "private", tasks: [], tasktypeId: Math.floor(Math.random() * 10000) },
    { tasktype: "job", tasks: [], tasktypeId: Math.floor(Math.random() * 10000) },
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

  function deleteTask(deleteObj) {
    const taskTypeToEdit = taskObjArr.find((tasktype) => tasktype.tasktypeId === deleteObj.tasktypeId);
    const i = taskObjArr.indexOf(taskTypeToEdit);
    const tasksArrToPutIn = taskTypeToEdit.tasks.filter((task) => task.taskId !== deleteObj.taskId);
    const newTaskObjToPutIn = { ...taskTypeToEdit, tasks: tasksArrToPutIn };
    const newTaskObjArr = [...taskObjArr];
    newTaskObjArr.splice(i, 1, newTaskObjToPutIn);

    safeTaskList(newTaskObjArr);
    return newTaskObjArr;
  }

  return (
    <AppContext.Provider value={{ taskObjArr, setTaskObjArr, loadTaskList, safeTaskList, deleteTask }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
