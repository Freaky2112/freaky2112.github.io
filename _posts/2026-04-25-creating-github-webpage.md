---
layout: post
title: "GitHub Webpage"
---

# How to create github webpage

---
Creating a GitHub webpage is basically using GitHub Pages, which lets you host a static site for free. I’ll walk you through the simplest way first, then a slightly more advanced option.
---

## Option 1 — Quick setup (no coding needed)
1. Create a repository
Go to GitHub
Click New repository

Name it exactly:

yourusername.github.io

(replace yourusername with your GitHub username)

2. Add an index file

Create a file called:

index.html

Paste something simple:
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
Commit the file.

3. Enable GitHub Pages
Go to Settings → Pages
Under Source, select:
Branch: main
Folder: / (root)
Save
4. Access your site

After ~30 seconds to 2 minutes, your site will be live at:

https://yourusername.github.io

---

## Option 2 — Use Markdown (easier for docs/blogs)

Instead of HTML, you can use Markdown with Jekyll (built-in).

Create:

index.md

Example:

### My Website

Welcome to my GitHub page!

- 🚀 Projects
- 📄 Notes
- 🧠 Ideas

GitHub automatically converts it into a styled site.

🎨 Optional: Choose a theme

In Settings → Pages → Theme, you can pick a ready-made design without coding.

🔧 Pro tips
Use folders like /projects to organize pages
Add a README.md for repo info
Use a custom domain later if you want (like mydomain.com)
If you want next step


🚀 Easiest way (no cloning templates manually)
1. Create your repo

Same as before:

yourusername.github.io
2. Add a config file

Create:

_config.yml

Paste ONE of these:

Option A (simple clean)
theme: minima
Option B (nicer look)
theme: jekyll-theme-cayman
3. Create homepage
index.md

Example:
```Markdown
# 👋 Welcome

I'm running a homelab with Docker.

## 🔧 Projects
- Monitoring stack (Grafana + Loki)
- Home Assistant automations

## 📄 Docs
- Setup guides
- Notes
```
4. Enable Pages
Settings → Pages
Source: main branch

Done.

### 📁 File structure

Create these files in your repo:

/_config.yml
/index.md
/_layouts/default.html
/_includes/nav.html
/assets/style.css
_config.yml
_posts

### ⚙️ 1. config file

_config.yml
```yaml
title: "My Homelab"
description: "Docker, Monitoring, and Projects"
markdown: kramdown

collections:
  posts:
    output: true
```

### 🧱 2. Layout (main template)

_layouts/default.html
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
...
```

### 🧭 3. Navigation bar

_includes/nav.html
```html
<nav class="nav">
  <div class="nav-container">
    <span class="logo">⚡ MyLab</span>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/projects">Projects</a></li>
      <li><a href="/docs">Docs</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </div>
</nav>
```

### 🎨 4. Dark mode styling

/assets/style.css
```css

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0d1117;
  color: #c9d1d9;
}

/* NAVBAR */
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

.nav a:hover {
  color: #58a6ff;
}

.logo {
  font-size: 1.6rem;
  font-weight: 800;
  color: #0ae440 !important;
  letter-spacing: 0.5px;
}

/* CONTENT */
.container {
  width: 90%;
  margin: 40px auto;
}

h1 {
  color: #58a6ff;
}

.card {
  background: #161b22;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  border: 1px solid #30363d;
}

.card a {
  color: #58a6ff;
  text-decoration: none;
}

.card a:hover {
  text-decoration: underline;
}

.reading-time {
  color: #8b949e;
  font-size: 0.9em;
  margin-bottom: 20px;
}

.post-date {
  color: #8b949e;
  font-size: 0.9em;
}
```

### 🏠 5. Homepage

index.md
```Markdown
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

### 🚀 6. Enable GitHub Pages
Go to Settings → Pages
Source: main branch

## Create file for Projects
/projects.md
```Markdown
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
## Create file for Docs

/docs.md
```Markdown
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
## Create file for About
/about.md
```Markdown
---
layout: default
title: About
permalink: /about/
---

# 👋 About Me

I’m running a homelab focused on:

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
## Create file for blog posts
/blog.md
```Markdown
---
layout: default
title: Blog 
permalink: /blog/
---

# 📝 Blog / Knoweledge Base

{% for post in site.posts %}
  <div class="card">
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <p>{{ post.date | date: "%B %d, %Y" }}</p>
    <p>{{ post.excerpt }}</p>
  </div>
{% endfor %}
```
/_posts

create files in this format yyyy-mm-dd-description.md
and inside file should look like this
```Markdown
---
layout: post
title: "Your Title"
---

# Header of your post

your text here in md format

```

## update Navigation
/_includes/nav.html
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

## Adding reading time

/_layouts/default.html
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
## Add it to Posts only
/_layouts/post.html
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

{{ content }}
```
now change your layout in your post
form layout: default 
to layout: post
