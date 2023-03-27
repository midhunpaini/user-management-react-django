
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/User";
import { Navigate } from "react-router-dom";


export const LogoutButton = () => {
  
  const dispatch = useDispatch();
  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    dispatch(logoutUser());
    <Navigate to={"/home"} />
  };
  return (
    <button
      onClick={logout}
      className="btn btn-outline-danger ms-auto "
      type="submit"
    >
      Logout
    </button>
  );
};



export const LoginButton = () => {
  return (
    
      <button className="btn btn-outline-success" type="submit">
        Login
      </button>
   
  );
};



export const RegisterButton = () => {
  return (
    <button className="btn btn-outline-success" type="submit">
      Register
    </button>
  );
};
