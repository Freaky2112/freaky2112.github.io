---
layout: default
title: "IT Tools"
permalink: /docs/it-tools/
---

### IT-Tools

Your dockercompose.yml 

```yaml
services:
  it-tools:
    image: corentinth/it-tools:latest
    container_name: it-tools
    restart: unless-stopped
    ports:
      - "8080:80" # Change 8080 if it conflicts with another service
    networks:
      - it-tools-network

networks:
  it-tools-network:
    driver: bridge
```