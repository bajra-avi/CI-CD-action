describe('API INTERCEPT', () => {

  it('Intercepts the API request and handles the response', () => {
    cy.visit('https://jsonplaceholder.typicode.com/')

    cy.intercept('GET', '/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          name: "RAM",
          age: 93,
          address: "Bhainsepati"
        }
      })
    }).as('getData')
    cy.get('body > div > main > table:nth-child(5) > tbody > tr:nth-child(1) > td:nth-child(1) > a').click()
    cy.wait('@getData').then((interception) => {
      cy.exec(
        `echo ${JSON.stringify(interception.response.body)} >cypress/fixtures/comment.json`
      )
      const responseData = interception.response.body;
      cy.log('Response data:', responseData);

    });
  });

  it('intercepts request to API endpoint', () => {
    cy.visit('https://jsonplaceholder.typicode.com')

    cy.intercept('GET', '/posts', { fixture: 'intercept-data.json' }).as('productRequest');

    cy.get('tbody tr:nth-child(1) td:nth-child(1) a:nth-child(1)').click();

    cy.wait('@productRequest').then(intercept => {
      cy.exec(
        `echo ${JSON.stringify(intercept.response.body)} >cypress/fixtures/comment.json`
      )
      expect(intercept.response.statusCode).to.equal(200);
    });
  });

  it('intercepts reqres api', () => {
    cy.visit('https://reqres.in')
    cy.intercept('GET', '/api/users?page=2').as('reqres')
    cy.get("span[data-key = 'url']").click();
    cy.wait('@reqres').then(intercept => {
      expect(intercept.response.statusCode).to.equal(200);
    })
  })



  it('visit site', () => {
    cy.visit('');

    cy.intercept('data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10').as('comments');
    cy.contains('Comments List').click();
    cy.wait('@comments').then(intercept => {
      expect(intercept.response.body.limit).eq(10);
    });
  });

  it('Change response', () => {
    cy.visit('');

    cy.intercept('GET', 'data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10', { limit: 20, Name: 'The name is changed' }).as('comments');
    cy.contains('Comments List').click();
    cy.wait('@comments').then(intercept => {
      expect(intercept.response.body.limit).eq(20);
      expect(intercept.response.body.Name).eq('The name is changed');
    });
  });
});
