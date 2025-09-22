# Caminho dos Ventos

Caminho dos Ventos is a NestJS application designed as a Minimum Viable Product (MVP) that integrates with PostgreSQL. This project aims to provide a robust backend solution for managing users, authentication, and order features.

## Features

- **User Management**: Create, retrieve, update, and manage user information.
- **Authentication**: Secure user registration, login, and session management.
- **Order Management**: Create, list, and update orders with relevant details.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd caminho-dos-ventos
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the database connection in `ormconfig.json`:
   ```json
   {
     "type": "postgres",
     "host": "localhost",
     "port": 5432,
     "username": "your_username",
     "password": "your_password",
     "database": "your_database",
     "synchronize": true,
     "entities": ["src/modules/**/*.entity{.ts,.js}"]
   }
   ```

4. Run the application:
   ```
   npm run start
   ```

### Usage

- The API endpoints for user management, authentication, and order management can be accessed via the configured server URL.
- Use tools like Postman or curl to interact with the API.

## License

This project is licensed under the MIT License. See the LICENSE file for details.