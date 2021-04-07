context("Management", () => {
  before(() => {
    cy.getServerData();
  });

  it("Display Person Details", () => {
    cy.get("[id='Luke Skywalker']").click();
  });
});
