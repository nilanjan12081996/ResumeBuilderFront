import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generatePDF, generateDocx } from '../reducers/ResumeSlice';

// ---------------------------------------------------------------------------
//  GOOGLE FONT MAP
// ---------------------------------------------------------------------------
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
    .map(f => GOOGLE_FONT_MAP[f] ? '<link rel="stylesheet" href="' + GOOGLE_FONT_MAP[f] + '"/>' : '')
    .filter(Boolean)
    .join('\n');

// Build a CSS font-family string safe for use inside style attributes
const fontStack = (fontName) => {
  if (!fontName) return 'Arial, sans-serif';
  if (fontName === 'Arial') return 'Arimo, Arial, sans-serif';
  return fontName + ', Arial, sans-serif';
};

// ---------------------------------------------------------------------------
//  TWO-COLUMN TEMPLATE DETECTION
// ---------------------------------------------------------------------------
const TWO_COL_TEMPLATES = new Set(['professional', 'clean', 'corporate', 'clear']);

// ---------------------------------------------------------------------------
//  HELPERS
// ---------------------------------------------------------------------------

// HTML-escape a plain string
const esc = (s) => {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

// Strip HTML tags to plain text
const strip = (html) => {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<li[^>]*>/gi, '&#8226; ')
    .replace(/<\/li>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Format a date value to "Mon YYYY"
const fmt = (d) => {
  if (!d) return '';
  if (String(d).toLowerCase() === 'present') return 'Present';
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return String(d);
  return dt.toLocaleString('en-US', { month: 'short', year: 'numeric' });
};

// Build a date range string
const dr = (s, end) => [fmt(s), fmt(end)].filter(Boolean).join(' - ');

const skillLevels = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];

// ---------------------------------------------------------------------------
//  DOCX: UNIVERSAL SECTION BODY RENDERER
// ---------------------------------------------------------------------------
const renderSectionBody = (sec, bodyPt, bodyW, lh) => {
  let out = '';

  if (sec.type === 'summary') {
    out += '<p class="body-text">' + esc(strip(sec.summary)) + '</p>';

  } else if (sec.type === 'experience') {
    (sec.experiences || []).forEach(function(exp) {
      const heading = [exp.jobTitle, exp.company, exp.city].filter(Boolean).map(esc).join(', ');
      const range = esc(dr(exp.startDate, exp.endDate));
      out += '<div class="entry">';
      out += '<table class="entry-table"><tbody><tr>';
      out += '<td class="entry-left"><strong>' + heading + '</strong></td>';
      out += '<td class="entry-right">' + range + '</td>';
      out += '</tr></tbody></table>';
      if (exp.description) {
        out += '<p class="desc">' + esc(strip(exp.description)) + '</p>';
      }
      out += '</div>';
    });

  } else if (sec.type === 'education') {
    (sec.educations || []).forEach(function(edu) {
      const heading = [edu.degree, edu.institute || edu.school, edu.city].filter(Boolean).map(esc).join(', ');
      const range = esc(dr(edu.startDate, edu.endDate));
      out += '<div class="entry">';
      out += '<table class="entry-table"><tbody><tr>';
      out += '<td class="entry-left"><strong>' + heading + '</strong></td>';
      out += '<td class="entry-right">' + range + '</td>';
      out += '</tr></tbody></table>';
      if (edu.description) {
        out += '<p class="desc">' + esc(strip(edu.description)) + '</p>';
      }
      out += '</div>';
    });

  } else if (sec.type === 'certifications') {
    (sec.certifications || []).forEach(function(cert) {
      const heading = [cert.name, cert.organization].filter(Boolean).map(esc).join(', ');
      const range = esc(dr(cert.startDate || cert.startYear, cert.endDate || cert.endYear));
      out += '<div class="entry">';
      out += '<table class="entry-table"><tbody><tr>';
      out += '<td class="entry-left"><strong>' + heading + '</strong></td>';
      out += '<td class="entry-right">' + range + '</td>';
      out += '</tr></tbody></table>';
      if (cert.description) {
        out += '<p class="desc">' + esc(strip(cert.description)) + '</p>';
      }
      out += '</div>';
    });

  } else if (sec.type === 'courses') {
    (sec.courses || []).forEach(function(c) {
      const heading = [c.course, c.institution].filter(Boolean).map(esc).join(', ');
      const range = esc(dr(c.startDate, c.endDate));
      out += '<div class="entry">';
      out += '<table class="entry-table"><tbody><tr>';
      out += '<td class="entry-left"><strong>' + heading + '</strong></td>';
      out += '<td class="entry-right">' + range + '</td>';
      out += '</tr></tbody></table>';
      out += '</div>';
    });

  } else if (sec.type === 'internships') {
    (sec.internships || []).forEach(function(intern) {
      const heading = [intern.jobTitle, intern.employer, intern.city].filter(Boolean).map(esc).join(', ');
      const range = esc(dr(intern.startDate, intern.endDate));
      out += '<div class="entry">';
      out += '<table class="entry-table"><tbody><tr>';
      out += '<td class="entry-left"><strong>' + heading + '</strong></td>';
      out += '<td class="entry-right">' + range + '</td>';
      out += '</tr></tbody></table>';
      if (intern.description) {
        out += '<p class="desc">' + esc(strip(intern.description)) + '</p>';
      }
      out += '</div>';
    });

  } else if (sec.type === 'activities') {
    (sec.activities || []).forEach(function(act) {
      const heading = [act.functionTitle, act.employer, act.city].filter(Boolean).map(esc).join(', ');
      const range = esc(dr(act.startDate, act.endDate));
      out += '<div class="entry">';
      out += '<table class="entry-table"><tbody><tr>';
      out += '<td class="entry-left"><strong>' + heading + '</strong></td>';
      out += '<td class="entry-right">' + range + '</td>';
      out += '</tr></tbody></table>';
      if (act.description) {
        out += '<p class="desc">' + esc(strip(act.description)) + '</p>';
      }
      out += '</div>';
    });

  } else if (sec.type === 'skills') {
    const skills = sec.skills || [];
    const showLevel = sec.hideExperienceLevel === false;
    out += '<table class="skills-table"><tbody>';
    for (let i = 0; i < skills.length; i += 2) {
      const s1 = skills[i];
      const s2 = skills[i + 1];
      const lvl1 = (showLevel && s1 && s1.level !== undefined) ? ' (' + skillLevels[s1.level] + ')' : '';
      const lvl2 = (showLevel && s2 && s2.level !== undefined) ? ' (' + skillLevels[s2.level] + ')' : '';
      out += '<tr>';
      out += '<td class="skill-cell">' + esc(s1 ? s1.name || '' : '') + esc(lvl1) + '</td>';
      out += '<td class="skill-cell">' + esc(s2 ? s2.name || '' : '') + esc(lvl2) + '</td>';
      out += '</tr>';
    }
    out += '</tbody></table>';

  } else if (sec.type === 'languages') {
    const langs = sec.languages || [];
    out += '<table class="skills-table"><tbody>';
    for (let i = 0; i < langs.length; i += 2) {
      const l1 = langs[i];
      const l2 = langs[i + 1];
      const lb1 = l1 ? esc(l1.language) + (!sec.hideProficiency && l1.level ? ' (' + esc(l1.level) + ')' : '') : '';
      const lb2 = l2 ? esc(l2.language) + (!sec.hideProficiency && l2.level ? ' (' + esc(l2.level) + ')' : '') : '';
      out += '<tr>';
      out += '<td class="skill-cell">' + lb1 + '</td>';
      out += '<td class="skill-cell">' + lb2 + '</td>';
      out += '</tr>';
    }
    out += '</tbody></table>';

  } else if (sec.type === 'hobbies') {
    out += '<p class="body-text">' + esc(sec.hobbies) + '</p>';

  } else if (sec.type === 'honors') {
    (sec.items || []).forEach(function(item) {
      const heading = [item.title, item.issuer].filter(Boolean).map(esc).join(', ');
      const range = esc(dr(item.startDate, item.endDate));
      out += '<div class="entry">';
      out += '<table class="entry-table"><tbody><tr>';
      out += '<td class="entry-left"><strong>' + heading + '</strong></td>';
      out += '<td class="entry-right">' + range + '</td>';
      out += '</tr></tbody></table>';
      if (item.description) {
        out += '<p class="desc">' + esc(strip(item.description)) + '</p>';
      }
      out += '</div>';
    });

  } else if (sec.type === 'custom_simple') {
    const items = sec.items || [];
    const showLevel = sec.hideExperienceLevel === false;
    out += '<table class="skills-table"><tbody>';
    for (let i = 0; i < items.length; i += 2) {
      const getN = function(it) {
        if (!it) return '';
        return typeof it === 'object' ? (it.name || it.title || '') : String(it);
      };
      const getLvl = function(it) {
        if (showLevel && it && typeof it === 'object' && it.level !== undefined) {
          return ' (' + skillLevels[it.level] + ')';
        }
        return '';
      };
      out += '<tr>';
      out += '<td class="skill-cell">' + esc(getN(items[i])) + esc(getLvl(items[i])) + '</td>';
      out += '<td class="skill-cell">' + esc(getN(items[i + 1])) + esc(getLvl(items[i + 1])) + '</td>';
      out += '</tr>';
    }
    out += '</tbody></table>';

  } else if (sec.type === 'custom') {
    (sec.items || []).forEach(function(item) {
      const heading = [item.title, item.city].filter(Boolean).map(esc).join(', ');
      const range = esc(dr(item.startDate, item.endDate));
      out += '<div class="entry">';
      out += '<table class="entry-table"><tbody><tr>';
      out += '<td class="entry-left"><strong>' + heading + '</strong></td>';
      out += '<td class="entry-right">' + range + '</td>';
      out += '</tr></tbody></table>';
      if (item.description) {
        out += '<p class="desc">' + esc(strip(item.description)) + '</p>';
      }
      out += '</div>';
    });
  }

  return out;
};

// ---------------------------------------------------------------------------
//  SHARED CSS for DOCX HTML
// ---------------------------------------------------------------------------
const buildSharedCss = (primaryFont, secondaryFont, bodyPt, bodyW, lh) => {
  return [
    'html, body { height: 100%; }',
    '* { box-sizing: border-box; margin: 0; padding: 0; }',
    'body {',
    '  font-family: ' + fontStack(primaryFont) + ';',
    '  font-size: ' + bodyPt + 'pt;',
    '  font-weight: ' + bodyW + ';',
    '  line-height: ' + lh + ';',
    '  color: #333333;',
    '}',
    '.entry { margin-bottom: 8pt; }',
    '.entry-table { width: 100%; border-collapse: collapse; table-layout: fixed; }',
    '.entry-left { width: 70%; vertical-align: top; font-size: ' + bodyPt + 'pt; padding-right: 8pt; }',
    '.entry-right { width: 30%; vertical-align: top; text-align: right; font-size: ' + bodyPt + 'pt; font-weight: bold; color: #555555; white-space: nowrap; }',
    '.desc { font-size: ' + bodyPt + 'pt; color: #374151; line-height: ' + lh + '; margin: 3pt 0 4pt 0; }',
    '.body-text { font-size: ' + bodyPt + 'pt; color: #374151; line-height: ' + lh + '; margin: 2pt 0; }',
    '.skills-table { width: 100%; border-collapse: collapse; margin-top: 4pt; }',
    '.skill-cell { width: 50%; padding: 2pt 8pt 2pt 0; font-size: ' + bodyPt + 'pt; color: #1f2937; border-bottom: 1px solid #e5e7eb; vertical-align: middle; }',
    'p { font-size: ' + bodyPt + 'pt; color: #374151; line-height: ' + lh + '; margin: 2pt 0; }',
    'strong { font-weight: bold; }',
    'a { color: #2b6cb0; text-decoration: none; }',
    'table { border-collapse: collapse; }',
    'td { vertical-align: top; }',
  ].join('\n');
};

// ---------------------------------------------------------------------------
//  DOCX HTML BUILDER: TWO-COLUMN TEMPLATES
//  professional, clean, corporate, clear
// ---------------------------------------------------------------------------
const buildTwoColDocxHtml = function(params) {
  const formValues = params.formValues;
  const sections = params.sections || [];
  const resumeSettings = params.resumeSettings || {};
  const themeColor = params.themeColor;
  const template = params.template;

  const text = resumeSettings.text || {};
  const layout = resumeSettings.layout || {};

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
  const betweenSections = layout.betweenSections || 12;
  const betweenTitlesContent = layout.betweenTitlesContent || 6;

  const isProfessional = (template === 'professional');
  const isClear = (template === 'clear');
  const isCorporate = (template === 'corporate');
  const isClean = (template === 'clean');

  // Sidebar styling
  const sidebarBg = (isProfessional || isClear) ? color : '#f7f7f7';
  const sidebarTextColor = (isProfessional || isClear) ? '#ffffff' : '#111111';
  const sideBodyColor = (isProfessional || isClear) ? '#d1d5db' : '#444444';
  const sideBorderColor = (isProfessional || isClear) ? 'rgba(255,255,255,0.3)' : '#dddddd';
  const mainBorderColor = (isProfessional || isClear) ? '#e0e0e0' : '#e5e7eb';

  // Section type split
  const SIDEBAR_TYPES = new Set(['skills', 'languages', 'hobbies']);
  const sidebarSections = sections.filter(function(s) { return SIDEBAR_TYPES.has(s.type); });
  const mainSections = sections.filter(function(s) { return !SIDEBAR_TYPES.has(s.type); });

  // ---- Build sidebar HTML ----
  let sidebarHtml = '';

  // Name + job title (not for 'clear' which shows them in the full-width header)
  if (!isClear) {
    sidebarHtml += '<div style="margin-bottom: 14pt;">';
    if (isProfessional) {
      sidebarHtml += '<div style="text-align: center;">';
    }
    sidebarHtml += '<div style="';
    sidebarHtml += 'font-family: ' + fontStack(secondaryFont) + '; ';
    sidebarHtml += 'font-size: ' + h1Pt + 'pt; ';
    sidebarHtml += 'font-weight: ' + h1W + '; ';
    sidebarHtml += 'color: ' + sidebarTextColor + '; ';
    sidebarHtml += 'line-height: 1.2; ';
    sidebarHtml += 'margin-bottom: 4pt;';
    sidebarHtml += '">';
    sidebarHtml += esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '');
    sidebarHtml += '</div>';
    if (formValues.job_target) {
      sidebarHtml += '<div style="';
      sidebarHtml += 'font-size: ' + subPt + 'pt; ';
      sidebarHtml += 'font-weight: ' + subW + '; ';
      sidebarHtml += 'color: ' + (isProfessional ? 'rgba(255,255,255,0.8)' : '#555555') + '; ';
      sidebarHtml += 'text-transform: uppercase; ';
      sidebarHtml += 'letter-spacing: 0.06em;';
      sidebarHtml += '">';
      sidebarHtml += esc(formValues.job_target);
      sidebarHtml += '</div>';
    }
    if (isProfessional) {
      sidebarHtml += '</div>';
    }
    sidebarHtml += '</div>';
  }

  // Contact details block
  let contactInner = '';

  const addressParts = [
    formValues.address,
    [formValues.city_state, formValues.country].filter(Boolean).join(', '),
    formValues.postal_code,
  ].filter(Boolean);

  if (addressParts.length > 0) {
    contactInner += '<p style="margin-bottom: 3pt;">' + addressParts.map(esc).join('<br/>') + '</p>';
  }
  if (formValues.email) {
    contactInner += '<p style="margin-bottom: 3pt; word-break: break-all;">' + esc(formValues.email) + '</p>';
  }
  if (formValues.phone) {
    contactInner += '<p style="margin-bottom: 3pt;">' + esc(formValues.phone) + '</p>';
  }
  if (formValues.linkedin) {
    contactInner += '<p style="margin-bottom: 3pt;">LinkedIn</p>';
  }
  if (formValues.github) {
    contactInner += '<p style="margin-bottom: 3pt;">GitHub</p>';
  }
  if (formValues.stackoverflow) {
    contactInner += '<p style="margin-bottom: 3pt;">Stack Overflow</p>';
  }
  if (formValues.leetcode) {
    contactInner += '<p style="margin-bottom: 3pt;">LeetCode</p>';
  }
  if (formValues.driving_licence) {
    contactInner += '<p style="margin-bottom: 3pt; font-size: ' + (bodyPt - 1) + 'pt; text-transform: uppercase; opacity: 0.7;">Driving License</p>';
    contactInner += '<p style="margin-bottom: 3pt;">' + esc(formValues.driving_licence) + '</p>';
  }
  if (formValues.nationality) {
    contactInner += '<p style="margin-bottom: 3pt; font-size: ' + (bodyPt - 1) + 'pt; text-transform: uppercase; opacity: 0.7;">Nationality</p>';
    contactInner += '<p style="margin-bottom: 3pt;">' + esc(formValues.nationality) + '</p>';
  }
  if (formValues.dob) {
    contactInner += '<p style="margin-bottom: 3pt; font-size: ' + (bodyPt - 1) + 'pt; text-transform: uppercase; opacity: 0.7;">Date of Birth</p>';
    contactInner += '<p style="margin-bottom: 3pt;">' + esc(formValues.dob) + '</p>';
  }
  if (formValues.birth_place) {
    contactInner += '<p style="margin-bottom: 3pt; font-size: ' + (bodyPt - 1) + 'pt; text-transform: uppercase; opacity: 0.7;">Place of Birth</p>';
    contactInner += '<p style="margin-bottom: 3pt;">' + esc(formValues.birth_place) + '</p>';
  }

  if (contactInner) {
    sidebarHtml += '<div style="margin-bottom: ' + betweenSections + 'pt;">';
    sidebarHtml += '<div class="side-heading">Details</div>';
    sidebarHtml += '<div style="font-size: ' + bodyPt + 'pt; color: ' + sideBodyColor + '; line-height: ' + lh + ';">';
    sidebarHtml += contactInner;
    sidebarHtml += '</div>';
    sidebarHtml += '</div>';
  }

  // Links section (only if not already in contact)
  const links = [];
  if (formValues.linkedin) links.push('LinkedIn');
  if (formValues.github) links.push('GitHub');
  if (formValues.stackoverflow) links.push('Stack Overflow');
  if (formValues.leetcode) links.push('LeetCode');
  if (formValues.website) links.push('Portfolio');

  if (links.length > 0 && !contactInner.includes('LinkedIn')) {
    sidebarHtml += '<div style="margin-bottom: ' + betweenSections + 'pt;">';
    sidebarHtml += '<div class="side-heading">Links</div>';
    links.forEach(function(l) {
      sidebarHtml += '<p style="font-size: ' + bodyPt + 'pt; color: ' + sideBodyColor + '; margin-bottom: 3pt;">' + esc(l) + '</p>';
    });
    sidebarHtml += '</div>';
  }

  // Sidebar sections: skills, languages, hobbies
  sidebarSections.forEach(function(sec) {
    let secBody = '';

    if (sec.type === 'skills') {
      const showLevel = sec.hideExperienceLevel === false;
      (sec.skills || []).forEach(function(sk) {
        const lvl = (showLevel && sk.level !== undefined) ? ' (' + skillLevels[sk.level] + ')' : '';
        secBody += '<p style="font-size: ' + bodyPt + 'pt; color: ' + sideBodyColor + '; margin-bottom: 4pt;">' + esc(sk.name) + esc(lvl) + '</p>';
      });
    } else if (sec.type === 'languages') {
      (sec.languages || []).forEach(function(l) {
        const lvl = (!sec.hideProficiency && l.level) ? ' (' + esc(l.level) + ')' : '';
        secBody += '<p style="font-size: ' + bodyPt + 'pt; color: ' + sideBodyColor + '; margin-bottom: 4pt;">' + esc(l.language) + lvl + '</p>';
      });
    } else if (sec.type === 'hobbies' && sec.hobbies) {
      secBody = '<p style="font-size: ' + bodyPt + 'pt; color: ' + sideBodyColor + '; line-height: ' + lh + ';">' + esc(sec.hobbies) + '</p>';
    }

    if (secBody) {
      sidebarHtml += '<div style="margin-bottom: ' + betweenSections + 'pt;">';
      sidebarHtml += '<div class="side-heading">' + esc(sec.title) + '</div>';
      sidebarHtml += secBody;
      sidebarHtml += '</div>';
    }
  });

  // ---- Build main content HTML ----
  let mainHtml = '';
  mainSections.forEach(function(sec) {
    const body = renderSectionBody(sec, bodyPt, bodyW, lh);
    if (!body) return;
    mainHtml += '<div style="margin-bottom: ' + betweenSections + 'pt;">';
    mainHtml += '<div class="main-heading">' + esc(sec.title) + '</div>';
    mainHtml += body;
    mainHtml += '</div>';
  });

  // ---- Full-width header row (only for 'clear' template) ----
  let headerRowHtml = '';
  if (isClear) {
    headerRowHtml = '<tr>';
    headerRowHtml += '<td colspan="2" bgcolor="' + color + '" style="background-color: ' + color + '; padding: 16pt ' + leftRight + 'pt 14pt ' + leftRight + 'pt;">';
    headerRowHtml += '<div style="font-family: ' + fontStack(secondaryFont) + '; font-size: ' + h1Pt + 'pt; font-weight: ' + h1W + '; color: #111111; line-height: 1.1; margin-bottom: 4pt;">';
    headerRowHtml += esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '');
    headerRowHtml += '</div>';
    if (formValues.job_target) {
      headerRowHtml += '<div style="font-size: ' + subPt + 'pt; font-weight: ' + subW + '; color: #333333; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6pt;">';
      headerRowHtml += esc(formValues.job_target);
      headerRowHtml += '</div>';
    }
    const clearContact = [
      [formValues.city_state, formValues.country].filter(Boolean).join(', '),
      formValues.phone ? esc(formValues.phone) : '',
      formValues.email ? esc(formValues.email) : '',
    ].filter(Boolean).join(' | ');
    if (clearContact) {
      headerRowHtml += '<div style="font-size: ' + bodyPt + 'pt; color: #333333;">' + clearContact + '</div>';
    }
    headerRowHtml += '</td>';
    headerRowHtml += '</tr>';
  }

  // ---- CSS ----
  const css = buildSharedCss(primaryFont, secondaryFont, bodyPt, bodyW, lh) + '\n' +
    // ▼ FIX: height: 100% ensures the table fills the full page so sidebar bg extends to bottom
    '.layout-table { width: 100%; border-collapse: collapse; height: 100%; min-height: 297mm; }\n' +
    '.sidebar-td {\n' +
    '  width: 32%;\n' +
    '  vertical-align: top;\n' +
    '  padding: ' + topBottom + 'pt 14pt ' + topBottom + 'pt 14pt;\n' +
    '  border-right: 1px solid ' + sideBorderColor + ';\n' +
    '}\n' +
    '.main-td {\n' +
    '  width: 68%;\n' +
    '  background-color: #ffffff;\n' +
    '  vertical-align: top;\n' +
    '  padding: ' + topBottom + 'pt ' + leftRight + 'pt ' + topBottom + 'pt 18pt;\n' +
    '}\n' +
    '.side-heading {\n' +
    '  font-family: ' + fontStack(secondaryFont) + ';\n' +
    '  font-size: ' + secPt + 'pt;\n' +
    '  font-weight: ' + secW + ';\n' +
    '  color: ' + sidebarTextColor + ';\n' +
    '  text-transform: uppercase;\n' +
    '  letter-spacing: 0.07em;\n' +
    '  border-bottom: 1px solid ' + sideBorderColor + ';\n' +
    '  padding-bottom: 3pt;\n' +
    '  margin-bottom: ' + betweenTitlesContent + 'pt;\n' +
    '  margin-top: ' + betweenSections + 'pt;\n' +
    '  display: block;\n' +
    '}\n' +
    '.main-heading {\n' +
    '  font-family: ' + fontStack(secondaryFont) + ';\n' +
    '  font-size: ' + secPt + 'pt;\n' +
    '  font-weight: ' + secW + ';\n' +
    '  color: #111111;\n' +
    '  text-transform: uppercase;\n' +
    '  letter-spacing: 0.06em;\n' +
    '  border-bottom: 1px solid ' + mainBorderColor + ';\n' +
    '  padding-bottom: 3pt;\n' +
    '  margin-bottom: ' + betweenTitlesContent + 'pt;\n' +
    '  display: block;\n' +
    '}\n';

  // ---- Assemble full HTML ----
  let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
  html += '<meta charset="UTF-8"/>\n';
  html += '<title>Resume</title>\n';
  html += getFontLinks(primaryFont, secondaryFont) + '\n';
  html += '<style>\n' + css + '\n</style>\n';
  html += '</head>\n<body>\n';
  // Convert hex color to a format safe for bgcolor attribute
  // bgcolor attribute is required for Word/LibreOffice as they ignore CSS background-color on <td>
  const sidebarBgHex = sidebarBg.startsWith('#') ? sidebarBg : color;

  html += '<table class="layout-table">\n<tbody>\n';
  html += headerRowHtml;
  html += '<tr>\n';
  html += '<td class="sidebar-td" bgcolor="' + sidebarBgHex + '" style="width:32%; background-color:' + sidebarBg + '; vertical-align:top; padding:' + topBottom + 'pt 14pt ' + topBottom + 'pt 14pt; border-right:1px solid ' + sideBorderColor + ';">' + sidebarHtml + '</td>\n';
  html += '<td class="main-td" bgcolor="#ffffff" style="width:68%; background-color:#ffffff; vertical-align:top; padding:' + topBottom + 'pt ' + leftRight + 'pt ' + topBottom + 'pt 18pt;">' + mainHtml + '</td>\n';
  html += '</tr>\n';
  html += '</tbody>\n</table>\n';
  html += '</body>\n</html>';

  return html;
};

