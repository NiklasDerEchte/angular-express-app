FROM node:lts AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --save
COPY . .
RUN npx ng build --configuration=production
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200