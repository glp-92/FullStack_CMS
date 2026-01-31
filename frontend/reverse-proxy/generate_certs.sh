#!/bin/bash
# generate self signed certs, keep in mind that browsers will alert you about security concerns of not being validated
mkdir -p ./frontend/reverse-proxy/certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./frontend/reverse-proxy/certs/nginx.key -out ./frontend/reverse-proxy/certs/nginx.crt