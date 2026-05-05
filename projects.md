---
layout: default
title: The Stack
permalink: /projects/
description: "Freaky's self-hosted stack — Docker services, Home Assistant, and homelab projects."
---

<div class="page-header">
  <p class="mono" style="color: var(--green); font-size: 0.8rem; margin-bottom: 0.5rem;">$ docker ps --format "table {{.Names}}\t{{.Status}}"</p>
  <h1>🛠 The Stack</h1>
  <p>Everything running in the lab — Docker containers, automations, and ongoing builds.</p>
</div>

<!-- Services grid -->
<section style="margin-bottom: 3rem;">
  <div class="section-header">
    <h2 class="mono">// docker services</h2>
    <div class="section-line"></div>
    <span class="section-count">12 containers</span>
  </div>

  <div class="card-grid">

    <div class="card">
      <div class="card-title">
        <span class="status-dot up"></span>
        Uptime Kuma
      </div>
      <p class="card-desc">Self-hosted monitoring & status page. Keeps an eye on all services.</p>
      <div class="card-tags">
        <span class="badge badge-green">monitoring</span>
        <span class="badge badge-blue">docker</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span class="status-dot up"></span>
        nginx Proxy Manager
      </div>
      <p class="card-desc">Reverse proxy with SSL automation. Routes all external traffic cleanly.</p>
      <div class="card-tags">
        <span class="badge badge-amber">networking</span>
        <span class="badge badge-blue">docker</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span class="status-dot up"></span>
        Home Assistant
      </div>
      <p class="card-desc">Home automation hub. Lights, sensors, automations — the smart home brain.</p>
      <div class="card-tags">
        <span class="badge badge-amber">automation</span>
        <span class="badge badge-blue">docker</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span class="status-dot up"></span>
        Homer
      </div>
      <p class="card-desc">Custom homelab dashboard. All services in one clean start page.</p>
      <div class="card-tags">
        <span class="badge badge-purple">dashboard</span>
        <span class="badge badge-blue">docker</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span class="status-dot up"></span>
        Cloudflare Tunnel
      </div>
      <p class="card-desc">Secure external access without opening ports. Zero-trust networking.</p>
      <div class="card-tags">
        <span class="badge badge-teal">cloudflare</span>
        <span class="badge badge-amber">networking</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span class="status-dot up"></span>
        Portainer
      </div>
      <p class="card-desc">Docker management UI. Makes container wrangling less painful.</p>
      <div class="card-tags">
        <span class="badge badge-blue">docker</span>
        <span class="badge badge-gray">management</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span class="status-dot up"></span>
        Jellyfin
      </div>
      <p class="card-desc">Self-hosted media server. Movies, shows, music — no subscriptions needed.</p>
      <div class="card-tags">
        <span class="badge badge-red">media</span>
        <span class="badge badge-blue">docker</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        <span class="status-dot up"></span>
        This site
      </div>
      <p class="card-desc">Jekyll static site served via GitHub Pages. You're looking at it right now.</p>
      <div class="card-tags">
        <span class="badge badge-green">jekyll</span>
        <span class="badge badge-gray">github pages</span>
      </div>
    </div>

  </div>
</section>

<!-- Custom builds section -->
<section style="margin-bottom: 2.5rem;">
  <div class="section-header">
    <h2 class="mono">// custom builds</h2>
    <div class="section-line"></div>
  </div>
  <div class="card-grid">

{% for projects in site.projects %}
    <div class="card card-link">
      <a href="{{projects.url}}">{{projects.title}}</a> 
      <div class="card-tags">
        <span class="badge badge-gray">github</span>
        <span class="badge badge-blue">open source</span>
      </div>
      <div style="margin-top: 0.75rem; font-family: var(--font-mono); font-size: 0.78rem; color: var(--blue-2);">view →</div>
    </div>

  </div>
</section>

<!-- Home Assistant -->
<section>
  <div class="section-header">
    <h2 class="mono">// home assistant automations</h2>
    <div class="section-line"></div>
  </div>
  <div class="card-grid">
    <div class="card">
      <div class="card-title">🌅 Wake-up routine</div>
      <p class="card-desc">Lights gradually brighten, coffee maker starts, phone charger turns off — all timed.</p>
      <div class="card-tags"><span class="badge badge-amber">automation</span></div>
    </div>
    <div class="card">
      <div class="card-title">🔔 Service alerts</div>
      <p class="card-desc">Uptime Kuma triggers HA notification if any self-hosted service goes down.</p>
      <div class="card-tags"><span class="badge badge-amber">automation</span><span class="badge badge-purple">monitoring</span></div>
    </div>
    <div class="card">
      <div class="card-title">🌡 Climate control</div>
      <p class="card-desc">Smart thermostat automations based on presence detection and time of day.</p>
      <div class="card-tags"><span class="badge badge-amber">automation</span></div>
    </div>
  </div>
</section>