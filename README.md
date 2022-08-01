# Turborepo Docker starter with CRA and Storybook

This is a modified version of the Docker starter Turborepo.
I changed out NextJS for Create React App. I also added Storybook.

## What's inside?

This turborepo uses [yarn](https://yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: a [Create React App](https://create-react-app.dev/) app
- `api`: an [Express](https://expressjs.com/) server
- `ui`: ui: a React component library
- `eslint-config-custom-react`: `eslint` configurations for client side applications (includes `eslint-config-custom-react` and `eslint-config-prettier`)
- `eslint-config-custom-server`: `eslint` configurations for server side applications (`eslint-config-prettier`)
- `scripts`: Jest configurations
- `logger`: Isomorphic logger (a small wrapper around console.log)
- `tsconfig`: tsconfig.json;s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Docker

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build --parallel

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
- [Husky](https://typicode.github.io/husky/) for git hooks
