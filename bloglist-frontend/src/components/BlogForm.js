import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    createBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="container">
      <h2>Create a new blog</h2>
      <Form onSubmit={handleCreateBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
          />
          <Button size="sm" id="btn-create-blog" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
