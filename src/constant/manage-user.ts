import { ColumnsType } from 'antd/lib/table';
import { ManageUserTable } from '../model/manage-user.model';

export const getTableColumn = (
  roleRender: Function,
  progressRender: Function,
  actionRender: Function
): ColumnsType<ManageUserTable> => {
  return [
    {
      title: 'Name',
      dataIndex: 'displayName',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (_, record) => {
        return roleRender(_, record);
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (_, record) => {
        return progressRender(_, record);
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return actionRender(_, record);
      },
    },
  ];
};
