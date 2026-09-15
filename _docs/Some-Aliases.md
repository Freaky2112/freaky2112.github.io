---
layout: default
title: "Some Interessting Aliases"
permalink: /docs/some-aliases/
---

#  Some of my Aliases
A lsit of the most interessting Aliases
You can donwload it 

[My Scripts:](https://github.com/Freaky2112/Scripts/tree/main/Bash/Bashrc)  

Or install it via github : 
```bash
curl -fsSL https://raw.githubusercontent.com/Freaky2112/Scripts/main/Bash/install | bash
```

Then reload the configuration:

```bash
source ~/.bashrc
```


## SSH AGENT  Alias
### Can be nice if you set passphrase in your sshkey 
Its primary job is to handle authentication so that you only have to type your key's passphrase once per session, rather than every single time you connect to a remote server or push code to Git

## Navigation
```bash
alias ..="cd .."
alias ...="cd ../.."
alias ll="ls -lah"
alias home="cd ~"
alias cwd="pwd"
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
alias disks="lsblk -f"
```

## Directory Sizes
```bash
alias du="du -sh *"
```
## Find Large Files
```bash
alias bigfiles="sudo du -ah / | sort -rh | head -20"
```

## Network
```bash
alias lip="hostname -I"
alias wip="curl -s icanhazip.com"
alias ports="sudo ss -tulpn"
alias conns="ss -tunap"
alias openports="sudo ss -lntup"
alias pingg="ping -c 4 8.8.8.8"
alias established="ss -tn state established"
```

## Kernel
```bash
alias kernel="uname -a"
```

## OS Information
```bash
alias os="cat /etc/os-release"
```

## CPU Load
```bash
alias load="uptime"
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
alias sshconfig="nano ~/.ssh/config"
alias sshperm="chmod 700 ~/.ssh && chmod 600 ~/.ssh/*"
alias sshhosts="cat ~/.ssh/known_hosts"
```

## Misc
```bash
alias clr="clear"
alias cls="clear"
```

## What is  my ip
check your internet ip address
```bash
alias wip="curl icanhazip.com"
```

## Sudo Apt / Apt install
skip sudo for your apt / apt install
```bash
alias apt="sudo apt"
alias install="sudo apt install"
```


## Clean Packages
```bash
alias clean="sudo apt autoremove -y && sudo apt autoclean"
```

## Search Packages
```bash
alias aptsearch="apt search"
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

## Systemd
Running Services
```bash
alias services="systemctl --type=service --state=running"
```
Failed Services
```bash
alias failed="systemctl --failed"
```
Service Status
```bash
alias sstatus="sudo systemctl status"
```
Restart Service
```bash
alias srestart="sudo systemctl restart"
```
Start Service
```bash
alias sstart="sudo systemctl start"
```
 Stop Service
```bash
alias sstop="sudo systemctl stop"
```
Enable Service
```bash
alias senable="sudo systemctl enable"
```
Disable Service
```bash
alias sdisable="sudo systemctl disable"
```

## Logs
Follow System Logs
```bash
alias logs="sudo journalctl -f"
```
Service Logs
```bash
alias sjournal="sudo journalctl -u"
```
Today's Logs
```bash
alias todaylogs="sudo journalctl --since today"
```
Current Boot
```bash
alias bootlogs="sudo journalctl -b"
```
Kernel Logs
```bash
alias klogs="sudo journalctl -k"
```
Errors
```bash
alias errors="sudo journalctl -p err -b"
```

---

## Docker
Running Containers
```bash
alias dps="docker ps"
```
All Containers
```bash
alias dpsa="docker ps -a"
```
Images
```bash
alias dimg="docker images"
```
Container Logs
```bash
alias dlog="docker logs -f"
```
Container Stats
```bash
alias dstats="docker stats"
```
Container Processes
```bash
alias dtop="docker top"
```
Start Container
```bash
alias dstart="docker start"
```
Stop Container
```bash
alias dstop="docker stop"
```
Restart Container
```bash
alias drestart="docker restart"
```
Remove Container
```bash
alias drm="docker rm"
```
Docker Disk Usage
```bash
alias dockerdu="docker system df"
```
Docker Cleanup
```bash
alias dclean="docker system prune"
```

## Docker Compose
Start Stack
```bash
alias dcup="docker compose up -d"
```
Stop Stack
```bash
alias dcdown="docker compose down"
```
Restart Stack
```bash
alias dcrestart="docker compose restart"
```
Stack Status
```bash
alias dcps="docker compose ps"
```
Stack Logs
```bash
alias dclog="docker compose logs -f"
```
Pull Images
```bash
alias dcpull="docker compose pull"
```
Update Stack
```bash
alias dcupdate="docker compose pull && docker compose up -d"
```
ebuild Stack
```bash
alias dcrebuild="docker compose up -d --build"
```

## Processes
All Processes
```bash
alias psall="ps aux"
```
Search Processes
```bash
alias psg="ps aux | grep"
```
Process Search
```bash
alias pgrep="pgrep -af"
```
Interactive Process Viewer
If `htop` is installed:
```bash
alias top="htop"
```
Kernel Messages
```bash
alias dmesg="sudo dmesg --color=always"
```

## Shell
Mounts
```bash
alias mounts="mount | column -t"
```
PCI Devices
```bash
alias pci="lspci"
```
USB Devices
```bash
alias usb="lsusb"
```

## Bash Shortcuts
Edit `.bash_aliases`
```bash
alias aliases="nano ~/.bash_aliases"
```
Reload `.bashrc`
```bash
alias reload="source ~/.bashrc"
```
Show Aliases
```bash
alias aliases-list="alias"
```
Command History
```bash
alias hist="history"
```
Search History
```bash
alias hgrep="history | grep"
```

---

