---
layout: default
title: "Unattended Upgrade"
permalink: /docs/unattended_upgrade/
---

# Unattended Upgrades on Debian / Ubuntu

Unattended upgrades automatically install security updates without manual intervention.

## Install the package

```bash
sudo apt install unattended-upgrades apt-listchanges
```

## Enable it

```bash
sudo dpkg-reconfigure -plow unattended-upgrades
```

Select **Yes** when prompted. This creates `/etc/apt/apt.conf.d/20auto-upgrades` with:

```
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
```

## Configure behavior

Edit `/etc/apt/apt.conf.d/50unattended-upgrades`:

```bash
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

Key options to customize:

```conf
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}-security";   // Security updates (enabled by default)
    "${distro_id}:${distro_codename}-updates";    // Recommended updates (uncomment to enable)
};

// Automatically remove unused dependencies
Unattended-Upgrade::Remove-Unused-Dependencies "true";

// Auto-reboot if needed (e.g. kernel updates)
Unattended-Upgrade::Automatic-Reboot "false";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";  // If rebooting, do it at 2am

// Email notifications
Unattended-Upgrade::Mail "you@example.com";
Unattended-Upgrade::MailReport "on-change";  // only, always, only-on-error or on-change
```

## Test it

Do a dry run to verify everything works without actually installing anything:

```bash
sudo unattended-upgrade --dry-run --debug
```

## Check logs

```bash
# Recent activity
cat /var/log/unattended-upgrades/unattended-upgrades.log

# Systemd timer status
systemctl status apt-daily-upgrade.timer
```

## Tips

- By default, only **security** updates are applied — this is the safe default for production servers.
- Enabling `-updates` (non-security) is fine for most servers but introduces slightly more risk.
- If you enable `Automatic-Reboot`, set the time to a low-traffic window.
- On Ubuntu, the `ubuntu-advantage-tools` origin can also be added if you use ESM (extended security maintenance).

---

# Setting Up s-nail with Gmail SMTP


`s-nail` is the modern variant of the classic `mailx` command. It supports native external SMTP configuration using the modern `mta` string layout.

## Step 1: Generate a Gmail App Password
Google blocks standard account passwords for command-line tools. You must use a dedicated App Password.

1. Go to your **[Google Account Security Settings](https://google.com)**.
2. Verify that **2-Step Verification** is turned on.
3. Go directly to the **[Google App Passwords Page](https://google.com)**.
4. Give it a descriptive name (e.g., `Linux Mailx`) and click **Create**.
5. Copy the 16-character code (e.g., `abcd efgh ijkl mnop`). 
   * *Note: Strip out all spaces when pasting this password into your configuration file.*

---
## Step 2: Install s-nail

```bash
sudo apt update
sudo apt install s-nail -y
```

## Step 3: Configure your `~/.mailrc` File
Open or create your personal configuration file using a text editor:

```bash
nano ~/.mailrc
```

Paste the following configurations. Make sure to replace `your_email` and `your16charpassword` with your actual information:

```text
set v15-compat
set from="Your Name <your_email@gmail.com>"
set mta=smtp://your_email%40gmail.com:your16charpassword@smtp.gmail.com:587
set smtp-use-starttls
```

### ⚠️ Critical Syntax Rules:
* **URL Encoding (`%40`):** You **must** replace the `@` symbol in your username with `%40` inside the `set mta=` URL string (e.g., `john@gmail.com` becomes `john%40gmail.com`).
* **No Spaces:** Remove all spaces from your 16-character App Password (e.g., `abcdefghijklmnop`).

---

## Step 4: Secure the Configuration File
Restrict the file permissions immediately so other system users cannot read your plaintext configuration and App Password:

```bash
chmod 600 ~/.mailrc
```

---

## Step 5: Test the Setup
Run a verbose test command to verify the handshake process and ensure your email delivers successfully:

```bash
echo "Testing updated s-nail configuration with Gmail." | s-nail -v -s "Gmail Success Test" recipient_email@example.com
```

### Expected Success Output
If configured correctly, the terminal output will stream the connection steps and cleanly terminate with a final confirmation block resembling:
`SMTP server: 250 2.0.0 OK ...`






