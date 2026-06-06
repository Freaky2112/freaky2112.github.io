---
layout: default
title: "Technitium DNS"
permalink: /docs/technitium/
---

# Technitium DNS — Installation & Setup Guide

> **Technitium** is a lightweight, open-source DNS server and a fantastic alternative to Pi-hole or AdGuard Home. It handles ad blocking, authoritative DNS, and recursive lookups natively — no extra tools like Unbound required. It runs seamlessly on Linux, Docker, and Windows.

---

## Table of Contents

- [Technitium DNS — Installation \& Setup Guide](#technitium-dns--installation--setup-guide)
  - [Table of Contents](#table-of-contents)
  - [Method 1 — Linux / Raspberry Pi (Automated Script)](#method-1--linux--raspberry-pi-automated-script)
  - [Method 2 — Docker / Docker Compose](#method-2--docker--docker-compose)
  - [Method 3 — Windows Installer](#method-3--windows-installer)
  - [Initial Web Console Setup](#initial-web-console-setup)
  - [Recommended Next Steps](#recommended-next-steps)
  - [Adding DNS Forwarders](#adding-dns-forwarders)
    - [Step 1 — Open Forwarder Settings](#step-1--open-forwarder-settings)
    - [Step 2 — Configure Upstream DNS](#step-2--configure-upstream-dns)
    - [Step 3 — Save and Apply](#step-3--save-and-apply)
    - [Step 4 — Test the Forwarder](#step-4--test-the-forwarder)

---

## Method 1 — Linux / Raspberry Pi (Automated Script)

**Best for:** Dedicated VMs (Ubuntu/Debian) or a Raspberry Pi.

> ⚠️ **Important:** Modern Linux distros use `systemd-resolved`, a built-in stub resolver that occupies **Port 53**. The Technitium installer script will automatically stop and disable it so Technitium can take over.

**1. Update your system:**

```bash
sudo apt update && sudo apt upgrade -y
```

**2. Run the official installation script:**

```bash
curl -sSL https://download.technitium.com/dns/install.sh | sudo bash
```

**3. Verify the service is running:**

The service runs natively via `systemd`. Check its status with:

```bash
sudo systemctl status dns.service
```

---

## Method 2 — Docker / Docker Compose

**Best for:** Homelabs already running a container environment.

**1. Create a dedicated directory:**

```bash
mkdir technitium-dns && cd technitium-dns
```

**2. Create a `docker-compose.yml` file:**

```bash
nano docker-compose.yml
```

**3. Paste the following configuration** (adjust the timezone as needed):

```yaml
version: '3'
services:
  dns-server:
    container_name: technitium-dns
    image: technitium/dns-server:latest
    restart: unless-stopped
    ports:
      - "53:53/udp"
      - "53:53/tcp"
      - "5380:5380/tcp"   # Web GUI (HTTP)
    environment:
      - TZ=America/New_York   # Change to your timezone
    volumes:
      - ./config:/etc/dns/config
```

**4. Start the container:**

```bash
docker compose up -d
```

---

## Method 3 — Windows Installer

**Best for:** Quick testing or environments integrated with Windows Server.

1. Go to the **[Official Technitium Download Page](https://technitium.com/dns/)**.
2. Download the **Windows (Setup)** zip file.
3. Extract the contents and run **`DnsServerSetup.exe`**.
4. If **Windows SmartScreen** warns about an unrecognized app, click **More Info → Run Anyway**.
5. Follow the setup wizard using the default parameters.

Once complete, Technitium will run in the background as a **Windows Service**.

---

## Initial Web Console Setup

All management happens through Technitium's web interface.

1. Open your browser and navigate to:
   ```
   http://<YOUR-SERVER-IP>:5380
   ```
   *(Use `http://localhost:5380` if running locally.)*

2. **First Login:** Technitium will auto-login to the dashboard on first launch.

3. **Change your password immediately** — a prompt will appear asking you to set a secure admin password. **Do not skip this step.**

---

## Recommended Next Steps

| Step | Where | What to do |
|------|--------|------------|
| Set up forwarders | **Settings → Proxy & Forwarders** | Add upstream DNS providers like Cloudflare (`1.1.1.1`) or Quad9 (`9.9.9.9`) |
| Enable ad blocking | **Settings → Blocking** | Paste in blocklists such as [StevenBlack's lists](https://github.com/StevenBlack/hosts) for network-wide ad & malware protection |
| Update your router | Router's DHCP settings | Set the primary DNS server IP to your Technitium server's IP to protect your whole network |

---

## Adding DNS Forwarders

A DNS forwarder tells Technitium to send unresolved queries to a public upstream DNS provider. This is typically **faster** than recursive root-server lookups, because providers like Cloudflare and Quad9 maintain massive caches.

### Step 1 — Open Forwarder Settings

1. Access your dashboard at `http://<YOUR-SERVER-IP>:5380`.
2. Click the **Settings** tab at the top.
3. In the left sidebar, click **Proxy & Forwarders**.

### Step 2 — Configure Upstream DNS

In the **Forwarders** section, enter your preferred upstream DNS servers (one IP per line):

| Provider | Primary IP | Secondary IP | Notes |
|----------|------------|--------------|-------|
| **Cloudflare** | `1.1.1.1` | `1.0.0.1` | Speed-focused, privacy-first |
| **Quad9** | `9.9.9.9` | `149.112.112.112` | Built-in security & malware blocking |
| **Google** | `8.8.8.8` | `8.8.4.4` | Highly reliable, fast global routing |

> 💡 **Privacy Tip:** Change the **Forwarder Protocol** dropdown to **DNS-over-TLS (DoT)** or **DNS-over-HTTPS (DoH)** for encrypted queries. If you do, format the address accordingly — e.g., `tls://1.1.1.1` for Cloudflare DoT.

### Step 3 — Save and Apply

Scroll to the bottom of the page and click the green **Save Settings** button.

### Step 4 — Test the Forwarder

1. Click the **Dashboard** tab at the top.
2. Open the built-in **DNS Client** tool on the right side.
3. Enter any domain (e.g., `google.com`) and click **Resolve**.
4. A successful result returning an IP address with a fast response time (in milliseconds) confirms your forwarder is working correctly. ✅

---

*Guide covers Technitium DNS — open source, free, and actively maintained at [technitium.com](https://technitium.com/dns/).*
