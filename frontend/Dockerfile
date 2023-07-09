# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install necessary tools
RUN apk add --no-cache build-base

# Copy the rest of the frontend code to the working directory
COPY . .

# Build the frontend
RUN npm run build

# Expose the port on which the frontend will run (modify if needed)
EXPOSE 3000

# Command to start the frontend server
CMD ["npm", "start"]
