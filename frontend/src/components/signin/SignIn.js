import React from "react";
import Navbar from "../navbar/Navbar";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../features/User";
import "./signin.css"
import { Link } from "react-router-dom";

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    const data = await fetch("http://localhost:8000/api/user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
    const json = await data.json();
    dispatch(
      login({
        isLogged: json.is_active,
        fname: json.first_name,
        lname: json.last_name,
        email: json.email,
        is_superuser:json.is_superuser,
      })
    );
    return(
      json.is_active
    )
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    const response=await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      setErrorMessage(data.detail)
    } else {
      setRedirect(true)
    }
  };

  useEffect(() => {
    if (!user.isLogged) {
      fetchUserData();
      
    }
  }, []);

  if (redirect) {
    return <Navigate to={"/home"} />;
  }
  return (
    <>
      <div className="container">
     
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button  className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        <p>
          Don't have an account? <Link to={'/signup'}>Register</Link>
        </p>
      </form>
      </div>
      
    </>
  );
}

export default SignIn;
