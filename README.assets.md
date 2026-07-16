# README Assets

This repository uses a premium GitHub profile README layout with editable profile data and artwork assets.

## Key files

- `README.md` — main profile README.
- `data/config.json` — editable profile content, links, projects, skills, and theme.
- `data/profile.json` — optional profile metadata alias.
- `assets/banner.gif` — animated profile banner generated from `BANNER.mp4`.
- `assets/banner.png` — static fallback banner screenshot.
- `assets/profile.svg` — profile illustration placeholder.
- `assets/logo.svg`, `assets/divider.svg`, `assets/cards/*.svg` — supporting design assets.
- `scripts/update-readme.js` — regenerates `README.md` from `data/config.json`.
- `.github/workflows/update.yml` — scheduled workflow to refresh the README.

## Updating the profile

1. Edit `data/config.json`.
2. Run `node scripts/update-readme.js`.
3. Commit `README.md` and the updated data file.

## Replacing images

- Replace `assets/banner.gif` with your own animated banner file.
- Replace `assets/profile.svg` with a custom profile illustration or photo.
- Keep file names consistent so the README continues to render correctly.
