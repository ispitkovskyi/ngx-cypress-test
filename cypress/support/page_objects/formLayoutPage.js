
export class FormLayoutPage {

    submitInlineFormWithNameAndEmail(name, email, rememberMe){
        cy.contains('nb-card', 'Inline form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            if(rememberMe){
                cy.wrap(form).find('[type="checkbox"]').check({force: true})
            }
            cy.wrap(form).submit() //submit() method can be used only for HTML form ('form' HTML tag)
        })
    }

    submitBasicFormWithinEmailAndPassword(email, password, rememberMe){
        cy.contains('nb-card', 'Basic form').find('form').then( form => {
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            if(rememberMe){
                cy.wrap(form).find('[type="checkbox"]').check({force: true})
            }
            cy.wrap(form).submit() //submit() method can be used only for HTML form ('form' HTML tag)
        })
    }
}

export const onFormLayoutPage = new FormLayoutPage();