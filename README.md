# Fullstack Angular-Express Project-Structure


# Install dependencies

To install the necessary dependencies for both the backend and frontend and from the root to start the development server simultaneously, run the following commands:

```
cd backend
npm install
cd ..
cd frontend
npm install
cd ..
npm install
```

# Run development mode

To start the development server, use the following command:

```
npm run dev
```

# Build

```
npm run build
```

# Proxy

Um eine Kommunikation um Frontend und Backend über eine URL zur Verfügung zu stellen, benötigt es ein paar umleitungen.

Auf dem live-server existieren 3 dienste:
Angular: 4200
Express: 3000
Proxy: 80

Unter frontend/src/environments werden die basis-api routen festgelegt mit dem das frontend, das backend aufrufen soll. Sie weisen auch auf das frontend selbst, da ein Proxy später diese anfragen an einen anderen dienst umleitet.

<localhost:4200|production_url>/api/

Unter frontend/src/proxy.conf.json wird nun der pfad "/api/" entfernt, damit auf das lokale backend zugegriffen werden kann.

<localhost:3000>/

Im production mode wird die frontend/src/proxy.prod.json verwendet. Sie leitet den aufruf mit dem pfad "/api/" weiter an das backend mit einem nginx proxy server.

<production_url>/api/

Der Proxy Server leitet "/api/" nun auf das backend 3000 weiter
