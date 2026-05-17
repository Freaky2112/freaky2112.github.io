---
layout: post
title: "GitHub Webpage 1/2"
---

# How to Create a GitHub Webpage — Part 1: The Basics

Creating a GitHub webpage uses **GitHub Pages**, which lets you host a static site for free.

---

## Option 1 — Quick Setup (No Coding Needed)

### 1. Create a Repository
- Go to GitHub and click **New repository**
- Name it exactly: `yourusername.github.io` *(replace with your GitHub username)*

### 2. Add an Index File

Create a file called `index.html` and paste:

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

### 3. Enable GitHub Pages
- Go to **Settings → Pages**
- Under **Source**, select: Branch: `main`, Folder: `/ (root)`
- Click **Save**

### 4. Access Your Site

After ~30 seconds to 2 minutes, your site will be live at:

```
https://yourusername.github.io
```

---

## Option 2 — Use Markdown (Easier for Docs/Blogs)

Instead of HTML, use Markdown with Jekyll (built-in).

Create `index.md`:

```markdown
### My Website

Welcome to my GitHub page!

- 🚀 Projects
- 📄 Notes
- 🧠 Ideas
```

GitHub automatically converts it into a styled site.

### 🎨 Optional: Choose a Theme

In **Settings → Pages → Theme**, pick a ready-made design without coding.

---

## 🔧 Pro Tips

- Use folders like `/projects` to organize pages
- Add a `README.md` for repo info
- Use a custom domain later if you want (like `mydomain.com`)

---

## 🚀 Easiest Way — No Template Cloning

### 1. Create your repo: `yourusername.github.io`

### 2. Add a Config File

Create `_config.yml` and choose one:

**Option A (simple clean):**
```yaml
theme: minima
```

**Option B (nicer look):**
```yaml
theme: jekyll-theme-cayman
```

### 3. Create Homepage

`index.md`:

```markdown
# 👋 Welcome

I'm running a homelab with Docker.

## 🔧 Projects
- Monitoring stack (Grafana + Loki)
- Home Assistant automations

## 📄 Docs
- Setup guides
- Notes
```

### 4. Enable Pages
- **Settings → Pages**
- Source: `main` branch

---

## 📁 File Structure

```
/_config.yml
/index.md
/_layouts/default.html
/_includes/nav.html
/assets/style.css
/_posts/
```

---

## ⚙️ 1. Config File — `_config.yml`

```yaml
title: "My Homelab"
description: "Docker, Monitoring, and Projects"
markdown: kramdown

collections:
  posts:
    output: true
```

---

## 🧱 2. Layout (Main Template) — `_layouts/default.html`

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

## 🧭 3. Navigation Bar — `_includes/nav.html`

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

---

## 🎨 4. Dark Mode Styling — `/assets/style.css`

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

---

## 🏠 5. Homepage — `index.md`

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

## 🚀 6. Enable GitHub Pages

- Go to **Settings → Pages**
- Source: `main` branch


---
*Questions / idea? Open an issue on [GitHub](https://github.com/Freaky2112/freaky2112.github.io).*