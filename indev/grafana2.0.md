

notes = """Docker Monitoring Stack Conversation Notes

==================================================
1. Grafana + Prometheus Setup
==================================================
- Installed Grafana and Prometheus with Docker Compose
- Added Node Exporter for Linux system metrics
- Imported Node Exporter dashboard in Grafana

Main services:
- Grafana
- Prometheus
- Node Exporter

--------------------------------------------------
2. Monitoring Additional Servers
--------------------------------------------------
Steps:
1. Install Node Exporter on each server
2. Expose port 9100
3. Add server IPs to prometheus.yml targets
4. Restart Prometheus

Example target:
192.168.1.50:9100

--------------------------------------------------
3. cAdvisor Setup
--------------------------------------------------
Purpose:
- Monitor Docker containers

Metrics:
- CPU
- Memory
- Network
- Disk I/O

Common warning:
failed to collect filesystem stats

Cause:
- Usually harmless with overlayfs storage driver

Recommended cAdvisor options:
--docker_only=true
--housekeeping_interval=30s

Recommended mounts:
- /var/run (rw)
- /var/lib/docker
- /sys
- /dev/disk
- /dev/kmsg

--------------------------------------------------
4. Proxmox Exporter
--------------------------------------------------
Purpose:
- Monitor Proxmox host, VMs, LXCs, storage

Steps:
1. Create API user:
   monitor@pve

2. Create API token

3. Assign role:
   PVEAuditor

4. Add exporter container

Grafana dashboards:
- 10347
- 10048

--------------------------------------------------
5. Loki + Alloy
--------------------------------------------------
Purpose:
- Centralized log aggregation

Architecture:
Monitoring VM:
- Grafana
- Loki

Other servers:
- Alloy agents

Flow:
Servers -> Alloy -> Loki -> Grafana

--------------------------------------------------
6. Native Alloy Installation
--------------------------------------------------
Install binary:
- Download Alloy
- Move to /usr/local/bin/alloy

Config:
- /etc/alloy/config.alloy

Service:
- /etc/systemd/system/alloy.service

Commands:
sudo systemctl daemon-reload
sudo systemctl enable alloy
sudo systemctl start alloy

--------------------------------------------------
7. Alloy Config Issues Fixed
--------------------------------------------------
Problem:
- missing ',' in field list

Cause:
- Missing commas in HCL syntax

Reminder:
Every field in objects needs commas.

Example:
host = "Old-Docker",
env  = "homelab",

--------------------------------------------------
8. Log Dashboard Ideas
--------------------------------------------------
Panels:
- Live Logs
- Error Logs
- Log Volume
- Error Rate
- Container Logs

Variables:
- host
- job

Useful queries:

{host="$host"}

{host="$host"} |= "error"

count_over_time({host="$host"}[1m])

count_over_time({host="$host"} |= "error"[1m])

--------------------------------------------------
Final Stack
--------------------------------------------------
- Grafana
- Prometheus
- Node Exporter
- cAdvisor
- Loki
- Alloy
- Proxmox Exporter
"""

filename = "docker_monitoring_notes.txt"

with open(filename, "w", encoding="utf-8") as f:
    f.write(notes)

print(f"File created successfully: {os.path.abspath(filename)}")