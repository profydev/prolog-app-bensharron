import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock, delay so we can test the loading state
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
      delay: 1000,
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("shows loading circle", () => {
      // loading state should be visible
      cy.get("img[alt='Loading']").should("be.visible");

      // wait for request to resolve
      cy.wait("@getProjects");

      // loading state should be gone
      cy.get("img[alt='Loading']").should("not.exist");
    });

    it("shows error dialog after API error", () => {
      // Simulates a network error
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        forceNetworkError: true,
      }).as("getNetworkFailure");

      // open projects page
      cy.visit("http://localhost:3000/dashboard");
      cy.wait("@getNetworkFailure");

      // Alert is visible
      cy.get("img[alt='alert']").should("be.visible");

      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
      }).as("getProjects");

      // Click retry button
      cy.get("main").find("button").should("be.visible").click();
      cy.wait("@getProjects");

      // Retry should load page
      cy.get("main").find("ul");
    });

    it("renders the projects", () => {
      // wait for request to resolve
      cy.wait("@getProjects");

      const languageNames = ["React", "Node.js", "Python"];
      const statusNames = ["Critical", "Warning", "Stable"];
      const badgeColors = [
        "rgb(180, 35, 24)",
        "rgb(181, 71, 8)",
        "rgb(2, 122, 72)",
      ];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(statusNames[index]);
          cy.wrap($el)
            .contains(statusNames[index])
            .should("have.css", "color", badgeColors[index]);
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });
  });
});
