# Grafana

---

## Stack Overview

| Tool | Role |
|------|------|
| Prometheus | Collect metrics |
| Grafana | Dashboards |
| Node Exporter | Linux system metrics (CPU, RAM, disk) |
| Loki | Collect logs |
| Alloy | Gather and ship data (modern) |
| Promtail | Gather and ship data (legacy) |
| cAdvisor | Docker container metrics |

---

## Create Docker Stack

Create the folder structure:

```bash
mkdir grafana
cd grafana
mkdir prometheus alloy
```

### `docker-compose.yml`

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

## Prometheus

Create `prometheus/prometheus.yml`:

```yaml
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
          - 'hostname-or-ip:9100'
          - 'hostname-or-ip:9100'
          - 'hostname-or-ip:9100'

  - job_name: 'single-server-name'
    static_configs:
      - targets:
          - 'hostname-or-ip:9100'
```

---

## Loki + Alloy

Create `alloy/config.alloy`:

```hcl
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

> **Note:** Docker logs are JSON-formatted. If you see raw JSON lines in Loki, add a
> `loki.process` pipeline stage to parse them before forwarding.

---

## Promtail (legacy alternative to Alloy)

Create `promtail/config.yml`:

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

## Start the Stack

```bash
docker compose up -d
```

Access:

- **Grafana:** `http://YOUR-IP:3300`
- **Prometheus:** `http://YOUR-IP:9090`

Default Grafana credentials: `admin` / `admin`

---

## Configure Grafana

### Add Prometheus Datasource

1. Go to **Connections → Data Sources**
2. Click **Add data source** → choose **Prometheus**
3. Set URL to `http://prometheus:9090`
4. Click **Save & Test**

### Add Loki Datasource

1. Go to **Connections → Data Sources**
2. Click **Add data source** → choose **Loki**
3. Set URL to `http://loki:3100`
4. Click **Save & Test**

### Import Dashboards

| Dashboard | ID |
|-----------|----|
| Node Exporter Full (Linux metrics) | `1860` |
| cAdvisor Exporter (Docker containers) | `14282` |
| Docker Monitoring | `193` |

To import: **Dashboards → Import → Enter ID**

You'll immediately get CPU usage, RAM, disk, network traffic, load average, and temperatures (if available).

---

## Monitor Other Linux Machines

### Option 1 — Docker (if Docker is available on the remote machine)

```bash
docker run -d \
  --name=node_exporter \
  --restart unless-stopped \
  -p 9100:9100 \
  prom/node-exporter
```

### Option 2 — Native install (Debian/Ubuntu)

```bash
sudo apt install prometheus-node-exporter
sudo systemctl enable --now prometheus-node-exporter
```

> **Firewall note:** Make sure port `9100` is open on the remote machine so Prometheus
> can scrape it, and port `3100` is open on the monitoring host so remote Alloy agents
> can push logs to Loki.

Then add the machine's IP to `prometheus.yml` under `linux-servers` and reload Prometheus.

---

## Install Alloy Natively (Debian / Ubuntu / Proxmox)

Use this on remote machines to ship logs to your central Loki instance.

### 1. Download Alloy

```bash
mkdir -p /etc/alloy
cd /tmp

wget https://github.com/grafana/alloy/releases/latest/download/alloy-linux-amd64.zip
unzip alloy-linux-amd64.zip
sudo mv alloy-linux-amd64 /usr/local/bin/alloy
sudo chmod +x /usr/local/bin/alloy

alloy --version
```

### 2. Create Config

```bash
sudo nano /etc/alloy/config.alloy
```

```hcl
local.file_match "system_logs" {
  path_targets = [
    {
      __path__ = "/var/log/*.log",
      job      = "system"
    },
    {
      __path__ = "/var/log/syslog",
      job      = "syslog"
    },
    {
      __path__ = "/var/log/auth.log",
      job      = "auth"
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
- `MONITORING-IP` → your monitoring VM's IP address
- `server-name` → a unique hostname (e.g. `proxmox1`, `docker-vm`, `server2`)

### 3. Create systemd Service

```bash
sudo nano /etc/systemd/system/alloy.service
```

```ini
[Unit]
Description=Grafana Alloy
After=network.target

[Service]
ExecStart=/usr/local/bin/alloy run /etc/alloy/config.alloy
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

### 4. Enable and Start

```bash
sudo systemctl daemon-reload
sudo systemctl enable alloy
sudo systemctl start alloy
```

Check status:

```bash
sudo systemctl status alloy
```

Follow logs:

```bash
journalctl -u alloy -f
```
