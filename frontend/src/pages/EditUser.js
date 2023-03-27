import { useParams } from 'react-router-dom';
import EditForm from '../components/admin_panel/EditForm';
import AdminNav from '../components/navbar/AdminNav';

const EditUser = () => {
  const { id } = useParams();

  return (
    <div>
      <AdminNav/>
      <EditForm id={id} />
    </div>
  );
};

export default EditUser;

