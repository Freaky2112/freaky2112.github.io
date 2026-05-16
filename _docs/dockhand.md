---
layout: default
title: "Dockhand"
permalink: /docs/dockhand/
---

### Dockhand

Your dockercompose.yml 

```yaml
services:
  dockhand:
    image: fnsys/dockhand:latest
    container_name: dockhand
    restart: unless-stopped
    ports:
      - 3000:3000
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./dockhand_data:/app/data
volumes:
  dockhand_data: null
networks: {}
```