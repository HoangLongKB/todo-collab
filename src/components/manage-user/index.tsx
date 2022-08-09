import { Col, Progress, Row, Space, Table, Tag } from 'antd';
import { collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { getTableColumn } from '../../constant/manage-user';
import { ManageUserTable } from '../../model/manage-user.model';
import './manageUser.scss';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useEffect } from 'react';
import { db } from '../..';
import { loadingStart, loadingStop } from '../../services/appStatus.service';

function ManageUser() {
  const query = collection(db, 'users');
  const [docs, loading] = useCollectionData(query);

  useEffect(() => {
    if (loading) {
      loadingStart();
    } else {
      loadingStop();
    }
  }, [loading]);

  const transformTableData = (): ManageUserTable[] => {
    return docs?.map(({ uid, ...rest }) => {
      return { ...rest, key: uid };
    }) as ManageUserTable[];
  };

  let data: ManageUserTable[] = transformTableData();

  const roleRender = (_: any, { role }: ManageUserTable) => {
    const color = role === 'admin' ? 'green' : 'blue';
    return (
      <Space size="middle">
        <Tag color={color} key={role}>
          {role.toUpperCase()}
        </Tag>
      </Space>
    );
  };

  const progressRender = (_: any, { progress }: ManageUserTable) => (
    <Progress
      style={{ width: '200px' }}
      percent={progress}
      size="small"
      status={progress !== 100 ? 'active' : 'success'}
    />
  );

  const actionRender = (_: any, record: ManageUserTable) => (
    <Space size="middle">
      <Link to={`/my-todo/${record.key}`}>Edit</Link>
    </Space>
  );

  const columns = getTableColumn(roleRender, progressRender, actionRender);

  return (
    <div className="manage-user">
      <Row justify="center" className="manage-user__wrapper">
        <Col span={20}>
          <Row className="manage-user__title">
            <h2>Manage User</h2>
          </Row>
          <Row align="middle" justify="center">
            <Table
              className="manage-user__table"
              columns={columns}
              dataSource={data}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ManageUser;
