import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("render blog, default does not show url and likes", () => {
  const blog = {
    title: "Blog test",
    author: "Nemo",
    url: "youtube",
    likes: 0,
  };

  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent(blog.title);
  expect(component.container).not.toHaveTextContent(blog.likes);
  expect(component.container).not.toHaveTextContent(blog.url);
});

test("render blog, click button view to show detail", () => {
  const blog = {
    title: "Blog test",
    author: "Nemo",
    url: "youtube",
    likes: 0,
    user: {
      username: "nemohuynh",
    },
  };

  const user = {
    username: "nemohuynh",
  };

  const component = render(<Blog blog={blog} user={user} />);

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent(blog.likes);
  expect(component.container).toHaveTextContent(blog.url);
});

test("render blog, likes the blogs twice", () => {
  const blog = {
    title: "Blog test",
    author: "Nemo",
    url: "youtube",
    likes: 0,
    user: {
      username: "nemohuynh",
    },
  };

  const user = {
    username: "nemohuynh",
  };

  const likeBlog = jest.fn();

  const component = render(
    <Blog blog={blog} likeBlog={likeBlog} user={user} />
  );

  const button = component.getByText("view");
  fireEvent.click(button);

  const likesButton = component.container.querySelector(".like-btn");
  fireEvent.click(likesButton);
  fireEvent.click(likesButton);

  expect(likeBlog.mock.calls).toHaveLength(2);
});
