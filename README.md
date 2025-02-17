# Invoice Generator

A full-stack web application that enables users to create and download invoices in PDF format. Built using MongoDB, Express.js, Node.js, and Puppeteer.

## Features

- User Registration and Login
- Add Products with GST computation
- Generate Invoices in PDF format
- View and Download Quotations

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **PDF Generation**: Puppeteer
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt.js

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (You can use MongoDB Atlas or a local MongoDB instance)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/invoice-generator.git
    cd invoice-generator
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Create a `.env` file in the root directory and add the following environment variables:**

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4. **Start the application:**

    ```sh
    npm start
    ```

    The server will start on `http://localhost:5000`.

### API Endpoints

#### User Registration

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }

  #### User Login

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
- **Response**: 
 ```json
  {
    "token": "your_jwt_token"
    }

 #### Add Products and Generate PDF

- **URL**: `/api/quotations/add`
- **Method**: `POST`
- **Headers**: 
  ```json
  {
     "Authorization": "Bearer your_jwt_token"
  }
- **Body**: 
  ```json
  {
    "products": [
    { "name": "Product 1", "qty": 3, "rate": 300 },
    { "name": "Product 2", "qty": 2, "rate": 100 }
  ]
  }
- **Response**: 
 ```json
  {
  "message": "Quotation created and PDF generated",
  "pdfPath": "path/to/generated/pdf"
}


 #### View Quotations

- **URL**: `/api/quotations/view`
- **Method**: `GET`
- **Headers**: 
  ```json
  {
     "Authorization": "Bearer your_jwt_token"
  }

- **Response**: 
 ```json
 [
  {
    "_id": "quotation_id",
    "userId": "user_id",
    "products": [
      { "name": "Product 1", "qty": 3, "rate": 300, "total": 900 },
      { "name": "Product 2", "qty": 2, "rate": 100, "total": 200 }
    ],
    "totalAmount": 1100,
    "gst": 198,
    "grandTotal": 1298,
    "pdfPath": "path/to/generated/pdf",
    "createdAt": "2024-07-24T00:00:00.000Z",
    "updatedAt": "2024-07-24T00:00:00.000Z",
    "__v": 0
  }
]