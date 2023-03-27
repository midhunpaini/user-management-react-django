import "./App.css";
import SignIn from "./components/signin/SignIn";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import { login } from "./features/User";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
import EditUser from "./pages/EditUser";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  if (user.isLogged) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.setItem("user", JSON.stringify({ isLogged: false }));
  }

  useEffect(() => {
    const getUser = async () => {
      if (user.isLogged) {
        console.log(user.isLogged, "inside useEffect");
        const data = await fetch("http://localhost:8000/api/user", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const json = await data.json();
        dispatch(
          login({
            isLogged: json.is_active,
            fname: json.first_name,
            lname: json.last_name,
            email: json.email,
            is_superuser: json.is_superuser,
            image: "http://localhost:8000" + json.image,
          })
        );
        console.log(user.isLogged, 'inside useEffect')
      }
    };
    const u = JSON.parse(localStorage.getItem('user')).isLogged;

    if(u)getUser()
   
  }, [dispatch]);

  return (
    <div className="App">
      {user.is_superuser ? <AdminHome /> : <UserHome />}
    </div>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/edit_user/:id",
    element: <EditUser />,
  },
  {
    path: "/profile/",
    element: <ProfilePage />,
  },
]);
