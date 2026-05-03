---
layout: default
title: Runbooks
permalink: /docs/
description: "Setup guides, troubleshooting notes and runbooks from Freaky's homelab."
---

<div class="page-header">
  <p class="mono" style="color: var(--green); font-size: 0.8rem; margin-bottom: 0.5rem;">$ find ~/runbooks/ -name "*.md" | sort</p>
  <h1>📖 Runbooks</h1>
  <p>Setup guides, troubleshooting docs and reference notes. Future me will be thankful.</p>
</div>

{% if site.docs.size > 0 %}
<ul class="doc-list">
  {% for doc in site.docs %}
  <li>
    <a href="{{ doc.url | relative_url }}">{{ doc.title }}</a>
    {% if doc.tags %}
      {% for tag in doc.tags %}
      <span class="badge badge-gray" style="margin-left: auto;">{{ tag }}</span>
      {% endfor %}
    {% endif %}
  </li>
  {% endfor %}
</ul>
{% else %}

<!-- Categories placeholder -->
<div class="section-header" style="margin-bottom: 1rem;">
  <h2 class="mono">// setup guides</h2>
  <div class="section-line"></div>
</div>
<ul class="doc-list">
  <li style="opacity: 0.5; font-style: italic; font-family: var(--font-mono); font-size: 0.82rem;">// coming soon — docker-compose-cheatsheet.md</li>
  <li style="opacity: 0.5; font-style: italic; font-family: var(--font-mono); font-size: 0.82rem;">// coming soon — proxmox-vm-template.md</li>
  <li style="opacity: 0.5; font-style: italic; font-family: var(--font-mono); font-size: 0.82rem;">// coming soon — nginx-proxy-manager-ssl.md</li>
</ul>

<div class="section-header" style="margin: 2rem 0 1rem;">
  <h2 class="mono">// troubleshooting</h2>
  <div class="section-line"></div>
</div>
<ul class="doc-list">
  <li style="opacity: 0.5; font-style: italic; font-family: var(--font-mono); font-size: 0.82rem;">// coming soon — cloudflare-tunnel-debugging.md</li>
  <li style="opacity: 0.5; font-style: italic; font-family: var(--font-mono); font-size: 0.82rem;">// coming soon — home-assistant-errors.md</li>
</ul>

<div class="card" style="margin-top: 2rem; text-align: center; padding: 2rem;">
  <p class="card-desc">Docs are being migrated from the <code>_docs</code> folder. Hang tight!</p>
</div>
{% endif %}
