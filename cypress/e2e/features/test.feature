Feature: Cypress Defect

    Scenario: Generate an error
        Given I am on the automationpractice homepage
        When I search for an item
        Then I see results