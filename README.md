# Ticketing Application

This is a ticketing-based application built using a microservices architecture, developed with a variety of technologies, including React, Next.js, TypeScript, Docker, Node.js, Express, MongoDB, Redis, and NATS Streaming Server. This README provides an overview of the project, its structure, and how to get it up and running.

## Table of Contents

- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installing Dependencies](#installing-dependencies)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Description

The Ticketing Application is a system for managing and selling tickets to various events. It is designed using a microservices architecture, where different aspects of the application are handled by separate services. These services can communicate with each other through a message broker (NATS Streaming Server), allowing for a scalable and fault-tolerant system.

Key features of this application include:

- User authentication and authorization
- Creating and managing events
- Buying and selling tickets
- Real-time updates through WebSocket communication
- Ticket order and payment processing

## Technologies Used

The Ticketing Application leverages the following technologies:

- **React** and **Next.js** for the front-end.
- **TypeScript** for type safety and improved code quality.
- **Docker** for containerization and ease of deployment.
- **Microservices** architecture to split the application into manageable pieces.
- **NATS Streaming Server** for message-driven communication between services.
- **Node.js** and **Express** for server-side logic.
- **MongoDB** as the database for persisting data.
- **Redis** for caching and session management.

## Prerequisites

Before you can run the application, you need to have the following software installed on your system:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [NATS Streaming Server](https://docs.nats.io/nats-streaming-server/intro/installation)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

## Getting Started

Follow these steps to get the Ticketing Application up and running on your local development environment.

### Installing Dependencies

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/ticketing-application.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ticketing-application
   ```

3. Install dependencies for each service by navigating to their respective directories and running:

   ```bash
   cd auth
   npm install

   # Repeat this for other services
   ```

### Running the Application

1. Start the required services (NATS Streaming Server, MongoDB, and Redis) using Docker Compose:

   ```bash
   docker-compose up
   ```

2. Start the individual services. You can start each service in its respective directory:

   ```bash
   # In the auth service directory
   cd auth
   npm start

   # Repeat this for other services
   ```

3. The application should now be up and running. You can access it by opening your web browser and navigating to `http://localhost:3000`.

## Project Structure

The project is organized into multiple services, each residing in its own directory. Here is an overview of the project's structure:

- `auth`: User authentication service.
- `tickets`: Ticket creation and management service.
- `orders`: Ticket order and payment processing service.
- `common`: Shared code and libraries used by various services.
- `client`: The React and Next.js front-end application.

You can find more detailed information about each service within their respective directories.

## Contributing

We welcome contributions to the project. If you want to contribute, please follow our [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

Enjoy using the Ticketing Application! If you have any questions or encounter issues, please feel free to open an issue on the GitHub repository.
