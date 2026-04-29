---
layout: default
title: "Nginx Proxy Manager"
permalink: /docs/npm/
---

### NPM
```shell
Your dockercompose.yml 
```   
```yml
services:
  app:
    image: jc21/nginx-proxy-manager:latest
    restart: unless-stopped
    ports:
      # These ports are in format <host-port>:<container-port>
      - 1080:80 # Public HTTP Port
      - 443:443 # Public HTTPS Port
      - 81:81 # Admin Web Port
      # Add any other Stream port you want to expose
      # - '21:21' # FTP
    environment:
      # Mysql/Maria connection parameters:
      DB_MYSQL_HOST: db
      DB_MYSQL_PORT: 3306
      DB_MYSQL_USER: $User
      DB_MYSQL_PASSWORD: $DB_Password
      DB_MYSQL_NAME: $DB_name
      # Uncomment this if IPv6 is not enabled on your host
      # DISABLE_IPV6: 'true'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    depends_on:
      - db
  db:
    image: jc21/mariadb-aria:latest
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: $DB_Root_Password
      MYSQL_DATABASE: $DB_name
      MYSQL_USER: $User
      MYSQL_PASSWORD: $DB_Password
      MARIADB_AUTO_UPGRADE: "1"
    volumes:
      - ./mysql:/var/lib/mysql
networks: {}
```
```shell
Don't fogot your .env file with all your secrets

.env

User= \
DB_name= \
DB_Password=\
DB_Root_Password=
```