// ---------------------------------------------------------------------------
//  DOCX HTML BUILDER: SINGLE-COLUMN TEMPLATES
//  PrimeATS, VividTemplate, LinkedInPrime, CorporateTemplate, etc.
// ---------------------------------------------------------------------------
const buildSingleColDocxHtml = function(params) {
  const formValues = params.formValues;
  const sections = params.sections || [];
  const resumeSettings = params.resumeSettings || {};
  const themeColor = params.themeColor;
  const template = params.template;

  const text = resumeSettings.text || {};
  const layout = resumeSettings.layout || {};

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
  const betweenSections = layout.betweenSections || 12;
  const betweenTitlesContent = layout.betweenTitlesContent || 6;
  const headerAlign = layout.headerAlignment || 'left';

  const isLinkedIn = (template === 'linkedin');
  const isVivid = (template === 'vivid');
  const isCorporate = (template === 'corporate');

  const hAlign = headerAlign === 'center' ? 'center' : headerAlign === 'right' ? 'right' : 'left';

  // Build contact lines
  const addressParts = [
    formValues.address,
    [formValues.city_state, formValues.postal_code].filter(Boolean).join(', '),
    formValues.country,
  ].filter(Boolean).map(esc);
  const addressLine = addressParts.join(', ');

  const contactParts = [];
  if (formValues.email) contactParts.push(esc(formValues.email));
  if (formValues.phone) contactParts.push(esc(formValues.phone));
  if (formValues.linkedin) contactParts.push('LinkedIn');
  if (formValues.github) contactParts.push('GitHub');
  if (formValues.stackoverflow) contactParts.push('Stack Overflow');
  if (formValues.leetcode) contactParts.push('LeetCode');
  const inlineContacts = contactParts.join(' | ');

  const personalParts = [
    formValues.dob,
    formValues.birth_place,
    formValues.nationality,
    formValues.driving_licence,
  ].filter(Boolean).map(esc);
  const personalLine = personalParts.join(' | ');

  // ---- Header HTML ----
  let headerHtml = '';

  if (isLinkedIn) {
    // LinkedIn: colored banner
    headerHtml += '<div style="background-color: ' + color + '; height: 70pt; width: 100%;"></div>\n';
    headerHtml += '<div style="padding: 10pt ' + leftRight + 'pt 0 ' + leftRight + 'pt;">\n';
    headerHtml += '<div style="font-family: ' + fontStack(secondaryFont) + '; font-size: ' + h1Pt + 'pt; font-weight: ' + h1W + '; color: #111111; line-height: 1.1; margin-bottom: 4pt;">';
    headerHtml += esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '');
    headerHtml += '</div>\n';
    if (formValues.job_target) {
      headerHtml += '<div style="font-size: ' + bodyPt + 'pt; color: #374151; margin-bottom: 6pt;">' + esc(formValues.job_target) + '</div>\n';
    }
    headerHtml += '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 8pt 0;"/>\n';
    headerHtml += '</div>\n';

  } else if (isCorporate) {
    // Corporate: centered header with border
    headerHtml += '<div style="text-align: center; padding: ' + topBottom + 'pt ' + leftRight + 'pt ' + Math.round(topBottom * 0.6) + 'pt; border-bottom: 1px solid #f3f4f6;">\n';
    headerHtml += '<div style="font-family: ' + fontStack(secondaryFont) + '; font-size: ' + h1Pt + 'pt; font-weight: ' + h1W + '; color: #111111; line-height: 1.1; margin-bottom: 6pt;">';
    headerHtml += esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '');
    headerHtml += '</div>\n';
    const corpSubLine = [
      formValues.job_target ? esc(formValues.job_target) : '',
      addressLine,
      formValues.phone ? esc(formValues.phone) : '',
    ].filter(Boolean).join(' | ');
    if (corpSubLine) {
      headerHtml += '<div style="font-size: ' + bodyPt + 'pt; color: #6b7280;">' + corpSubLine + '</div>\n';
    }
    headerHtml += '</div>\n';

  } else {
    // PrimeATS, Vivid, default: standard header
    headerHtml += '<div style="text-align: ' + hAlign + '; padding: ' + topBottom + 'pt ' + leftRight + 'pt ' + Math.round(topBottom * 0.5) + 'pt;">\n';
    headerHtml += '<div style="font-family: ' + fontStack(secondaryFont) + '; font-size: ' + h1Pt + 'pt; font-weight: ' + h1W + '; color: ' + color + '; text-transform: uppercase; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 4pt;">';
    headerHtml += esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '');
    headerHtml += '</div>\n';
    if (formValues.job_target) {
      headerHtml += '<div style="font-size: ' + subPt + 'pt; font-weight: ' + subW + '; color: #444444; text-transform: uppercase; margin-bottom: 4pt;">' + esc(formValues.job_target) + '</div>\n';
    }
    const contactLine = [addressLine, inlineContacts].filter(Boolean).join(' | ');
    if (contactLine) {
      headerHtml += '<div style="font-size: ' + bodyPt + 'pt; color: #4b5563; margin-top: 3pt;">' + contactLine + '</div>\n';
    }
    if (personalLine) {
      headerHtml += '<div style="font-size: ' + bodyPt + 'pt; color: #4b5563; margin-top: 2pt;">' + personalLine + '</div>\n';
    }
    headerHtml += '</div>\n';
  }

  // ---- Section heading CSS ----
  let sectionHeadingCss = '';
  if (isVivid) {
    sectionHeadingCss = [
      'background-color: #111111',
      'color: #ffffff',
      'font-family: ' + fontStack(secondaryFont),
      'font-size: ' + secPt + 'pt',
      'font-weight: ' + secW,
      'letter-spacing: 0.1em',
      'text-transform: uppercase',
      'padding: 2pt 8pt',
      'margin-bottom: ' + betweenTitlesContent + 'pt',
      'display: block',
    ].join('; ');
  } else if (isLinkedIn) {
    sectionHeadingCss = [
      'color: #000000',
      'font-family: ' + fontStack(secondaryFont),
      'font-size: ' + secPt + 'pt',
      'font-weight: ' + secW,
      'text-transform: uppercase',
      'letter-spacing: 0.05em',
      'margin-bottom: ' + betweenTitlesContent + 'pt',
      'display: block',
    ].join('; ');
  } else if (isCorporate) {
    sectionHeadingCss = [
      'font-family: ' + fontStack(secondaryFont),
      'font-size: ' + secPt + 'pt',
      'font-weight: ' + secW,
      'color: #111111',
      'text-transform: uppercase',
      'letter-spacing: 0.12em',
      'border-bottom: 1px solid #e5e7eb',
      'padding-bottom: 3pt',
      'margin-bottom: ' + betweenTitlesContent + 'pt',
      'margin-top: ' + betweenSections + 'pt',
      'display: block',
    ].join('; ');
  } else {
    // PrimeATS default: colored top+bottom border
    sectionHeadingCss = [
      'color: ' + color,
      'border-top: 1px solid ' + color,
      'border-bottom: 1px solid ' + color,
      'font-family: ' + fontStack(secondaryFont),
      'font-size: ' + secPt + 'pt',
      'font-weight: ' + secW,
      'text-transform: uppercase',
      'letter-spacing: 0.05em',
      'padding: 3pt 0',
      'margin-bottom: ' + betweenTitlesContent + 'pt',
      'margin-top: ' + betweenSections + 'pt',
      'display: block',
    ].join('; ');
  }

  // ---- Sections body HTML ----
  let sectionsHtml = '';

  sections.forEach(function(sec) {
    // LinkedIn skills: simple list instead of pill chips (Word compat)
    if (isLinkedIn && sec.type === 'skills') {
      const skillsList = (sec.skills || []).map(function(sk) {
        return '<p style="font-size: ' + bodyPt + 'pt; color: #374151; margin-bottom: 2pt;">- ' + esc(sk.name) + '</p>';
      }).join('');

      sectionsHtml += '<div style="margin-bottom: ' + betweenSections + 'pt;">';
      sectionsHtml += '<div style="' + sectionHeadingCss + '">' + esc(sec.title) + '</div>';
      sectionsHtml += skillsList;
      sectionsHtml += '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 8pt 0;"/>';
      sectionsHtml += '</div>';

    } else if (isLinkedIn) {
      const body = renderSectionBody(sec, bodyPt, bodyW, lh);
      if (!body) return;
      sectionsHtml += '<div style="margin-bottom: ' + betweenSections + 'pt;">';
      sectionsHtml += '<div style="' + sectionHeadingCss + '">' + esc(sec.title) + '</div>';
      sectionsHtml += body;
      sectionsHtml += '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 8pt 0;"/>';
      sectionsHtml += '</div>';

    } else {
      const body = renderSectionBody(sec, bodyPt, bodyW, lh);
      if (!body) return;
      sectionsHtml += '<div style="margin-bottom: ' + betweenSections + 'pt;">';
      sectionsHtml += '<div style="' + sectionHeadingCss + '">' + esc(sec.title) + '</div>';
      sectionsHtml += body;
      sectionsHtml += '</div>';
    }
  });

  // ---- CSS ----
  const css = buildSharedCss(primaryFont, secondaryFont, bodyPt, bodyW, lh) + '\n' +
    '.section { margin-bottom: 4pt; }\n';

  // ---- Assemble full HTML ----
  let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
  html += '<meta charset="UTF-8"/>\n';
  html += '<title>Resume</title>\n';
  html += getFontLinks(primaryFont, secondaryFont) + '\n';
  html += '<style>\n' + css + '\n</style>\n';
  html += '</head>\n<body>\n';
  html += headerHtml;
  html += '<div style="padding: 0 ' + leftRight + 'pt ' + topBottom + 'pt ' + leftRight + 'pt;">\n';
  html += sectionsHtml;
  html += '</div>\n';
  html += '</body>\n</html>';

  return html;
};

