# Setup

### Prerequisites

Node.js version 18.18.0. You can use [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage your Node.js versions. To install Node.js using nvm, first install nvm following the instructions in the [nvm repository](https://github.com/nvm-sh/nvm#installing-and-updating), then run the following command:

```bash
nvm install 18.18.0
nvm use 18.18.0
```

Install the required dependencies:

```bash
npm install
```

Setup environment variables:

```bash
cp .env.example .env
```

Setup Sequelize config file:

```bash
cp config/config.example.json config/config.json
```

Postgres is used as the DB for this project. To set it up on your machine you can either install in on your machine from the Web or run the docker container. This means you need to have **Docker** installed on your machine. To create and start the container you can run the following command.

```bash
docker-compose -f docker.compose.development.yml up
```

Run migrations

```bash
npx sequelize db:migrate
```

Seed the DB

```bash
npx sequelize db:seed:all
```

### Important Commands

Running the Development Server

```bash
npm run dev
```

Running tests

```bash
npm test
```
