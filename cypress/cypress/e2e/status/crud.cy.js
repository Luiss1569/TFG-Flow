/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("http://localhost:5173");

  cy.get("#cpf").type("12312312311");
  cy.get("#password").type("sadas");
  cy.get("form").submit();

  cy.url().should("include", "/portal");
});

describe("Crud", () => {
  beforeEach(() => {
    cy.intercept("GET", "/status").as("getStatus");
    cy.intercept("POST", "/status").as("postStatus");
    cy.intercept("PUT", "/status/*").as("putStatus");
    cy.intercept("DELETE", "/status/*").as("deleteStatus");

    cy.get(":nth-child(6) > .chakra-link > .css-old1by > .css-109bpxm").click();
    cy.url().should("include", "/status");
    cy.wait("@getStatus");
  });

  it("should do go to Status page", () => {
    cy.get("#btn-create").click();

    cy.get("#name").type("Teste");
    cy.get("#form-status").submit();
    cy.wait("@postStatus");

    cy.get("#toast-2-title").should("contain", "Salvo com sucesso");

    cy.get(
      ':nth-child(8) > [style="text-align: center; display: flex;"] > #btn-edit'
    ).click();

    cy.get("#name").type("Editado");
    cy.get("#form-status").submit();
    cy.wait("@putStatus");

    cy.get("#toast-2-title").should("contain", "Salvo com sucesso");

    cy.get(
      ':nth-child(8) > [style="text-align: center; display: flex;"] > #btn-delete'
    ).click();
    cy.get(".css-59nyk3").click();
    cy.wait("@deleteStatus");

    cy.get('#toast-4-description').should("contain", "excluído com sucesso");
  });
});
