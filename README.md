# JSON Web Token Authentication Demo

## Introduction

This project demonstrates JSON Web Token (JWT) authentication in a Node.js web application. It uses Express.js for routing, EJS for rendering views, and Mongoose for database interaction. Additionally, it employs various libraries such as `cookie-parser`, `bcrypt`, `axios`, `jsonwebtoken`, and `validator` for enhanced functionality.

## Theory

When a user logs in, a JWT token is generated which is then sent to the client using cookies.

A token consists of 3 parts:

1. **Header:** Header is metadata about the token (e.g., which algorithm is used in it and type of token).
2. **Payload:** Payload is the actual data of the user which will be used for authentication.
3. **Digital signature:** The digital signature is generated using header, payload, and the secret key.

### Creating Token

First header and payload are base64 encoded and then digitally signed using secret key.
To create the signature, the encoded header and encoded payload are concatenated with a period ('.') between them. This string is then signed using a secret key. The resulting signature is then base64Url encoded.
Finally, the encoded header, encoded payload, and encoded signature are concatenated using dots ('.') to form the complete JWT token.

### Verifying token

1. Decode the JWT's header and payload.
1. Recompute the signature using the header, payload, and secret key.
1. Compare the computed signature with the JWT's signature.
1. Validate claims (like expiration time) in the payload.
1. Ensure the token hasn't been revoked.
1. If all checks pass, the token is valid, and access is granted.

### Considerations

-   Storing sensitive information like passwords directly in a JWT is a bad idea. As JWTs can be easily decoded by anyone who intercepts them, so including sensitive data like passwords directly in a JWT would expose that information to potential attackers.

-   Base64 encoding is a simple transformation that doesn't provide any security by itself. It's meant to make data safe for transmission, not to keep it secret. Anyone with the JWT can decode it, but the real security is in the signature.

-   The critical aspect of JWT security is the signature. The signature is created using a secret key (or private key in asymmetric algorithms) that only the server knows. This signature is used to verify the integrity and authenticity of the token. If the token is tampered with in any way, the signature won't match, and the token will be considered invalid.

## Features

-   User registration with validation for email and password.
-   User login with password hashing and validation.
-   Uses axios for sending request from frontend to backend.
-   Authentication using JWT.
-   Protected routes that require authentication.
-   Clear error handling and validation messages.
-   EJS templates for rendering views.
-   Basic styling with customizable CSS variables.
-   MongoDB integration using Mongoose.
-   Efficient password hashing with bcrypt.
-   Email validation using the `validator` library.

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js and npm (Node Package Manager)
-   Git (optional, for cloning the repository)
-   MongoDB

## Installation

### Clone the Repository

```bash
git clone https://github.com/Pankaj-Panday/jwt-authentication.git
cd jwt-authentication
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Rename `.env.example` to `.env` file in the project root and edit the following content:

```dotenv
JWT_SECRET="your-secret-key"
DB_URL="mongodb://localhost:27017"
DB_NAME="db-name"
PORT=3000
```

Replace `"your-secret-key"` with a strong and unique secret key for JWT.

## Usage

1. Run the MongoDB server.

1. Run the application:
   `npm start`
1. Access the application in your web browser at http://localhost:3000.

### User Routes

-   `/user/signup`: Register a new user.
-   `/user/login`: Log in with your credentials.
-   `/user/profile`: View user profile.
-   `/user/logout`: Log out of the application.

### Styling

Styling for the project is defined in the `public/styles/main.css` file. You can modify this file to adjust the appearance of your application. CSS variables are used for easier customization.

## Demo


https://github.com/Pankaj-Panday/jwt-authentication/assets/55234406/3a220489-8123-430a-b566-38048fffd4a1


