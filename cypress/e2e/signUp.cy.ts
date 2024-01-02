describe('SignUpForm Tests', () => {
  beforeEach(() => {
    // Assuming the signup page is served at '/signup'
    cy.visit('http://localhost:5173/signup');
  });

  it('successfully signs up with valid credentials', () => {
    cy.get('#username').type('newUser');
    cy.get('#password').type('newPassword');
    cy.get('form').submit();
    // Replace with the URL you're redirected to after successful sign-up
    cy.url().should('include', '/login');
    // You can also check for a success message if your app displays one
  });

  it('validates required fields', () => {
    cy.get('form').submit();
    cy.get('.text-red-500').should('contain', 'Please fill in all fields');
  });

  // Additional tests can be added here
});
