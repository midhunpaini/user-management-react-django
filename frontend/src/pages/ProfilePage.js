import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Profile from '../components/profile/Profile'



const ProfilePage = () => {
  const [user,setUser] =  useState(JSON.parse(localStorage.getItem("user")) || {})
  console.log(user.isLogged)
  return (
    <>
    <Navbar page='profile' setUser ={setUser} />
    {user.isLogged?<Profile/>:<h1>Welcome Guest</h1>}
    </>
  )
}

export default ProfilePage