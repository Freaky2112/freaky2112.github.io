# Freaky's Homelab — Site Redesign 🚀

Complete redesign of `freaky2112.github.io` — dark terminal aesthetic,
green accent, light/dark toggle, new page names, custom 404, and more.

---

## 📦 Files in this package

```
_layouts/
  default.html          ← new layout (replaces existing)

assets/
  css/main.css          ← full new stylesheet (replaces existing)
  js/main.js            ← theme toggle + mobile menu + terminal animation

_posts/
  2025-01-15-cloudflare-tunnel-nginx-proxy.md   ← sample post (keep or delete)

index.md                ← new homepage with terminal hero + stat cards
about.md                ← new whoami page with skill cards
blog.md                 ← renamed to "Lab Notes"
projects.md             ← renamed to "The Stack" with service cards
docs.md                 ← renamed to "Runbooks"
404.md                  ← brand new custom 404 page
_config.yml             ← updated title, description, permalinks
```

---

## 🚀 How to deploy

### Option A — Copy individual files (safest)

1. **Backup your repo** first (or just rely on git history)
2. Copy these files into your repo, replacing existing ones:
   - `_layouts/default.html`
   - `assets/css/main.css` *(check if your CSS file has a different name/path)*
   - `assets/js/main.js` *(new file)*
   - `index.md`
   - `about.md`
   - `blog.md`
   - `projects.md`
   - `docs.md`
   - `404.md`
   - `_config.yml`

3. Commit and push — GitHub Pages will rebuild automatically

### Option B — Check your existing CSS path first

If your existing CSS lives at a different path (e.g. `assets/css/style.css`),
either rename the new file to match OR update the `<link>` tag in `default.html`.

---

## ⚙️ Config — things to personalise

### In `_config.yml`
```yaml
url: "https://freaky2112.github.io"   # ✅ already set
author: "Freaky"                       # change if you want
```

### In `projects.md`
Update the service cards to match your actual running containers.
Change `status-dot up` to `status-dot down` for anything that's stopped.

### In `index.md`  — terminal block
The terminal typewriter text is in `assets/js/main.js` around line 45.
Edit the `lines` array to show your real uptime/stats.

### In `about.md` — stack badges
Add/remove `<span class="badge ...">` entries to match your actual stack.

---

## 🎨 Customisation

### Colors (in `assets/css/main.css`)
All colors are CSS variables at the top of the file:
```css
--green: #39d353;    /* main accent — change to any color you like */
--amber: #e3b341;    /* secondary accent */
--blue:  #58a6ff;    /* info / links */
```

### Light mode
Light mode colors are in the `[data-theme="light"]` block right below.
The toggle button in the nav switches between modes and saves the preference.

### Fonts
Currently using:
- **JetBrains Mono** — headings, nav, code, terminal
- **IBM Plex Sans** — body text

Change the `@import` at the top of `main.css` and the `--font-mono` / `--font-sans` variables.

---

## 🐛 Known notes

- The `_includes/` folder isn't included — header/footer are now directly in `default.html`
  If you had existing includes you use, re-add them to the layout
- If you get Jekyll build errors about missing plugins, add to your `Gemfile`:
  ```ruby
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  ```
- The `old-posts/` folder is excluded in `_config.yml` — adjust if needed

---

## ✅ Quick checklist after deploy

- [ ] Site loads and looks right
- [ ] Dark/light toggle works
- [ ] Mobile hamburger menu works
- [ ] Terminal animation plays on homepage
- [ ] All 5 nav links work
- [ ] 404 page shows for a bad URL (visit `/asdfgh/`)
- [ ] Fix typo: "Knowlegde" → "Knowledge" (now handled in blog.md)
- [ ] Add GitHub repo description on github.com

---

*Pimped with 💚 by Claude  for Freaky's Homelab*
