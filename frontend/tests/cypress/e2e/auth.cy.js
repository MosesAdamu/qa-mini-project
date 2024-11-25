describe('Authentication Flow', () => {
    it('should log in successfully', () => {
      cy.visit('/');
      cy.get('input[name="username"]').type('joe234');
      cy.get('input[name="password"]').type('josh');
      cy.get('button[type="submit"]').click();
      cy.contains('Login successful!');
    });
  });
  