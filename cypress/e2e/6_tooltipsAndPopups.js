/// <reference types="cypress" />

describe('tooltips and popups', () => {

    it('tooltips1', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it.only('dialog box', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1 (not recommended, because code inside .on() method will be executed only if alert appears
        // you won't catch the situation, when alert did not appear
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        //2
        const stub = cy.stub() // for creating stubs and mocks
        //When the event is raised, we want it to be assigned to the 'stub'
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        // Canceling dialog by Cypress
        // cy.on('window:confirm', () => false)
    })
})
