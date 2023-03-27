import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoginButton, LogoutButton, RegisterButton } from '../buttons/Buttons'
import { useState } from 'react'


function Navbar(props) {
  const user = useSelector((state)=>state.user.value)
  return (
    
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Home</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
          
                {user.isLogged?(<LogoutButton/>):
                (<div className='ms-auto'>
                  {props.page==="signup"||props.page==="home"?(<Link to='/'><LoginButton/></Link>):(<Link to='/signup'><RegisterButton/></Link>)}
                </div>
                )}
            </div>
        </div>
    </nav>
    
  )
}

export default Navbar