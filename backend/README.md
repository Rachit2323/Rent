# Rentify Backend
This is the backend for the Rentify project. 

## Tech used
- TypeScript
- Express
- MongoDB
- Node

## Features
- CRUD operations for users
- CRUD operations for properties

## Software requirements
- Node.js
- [MongoDB compass](https://www.mongodb.com/docs/compass/current/install/) or MongoDB Atlas

## Getting started
To get the Node server running locally:
- Clone this repo
- `npm install` to install all required dependencies
- Run moongose server locally or use cloud service like MongoDB Atlas
    - Create a new cluster in MoondoDb compass or MongoDB Atlas
    - Create a new database named `rentify`
    - copy the connection string and replace `<your_mongo_uri>` in the `.env` file
- create a `.env` file in the root directory and add the following
    ```env
    PORT=4000
    MONGO_URI=<your_mongo_uri>
    JWT_SECRET=<your_secret>
    ```
    eg env file
    ```env
    PORT=4000
    JWT_SECRET=rentify
    MONGODB_URI=mongodb://localhost:27017/rentify
    ```
- `npm run dev` to start the local server


### Endpoints

**Base URL** : The API is served at `http://localhost:4000`
<!-- auth endpoints -->
#### Auth Endpoints
- POST `/api/auth/register` : Register a new user
    - Request body
    ```json
    {
		"firstName": "John",
		"lastName": "Doe",
		"email": "john@gmail.com",
		"password": "12345678",
		"phone": "0987654321",
		"role": "seller"
    }
    ```
    - Response
    ```json
    {
        "token": "eyJhb",
        "role": "seller"
    }
    ```
    - Note: The token is required for all restricted endpoints


- POST `/api/auth/login` : Login a new user
    - Request body
    ```json
    {
        "email": "john@gmail.com",
        "password": "12345678"
    }
    ```
    - Response
    ```json
    {
        "token": "eyJhb",
        "role": "seller"
    }
    ```
    - Note: The token is required for all restricted endpoints

<!-- Property endpoints -->
#### Property Endpoints
- GET `/api/properties` : Get all properties
    - Optional query params
        - `furnishing` : Filter by furnishing eg. `furnishing=semi furnished`
        - `bedrooms` : Filter by bedrooms eg. `bedrooms=3`
        - `bathrooms` : Filter by bathrooms eg. `bathrooms=4`
        - `price` : Filter by price eg. `price=30000-40000`
    - Response
    ```json
    [
        {  
            "_id": "664f80c65234d3f3d1e0de0f"
            "name": "3 BHK Fully furnished room in Bangalore",
            "address": "Mysore",
            "furnishing": "semi furnished",
            "price": 30000,
            "bedrooms": 3,
            "bathrooms": 4,
            "description": "3BHK with 4 bathrooms",
            "img": "https://www.sastaghar.in/wp-content/uploads/2022/03/image-2-7-27-85.jpg",
            "sellerId": "664f37ffaf68a3f02923c1a0"
        }
    ]
    ```
- GET `/api/properties/id/:pid` : Get a property by id
    - Response
    ```json
    {
        "_id": "664f80c65234d3f3d1e0de0f"
        "name": "3 BHK Fully furnished room in Bangalore",
        "address": "Mysore",
        "furnishing": "semi furnished",
        "price": 30000,
        "bedrooms": 3,
        "bathrooms": 4,
        "description": "3BHK with 4 bathrooms",
        "img": "https://www.sastaghar.in/wp-content/uploads/2022/03/image-2-7-27-85.jpg",
        "sellerId": "664f37ffaf68a3f02923c1a0",
        "seller": {
            "name": "John Doe",
            "email": "john@gmail.com",
            "phone": "0987654321"
        }
    }
    ```

#### Restricted api to seller only
- GET `/api/properties/seller/all` : Get all properties of logged in user
    - Response
    ```json
    [
        {  
            "_id": "664f80c65234d3f3d1e0de0f"
            "name": "3 BHK Fully furnished room in Bangalore",
            "address": "Mysore",
            "furnishing": "semi furnished",
            "price": 30000,
            "bedrooms": 3,
            "bathrooms": 4,
            "description": "3BHK with 4 bathrooms",
            "img": "https://www.sastaghar.in/wp-content/uploads/2022/03/image-2-7-27-85.jpg",
            "sellerId": "664f37ffaf68a3f02923c1a0"
        }
    ]
    ```

- POST `/api/properties/seller` : Add a new property
    - Request body
    ```json
    {
        "name": "3 BHK Fully furnished room in Bangalore",
        "address": "Mysore",
        "furnishing": "semi furnished",
        "price": 30000,
        "bedrooms": 3,
        "bathrooms": 4,
        "description": "3BHK with 4 bathrooms",
        "img": "https://www.sastaghar.in/wp-content/uploads/2022/03/image-2-7-27-85.jpg"
    }
    ```
- PUT `/api/properties/seller/id/:pid` : Update a property
    - Request body
    ```json
    {
        "name": "3 BHK Fully furnished room in Bangalore",
        "address": "Mysore",
        "furnishing": "semi furnished",
        "price": 30000,
        "bedrooms": 3,
        "bathrooms": 4,
        "description": "3BHK with 4 bathrooms",
        "img": "https://www.sastaghar.in/wp-content/uploads/2022/03/image-2-7-27-85.jpg"
    }
    ```
- DELETE `/api/properties/seller/id/:pid` : Delete a property
    - Response
    ```json
    {
        "_id": "664f80c65234d3f3d1e0de0f",
        "name": "3 BHK Fully furnished room in Bangalore",
        "address": "Mysore",
        "furnishing": "semi furnished",
        "price": 30000,
        "bedrooms": 3,
        "bathrooms": 4,
        "description": "3BHK with 4 bathrooms",
        "img": "https://www.sastaghar.in/wp-content/uploads/2022/03/image-2-7-27-85.jpg",
        "sellerId": "664f37ffaf68a3f02923c1a0"
    }
    ```
- Header for restricted endpoints
    - `Authorization: Bearer <token>`
    - Note: The token is required for all restricted endpoints
    eg: `Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGYzN2ZmYWY2OGEzZjAyOTIzYzFhMCIsImlhdCI6MTY0NzQwNjYwMCwiZXhwIjoxNjQ3NDkzMDAwfQ.7J9zv`
    eg code: 
    ```javascript
        headers: {
            Authorization: `Bearer ${token}`,
        }
    ```
