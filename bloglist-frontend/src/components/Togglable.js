import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, ref) => {
  const createBtnStyle = {
    width: "100%",
  };

  const cancelBtnStyle = {
    marginLeft: 15,
  };
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const hideWhenVisible = { margin: 20, display: visible ? "none" : "" };
  const showWhenVisible = { margin: 20, display: visible ? "" : "none" };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div className="container">
      <div style={hideWhenVisible}>
        <Button style={createBtnStyle} onClick={toggleVisibility}>
          create new blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button style={cancelBtnStyle} size="sm" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
});
Togglable.displayName = "Togglable";
export default Togglable;
