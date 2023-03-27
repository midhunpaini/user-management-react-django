import React from 'react'
import UserTable from '../components/admin_panel/UserTable'
import AdminNav from '../components/navbar/AdminNav'
import { useState } from 'react'


const AdminHome = () => {
  const [searchText, setSearchText] = useState([]);

  const handleFilteredData = (data) => {
    setSearchText(data);
  };

  return (
    <>
    <AdminNav page='admin' setFilteredData={handleFilteredData} />
    <UserTable data={searchText}/>
    </>
  )
}

export default AdminHome