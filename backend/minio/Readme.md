# Set a Bucket Public

By setting a bucket public, anyone can download data from it so be sure that data is behind a reverse proxy and has anti-bot measurements

```bash
docker exec -it miniocontainerid bash
mc alias set myminio http://localhost:9000 username password
mc anonymous set download myminio/blog
```

# Minio Encryption

Generate a base64 keygen to encrypt minio data on rest 

```bash
openssl rand -base64 32
```
