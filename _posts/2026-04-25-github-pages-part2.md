---
layout: post
title: "GitHub Webpage 2/2"
---

# How to Create a GitHub Webpage — Part 2: Pages, Blog & Reading Time

Creating a GitHub webpage uses **GitHub Pages**, which lets you host a static site for free.

---

## 📄 Create File for Projects — `/projects.md`

```markdown
---
layout: default
title: Projects
permalink: /projects/
---

# 🚀 Projects

<div class="card">
<h2>🐳 Docker Stack</h2>
<p>My self-hosted services running in Docker:</p>
<ul>
  <li>Grafana + Loki (monitoring)</li>
  <li>Uptime Kuma (status page)</li>
  <li>Nginx Proxy Manager</li>
</ul>
</div>

<div class="card">
<h2>🏠 Home Automation</h2>
<p>Built with Home Assistant:</p>
<ul>
  <li>Door sensors & alerts</li>
  <li>Energy monitoring</li>
  <li>Custom automations</li>
</ul>
</div>
```

---

## 📄 Create File for Docs — `/docs.md`

```markdown
---
layout: default
title: Docs
permalink: /docs/
---

# 📄 Documentation

<div class="card">
<h2>🛠 Setup Guides</h2>
<ul>
  <li>Install Docker stack</li>
  <li>Setup Grafana dashboards</li>
  <li>Configure reverse proxy</li>
</ul>
</div>

<div class="card">
<h2>🧠 Notes</h2>
<ul>
  <li>Commands & cheatsheets</li>
  <li>Troubleshooting logs</li>
</ul>
</div>
```

---

## 📄 Create File for About — `/about.md`

```markdown
---
layout: default
title: About
permalink: /about/
---

# 👋 About Me

I'm running a homelab focused on:

- 🐳 Docker & self-hosting  
- 📊 Monitoring (Grafana, Loki)  
- 🏠 Home automation  

<div class="card">
<h2>🎯 Goals</h2>
<ul>
  <li>Learn and experiment</li>
  <li>Document everything</li>
  <li>Build reliable systems</li>
</ul>
</div>
```

---

## 📝 Create File for Blog — `/blog.md`

```markdown
---
layout: default
title: Blog 
permalink: /blog/
---

# 📝 Blog / Knowledge Base

{% for post in site.posts %}
  <div class="card">
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <p>{{ post.date | date: "%B %d, %Y" }}</p>
    <p>{{ post.excerpt }}</p>
  </div>
{% endfor %}
```

---

## 🗂 Creating Blog Posts — `/_posts/`

Name your files in this format: `yyyy-mm-dd-description.md`

Each file should look like this:

```markdown
---
layout: post
title: "Your Title"
---

# Header of your post

Your text here in Markdown format.
```

---

## 🧭 Update Navigation — `/_includes/nav.html`

Add the Blog link:

```html
<nav class="nav">
  <div class="nav-container">
    <span class="logo">⚡ MyLab</span>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li><a href="/projects/">Projects</a></li>
      <li><a href="/docs/">Docs</a></li>
      <li><a href="/about/">About</a></li>
    </ul>
  </div>
</nav>
```

---

## ⏱ Adding Reading Time

### Option A — Add to Default Layout

In `/_layouts/default.html`, add this snippet where you want it to appear:

```html
{% if page.layout == "post" %}
  <p class="reading-time">
    ⏱ 
    {% assign words = content | number_of_words %}
    {% assign minutes = words | divided_by: 200 | plus: 1 %}
    {{ minutes }} min read
  </p>
{% endif %}


```
### Option B — Add to Posts Only (Recommended)

Create `/_layouts/post.html`:

```html
---
layout: default
---

<h1>{{ page.title }}</h1>
<p class="post-date">{{ page.date | date: "%B %d, %Y" }}</p>

<p class="reading-time">
  ⏱ 
  {% assign words = content | number_of_words %}
  {% assign minutes = words | divided_by: 200 | plus: 1 %}
  {{ minutes }} min read
</p>

 {_{ content }_}  remove the _
```

Then update your post front matter from:

```markdown
layout: default
```

to:

```markdown
layout: post
```


---
*Questions / idea? Open an issue on [GitHub](https://github.com/Freaky2112/freaky2112.github.io).*