// ---------------------------------------------------------------------------
//  MAIN HOOK
// ---------------------------------------------------------------------------
export const useDownload = ({ componentRef, formValues, resumeSettings, sections, themeColor }) => {
  const dispatch = useDispatch();

  // ---- PDF: clone DOM -> strip overflow -> backend ----
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

      const primaryFont = resumeSettings && resumeSettings.text ? resumeSettings.text.primaryFont : 'Arial';
      const secondaryFont = resumeSettings && resumeSettings.text ? resumeSettings.text.secondaryFont : primaryFont;

      const fullHtml = [
        '<!DOCTYPE html><html lang="en"><head>',
        '<meta charset="UTF-8"/>',
        getFontLinks(primaryFont, secondaryFont),
        '<style>',
        '  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; }',
        '  body { margin: 0; padding: 0; font-family: ' + fontStack(primaryFont) + '; }',
        '  @page { size: A4; margin: 0; }',
        '  table { border-collapse: collapse; }',
        '  td { vertical-align: top; }',
        '  a { color: inherit; text-decoration: none; }',
        '  ul { list-style-type: disc; padding-left: 1.2rem; margin: 0.25rem 0; }',
        '  ol { list-style-type: decimal; padding-left: 1.2rem; margin: 0.25rem 0; }',
        '  li { margin-bottom: 0.15rem; }',
        '  p { margin: 0.1rem 0; }',
        '</style>',
        '</head><body>',
        cloned.outerHTML,
        '</body></html>',
      ].join('\n');

      const result = await dispatch(generatePDF(fullHtml));

      if (generatePDF.fulfilled.match(result)) {
        const blob = result.payload;
        const fileUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = (formValues.first_name || 'resume') + '_' + (formValues.last_name || '') + '.pdf';
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

  // ---- DOCX: build clean semantic HTML -> backend ----
  const handleDownloadDocx = async () => {
    try {
      const template = (resumeSettings && resumeSettings.theme && resumeSettings.theme.template)
        ? resumeSettings.theme.template
        : 'ats';

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
        a.download = (formValues.first_name || 'resume') + '_' + (formValues.last_name || '') + '.docx';
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

  // ---- External event listeners ----
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