import { Col, Input, Row, Form, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { login } from "../../redux/actions/auth";
import { Redirect, useHistory } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = () => {
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/home");
    }
  }, [isAuthenticated]);

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col>
        <Card>
          <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
