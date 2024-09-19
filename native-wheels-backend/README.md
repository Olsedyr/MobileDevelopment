# Native Wheels Backend

## Getting Started

To get the project running, do the following in the order provided.

### Environment variables

Ensure that you have your .env populated with the correct data.

There is an example in the `.env.example` which can be copied with the following command:

```bash
cp .env.example .env
```

### Shell Script

To start the database, insert dummy data and start the backend server all in one command, you can run the provided shell script `start.sh`.

> (Note that this still requires the .env to be populated as described in previous step)

Run the following command:

```bash
bash start.sh
```

### Database

To start the database run the following command:

```bash
docker compose up
```

### Starting the backend

First install the needed dependencies:

```bash
npm install
```

To populate the database with some dummy cars run the `dummy.js` script with the database running:

```bash
node dummy.js
```

To start the backend server:

```bash
node server.js
```

## Authentication

### Register User

To register a new user, send a `POST` request to the following endpoint:

```bash
/api/register
```

The request body should be in JSON format and include the following fields:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

### Login User

To log in a user, send a `POST` request to the following endpoint:

```bash
/api/login
```

The request body should be in JSON format and include the following fields:

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

The response will include a token and a token type. For authenticated requests, add the token as `Authorization` header in the format:

```
Authorization: Bearer <token>
```

You can try to send a request to :

```bash
/api/cars
```

This route is authenticated so the token is required as a heaader.
