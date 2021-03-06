import { Col, List, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SendMessage from "../../components/message/SendMessage";
import { loadUser } from "../../redux/actions/auth";
import { getPost } from "../../redux/actions/post";

export default function Home() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, []);

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
          <SendMessage username={user.username} />
          <List
            bordered
            dataSource={posts}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.userId.username}
                  description={item.message}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}
