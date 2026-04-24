---
layout: default
title: Blog
permalink: /blog/
---

# 📝 Blog

{% for post in site.posts %}
  <div class="card">
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <p>{{ post.date | date: "%B %d, %Y" }}</p>
    <p>{{ post.excerpt }}</p>
  </div>
{% endfor %}