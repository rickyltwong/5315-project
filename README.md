# ITE5315 End-of-semester Project

## Project Overview
This project focuses on developing a DB-driven Node/Express application with RESTful API. The primary goal is to explore database connectivity, RESTful API design, and implementing security and advanced features in a Node.js environment.

## Tech Stack

- Handlebars template engines (hbs): For UI rendering.
- Node/Express: For the server-side application.
- MongoDB/Mongoose: For the database and ODM.
- Git: For version control.
- Vercel: For deployment.

## Features

- **CRUD Operations:** Create, read, update and delete restaurants.
- **Pagination and Filtering**: Retrieve restaurants with options for pagination and filtering by borough.
- **User Interface:** Simple UI to display restaurant data.
- **Security:** Implement JWT authentication for secure API access (All restaurant have limited access).
- **EXTRA FUNCTIONALITY: Upvote**: User can upvote a restaurant.

## Project Structure

- `app.js` - Main application file.
- `server.js` - Express server configuration.
- `/services` - services logic including database configuration (also include DB operations and exported as a module as per project requirement).
- `/routes` - Contains the route definitions for the API.
- `/models` - Mongoose models for MongoDB documents.
- `/views` - Handlebars templates for the UI.
- `/controllers` - Contains handlers for the routes.
- `/middlewares` - Contains middleware functions.
- `.env` - Environment variables file (not included in the repository).
- ... (to be updated)

## API Endpoints

- `POST /api/restaurants` - Add a new restaurant.
- `GET /api/restaurants` - Get a list of restaurants, with pagination and optional borough filtering.
- `GET /api/restaurants/:id` - Get a specific restaurant by ID.
- `PUT /api/restaurants/:id` - Update a specific restaurant.
- `DELETE /api/restaurants/:id` - Delete a specific restaurant.

## Pages

- `/` - The home page (redirected to `/login`).
- `/restaurants` - A UI page for searching and viewing restaurants.
- `/login` - A login page for authenticating users.
- `/signup` - A signup page for creating new users.
- `/profile` - A user profile page.

## Installation

### Pre-requisites
Note that you need to have MongoDB installed and running on your local machine for database connection to work. 
You can also use a cloud-based MongoDB service like MongoDB Atlas.

### Steps

To run this project locally, follow these steps:

1. Clone the repository: `git clone git@github.com:rickyltwong/5315-project.git`
2. Install dependencies: `npm install`
3. Create a `.env` file with the following environment variables:
   ```
   PORT=3000
   DB_CONNECTION_STRING=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=1440
   JWT_COOKIE_EXPIRES_IN=1440
   ```
4. Start the server: `npm start`
5. Visit `http://localhost:3000` in your browser.

### Remark

For demonstration purpose, JWT will not be expired.


