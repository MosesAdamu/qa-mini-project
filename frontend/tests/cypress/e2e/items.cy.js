describe('Items CRUD Operations', () => {
    it('should create a new item', () => {
      cy.visit('/items');
      cy.contains('Create Item').click();
      cy.get('input[name="name"]').type('Test Item');
      cy.get('textarea[name="description"]').type('This is a test item.');
      cy.contains('Create').click();
      cy.contains('Item created successfully!');
    });
  
    it('should display items', () => {
      cy.visit('/items');
      cy.contains('Test Item').should('exist');
    });
  });
  