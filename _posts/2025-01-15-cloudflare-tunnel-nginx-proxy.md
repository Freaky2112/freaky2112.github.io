---
layout: default
title: "Setting up Cloudflare with nginx Proxy Manager"
excerpt: "How I expose self-hosted services securely without opening a single port on my router."
---


<div class="page-header">
  <p class="mono" style="color: var(--green); font-size: 0.8rem; margin-bottom: 0.5rem;">
    📓 lab notes · {{ page.date | date: "%B %d, %Y" }}
  </p>
  <h1>{{ page.title }}</h1>
  <p>{{ page.excerpt }}</p>
  <div style="margin-top: 0.75rem; display: flex; flex-wrap: wrap; gap: 0.35rem;">
    {% for tag in page.tags %}
    <span class="badge badge-gray">{{ tag }}</span>
    {% endfor %}
  </div>
</div>

# Cloudflare Config for NPM

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

Cloudflare docker: 
[Cloudflare](https://freaky2112.github.io/docs/cloudflare/) 

In Cloudflare dashboard, add public hostnames pointing to your NPM instance:

| Hostname | Service |
|----------|---------|
| `jellyfin.yourdomain.com` | `http://npm:80` |
| `ha.yourdomain.com` | `http://npm:80` |
| `homer.yourdomain.com` | `http://npm:80` |

## Step 4 — nginx Proxy Manager

In NPM, create a proxy host for each service pointing to the internal container address. Enable SSL (Let's Encrypt) for each — NPM handles cert renewal automatically.

## Result

Zero open ports. All traffic flows through Cloudflare's network. SSL everywhere. Services accessible from anywhere. 🎉

---

*Questions? Open an issue on [GitHub](https://github.com/Freaky2112/freaky2112.github.io).*
