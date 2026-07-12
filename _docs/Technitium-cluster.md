---
title: "Building a Resilient Technitium DNS Cluster: Zone Replication + Failover"
date: 2026-07-02
categories: [homelab, dns]
tags: [technitium, dns, high-availability, keepalived]
---

> DNS is one of those services where "it just works" — right up until it doesn't, and suddenly *nothing* on your network resolves. This post walks through turning a single Technitium DNS Server into a two-node setup with zone replication and automatic failover, so a single node going down doesn't take your whole homelab with it.

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Why Cluster Technitium?](#why-cluster-technitium)
- [Creating the Cluster](#creating-the-cluster)
  - [On the Primary Node](#on-the-primary-node)
  - [On the Secondary Node](#on-the-secondary-node)
- [Zone Replication](#zone-replication)
- [Automatic Failover with Keepalived](#automatic-failover-with-keepalived)
- [Testing the Setup](#testing-the-setup)
- [Wrapping Up](#wrapping-up)

## Why Cluster Technitium?

Technitium doesn't ship with a single "enable clustering" toggle like some enterprise appliances. Instead, high availability is built from two independent pieces working together:

- **Cluster / zone replication** — keeps DNS records in sync across nodes, so both servers always answer with the same data.
- **A floating VIP with keepalived** — gives clients one IP to point at, and automatically moves that IP to whichever node is healthy.

Neither piece alone gives you HA: replication without a VIP just means two servers with the same data and no automatic cutover; a VIP without replication means your backup node could serve stale or empty zones. You need both.

## Creating the Cluster

### On the Primary Node

1. Go to **Administration → Cluster → New Cluster**
2. Set a **Cluster Name** (e.g. `home-dns-cluster`)
3. Add the IP address for the **Primary Node** — the "quick fill" button will populate this from the server's own interface

> 💡 **Tip:** Use a static IP (not the future VIP) for each node here — the cluster tracks individual nodes independently of whatever floating IP you put in front of them later.

### On the Secondary Node

1. Go to **Administration → Cluster → Join Cluster**
2. Add the IP address for the **Secondary Node** (quick fill works here too)
3. Fill in the **Primary Node URL**, e.g.:
   ```
   ns.yourdomain.com:53443
   ```
4. Add the **IP address of the Primary Node**
5. Check **Ignore Certificate** (unless you've already got valid certs across both nodes)
6. Enter the **Username** and **Password** of the Primary node

> ⚠️ **Gotcha:** If the join hangs or fails silently, double-check port `53443` (Technitium's HTTPS API/admin port) is reachable between the two nodes — a firewall rule blocking it is the most common culprit.

Once joined, the secondary shows up under **Administration → Cluster** on the primary, and you can confirm both nodes report as healthy.

## Zone Replication

<!-- TODO: fill in with your actual zone replication steps — outline below based on standard Technitium cluster behavior, verify against your setup -->

With the cluster formed, zones created on the primary propagate to the secondary automatically. A few things worth checking once you have zones in place:

- Go to **Zones** on the primary and confirm each zone you want highly available shows as replicated (Technitium marks cluster-synced zones in the zone list).
- Changes made on the primary (new records, TTL edits) should appear on the secondary within a few seconds — worth watching the **Cluster** status page the first time to confirm sync is actually happening.
- If a zone was created *before* the cluster existed, you may need to re-save it or trigger a manual sync so it picks up replication.

## Automatic Failover with Keepalived

Zone replication solves the data problem; keepalived solves the "which server do clients actually talk to" problem.

The idea: both nodes run `keepalived`, negotiate over VRRP, and whichever one wins holds a floating **Virtual IP (VIP)**. Clients (and your router's DNS setting) point at the VIP, not at either node directly. If the master goes down, the backup takes over the VIP within seconds.

```bash
sudo apt install keepalived
```

Example `/etc/keepalived/keepalived.conf` on the **primary**:

```
vrrp_instance DNS_HA {
    state MASTER
    interface eth0
    virtual_router_id 51
    priority 150
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass yourpassword
    }
    virtual_ipaddress {
        192.168.1.53/24
    }
}
```

And on the **secondary**, the same block with `state BACKUP` and a lower `priority` (e.g. `100`).

> ⚠️ **Gotcha:** Replace `interface`, `virtual_router_id`, and the VIP with values that match your own network — reused `virtual_router_id` values are a classic source of VRRP conflicts if you're running other keepalived instances on the same LAN.

Restart and enable the service on both nodes:

```bash
sudo systemctl enable --now keepalived
```

Point your router's DNS (or DHCP-served DNS option) at the VIP — that's the only address your clients need to know about going forward.

## Testing the Setup

Before trusting this in production:

- Query the VIP with `dig` from a client and confirm you get answers.
- Stop Technitium (or pull the network cable) on the primary and watch `ip a` on the secondary — the VIP should appear there within a second or two.
- Re-run the `dig` query against the same VIP and confirm resolution didn't skip a beat.
- Bring the primary back and confirm it reclaims the VIP (or stays backup, depending on your `nopreempt` setting) without breaking anything.

## Wrapping Up

Two independent mechanisms, one resilient DNS setup: Technitium's clustering keeps your zone data in sync, and keepalived makes sure clients never notice when a node drops. It's a modest amount of setup for a service that, when it fails silently, takes everything else on your network down with it.