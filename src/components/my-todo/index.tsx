import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  message,
  Progress,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Tag,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import Search from 'antd/lib/input/Search';
import { collection, doc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../..';
import { userSelector } from '../../redux/selectors/user.selector';
import { loadingStart, loadingStop } from '../../services/appStatus.service';
import {
  addTodo,
  deleteTodo,
  getUid,
  postConverter,
  updateTodo,
} from '../../services/my-todo.service';
import './my-todo.scss';
import { DeleteOutlined } from '@ant-design/icons';
import todosSlice from '../../redux/slices/todosSlice';
import { filteredTodoSelector } from '../../redux/selectors/todo.selector';
import filterSlice from '../../redux/slices/filterSlice';
import { FILTER_STATUS } from '../../constant/filter';
import userSlice from '../../redux/slices/userSlice';
import {
  priorityList,
  statusFilterOptions,
} from '../../constant/my-todo';

function MyTodo() {
  const { Option } = Select;
  const { uidParam } = useParams();
  const { uid, role } = useSelector(userSelector);
  const [status, setStatus] = useState(FILTER_STATUS.ALL);
  const editingTodoRef = useRef('');
  const [editingTodo, setEditingTodo] = useState('');
  const [addTodoForm] = Form.useForm();
  const dispatch = useDispatch();
  const todoList = useSelector(filteredTodoSelector);
  const navigate = useNavigate();

  useEffect(() => {
    
    if (uid !== uidParam && role !== 'admin') {
      navigate('/login');
    }
    dispatch(userSlice.actions.setUser({ progress: 0 }));
    dispatch(todosSlice.actions.resetTodos());
    setEditingTodo(editingTodoRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const todoListColRef = collection(
    db,
    'users',
    getUid(uidParam || '', uid),
    'todos'
  ).withConverter(postConverter);
  const userDocRef = doc(db, 'users', getUid(uidParam || '', uid));

  const [todoListDocs, todoLoading] = useCollectionData(todoListColRef);
  const [user] = useDocumentData(userDocRef);
  useEffect(() => {
    if (todoLoading) {
      loadingStart();
    } else {
      loadingStop();
    }
  }, [todoLoading]);

  useEffect(() => {
    if (todoListDocs && todoListDocs.length > 0) {
      dispatch(todosSlice.actions.createTodos(todoListDocs));
    }
  }, [todoListDocs, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSlice.actions.setFilter({ search: e.target.value }));
  };

  const handleStatusChange = ({ target: { value } }: RadioChangeEvent) => {
    setStatus(value);
    dispatch(filterSlice.actions.setFilter({ status: value }));
  };

  const getTag = (value: number) => {
    switch (value) {
      case 3:
        return (
          <Tag key={value} color="red">
            High
          </Tag>
        );
      case 2:
        return (
          <Tag key={value} color="blue">
            Medium
          </Tag>
        );
      case 1:
        return (
          <Tag key={value} color="gray">
            Low
          </Tag>
        );

      default:
        return;
    }
  };

  const getPriorityList = () => {
    return priorityList.map(({ value, label }) => {
      const tag = getTag(value);
      return (
        <Option key={value} value={value} label={label}>
          {tag}
        </Option>
      );
    });
  };

  const handlePriorityChange = (value: string[]) => {
    dispatch(filterSlice.actions.setFilter({ priority: value }));
  };

  const handleAddTodo = async ({
    todoInput,
    todoPriority,
  }: {
    todoInput: string;
    todoPriority: number;
  }) => {
    const dataUpdate = {
      name: todoInput,
      priority: todoPriority,
      completed: false,
      id: '',
    };
    try {
      await addTodo(getUid(uidParam || '', uid), dataUpdate);
      addTodoForm.setFieldValue('todoInput', '');
    } catch (error) {
      message.error('Update todo fail, please try again later!');
    }
  };

  const handleDoubleClickTodo = (id: string) => {
    editingTodoRef.current = id;
    setEditingTodo(id);
  };

  const handleCheckboxChange = async (e: CheckboxChangeEvent, id: string) => {
    const dataUpdate = { completed: e.target.checked };
    try {
      await updateTodo(getUid(uidParam || '', uid), id, dataUpdate);
    } catch (error) {
      message.error('Update todo fail, please try again later!');
    }
  };

  const handleBlurTodo = async (
    e: React.FocusEvent<HTMLInputElement, Element>,
    id: string
  ) => {
    editingTodoRef.current = '';
    setEditingTodo('');
    const dataUpdate = { name: e.target.value };
    try {
      await updateTodo(getUid(uidParam || '', uid), id, dataUpdate);
    } catch (error) {
      message.error('Update todo fail, please try again later!');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(getUid(uidParam || '', uid), id);
    } catch (error) {
      message.error('Delete todo fail, please try again later!');
    }
  };

  return (
    <div className="my-todo">
      <Row justify="center" className="my-todo__wrapper">
        <Col span={20}>
          <Row justify="center">
            <h2 className="my-todo__header-title">Todo List</h2>
          </Row>
          <Row justify="center">
            <Col className="my-todo__content">
              <Row>
                <p className="my-todo__title">Search</p>
              </Row>
              <Row>
                <Search
                  placeholder="input search text"
                  allowClear
                  onChange={(e) => handleSearch(e)}
                />
              </Row>
              <Row>
                <p className="my-todo__title">Filter By Status</p>
              </Row>
              <Row>
                <Radio.Group
                  options={statusFilterOptions}
                  onChange={handleStatusChange}
                  value={status}
                  optionType="default"
                />
              </Row>
              <Row>
                <p className="my-todo__title">Filter By Priority</p>
              </Row>
              <Row>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  onChange={handlePriorityChange}
                >
                  {getPriorityList()}
                </Select>
              </Row>
              <Row>
                <p className="my-todo__title">Add</p>
              </Row>
              <Row>
                <Form
                  form={addTodoForm}
                  onFinish={handleAddTodo}
                  autoComplete="off"
                  validateTrigger="onSubmit"
                  layout="inline"
                  initialValues={{ todoPriority: 2 }}
                  className="my-todo__action-add"
                >
                  <Form.Item
                    name="todoInput"
                    className="my-todo__action-add--input"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="todoPriority">
                    <Select
                      style={{ width: '100%' }}
                      onChange={handlePriorityChange}
                    >
                      {getPriorityList()}
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Add
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
              <Divider />
              <Row></Row>
              <Row>
                <Progress
                  style={{ width: '200px' }}
                  percent={user?.progress}
                  size="small"
                  status={user?.progress !== 100 ? 'active' : 'success'}
                />
              </Row>
              {todoList && todoList.length === 0 ? (
                <p>Let add something awesome!</p>
              ) : (
                todoList?.map((todo) => {
                  const { completed, name, priority, id } = todo;
                  return (
                    <Row key={id} align="middle" className="my-todo__item">
                      <Col>
                        <Checkbox
                          onChange={(e) => handleCheckboxChange(e, id)}
                          defaultChecked={completed}
                        ></Checkbox>
                      </Col>
                      <Col flex="auto">
                        {editingTodo !== id ? (
                          <div
                            className={`my-todo__item-input ${
                              completed ? 'my-todo__item-input--completed' : ''
                            }`}
                            onDoubleClick={() => handleDoubleClickTodo(id)}
                          >
                            {name}
                          </div>
                        ) : (
                          <Input
                            defaultValue={name}
                            autoFocus
                            onBlur={(e) => handleBlurTodo(e, id)}
                            className={`my-todo__item-input ${
                              editingTodo === id ? 'editing-todo' : ''
                            }`}
                          />
                        )}
                      </Col>
                      <Col>{getTag(priority)}</Col>
                      <Col>
                        <Button
                          type="dashed"
                          size="small"
                          danger
                          onClick={() => handleDeleteTodo(id)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Col>
                    </Row>
                  );
                })
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default MyTodo;
