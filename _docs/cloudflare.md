---
layout: default
title: "CloudFlare"
permalink: /docs/cloudflare/
---

---
### CloudFlare-DDNS
```yml
---
services:
  cloudflare-ddns:
    image: oznu/cloudflare-ddns:latest
    container_name: cloudflare-ddns
    restart: always
    environment:
      - EMAIL=youremail@domain.com
      - API_KEY=${API_KEY}
      - ZONE=yourdomain
      # - SUBDOMAIN=subdomain
      - PROXIED=true
      - RRTYPE=A
```
don't fogot your .env file with all your secrets

API_KEY=your_api_key
