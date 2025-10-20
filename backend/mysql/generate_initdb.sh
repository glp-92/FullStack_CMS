#!/bin/bash

# export ENV_FILE=./.env
# bash ./backend/mysql/generate_initdb.sh

source ${ENV_FILE}

mkdir -p ./backend/mysql/.initdb

cat <<EOF > ./backend/mysql/.initdb/init.sql
CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED WITH 'caching_sha2_password' BY '${MYSQL_PASSWORD}';
CREATE USER IF NOT EXISTS '${MYSQL_BLOG_SERVICE_USER}'@'%' IDENTIFIED WITH 'caching_sha2_password' BY '${MYSQL_BLOG_SERVICE_PASSWORD}';
CREATE DATABASE IF NOT EXISTS ${MYSQL_BLOG_DB_NAME};
GRANT ALL PRIVILEGES ON ${MYSQL_BLOG_DB_NAME}.* TO '${MYSQL_BLOG_SERVICE_USER}'@'%';
USE ${MYSQL_BLOG_DB_NAME};
CREATE TABLE users (
    id CHAR(36) NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE posts (
    id CHAR(36) NOT NULL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    excerpt VARCHAR(255),
    content TEXT,
    featured_image VARCHAR(255),
    user_id CHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    date DATETIME NOT NULL
);
CREATE TABLE categories (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE themes (
    id CHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    excerpt VARCHAR(255) NOT NULL,
    featured_image VARCHAR(100)
);
CREATE TABLE posts_themes (
    post_id CHAR(36) NOT NULL,
    theme_id CHAR(36) NOT NULL,
    PRIMARY KEY (post_id, theme_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);
CREATE TABLE posts_categories (
    post_id CHAR(36) NOT NULL,
    category_id CHAR(36) NOT NULL,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
CREATE TABLE tokens (
    id CHAR(36) NOT NULL PRIMARY KEY,
    user_id CHAR(36) NOT NULL UNIQUE,
    refresh_token TEXT NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
FLUSH PRIVILEGES;
EOF