FROM node:alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --save
COPY . .
RUN npx ng build --configuration=production
FROM nginx:latest AS ngi
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80