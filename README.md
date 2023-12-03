```
                  _    _                _                                       _     _ 
  _ __   ___  ___| |_ (_)___        ___| | ___  __ _ _ __         __ _ _ __ ___| |__ (_)
 | '_ \ / _ \/ __| __|| / __|_____ / __| |/ _ \/ _` | '_ \ _____ / _` | '__/ __| '_ \| |
 | | | |  __/\__ \ |_ | \__ \_____| (__| |  __/ (_| | | | |_____| (_| | | | (__| | | | |
 |_| |_|\___||___/\__|/ |___/      \___|_|\___|\__,_|_| |_|      \__,_|_|  \___|_| |_|_|
                    |__/                                                                
```

This project is designed to experiment with Clean Architecture using NestJS, a JavaScript/TypeScript framework for building scalable and modular backend applications.

The main objective of this project is to implement the features of task creation (todos) and authentication, while adhering to the principles of Clean Architecture.

## Features

- **Task Creation (Todos)**: Users can create and manage tasks. Each task can have a title, description, and status (completed or not).
- **Authentication**: Users can authenticate to access the task management features. Authentication is based on an email address and password system.

## Code Structure

The code in this project is organized following the structure of Clean Architecture, which provides a clear separation of responsibilities and facilitates code maintainability and scalability.

The folder structure is as follows:

- **Usecases**: This folder contains the use cases of the application. Each use case represents a specific functionality of the application, such as task creation or authentication. Use cases define the interactions between the different layers of the architecture.
- **Domain**: This folder contains the domain entities of the application, such as the User and Todo models. The domain entities encapsulate the domain rules and are independent of implementation details.
- **Infrastructure**: This folder contains the concrete implementations of the interfaces defined in the domain. It also includes external adapters, such as the encryption service (bcrypt) and exception services. The infrastructure is responsible for interfacing with external libraries and services.
- **Presentation**: This folder contains the controllers and routes of the application. It is the user interface layer that handles HTTP requests and calls the appropriate use cases to process the requests.

## Prerequisites
Before getting started, make sure you have docker installed on your system.

## Installation

Follow the steps below to install and run the project:

1. Clone the GitHub repository:
```
git clone https://github.com/a-lafon/nestjs-clean-architecture-sample.git
```

2. Navigate to the project directory:
```
cd nestjs-clean-architecture-sample
```

3. Start docker compose:
```
docker compose up
```

Then play with [api on localhost:3000](http://localhost:3000/doc).

## Running tests

To run the unit tests use the following command:

```
npm run test
```

Run with coverage:

```
npm run test:cov
```

## Swagger Documentation

This project includes Swagger documentation to facilitate understanding of the APIs exposed by the application. You can access the Swagger documentation using the **/doc** endpoint.