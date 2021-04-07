context("Home Screen", () => {
  before(() => {
    cy.getServerData();
  });

  it("Display All People", () => {
    cy.get("[id='allCharacters']").contains("All Characters");
    cy.get("[id='characterList']").children().should("have.length", 10);
  });
});
