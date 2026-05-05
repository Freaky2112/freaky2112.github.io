---
layout: default
title: "How to Create a GitHub Webpage"
permalink: /docs/github-webpage/
description: "Step-by-step guide to set up GitHub Pages with Jekyll — from zero to a working site."
---

<div class="page-header">
  <p class="mono" style="color: var(--purple-2); font-size: 0.8rem; margin-bottom: 0.5rem;">📖 runbooks · github pages</p>
  <h1>How to Create a GitHub Webpage</h1>
  <p>GitHub Pages lets you host a static site for free. Here's how to go from zero to a live site.</p>
</div>

---

## Option 1 — Quick setup (no coding needed)

**1. Create a repository** named exactly:

```
yourusername.github.io
```

**2. Add an index file** — create `index.html` and commit:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Hello 👋</h1>
  <p>This is my GitHub Pages site!</p>
</body>
</html>
```

**3. Enable GitHub Pages** — go to **Settings → Pages**, set Source to `Branch: main` / Folder: `/ (root)`, then Save.

**4. Visit your site** — after 30–120 seconds it will be live at:

```
https://yourusername.github.io
```

---

## Option 2 — Markdown with Jekyll (easier for docs/blogs)

Create `index.md` instead of `index.html`:

```markdown
### My Website

Welcome to my GitHub page!

- 🚀 Projects
- 📄 Notes
- 🧠 Ideas
```

GitHub automatically converts Markdown into a styled HTML page via Jekyll.

> **Tip:** In **Settings → Pages → Theme** you can pick a ready-made design without writing any CSS.

---

## Full Jekyll setup

### File structure

```
yourusername.github.io/
├── _config.yml
├── index.md
├── about.md
├── blog.md
├── projects.md
├── docs.md
├── _layouts/
│   ├── default.html
│   └── post.html
├── _includes/
│   └── nav.html
├── _posts/
│   └── 2025-01-15-my-first-post.md
└── assets/
    └── style.css
```

---

### 1. `_config.yml`

```yaml
title: "My Homelab"
description: "Docker, Monitoring, and Projects"
markdown: kramdown
excerpt_separator: "<!--more-->"
```

---

### 2. `_layouts/default.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ page.title }} - {{ site.title }}</title>
  <link rel="stylesheet" href="/assets/style.css">
</head>
<body>

  {% include nav.html %}

  <main class="container">
    {{ content }}
  </main>

</body>
</html>
```

---

### 3. `_includes/nav.html`

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

### 4. `assets/style.css`

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0d1117;
  color: #c9d1d9;
}

.nav {
  background: #161b22;
  padding: 10px 0;
  border-bottom: 1px solid #30363d;
}

.nav-container {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav a {
  text-decoration: none;
  color: #c9d1d9;
  transition: 0.2s;
}

.nav a:hover { color: #58a6ff; }

.logo {
  font-size: 1.6rem;
  font-weight: 800;
  color: #0ae440;
}

.container {
  width: 90%;
  margin: 40px auto;
}

h1 { color: #58a6ff; }

.card {
  background: #161b22;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  border: 1px solid #30363d;
}

.card a { color: #58a6ff; text-decoration: none; }
.card a:hover { text-decoration: underline; }

.post-date {
  color: #8b949e;
  font-size: 0.9em;
}
```

---

### 5. `index.md`

```markdown
---
layout: default
title: Home
---

# 👋 Welcome to My Homelab

I run a self-hosted environment focused on automation, monitoring, and privacy.

<div class="card">
  <h2>🚀 Projects</h2>
  <ul>
    <li>Docker stack (Grafana, Loki, Uptime Kuma)</li>
    <li>Home Assistant automations</li>
  </ul>
</div>

<div class="card">
  <h2>📄 Documentation</h2>
  <ul>
    <li>Setup guides</li>
    <li>Troubleshooting notes</li>
  </ul>
</div>
```

---

### 6. `projects.md`

```markdown
---
layout: default
title: Projects
permalink: /projects/
---

# 🚀 Projects

<div class="card">
  <h2>🐳 Docker Stack</h2>
  <ul>
    <li>Grafana + Loki (monitoring)</li>
    <li>Uptime Kuma (status page)</li>
    <li>Nginx Proxy Manager</li>
  </ul>
</div>

<div class="card">
  <h2>🏠 Home Automation</h2>
  <ul>
    <li>Door sensors and alerts</li>
    <li>Energy monitoring</li>
    <li>Custom automations</li>
  </ul>
</div>
```

---

### 7. `docs.md`

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
    <li>Commands and cheatsheets</li>
    <li>Troubleshooting logs</li>
  </ul>
</div>
```

---

### 8. `about.md`

```markdown
---
layout: default
title: About
permalink: /about/
---

# 👋 About Me

I'm running a homelab focused on:

- 🐳 Docker and self-hosting
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

### 9. `blog.md`

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
  <p class="post-date">{{ post.date | date: "%B %d, %Y" }}</p>
  <p>{{ post.excerpt }}</p>
</div>
{% endfor %}
```

---

### 10. `_layouts/post.html`

```html
---
layout: default
---

<h1>{{ page.title }}</h1>
<p class="post-date">{{ page.date | date: "%B %d, %Y" }}</p>

{{ content }}
```

---

### 11. A post — `_posts/2025-01-15-my-first-post.md`

```markdown
---
layout: post
title: "My First Post"
---

# My First Post

Your content here in Markdown format.

<!--more-->

The text above the `more` tag shows as the excerpt on the blog listing page.
```

---

## Enable GitHub Pages

Go to **Settings → Pages** → Source: `main` branch → Save.

Your site will be live at `https://yourusername.github.io` within a couple of minutes.
