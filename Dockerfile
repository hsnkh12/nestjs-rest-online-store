# Use the official Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the application (you might have a different build command depending on your setup)
RUN npm run build

# Expose the port your NestJS application listens on
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]
