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
    cy.intercept("GET", "/forms").as("getStatus");
    cy.intercept("POST", "/form").as("postStatus");
    cy.intercept("PUT", "/forms/*").as("putStatus");
    cy.intercept("DELETE", "/forms/*").as("deleteStatus");

    cy.get(":nth-child(7) > .chakra-link > .css-old1by > .css-109bpxm").click();
    cy.url().should("include", "/forms");
    cy.wait("@getStatus");
  });

  it("should do go to Status page", () => {
    cy.get("#btn-create").click();

    cy.get("#name").type("Teste");
    cy.get("#slug").type("teste");
    cy.get('#form_type').select('public');
    cy.get("#status_id").select("d8108535-0fb6-49b0-9426-a4a9a48dc0d9");
    cy.get("#description").type("Teste");
    cy.get("#add-field").click();
    cy.wait(1000);
    cy.get("#fields-0-id").type("Teste");
    cy.get("#fields-0-label").type("Teste label");
    cy.get('#fields-0-type').select('text');
    cy.get('#fields-0-placeholder').type('Teste');

    cy.get("#add-field").click();
    cy.wait(1000);
    cy.get("#fields-1-id").type("Teste");
    cy.get("#fields-1-label").type("Teste label");
    cy.get('#fields-1-type').select('select');
    
    cy.get('#fields-1-options-btn-add').click();
    cy.get('#fields-1-options-0-label').type('Teste');
    cy.get('#fields-1-options-0-value').type('Teste');

    cy.get("#fields-1-options-btn-add").click();
    cy.get("#fields-1-options-1-label").type("Teste 2");
    cy.get("#fields-1-options-1-value").type("Teste 2");

    cy.get(':nth-child(10) > :nth-child(6) > .chakra-checkbox > .chakra-checkbox__control').click();

    cy.get("#form-form").submit();
    cy.wait("@postStatus");

    cy.get("#toast-2-title").should("contain", "Salvo com sucesso");

    cy.get(':nth-child(11) > [style="text-align: center; display: flex;"] > #btn-edit').click();

    cy.get("#name").type(" Editado");
    cy.get("#fields-1-options-1-label").type(" Editado");
    cy.get("#form-form").submit();

    cy.get("#toast-3-title").should("contain", "Salvo com sucesso");

    cy.get(':nth-child(11) > [style="text-align: center; display: flex;"] > #btn-delete').click();
    cy.get(".css-59nyk3").click();
    cy.wait("@deleteStatus");

    cy.get('#toast-4-description').should("contain", "Excuiído com sucesso");

  });
});
