describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Testing",
      username: "testing",
      password: "testing",
    };
    const user2 = {
      name: "Testing2",
      username: "testing2",
      password: "testing2",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.request("POST", "http://localhost:3001/api/users", user2);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#username").length === 1;
    cy.get("#password").length === 1;
    cy.get("button").length === 1;
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testing");
      cy.get("#password").type("testing");
      cy.get("button").click();
      cy.contains("testing logged in");
      cy.contains("logout");
      cy.contains("create new blog");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("testing");
      cy.get("#password").type("wrong");
      cy.get("button").click();
      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testing", password: "testing" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Test create a new blog");
      cy.get("#author").type("tester");
      cy.get("#url").type("test url");
      cy.get("#btn-create-blog").click();
      cy.get(".success")
        .should("contain", "A new blog Test create a new blog by tester")
        .and("have.css", "color", "rgb(0, 128, 0)");

      cy.get(".blog")
        .contains("Test create a new blog")
        .contains("view")
        .click();
    });
  });

  describe("A blog can be liked, deleted", function () {
    beforeEach(function () {
      cy.login({ username: "testing", password: "testing" });
      cy.createBlog({
        title: "blog 01",
        author: "tester",
        url: "test url",
      });
      cy.createBlog({
        title: "blog 02",
        author: "tester",
        url: "test url",
      });
      cy.createBlog({
        title: "blog 03",
        author: "tester",
        url: "test url",
      });
    });

    it("Like a blog", function () {
      cy.get(".blog").contains("blog 03").contains("view").click();

      cy.get(".blog").contains("blog 01").as("theBlog");
      cy.get("@theBlog").contains("view").click();
      cy.get("@theBlog").contains("like").click();
      cy.get("@theBlog").contains("likes: 1");
    });

    it("user who created a blog can delete it", function () {
      cy.get(".blog").contains("blog 03").contains("view").click();

      cy.get(".blog").contains("blog 01").as("theBlog");
      cy.get("@theBlog").contains("view").click();
      cy.get("@theBlog").contains("delete").click();
      cy.get(".blog").contains("blog 01").should("not.exist");
    });

    it("other users cannot delete the blog", function () {
      window.localStorage.removeItem("loggedUserInfo");
      cy.login({ username: "testing2", password: "testing2" });

      cy.get(".blog").contains("blog 03").contains("view").click();
      cy.get(".blog").contains("blog 02").as("theBlog");
      cy.get("@theBlog").contains("view").click();
      cy.get("@theBlog").contains("delete").should("not.exist");
    });

    it("the blogs are ordered according to likes", async function () {
      cy.get(".blog").contains("blog 01").as("theBlog1");
      cy.get(".blog").contains("blog 02").as("theBlog2");
      cy.get(".blog").contains("blog 03").as("theBlog3");

      cy.get("@theBlog1").contains("view").click();
      cy.get("@theBlog2").contains("view").click();
      cy.get("@theBlog3").contains("view").click();

      // likes
      cy.get("@theBlog1").contains("like").click();
      cy.get("@theBlog2").contains("like");
      cy.get("@theBlog3").contains("like").click();
      cy.get("@theBlog3").contains("like").click();
      cy.get(".blog").first().contains("blog 03");
      cy.get(".blog").last().contains("blog 02");
    });
  });
});
