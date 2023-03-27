import React, { useState } from "react";
import AddUser from "../admin_panel/AddUser";
import { LogoutButton } from "../buttons/Buttons";
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";


const AdminNav = ({ page, setFilteredData }) => {
  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  
    setFilteredData(search)
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setFilteredData(e.target.value)

    if(search.length-1===0){
      setFilteredData('')
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-4">
      <div className="container-fluid">
        <Navbar.Brand>
          <Link style={{ textDecoration: "none", color: "white" }} to={"/home"}>
            Admin
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto"></Nav>
          {page === "admin" ? (
            <>
              <Form className="d-flex ms-auto" onSubmit={handleSubmit} role="search">
                <FormControl
                  value={search}
                  onChange={handleSearchChange}
                  type="search"
                  placeholder="Search"
                  className="mr-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Form>
              <AddUser />
            </>
          ) : null}

          <LogoutButton />
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AdminNav;
