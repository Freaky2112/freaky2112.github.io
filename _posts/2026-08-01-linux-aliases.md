---

layout: default
title: "Linux Aliases test"
---

# ⚡ Linux Aliases

> A collection of useful **Linux Bash aliases** I use to make everyday server administration faster.

Whether I'm managing Docker containers, troubleshooting networking, checking server resources, or connecting over SSH, a few good aliases can save a surprising amount of typing.

```text
╭──────────────────────────────────────────────╮
│              ⚡ My HomeLab                 │
│                                            │
│  $ alias ll="ls -lah"                      │
│  $ alias dps="docker ps"                   │
│  $ alias ports="sudo ss -tulpn"            │
│                                            │
│  Less typing. More homelab.                │
╰──────────────────────────────────────────────╯
```

---

## 📁 Navigation & Files

### List Files

```bash
alias ll="ls -lah"
```

Detailed listing including hidden files.

### Directories First

```bash
alias lsd="ls -lah --group-directories-first"
```

### Go Up

```bash
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
```

### Home

```bash
alias home="cd ~"
```

### Current Directory

```bash
alias cwd="pwd"
```

### Clear Terminal

```bash
alias clr="clear"
alias cls="clear"
```

---

## 💾 Disk & Storage

### Disk Usage

```bash
alias disk="df -h"
```

### Directory Sizes

```bash
alias du="du -sh *"
```

### Block Devices

```bash
alias disks="lsblk -f"
```

### Docker Disk Usage

```bash
alias dockerdu="docker system df"
```

### Find Large Files

```bash
alias bigfiles="sudo du -ah / | sort -rh | head -20"
```

> ⚠️ This scans the entire filesystem and can take a while on large servers.

---

## 🧠 System Information

### Memory

```bash
alias mem="free -h"
```

### Uptime

```bash
alias uptime="uptime"
```

### Kernel

```bash
alias kernel="uname -a"
```

### OS Information

```bash
alias os="cat /etc/os-release"
```

### CPU Load

```bash
alias load="uptime"
```

### Logged-In Users

```bash
alias whois="who"
```

### Login History

```bash
alias logins="last"
```

### Reboot History

```bash
alias reboots="last reboot"
```

---

## 🔄 APT & Updates

### Update System

```bash
alias update="sudo apt update && sudo apt upgrade -y"
```

### Update Package List

```bash
alias aptup="sudo apt update"
```

### Upgrade Packages

```bash
alias aptupgrade="sudo apt upgrade -y"
```

### Install Package

```bash
alias install="sudo apt install"
```

### Clean Packages

```bash
alias clean="sudo apt autoremove -y && sudo apt autoclean"
```

### Search Packages

```bash
alias aptsearch="apt search"
```

---

## ⚡ Power

### Reboot

```bash
alias reboot="sudo reboot"
```

### Shutdown

```bash
alias shutdown="sudo shutdown -h now"
```

### Power Off

```bash
alias poweroff="sudo poweroff"
```

---

## 🌐 Networking

### Local IP

```bash
alias lip="hostname -I"
```

### Public IP

```bash
alias wip="curl -s icanhazip.com"
```

### Network Interfaces

```bash
alias ipa="ip -c a"
```

### Routing Table

```bash
alias route="ip route"
```

### Listening Ports

```bash
alias ports="sudo ss -tulpn"
```

### Network Connections

```bash
alias conns="ss -tunap"
```

### Open Ports

```bash
alias openports="sudo ss -lntup"
```

### Established Connections

```bash
alias established="ss -tn state established"
```

---

## 📡 Network Testing

### Ping Google

```bash
alias pingg="ping -c 4 8.8.8.8"
```

### Ping Cloudflare

```bash
alias pingc="ping -c 4 1.1.1.1"
```

### Internet Test

```bash
alias nettest="ping -c 4 1.1.1.1"
```

### DNS Lookup

```bash
alias dns="dig"
```

### Short DNS Lookup

```bash
alias digg="dig +short"
```

### DNS Configuration

```bash
alias dnsserver="cat /etc/resolv.conf"
```

### Trace Route

```bash
alias trace="traceroute"
```

### HTTP Headers

```bash
alias headers="curl -I"
```

