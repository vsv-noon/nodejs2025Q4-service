# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone -b containerization-database-orm https://github.com/vsv-noon/nodejs2025Q4-service.git
```
OR
```bash
git clone {repository URL}
```
### switch to dir `nodejs2025Q4-service`
```bash
cd nodejs2025Q4-service
```

### switch to branch `containerization-database-orm`
```bash
git checkout containerization-database-orm
```

## Installing NPM modules

```bash
npm install
```

## ENV file

#### You need to rename `.env.example` to `.env` 

```bash
cp .env.example .env
```

## Running application in Docker

```bash
npm run docker:build
```

### npm script for vulnerabilities scanning
```bash
npm run docker:scan
```

## DockerHub link
https://hub.docker.com/r/vsvnoon/nodejs2025q4-service-app

## Running application

```bash
npm start
```


#### After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing **http://localhost:4000/doc/**.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

Before running tests, you need to run the application.
```bash
npm start
```

After application running open new terminal and enter:


To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```


## Testing in Docker

Before running tests, you need to run the application.
```bash
npm run docker:build
```

After application running open new terminal and enter:

To run all tests with authorization

```bash
docker exec home-library-app npm run test:auth
```

### View logs written to the file
```bash
docker exec home-library-app cat /app/logs/app.log
```
OR
`docker exec -it home-library-app sh` `cd logs`

### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

