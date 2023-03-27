import React from "react";
import DeleteUser from "./DeleteUser";
import EditUserButton from "./EditUserButton";


const UserTablebody = ({id,fname,lname,email}) => {
  return (
    <tbody>
      <tr>
        <td>{fname}</td>
        <td>{lname}</td>
        <td>{email}</td>
        <td>
          <DeleteUser id={email}/>
        </td>
        <td>
            <EditUserButton id={email}/>
        </td>
      </tr>
    </tbody>
  );
};

export default UserTablebody;
