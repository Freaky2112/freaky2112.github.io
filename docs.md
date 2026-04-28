---
layout: default
title: Docs
permalink: /docs/
---

# 📄 Documentation

{% for docs in site.docs %}
  <div class="card">
    <h2><a href="{{ docs.url }}">{{ docs.title }}</a>{{ docs.title }}</h2>
    <p>{{ docs.excerpt }}</p>
    <p>{{ docs.excerpt | strip_html | truncate: 120 }}</p>
  </div>
{% endfor %}
