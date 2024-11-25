describe('Backend API Tests', () => {
    const baseUrl = 'https://qa-test-9di7.onrender.com';
  
    let userId;
  
    it('should sign up a new user', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/signup`,
        body: {
          username: 'testuser',
          password: 'testpassword'
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('username', 'testuser');
        expect(response.body).to.have.property('id');
        userId = response.body.id; // Store user ID for later tests
      });
    });
  
    it('should log in the user', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/auth/login`,
        body: {
          username: 'testuser',
          password: 'testpassword'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token'); // Assuming your login returns a token
      });
    });
  
    it('should create a new item', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/items`,
        body: {
          name: 'New Item'
        },
        headers: {
          Authorization: `Bearer <your_token_here>` // Replace with a valid token
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
      });
    });
  
    it('should fetch items', () => {
      cy.request(`${baseUrl}/items`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    it('should update an item', () => {
      const updatedItem = {
        name: 'Updated Item'
      };
  
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/items/${userId}`, // Replace with the actual item ID you want to update
        body: updatedItem,
        headers: {
          Authorization: `Bearer <your_token_here>` // Replace with a valid token
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'Updated Item');
      });
    });
  
    it('should delete an item', () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/items/${userId}`, // Replace with the actual item ID you want to delete
        headers: {
          Authorization: `Bearer <your_token_here>` // Replace with a valid token
        }
      }).then((response) => {
        expect(response.status).to.eq(204); // Assuming successful deletion returns 204
      });
    });
  });

