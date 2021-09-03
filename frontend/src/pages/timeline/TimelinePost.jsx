import { Col, Row, List, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getTimelinePost } from "../../redux/actions/post";

export default function TimelinePost() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const { all } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimelinePost());
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
            dataSource={all}
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
