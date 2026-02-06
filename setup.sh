#!/bin/bash
set -e
ENV_FILE="./.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ .env $ENV_FILE not found, example.env contains needed env variables!"
  exit 1
fi
echo "✅ Loading env from $ENV_FILE..."
export export ENV_FILE=$ENV_FILE

echo "🚀 Generating initdb config"
bash ./backend/mariadb/generate_initdb.sh
bash ./frontend/reverse-proxy/generate_certs.sh

mkdir -p rustfs_data
sudo chown -R 10001:10001 rustfs_data
echo "✅ Setup complete! You can now run 'docker compose up' to start the application."