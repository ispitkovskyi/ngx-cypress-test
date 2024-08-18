/// <reference types="cypress" />

describe('first test suite', () => {

    it('first test', () => {

        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl specified in the cypress.config.js
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        
        // by Tag name
        cy.get('input')
        // by ID
        cy.get('#inputEmail1')
        // by Class value (one of class values)
        cy.get('.input-full-width')
        // by Attribute name
        cy.get('[fullwidth]')
        // by Attribute value
        cy.get('[placeholder="Email"]')
        // by ENTIRE class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        // by COMBINATION of attributes
        cy.get('[placeholder="Email"][fullwidth]')
        // by tag, attribute, id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')
        // by Cypress default test locator
        cy.get('[data-cy="imputEmail1"]')
    })
    
    it('second test', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl specified in the cypress.config.js
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // get() - find elements on entire page by locator globally
        // find() - find child-elements by locator
        // contains() - find element by HTML text; by text and locator. Finds FIRST MATCH and retuns it.
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')

        cy.contains('nb-card', 'Horizontal form').find('button') // find element 'nb-card', which has a text 'Horizontal form' inside
        cy.contains('nb-card', 'Horizontal form').contains('Sign in') // find element 'nb-card', which has a text 'Horizontal form' inside
    
        // cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })

    it('save object of the command', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl specified in the cypress.config.js
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // CANNOT DO LIKE THIS. CYPRESS SPECIFIC
        const usingTheGrid = cy.contains('nb-card', 'Using the Grid')

        // 1. Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid') // alias saved
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email') //alias used
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password') //alias used

        // 2. Using Cypress then() method
        // NOTE:  usingTheGridForm - is JQuery element, it CANNOT be chained with Cypress commands (get, find, etc.)
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {  
            // Need to convert the 'usingTheGridForm' JQuery object back to Cypress object
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })
})