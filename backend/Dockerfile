# Step 1: Build frontend
FROM node:16 AS frontend-build

WORKDIR /frontend

# Copy the package.json and package-lock.json for frontend
COPY frontend/package*.json ./

# Install dependencies for the frontend
RUN npm install

# Copy the rest of the frontend files
COPY frontend/ ./

# Run build command to generate static assets
RUN npm run build

# Step 2: Backend service
FROM node:16

WORKDIR /backend

# Copy backend package.json and install dependencies
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the backend code
COPY backend/ ./

# Copy built frontend assets from frontend-build stage to the correct location in the backend
COPY --from=frontend-build /frontend/build /backend/src/public

# Expose the backend port (5000)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
