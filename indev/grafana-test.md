# Grafana

--- 

Prometheus (collect metrics)
Grafana (dashboards)
Node Exporter (Linux system metrics like CPU, RAM, disk)
Loki (collect logs)
Alloy (gather data—gathering)
Promtail (legacy data-gathering)

## Create Docker

Create a folder:
```bash
mkdir grafana
cd grafana
mkdir prometheus
```

Inside monitoring/docker-compose.yml:

```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

  grafana:
    image: grafana/grafana-oss:latest
    container_name: grafana
    restart: unless-stopped
    ports:
      - "3300:3000"
    volumes:
      - grafana_data:/var/lib/grafana

  node_exporter:
    image: prom/node-exporter:latest
    container_name: node_exporter
    restart: unless-stopped
    ports:
      - "9100:9100"

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    restart: unless-stopped
    ports:
      - "8080:8080"
    privileged: true
    devices:
      - /dev/kmsg:/dev/kmsg
    command:
      - '--docker_only=true'
      - '--store_container_labels=false'
      - '--housekeeping_interval=30s'
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /home/freaky/Dockers:/var/lib/docker:ro
      - /dev/disk:/dev/disk:ro

  loki:
    image: grafana/loki:latest
    container_name: loki
    restart: unless-stopped
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml

#  promtail:
#    image: grafana/promtail:latest
#    container_name: promtail
#    restart: unless-stopped
#    volumes:
#      - /var/log:/var/log:ro
#      - /var/lib/docker/containers:/var/lib/docker/containers:ro
#      - ./promtail:/etc/promtail
#      - /var/run/docker.sock:/var/run/docker.sock
#    command: -config.file=/etc/promtail/config.yml

  alloy:
    image: grafana/alloy:latest
    container_name: alloy
    restart: unless-stopped
    ports:
      - "12345:12345"
    volumes:
      - ./alloy/config.alloy:/etc/alloy/config.alloy
      - /var/run/docker.sock:/var/run/docker.sock
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/log:/var/log:ro

volumes:
  prometheus_data:
  grafana_data:
```

---

config.yml
```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: system
    static_configs:
      - targets:
          - localhost
        labels:
          job: varlogs
          __path__: /var/log/*log

  - job_name: docker
    static_configs:
      - targets:
          - localhost
        labels:
          job: docker
          __path__: /var/lib/docker/containers/*/*-json.log

```

---

## Prometheus

Then create monitoring/prometheus/prometheus.yml

```yaml
prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['prometheus:9090']

  - job_name: 'node_exporter'
    static_configs:
      - targets: ['node_exporter:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  - job_name: 'linux-servers'
    static_configs:
      - targets:
          - 'hostname or ip address:9100'
          - 'hostname or ip address:9100'
          - 'hostname or ip address:9100'
          - 'hostname or ip address:9100'
          - 'hostname or ip address:9100'

  - job_name: 'Single-server-name'
    static_configs:
      - targets:
          - 'hostname or ip address:9100'
```

---
## Add Loki + Alloy

Put this in alloy/config.alloy:
```yaml
config.alloy
discovery.docker "containers" {
  host = "unix:///var/run/docker.sock"
}

loki.source.docker "default" {
  host       = "unix:///var/run/docker.sock"
  targets    = discovery.docker.containers.targets
  forward_to = [loki.write.default.receiver]
}

loki.write "default" {
  endpoint {
    url = "http://loki:3100/loki/api/v1/push"
  }
}
```

---


Start it:
```bash
docker compose up -d
```

Then access:

Grafana: http://YOUR-IP:3000
Prometheus: http://YOUR-IP:9090

Default Grafana login:

admin
admin

After login:

Add Prometheus datasource

In Grafana:

Connections → Data Sources
Add Prometheus
URL:
http://prometheus:9090
Import a dashboard

A popular Linux dashboard:

Dashboard ID: 1860 (Node Exporter Full)

Import it in Grafana:

Dashboards → Import
Enter 1860

You’ll immediately get:

CPU usage
RAM
disk usage
network traffic
load average
temperatures (if available)

---

## To monitor other linux machine

If that server also has Docker, easiest is:
```yaml
docker run -d \
  --name=node_exporter \
  --restart unless-stopped \
  -p 9100:9100 \
  prom/node-exporter
```

Or if you prefer native install:
```bash
sudo apt install prometheus-node-exporter
sudo systemctl enable --now prometheus-node-exporter
```

## To monitor Docker

Import Grafana dashboard:

Dashboard ID: 14282 (cAdvisor exporter)

or

Dashboard ID: 193 (Docker monitoring)

---

## Here’s how to install Alloy natively on Debian/Ubuntu/Proxmox-like systems.

Download Alloy

On each server:
```bash
mkdir -p /etc/alloy
cd /tmp

wget https://github.com/grafana/alloy/releases/latest/download/alloy-linux-amd64.zip
unzip alloy-linux-amd64.zip
sudo mv alloy-linux-amd64 /usr/local/bin/alloy
sudo chmod +x /usr/local/bin/alloy
```
Check:

alloy --version
1. Create config

Create:
```bash
sudo nano /etc/alloy/config.alloy
```
Paste:
```yaml
local.file_match "system_logs" {
  path_targets = [
    {
      __path__ = "/var/log/*.log",
      job = "system"
    },
    {
      __path__ = "/var/log/syslog",
      job = "syslog"
    },
    {
      __path__ = "/var/log/auth.log",
      job = "auth"
    }
  ]
}

loki.source.file "logs" {
  targets    = local.file_match.system_logs.targets
  forward_to = [loki.write.main.receiver]
}

loki.write "main" {
  endpoint {
    url = "http://MONITORING-IP:3100/loki/api/v1/push"
  }

  external_labels = {
    host = "server-name"
    env  = "homelab"
  }
}
```

Replace:

MONITORING-IP → your monitoring VM IP
server-name → unique hostname like proxmox1, docker-vm, server2

Example:

host = "docker-vm"
1. Create systemd service

Create:
```bash
sudo nano /etc/systemd/system/alloy.service
```
Paste:
```yaml
[Unit]
Description=Grafana Alloy
After=network.target

[Service]
ExecStart=/usr/local/bin/alloy run /etc/alloy/config.alloy
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
4. Enable and start
sudo systemctl daemon-reload
sudo systemctl enable alloy
sudo systemctl start alloy
```
Check:
```bash
sudo systemctl status alloy
```
Logs:
```bash
journalctl -u alloy -f
```