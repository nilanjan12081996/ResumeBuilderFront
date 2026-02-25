import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generatePDF, generateDocx } from '../reducers/ResumeSlice';

// ─────────────────────────────────────────────────────────────────────────────
//  GOOGLE FONT MAP
// ─────────────────────────────────────────────────────────────────────────────
const GOOGLE_FONT_MAP = {
  "Arial": "https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap",
  "Lato": "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;600;700;800;900&display=swap",
  "Inter": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap",
  "Roboto": "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700;800;900&display=swap",
  "Open Sans": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap",
  "Montserrat": "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap",
  "Poppins": "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap",
  "Raleway": "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap",
  "Nunito": "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap",
  "Source Sans 3": "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700;800;900&display=swap",
  "Merriweather": "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap",
  "Playfair Display": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap",
  "DM Sans": "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap",
  "Josefin Sans": "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap",
  "Cabin": "https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap",
  "Georgia": "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&display=swap",
  "Times New Roman": "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
};

const getFontLinks = (...fontNames) =>
  [...new Set(fontNames.filter(Boolean))]
    .map(f => GOOGLE_FONT_MAP[f] ? `<link rel="stylesheet" href="${GOOGLE_FONT_MAP[f]}"/>` : '')
    .filter(Boolean)
    .join('\n');

const fontStack = (fontName) => {
  if (fontName === "Arial") {
    return `'Arimo', Arial, sans-serif`;
  }
  return `'${fontName || "Arial"}', Arial, sans-serif`;
};

