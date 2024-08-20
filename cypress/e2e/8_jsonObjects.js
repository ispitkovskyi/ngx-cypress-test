/// <reference types="cypress" />

describe('JSON objects', () => {

    it('JSON objects', () => {
        cy.openHomePage()

        const simpleObject = {"key": "value", "key2": "value2"}
        const simpleArrayOfValues = ["one", "two", "three", "four", "five", "six"];
        const arrayOfObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}];
        const dataTypes = {"string": "this is a string", "number": 10}

        const mix = {
            "FirstName": "Artem",
            "LastName": "Bondar",
            "Age": 35,
            "Students": [
                {
                    "FirstName": "Sara",
                    "LastName": "Connor",
                },
                {
                    "FirstName": "Bruce",
                    "LastName": "Willis",
                }
            ]
        }

        //Accessing JSON object content
        console.log(simpleObject.key)
        console.log(simpleObject["key"])

        console.log(simpleArrayOfValues[1]) //by index
        console.log(arrayOfObjects[2].key3)
        console.log(mix.Students[0].FirstName)
    })
})