---
layout: default
title: Lab Notes
permalink: /blog/
description: "Setup guides, knowledge base entries, and war stories from Freaky's homelab."
---

<div class="page-header">
  <p class="mono" style="color: var(--green); font-size: 0.8rem; margin-bottom: 0.5rem;">$ ls -lt ~/lab-notes/</p>
  <h1>📓 Lab Notes</h1>
  <p>Setup guides, knowledge base articles, and war stories from the homelab trenches.</p>
</div>

{% if site.posts.size > 0 %}
<ul class="post-list">
  {% for post in site.posts %}
  <li class="post-item">
    <div>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 140 }}</p>
        {% for tag in post.tags %}
        <span class="badge badge-gray">{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
    </div>
    <div class="post-date">{{ post.date | date: "%b %d, %Y" }}</div>
  </li>
  {% endfor %}
</ul>
{% else %}
<div class="card" style="text-align: center; padding: 3rem; margin-top: 1rem;">
  <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-3); margin-bottom: 1rem;">
    $ ls lab-notes/<br>
    <span style="color: var(--red);">ls: cannot access 'lab-notes/': No entries yet</span>
  </div>
  <p class="card-desc">First post is brewing. Check back soon!</p>
</div>
{% endif %}
