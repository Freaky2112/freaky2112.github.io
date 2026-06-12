---
layout: post
title: "Unattended Upgrades & Gmail Notifications"
---

Automate security patching on your server and get emailed when something actually happens — no babysitting required.

---

## 01 — Install & Enable

Get it running in two commands. Install the package, then run `dpkg-reconfigure` to enable it. This sets up two systemd timers — one to refresh the package list daily, one to apply updates.

```bash
sudo apt install unattended-upgrades apt-listchanges
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## 02 — Configure

Edit `/etc/apt/apt.conf.d/50unattended-upgrades` to tune the behavior. By default it only touches security packages, which is the safest scope for any internet-facing box. The two options most worth considering are unused dependency cleanup and auto-reboots — if you enable the latter, schedule it during a low-traffic window.

```conf
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
```

> **Tip:** The safest default for any internet-facing server is security-only updates with auto-reboot disabled. You stay protected without unexpected downtime.

---

## 03 — Test It

Always verify the config works before leaving it unattended. The dry-run flag runs the full logic without touching any packages.

```bash
sudo unattended-upgrade --dry-run --debug
```

---

## 04 — Gmail Notifications

Silent background updates are great until something breaks quietly. `s-nail` lets your server send email via Gmail SMTP. You'll need a Gmail App Password — Google blocks regular passwords for CLI tools, so generate a dedicated one from your account security settings (requires 2FA). Then drop it into `~/.mailrc` with one quirk: the `@` in your address must be written as `%40` inside the URL string.

```text
set v15-compat
set from="Your Name <you@gmail.com>"
set mta=smtp://you%40gmail.com:apppassword@smtp.gmail.com:587
set smtp-use-starttls
```

---

## 05 — Lock It Down & Test

The `~/.mailrc` file holds your App Password in plain text — restrict it immediately. Then fire off a test message and look for `250 2.0.0 OK` in the output to confirm the handshake worked.

```bash
chmod 600 ~/.mailrc
echo "test" | s-nail -v -s "Test" you@example.com
```