import { Card, Col, Row, Space, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function Profile() {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Spin />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row justify="center" align="middle">
        <Col span={12}>
          <Card>
            <h1>{user.username}</h1>
            <h3>{user.email}</h3>
            <Row>
              <Space>
                <Col>
                  <p style={{ color: "gray" }}>Following</p>
                  <p style={{ color: "gray" }}>{user.followers.length}</p>
                </Col>
              </Space>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
