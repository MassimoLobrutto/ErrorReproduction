import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

Given("I am on the automationpractice homepage", () => {
    cy.visit("http://automationpractice.com/index.php")
})

When("I search for an item", () => {
    cy.get('#search_query_top').type('Cypress').type('{enter}')
})

Then("I see results", () => {
    cy.get('.alert').should('contain', 'now this should generate an error')
})