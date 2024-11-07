Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Cypress Test for Signup form in w3schools', () => {

    beforeEach(() => {
        cy.visit('https://profile.w3schools.com/signup?redirect_url=https%3A%2F%2Fwww.w3schools.com%2F');
        cy.get('.SignUpForm_signup_buttons__aoBad button').as('submitButton');
        cy.get('.SignUpForm_error_text__vt1BO').as('errorMessage')
    });

    const fillForm = (email, firstName, lastName, password) => {
        cy.get('[placeholder="email"]').clear().type(email);
        cy.get('[placeholder="first name"]').clear().type(firstName);
        cy.get('[placeholder="last name"]').clear().type(lastName);
        cy.get('[placeholder="password"]').clear().type(password);
    };

    it('should display error messages when mandatory fields are left empty', () => {
        cy.get('@submitButton').click();
        cy.get('@errorMessage').should('contain.text', 'Please fill in all fields');
    });

    it('should show an accurate error message if the password is not strong enough', () => {
        const testPassword = (password, expectedError) => {
            cy.get('[placeholder="password"]').clear().type(password);
            cy.get('@submitButton').click();
            cy.get('@errorMessage').should('contain.text', expectedError);
        };

        fillForm('JohnDoe@gmail.com', 'John', 'Doe', 'jjjj');

        testPassword('jjjj', 'at least one uppercase character');
        testPassword('JJJJ', 'at least one lowercase character');
        testPassword('JJJJjjjj', 'at least one number');
        testPassword('Jj1', 'at least one special character');
        testPassword('jJ1!', '8 characters minimum');

    });

    it('should validate the email format is correct', () => {
        fillForm('JohnDoe@', 'John', 'Doe', 'JJJJjjjj1234!');
        cy.get('@submitButton').click();
        cy.get('@errorMessage').should('contain.text', 'Please enter a valid email address');
    });

    it('shuld checks page responsiveness on different screen sizes', () => {
        cy.viewport(375, 667); // Phone
        cy.get('.LoginPanel_login_signup__N4spj').should('be.visible');

        cy.viewport(768, 1024); // Tablet
        cy.get('.LoginPanel_login_signup__N4spj').should('be.visible');

        cy.viewport(1440, 900); // Desktop
        cy.get('.LoginPanel_login_signup__N4spj').should('be.visible');
    });

    it('should navigate to Terms Of Service page  and checks the title element', () => {
        cy.get('[href="https://www.w3schools.com/about/about_copyright.asp"]')
            .invoke('removeAttr', 'target')
            .click();
        cy.wait(60000);
        cy.url().should('include', '/about_copyright.asp');
        cy.get('h1').should('contain.text', 'Terms of Service');
    });
    it('should navigate to Privacy Policy page page and checks the title element', () => {
        cy.get('[href="https://www.w3schools.com/about/about_privacy.asp"]')
            .invoke('removeAttr', 'target')
            .click();
        cy.wait(60000);
        cy.url().should('include', 'about_privacy.asp');
        cy.get('h1').should('contain.text', 'About Privacy');
    });
});