# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone -b containerization-database-orm https://github.com/vsv-noon/nodejs2025Q4-service.git
```
OR
```
git clone {repository URL}
```

### switch to branch `containerization-database-orm`

## Installing NPM modules

```
npm install
```

## ENV file

#### Rename `.env.example` to `.env` 

```
cp .env.example .env
```

## Running application in Docker

```
npm run docker:build
```

### npm script for vulnerabilities scanning
```
npm run docker:scan
```

## DockerHub link
https://hub.docker.com/r/vsvnoon/nodejs2025q4-service-app

## Running application

```
npm start
```


#### After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing **http://localhost:4000/doc/**.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

Before running tests, you need to run the application.
```
npm start
```

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
