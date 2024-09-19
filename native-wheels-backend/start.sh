#!/bin/bash

# Stop and remove all running containers
docker-compose down

# Start containers in detached mode
docker-compose up -d

# Run the dummy.js script
node dummy.js

# Run the server.js script
node server.js