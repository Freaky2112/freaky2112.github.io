Yes. The easiest way is to have unattended-upgrades call a script after upgrades complete, and have that script send a message to a Discord webhook.

1. Create a Discord Webhook

In Discord:

Server Settings → Integrations → Webhooks
Create Webhook
Copy the webhook URL

It will look something like:

https://discord.com/api/webhooks/123456789/abcdefghijklmnopqrstuvwxyz
2. Create a notification script
sudo nano /usr/local/bin/discord-upgrade-notify.sh
#!/bin/bash

WEBHOOK_URL="YOUR_DISCORD_WEBHOOK"

HOSTNAME=$(hostname)
DATE=$(date)

UPGRADES=$(grep "Packages that will be upgraded" /var/log/unattended-upgrades/unattended-upgrades.log | tail -1)

curl -s -H "Content-Type: application/json" \
    -X POST \
    -d "{
      \"content\": \"🔄 Unattended Upgrade completed on **${HOSTNAME}** at ${DATE}\n${UPGRADES}\"
    }" \
    "$WEBHOOK_URL" >/dev/null

Make it executable:

sudo chmod +x /usr/local/bin/discord-upgrade-notify.sh
3. Run it after unattended-upgrades

Edit:

sudo nano /etc/apt/apt.conf.d/99discord-notify

Add:

APT::Update::Post-Invoke-Success {
    "/usr/local/bin/discord-upgrade-notify.sh";
};

This triggers after successful apt operations.

Better option: Notify only when upgrades are actually installed

Create a systemd service:

sudo nano /etc/systemd/system/unattended-upgrades-notify.service
[Unit]
Description=Discord notification after unattended upgrades
After=unattended-upgrades.service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/discord-upgrade-notify.sh

Then add a drop-in:

sudo systemctl edit unattended-upgrades.service
[Unit]
Wants=unattended-upgrades-notify.service

Reload:

sudo systemctl daemon-reload
Homelab-friendly version

Since you're already running Docker, Grafana, Alloy, Technitium, Navidrome, etc., I would actually recommend using Apprise instead of raw Discord webhooks.

Install:

apt install apprise

Send a message:

apprise \
  -b "Unattended upgrades completed on $(hostname)" \
  "discord://WEBHOOK_ID/WEBHOOK_TOKEN"

Apprise can later send to:

Discord
Email
Slack
Teams
Telegram
Pushover
ntfy

without changing your scripts.

If you'd like, 
I can also give you a script that parses /var/log/unattended-upgrades/unattended-upgrades.log and sends a Discord embed listing exactly which packages were upgraded and whether a reboot is required.