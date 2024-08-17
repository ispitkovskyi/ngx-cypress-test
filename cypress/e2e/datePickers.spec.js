/// <reference types="cypress" />

function selectDayFromCurrent(days) {
    let date = new Date()
    date.setDate(date.getDate() + days)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
    let futureYear = date.getFullYear()
    let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
        if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(days)
        } else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
    })

    return dateToAssert
}

describe('date pickers suite', () => {

    it.only('date pickers 1', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const assertionDate = selectDayFromCurrent(60)
            cy.wrap(input).invoke('prop', 'value').should('contain', assertionDate)
            cy.wrap(input).should('have.value', assertionDate)
        })
    })

})
