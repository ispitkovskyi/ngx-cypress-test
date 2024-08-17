/// <reference types="cypress" />

describe('lists and dropdowns', () => {

    it.only('lists and dropdowns test', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl

        // 1
        cy.get('nav').find('nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        // 2
        cy.get('nav').find('nb-select').then( dropDown => {
            cy.wrap(dropDown).click()
            cy.get('.options-list')
                .find('nb-option')
                .each((listItem, index) => {
                    const itemText = listItem.text().trim()
                    cy.wrap(listItem).click()
                    cy.wrap(dropDown).should('contain', itemText)
                    if(index < 3) {
                        cy.wrap(dropDown).click()
                    }
                })
        })
    })
})
