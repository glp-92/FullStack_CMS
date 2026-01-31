# React Vite Frontend

Frontend was made on React JS framework by using Vite to setup the repo.

## Setup

Visit [oficial nodejs installation webpage](https://nodejs.org/en/download) to install node on computer if needed

If frontend will be deployed directly on compose node installation step is not needed as `Dockerfile` includes a node image as base

To run locally, install dependencies

```bash
npm update
npm audit fix --force # if any vulnerability present
npm install
```

Run develop server

```bash
npm run dev
```
