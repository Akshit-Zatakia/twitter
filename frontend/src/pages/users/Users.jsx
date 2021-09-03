import { Col, Row, List, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUsers } from "../../redux/actions/users";

export default function Users() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { all } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
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
                  title={item.username}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}
