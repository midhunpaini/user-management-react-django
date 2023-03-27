import { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addNewUser } from '../../features/UsersSlice';

const AddUser = () => {
  const dispatch = useDispatch();
  const [first_name, setFname] = useState('');
  const [last_name, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!first_name || !last_name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
    });
   
    if (!response.ok) {
    const data = await response.json();
    if(data.email){
      setErrorMessage(data.email[0])
    }else{
      setErrorMessage(data.password[0])
    }
  
    ;
    return;
  }

    const newUser = {
      fname: first_name,
      lname: last_name,
      email: email,
    };

    dispatch(addNewUser(newUser));

    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="submit"
        className="btn btn-danger ms-auto"
        style={{ minWidth: '100px' }}
      >
        Add User
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setFname(e.target.value);
                }}
                type="text"
                placeholder="Enter first name"
                value={first_name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setLname(e.target.value);
                }}
                type="text"
                placeholder="Enter last name"
                value={last_name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter email"
                value={email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
                value={password}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddUser