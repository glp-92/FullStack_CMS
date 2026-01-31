# Seaweed FS

Open Source scalable distributed storage used to store static files. As may have many services set by cmd, one single instance running needed services will perform well for tiny CMS use case

## Security

As Seaweed has to be accessed through internet to allow visitors watch static content, this service should be behind a reverse proxy as `Nginx` to keep control of resources and avoid rate limiting. Use `-filer.disableDirListing` to ensure attackers may not list Storage directories and files so only exact url will be solved

## Upload files

Seaweed API can be used if dirlisting was disabled to avoid route listing on server. Keep in mind that `@` character indicates file on curl

```bash
curl -F file=@/path/to/static.jpg http://localhost:8888/static/myphoto.jpg
```
