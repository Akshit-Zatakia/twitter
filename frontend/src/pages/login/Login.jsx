import { Col, Input, Row, Form, Card, Button } from "antd";

import React from "react";

export default function Login() {
  return (
    <Row justify="center" align="middle" style={{ "min-height": "100vh" }}>
      <Col>
        <Card>
          <Form layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
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
