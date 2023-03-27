import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import UserTablebody from './UserTablebody'
import { useDispatch } from 'react-redux'
import { fetchUsers } from '../../features/UsersSlice'

function HandleSearch(search, users) {
  const filterData = users.filter((user) => 
    user.fname.toLowerCase().includes(search.toLowerCase())||
    user.lname.toLowerCase().includes(search.toLowerCase())||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  return filterData;
}

const UserTable = (props) => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.value)
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    if (props.data !== undefined && props.data.length !== 0) {
      setFilteredUsers(HandleSearch(props.data, users))
    }else {
      setFilteredUsers(users)
    }
  }, [props?.data, users])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  
  return (
    <table className="table">
        <thead>
          <tr className="">
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>            
          </tr>
        </thead>
        {filteredUsers.map((user)=>(
          <UserTablebody key={user.email} {...user}/>
        ))}
        
      </table>
  )
}

export default UserTable
