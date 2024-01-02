describe('Dashboard CRUD Tests', () => {
  before(() => {
    // Visit the login page
    cy.visit('http://localhost:5173/login');

    // Perform login
    cy.get('#username').type('amir');
    cy.get('#password').type('amir');
    cy.get('form').submit();

    // Wait for the login process to complete and redirect to the dashboard
    cy.url().should('include', '/');
  });

  it('successfully adds a new item', () => {
    // Replace selectors and values based on your actual UI
    cy.get('.add-item-button').click(); // Assuming you have a button with class '.add-item-button' for adding items
    cy.get('.grid-row').should('contain', 'New Item');
  });

  it('successfully edits an item', () => {
    // Select an item and perform edit actions
    cy.get('.grid-row').first().click(); // Example: Click the first row
    cy.get('.edit-cell').type('Edited Value{enter}'); // Replace with the actual class and value
    cy.get('.grid-row').first().should('contain', 'Edited Value');
  });

  it('successfully deletes an item', () => {
    cy.get('.grid-row').first().click(); // Example: Click the first row
    cy.get('.delete-item-button').click(); // Assuming you have a button for deleting items
    // Verify the item is deleted (the specifics depend on how your UI updates)
  });

  it('successfully syncs changes to the server', () => {
    // Perform some changes
    // Then click the sync button
    cy.get('.sync-button').click(); // Replace with your actual sync button selector
    // Verify the changes were synced, e.g., by checking a toast message
    cy.get('.toast-message').should('contain', 'Data synced successfully');
  });

  // Additional tests can be added here
});
