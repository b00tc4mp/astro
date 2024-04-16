// Importa tu controlador de sesiones
import request  from 'supertest';
import app from '../src/main.js'


describe('Endpoints de sesiones', () => {
    test('Should respond with status 200 reating a new user or a 401 if de user already exists', async () => {
        const registrationData = {
          nombre: 'Name',
          apellido: 'LastName',
          email: 'new_user@example.com',
          password: 'password',
        };
    
        const response = await request(app)
          .post('/sessions/register') 
          .send(registrationData);
    
          expect(response.statusCode === 200 || response.statusCode === 401).toBeTruthy();
      });

    test('Should respond with status 200 when making a POST request to /login', async () => {
        const loginData = {
          email: 'as@as.com',
          password: '123123',
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MWFlMzkwYmI3MjQ4MTEzNzI2NWVlNCIsIm5vbWJyZSI6ImFzIiwiYXBlbGxpZG8iOiJhcyIsImVtYWlsIjoiYXNAYXMuY29tIiwicGFzc3dvcmQiOiIkMmIkMTUkV1U1LnB3cXpMUHZHOVoyQ3NuLkZtdU5tbVpKSDcuaXRrTE1FN2cxM29JM1hERGpheDdtZzIiLCJyb2wiOiJ1c2VyIiwiX192IjowfSwiaWF0IjoxNzEzMjYwMTQzLCJleHAiOjE3MTMzMDMzNDN9"
        };
    
        const response = await request(app)
          .post('/sessions/login') 
          .send(loginData);
    
        expect(response.statusCode).toBe(200);
      });

    test('Should respond with status 200 when making a GET request to /current', async () => {
    // Simulate an authenticated user with a valid JWT token
    const user = {
        email: "santi@santi.com",
        password: "123123",
    };

    const response = await request(app)
        .get('/sessions/current') // Adjust the route according to your setup
        .set('Authorization', `Bearer ${user.token}`); // Send the JWT token in the Authorization header

    expect(response.statusCode).toBe(200);
    });

    test('Should logout already login user', async ()=> {
        const response = await request(app).get('/sessions/logout')

        expect(response.statusCode).toBe(200);
    })

});
