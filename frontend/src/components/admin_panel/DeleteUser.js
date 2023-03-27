import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../features/UsersSlice";

const DeleteUser = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback((e) => {
    e.preventDefault();
    deleteUser(id);
  }, [id]);

  const deleteUser = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if(confirmed){
      await fetch("http://localhost:8000/api/delete_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id,
      }),
    });
    dispatch(removeUser(id));
    }
    
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      className="btn btn-danger ms-auto"
      style={{ marginLeft: "5rem" }}
      name="del"
    >
      Delete
    </button>
  );
};

export default DeleteUser;
