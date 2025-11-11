#!/bin/bash
set -e
ENV_FILE="./.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ .env $ENV_FILE not found"
  exit 1
fi
echo "✅ Loading env from $ENV_FILE..."
export export ENV_FILE=$ENV_FILE

echo "🚀 Generating initdb config"
bash ./backend/mariadb/generate_initdb.sh

docker compose up --build
