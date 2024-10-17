import { NavLink } from "react-router-dom";

function NavigationBar() {
  return (
    <div className="navBar">
      <NavLink className="navLink" to="ToDo">
        ToDo App starten
      </NavLink>

      <NavLink className="navLink" to="options">
        Optionen
      </NavLink>
    </div>
  );
}
export default NavigationBar;
