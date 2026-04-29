---
layout: default
title: "Traefik"
permalink: /docs/traefik/
---

### Traefik
```shell
dockercompose.yml 
```
```yml
---
services:
  traefik:
    image: traefik:v3.0
    container_name: traefik
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    networks:
      - proxy
    ports:
      - 80:80
      - 443:443
      # - 443:443/tcp # Uncomment if you want HTTP3
      # - 443:443/udp # Uncomment if you want HTTP3
    environment:
      CF_DNS_API_TOKEN_FILE: /run/secrets/cf_api_token # note using _FILE for docker secrets
      # CF_DNS_API_TOKEN: ${CF_DNS_API_TOKEN} # if using .env
      TRAEFIK_DASHBOARD_CREDENTIALS: ${TRAEFIK_DASHBOARD_CREDENTIALS}
    secrets:
      - cf_api_token
    env_file: .env # use .env
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./data/traefik.yml:/traefik.yml:ro
      - ./data/acme.json:/acme.json
      - ./data/config.yml:/config.yml:ro
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.traefik.entrypoints=http"
      - "traefik.http.routers.traefik.rule=Host(`traefik-dashboard.local.exemple.com`)"
      - "traefik.http.middlewares.traefik-auth.basicauth.users=${TRAEFIK_DASHBOARD_CREDENTIALS}"
      - "traefik.http.middlewares.traefik-https-redirect.redirectscheme.scheme=https"
      - "traefik.http.middlewares.sslheader.headers.customrequestheaders.X-Forwarded-Proto=https"
      - "traefik.http.routers.traefik.middlewares=traefik-https-redirect"
      - "traefik.http.routers.traefik-secure.entrypoints=https"
      - "traefik.http.routers.traefik-secure.rule=Host(`traefik-dashboard.local.exemple.com`)"
      - "traefik.http.routers.traefik-secure.middlewares=traefik-auth"
      - "traefik.http.routers.traefik-secure.tls=true"
      - "traefik.http.routers.traefik-secure.tls.certresolver=cloudflare"
      - "traefik.http.routers.traefik-secure.tls.domains[0].main=local.example.com"
      - "traefik.http.routers.traefik-secure.tls.domains[0].sans=*.local.example.com"
      - "traefik.http.routers.traefik-secure.service=api@internal"

secrets:
  cf_api_token:
    file: ./cf_api_token.txt

networks:
  proxy:
    external: true
```

### Don't fogot your .env file with all your secrets

```shell
.env

TRAEFIK_DASHBOARD_CREDENTIALS=username:base64password

put your token in your cf_api_token.txt

your_api_token

in /data create a acme.json file for your certificate

touch acme.json
```
```Shell
In /data create a traefik.yml file
```

