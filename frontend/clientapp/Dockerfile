# # Multi Stage
# ---- Build Stage ----
FROM node:22-alpine AS build
ARG VITE_BACKEND_URL
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN npm run build
# ---- Production Stage ----
FROM nginx:1.27-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

# # One stage
# FROM node:22-alpine
# WORKDIR /app
# COPY package.json .
# RUN npm update
# RUN npm install
# RUN npm i -g serve
# COPY . .
# RUN npm run build
# EXPOSE 3000
# CMD [ "serve", "-s", "dist" ]