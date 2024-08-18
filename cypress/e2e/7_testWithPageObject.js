/// <reference types="cypress" />

import {navigateTo} from "../support/page_objects/navigationPage";

describe('first test suite', () => {

    beforeEach('open application', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl specified in the cypress.config.js
    })

    it('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()

    })
})