```yaml
api:
  dashboard: true
  debug: true
entryPoints:
  http:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: https
          scheme: https
  https:
    address: ":443"
serversTransport:
  insecureSkipVerify: true
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
   file:
     filename: /config.yml
certificatesResolvers:
  cloudflare:
    acme:
      email: youremail@email.com # to change
      storage: acme.json
      # caServer: https://acme-v02.api.letsencrypt.org/directory # prod (default)
      caServer: https://acme-staging-v02.api.letsencrypt.org/directory # staging
      dnsChallenge:
        provider: cloudflare
        #disablePropagationCheck: true # uncomment this if you have issues pulling certificates through cloudflare, By setting this flag to true disables the need to wait for the propagation of the TXT record to all authoritative name servers.
        #delayBeforeCheck: 60s # uncomment along with disablePropagationCheck if needed to ensure the TXT record is ready before verification is attempted
        resolvers:
          - "1.1.1.1:53"
          - "1.0.0.1:53"
```
```shell
When everyting is good don't forget to change your caServer to prod.

add your a record or cname to your local DNS

add your /data/config.yml for your outside docker application
``` 
```yaml
 http:
 #region routers
  routers:
    proxmox:
      entryPoints:
        - "https"
      rule: "Host(`proxmox.local.example.com`)"
      middlewares:
        - default-headers
        - https-redirectscheme
      tls: {}
      service: proxmox
    pihole:
      entryPoints:
        - "https"
      rule: "Host(`pihole.local.example.com`)"
      middlewares:
        - redirectregex-pihole
        - default-headers
        - addprefix-pihole
        - https-redirectscheme
      tls: {}
      service: pihole
    homebridge:
      entryPoints:
        - "https"
      rule: "Host(`homebridge.local.example.com`)"
      middlewares:
        - default-headers
        - https-redirectscheme
      tls: {}
      service: homebridge
    homeassistant:
      # For Homeassistant config, check: https://www.home-assistant.io/integrations/http/#reverse-proxies
      # This relies on Homeassistant using http. No certs are needed in the Homeassistant config.
      entryPoints:
        - "https"
      rule: "Host(`homeassistant.local.example.com`)"
      middlewares:
        - default-headers
        - https-redirectscheme
      tls: {}
      service: homeassistant
    syncthing:
      entryPoints:
        - "https"
      rule: "Host(`syncthing.local.example.com`)"
      middlewares:
        - default-headers
        - https-redirectscheme
      tls: {}
      service: syncthing
    truenas:
      entryPoints:
        - "https"
      rule: "Host(`truenas.local.example.com`)"
      middlewares:
        - default-headers
        - https-redirectscheme
      tls: {}
      service: truenas
    plex:
      entryPoints:
        - "https"
      rule: "Host(`plex.local.example.com`)"
      middlewares:
        - default-headers
        - https-redirectscheme
      tls: {}
      service: plex
    opnsense:
      entryPoints:
        - "https"
      rule: "Host(`opnsense.local.example.com`)"
      middlewares:
        - default-headers
        - https-redirectscheme
      tls: {}
      service: opnsense
    openmediavault:
      entryPoints:
        - "https"
      rule: "Host(`openmediavault.local.example.com`)"
      middlewares:
        - default-headers
        - https-redirectscheme
      tls: {}
      service: openmediavault

#endregion
#region services
  services:
    proxmox:
      loadBalancer:
        servers:
          - url: "https://192.168.0.100:8006"
        passHostHeader: true
    pihole:
      loadBalancer:
        servers:
          - url: "http://192.168.0.101:80"
        passHostHeader: true
    homebridge:
      loadBalancer:
        servers:
          - url: "http://192.168.0.102:10999"
        passHostHeader: true
    homeassistant:
      loadBalancer:
        servers:
          - url: "http://192.168.0.102:10999"
        passHostHeader: true
    syncthing:
      loadBalancer:
        servers:
          - url: "https://192.168.0.103:8384"
        passHostHeader: true
    truenas:
      loadBalancer:
        servers:
          - url: "https://192.168.0.104"
        passHostHeader: true
    plex:
      loadBalancer:
        servers:
          - url: "https://192.168.0.105:32400"
        passHostHeader: true
    opnsense:
      loadBalancer:
        servers:
          - url: "https://192.168.0.109"
        passHostHeader: true
    openmediavault:
      loadBalancer:
        servers:
          - url: "http://192.168.0.111:80"
        passHostHeader: true
#endregion
  middlewares:
    addprefix-pihole:
      addPrefix:
        prefix: "/admin"
    https-redirectscheme:
      redirectScheme:
        scheme: https
        permanent: true
    redirectregex-pihole:
      redirectRegex:
        regex: "/admin/(.*)"
        replacement: /

    default-headers:
      headers:
        frameDeny: true
        browserXssFilter: true
        contentTypeNosniff: true
        forceSTSHeader: true
        stsIncludeSubdomains: true
        stsPreload: true
        stsSeconds: 15552000
        customFrameOptionsValue: SAMEORIGIN
        customRequestHeaders:
          X-Forwarded-Proto: https


    default-whitelist:
      ipAllowList:
        sourceRange:
        - "10.0.0.0/8"
        - "192.168.0.0/16"
        - "172.16.0.0/12"

    secured:
      chain:
        middlewares:
        - default-whitelist
        - default-headers
```

   

