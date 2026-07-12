---
title: "Building a Resilient Technitium DNS Cluster: Zone Replication + Failover"
date: 2026-07-02
categories: [homelab, dns]
tags: [technitium, dns, high-availability, keepalived]
---

> DNS is one of those services where "it just works" — right up until it doesn't, and suddenly *nothing* on your network resolves. This post walks through turning a single Technitium DNS Server into a two-node setup with zone replication and automatic failover, so a single node going down doesn't take your whole homelab with it.

## Why Cluster Technitium?

Technitium doesn't ship with a single "enable clustering" toggle like some enterprise appliances. Instead, high availability is built from two independent pieces working together:


## Create Cluster 

#### Primary DNS
On the primary dns go to \
Administration \
&emsp;└─ Cluster \
&emsp;&emsp;&emsp;└─New Cluster 

Domain Cluster name "some name" \
Add ip address for Primary Node \
you can use the quick fill


dministration \
&emsp;└─ Cluster \
&emsp;&emsp;&emsp;└─Join Cluster

Add ip address for Secondry Node \
you can use the quick fill \

Add primary node URL: "ns.yourdomain.com:53443" \
Add ip address of Primary Node \
Check ignore certificate \
Fill the Username and Password of Primary node
