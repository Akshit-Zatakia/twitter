import { Divider, List } from "antd";
import React from "react";

export default function ListMenu() {
  const data = [
    {
      name: "Home",
      link: "/home",
    },
  ];

  return (
    <div>
      <Divider orientation="left">Default Size</Divider>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      />
    </div>
  );
}
