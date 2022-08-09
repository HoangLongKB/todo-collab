import { Button, Col, Dropdown, Menu, MenuProps, Row, Space } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userSelector } from '../../../redux/selectors/user.selector';
import './nav-bar.scss';
import {
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { navbarUserMenu } from '../../../constant/navBar';
import { logOut } from '../../../services/auth.service';

function NavBar() {
  const { role, displayName } = useSelector(userSelector);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      throw new Error('Sign out Error!');
    }
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case navbarUserMenu.PROFILE:
        navigate('/profile');
        break;
      case navbarUserMenu.LOGOUT:
        handleSignOut();
        break;

      default:
        break;
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Profile',
          key: navbarUserMenu.PROFILE,
          icon: <UserOutlined />,
        },
        {
          label: 'Sign Out',
          key: navbarUserMenu.LOGOUT,
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <Row className="navbar">
      <Col span={4} className="navbar__logo">
        <h2>TODO COLLAB</h2>
      </Col>
      <Col span={20} className="navbar__action">
        <Space size="middle" className="navbar__action-space">
          {!role ? (
            <>
              <Button type="primary">
                <Link to="/login">Login</Link>
              </Button>
              <Button>
                <Link to="/register">Register</Link>
              </Button>
            </>
          ) : (
            <Dropdown overlay={menu} trigger={['click']}>
              <Space>
                <span className="navbar__action-name">{displayName}</span>
                <DownOutlined />
              </Space>
            </Dropdown>
          )}
        </Space>
      </Col>
    </Row>
  );
}

export default NavBar;
