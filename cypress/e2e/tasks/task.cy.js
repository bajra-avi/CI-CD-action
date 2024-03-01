describe('Review cy task',()=>{
    it('cy-task',()=>{
        cy.task('log',"HELLO").then(mes => cy.log(mes))
    })
})