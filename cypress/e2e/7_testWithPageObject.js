/// <reference types="cypress" />

import {navigateTo} from "../support/page_objects/navigationPage";
import {onFormLayoutPage} from "../support/page_objects/formLayoutPage";
import {datePickerPage} from "../support/page_objects/datePickerPage";
import {smartTablePage} from "../support/page_objects/smartTablePage";

describe('first test suite', () => {

    beforeEach('open application', () => {
        cy.openHomePage() // custom command added inside commands.js
    })

    it('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
    })

    it.only('should submit Inline and Basic form and select tomorrow date in calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutPage.submitInlineFormWithNameAndEmail('Artem', 'test@test.com', true)
        onFormLayoutPage.submitBasicFormWithinEmailAndPassword('test@test.com', 'password', true)
        navigateTo.datePickerPage()
        datePickerPage.selectCommonDatepickerDateFromToday(60)
        datePickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        smartTablePage.addNewRecordWithFirstAndLastName('Artem', 'Bondar')
        smartTablePage.updateAgeByFirstName('Artem', '35')
        smartTablePage.deleteRowByIndex(1)
    })
})