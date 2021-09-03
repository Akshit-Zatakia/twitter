import React from "react";
import "./landing.css";
import { Row, Col, Card, Button, Space } from "antd";
import Title from "antd/lib/typography/Title";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Landing() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();
  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="landing">
      <Row justify="space-around" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <img src="/images/landing1.jpg" className="landingImage" />
        </Col>
        <Col className="gutter-row" span={12}>
          <Row align="middle" style={{ height: "100vh" }}>
            <Col>
              <Title level={2}>Welcome to Twitter</Title>
              <h4>Let's talk</h4>
              <Row>
                <Space>
                  <Col>
                    <Button
                      type="primary"
                      onClick={(e) => {
                        history.push("/register");
                      }}
                    >
                      Sign Up
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={(e) => {
                        history.push("/login");
                      }}
                    >
                      Sign In
                    </Button>
                  </Col>
                </Space>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Landing;
