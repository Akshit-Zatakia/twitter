import { Col, Row, List, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getMyPost } from "../../redux/actions/post";

export default function MyPosts() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const { my } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPost());
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
          <List
            bordered
            dataSource={my}
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
