import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div>
        <NavLink to="ToDo">ToDo App starten</NavLink>
      </div>
      <div>
        <NavLink to="options">Optionen</NavLink>
      </div>
    </>
  );
}
export default Home;
