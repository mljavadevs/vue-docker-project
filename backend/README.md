## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Modules

```bash
cache-manager
  - @nestjs/cache
```

- cache-manager is a module that provides cache functionality.
- Use any cache you want, as long as it has the same API.
- Scrapped data will be stored in cache for 24 hours.

```bash
pagination-service
```

- pagination-service is a module that provides pagination functionality.

```bash
web-scraping-service
```

- web-scraping-service is a module that provides web scraping functionality.

```bash
swagger:
  - @nestjs/swagger
```

- swagger is a module that provides swagger open API functionality.
