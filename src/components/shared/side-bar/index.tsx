import { Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sidebarMenu } from '../../../constant/sideBar';
import './sideBar.scss';
import { TeamOutlined, SolutionOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/selectors/user.selector';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

function SideBar() {
  const location = useLocation();
  const getCurrentMenu = (path: string) => {
    return path.includes(sidebarMenu.MY_TODOS)
      ? sidebarMenu.MY_TODOS
      : sidebarMenu.MANAGE_USER;
  };
  const [current, setCurrent] = useState(
    location.pathname !== '/'
      ? getCurrentMenu(location.pathname)
      : sidebarMenu.MY_TODOS
  );
  const navigate = useNavigate();
  const { role, uid } = useSelector(userSelector);

  const items = (): ItemType[] => {
    if (role === 'admin') {
      return [
        {
          label: 'Manage User',
          key: sidebarMenu.MANAGE_USER,
          icon: <TeamOutlined />,
        },
        {
          label: 'Todos',
          key: sidebarMenu.MY_TODOS,
          icon: <SolutionOutlined />,
        },
      ] as ItemType[];
    }
    return [
      { label: 'Todos', key: sidebarMenu.MY_TODOS, icon: <SolutionOutlined /> },
    ] as ItemType[];
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    setCurrent(key);
    switch (key) {
      case sidebarMenu.MANAGE_USER:
        navigate('/manage-user');
        break;
      case sidebarMenu.MY_TODOS:
        navigate(`/my-todo/${uid}`);
        break;

      default:
        break;
    }
  };

  return (
    <div className="sidebar">
      <Menu
        defaultSelectedKeys={[current]}
        selectedKeys={[current]}
        onClick={handleMenuClick}
        mode="vertical"
        items={items()}
      />
    </div>
  );
}
export default SideBar;
