import React from "react";
import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { LoginButton, LogoutButton, RegisterButton } from "../buttons/Buttons";


function Navbar(props) {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/profile');
  };
  
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link to="/home">
          <p className="navbar-brand" style={{ textDecoration: "none", color: "white" }}>Home</p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              {user.isLogged?
                <p onClick={handleClick} style={{ textDecoration: "none", color: "white",cursor:"pointer" }} className="nav-link">Profile</p>
              :null}
              
            </li>
          </ul>
          {user.isLogged ? (
            <LogoutButton setUser={props.setUser}/>
          ) : (
            <div className="ms-auto">
              {props.page === "signup" || props.page === "home" || props.page==='profile' ? (
                <Link to="/">
                  <LoginButton />
                </Link>
              ) : (
                <Link to="/signup">
                  <RegisterButton />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
