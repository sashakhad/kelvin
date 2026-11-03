describe('Kelvin', () => {
  it('loads the landing page with the conversion and the store stamp', () => {
    cy.visit('/');

    cy.get('html').should('have.attr', 'lang', 'en');
    cy.get('main').should('be.visible');
    cy.get('h1').should('contain', 'Celsius + 273.15.');
    cy.contains('Conversion Facts').should('be.visible');
    cy.contains('Absolute Zero Razz').should('be.visible');
    cy.get('a[href="https://shrimpclub.vercel.app"]').should('exist');
    cy.get('[data-testid="parody-disclaimer"]').should('contain', 'parody');
    cy.get('[data-testid="out-k"]').should('contain', '273.15');
    cy.get('[data-testid="out-f"]').should('contain', '32');
  });

  it('converts absolute zero in the browser', () => {
    cy.visit('/');

    cy.get('#scale').select('K');
    cy.get('#reading').clear().type('0');
    cy.get('[data-testid="out-c"]').should('contain', '−273.15');
    cy.get('[data-testid="out-f"]').should('contain', '−459.67');
    cy.contains('The footnote has been converted.').should('be.visible');
  });

  it('offers a bulk pre-order with no payment fields', () => {
    cy.visit('/preorder');

    cy.contains('Nothing is charged').should('be.visible');
    cy.get('input[name="cardNumber"]').should('not.exist');
    cy.get('input[autocomplete="cc-number"]').should('not.exist');
    cy.get('button[type="submit"]').should('contain', 'File the pre-order');
    cy.get('button[type="submit"]').click();
    cy.contains('Name the human placing the boxes').should('be.visible');
  });

  it('shows the brand system', () => {
    cy.visit('/brand');

    cy.contains('h1', 'Celsius + 273.15.').should('be.visible');
    cy.contains('Celsius, but converted.').should('be.visible');
    cy.contains('#00F0FF').should('be.visible');
    cy.contains('#FF2E97').should('be.visible');
    cy.get('img[alt="KELVIN lockup"]').should('be.visible');
    cy.get('img[alt="+273.15 tab"]').should('be.visible');
  });

  it('opens the menu on a phone', () => {
    cy.viewport(390, 844);
    cy.visit('/');

    cy.get('nav[aria-label="Primary"]').should('not.be.visible');
    cy.get('button[aria-controls="mobile-nav"]').click();
    cy.get('#mobile-nav').contains('Pre-order').should('be.visible').click();
    cy.location('pathname').should('eq', '/preorder');
  });
});
