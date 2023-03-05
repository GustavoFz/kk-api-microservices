# Cart API with microservices

## Running the example with docker-compose

Execute `cp .env.example .env && docker-compose up -d` from the root of the repository

- When run in docker, a container called mongo_seed will seed the product bank with seed items

## Accessing the swagger docs for the API

- Swagger docs for the API will be accessible locally via URI "**http://localhost:3000/api**"

## Architecture overview

- API gateway
- Product service - responsible for product CRUD.
- Cart service - responsible for cart CRUD.
