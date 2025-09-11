# Fullstack Angular-Express.js Project-Structure

A proven fullstack project structure, optimized for medium-sized single-page applications (SPA) to large-scale software projects. The frontend and backend are separated but can share common entities.

# Structure


| Service                              | Port | Path | Description                                     | Developing                                  | Production     |
| :------------------------------------- | ------ | ------ | ------------------------------------------------- | --------------------------------------------- | ---------------- |
| [Angular](https://angular.dev/)      | 4200 | /    | Frontend                                        | ng serve                                    | docker - nginx |
| [Express.js](https://expressjs.com/) | 3000 | /api | Backend                                         | ts-node-dev                                 | docker - node  |
| Proxy Reverse                        | 80   | /*   | SSL handling -<br />routing to Frontend/Backend | (handled by[Angular](https://angular.dev/)) | docker - nginx |

# Tested


| System / OS        | Node.js Version | NPM Version | Angular CLI Version | Docker Version | Notes                                 |
| -------------------- | ----------------- | ------------- | --------------------- | ---------------- | --------------------------------------- |
| Windows 10         | 23.10.0         | 10.9.2      | 19.2.5              | -              | Local Development & Build             |
| Ubuntu 22.04 LTS   | 23.11.0         | 10.9.2      | 19.2.7              | 28.1.1           | Local Development & Docker Production |
| Ubuntu 24.04.2 LTS | 23.8.0          | 11.1.0      | 19.2.9              | 28.0.0           | Docker Production                     |

# Developing

Setup for developing

```bash
git clone git@github.com:NiklasDerEchte/angular-express-app.git ng-express
cd ng-express/
```

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

> **Note:** Run in the main directory to start both the frontend and backend, or run only in the frontend or only in the backend.
>


# Production

For the **reverse proxy server**, you could use [nginx/docker](https://hub.docker.com/_/nginx): `docker pull nginx:latest`.

A configuration for SSL handling and routing between the frontend and backend can be found under `.prod/etc/nginx/sites-available/example.conf`.
For SSL, [Certbot](https://certbot.eff.org/) is required.

> **Note:** Do not forget to replace all placeholder values such as `example.com` with your own domain name in the following files:
>
> - The **reverse proxy server** configuration file (`example.conf`)
> - The frontend production **environment** file (`environments.prod.ts`)
> - The frontend production **proxy** configuration (`proxy.prod.json`)

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
docker build --no-cache -f backend/Dockerfile -t niklasderechte/backend:v0.1.0 .

echo "building frontend docker image..."
docker build --no-cache -f frontend/Dockerfile -t niklasderechte/frontend:v0.1.0 .
```

### Run Docker Containers

Start the Docker containers for the backend and frontend:

```bash
echo "start docker container..."
docker run --name backend -d -p 3000:3000 niklasderechte/backend:v0.1.0
docker run --name frontend -d -p 4200:4200 niklasderechte/frontend:v0.1.0
```

# Angular Material 3 Theming

This project includes both light and dark themes using Angular Material 3 (M3).

- You can easily extend or customize the theme system to add more styles or color schemes.
- For a step-by-step guide on implementing and customizing Angular Material 3 theming, see the following article:

   [Implementing Angular Material 3 Theming: Modern Light & Dark Modes](https://medium.com/@n.wocke/implementing-angular-material-3-theming-modern-light-dark-modes-by-niklas-wockenfu%C3%9F-de30c9b44be1) by Niklas Wockenfuß
