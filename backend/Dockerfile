FROM node:lts
WORKDIR /app
COPY backend/package*.json ./backend/
COPY backend/tsconfig*.json ./backend/

WORKDIR /app/backend
RUN npm install

WORKDIR /app
COPY backend/ ./backend/
COPY shared/ ./shared/

WORKDIR /app/backend
RUN npm run build

EXPOSE 3000
CMD ["node", "./dist/backend/src/server.js"]