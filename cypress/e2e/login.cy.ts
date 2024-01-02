describe('LoginForm Tests', () => {
  beforeEach(() => {
    // Assuming your login page is served at the root URL
    cy.visit('http://localhost:5173');
  });

  it('successfully logs in with correct credentials', () => {
    cy.get('#username').type('correctUsername');
    cy.get('#password').type('correctPassword');
    cy.get('form').submit();
    // Replace the below URL with the URL you're redirected to after successful login
    cy.url().should('include', '/');
  });

  it('shows an error message on failed login', () => {
    cy.get('#username').type('wrongUsername');
    cy.get('#password').type('wrongPassword');
    cy.get('form').submit();
    cy.get('.text-red-500').should('contain', 'Invalid username or password');
  });

  it('validates required fields', () => {
    cy.get('form').submit();
    cy.get('.text-red-500').should('contain', 'Please fill in all fields');
  });

  // Additional tests can be added here
});
