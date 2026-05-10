# Grafana

--- 

Prometheus (collect metrics)
Grafana (dashboards)
Node Exporter (Linux system metrics like CPU, RAM, disk)

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
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana

  node_exporter:
    image: prom/node-exporter:latest
    container_name: node_exporter
    restart: unless-stopped
    ports:
      - "9100:9100"

volumes:
  prometheus_data:
  grafana_data:
```

Then create monitoring/prometheus/prometheus.yml
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
```

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

Then test from your browser:

http://OTHER-SERVER-IP:9100/metrics

You should see a wall of text that looks like machine metrics. Ugly, but beautiful in its own way.

Update Prometheus config

On your monitoring VM, edit:

nano prometheus/prometheus.yml

Change it to:
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['prometheus:9090']

  - job_name: 'monitoring-vm'
    static_configs:
      - targets: ['node_exporter:9100']

  - job_name: 'server2'
    static_configs:
      - targets: ['192.168.1.50:9100']
```
Replace 192.168.1.50 with your actual server IP.

If adding multiple servers:
```yaml
  - job_name: 'linux-servers'
    static_configs:
      - targets:
          - '192.168.1.50:9100'
          - '192.168.1.51:9100'
          - '192.168.1.52:9100'
```

Then reload Prometheus:

docker compose restart prometheus

(or lighter reload)

docker restart prometheus
Verify

Go to Prometheus:

http://YOUR-MONITORING-IP:9090/targets

You should see all targets as UP.

Once they’re UP, your Grafana Node Exporter dashboard will let you switch between hosts from a dropdown automatically.


## Add cAdvisor (Docker container monitoring)

This gives metrics for:

container CPU
memory
network
disk I/O
container uptime

Update your docker-compose.yml:
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
      - "3000:3000"
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

volumes:
  prometheus_data:
  grafana_data:
```

Then update prometheus.yml:
```yaml
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
```
Restart:

docker compose up -d

Import Grafana dashboard:

Dashboard ID: 14282 (cAdvisor exporter)

or

Dashboard ID: 193 (Docker monitoring)
2. Add Proxmox Exporter

