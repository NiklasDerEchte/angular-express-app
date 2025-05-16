FROM node:lts AS builder
WORKDIR /app
COPY frontend/package*.json ./frontend/
COPY frontend/tsconfig*.json ./frontend/

WORKDIR /app/frontend
RUN npm install --save

WORKDIR /app
COPY frontend/ ./frontend/
COPY shared/ ./shared/

WORKDIR /app/frontend
RUN npx ng build --configuration=production

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200