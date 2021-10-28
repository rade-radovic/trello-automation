
import login from '../fixtures/selectors/login.json'
import header from '../fixtures/selectors/navigation.json'
import board from '../fixtures/selectors/boards.json'

describe('Asserts', () => {

    beforeEach('Delete borads and Login', () => {
        cy.request('DELETE', '/api/boards')
        cy.intercept('/login').as('login')
        cy.visit('/')
        cy.get(header.loginButton).click()
        cy.get(login.emailInput).type(Cypress.env('username'))
        cy.get(login.passwordInput).type(Cypress.env('password'))
        cy.get(login.loginButton).click()
        cy.wait('@login')
        cy.get(header.loggedUser).should('be.visible')
    })

    afterEach('Logout', () => {
        cy.get(header.loggedUser).click()
        cy.get(header.logout).click()
        cy.get(header.loginButton).should('be.visible')
    })

    it('Create board', () => {
        cy.get(board['createBoard...']).click()
        cy.get(board.createBoardInput).type("My First Board")
        cy.get(board.saveButton).click()
        cy
        .url()
        .then((url) => {
            const id = url.match(/\/(\d+?)$/)

            cy
                .url()
                .should(
                    'eq',
                    `${Cypress.config('baseUrl')}/board/${id[1]}`
                )
        })
        cy.get(header.myBoards).click()
        cy.get(board.boardItem).trigger('mouseover')
        cy.get(board.boardStar).click()
        cy.get(board.favoriteBoards).children().should('have.length', 1)
    })

    it.only('Add a list and List items', () => {
        cy.get(board['createBoard...']).click()
        cy.get(board.createBoardInput).type("My First Board")
        cy.get(board.saveButton).click()

        // cy.visit('/')
        // cy.get('[data-cy=board-item] > [data-cy="My First Board"]')

        cy.get(board.addList).type("Prva Lista")
        cy.get(board.saveListButton).click()

        for (let i = 0; i <= 2; i++) {
            cy.get(board.addItem).click()
            cy.get(board.taskInput).type(`Task ${i + 1}{enter}`)
        } 

        cy.get(board.tasksList).children().eq(0).should('have.text','Task 1')
        // ili should have text? 
    })

 
}) 