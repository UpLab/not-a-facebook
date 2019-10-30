# Not A Facebook

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

[![Build Status](https://travis-ci.com/UpLab/not-a-facebook.svg?branch=master)](https://travis-ci.com/UpLab/not-a-facebook)

A React app for UpLab BootCamp 2019 - React Intensive

Node version: v10.14.2

## Technologies

### App

- React
- Reactstrap https://reactstrap.github.io/
- React Router (to be added)
- Apollo GraphQL Client (to be added)

### Build
- Webpack
- Babel

### CI, CD, QA

- ESLint
- CicleCI
- Jest

## Setup

1. Create an `.env` file by `.env.example`. You need to create an account on Imgur.com in order to get client id for image uploading. To get client id, you can create an app here https://api.imgur.com/oauth2/addclient
2. `npm i`

## Available Scripts

### Start the app

`npm run start`

### Lint code

`npm run lint`

`npm run lint:fix` - lint with autofix

### Test

`npm run test`

### Release

Scripts to do version bump (semver) and CHANGELOG generation 

- `npm run release:major` - bumps major

- `npm run release:minor` - bumps minor

- `npm run release:patch` - bumps patch

