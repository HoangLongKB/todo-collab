import { Button, Col, Form, Input, message, Row, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  CONFIRM_PASSWORD_VALIDATE,
  EMAIL_VALIDATE,
  NAME_VALIDATE,
  PASSWORD_VALIDATE,
} from '../../constant/validate';
import './register.scss';
import { useForm } from 'antd/lib/form/Form';
import { useSelector } from 'react-redux';
import { loadingSelector } from '../../redux/selectors/appStatus.selector';
import registerStoryInterface from './../../common/images/register-story-interface.svg';
import { RegisterParam, RegisterForm } from '../../model';
import { signUp } from '../../services/auth.service';
import {
  authErrorCode,
  AUTH_ERROR_MESSAGE,
} from '../../constant/error-messages';
import { loadingStart, loadingStop } from '../../services/appStatus.service';
import { generateUrlByRole } from '../../services/navigate.service';

function Register() {
  const [registerForm] = useForm();
  const loading = useSelector(loadingSelector);
  const navigate = useNavigate();

  const onFinish = async ({
    displayName,
    email,
    password,
    ...rest
  }: RegisterForm) => {
    const register = { displayName, email, password } as RegisterParam;
    loadingStart();
    try {
      const user = await signUp(register);
      const displayName = user.displayName || 'mate.';
      message.success(`Welcome ${displayName}.`);
      loadingStop();
      navigate(generateUrlByRole('/'));
    } catch ({ code }) {
      loadingStop();
      switch (code) {
        case authErrorCode.EMAIL_IN_USE:
          registerForm.setFields([
            { name: 'email', errors: [AUTH_ERROR_MESSAGE[code]] },
          ]);
          break;
        default:
          message.error(`Register fail, please try again later.`);
          break;
      }
    }
  };

  return (
    <Row justify="center" align="middle" className="register">
      <Col span={14} className="register__wrapper">
        <Row justify="center" align="middle">
          <Col span={14}>
            <img src={registerStoryInterface} alt="register story" />
          </Col>
          <Col className="register__form-wrapper" span={8}>
            <Space direction="vertical" className="register__form-header">
              <h1>Sign Up</h1>
              <p>Create your account to get access</p>
            </Space>
            <Form
              form={registerForm}
              onFinish={onFinish}
              className="register__form"
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Name"
                name="displayName"
                hasFeedback
                rules={NAME_VALIDATE}
              >
                <Input placeholder="Name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                hasFeedback
                rules={EMAIL_VALIDATE}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                hasFeedback
                rules={PASSWORD_VALIDATE}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                label="Confirm password"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={CONFIRM_PASSWORD_VALIDATE}
              >
                <Input.Password placeholder="Confirm password" />
              </Form.Item>

              <div className="register__form-action">
                <span>
                  Already have account? <Link to="/login">Sign in</Link>
                </span>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="register-form-button"
                  disabled={loading}
                >
                  Sign Up
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Register;
