---
layout: default
title: Docs
permalink: /docs/
---

# 📄 Documentation

{% for docs in site.docs %}
  <div class="card">
    <h2>{{ docs.title }}</h2>
    <p>{{ docs.excerpt }}</p>
    <a href="{{ docs.url }}">{{ docs.title }}</a>
  </div>
{% endfor %}
