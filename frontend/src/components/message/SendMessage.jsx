import { Button, Card } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/auth";
import { addPost } from "../../redux/actions/post";

export default function SendMessage({ username }) {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const sendTweet = () => {
    dispatch(addPost(message));
    window.location.reload();
  };
  return (
    <Card>
      <h2>{username}</h2>
      <TextArea
        showCount
        maxLength={140}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="primary" onClick={(e) => sendTweet()}>
        Tweet
      </Button>
    </Card>
  );
}
