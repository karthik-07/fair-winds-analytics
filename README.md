# Getting Started

This README provides instructions for setting up and running the application.


## Installation

1. Clone the repository
   ```
   git clone https://github.com/karthik-07/fair-winds-analytics.git
   cd fair-winds-analytics
   ```

2. Install dependencies

   ```
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

## Development Mode

3. Run in development mode:

   ```
   # Start the backend server (in the backend directory)
   npm run dev

   # In a separate terminal, start the frontend dev server (in the frontend directory)
   npm run dev
   ```

## Docker Deployment

4. Build and run with Docker:

   ```
   # Build and start the containers
   docker-compose up -d

   # To stop the containers
   docker-compose down
   ```

## Accessing the Application

5. Access the application:
   - In development:
     - Frontend: http://localhost:5173
     - Backend: http://localhost:5000
   - With Docker: http://localhost:5000
