/// <reference types="cypress" />

describe('first test suite', () => {


    it('extract text values', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl specified in the cypress.config.js
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // 2 (JQuery)
        cy.get('[for="exampleInputEmail1"]').then(label => {
            // label is JQuery object, so we can use all the methods of JQuery objects
            const labelText = label.text()
            // expect assertion can be used only inside JQuery syntax block (this callback function)
            expect(labelText).to.equal('Email address')

            // should assertion requires conversion of html text to Cypress object, by calling wrap() method
            cy.wrap(labelText).should('contain', 'Email address')
        })

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain', 'Email address')

        // Text value saved to an alias, and can be used later on in the code
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address')

        // Check value of attribute
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => {
            expect(classValue).to.equal('label')
        })

        // Invoke property
        cy.get('#exampleInputEmail1').type('test@test.com')

        //way 1
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain', 'test@test.com')
        //way 2
        cy.get('#exampleInputEmail1').invoke('prop', 'value').then( propValue => {
            expect(propValue).to.equal('test@test.com')
        })
    })

    it('radio buttons', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Cypress method to work with checkboxes and radio buttons
        // this method works ONLY with INPUT elements, which have attribute type="radio" / type="checkbox"
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            // the radioButtons object represents all found radio buttons found
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
            cy.wrap(radioButtons).each(($radio, index) => {
                if(index < 2) {
                    cy.wrap($radio).check({force: true}).should('be.checked')
                }
            })
        })
    })

    it.only('checkboxes', () => {
        cy.visit('/') // Enough to specify '/', Cypress will navigate to the baseUrl
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').eq(0).check({force: true}) //check() verify state of the checkbox
        cy.get('[type="checkbox"]').eq(1).uncheck({force: true}) //check() verify state of the checkbox

        cy.get('[type="checkbox"]').check({force: true}) 
        cy.get('[type="checkbox"]').uncheck({force: true})
    })
})