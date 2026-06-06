---
layout: default
title: "Docker Install"
permalink: /docs/docker_install/
---

---
# Install Docker Engine on Debian

> This guide uses the **official Docker repository**, ensuring you get the latest version rather than the outdated packages often found in default Debian repos.
>
> ✅ Compatible with **Debian 11 (Bullseye)** and **Debian 12 (Bookworm)**.

---

## Table of Contents

- [Install Docker Engine on Debian](#install-docker-engine-on-debian)
  - [Table of Contents](#table-of-contents)
  - [Step 1 — Clean Up Old Versions](#step-1--clean-up-old-versions)
  - [Step 2 — Install Prerequisites](#step-2--install-prerequisites)
  - [Step 3 — Add Docker's Official GPG Key](#step-3--add-dockers-official-gpg-key)
  - [Step 4 — Set Up the Repository](#step-4--set-up-the-repository)
  - [Step 5 — Install Docker Engine](#step-5--install-docker-engine)
  - [Step 6 — Verify the Installation](#step-6--verify-the-installation)
  - [Pro Tip — Run Docker Without `sudo` (Optional)](#pro-tip--run-docker-without-sudo-optional)

---

## Step 1 — Clean Up Old Versions

If you have older versions of Docker installed, remove them first to prevent conflicts:

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

> Don't worry if apt reports that none of these packages are installed — you can safely continue.

---

## Step 2 — Install Prerequisites

Update your package index and install the packages needed for `apt` to use a repository over HTTPS:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```

---

## Step 3 — Add Docker's Official GPG Key

Create a directory for keyrings, then download and store Docker's GPG key. This ensures the packages you download are authentic and unmodified:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

---

## Step 4 — Set Up the Repository

Add the official Docker repository to your system's source list:

```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

---

## Step 5 — Install Docker Engine

Update your package index again (so it picks up the new Docker repository), then install Docker, the CLI, and Docker Compose:

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## Step 6 — Verify the Installation

Run the `hello-world` test image to confirm Docker is installed and the service is running:

```bash
sudo docker run hello-world
```

If successful, Docker will pull a small test image, run it, and print a **"Hello from Docker!"** message. You're all set. ✅

---

## Pro Tip — Run Docker Without `sudo` (Optional)

By default, Docker commands require root privileges. To run Docker as your regular non-root user, add yourself to the `docker` group:

**1. Create the `docker` group** (usually already exists, safe to re-run):

```bash
sudo groupadd docker
```

**2. Add your user to the group:**

```bash
sudo usermod -aG docker $USER
```

**3. Apply the changes:**

Log out and log back in, or run the following to activate the new group in your current session:

```bash
newgrp docker
```

You can verify it works by running `docker run hello-world` without `sudo`.

---

*Official Docker documentation: [docs.docker.com/engine/install/debian](https://docs.docker.com/engine/install/debian/)*