// ─────────────────────────────────────────────────────────────────────────────
//  TWO-COLUMN TEMPLATE DETECTION
//  Templates that have a sidebar (skills/languages/hobbies on the left)
// ─────────────────────────────────────────────────────────────────────────────
//  'professional' = Professional   (colored left sidebar)
//  'clean'        = CleanTemplate  (white/gray left sidebar)
//  'corporate'    = CorporateTemplate (light bg left sidebar)
//  'clear'        = ClearTemplate  (colored header + gray left sidebar)
const TWO_COL_TEMPLATES = new Set(['professional', 'clean', 'corporate', 'clear']);

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const e = (s) => {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

const strip = (html) => {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<\/li>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const fmt = (d) => {
  if (!d) return '';
  if (String(d).toLowerCase() === 'present') return 'Present';
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return String(d);
  return dt.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

const dr = (s, end) => [fmt(s), fmt(end)].filter(Boolean).join(' \u2013 ');

const skillLevels = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];

// ─────────────────────────────────────────────────────────────────────────────
//  DOCX: UNIVERSAL SECTION BODY RENDERER
// ─────────────────────────────────────────────────────────────────────────────
const renderSectionBody = (sec, bodyPt, bodyW, lh) => {
  let out = '';

  if (sec.type === 'summary') {
    out += `<p class="body-text">${e(strip(sec.summary))}</p>`;

  } else if (sec.type === 'experience') {
    (sec.experiences || []).forEach(exp => {
      const heading = [exp.jobTitle, exp.company, exp.city].filter(Boolean).map(e).join(', ');
      const range = e(dr(exp.startDate, exp.endDate));
      out += `<div class="entry">
        <table class="entry-table"><tbody><tr>
          <td class="entry-left"><strong>${heading}</strong></td>
          <td class="entry-right">${range}</td>
        </tr></tbody></table>
        ${exp.description ? `<p class="desc">${e(strip(exp.description))}</p>` : ''}
      </div>`;
    });

  } else if (sec.type === 'education') {
    (sec.educations || []).forEach(edu => {
      const heading = [edu.degree, edu.institute || edu.school, edu.city].filter(Boolean).map(e).join(', ');
      const range = e(dr(edu.startDate, edu.endDate));
      out += `<div class="entry">
        <table class="entry-table"><tbody><tr>
          <td class="entry-left"><strong>${heading}</strong></td>
          <td class="entry-right">${range}</td>
        </tr></tbody></table>
        ${edu.description ? `<p class="desc">${e(strip(edu.description))}</p>` : ''}
      </div>`;
    });

  } else if (sec.type === 'certifications') {
    (sec.certifications || []).forEach(cert => {
      const heading = [cert.name, cert.organization].filter(Boolean).map(e).join(', ');
      const range = e(dr(cert.startDate || cert.startYear, cert.endDate || cert.endYear));
      out += `<div class="entry">
        <table class="entry-table"><tbody><tr>
          <td class="entry-left"><strong>${heading}</strong></td>
          <td class="entry-right">${range}</td>
        </tr></tbody></table>
        ${cert.description ? `<p class="desc">${e(cert.description)}</p>` : ''}
      </div>`;
    });

  } else if (sec.type === 'courses') {
    (sec.courses || []).forEach(c => {
      const heading = [c.course, c.institution].filter(Boolean).map(e).join(', ');
      const range = e(dr(c.startDate, c.endDate));
      out += `<div class="entry">
        <table class="entry-table"><tbody><tr>
          <td class="entry-left"><strong>${heading}</strong></td>
          <td class="entry-right">${range}</td>
        </tr></tbody></table>
      </div>`;
    });

  } else if (sec.type === 'internships') {
    (sec.internships || []).forEach(intern => {
      const heading = [intern.jobTitle, intern.employer, intern.city].filter(Boolean).map(e).join(', ');
      const range = e(dr(intern.startDate, intern.endDate));
      out += `<div class="entry">
        <table class="entry-table"><tbody><tr>
          <td class="entry-left"><strong>${heading}</strong></td>
          <td class="entry-right">${range}</td>
        </tr></tbody></table>
        ${intern.description ? `<p class="desc">${e(strip(intern.description))}</p>` : ''}
      </div>`;
    });

  } else if (sec.type === 'activities') {
    (sec.activities || []).forEach(act => {
      const heading = [act.functionTitle, act.employer, act.city].filter(Boolean).map(e).join(', ');
      const range = e(dr(act.startDate, act.endDate));
      out += `<div class="entry">
        <table class="entry-table"><tbody><tr>
          <td class="entry-left"><strong>${heading}</strong></td>
          <td class="entry-right">${range}</td>
        </tr></tbody></table>
        ${act.description ? `<p class="desc">${e(strip(act.description))}</p>` : ''}
      </div>`;
    });

  } else if (sec.type === 'skills') {
    const skills = sec.skills || [];
    const showLevel = sec.hideExperienceLevel === false;
    out += `<table class="skills-table"><tbody>`;
    for (let i = 0; i < skills.length; i += 2) {
      const s1 = skills[i];
      const s2 = skills[i + 1];
      const lvl1 = showLevel && s1?.level !== undefined ? ` <span class="level">${skillLevels[s1.level]}</span>` : '';
      const lvl2 = showLevel && s2?.level !== undefined ? ` <span class="level">${skillLevels[s2.level]}</span>` : '';
      out += `<tr>
        <td class="skill-cell">${e(s1?.name || '')}${lvl1}</td>
        <td class="skill-cell">${s2 ? `${e(s2.name || '')}${lvl2}` : ''}</td>
      </tr>`;
    }
    out += `</tbody></table>`;

  } else if (sec.type === 'languages') {
    const langs = sec.languages || [];
    out += `<table class="skills-table"><tbody>`;
    for (let i = 0; i < langs.length; i += 2) {
      const l1 = langs[i];
      const l2 = langs[i + 1];
      const lb1 = l1 ? `${e(l1.language)}${!sec.hideProficiency && l1.level ? ` (${e(l1.level)})` : ''}` : '';
      const lb2 = l2 ? `${e(l2.language)}${!sec.hideProficiency && l2.level ? ` (${e(l2.level)})` : ''}` : '';
      out += `<tr>
        <td class="skill-cell">${lb1}</td>
        <td class="skill-cell">${lb2}</td>
      </tr>`;
    }
    out += `</tbody></table>`;

  } else if (sec.type === 'hobbies') {
    out += `<p class="body-text">${e(sec.hobbies)}</p>`;

  } else if (sec.type === 'honors') {
    (sec.items || []).forEach(item => {
      const heading = [item.title, item.issuer].filter(Boolean).map(e).join(', ');
      const range = e(dr(item.startDate, item.endDate));
      out += `<div class="entry">
        <table class="entry-table"><tbody><tr>
          <td class="entry-left"><strong>${heading}</strong></td>
          <td class="entry-right">${range}</td>
        </tr></tbody></table>
        ${item.description ? `<p class="desc">${e(strip(item.description))}</p>` : ''}
      </div>`;
    });

  } else if (sec.type === 'custom_simple') {
    const items = sec.items || [];
    const showLevel = sec.hideExperienceLevel === false;
    out += `<table class="skills-table"><tbody>`;
    for (let i = 0; i < items.length; i += 2) {
      const getN = (it) => it ? (typeof it === 'object' ? (it.name || it.title || '') : String(it)) : '';
      const getLvl = (it) =>
        showLevel && it && typeof it === 'object' && it.level !== undefined
          ? ` <span class="level">${skillLevels[it.level]}</span>`
          : '';
      out += `<tr>
        <td class="skill-cell">${e(getN(items[i]))}${getLvl(items[i])}</td>
        <td class="skill-cell">${e(getN(items[i + 1]))}${getLvl(items[i + 1])}</td>
      </tr>`;
    }
    out += `</tbody></table>`;

  } else if (sec.type === 'custom') {
    (sec.items || []).forEach(item => {
      const heading = [item.title, item.city].filter(Boolean).map(e).join(', ');
      const range = e(dr(item.startDate, item.endDate));
      out += `<div class="entry">
        <table class="entry-table"><tbody><tr>
          <td class="entry-left"><strong>${heading}</strong></td>
          <td class="entry-right">${range}</td>
        </tr></tbody></table>
        ${item.description ? `<p class="desc">${e(strip(item.description))}</p>` : ''}
      </div>`;
    });
  }

  return out;
};

// ─────────────────────────────────────────────────────────────────────────────
//  SHARED CSS SNIPPET (injected into every DOCX HTML)
// ─────────────────────────────────────────────────────────────────────────────
const sharedCss = (bodyPt, bodyW, lh) => `
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; font-size: ${bodyPt}pt; font-weight: ${bodyW}; line-height: ${lh}; color: #333; }
  .entry { margin-bottom: 8pt; }
  .entry-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  .entry-left  { width: 70%; vertical-align: top; font-size: ${bodyPt}pt; }
  .entry-right { width: 30%; vertical-align: top; text-align: right; font-size: ${bodyPt}pt; font-weight: bold; color: #555; white-space: nowrap; }
  .desc { font-size: ${bodyPt}pt; color: #374151; line-height: ${lh}; margin: 3pt 0 4pt 0; }
  .body-text { font-size: ${bodyPt}pt; color: #374151; line-height: ${lh}; margin: 2pt 0; }
  .skills-table { width: 100%; border-collapse: collapse; margin-top: 4pt; }
  .skill-cell { width: 50%; padding: 2pt 8pt 2pt 0; font-size: ${bodyPt}pt; color: #1f2937; border-bottom: 1px solid #e5e7eb; vertical-align: middle; }
  .level { color: #9ca3af; font-size: ${bodyPt - 1}pt; }
  p, .body-text { font-size: ${bodyPt}pt; color: #374151; line-height: ${lh}; margin: 2pt 0; }
  strong { font-weight: bold; }
  a { color: #2b6cb0; text-decoration: none; }
`;

// ─────────────────────────────────────────────────────────────────────────────
//  DOCX HTML BUILDER: TWO-COLUMN TEMPLATES
//  professional, clean, corporate, clear
// ─────────────────────────────────────────────────────────────────────────────
const buildTwoColDocxHtml = ({ formValues, sections, resumeSettings, themeColor, template }) => {
  const text = resumeSettings?.text || {};
  const layout = resumeSettings?.layout || {};

  const primaryFont = text.primaryFont || 'Arial';
  const secondaryFont = text.secondaryFont || primaryFont;
  const bodyPt = text.body || 9;
  const bodyW = text.bodyWeight || 400;
  const lh = text.lineHeight || 1.5;
  const h1Pt = text.primaryHeading || 22;
  const h1W = text.primaryHeadingWeight || 700;
  const subPt = text.secondaryHeading || 11;
  const subW = text.secondaryHeadingWeight || 600;
  const secPt = text.sectionTitle || 10;
  const secW = text.sectionTitleWeight || 700;
  const color = themeColor || '#2c3e50';
  const topBottom = layout.topBottom || 20;
  const leftRight = layout.leftRight || 20;

  const isProfessional = template === 'professional';
  const isClear = template === 'clear';
  // clean and corporate use light sidebar (no color)

  // Sidebar styling based on template
  const sidebarBg = (isProfessional || isClear) ? color : '#f7f7f7';
  const sidebarColor = (isProfessional || isClear) ? '#ffffff' : '#111111';
  const sideBodyColor = (isProfessional || isClear) ? '#d1d5db' : '#444444';
  const sideBorder = (isProfessional || isClear) ? 'none' : '1px solid #e0e0e0';
  const sideHeadingBorder = (isProfessional || isClear) ? 'rgba(255,255,255,0.3)' : '#dddddd';

  // SIDEBAR_TYPES: sections that go into the left sidebar
  const SIDEBAR_TYPES = new Set(['skills', 'languages', 'hobbies']);
  const sidebarSections = (sections || []).filter(s => SIDEBAR_TYPES.has(s.type));
  const mainSections = (sections || []).filter(s => !SIDEBAR_TYPES.has(s.type));

  // ── Sidebar content ──
  let sidebarHtml = '';

  // Name + title (not for 'clear' which has a full-width header)
  if (!isClear) {
    sidebarHtml += `
    <div style="margin-bottom:14pt;${isProfessional ? 'text-align:center;' : ''}">
      <div style="font-family:${fontStack(secondaryFont)};font-size:${h1Pt}pt;font-weight:${h1W};color:${sidebarColor};line-height:1.15;margin-bottom:4pt;">
        ${e(formValues.first_name)} ${e(formValues.last_name)}
      </div>
      ${formValues.job_target ? `
      <div style="font-size:${subPt}pt;font-weight:${subW};color:${isProfessional ? 'rgba(255,255,255,0.8)' : '#555'};text-transform:uppercase;letter-spacing:0.06em;">
        ${e(formValues.job_target)}
      </div>` : ''}
    </div>`;
  }

  // Contact details
  const contactRows = [
    (formValues.address || formValues.city_state || formValues.country) ? `
      <div style="margin-bottom:3pt;">
        ${formValues.address ? `${e(formValues.address)}<br/>` : ''}
        ${[formValues.city_state, formValues.country].filter(Boolean).map(e).join(', ')}
        ${formValues.postal_code ? `<br/>${e(formValues.postal_code)}` : ''}
      </div>` : '',
    formValues.email ? `<div style="margin-bottom:3pt;word-break:break-all;">${e(formValues.email)}</div>` : '',
    formValues.phone ? `<div style="margin-bottom:3pt;">${e(formValues.phone)}</div>` : '',
    formValues.linkedin ? `<div style="margin-bottom:3pt;">LinkedIn</div>` : '',
    formValues.github ? `<div style="margin-bottom:3pt;">GitHub</div>` : '',
    formValues.stackoverflow ? `<div style="margin-bottom:3pt;">Stack Overflow</div>` : '',
    formValues.leetcode ? `<div style="margin-bottom:3pt;">LeetCode</div>` : '',
    formValues.driving_licence ? `<div style="margin-bottom:3pt;"><span style="font-size:${bodyPt - 1}pt;text-transform:uppercase;opacity:0.7;">Driving License</span><br/>${e(formValues.driving_licence)}</div>` : '',
    formValues.nationality ? `<div style="margin-bottom:3pt;"><span style="font-size:${bodyPt - 1}pt;text-transform:uppercase;opacity:0.7;">Nationality</span><br/>${e(formValues.nationality)}</div>` : '',
    formValues.dob ? `<div style="margin-bottom:3pt;"><span style="font-size:${bodyPt - 1}pt;text-transform:uppercase;opacity:0.7;">Date of Birth</span><br/>${e(formValues.dob)}</div>` : '',
    formValues.birth_place ? `<div style="margin-bottom:3pt;"><span style="font-size:${bodyPt - 1}pt;text-transform:uppercase;opacity:0.7;">Place of Birth</span><br/>${e(formValues.birth_place)}</div>` : '',
  ].filter(Boolean).join('');

  if (contactRows) {
    sidebarHtml += `
    <div style="margin-bottom:14pt;">
      <div class="side-heading">Details</div>
      <div style="font-size:${bodyPt}pt;color:${sideBodyColor};line-height:${lh};">${contactRows}</div>
    </div>`;
  }

  // Links section
  const links = [
    formValues.linkedin && 'LinkedIn',
    formValues.github && 'GitHub',
    formValues.stackoverflow && 'Stack Overflow',
    formValues.leetcode && 'LeetCode',
    formValues.website && 'Portfolio',
  ].filter(Boolean);

  if (links.length && !contactRows.includes('LinkedIn')) {
    sidebarHtml += `
    <div style="margin-bottom:14pt;">
      <div class="side-heading">Links</div>
      ${links.map(l => `<div style="font-size:${bodyPt}pt;color:${sideBodyColor};margin-bottom:3pt;">${l}</div>`).join('')}
    </div>`;
  }

  // Sidebar sections: skills, languages, hobbies
  sidebarSections.forEach(sec => {
    let secBody = '';
    if (sec.type === 'skills') {
      const showLevel = sec.hideExperienceLevel === false;
      (sec.skills || []).forEach(sk => {
        const lvl = showLevel && sk.level !== undefined ? ` (${skillLevels[sk.level]})` : '';
        secBody += `<div style="font-size:${bodyPt}pt;color:${sideBodyColor};margin-bottom:4pt;">${e(sk.name)}${lvl}</div>`;
      });
    } else if (sec.type === 'languages') {
      (sec.languages || []).forEach(l => {
        const lvl = !sec.hideProficiency && l.level ? ` (${e(l.level)})` : '';
        secBody += `<div style="font-size:${bodyPt}pt;color:${sideBodyColor};margin-bottom:4pt;">${e(l.language)}${lvl}</div>`;
      });
    } else if (sec.type === 'hobbies' && sec.hobbies) {
      secBody = `<div style="font-size:${bodyPt}pt;color:${sideBodyColor};line-height:${lh};">${e(sec.hobbies)}</div>`;
    }
    if (secBody) {
      sidebarHtml += `
      <div style="margin-bottom:14pt;">
        <div class="side-heading">${e(sec.title)}</div>
        ${secBody}
      </div>`;
    }
  });

  // ── Main content ──
  let mainHtml = '';
  mainSections.forEach(sec => {
    const body = renderSectionBody(sec, bodyPt, bodyW, lh);
    if (!body) return;
    mainHtml += `
    <div style="margin-bottom:12pt;">
      <div class="main-heading">${e(sec.title)}</div>
      ${body}
    </div>`;
  });

  // ── Full header row (only for 'clear' template) ──
  const headerRow = isClear ? `
  <tr>
    <td colspan="2" style="background:${color};padding:16pt ${leftRight}pt 14pt ${leftRight}pt;">
      <div style="font-family:${fontStack(secondaryFont)};font-size:${h1Pt}pt;font-weight:${h1W};color:#111;line-height:1.1;margin-bottom:4pt;">
        ${e(formValues.first_name)} ${e(formValues.last_name)}
      </div>
      ${formValues.job_target ? `<div style="font-size:${subPt}pt;font-weight:${subW};color:#333;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6pt;">${e(formValues.job_target)}</div>` : ''}
      <div style="font-size:${bodyPt}pt;color:#333;">
        ${[formValues.city_state, formValues.country].filter(Boolean).map(e).join(', ')}
        ${formValues.phone ? ` &nbsp;&middot;&nbsp; ${e(formValues.phone)}` : ''}
        ${formValues.email ? ` &nbsp;&middot;&nbsp; ${e(formValues.email)}` : ''}
      </div>
    </td>
  </tr>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Resume</title>
  ${getFontLinks(primaryFont, secondaryFont)}
  <style>
    ${sharedCss(bodyPt, bodyW, lh)}
    body { font-family: ${fontStack(primaryFont)}; }
    .layout-table { width: 100%; border-collapse: collapse; }
    .sidebar-td {
      width: 32%;
      background: ${sidebarBg};
      vertical-align: top;
      padding: ${topBottom}pt 14pt ${topBottom}pt 14pt;
      border-right: ${sideBorder};
    }
    .main-td {
      width: 68%;
      background: #ffffff;
      vertical-align: top;
      padding: ${topBottom}pt 18pt ${topBottom}pt 18pt;
    }
    .side-heading {
      font-family: ${fontStack(secondaryFont)};
      font-size: ${secPt}pt;
      font-weight: ${secW};
      color: ${sidebarColor};
      text-transform: uppercase;
      letter-spacing: 0.07em;
      border-bottom: 1px solid ${sideHeadingBorder};
      padding-bottom: 3pt;
      margin-bottom: 6pt;
      margin-top: 12pt;
      display: block;
    }
    .side-heading:first-child { margin-top: 0; }
    .main-heading {
      font-family: ${fontStack(secondaryFont)};
      font-size: ${secPt}pt;
      font-weight: ${secW};
      color: #111;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 3pt;
      margin-bottom: 8pt;
      display: block;
    }
  </style>
</head>
<body>
<table class="layout-table">
  <tbody>
    ${headerRow}
    <tr>
      <td class="sidebar-td">${sidebarHtml}</td>
      <td class="main-td">${mainHtml}</td>
    </tr>
  </tbody>
</table>
</body>
</html>`;
};

// ─────────────────────────────────────────────────────────────────────────────
//  DOCX HTML BUILDER: SINGLE-COLUMN TEMPLATES
//  PrimeATS, VividTemplate, LinkedInPrime, CorporateTemplate (header-style),
//  and any other flat / full-width layout
// ─────────────────────────────────────────────────────────────────────────────
const buildSingleColDocxHtml = ({ formValues, sections, resumeSettings, themeColor, template }) => {
  const text = resumeSettings?.text || {};
  const layout = resumeSettings?.layout || {};

  const primaryFont = text.primaryFont || 'Arial';
  const secondaryFont = text.secondaryFont || primaryFont;
  const bodyPt = text.body || 9;
  const bodyW = text.bodyWeight || 400;
  const lh = text.lineHeight || 1.5;
  const h1Pt = text.primaryHeading || 22;
  const h1W = text.primaryHeadingWeight || 700;
  const subPt = text.secondaryHeading || 11;
  const subW = text.secondaryHeadingWeight || 600;
  const secPt = text.sectionTitle || 10;
  const secW = text.sectionTitleWeight || 700;
  const color = themeColor || '#2c3e50';
  const topBottom = layout.topBottom || 20;
  const leftRight = layout.leftRight || 20;
  const headerAlign = layout.headerAlignment || 'left';

  const isLinkedIn = template === 'linkedin';
  const isVivid = template === 'vivid';
  const isCorporate = template === 'corporate'; // corporate also has this path when called single-col

  // Header alignment
  const hAlign = headerAlign === 'center' ? 'center' : headerAlign === 'right' ? 'right' : 'left';

  // Contact line
  const addressLine = [
    formValues.address,
    [formValues.city_state, formValues.postal_code].filter(Boolean).join(', '),
    formValues.country,
  ].filter(Boolean).map(e).join(', ');

  const inlineContacts = [
    formValues.email ? e(formValues.email) : '',
    formValues.phone ? e(formValues.phone) : '',
    formValues.linkedin ? 'LinkedIn' : '',
    formValues.github ? 'GitHub' : '',
    formValues.stackoverflow ? 'Stack Overflow' : '',
    formValues.leetcode ? 'LeetCode' : '',
  ].filter(Boolean).join(' &nbsp;|&nbsp; ');

  const personalLine = [
    formValues.dob,
    formValues.birth_place,
    formValues.nationality,
    formValues.driving_licence,
  ].filter(Boolean).map(e).join(' | ');

  // ── Header ──
  let headerHtml = '';

  if (isLinkedIn) {
    // LinkedIn: colored banner header
    headerHtml = `
    <div style="background:${color};height:70pt;width:100%;"></div>
    <div style="padding:10pt ${leftRight}pt 0 ${leftRight}pt;">
      <div style="font-family:${fontStack(secondaryFont)};font-size:${h1Pt}pt;font-weight:${h1W};color:#111;line-height:1.1;margin-bottom:4pt;">
        ${e(formValues.first_name)} ${e(formValues.last_name)}
      </div>
      ${formValues.job_target ? `<div style="font-size:${bodyPt}pt;color:#374151;margin-bottom:6pt;">${e(formValues.job_target)}</div>` : ''}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:8pt 0;"/>
    </div>`;
  } else if (isCorporate) {
    // Corporate: centered header
    headerHtml = `
    <div style="text-align:center;padding:${topBottom}pt ${leftRight}pt ${Math.round(topBottom * 0.6)}pt;border-bottom:1px solid #f3f4f6;">
      <div style="font-family:${fontStack(secondaryFont)};font-size:${h1Pt}pt;font-weight:${h1W};color:#111;line-height:1.1;margin-bottom:6pt;">
        ${e(formValues.first_name)} ${e(formValues.last_name)}
      </div>
      <div style="font-size:${bodyPt}pt;color:#6b7280;">
        ${[formValues.job_target, addressLine, formValues.phone].filter(Boolean).map(e).join(' &nbsp;|&nbsp; ')}
      </div>
    </div>`;
  } else {
    // PrimeATS, Vivid, default
    headerHtml = `
    <div style="text-align:${hAlign};padding:${topBottom}pt ${leftRight}pt ${Math.round(topBottom * 0.5)}pt;">
      <div style="font-family:${fontStack(secondaryFont)};font-size:${h1Pt}pt;font-weight:${h1W};color:${color};text-transform:uppercase;letter-spacing:-0.02em;line-height:1.1;margin-bottom:4pt;">
        ${e(formValues.first_name)} ${e(formValues.last_name)}
      </div>
      ${formValues.job_target ? `<div style="font-size:${subPt}pt;font-weight:${subW};color:#444;text-transform:uppercase;margin-bottom:4pt;">${e(formValues.job_target)}</div>` : ''}
      ${(addressLine || inlineContacts) ? `<div style="font-size:${bodyPt}pt;color:#4b5563;margin-top:3pt;">${[addressLine, inlineContacts].filter(Boolean).join(' &nbsp;|&nbsp; ')}</div>` : ''}
      ${personalLine ? `<div style="font-size:${bodyPt}pt;color:#4b5563;margin-top:2pt;">${personalLine}</div>` : ''}
    </div>`;
  }

  // ── Section heading style ──
  const sectionHeadingStyle = isVivid
    // Vivid: black badge label
    ? `display:inline-block;background:#111;color:#fff;font-family:${fontStack(secondaryFont)};font-size:${secPt}pt;font-weight:${secW};letter-spacing:0.1em;text-transform:uppercase;padding:2pt 8pt;margin-bottom:6pt;`
    : isLinkedIn
      // LinkedIn: plain uppercase with underline
      ? `color:#000;font-family:${fontStack(secondaryFont)};font-size:${secPt}pt;font-weight:${secW};text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8pt;display:block;`
      : isCorporate
        // Corporate: icon-less UPPERCASE + bottom border
        ? `font-family:${fontStack(secondaryFont)};font-size:${secPt}pt;font-weight:${secW};color:#111;text-transform:uppercase;letter-spacing:0.12em;border-bottom:1px solid #e5e7eb;padding-bottom:3pt;margin-bottom:8pt;margin-top:14pt;display:block;`
        // Default (PrimeATS, etc.): colored top+bottom border
        : `color:${color};border-top:1px solid ${color};border-bottom:1px solid ${color};font-family:${fontStack(secondaryFont)};font-size:${secPt}pt;font-weight:${secW};text-transform:uppercase;letter-spacing:0.05em;padding:3pt 0;margin-bottom:8pt;margin-top:14pt;display:block;`;

  // ── Sections body ──
  let sectionsHtml = '';
  (sections || []).forEach(sec => {
    const body = renderSectionBody(sec, bodyPt, bodyW, lh);
    if (!body) return;

    if (isLinkedIn && sec.type === 'skills') {
      // LinkedIn: pill-style skills chips
      const pills = (sec.skills || [])
        .map(sk => `<span style="display:inline-block;border:1px solid #e5e7eb;border-radius:20pt;background:#f9fafb;padding:2pt 8pt;font-size:${bodyPt - 1}pt;color:#374151;margin:2pt 3pt 2pt 0;">${e(sk.name)}</span>`)
        .join('');
      sectionsHtml += `
      <div style="margin-bottom:10pt;">
        <div style="${sectionHeadingStyle}">${e(sec.title)}</div>
        <div>${pills}</div>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:8pt 0;"/>
      </div>`;
    } else if (isLinkedIn) {
      sectionsHtml += `
      <div style="margin-bottom:10pt;">
        <div style="${sectionHeadingStyle}">${e(sec.title)}</div>
        ${body}
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:8pt 0;"/>
      </div>`;
    } else {
      sectionsHtml += `
      <section>
        <div style="${sectionHeadingStyle}">${e(sec.title)}</div>
        ${body}
      </section>`;
    }
  });

  const bodyPadding = isLinkedIn
    ? `padding:0 ${leftRight}pt ${topBottom}pt ${leftRight}pt;`
    : `padding:0 ${leftRight}pt ${topBottom}pt ${leftRight}pt;`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Resume</title>
  ${getFontLinks(primaryFont, secondaryFont)}
  <style>
    ${sharedCss(bodyPt, bodyW, lh)}
    body { font-family: ${fontStack(primaryFont)}; max-width: 800px; }
    section { margin-bottom: 4pt; }
  </style>
</head>
<body>
  ${headerHtml}
  <div style="${bodyPadding}">${sectionsHtml}</div>
</body>
</html>`;
};

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN HOOK
// ─────────────────────────────────────────────────────────────────────────────
export const useDownload = ({ componentRef, formValues, resumeSettings, sections, themeColor }) => {
  const dispatch = useDispatch();

  // ── PDF: clone DOM → strip overflow → backend ──────────────────────────
  const handleDownloadPDF = async () => {
    try {
      const resumeEl = componentRef.current;
      if (!resumeEl) return;

      const cloned = resumeEl.cloneNode(true);

      // Remove all overflow constraints so the full page renders
      cloned.querySelectorAll('*').forEach(el => {
        const s = el.style;
        const cn = typeof el.className === 'string' ? el.className : '';
        if (
          s.overflow === 'auto' || s.overflow === 'scroll' ||
          s.overflowY === 'auto' || s.overflowY === 'scroll' ||
          cn.includes('overflow-y-auto') ||
          cn.includes('overflow-y-scroll') ||
          cn.includes('h-screen') ||
          cn.includes('hide-scrollbar')
        ) {
          s.overflow = 'visible';
          s.overflowY = 'visible';
          s.height = 'auto';
          s.maxHeight = 'none';
        }
      });

      const primaryFont = resumeSettings?.text?.primaryFont || 'Arial';
      const secondaryFont = resumeSettings?.text?.secondaryFont || primaryFont;

      const fullHtml = [
        '<!DOCTYPE html><html lang="en"><head>',
        '<meta charset="UTF-8"/>',
        getFontLinks(primaryFont, secondaryFont),
        '<style>',
        '  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }',
        `  body { margin: 0; padding: 0; font-family: ${fontStack(primaryFont)}!important; }`,
        `  td, p, div, span, h1, h2, h3, h4, li { font-family: ${fontStack(primaryFont)} !important; }`,
        '  @page { size: A4; margin: 0; }',
        '  table { border-collapse: collapse; }',
        '  td { vertical-align: top; }',
        '  a { color: inherit; text-decoration: none; }',
        '  ul { list-style-type: disc; padding-left: 1.2rem; margin: 0.25rem 0; }',
        '  ol { list-style-type: decimal; padding-left: 1.2rem; margin: 0.25rem 0; }',
        '  li { margin-bottom: 0.15rem; }',
        '  p  { margin: 0.1rem 0; }',
        '</style>',
        '</head><body>',
        cloned.outerHTML,
        '</body></html>',
      ].join('');

      const result = await dispatch(generatePDF(fullHtml));

      if (generatePDF.fulfilled.match(result)) {
        const blob = result.payload;
        const fileUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = `${formValues.first_name || 'resume'}_${formValues.last_name || ''}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(fileUrl);
      } else {
        console.error('PDF generation failed', result);
      }
    } catch (err) {
      console.error('PDF download error:', err);
    }
  };

  // ── DOCX: build clean semantic HTML → backend ──────────────────────────
  const handleDownloadDocx = async () => {
    try {
      const template = resumeSettings?.theme?.template || 'ats';
      const isTwoCol = TWO_COL_TEMPLATES.has(template);

      const fullHtml = isTwoCol
        ? buildTwoColDocxHtml({ formValues, sections, resumeSettings, themeColor, template })
        : buildSingleColDocxHtml({ formValues, sections, resumeSettings, themeColor, template });

      const result = await dispatch(generateDocx(fullHtml));

      if (generateDocx.fulfilled.match(result)) {
        const blob = result.payload;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formValues?.first_name || 'resume'}_${formValues?.last_name || ''}.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } else {
        console.error('DOCX generation failed', result);
      }
    } catch (err) {
      console.error('DOCX download error:', err);
    }
  };

  // ── External event listeners (for trigger buttons outside React tree) ──
  useEffect(() => {
    window.addEventListener('download-pdf', handleDownloadPDF);
    return () => window.removeEventListener('download-pdf', handleDownloadPDF);
  }, [formValues, resumeSettings, sections, themeColor]);

  useEffect(() => {
    window.addEventListener('download-docx', handleDownloadDocx);
    return () => window.removeEventListener('download-docx', handleDownloadDocx);
  }, [formValues, resumeSettings, sections, themeColor]);

  return { handleDownloadPDF, handleDownloadDocx };
};