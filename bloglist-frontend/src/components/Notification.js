import React from "react";
import { Alert } from "react-bootstrap";

const Notification = ({ message, isSuccess }) => {
  return (
    <div className="container">
      <Alert variant={isSuccess ? "success" : "danger"}>{message}</Alert>
    </div>
  );
};

export default Notification;
