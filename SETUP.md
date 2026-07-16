# 🚀 GitHub Profile Setup Guide
## Jatin Ghoyal — Premium Profile README

---

## 📁 Project Structure

```
JatinGhoyal/                     ← Your GitHub profile repo (same name as username)
├── README.md                    ← Main profile (this file goes here)
├── assets/
│   ├── hero.gif                 ← 🎬 Convert BANNER.mp4 → hero.gif (see below)
│   ├── terminal.svg             ← Animated terminal (auto-included)
│   ├── typing.svg               ← Typing animation (auto-included)
│   ├── certificates/
│   │   ├── cert-01.jpg          ← Your certificate images
│   │   ├── cert-02.jpg
│   │   └── ...
│   └── projects/
│       ├── alphee-eats.jpg      ← Project screenshots
│       ├── autofinder.jpg
│       └── ...
└── .github/
    └── workflows/
        └── snake.yml            ← Auto-generates contribution snake
```

---

## 🎬 Step 1 — Convert Hero Video

FFmpeg is **required** to convert your `BANNER.mp4` to `hero.gif`.

### Install FFmpeg (Windows)

**Option A — Using winget (recommended):**
```powershell
winget install ffmpeg
```

**Option B — Using Chocolatey:**
```powershell
choco install ffmpeg
```

**Option C — Manual:**
1. Download from https://www.gyan.dev/ffmpeg/builds/
2. Extract and add `bin/` to your System PATH

---

### Convert BANNER.mp4 → hero.gif

Run this command from the project folder:

```bash
# High Quality (recommended, ~5-15MB)
ffmpeg -i BANNER.mp4 -vf "fps=15,scale=1200:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" -loop 0 assets/hero.gif
```

**If the file is too large (>15MB), use lower settings:**
```bash
# Balanced Quality (~3-8MB)
ffmpeg -i BANNER.mp4 -vf "fps=10,scale=900:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer" -loop 0 assets/hero.gif
```

**Smallest file size:**
```bash
# Compact (~1-3MB)
ffmpeg -i BANNER.mp4 -vf "fps=8,scale=700:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=32[p];[s1][p]paletteuse=dither=bayer" -loop 0 assets/hero.gif
```

> ℹ️ GitHub has a 10MB soft limit for GIFs. Aim for under 10MB.

---

## 🐙 Step 2 — Create GitHub Profile Repo

1. Go to https://github.com/new
2. Name the repo **exactly the same as your GitHub username**: `JatinGhoyal`
3. Set it to **Public**
4. **DO NOT** initialize with README (you'll push yours)
5. Click **Create repository**

---

## 📤 Step 3 — Push the Profile

```powershell
# In your project folder
git init
git add .
git commit -m "feat: launch premium GitHub profile"
git branch -M main
git remote add origin https://github.com/JatinGhoyal/JatinGhoyal.git
git push -u origin main
```

---

## 🔗 Step 4 — Update Placeholder Links

Edit these in `README.md`:

| Placeholder | Replace With |
|-------------|-------------|
| `https://github.com/JatinGhoyal` | Your GitHub URL |
| `https://linkedin.com/in/JatinGhoyal` | Your LinkedIn URL |
| `https://JatinGhoyal.dev` | Your portfolio URL |
| `mailto:jatin@example.com` | Your real email |
| `https://github.com/JatinGhoyal/AlpheeEats` | Actual project repo URLs |

---

## 🐍 Step 5 — Enable Contribution Snake

The snake animation is generated automatically by a GitHub Action.

1. Go to your profile repo → **Settings**
2. Click **Actions** → **General**
3. Under **Workflow permissions**, select **Read and write permissions**
4. Click **Save**
5. Go to **Actions** tab and manually trigger **"Generate Contribution Snake"**

After it runs, your snake will appear at the bottom of your README. ✅

---

## 📜 Step 6 — Add Certificates

1. Drop your certificate images into `assets/certificates/`
   - Name them: `cert-01.jpg`, `cert-02.jpg`, etc. (or any name)
2. Edit the certification section in `README.md`
3. Replace placeholder text with your actual cert names, organizations, and links

---

## 📊 Step 7 — GitHub Stats Widget Fix

The stats widgets use your GitHub username. Make sure:
- Replace `JatinGhoyal` with your **actual GitHub username** in all widget URLs
- Your repos are **public** for accurate language stats
- You have **commit activity** for the streak to show

---

## ✅ Checklist

- [ ] FFmpeg installed
- [ ] `BANNER.mp4` converted to `assets/hero.gif`
- [ ] GitHub profile repo created (`JatinGhoyal/JatinGhoyal`)
- [ ] All files pushed to GitHub
- [ ] Placeholder links updated (GitHub, LinkedIn, Portfolio, Email)
- [ ] Project repo links updated
- [ ] Certificates added to `assets/certificates/`
- [ ] Snake workflow enabled & triggered
- [ ] Profile looks great on GitHub! 🎉

---

## 🎨 Customization Tips

- **Colors**: The accent color is `#00ff88` (green). Search & replace to change it.
- **Fonts**: Typing animation uses [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono).
- **Widgets**: All GitHub stats widgets are from:
  - [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
  - [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats)
  - [github-readme-activity-graph](https://github.com/Ashutosh00710/github-readme-activity-graph)
  - [readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg)

---

*Built with ❤️ for Jatin Ghoyal's premium GitHub profile.*
