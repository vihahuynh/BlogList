import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("blog form summition", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const form = component.container.querySelector("form");
  const titleInput = component.container.querySelector("#title");
  const authorInput = component.container.querySelector("#author");
  const urlInput = component.container.querySelector("#url");

  fireEvent.change(titleInput, { target: { value: "Test title" } });
  fireEvent.change(authorInput, { target: { value: "Nemo" } });
  fireEvent.change(urlInput, { target: { value: "test.com" } });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Test title");
  expect(createBlog.mock.calls[0][0].author).toBe("Nemo");
  expect(createBlog.mock.calls[0][0].url).toBe("test.com");
});
