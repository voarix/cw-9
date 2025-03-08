import { NavLink } from "react-router-dom";
import React from "react";

interface Props {
  onShowModal: React.MouseEventHandler;
}

const Toolbar: React.FC<Props> = ({ onShowModal }) => {
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
              <button className="nav-link" onClick={onShowModal}>
                Add
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
