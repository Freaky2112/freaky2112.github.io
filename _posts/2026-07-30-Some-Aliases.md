---
layout: default
title: "Some Interessting Aliases"
---

#  Some of my Aliases
A lsit of the most interessting Aliases

## SSH AGENT  Alias
### Can be nice if you set passphrase in your sshkey 
Its primary job is to handle authentication so that you only have to type your key's passphrase once per session, rather than every single time you connect to a remote server or push code to Git

## Navigation
```bash
alias ..="cd .."
alias ...="cd ../.."
alias ll="ls -lah"
```
## System
```bash
alias update="sudo apt update && sudo apt upgrade -y"
alias clean="sudo apt autoremove -y"
alias reboot="sudo reboot"
alias shutdown="sudo shutdown -h now"
alias failed="systemctl --failed"
```
## Disk / memory
```bash
alias df="df -h"
alias mem="free -h"
alias disk="df -h"
```

## Network
```bash
alias lip="hostname -I"
alias wip="curl -s icanhazip.com"
alias ports="sudo ss -tulpn"
alias conns="ss -tunap"
alias pingg="ping -c 4 8.8.8.8"
alias wt="curl wttr.in"
```
## Docker
```bash
alias dps="docker ps"
alias dpsa="docker ps -a"
alias dlog="docker logs -f"
alias dcup="docker compose up -d"
alias dcdown="docker compose down"
alias dclog="docker compose logs -f"
alias dstats="docker stats"
alias dockerdu="docker system df"
```

## Logs
```bash
alias logs="sudo journalctl -f"
```

## SSH
```bash
alias sshlist="ssh-add -l"
alias  ssha='eval $(ssh-agent -s) && ssh-add ~/.ssh/your_private_key'
```

# Misc
```bash
alias clr="clear"
alias cls="clear"
```

## What is  my ip
check your internet ip address
```bash
alias wip="curl icanhazip.com"
```

## Sudo Apt
skip sudo for your apt
```bash
alias apt="sudo apt"
```

## Weather
Get Wethear in command line
```bash
alias wt="curl wttr.in"
```

## Speed Test
Check your internet connection speed
```bash
alias speed="curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python3 -"
```
