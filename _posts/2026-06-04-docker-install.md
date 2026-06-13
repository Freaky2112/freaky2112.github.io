---
layout: default
title: "Docker Install"
---

---
# Install Docker Engine on Debian

---

## Step 1 — Clean Up Old Versions

- If you have older versions of Docker installed, remove them first to prevent conflicts:

- Don't worry if apt reports that none of these packages are installed — you can safely continue.

---

## Step 2 — Install Prerequisites

- Update your package index and install the packages needed for `apt` to use a repository over HTTPS:

  "ca-certificates curl gnupg"

---

## Step 3 — Add Docker's Official GPG Key

- Create a directory for keyrings, then download and store Docker's GPG key. This ensures the packages you download are authentic and unmodified:
- Set permission for folder to 0755  /etc/apt/keyrings
- curl keyring : https://download.docker.com/linux/debian/gpg  
- and save it in /etc/apt/keyrings/docker.gpg
- change permission to everybody read /etc/apt/keyrings/docker.gpg

---

## Step 4 — Set Up the Repository

- Add the official Docker repository to your system's source list:

  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \

---

## Step 5 — Install Docker Engine

- Update your package index again (so it picks up the new Docker repository), then install Docker, the CLI, and Docker Compose:

- update
- install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

---

## Step 6 — Verify the Installation

- Run the `hello-world` test image to confirm Docker is installed and the service is running:

docker run hello-world


If successful, Docker will pull a small test image, run it, and print a **"Hello from Docker!"** message. You're all set. ✅

---

## Run Docker Without `sudo` 

By default, Docker commands require root privileges. To run Docker as your regular non-root user, add yourself to the `docker` group:

Create the `docker` group

Add your user to the group

Apply the changes

Log out and log back in 


You can verify it works by running `docker run hello-world` without `sudo`.


