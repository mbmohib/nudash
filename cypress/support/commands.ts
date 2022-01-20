Cypress.Commands.add('login', user => {
  return cy
    .request({
      url: 'http://localhost:4000/login',
      method: 'POST',
      body: user,
    })
    .then(response => {
      return { ...response.body.data };
    });
});
