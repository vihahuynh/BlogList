import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeABlog, deleteBlog } from "../reducer/blogReducer";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

const Blog = ({ blog, user, noti }) => {
  console.log("user: ", user.id, typeof user.id);
  console.log("blog: ", blog.user.id, typeof blog.user.id);

  const dispatch = useDispatch();
  const blogStyle = {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#D0E8F2",
    borderRadius: 15,
    color: "#456268",
  };

  const linkStyle = {
    color: "#456268",
    fontWeight: "bold",
    padding: 10,
  };

  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => setShowDetail(!showDetail);

  const likeBlog = async (blogToUpdate) => {
    try {
      await dispatch(likeABlog(blogToUpdate));
    } catch (err) {
      console.log(err);
    }
  };

  const removeBlog = async (blogToRemove) => {
    if (
      window.confirm(`Remove ${blogToRemove.title} by ${blogToRemove.author}`)
    ) {
      try {
        await dispatch(deleteBlog(blogToRemove));
        noti(`Removed blog ${blogToRemove.title} successfully.`);
      } catch (err) {
        noti("Failed to remove blog", false);
      }
    }
  };

  return (
    <Row className="blog">
      <Col style={blogStyle}>
        <Row>
          <Col lg={11}>
            <Link style={linkStyle} to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </Col>
          <Col lg={1}>
            <Button variant="primary" size="sm" onClick={handleShowDetail}>
              {showDetail ? "hide" : "view"}
            </Button>
          </Col>
        </Row>
        {showDetail && (
          <>
            <Row>
              <Col>
                <a href={blog.url}>{blog.url}</a>
              </Col>
            </Row>
            <Row>
              <Col lg={11}>likes: {blog.likes}</Col>
              <Col lg={1}>
                <Button
                  size="sm"
                  variant="success"
                  className="like-btn"
                  onClick={() => likeBlog(blog)}
                >
                  like
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>{blog.author}</Col>
            </Row>
            <Row>
              <Col lg={11}></Col>
              <Col lg={1}>
                {(user.id === blog.user?.id || user.id === blog.user) && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => removeBlog(blog)}
                  >
                    delete
                  </Button>
                )}
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};
export default Blog;
