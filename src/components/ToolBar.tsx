import { NavLink } from "react-router-dom";

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Finance tracker
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/categories" className="nav-link">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="" className="nav-link">
                Add
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
