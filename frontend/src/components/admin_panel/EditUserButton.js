import { useNavigate } from 'react-router-dom';

const EditUserButton = (props) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    const id = props.id;
    navigate(`/edit_user/${id}`);
  };
  
  
  return (
    <button
      onClick={handleClick}
      type="submit"
      className="btn btn-danger "
      name="edit"
    >
      Edit
    </button>
  );
};

export default EditUserButton;

