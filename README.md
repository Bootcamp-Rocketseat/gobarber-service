<h1 align="center">
    Gobarber
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Bootcamp-Rocketseat/gobarber-gateway.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Bootcamp-Rocketseat/gobarber-gateway.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Bootcamp-Rocketseat/gobarber-gateway.svg">

  <a href="https://github.com/Bootcamp-Rocketseat/gobarber-gateway/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Bootcamp-Rocketseat/gobarber-gateway.svg">
  </a>

  <a href="https://github.com/Bootcamp-Rocketseat/gobarber-gateway/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/Bootcamp-Rocketseat/gobarber-gateway.svg">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/Bootcamp-Rocketseat/gobarber-gateway.svg">
</p>

# Routes

## Add appointments

#### URI

- `/appointments`

#### Method

- `POST`

#### Body

- `provider_id`: The id of the user of the provider;
- `date`: Date in the format ISO-8859-1.

## List appointments

#### URI

- `/appointments`

#### Method

- `GET`

## Add users

#### URI

- `/users`

#### Method

- `POST`

#### Body

- `name`: Name of the user.
- `email`: Email of the user.
- `password`: Password used in the login.

## Create sessions token

#### URI

- `/sessions`

#### Method

- `POST`

#### Body

- `email`: Email of the user.
- `password`: Password used in the login.

# Prerequisites

- Node
- Yarn
- Docker
- Docker Compose

# Run the project

To run this project you need execute the following steps:

1. Clone the repository: `git clone git@github.com:Bootcamp-Rocketseat/gobarber-gateway.git`

2. Enter in the directory of the project: `cd gobarber-gateway`

3. Install the dependencies: `yarn`

4. Run compose: `docker-compose -d`

5. Execute the migrations: `yarn typeorm:migrate`

6. Execute the project: `yarn dev:server`

# What are the next steps?

- [ ] Migrate API documentation to the openapi

## License

MIT

See the [License](LICENSE.md) file.
