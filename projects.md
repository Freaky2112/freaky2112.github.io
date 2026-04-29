---
layout: default
title: Project
permalink: /projects/
---

# Projects

{% for projects in site.projects %}
  <div class="card">
    <h2><a href="{{projects.url}}">{{projects.title}}</a></h2>
    <p>{{ projects.excerpt | strip_html | truncate: 120 }}</p>
  </div>
{% endfor %}
