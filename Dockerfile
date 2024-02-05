# Use an official Node runtime as a base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Copy tsconfig.json
COPY tsconfig.json ./

RUN npm install

# Copy the TypeScript source code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start-prod"]
