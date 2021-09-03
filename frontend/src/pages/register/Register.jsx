import React, { useState } from "react";
import { Col, Input, Row, Form, Card, Button } from "antd";
import { register } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    // e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col>
        <Card>
          <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
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
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
