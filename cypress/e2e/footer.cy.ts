describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  const footerLinkNames = ["Docs", "API", "Help", "Community"];

  it("footer is shown", () => {
    // Version is present
    cy.get("footer").contains("Version: ");

    // Footer links are present
    cy.get("footer")
      .find("a")
      .each(($el, index) => {
        cy.wrap($el)
          .contains(footerLinkNames[index])
          .should("have.attr", "href", "#");
      });

    // Logo is present
    cy.get("footer")
      .find("img[alt='logo']")
      .should("have.attr", "src", "/icons/logo-small.svg");
  });
});
