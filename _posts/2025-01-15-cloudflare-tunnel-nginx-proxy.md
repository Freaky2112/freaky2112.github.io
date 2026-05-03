---
layout: default
title: "Setting up Cloudflare with nginx Proxy Manager"
---


# Cloudflare Config for NPM

### How I expose self-hosted services securely without opening a single port on my router.
Expose self-hosted services (Jellyfin, Home Assistant, Homer, etc.) to the internet
**without** opening any ports on my router — using Cloudflare Tunnel as the ingress
and nginx Proxy Manager to handle internal routing.

## Architecture

```
Internet → Cloudflare Tunnel → cloudflared container
                                       ↓
                            nginx Proxy Manager
                            ↙       ↓       ↘
                     Jellyfin  Homer   Home Assistant
```

## Prerequisites

- A domain managed by Cloudflare (free tier is fine)
- Docker + Docker Compose
- nginx Proxy Manager already running

## Step 1 — Create the tunnel in Cloudflare

1. Go to **Zero Trust → Access → Tunnels → Create tunnel**
2. Name it something like `homelab`
3. Copy the tunnel token — you'll need it in step 2

## Step 2 — Deploy cloudflared

Deploy Cloudflare-DDNS docker: 
[Cloudflare](https://freaky2112.github.io/docs/cloudflare/) 

In Cloudflare dashboard, add public hostnames pointing to your NPM instance:

|----------|---------|
| `jellyfin.yourdomain.com` | `http://npm:80` |
| `ha.yourdomain.com` | `http://npm:80` |
| `homer.yourdomain.com` | `http://npm:80` |

## Step 4 — nginx Proxy Manager

In NPM, create a proxy host for each service pointing to the internal container address. Enable SSL (Let's Encrypt) for each — NPM handles cert renewal automatically.

## Result

Zero open ports. All traffic flows through Cloudflare's network. SSL everywhere. Services accessible from anywhere. 🎉

---

*Questions / idea? Open an issue on [GitHub](https://github.com/Freaky2112/freaky2112.github.io).*
