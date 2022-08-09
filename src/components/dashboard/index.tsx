import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';
import NavBar from '../shared/nav-bar';
import SideBar from '../shared/side-bar';
import './dashboard.scss';

function Dashboard() {
  return (
    <div className="dashboard">
      <NavBar />
      <Row className="dashboard__body">
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={20}>
      <Outlet />

        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
