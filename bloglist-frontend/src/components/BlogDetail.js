import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { likeABlog, commentBlog } from "../reducer/blogReducer";
import { Form, Button, ListGroup, Card } from "react-bootstrap";

const BlogDetail = () => {
  const formStyle = {
    marginBottom: 10,
  };

  const commentStyle = {
    marginTop: 30,
  };
  const dispatch = useDispatch();
  const id = useParams().id;
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    blogService.get(id).then((returnedBlog) => setBlog(returnedBlog));
  }, []);

  const likeBlog = async (blogToUpdate) => {
    try {
      await dispatch(likeABlog(blogToUpdate));
      const likedBlog = {
        ...blog,
      };
      likedBlog.likes++;
      setBlog(likedBlog);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog, comment));
    const updatedBlog = { ...blog };
    updatedBlog.comments = updatedBlog.comments
      ? updatedBlog.comments.concat(comment)
      : [comment];
    setBlog(updatedBlog);
    setComment("");
  };

  if (!blog) return null;

  return (
    <div className="container">
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>
            <h2>{blog.title}</h2>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {blog.author}
          </Card.Subtitle>
          <Card.Text>
            <a href={blog.url}>{blog.url}</a>
          </Card.Text>
          <Card.Text>
            likes {blog.likes}
            <Button
              style={{ marginLeft: 10 }}
              size="sm"
              onClick={() => likeBlog(blog)}
            >
              like
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
      <h5 style={commentStyle}>comments</h5>
      <Form style={formStyle} onSubmit={handleAddComment}>
        <Form.Group>
          <Form.Control value={comment} onChange={handleChangeComment} />
          <Button size="sm" type="submit">
            Comment
          </Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {blog.comments &&
          blog.comments.map((comment) => (
            <ListGroup.Item
              key={`${blog.id}-${Math.trunc(Math.random() * 1000000)}`}
            >
              {comment}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default BlogDetail;
