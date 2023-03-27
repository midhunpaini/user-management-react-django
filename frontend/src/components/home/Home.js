import React from 'react'
import Profile from '../profile/Profile'
import { useSelector } from 'react-redux'



function Home(props) {
  const user = useSelector((state)=>state.user.value)
  
  return (
    <div>
      {user.isLogged?<><h1>Welcome {user.fname}</h1><Profile/></> :<h1>Welcome Guest</h1>}
    </div>
  )
}

export default Home