#!/bin/bash
set -e
# export ENV_FILE=./.env
# bash ./backend/mariadb/generate_initdb.sh

source ${ENV_FILE}

mkdir -p ./backend/mariadb/.initdb

cat <<EOF > ./backend/mariadb/.initdb/init.sql
CREATE USER IF NOT EXISTS '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASSWORD}';
CREATE USER IF NOT EXISTS '${DB_BLOG_SERVICE_USER}'@'%' IDENTIFIED BY '${DB_BLOG_SERVICE_PASSWORD}';

CREATE DATABASE IF NOT EXISTS ${DB_BLOG_DB_NAME};

GRANT ALL PRIVILEGES ON *.* TO '${DB_USER}'@'%';
GRANT ALL PRIVILEGES ON ${DB_BLOG_DB_NAME}.* TO '${DB_BLOG_SERVICE_USER}'@'%';

ALTER USER 'root'@'localhost' IDENTIFIED BY '${DB_ROOT_PASSWORD}';
USE ${DB_BLOG_DB_NAME};

CREATE TABLE users (
    id UUID NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    id UUID NOT NULL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    excerpt VARCHAR(255),
    content TEXT,
    featured_image VARCHAR(255),
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    date DATETIME NOT NULL
);

CREATE TABLE categories (
    id UUID NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE themes (
    id UUID NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    excerpt VARCHAR(255) NOT NULL,
    featured_image VARCHAR(100)
);

CREATE TABLE posts_themes (
    post_id UUID NOT NULL,
    theme_id UUID NOT NULL,
    PRIMARY KEY (post_id, theme_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE
);

CREATE TABLE posts_categories (
    post_id UUID NOT NULL,
    category_id UUID NOT NULL,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE tokens (
    id UUID NOT NULL PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    refresh_token TEXT NOT NULL,
    revoked TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

FLUSH PRIVILEGES;
EOF

chmod 644 ./backend/mariadb/.initdb/init.sql
