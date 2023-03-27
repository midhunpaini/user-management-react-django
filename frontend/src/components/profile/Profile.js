import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const Profile = () => {
  const user = useSelector(state => state.user.value);
  console.log(user)
  const [image, setImage] = useState(null);


  const handleImageChange = e => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  
    const formData = new FormData();
    formData.append('image', file);
    formData.append('Content-Type', 'multipart/form-data');

    fetch('http://localhost:8000/api/addimage', {
      method: 'POST',
      headers: {Authorization: `JWT ${localStorage.getItem('jwt')}`,
      },
      credentials: "include",
      body: formData,
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={image ? image : user.image} className="img-fluid rounded-start" alt="Profile" style={{ maxWidth: "200px", maxHeight: "200px" }} />
          <Button variant="outline-secondary" className="mt-3" onClick={() => document.getElementById('image-input').click()}>
            Change Picture
          </Button>
          <input id="image-input" type="file" accept="image/*" className="d-none" onChange={handleImageChange} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Name: {user.fname} {user.lname}</h5>
            <p className="card-text">Email: {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
