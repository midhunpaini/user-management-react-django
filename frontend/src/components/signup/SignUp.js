import React from 'react'
import { useState } from 'react'
import { Navigate} from "react-router-dom";
import "./signup.css"
import { Link } from 'react-router-dom';

function SignUp() {
  const [first_name, setFname] = useState('')
  const [last_name, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault()
    if (!first_name || !last_name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    const response = await fetch("http://localhost:8000/api/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password
      })
    })
    if (!response.ok) {
      const data = await response.json();
      if (data.email) {
        setErrorMessage(data.email[0])
      } else {
        setErrorMessage(data.password[0])
      }
    } else {
      setRedirect(true)
    }
  }
  
  if (redirect) {
    return <Navigate to={'/'} />;
  }
  
  
  return (
    <div className='container'>
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
        <div className="form-floating">
        <input required onChange={(e)=>{setFname(e.target.value)}} type="text" className="form-control" id="fname" placeholder="First Name"/>
        <label htmlFor="fname">First name</label>
        </div>
        <div className="form-floating">
        <input onChange={(e)=>{setLname(e.target.value)}} type="text" className="form-control" id="lname" placeholder="Last Name"/>
        <label htmlFor="lname">Last name</label>
        </div>
        <div className="form-floating">
        <input required onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
        <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
        <input required onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
        <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
        <p>
          Already have an account? <Link to={'/'}>Sign In</Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp