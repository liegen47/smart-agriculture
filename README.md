# Smart Agriculture Management System - Backend

This repository contains the backend implementation for the Smart Agriculture Management System. The backend is built using **Node.js** and **Express.js**, with **MongoDB** as the database. The backend handles API requests, user authentication, and field data management.

## Features

1. **User Authentication**
   - Secure login and signup system using JWT for token-based authentication.
   - Role-based access control (e.g., Admin, Farmer).

2. **Field Management**
   - Add, update, delete, and retrieve field data.
   - Supports pagination for retrieving field data.

3. **AI Integration**
   - Dummy AI endpoint for soil and crop health analysis.

4. **Payment Gateway**
   - Integration with payment services for subscription-based features.

5. **Data Visualization**
   - API support for retrieving data for visualizations.

6. **Responsive Design**
   - Backend supports features that facilitate mobile-friendly frontend applications.

---

## Installation

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/liegen47/smart-agriculture
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Visit the Swagger API documentation at:
   ```
   http://localhost:5000/api-docs
   ```

---

## API Documentation

The API documentation is available via Swagger UI.

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Authenticate a user and return a JWT.
- `GET /api/auth/verify` - Verify the JWT token.

#### Field Management
- `POST /api/fields` - Add a new field.
- `GET /api/fields` - Get all fields with pagination.
- `GET /api/fields/:id` - Get details of a specific field.
- `PUT /api/fields/:id` - Update a field.
- `DELETE /api/fields/:id` - Delete a field.

#### AI Integration
- `GET /api/ai/health` - Dummy AI endpoint for crop and soil health analysis.

---

## Folder Structure

```
smart-agriculture-backend/
├── controllers/    # Logic for handling API requests
├── models/         # Mongoose schemas for MongoDB
├── routes/         # Route definitions
├── middleware/     # Custom middleware (e.g., authentication)
├── config/         # Configuration files (e.g., database connection)
├── utils/          # Utility functions
├── swagger.js      # Swagger API documentation setup
├── server.js       # Entry point of the application
```

---

## Deployment

1. Deploy the backend to platforms like Heroku, Render, or AWS.
2. Use environment variables to configure the production database and other secrets.
3. Ensure the frontend can communicate with the deployed backend.

---

## Contributing

Contributions are welcome! Please fork the repository, make changes, and submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For any queries, please reach out to:
- Email: vanshkapoor418@gmail.com
- GitHub: [your-github-username](https://github.com/Liegen47)

