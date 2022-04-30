import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/user";
import { ListGroup } from "react-bootstrap";

const User = () => {
  const [user, setUser] = useState(null);
  const id = useParams().id;
  useEffect(
    () =>
      userService
        .get(id)
        .then((returnedUser) => setUser(returnedUser))
        .catch((err) => console.log(err)),
    [id]
  );
  if (!user) return null;
  return (
    <div className="container">
      <h2 style={{ fontWeight: 600 }}>{user.username}</h2>
      <h5>added blogs</h5>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <a href={blog.url} target="_blank">
              {blog.title}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
