import { Button, Col, Form, Input, message, Row, Space } from "antd";
import "./login.scss";
import loginStoryInterface from "./../../common/images/login-story-interface.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";
import { LoginForm } from "../../model";
import { EMAIL_VALIDATE, PASSWORD_VALIDATE } from "../../constant/validate";
import { signIn } from "../../services/auth.service";
import {
  authErrorCode,
  AUTH_ERROR_MESSAGE,
} from "../../constant/error-messages";
import { useSelector } from "react-redux";
import { loadingSelector } from "../../redux/selectors/appStatus.selector";
import { loadingStart, loadingStop } from "../../services/appStatus.service";
import { generateUrlByRole } from "../../services/navigate.service";
import { useEffect } from "react";

function Login() {
  const [loginForm] = useForm();
  const loading = useSelector(loadingSelector);
  const navigate = useNavigate();

  useEffect(() => {
    loadingStop();
  }, []);

  const onFinish = async (value: LoginForm) => {
    loadingStart();
    try {
      const user = await signIn(value);
      const displayName = user.displayName || "mate.";
      message.success(`Welcome ${displayName}.`);
      loadingStop();
      
      navigate(generateUrlByRole('/'));
    } catch ({ code, message }) {
      loadingStop();
      switch (code) {
        case authErrorCode.USER_NOT_FOUND:
          loginForm.setFields([
            { name: "email", errors: [AUTH_ERROR_MESSAGE[code]] },
          ]);
          break;
        case authErrorCode.WRONG_PASSWORD:
          loginForm.setFields([
            { name: "password", errors: [AUTH_ERROR_MESSAGE[code]] },
          ]);
          break;

        default:
          break;
      }
    }
  };

  return (
    <Row justify="center" align="middle" className="login">
      <Col span={14} className="login__wrapper">
        <Row justify="center" align="middle">
          <Col span={14}>
            <img src={loginStoryInterface} alt="login story" />
          </Col>
          <Col className="login__form-wrapper" span={8}>
            <Space direction="vertical" className="login__form-header">
              <h1>Sign In</h1>
              <p>Enter your credential to get access</p>
            </Space>
            <Form
              form={loginForm}
              onFinish={onFinish}
              className="login__form"
              autoComplete="off"
              layout="vertical"
            >
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

              <div className="login__form-action">
                <span>
                  Don't have an account? <Link to="/register">Sign up</Link>
                </span>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={loading}
                >
                  Sign In
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Login;
