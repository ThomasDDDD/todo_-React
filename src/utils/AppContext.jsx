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

  return (
    <AppContext.Provider value={{ taskObjArr, setTaskObjArr, loadTaskList, safeTaskList }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
