---
layout: default
title: "DokuWiki"
permalink: /docs/dokuwiki/
---

### Dokuwiki

1. Your dockercompose.yml 
   
```yml
---
services:
  dokuwiki:
    image: lscr.io/linuxserver/dokuwiki:latest
    container_name: dokuwiki
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York
    volumes:
      - ./config:/config
    ports:
      - 18080:80
      - 18443:443 #optional
    restart: unless-stopped
```
