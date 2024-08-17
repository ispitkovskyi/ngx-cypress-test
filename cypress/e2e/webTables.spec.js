/// <reference types="cypress" />

describe('web tables', () => {

    it.only('web tables1', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // 1 Get row by text
        cy.get('tbody').contains('tr', 'Larry').then(row => {
            cy.wrap(row).find('.nb-edit').click()
            cy.wrap(row).find('[placeholder="Age"]').clear().type('35')
            cy.wrap(row).find('.nb-checkmark').click()
            cy.wrap(row).find('td').eq(6).should('contain', '35')
        })

        // 2 Get row by index
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(row => {
            cy.wrap(row).find('[placeholder="First Name"]').type("John")
            cy.wrap(row).find('[placeholder="Last Name"]').type("Smith")
            cy.wrap(row).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(col => {
            cy.wrap(col).eq(2).should('contain', 'John')
            cy.wrap(col).eq(3).should('contain', 'Smith')
        })

        // 3 get each row validation
        const ages = [20, 30, 40, 200]
        // Need to wrap the 'ages' to be able to use Cypress' each() method
        cy.wrap(ages).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500) // wait for table to reload content according to the entered filter value
            cy.get('tbody tr').each(row => {
                if(age == 200){
                    cy.wrap(row).should('contain', 'No data found')
                } else {
                    cy.wrap(row).find('td').eq(6).should('contain', age)
                }
            })
        })

    })
})
