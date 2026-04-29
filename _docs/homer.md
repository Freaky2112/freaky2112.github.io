---
layout: default
title: "Homer Dashboard"
permalink: /docs/homer/
---

### Homer Dashboard
```shell
Your dockercompose.yml 
```   
```yml
---
services:
  homer:
    image: b4bz/homer
    #To build from source, comment previous line and uncomment below
    #build: .
    container_name: homer
    volumes:
      - ./assets/:/www/assets
    ports:
      - 2112:8080
    user: 1000:1000 # default
    environment:
      - INIT_ASSETS=1 # default
    restart: unless-stopped
```




