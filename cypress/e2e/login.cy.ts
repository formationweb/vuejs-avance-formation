describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('Tester le formulaire login', () => {
        cy.intercept('POST', 'https://reqres.in/api/login', {
            statusCode: 200,
            body: {
                token: 'fzhzehfzeez'
            }
        }).as('loginRequest')

        cy.get('input[type="text"]').type('eve.holt@reqres.in')
        cy.get('input[type="password"]').type('password123')

        cy.get('button').click()

        cy.wait('@loginRequest')

        cy.url().should('eq', Cypress.config().baseUrl + '/')

        cy.window().then((window) => {
            expect(window.localStorage.getItem('token')).to.eq('fzhzehfzeez')
        })
    })
})