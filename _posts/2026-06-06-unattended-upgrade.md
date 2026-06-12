---
layout: post
title: "Unattended Upgrades & Gmail SMTP Alerts"
---

Set it, forget it, and get notified. Automatic security updates with email reporting on Debian and Ubuntu.

---

## Install the packages

Install `unattended-upgrades` and `apt-listchanges`, then run `dpkg-reconfigure` to enable it and generate the periodic config.

```bash
sudo apt install unattended-upgrades apt-listchanges
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## Tune the behavior

Edit `/etc/apt/apt.conf.d/50unattended-upgrades` to choose which origins to allow, toggle unused-dependency cleanup, and optionally schedule auto-reboots in a low-traffic window.

---

## Dry-run before you trust it

Run with `--dry-run --debug` to verify the config is sane without touching any packages. Check the log and systemd timer to confirm everything fires on schedule.

```bash
sudo unattended-upgrade --dry-run --debug
systemctl status apt-daily-upgrade.timer
```

---

## Wire up Gmail with s-nail

Generate a Gmail App Password (2FA required), install `s-nail`, and drop an SMTP config in `~/.mailrc`. Remember to URL-encode the `@` in your address as `%40` and strip spaces from the app password. Lock the file down with `chmod 600`.

```text
set v15-compat
set from="Your Name <your_email@gmail.com>"
set mta=smtp://your_email%40gmail.com:your16charpassword@smtp.gmail.com:587
set smtp-use-starttls
```

---

## Send a test email

Pipe a test string into `s-nail -v -s` and look for `250 2.0.0 OK` from the SMTP server to confirm delivery.

```bash
echo "Test." | s-nail -v -s "Gmail Success Test" recipient@example.com
```