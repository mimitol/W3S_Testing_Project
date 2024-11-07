
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
describe('Cypress Test for w3school site', () => {
    beforeEach(() => {
        cy.visit('https://www.w3schools.com/');
});

  const firstSearch = 'Selector';
  const secondSearch = 'HTML';
  const errorSearch = 'cbdx';
  it('Enter firstsearch to the search input element log the list of results and check that we move to correct page',()=>{
    cy.get('#search2')
    .type(firstSearch , { force: true });
    cy.get('#listofsearchresults a').each(($el) => {
      const text = $el.text();
      cy.log(text);              
      expect(text).to.include(firstSearch);
    }); 
    cy.get('#learntocode_searchbtn')
    .click({force: true});
    cy.get('h1').should('contain.text', firstSearch);
  });

  it('Enter secondSearch to the search input element log the list of results and check that we move to correct page',()=>{
    cy.get('#search2')
    .type(secondSearch , { force: true });
    cy.get('#listofsearchresults a').each(($el) => {
      const text = $el.text();
      cy.log(text);              
      expect(text).to.include(secondSearch);
    }); 
    cy.get('#learntocode_searchbtn')
    .click({force: true});
    cy.get('h1').should('contain.text', secondSearch);
  });
  
  it('Enter errorSearch to the search input element and check if we got not found',()=>{
    cy.get('#search2')
     .type(errorSearch , { force: true });
    cy.get('#learntocode_searchbtn')
     .click({force: true});
    cy.get('.gs-snippet')
      .should('have.text', 'No Results');
  });
  

});