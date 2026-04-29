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






## Edge Router
🔀 Go to the [Edge Router](https://github.com/Freaky2112/Edge_Router-) page

## Ansible
Ⓐ Go to the [Ansible](https://github.com/Freaky2112/ansible_server) page