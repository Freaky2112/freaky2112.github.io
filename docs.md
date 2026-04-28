---
layout: default
title: Docs
permalink: /docs/
---

# 📄 Documentation

{% for docs in site.docs %}
  <h2>{{ docs.title }}</h2>
  <p>{{ docs.excerpt }}</p>
  <a href="{{ docs.url }}">{{ post.title }}</a>
{% endfor %}
