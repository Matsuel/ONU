FROM node:latest

WORKDIR /app

# Copy root package.json files first to leverage Docker cache
COPY package*.json ./

# Install dependencies for the root project (Next.js app)
RUN npm install

# Copy the rest of the application files
COPY . .

# Install dependencies for the server located in ./server
WORKDIR /app/server
RUN npm install  # Install dependencies inside the ./server directory

# Return to the root directory for running the app
WORKDIR /app

# Create a user and group for running the app (security)
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Set permissions to ensure proper access rights
RUN chown -R appuser:appgroup /app

# Switch to the non-root user for running the app
USER appuser

# Expose the port (make sure the port matches your app's frontend/backend port)
EXPOSE 3000
EXPOSE 8000

# Run both the Next.js dev server and the backend server concurrently
CMD ["npm", "run", "dev"]

