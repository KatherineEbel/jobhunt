
# Job Application Tracker using TurboRepo, Docker, CRA and Express

State management using Redux and RTK-Query

## What's inside?

This turborepo uses [yarn](https://yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: a [Create React App](https://create-react-app.dev/) app
- `api`: an [Express](https://expressjs.com/) server
- `ui`: ui: a React component library
- `eslint-config-custom-react`: `eslint` configurations for client side applications (includes `eslint-config-custom-react` and `eslint-config-prettier`)
- `eslint-config-custom-server`: `eslint` configurations for server side applications (`eslint-config-prettier`)
- `jest-presets`: Jest configurations
- `logger`: Isomorphic logger (a small wrapper around console.log)
- `tsconfig`: tsconfig.json;s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Docker

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo and run locally:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.dev.yml build --parallel

# Start prod in detached mode
docker-compose -f docker-compose.dev.yml up -d
```

Open http://localhost:3000.

