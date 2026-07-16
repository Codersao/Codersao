const fs = require('fs');
const path = require('path');

function encodeBadgeText(value) {
  return encodeURIComponent(value.replace(/ /g, '%20'));
}

function buildLinkBadge(link) {
  const label = encodeBadgeText(link.label);
  const logo = encodeBadgeText(link.logo || link.label);
  const color = encodeBadgeText(link.color || '7c3aed');
  return `[![${link.label}](https://img.shields.io/badge/${label}-${color}?style=for-the-badge&logo=${logo}&logoColor=white)](${link.url})`;
}

function buildTechBadge(tech) {
  const label = encodeBadgeText(tech);
  return `![${tech}](https://img.shields.io/badge/${label}-151515?style=for-the-badge&logo=${label}&logoColor=white&color=7c3aed)`;
}

function buildReadme(config) {
  const heroLinks = config.links.map(buildLinkBadge).join(' ');
  const statsBlocks = config.stats
    .map((item) => {
      const color = item.color.startsWith('#') ? item.color.slice(1) : item.color;
      return `<div style="flex:1; min-width:120px; padding:12px; background:rgba(255,255,255,0.01); border-radius:8px; text-align:center">
        <div style="color:#${color}; font-weight:700">${item.value}</div>
        <div style="color:#9aa7b8; font-size:12px">${item.label}</div>
      </div>`;
    })
    .join('\n');

  const currentLines = config.current.map((item) => `${item.emoji} ${item.label.padEnd(11)} ${item.value}`).join('\n');

  const projectBlocks = config.projects.map((project) => {
    const techLine = project.tech.map(buildTechBadge).join(' ');
    const links = [`[Repo](${project.repo})`];
    if (project.demo) links.push(`[Demo](${project.demo})`);
    return `<div style="background:rgba(255,255,255,0.01); padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.03)">
      <h4 style="margin:0 0 6px 0; color:#e6eef8">${project.title}</h4>
      <div style="color:#9aa7b8; font-size:13px; margin-bottom:8px">${project.description}</div>
      <div style="margin-bottom:8px">${techLine}</div>
      <div style="color:#cbd6e3">${links.join(' · ')}</div>
    </div>`;
  }).join('</td>\n    <td valign="top">\n');

  const skillSections = config.skills.map((group) => {
    const badges = group.items.map(buildTechBadge).join(' ');
    return `<strong style="color:#e6eef8">${group.category}</strong>\n<br/>\n${badges}`;
  }).join('<br/><br/>\n');

  const socialLinks = config.social.map((item) => `[${item.label}](${item.url})`).join(' · ');

  return `<!--
  Premium GitHub Profile README (dark, terminal + cards layout)
  Generated from data/config.json. Edit the config file and run scripts/update-readme.js.
-->

<table width="100%"><tr>
<td valign="top" width="220" style="padding-right:20px">

<!-- Sidebar simulated -->
<div style="font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#9aa7b8;">
  <div style="background:transparent; padding:14px 10px; border-radius:8px;">
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px">
      <img src="${config.assets.profile}" width="64" alt="profile" style="border-radius:10px; border:1px solid rgba(255,255,255,0.03)"/>
      <div>
        <div style="font-weight:700; color:#e6eef8">${config.name}</div>
        <div style="font-size:12px; color:#7c3aed">${config.role}</div>
      </div>
    </div>

    <!-- nav -->
    <div style="margin:6px 0 18px 0">
      <div style="margin:6px 0">🏠 <strong>home</strong></div>
      <div style="margin:6px 0">📄 about</div>
      <div style="margin:6px 0">📁 projects</div>
      <div style="margin:6px 0">💻 skills</div>
      <div style="margin:6px 0">✉️ contact</div>
    </div>

    <!-- social badges -->
    <div style="margin-top:18px; display:flex; gap:8px; flex-wrap:wrap">
      [![Website](https://img.shields.io/badge/Website-7c3aed?style=flat-square&logo=globe&logoColor=white)](https://codersao.in)
      [![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Codersao)
    </div>

  </div>
</div>

</td>
<td valign="top">

<!-- Hero -->
<div style="background:transparent; padding:6px 12px 18px 12px; border-radius:10px;">
  <table width="100%"><tr>
  <td valign="top" style="padding-right:20px">
    <div style="font-family: 'JetBrains Mono', monospace; color:#9fffcf; font-size:13px; margin-bottom:8px">root@jatin:~$ whoami</div>
    <h1 style="margin:0; color:#e6eef8; font-family: Inter, system-ui;">Hi, I'm ${config.name}</h1>
    <div style="color:#9aa7b8; margin:8px 0 12px 0">${config.role}</div>
    <p style="color:#cbd6e3; max-width:680px">${config.description}</p>

    <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap">
      ${heroLinks}
    </div>
  </td>
  <td valign="top" align="right">
    <img src="${config.assets.banner}" alt="banner" width="420" style="border-radius:10px; border:1px solid rgba(255,255,255,0.03)"/>
  </td>
  </tr></table>
</div>


<!-- Quick stats & activity -->
<div style="display:flex; gap:18px; margin-top:18px; flex-wrap:wrap">
  <div style="flex:1; min-width:300px; background:rgba(255,255,255,0.01); padding:14px; border-radius:10px; border:1px solid rgba(255,255,255,0.03)">
    <div style="color:#7c3aed; font-weight:700; margin-bottom:10px">// QUICK STATS</div>
    <div style="display:flex; gap:12px; flex-wrap:wrap">
      ${statsBlocks}
    </div>
  </div>

  <div style="flex:1; min-width:320px; background:rgba(255,255,255,0.01); padding:14px; border-radius:10px; border:1px solid rgba(255,255,255,0.03)">
    <div style="color:#7c3aed; font-weight:700; margin-bottom:10px">// GITHUB ACTIVITY</div>
    ![Contribution Graph](https://ghchart.rshah.org/${config.github.username})
  </div>
</div>


<!-- Current (terminal style) -->

### Currently

<pre style="background:#071018;border:1px solid rgba(255,255,255,0.03);padding:12px;border-radius:8px;color:#9fffcf">root@jatin:~$ status

${currentLines}
</pre>


<!-- Featured Projects -->

### Featured Projects

<table width="100%"><tr>
<td valign="top" width="420" style="padding-right:12px">
  ${projectBlocks}
</td>
</tr></table>


<!-- Tech stack -->

### Languages & Tools

<div style="background:rgba(255,255,255,0.01); padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.03)">
${skillSections}
</div>


<!-- GitHub analytics -->

### GitHub

<div style="background:transparent; margin-top:10px">
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${config.github.username}&show_icons=true&theme=dark&hide_border=true)
</div>


---

### Contact

${socialLinks}


<footer style="color:#6b7280; margin-top:18px">root@jatin:~$ Thanks for visiting! 👋</footer>
`;
}

const configPath = path.join(__dirname, '..', 'data', 'config.json');
const outputPath = path.join(__dirname, '..', 'README.md');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const readme = buildReadme(config);
fs.writeFileSync(outputPath, readme, 'utf8');
console.log('README.md has been regenerated from data/config.json');