---

## 🌤️ Internet Tools

### Weather

```bash
alias wt="curl wttr.in"
```

### Internet Speed

```bash
alias speed="curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python3 -"
```

> 💡 For regular use, installing `speedtest-cli` is preferable to downloading the script each time.

---

## 🔐 SSH

### Start SSH Agent

```bash
alias ssha='eval "$(ssh-agent -s)" && ssh-add ~/.ssh/your_private_key'
```

### List SSH Keys

```bash
alias sshlist="ssh-add -l"
```

### SSH Configuration

```bash
alias sshconfig="nano ~/.ssh/config"
```

### Fix SSH Permissions

```bash
alias sshperm="chmod 700 ~/.ssh && chmod 600 ~/.ssh/*"
```

### Known Hosts

```bash
alias sshhosts="cat ~/.ssh/known_hosts"
```

---

## ⚙️ Systemd

### Failed Services

```bash
alias failed="systemctl --failed"
```

### Service Status

```bash
alias sstatus="sudo systemctl status"
```

### Restart Service

```bash
alias srestart="sudo systemctl restart"
```

### Start Service

```bash
alias sstart="sudo systemctl start"
```

### Stop Service

```bash
alias sstop="sudo systemctl stop"
```

### Enable Service

```bash
alias senable="sudo systemctl enable"
```

### Disable Service

```bash
alias sdisable="sudo systemctl disable"
```

---

## 📜 Logs

### Follow System Logs

```bash
alias logs="sudo journalctl -f"
```

### Service Logs

```bash
alias sjournal="sudo journalctl -u"
```

Example:

```bash
sjournal docker
```

### Today's Logs

```bash
alias todaylogs="sudo journalctl --since today"
```

### Current Boot

```bash
alias bootlogs="sudo journalctl -b"
```

### Kernel Logs

```bash
alias klogs="sudo journalctl -k"
```

### Errors

```bash
alias errors="sudo journalctl -p err -b"
```

---

## 🐳 Docker

### Running Containers

```bash
alias dps="docker ps"
```

### All Containers

```bash
alias dpsa="docker ps -a"
```

### Images

```bash
alias dimg="docker images"
```

### Container Logs

```bash
alias dlog="docker logs -f"
```

Example:

```bash
dlog grafana
```

### Container Stats

```bash
alias dstats="docker stats"
```

### Container Processes

```bash
alias dtop="docker top"
```

### Start Container

```bash
alias dstart="docker start"
```

### Stop Container

```bash
alias dstop="docker stop"
```

### Restart Container

```bash
alias drestart="docker restart"
```

### Remove Container

```bash
alias drm="docker rm"
```

### Docker Disk Usage

```bash
alias dockerdu="docker system df"
```

### Docker Cleanup

```bash
alias dclean="docker system prune"
```

> ⚠️ Check what Docker wants to remove before confirming.

---

## 🧩 Docker Compose

### Start Stack

```bash
alias dcup="docker compose up -d"
```

### Stop Stack

```bash
alias dcdown="docker compose down"
```

### Restart Stack

```bash
alias dcrestart="docker compose restart"
```

### Stack Status

```bash
alias dcps="docker compose ps"
```

### Stack Logs

```bash
alias dclog="docker compose logs -f"
```

### Pull Images

```bash
alias dcpull="docker compose pull"
```

### Update Stack

```bash
alias dcupdate="docker compose pull && docker compose up -d"
```

### Rebuild Stack

```bash
alias dcrebuild="docker compose up -d --build"
```

---

## 🔎 Processes

### All Processes

```bash
alias psall="ps aux"
```

### Search Processes

```bash
alias psg="ps aux | grep"
```

Example:

```bash
psg docker
```

### Process Search

```bash
alias pgrep="pgrep -af"
```

### Interactive Process Viewer

If `htop` is installed:

```bash
alias top="htop"
```

---

## 🧪 Troubleshooting

### Kernel Messages

```bash
alias dmesg="sudo dmesg --color=always"
```

### Mounts

```bash
alias mounts="mount | column -t"
```

### PCI Devices

```bash
alias pci="lspci"
```

### USB Devices

```bash
alias usb="lsusb"
```

