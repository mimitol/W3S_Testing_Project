Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
describe('Price filter test', () => {
    it('checks products prices between 50 and 100', () => {
        cy.visit('https://campus.w3schools.com/collections/course-catalog');
        cy.get('#filter-Price-0-from').clear().type('50');
        cy.get('#filter-Price-0-to').clear().type('100');
        cy.get('#filter-Price-0-to').type('{enter}').click();
        cy.wait(3000); 
        
        cy.get('.productgrid--items.products-per-row-4', { timeout: 10000 }).within(() => {
            const outOfRangePrices = [];
  
            cy.get('.money').each(($el) => {
                const price = parseFloat($el.text().replace(/[^0-9.]/g, ''));
                
                if ((price < 50 || price > 100 )& price!=0) {
                    outOfRangePrices.push(price);
                }
            }).then(() => {
                if (outOfRangePrices.length > 0) {
                    cy.log('Prices out of range: ' + outOfRangePrices.join(', '));
                } else {
                    cy.log('All prices are within range.');
                }
            });
        });
    });
  });