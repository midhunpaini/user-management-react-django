import React from 'react';
import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditForm = (props) => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.value);
  const user = users.find((user) => user.email === id);
  const [firstName, setFirstName] = useState(user.fname);
  const [lastName, setLastName] = useState(user.lname);
  const [email, setEmail] = useState(user.email);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to edit this user?');
    if (confirmed) {
      await fetch('http://localhost:8000/api/edit_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          id,
          firstName,
          lastName,
          email,
        }),
      });
      setRedirect(true);
    }
  };

  const handleCancel = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} style={{ border: '1px solid black', padding: '20px', borderRadius: '5px' }}>
        <h1 className="h3 mb-3 fw-normal">Edit User</h1>
        <div className="form-floating mb-3">
          <input
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            value={firstName}
            className="form-control"
            id="fname"
            placeholder="First Name"
          />
          <label htmlFor="fname">First Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            value={lastName}
            className="form-control"
            id="lname"
            placeholder="Last Name"
          />
          <label htmlFor="lname">Last Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            required
            readOnly
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email Address</label>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-lg btn-secondary" type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-lg btn-primary" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
