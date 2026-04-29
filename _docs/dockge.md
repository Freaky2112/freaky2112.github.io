---
layout: default
title: "Dockge"
permalink: /docs/dockge/
---

### Dockge

1. Your dockercompose.yml 

```yml
---
services:
  dockge:
    image: louislam/dockge:beta
    restart: unless-stopped
    ports:
      - 5001:5001
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./dockge/data:/app/data
      - /home/$User/docker:/home/$User/docker
    environment:
      # Tell Dockge where to find the stacks
      - DOCKGE_STACKS_DIR=/home/$User/docker
```