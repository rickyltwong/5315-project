# ITE5315 End-of-semester Project

## Project Overview
This project focuses on developing a DB-driven Node/Express application with RESTful API. The primary goal is to explore database connectivity, RESTful API design, and implementing security and advanced features in a Node.js environment.

## Tech Stack

- Handlebars template engines (hbs)
- Node/Express
- MongoDB/Mongoose
- Git
- Vercel

## Features

- **CRUD Operations:** Create, read, update and delete restaurants.
- **Pagination and Filtering**: Retrieve restaurants with options for pagination and filtering by borough.
- **User Interface:** Simple UI to display restaurant data.
- **Security:** Implement JWT authentication for secure API access.

## Project Structure

- `app.js` - Main application file.
- `server.js` - Express server configuration.
- `/config` - Configuration files, including database configuration (also include DB operations and exported as a module as per project requirement).
- `/routes` - Contains the route definitions for the API.
- `/models` - Mongoose models for MongoDB documents.
- `/views` - Handlebars templates for the UI.
- `/controllers` - Contains handlers for the routes.
- `.env` - Environment variables file (not included in the repository).
- ... (to be updated)

## API Endpoints

- `POST /api/restaurants` - Add a new restaurant.
- `GET /api/restaurants` - Get a list of restaurants, with pagination and optional borough filtering.
- `GET /api/restaurants/:id` - Get a specific restaurant by ID.
- `PUT /api/restaurants/:id` - Update a specific restaurant.
- `DELETE /api/restaurants/:id` - Delete a specific restaurant.

## Pages

- `/restaurants` - A UI page for searching and viewing restaurants.