import board from '../fixtures/selectors/boards.json'
 
describe('Stubing', () => {
    
    it('Stubbing get boards', () => {
        cy.intercept('/api/boards', { fixture : 'stubbing/boards.json' }).as('fakeBoard')
        cy.visit('/')
        cy.get(board.boardTitle).contains('To do').should('have.text', 'To do')
        cy.get(board.boardTitle).contains('In Progress').should('have.text', 'In Progress')
        cy.get(board.boardTitle).contains('In QA').should('have.text', 'In QA')
        cy.get(board.boardTitle).contains('Done').should('have.text', 'Done')
        cy.get('@fakeBoard').then((res) => {
            expect(res.response.statusCode).to.eq(200)
            expect(res.response.body[0].name).to.eq('To do')
            expect(res.response.body[1].name).to.eq('In Progress')
            expect(res.response.body[2].name).to.eq('In QA')
            expect(res.response.body[3].name).to.eq('Done')
            expect(res.response.body[1].starred).to.be.true
        })
    })

    it('Stubbing get QA Board', () => {
        cy.intercept('/api/boards/57082118899', { fixture : 'stubbing/qaBoard.json' }).as('fakeQa')
        cy.visit('/board/57082118899')
        cy.get('@fakeQa').then((res) => {
            expect(res.response.statusCode).to.eq(200)
            expect(res.response.body.name).to.eq('In QA')
            expect(res.response.body.lists[0].title).to.eq('Stubbing network responses')
            expect(res.response.body.lists[1].title).to.eq('Changing parts of response data')
            expect(res.response.body.lists[2].title).to.eq('Intercepting')
        })
    })
})
