describe("Logins and adds a training log", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Login page opens and logs in", () => {
    cy.contains("Welcome to");
    cy.get("#login-username").click().type("test123");
    cy.get("#login-password").click().type("test123");
    cy.get("#login-submit").click();
    cy.wait(200);
    cy.findByText("Successfuly logged in");
  });

  it("Can't login if password or username is incorrect", () => {
    cy.contains("Welcome to Gmtrack");
    cy.get("#login-username").click().type("incorrect");
    cy.get("#login-password").click().type("incorrect");
    cy.get("#login-submit").click();
    cy.wait(200);
    cy.findByText("Invalid", { exact: false });
  });
});

describe("When already logged in", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/login", {
      username: "test123",
      password: "test123",
    }).then((response) => {
      localStorage.setItem("user-token", JSON.stringify(response.body));
      cy.visit("http://localhost:3000");
    });
  });

  it("Shows home page", () => {
    cy.contains("Add new training");
    cy.contains("Add new weight");
  });

  it("Creates a new training entry", () => {
    cy.contains("Add new training").click();
    cy.wait(100);
    cy.get("#add-training-muscles").click().findByText("Chest").click();
    cy.get("#submit-training").click();
    cy.wait(500);
    cy.findByText("Success", { exact: false });
  });

  it("Creates a new weight entry", () => {
    cy.contains("Add new weight").click();
    cy.wait(100);
    cy.get("#add-weight-comment").click().type("Just testing").click();
    cy.get("#add-weight-value").click().type("70");
    cy.get("#measurements-checkbox").click();
    cy.findByText("Create new", { exact: false }).click();
    cy.wait(500);
    cy.findByText("Success", { exact: false });
  });
});