### Running Services

```bash
alias services="systemctl --type=service --state=running"
```

### Failed Services

```bash
alias bootfailed="systemctl --failed"
```

---

## 🛠️ Bash Shortcuts

### Edit `.bashrc`

```bash
alias aliases="nano ~/.bashrc"
```

### Reload `.bashrc`

```bash
alias reload="source ~/.bashrc"
```

### Show Aliases

```bash
alias aliases-list="alias"
```

### Command History

```bash
alias hist="history"
```

### Search History

```bash
alias hgrep="history | grep"
```

Example:

```bash
hgrep docker
```

---

# 🏠 Homelab Favorites

These are the aliases I find especially useful when working on my homelab servers.

### Server Overview

```bash
alias info="hostname; uptime; free -h; df -h"
```

### Docker Overview

```bash
alias dockercheck="docker ps && docker system df"
```

### Running Services

```bash
alias services="systemctl --type=service --state=running"
```

### Watch Memory

```bash
alias watchmem="watch -n 2 free -h"
```

### Watch Disk

```bash
alias watchdisk="watch -n 5 df -h"
```

### Watch Docker

```bash
alias watchdocker="watch -n 2 docker ps"
```

---

# ⭐ My Core Alias Set

Don't want to install everything?

These are the aliases I'd put on almost every Linux server:

```bash
# Navigation
alias ll="ls -lah"
alias ..="cd .."
alias ...="cd ../.."

# System
alias update="sudo apt update && sudo apt upgrade -y"
alias clean="sudo apt autoremove -y"
alias failed="systemctl --failed"
alias reboot="sudo reboot"

# Storage
alias disk="df -h"
alias disks="lsblk -f"

# Network
alias lip="hostname -I"
alias wip="curl -s icanhazip.com"
alias ports="sudo ss -tulpn"
alias conns="ss -tunap"
alias pingg="ping -c 4 8.8.8.8"

# SSH
alias sshlist="ssh-add -l"

# Docker
alias dps="docker ps"
alias dpsa="docker ps -a"
alias dlog="docker logs -f"
alias dstats="docker stats"

# Docker Compose
alias dcup="docker compose up -d"
alias dcdown="docker compose down"
alias dclog="docker compose logs -f"
alias dcps="docker compose ps"
alias dcupdate="docker compose pull && docker compose up -d"

# Logs
alias logs="sudo journalctl -f"
alias sjournal="sudo journalctl -u"
alias errors="sudo journalctl -p err -b"

# Bash
alias clr="clear"
alias reload="source ~/.bashrc"
alias hist="history"
```

---

# 🚀 Installing the Aliases

Open your Bash configuration:

```bash
nano ~/.bashrc
```

Add the aliases to the bottom of the file.

Then reload the configuration:

```bash
source ~/.bashrc
```

Or use the alias:

```bash
reload
```

Check an individual alias:

```bash
alias ll
```

List all aliases:

```bash
alias
```

---

# 💡 Creating Your Own Alias

The basic syntax is:

```bash
alias NAME="COMMAND"
```

For example:

```bash
alias myip="hostname -I"
```

Now:

```bash
myip
```

is equivalent to:

```bash
hostname -I
```

---

# ⚠️ A Few Things to Keep in Mind

Aliases are great, but I try not to overwrite standard Linux commands unless there is a good reason.

For example:

```bash
alias apt="sudo apt"
```

is convenient, but can make troubleshooting confusing when following documentation.

I generally prefer:

```bash
alias aptup="sudo apt update"
alias aptupgrade="sudo apt upgrade -y"
```

The same applies to commands such as `reboot`, `shutdown`, `top`, and `df`.

For a homelab, **short unique aliases are usually the safest approach**.

---

# ⚡ Final Thought

A good alias isn't about making a command clever.

It's about taking something you type **20 times a week** and turning it into something you type once.

```text
           ┌───────────────────────┐
           │       MY HOMELAB      │
           ├───────────────────────┤
           │                     │
           │  Type less          │
           │  Admin faster       │
           │  Break things faster│
           │                     │
           │       ⚡ Linux      │
           └───────────────────────┘
```

Happy homelabbing! 🐧⚡
