
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

export class DatePickerPage {

    selectCommonDatepickerDateFromToday(daysFRomToday) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const assertionDate = selectDayFromCurrent(daysFRomToday)
            cy.wrap(input).invoke('prop', 'value').should('contain', assertionDate)
            cy.wrap(input).should('have.value', assertionDate)
        })
    }

    selectDatepickerWithRangeFromToday(firstDay, secondDate){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            const dateAssertFirst = selectDayFromCurrent(firstDay)
            const dateAssertSecond = selectDayFromCurrent(secondDate)
            const finalDate = `${dateAssertFirst} - ${dateAssertSecond}`
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            cy.wrap(input).should('have.value', finalDate)
        })
    }
}

export const datePickerPage = new DatePickerPage();
