# numaanfarooq.github.io

Personal portfolio of Numaan Farooq — Strategy & Operations. Plain HTML/CSS/JS, no build step, hosted free on GitHub Pages.

## Structure
```
index.html                      the whole site (single page)
404.html                        branded not-found page
robots.txt / sitemap.xml        SEO
.nojekyll                       tells GitHub Pages to serve files as-is
assets/css/style.css            all styling; design tokens at the top
assets/js/main.js               hero tilt effect only
assets/img/                     photos, favicon, social share image
assets/Numaan_Farooq_Resume.pdf the downloadable resume
```

## Editing
- **Rebrand:** edit the `:root` token block at the top of `assets/css/style.css` (colors, radius, width). Dark mode has its own token block right below.
- **Content:** everything is plain HTML in `index.html`, organized by commented sections (HERO, STATS, ABOUT, EXPERIENCE, CASE STUDIES, SKILLS, EDUCATION, CONTACT).
- **Resume:** replace `assets/Numaan_Farooq_Resume.pdf` with a new file of the same name — the download button keeps working.
- **New photo:** replace files in `assets/img/`, keep the same filenames, or update the `src` in `index.html`.

## Deploying (GitHub Pages)
1. Create a **public** repo named exactly `numaanfarooq.github.io` on your GitHub account.
2. Push these files to the repo root (or upload via GitHub's web UI: "Add file > Upload files").
3. Repo Settings > Pages: Source = "Deploy from a branch", Branch = `main`, folder = `/ (root)`. GitHub Pages is free for public repos; confirm current limits on GitHub's docs.
4. Wait 1–2 minutes; the site appears at https://numaanfarooq.github.io/

## After launch
- Verify the site in Google Search Console (URL-prefix property) and submit `sitemap.xml`.
- Update `lastmod` in `sitemap.xml` when you make meaningful changes.
