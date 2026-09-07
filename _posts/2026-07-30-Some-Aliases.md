---
layout: default
title: "Some Interessting Aliases"
---

#  Some of my Aliases
A lsit of the most interessting Aliases

# SSH AGENT  Alias
Its primary job is to handle authentication so that you only have to type your key's passphrase once per session, rather than every single time you connect to a remote server or push code to Git
```bash
alias  ssha='eval $(ssh-agent -s) && ssh-add ~/.ssh/your_private_key'
```
# What is  my ip
check your internet ip address
```bash
alias wip="curl icanhazip.com"
```
# Sudo Apt
skip sudo for your apt
```bash
alias apt="sudo apt"
```
# Reboot server with Sudo
Reboot with sudo
```bash
alias reboot="sudo reboot"
```
# check open port
Check open port on your machine
```bash
alias port="netstat -tulanp"
```
# Weather
Get Wethear in command line
```bash
alias wt="curl wttr.in"
```
# Speed Test
Check your internet connection speed
```bash
alias speed="curl -s https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py | python3 -"
```
## cd ..
Go back on level directory with out cd
```bash
alias ..="cd .."
```
## clear screen
Clear Screen
```bash
alias clr="clear"
alias cls="clear"
```
