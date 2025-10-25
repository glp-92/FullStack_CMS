# About environment variables on App

Application uses 2 different `env` files.

## Vite Frontend env

On `docker` image build step, `vite` loads environment variables into the code, so for `docker compose up` override these values would require some extra scripting to change them. So in this moment, change these values must be done in `./frontend/clientapp/` folder. For development and production there is one different `env` file.

If any change is made to these files and frontend image is already built, must be rebuilt next time with `docker compose up --build`

- `.env.development` for frontend running by `npm run dev` command
- `.env.production` for frontend running with `npm run build` command (on Dockerfile)

An example file of needed env variables for **development**
```
VITE_BACKEND_URL=http://localhost:8083 # When using develop branch, containers are exposed to system, so blog service is exposed on localhost:8083
```

An example file of needed env variables for **production**
```
VITE_BACKEND_URL=https://ipServer/blog # On production branch an Nginx reverse proxy is used with ssl so /blog is the path forwarded to blog service
```

## Docker Compose env

If `.env` file is placed on same directory as `docker-compose.yml`, variables declared on them will be interpreted when running the compose. When renaming `.env` file will require to specify new name on compose command as `docker compose --env-file ./.env.production up`

An example of `.env` file. `FRONTEND_URL` will change for development and production
```
MYSQL_USER=mysqlusr
MYSQL_PASSWORD=mysqlpwd
MYSQL_ROOT_PASSWORD=rootpwd
MYSQL_BLOG_DB_NAME=test
MYSQL_BLOG_SERVICE_USER=blog
MYSQL_BLOG_SERVICE_PASSWORD=blogservice_pwd
MYSQL_BLOG_ADDR=mysql_svr:3306
API_PORT=8080
JWT_ACCESS_TOKEN_EXPIRATION=5
JWT_REFRESH_TOKEN_EXPIRATION=30
JWT_SIGN_KEY=d81eb484539dd98786f923a8525808db43f821c70c6d52db8051ec70af9e42cc
FRONTEND_URL=https://ipServer # this is for production, for local development value will be http://localhost:3000 because frontend port is exposed to host
```