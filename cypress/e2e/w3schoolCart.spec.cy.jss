Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Shopping Cart Functionality', () => {
    it('should add items to the cart and correctly calculate the total price', () => {
        cy.visit('https://campus.w3schools.com/collections/course-catalog');
        
        cy.get('.productitem--action-trigger,.productitem--action-atc button-primary').eq(4)
            .should('be.visible') 
            .click();
  
        cy.get('.cart-continue').click();
        
        cy.get('.productitem--action-trigger,.productitem--action-atc button-primary').eq(15)
            .should('be.visible') 
            .click();
            
        cy.get('.cart-continue').click();
        cy.get('.site-header-cart--button').click();
        
        let totalPrice = 0;
  
        cy.get('ul.cartitems--list li.cart-item').should('exist').then(($items) => {
            if ($items.length) {
                cy.get('ul.cartitems--list li.cart-item').each(($el) => {
                    cy.wrap($el).find('.cart-item__total>.money').invoke('text').then((priceText) => {
                        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
                        
                        totalPrice += price;
  
                        cy.log('Item Price:', price);
                    });
                }).then(() => {
                    cy.log('Calculated Total Price:', totalPrice);
                    
                    cy.get('.cart-final-total .cart-subtotal .money').invoke('text').then((totalText) => {
                        const displayedTotal = parseFloat(totalText.replace(/[^0-9.-]+/g, ""));
                        
                        cy.log('Displayed Total Price:', displayedTotal);
                        
                        expect(totalPrice).to.equal(displayedTotal);
                    });
                });
            } else {
                cy.log('No items found in the cart.');
            }
        });
    });
  });