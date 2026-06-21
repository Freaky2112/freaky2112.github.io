---
layout: default
title: "Discord Notification"
---
# Get Discord Notifications for Unattended Upgrades on Linux

Keeping servers updated is one of the most important tasks in any homelab or production environment. Linux distributions such as Ubuntu and Debian make this easy through **Unattended Upgrades**, automatically installing security and package updates without manual intervention.

The challenge is visibility. Updates may be happening in the background, but unless you're actively checking logs, you might never know when a system has been patched, what was updated, or whether a reboot is required.

A simple solution is to integrate unattended upgrades with **Discord notifications**.

## Why Send Upgrade Notifications?

For homelab operators and system administrators, notifications provide immediate awareness of maintenance activity across your infrastructure.

Benefits include:

* Confirmation that automatic updates are working correctly
* Visibility into when systems were patched
* Faster identification of upgrade failures
* Awareness of pending reboots after kernel updates
* Centralized monitoring directly from Discord

Instead of logging into each server and reviewing package logs, you receive updates in a dedicated channel where all infrastructure events can be tracked.

## Using Discord Webhooks

Discord webhooks provide a lightweight method for servers to post messages directly into a channel.

Once configured, a server can automatically send notifications whenever unattended upgrades complete. Typical notification details might include:

* Hostname
* Date and time of the upgrade
* Number of packages updated
* Package names
* Reboot requirements
* Upgrade status

This creates a simple but effective audit trail for system maintenance.

## Integrating with Unattended Upgrades

There are several ways to trigger notifications:

### After Successful Package Operations

A notification can be sent whenever package management completes successfully. This approach is easy to implement and ensures administrators receive frequent feedback about system activity.

### After Actual Upgrade Installation

A more refined method is to trigger notifications only when unattended upgrades have installed packages. This reduces noise and keeps alerts focused on meaningful changes.

### Systemd Integration

Modern Linux systems use systemd to manage services. By linking notification tasks to the unattended-upgrades service, notifications can be delivered automatically after update operations finish.

This approach is reliable, clean, and aligns well with standard Linux service management practices.

## Taking It Further with Apprise

While Discord webhooks work well, larger homelabs often benefit from a notification platform such as Apprise.

Apprise acts as a universal notification gateway, allowing a single script to send messages to multiple destinations without modification.

Supported services include:

* Discord
* Email
* Slack
* Microsoft Teams
* Telegram
* ntfy
* Pushover
* Many others

This makes it easy to expand your alerting strategy as your environment grows.

For example, a notification that starts in Discord today could later be delivered simultaneously to email, mobile push notifications, and team collaboration tools without rewriting automation scripts.

## Homelab Use Cases

Discord upgrade notifications are especially useful for environments running multiple self-hosted services such as:

* Docker hosts
* Home Assistant
* Grafana
* Alloy
* Technitium DNS
* Navidrome
* Media servers
* Virtualization hosts
* Raspberry Pi clusters

Instead of manually checking each machine, you receive a centralized stream of maintenance events directly in your monitoring channel.

## Best Practices

When implementing upgrade notifications, consider the following:

* Create a dedicated Discord channel for infrastructure alerts.
* Include the hostname in every notification.
* Report whether a reboot is required.
* Parse upgrade logs to display the actual packages updated.
* Use embeds for cleaner and more readable messages.
* Retain upgrade logs for troubleshooting and auditing purposes.

## Conclusion

Automatic updates are only half of the equation. Knowing that updates have been successfully applied is equally important.

By connecting unattended upgrades to Discord, administrators gain immediate visibility into system maintenance without adding complexity. Whether you're managing a single server or an entire homelab, upgrade notifications provide peace of mind and help ensure that critical security updates never go unnoticed.

As your infrastructure grows, solutions like Apprise can further enhance your notification workflow by delivering alerts across multiple platforms while maintaining a single automation process.
