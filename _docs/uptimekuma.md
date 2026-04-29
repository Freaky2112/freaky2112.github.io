---
layout: default
title: "Uptime Kuma"
permalink: /docs/uptimekuma/
---

### Uptime-Kuma
```yml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:2
    container_name: uptime-kuma
    volumes:
      - ./:/app/data
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - 3001:3001 # <Host Port>:<Container Port>
    restart: unless-stopped
networks: {}
```