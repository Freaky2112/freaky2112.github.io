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

## Add Proxmox Exporter

Create an API user on Proxmox host:

In Proxmox web UI:

Datacenter → Permissions → Users → Add

Create:

monitor@pve

Then:

Datacenter → Permissions → API Tokens

Create token:

grafana

Important: save the token secret.

Grant permissions:

Datacenter → Permissions → Add
User: monitor@pve
Role: PVEAuditor
Path: /

Add exporter to docker-compose.yml:
```yaml
  proxmox-exporter:
    image: prompve/prometheus-pve-exporter
    container_name: proxmox-exporter
    restart: unless-stopped
    ports:
      - "9221:9221"
    environment:
      PVE_USER: monitor@pve
      PVE_PASSWORD: yourpassword
      PVE_VERIFY_SSL: false
      PVE_HOST: 192.168.1.10
```

A better option than password is API token auth, but password is simpler to get started. (Passwords in compose files are basically leaving your house key under the doormat—fine for a lab, not ideal.)

Add to prometheus.yml:
```yaml
  - job_name: 'proxmox'
    static_configs:
      - targets: ['proxmox-exporter:9221']
```

Restart:

docker compose up -d
Grafana dashboards for Proxmox

Import one of these:

Dashboard ID 10347 – Proxmox VE
Dashboard ID 10048 – Proxmox cluster monitoring

You’ll get:

node CPU/RAM
VM status
LXC status
disk usage
network throughput
storage pools


## Add Loki + Alloy

Update your docker-compose.yml with these services:
```yaml
  loki:
    image: grafana/loki:latest
    container_name: loki
    restart: unless-stopped
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml

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
```
Create folders:
```bash
mkdir alloy
nano alloy/config.alloy
```

Put this in alloy/config.alloy:
```yaml
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

Start:

docker compose up -d
Add Loki datasource in Grafana

In Grafana:

Connections → Data Sources
Add data source
Select Loki

URL:

http://loki:3100

Save & Test.

Test logs

Go to:

Explore
Select Loki datasource

Query:

{container_name=~".+"}

or narrower:

{container_name="grafana"}

You should immediately see container logs.

Why this is useful

Now when a container dies or errors:

metrics show something broke
logs show why it broke

For example:

CPU spike → check logs
container restarting → check logs
app errors → logs in one place
Nice next upgrades

Once Loki works, you can add:

host logs (/var/log/syslog, auth logs)
Proxmox syslog
alerting from log patterns (failed login attempts, OOM kills, etc.)

Example alert:

“container restarted 5 times in 10 min”

That’s where the stack gets seriously useful.

One thing before you deploy: are you mainly interested in Docker container logs only, or do you also want Linux system logs + Proxmox logs in Loki?


Perfect — then you want a centralized logging setup:

one main server runs:
Grafana
Loki
every other server runs:
Grafana Alloy

So Alloy collects logs locally and pushes them to your main Loki server.

Architecture:

Server 1 (monitoring VM)
├── Grafana
├── Prometheus
├── Loki
└── Alloy (optional local logs)

Server 2
└── Alloy → Loki

Server 3
└── Alloy → Loki

Proxmox host
└── Alloy or syslog forwarding → Loki
On your main monitoring VM

Keep Loki in your compose.

Make sure Loki port is reachable:

loki:
  ports:
    - "3100:3100"

Test from another server:

curl http://MONITORING-IP:3100/ready

Expected:

ready
On every other server: install Alloy

Create docker-compose.yml:
```yaml
services:
  alloy:
    image: grafana/alloy:latest
    container_name: alloy
    restart: unless-stopped
    volumes:
      - ./config.alloy:/etc/alloy/config.alloy
      - /var/run/docker.sock:/var/run/docker.sock
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/log:/var/log:ro
```
Create config.alloy:
```yaml
discovery.docker "containers" {
  host = "unix:///var/run/docker.sock"
}

loki.source.docker "docker_logs" {
  host       = "unix:///var/run/docker.sock"
  targets    = discovery.docker.containers.targets
  forward_to = [loki.write.main.receiver]
}

local.file_match "system_logs" {
  path_targets = [
    {
      __path__ = "/var/log/*.log",
      job = "system"
    }
  ]
}

loki.source.file "syslogs" {
  targets    = local.file_match.system_logs.targets
  forward_to = [loki.write.main.receiver]
}

loki.write "main" {
  endpoint {
    url = "http://MONITORING-IP:3100/loki/api/v1/push"
  }
}
```

Replace:

MONITORING-IP

with your monitoring VM IP.

Start:

docker compose up -d
Add labels (strongly recommended)

Without labels, logs become spaghetti.

Better config:
```yaml
loki.write "main" {
  endpoint {
    url = "http://MONITORING-IP:3100/loki/api/v1/push"
  }

  external_labels = {
    host = "server2"
    env  = "homelab"
  }
}
```
Then logs can be filtered by host:

{host="server2"}

or

{job="system"}
In Grafana Explore

Examples:

All logs:

{host=~".+"}

Specific host:

{host="server2"}

Specific container:

{container_name="jellyfin"}

Errors only:

{host="server2"} |= "error"
For Proxmox host

Since Proxmox is Debian-based, you can run Alloy there too (native binary or Docker if you want, though native is usually cleaner on the host).

Then collect:

/var/log/syslog
/var/log/auth.log
/var/log/pveproxy/*.log

This gives:

login attempts
VM task logs
cluster logs
service failures


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

host = "proxmox1"
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
2. Verify on Loki

From server:

curl http://MONITORING-IP:3100/ready

Should return:

ready

Then in Grafana Explore:

Query:

{host="server-name"}

You should see logs.

Proxmox-specific extra logs

On your Proxmox host, add these too:

{
  __path__ = "/var/log/pveproxy/*.log",
  job = "pveproxy"
},
{
  __path__ = "/var/log/pvedaemon.log",
  job = "pvedaemon"
}

Useful for:

API/UI errors
auth issues
task failures
VM operations

After this, each server just needs:

binary
config
service

Much simpler than Docker agents.

One note: your earlier Promtail issue suggests you may already have wget/unzip quirks on some systems. If wget gives you trouble again, tell me what distro/version you’re installing Alloy on and I’ll adapt the install.






---

alerts to Discord when a host goes down
SSL expiry alerts
disk space alerts (<10%)
