---
layout: default
title: "Shlink (TinyURL)"
permalink: /projects/shlink/
---


# Shlink

## Shlink in a self hosted URL shortener

#### It's still a workin progress 

1. Create a folder
```bash
mkdir shlink
cd shlink
```
1. Create docker-compose.yml

Use this basic setup with Shlink + MariaDB:
```yaml
services:
  shlink:
    image: shlinkio/shlink:stable
    container_name: shlink
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      DEFAULT_DOMAIN: yourdomain.com
      IS_HTTPS_ENABLED: true
      GEOLITE_LICENSE_KEY: ""
      DB_DRIVER: maria
      DB_HOST: mariadb
      DB_PORT: 3306
      DB_NAME: shlink
      DB_USER: shlink
      DB_PASSWORD: strongpassword
    depends_on:
      - mariadb

  mariadb:
    image: mariadb:11
    container_name: shlink-db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: shlink
      MYSQL_USER: shlink
      MYSQL_PASSWORD: strongpassword
    volumes:
      - ./db_data:/var/lib/mysql
```
Replace:

yourdomain.com → your actual domain
strongpassword / rootpassword → strong passwords
3. Start containers
```bash
docker compose up -d
```
Check if everything started:
```bash
docker ps
```
4. Initialize Shlink

Usually first boot handles DB migrations automatically, but you can check logs:
```bash
docker logs -f shlink
```

You should see something like:

Database connected successfully
5. Generate API key

Run:
```bash
docker exec -it shlink shlink api-key:generate
```

Copy that API key.

6. Access web/API

By default:

API: http://your-server-ip:8080

Shlink itself is mostly API-driven, so for a GUI install a web client like Shlink Web Client.

Example compose addition:
```yaml
  shlink-web-client:
    image: shlinkio/shlink-web-client
    container_name: shlink-web
    restart: unless-stopped
    ports:
      - "8081:8080"
    environment:
      SHLINK_SERVER_URL: https://yourdomain.com
      SHLINK_SERVER_API_KEY: your_api_key
```
Then access:

http://server-ip:8081
7. Reverse proxy (recommended)

If you use Nginx Proxy Manager, Traefik, or Caddy:

proxy domain → shlink:8080
enable SSL