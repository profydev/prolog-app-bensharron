import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";
import mockIssuesOpen1 from "../fixtures/issues-page-1-open.json";
import mockIssuesOpen2 from "../fixtures/issues-page-2-open.json";
import mockIssuesOpen3 from "../fixtures/issues-page-3-open.json";
import mockIssuesResolved from "../fixtures/issues-resolved.json";
import mockIssuesError1 from "../fixtures/issues-page-1-error.json";
import mockIssuesError2 from "../fixtures/issues-page-2-error.json";
import mockIssuesWarning1 from "../fixtures/issues-page-1-warning.json";
import mockIssuesWarning2 from "../fixtures/issues-page-2-warning.json";
import mockIssuesInfo from "../fixtures/issues-info.json";
import mockIssuesFrontend1 from "../fixtures/issues-page-1-frontend.json";
import mockIssuesFrontend2 from "../fixtures/issues-page-2-frontend.json";
import mockIssuesFrontend3 from "../fixtures/issues-page-3-frontend.json";
import mockIssuesBackend from "../fixtures/issues-backend.json";

describe("Issue List", () => {
  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssuesPage1");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    }).as("getIssuesPage2");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3", {
      fixture: "issues-page-3.json",
    }).as("getIssuesPage3");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&status=open",
      {
        fixture: "issues-page-1-open.json",
      },
    ).as("getIssuesPage1Open");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=2&status=open",
      {
        fixture: "issues-page-2-open.json",
      },
    ).as("getIssuesPage2Open");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=3&status=open",
      {
        fixture: "issues-page-3-open.json",
      },
    ).as("getIssuesPage3Open");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&status=resolved",
      {
        fixture: "issues-resolved.json",
      },
    ).as("getIssuesResolved");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&level=error",
      {
        fixture: "issues-page-1-error.json",
      },
    ).as("getIssuesPage1Error");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=2&level=error",
      {
        fixture: "issues-page-2-error.json",
      },
    ).as("getIssuesPage2Error");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&level=warning",
      {
        fixture: "issues-page-1-warning.json",
      },
    ).as("getIssuesPage1Warning");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=2&level=warning",
      {
        fixture: "issues-page-2-warning.json",
      },
    ).as("getIssuesPage2Warning");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&level=info",
      {
        fixture: "issues-info.json",
      },
    ).as("getIssuesInfo");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&project=frontend",
      {
        fixture: "issues-page-1-frontend.json",
      },
    ).as("getIssuesPage1Frontend");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=2&project=frontend",
      {
        fixture: "issues-page-2-frontend.json",
      },
    ).as("getIssuesPage2Frontend");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=3&project=frontend",
      {
        fixture: "issues-page-3-frontend.json",
      },
    ).as("getIssuesPage3Frontend");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=1&project=backend",
      {
        fixture: "issues-backend.json",
      },
    ).as("getIssuesBackend");

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssuesPage1"]);
    cy.wait(500);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");
    cy.get("button").contains("Load more").as("load-more-button");

    // set filter aliases
    cy.get("div").contains("Resolution").as("resolution-select");
    cy.get("div").contains("Unresolved").as("unresolved-option");
    cy.get("div").contains("Resolved").as("resolved-option");

    cy.get("div").contains("Level").as("level-select");
    cy.get("div").contains("Error").as("error-option");
    cy.get("div").contains("Warning").as("warning-option");
    cy.get("div").contains("Info").as("info-option");

    cy.get('input[placeholder="Project Name"]').as("project-input");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the issues", () => {
      cy.get("main")
        .find("[data-cy=tbody]")
        .find("[data-cy=tr]")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssues2.items[0].message,
      );

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssues3.items[0].message,
      );

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssues2.items[0].message,
      );
    });

    it("persists page after reload", () => {
      cy.get("@next-button").click();
      cy.contains("Page 2 of 3");

      cy.reload();
      cy.wait(["@getProjects", "@getIssuesPage2"]);
      cy.wait(1500);
      cy.contains("Page 2 of 3");
    });

    it("filters issues by resolution", () => {
      // select Open issues
      cy.get("@resolution-select").click();
      cy.get("@unresolved-option").click();

      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesOpen1.items[0].message,
      );

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesOpen2.items[0].message,
      );

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesOpen3.items[0].message,
      );

      // select Resolved issues
      cy.get("@unresolved-option").click();
      cy.get("@resolved-option").click();

      // test first page
      cy.contains("Page 1 of 1");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesResolved.items[0].message,
      );

      // deselect Resolved issues
      cy.get("@resolved-option").click();
      cy.get('img[alt="checkmark"]').click();

      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssues1.items[0].message,
      );
    });

    it("persists resolution after reload", () => {
      // select Open issues
      cy.get("@resolution-select").click();
      cy.get("@unresolved-option").click();

      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesOpen1.items[0].message,
      );

      cy.reload();
      cy.wait(["@getProjects", "@getIssuesPage1Open"]);
      cy.wait(1500);
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesOpen1.items[0].message,
      );
    });

    it("filters issues by level", () => {
      // select Error issues
      cy.get("@level-select").click();
      cy.get("@error-option").click();

      // test first page
      cy.contains("Page 1 of 2");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesError1.items[0].message,
      );

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 2 of 2");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesError2.items[0].message,
      );

      // select Warning issues
      cy.get("@error-option").click();
      cy.get("@warning-option").click();

      // test first page
      cy.contains("Page 1 of 2");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesWarning1.items[0].message,
      );

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 2 of 2");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesWarning2.items[0].message,
      );

      // select Info issues
      cy.get("@warning-option").click();
      cy.get("@info-option").click();

      // test first page
      cy.contains("Page 1 of 1");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("@next-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesInfo.items[0].message,
      );

      // deselect Info issues
      cy.get("@info-option").click();
      cy.get('img[alt="checkmark"]').click();

      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssues1.items[0].message,
      );
    });

    it("persists level after reload", () => {
      // select Error issues
      cy.get("@level-select").click();
      cy.get("@error-option").click();

      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesError1.items[0].message,
      );

      cy.reload();
      cy.wait(["@getProjects", "@getIssuesPage1Error"]);
      cy.wait(1500);
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesError1.items[0].message,
      );
    });

    it("filters issues by project", () => {
      // select Frontend issues
      cy.get("@project-input")
        .type("frontend", {
          delay: 100,
        })
        .should("have.value", "frontend");

      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesFrontend1.items[0].message,
      );

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesFrontend2.items[0].message,
      );

      // test navigation to third page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesFrontend3.items[0].message,
      );

      // select Backend issues
      cy.get("@project-input").clear();
      cy.get("@project-input")
        .type("backend", {
          delay: 100,
        })
        .should("have.value", "backend");

      // test first page
      cy.contains("Page 1 of 1");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("@next-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesBackend.items[0].message,
      );

      // deselect Backend issues
      cy.get("@project-input").clear();

      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssues1.items[0].message,
      );
    });

    it("persists project after reload", () => {
      // select Frontend issues
      cy.get("@project-input")
        .type("frontend", {
          delay: 100,
        })
        .should("have.value", "frontend");

      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesFrontend1.items[0].message,
      );

      cy.reload();
      cy.wait(["@getProjects", "@getIssuesPage1Frontend"]);
      cy.wait(1500);
      cy.get("[data-cy=tbody] [data-cy=tr]:first").contains(
        mockIssuesFrontend1.items[0].message,
      );
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });

    it("renders the issues", () => {
      cy.get("main")
        .get("[data-cy=tbody]")
        .get("[data-cy=tr]")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(issue.numUsers);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    it("loads more data", () => {
      // test loading issues from second page
      cy.get("@load-more-button").click();
      cy.get("[data-cy=tbody] [data-cy=tr]")
        .eq(10)
        .contains(mockIssues2.items[0].message);

      // test loading issues from last page
      cy.get("@load-more-button").click();
      cy.get("@load-more-button").should("have.attr", "disabled");
      cy.get("[data-cy=tbody] [data-cy=tr]")
        .eq(20)
        .contains(mockIssues3.items[0].message);
    });
  });
});
