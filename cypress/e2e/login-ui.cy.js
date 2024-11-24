describe('Login Page UI Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#ru');
  });

  it('renders login form and switches languages', () => {
    cy.get('h2.login-title-enterM').should('contain', 'Вход');
    cy.get('label.lgn-email').should('contain', 'Электронная почта:');
    cy.get('label.pass').should('contain', 'Пароль:');
    cy.get('button.login-btnM').should('contain', 'Войти');

    cy.get('select.select').select('English');
    cy.get('h2.login-title-enterM').should('contain', 'Sign in');
    cy.get('label.lgn-email').should('contain', 'Email:');
    cy.get('label.pass').should('contain', 'Password:');
    cy.get('button.login-btnM').should('contain', 'Sign in');
  });

  it('fills the form and mocks login behavior', () => {
    cy.get('input#email').type('test@example.com');
    cy.get('input#password').type('password123');
    cy.get('button.login-btnM').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Форма отправлена без реального сервера!');
    });
  });
});
