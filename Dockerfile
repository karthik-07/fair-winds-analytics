FROM node:18-alpine

WORKDIR /app

COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

RUN cd frontend && npm install
RUN cd backend && npm install

COPY frontend ./frontend
COPY backend ./backend

RUN cd frontend && npm run build

EXPOSE 5000

CMD ["node", "backend/server.js"]