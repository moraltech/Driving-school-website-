describe("Homepage", () => {
  it("shows hero and booking CTA", () => {
    cy.visit("/");
    cy.contains("Book a Lesson").should("be.visible");
  });
});
