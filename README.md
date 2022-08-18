# Starting the application

1. Run npm run setup
2. Run docker-compose up
3. After the containers are running you can do requests on localhost:3000

# Making requests
Use postman to do the requests. 
IMPORTANT: All requests should contain a header with x-api-key = dK9WBV5H@7

These are the endpoints available:
- GET /car - List all cars metadata
- GET /car/[ID] - Show details of a car
- POST /car - Allows you to create a car (the only filed required is the brand)
- PATCH /car/[Id] - Allows you to update a car partially
- DELETE /car/[ID] - Allows you to delete a car

# Extra
You can run tests using `npm test`
You can run the linting using `npm run lint`
