# FullStack CMS

CMS from scratch using

- [Nginx](https://nginx.org/en/) as reverse proxy
- [React with Vite](https://vitejs.dev/) as frontend
- [Golang](https://go.dev/) as API
- [MariaDB database](https://mariadb.org/)
- [Seaweed FS object storage](https://seaweedfs.com/)
- Deployed with [Docker](https://www.docker.com/)

## Setup

[Read the docs first](./docs/Readme.md)

[Install Docker](https://docs.docker.com/engine/install/ubuntu/)

Environment variables on `.env` must contain some values that should be explained. Take all variables specified on `.example.env` file

```yaml
DB_USER: user different that sudo to manage all databases on mariadb instance
DB_ROOT_PASSWORD: assign a password to mariadb root
DB_BLOG_DB_NAME: blog database name
DB_BLOG_SERVICE_USER: service account that only will have permissions to blog database on mariadb
DB_BLOG_ADDR: address communicate db from backend. On docker mariadb service is solved as "database"
API_PORT: port that runs the backend
JWT_SIGN_KEY: gen new => openssl rand -hex 64
BACKEND_URL: url that frontend will use to communicate with API. On internet will be like https://my-fun-webpage.com/blog, check nginx config as it manages all the routes
FRONTEND_URL: for CORS, try to figure if it is used
BLOG_USERNAME: credentials for blog user to create posts, categories...
BLOG_NAME: this string is passed to frontend build to include it on web header
GITHUB_LINK: github icon on footer uses link specified here
```

Setup script is provided. This script generates the `initdb.sql` script to generate the database on first run with credentials specified on `.env`. Also a pair of `key` `certs` are generated for self signed https nginx.

```bash
bash setup.py
```

Docker compose is provided will all services and volumes binded to needed config files. Just run detached mode and enjoy the blog

```bash
docker compose up -d
```
