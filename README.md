# Fullstack Angular-Express.js Project-Structure

A proven fullstack project structure, optimized for medium-sized single-page applications (SPA) to large-scale software projects. The frontend and backend are separated but can share common entities.

# Structure


| Service                              | Port | Path | Description                                     | Developing                                  | Production     |
| :------------------------------------- | ------ | ------ | ------------------------------------------------- | --------------------------------------------- | ---------------- |
| [Angular](https://angular.dev/)      | 4200 | /    | Frontend                                        | ng serve                                    | docker - nginx |
| [Express.js](https://expressjs.com/) | 3000 | /api | Backend                                         | ts-node-dev                                 | docker - node  |
| Proxy Reverse                        | 80   | /*   | SSL handling -<br />routing to Frontend/Backend | (handled by[Angular](https://angular.dev/)) | docker - nginx |

# Developing

Setup for developing

## Install dependencies

To install the necessary dependencies for both the backend and frontend and from the root to start the development server simultaneously, run the following commands:

```bash
cd backend
npm install # install backend dependencies
cd ..
cd frontend
npm install # install frontend dependencies
cd ..
npm install # install dev dependencies
```

## Run development mode

To start the development server, use the following command:

```bash
npm run dev
```

# Production

For the **reverse proxy server**, you could use [nginx/docker](https://hub.docker.com/_/nginx): `docker pull nginx:latest`.

A configuration for SSL handling and routing between the frontend and backend can be found under `.prod/etc/nginx/sites-available/example.conf`.
For SSL, [Certbot](https://certbot.eff.org/) is required.

## SSL Certificate Setup

To set up SSL certificates using [Certbot](https://certbot.eff.org/), follow these steps:

### Update and Install Certbot

Run the following commands to update your system and install [Certbot](https://certbot.eff.org/) along with the necessary Nginx plugin:

```bash
sudo apt update
sudo apt install certbot
sudo apt install certbot python3-certbot-nginx
```

### Obtain an SSL Certificate

Use Certbot to obtain an SSL certificate for your domain:

```bash
sudo certbot certonly --standalone -d example.com
```

### Automatic Renewal

To ensure your SSL certificates are renewed automatically, add a cron job:

1. Open the crontab editor:

   ```bash
   sudo crontab -e
   ```
2. Add the following line to schedule automatic renewal at 3:00 AM daily:

   ```bash
   0 3 * * * certbot renew --quiet
   ```

   > **Note:** By default, SSL certificates issued by Certbot are valid for 90 days. Regular renewal ensures uninterrupted service.
   >

## Proxy

To enable communication between the frontend and backend through a single URL, some redirections are required.

On the live server, three services are running:

- **Angular**: Port 4200
- **Express.js**: Port 3000
- **Proxy**: Port 80

### Setting Up API Routes

In the `frontend/src/environments` directory, the base API routes are defined. These routes allow the frontend to communicate with the backend. They also point to the frontend itself, as a proxy will later redirect these requests to another service.

Example for development:

```
[localhost:4200 | production_url]/api/
```

### Local Development Proxy

In `frontend/src/proxy.conf.json`, the path `/api/` is removed to enable access to the local backend during development.

Example:

```
[localhost:3000](/)
```

### Production Proxy Configuration

In production mode, the `frontend/src/proxy.prod.json` file is used. It redirects requests with the path `/api/` to the backend using an Nginx proxy server.

Example:

```
[production_url]/api/
```

The [proxy server](#production) forwards requests with the `/api/` path to the backend, which is running on port 3000, by mapping them to the root path `/`.

## Build and Run with Docker

To build and run the application using Docker, follow these steps:

### Clone the Repository

Clone the project repository to your server:

```bash
echo "start cloning..."
git clone git@github.com:NiklasDerEchte/angular-express-app.git ng-express
cd ng-express/
```

### Build Docker Images

Build the Docker images for the backend and frontend:

```bash
echo "building backend docker image..."
docker build --no-cache -t niklasderechte/backend:v0.1.0 backend/

echo "building frontend docker image..."
docker build --no-cache -t niklasderechte/frontend:v0.1.0 frontend/
```

### Run Docker Containers

Start the Docker containers for the backend and frontend:

```bash
echo "start docker container..."
docker run --name frontend -d -p 4200:80 niklasderechte/frontend:v0.1.0
docker run --name backend -d -p 3000:80 niklasderechte/backend:v0.1.0

docker start frontend
docker start backend
```
