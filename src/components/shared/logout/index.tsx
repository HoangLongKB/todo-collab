import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../services/auth.service';

function Logout() {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      throw new Error('Sign out Error!');
    }
  };
  return (
    <Button type="primary" danger onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}

export default Logout;
