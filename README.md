# Pizza Delivery App API

This is a simple Node.js backend application for a Pizza Delivery App, built with the NestJS framework.

## Features

-   **Pizza Management:** CRUD operations for pizzas.
-   **Order Management:** CRUD operations for orders.
-   **Validation:** DTO validation using `class-validator`.
-   **Configuration:** Database configuration using `.env` file.
-   **Health Check:** A `/health` endpoint to check the application status.

## Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or higher)
-   [npm](https://www.npmjs.com/)
-   [MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/pizza-delivery-app.git
    cd pizza-delivery-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following:

    ```
    MONGO_URI=mongodb://localhost:27017/pizza-delivery
    ```

4.  **Run the application:**

    ```bash
    npm run start:dev
    ```

    The application will be running on `http://localhost:3000`.

## API Endpoints

### Pizzas

-   `GET /pizzas`: List all pizzas
-   `GET /pizzas/:id`: Get a pizza by ID
-   `POST /pizzas`: Create a new pizza
-   `PUT /pizzas/:id`: Update pizza details
-   `DELETE /pizzas/:id`: Delete a pizza

### Orders

-   `GET /orders`: List all orders
-   `GET /orders/:id`: Get order details
-   `POST /orders`: Create a new order
-   `PUT /orders/:id`: Update order status
-   `DELETE /orders/:id`: Delete an order

### Health Check

-   `GET /health`: Check the application status

## Project Structure

```
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── order
│   │   ├── dto
│   │   │   ├── create-order.dto.ts
│   │   │   └── update-order.dto.ts
│   │   ├── schemas
│   │   │   └── order.schema.ts
│   │   ├── order.controller.ts
│   │   ├── order.module.ts
│   │   └── order.service.ts
│   └── pizza
│       ├── dto
│       │   ├── create-pizza.dto.ts
│       │   └── update-pizza.dto.ts
│       ├── schemas
│       │   └── pizza.schema.ts
│       ├── pizza.controller.ts
│       ├── pizza.module.ts
│       └── pizza.service.ts
├── .env
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```
