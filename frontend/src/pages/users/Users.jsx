import { Col, Row, List, Spin, Button, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { follow, getUsers, unfollow } from "../../redux/actions/users";

export default function Users() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { all } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  console.log(all);

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
                <Space>
                  <Button
                    type="primary"
                    onClick={(e) => dispatch(follow(item._id))}
                  >
                    Follow
                  </Button>
                  <Button
                    type="primary"
                    onClick={(e) => dispatch(unfollow(item._id))}
                  >
                    Unfollow
                  </Button>
                </Space>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}
