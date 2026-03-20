import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generatePDF, decreaseSubscriptionCount } from '../reducers/ResumeSlice';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
const htmlDocx = require('html-docx-js/dist/html-docx');

// ---------------------------------------------------------------------------
//  GOOGLE FONT MAP
// ---------------------------------------------------------------------------
const GOOGLE_FONT_MAP = {
  "Arial": null,
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

const fontStack = (fontName) => {
  if (!fontName) return 'Arial, sans-serif';
  if (fontName === 'Arial') return 'Arial, Helvetica, sans-serif';
  return fontName + ', Arial, sans-serif';
};

// ---------------------------------------------------------------------------
//  TEMPLATE DETECTION SETS
// ---------------------------------------------------------------------------
const SIDEBAR_TEMPLATES = new Set(['professional', 'clean', 'clear', 'corporate']);
const SINGLE_COL_TEMPLATES = new Set(['ats', 'vivid', 'linkedin']);

// ---------------------------------------------------------------------------
//  HELPERS
// ---------------------------------------------------------------------------
const esc = (s) => {
  if (s === null || s === undefined) return '';
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

const dr = (s, e) => [fmt(s), fmt(e)].filter(Boolean).join(' - ');

const skillLevels = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];

// ---------------------------------------------------------------------------
//  LINKEDIN ONLY: htmlToDocxSafe
// ---------------------------------------------------------------------------
const htmlToDocxSafe = (html) => {
  if (!html) return '';
  let result = html;
  result = result.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, function(match, inner) {
    const cleaned = inner
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<\/p>/gi, ' ')
      .replace(/<p[^>]*>/gi, '')
      .replace(/<(?!\/?(?:strong|b|em|i|u)\b)[^>]+>/gi, '')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ').trim();
    return cleaned
      ? '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:1pt 0;"><tbody><tr>' +
        '<td style="width:10pt;vertical-align:top;font-size:9pt;padding-right:4pt;">\u2022</td>' +
        '<td style="vertical-align:top;font-size:9pt;">' + cleaned + '</td>' +
        '</tr></tbody></table>'
      : '';
  });
  result = result
    .replace(/<\/?ul[^>]*>/gi, '')
    .replace(/<\/?ol[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, '<br/>')
    .replace(/<\/p>/gi, ' ').replace(/<p[^>]*>/gi, '')
    .replace(/<div[^>]*>/gi, '').replace(/<\/div>/gi, ' ')
    .replace(/<(?!\/?(?:strong|b|em|i|u|p|br|table|tbody|tr|td)\b)[^>]+>/gi, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"').replace(/[ \t]{2,}/g, ' ')
    .trim();
  return result;
};

// ---------------------------------------------------------------------------
//  SHARED: Entry row (title left, date right)
// ---------------------------------------------------------------------------
const entryRow = (heading, range, bodyPt) =>
  '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed;margin:0;padding:0;">' +
  '<colgroup><col width="70%"/><col width="30%"/></colgroup>' +
  '<tbody><tr>' +
  '<td width="70%" style="width:70%;vertical-align:top;padding:0 8pt 0 0;font-size:' + bodyPt + 'pt;"><strong>' + heading + '</strong></td>' +
  '<td width="30%" style="width:30%;vertical-align:top;text-align:right;font-size:' + bodyPt + 'pt;font-weight:bold;color:#555555;white-space:nowrap;padding:0;">' + range + '</td>' +
  '</tr></tbody></table>';

// ---------------------------------------------------------------------------
//  SHARED: Render section body
// ---------------------------------------------------------------------------
const renderSectionBody = (sec, bodyPt, lh) => {
  let out = '';

  if (sec.type === 'summary') {
    out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;line-height:' + lh + ';margin:2pt 0;">' + esc(strip(sec.summary)) + '</p>';

  } else if (sec.type === 'experience') {
    (sec.experiences || []).forEach(function(exp) {
      const heading = [exp.jobTitle, exp.company, exp.city].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:8pt;">';
      out += entryRow(heading, esc(dr(exp.startDate, exp.endDate)), bodyPt);
      if (exp.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;line-height:' + lh + ';margin:3pt 0;">' + esc(strip(exp.description)) + '</p>';
      out += '</div>';
    });

  } else if (sec.type === 'education') {
    (sec.educations || []).forEach(function(edu) {
      const heading = [edu.degree, edu.institute || edu.school, edu.city].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:6pt;">';
      out += entryRow(heading, esc(dr(edu.startDate, edu.endDate)), bodyPt);
      if (edu.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;margin:3pt 0;">' + esc(strip(edu.description)) + '</p>';
      out += '</div>';
    });

  } else if (sec.type === 'certifications') {
    (sec.certifications || []).forEach(function(cert) {
      const heading = [cert.name, cert.organization].filter(Boolean).map(esc).join(', ');
      const start = cert.startDate || cert.startYear;
      const end = cert.endDate || cert.endYear;
      out += '<div style="margin-bottom:8pt;">';
      out += entryRow(heading, esc(dr(start, end)), bodyPt);
      if (cert.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;margin:3pt 0;">' + esc(strip(cert.description)) + '</p>';
      out += '</div>';
    });

  } else if (sec.type === 'courses') {
    (sec.courses || []).forEach(function(c) {
      const heading = [c.course, c.institution].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:4pt;">' + entryRow(heading, esc(dr(c.startDate, c.endDate)), bodyPt) + '</div>';
    });

  } else if (sec.type === 'internships') {
    (sec.internships || []).forEach(function(intern) {
      const heading = [intern.jobTitle, intern.employer, intern.city].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:6pt;">';
      out += entryRow(heading, esc(dr(intern.startDate, intern.endDate)), bodyPt);
      if (intern.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;margin:3pt 0;">' + esc(strip(intern.description)) + '</p>';
      out += '</div>';
    });

  } else if (sec.type === 'activities') {
    (sec.activities || []).forEach(function(act) {
      const heading = [act.functionTitle, act.employer, act.city].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:6pt;">';
      out += entryRow(heading, esc(dr(act.startDate, act.endDate)), bodyPt);
      if (act.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;margin:3pt 0;">' + esc(strip(act.description)) + '</p>';
      out += '</div>';
    });

  } else if (sec.type === 'skills') {
    const skills = sec.skills || [];
    const showLevel = sec.hideExperienceLevel === false;
    out += '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0;padding:0;"><tbody>';
    for (let i = 0; i < skills.length; i += 2) {
      const s1 = skills[i], s2 = skills[i + 1];
      const l1 = (showLevel && s1 && s1.level !== undefined) ? ' (' + skillLevels[s1.level] + ')' : '';
      const l2 = (showLevel && s2 && s2.level !== undefined) ? ' (' + skillLevels[s2.level] + ')' : '';
      out += '<tr>';
      out += '<td width="50%" style="width:50%;padding:2pt 4pt 2pt 0;font-size:' + bodyPt + 'pt;color:#1f2937;border-bottom:1px solid #e5e7eb;vertical-align:middle;">' + esc(s1 ? s1.name || '' : '') + esc(l1) + '</td>';
      out += '<td width="50%" style="width:50%;padding:2pt 0 2pt 4pt;font-size:' + bodyPt + 'pt;color:#1f2937;border-bottom:1px solid #e5e7eb;vertical-align:middle;">' + esc(s2 ? s2.name || '' : '') + esc(l2) + '</td>';
      out += '</tr>';
    }
    out += '</tbody></table>';

  } else if (sec.type === 'languages') {
    const langs = sec.languages || [];
    out += '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0;padding:0;"><tbody>';
    for (let i = 0; i < langs.length; i += 2) {
      const l1 = langs[i], l2 = langs[i + 1];
      const lb1 = l1 ? esc(l1.language) + (!sec.hideProficiency && l1.level ? ' (' + esc(l1.level) + ')' : '') : '';
      const lb2 = l2 ? esc(l2.language) + (!sec.hideProficiency && l2.level ? ' (' + esc(l2.level) + ')' : '') : '';
      out += '<tr>';
      out += '<td width="50%" style="width:50%;padding:2pt 4pt 2pt 0;font-size:' + bodyPt + 'pt;color:#1f2937;border-bottom:1px solid #e5e7eb;">' + lb1 + '</td>';
      out += '<td width="50%" style="width:50%;padding:2pt 0 2pt 4pt;font-size:' + bodyPt + 'pt;color:#1f2937;border-bottom:1px solid #e5e7eb;">' + lb2 + '</td>';
      out += '</tr>';
    }
    out += '</tbody></table>';

  } else if (sec.type === 'hobbies') {
    out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;margin:2pt 0;">' + esc(sec.hobbies) + '</p>';

  } else if (sec.type === 'honors') {
    (sec.items || []).forEach(function(item) {
      const heading = [item.title, item.issuer].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:8pt;">';
      out += entryRow(heading, esc(dr(item.startDate, item.endDate)), bodyPt);
      if (item.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;margin:3pt 0;">' + esc(strip(item.description)) + '</p>';
      out += '</div>';
    });

  } else if (sec.type === 'custom_simple') {
    const items = sec.items || [];
    const showLevel = sec.hideExperienceLevel === false;
    out += '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0;padding:0;"><tbody>';
    for (let i = 0; i < items.length; i += 2) {
      const getN = (it) => !it ? '' : (typeof it === 'object' ? (it.name || it.title || '') : String(it));
      const getLvl = (it) => (showLevel && it && typeof it === 'object' && it.level !== undefined) ? ' (' + skillLevels[it.level] + ')' : '';
      out += '<tr>';
      out += '<td width="50%" style="width:50%;padding:2pt 4pt 2pt 0;font-size:' + bodyPt + 'pt;color:#1f2937;">' + esc(getN(items[i])) + esc(getLvl(items[i])) + '</td>';
      out += '<td width="50%" style="width:50%;padding:2pt 0 2pt 4pt;font-size:' + bodyPt + 'pt;color:#1f2937;">' + esc(getN(items[i + 1])) + esc(getLvl(items[i + 1])) + '</td>';
      out += '</tr>';
    }
    out += '</tbody></table>';

  } else if (sec.type === 'custom') {
    (sec.items || []).forEach(function(item) {
      const heading = [item.title, item.city].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:6pt;">';
      out += entryRow(heading, esc(dr(item.startDate, item.endDate)), bodyPt);
      if (item.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;margin:3pt 0;">' + esc(strip(item.description)) + '</p>';
      out += '</div>';
    });
  }

  return out;
};

// ---------------------------------------------------------------------------
//  SHARED CSS base
// ---------------------------------------------------------------------------
const baseCss = (pf, sf, bp, bw, lh) =>
  'html,body{height:100%;}' +
  'body{font-family:' + fontStack(pf) + ';font-size:' + bp + 'pt;font-weight:' + bw + ';line-height:' + lh + ';color:#333333;margin:0;padding:0;}' +
  'strong{font-weight:bold;}a{color:#2b6cb0;text-decoration:none;}table{border-collapse:collapse;}td{vertical-align:top;}' +
  'p{font-size:' + bp + 'pt;color:#374151;line-height:' + lh + ';margin:2pt 0;padding:0;}' +
  'div{box-sizing:border-box;}';

// ===========================================================================
//  1. PrimeATS
// ===========================================================================
const buildPrimeATSDocxHtml = (params) => {
  const { formValues, sections, resumeSettings, themeColor } = params;
  const text = resumeSettings.text || {};
  const layout = resumeSettings.layout || {};
  const pf = text.primaryFont || 'Arial';
  const sf = text.secondaryFont || pf;
  const bp = text.body || 9;
  const bw = text.bodyWeight || 400;
  const lh = text.lineHeight || 1.5;
  const h1Pt = text.primaryHeading || 22;
  const h1W = text.primaryHeadingWeight || 700;
  const subPt = text.secondaryHeading || 11;
  const subW = text.secondaryHeadingWeight || 600;
  const secPt = text.sectionTitle || 10;
  const secW = text.sectionTitleWeight || 700;
  const color = themeColor || '#2c3e50';
  const tb = layout.topBottom || 20;
  const lr = layout.leftRight || 20;
  const bs = layout.betweenSections || 12;
  const btc = layout.betweenTitlesContent || 6;
  const hAlign = layout.headerAlignment || 'left';

  const secHeadStyle = 'color:' + color + ';border-top:1px solid ' + color + ';border-bottom:1px solid ' + color +
    ';font-family:' + fontStack(sf) + ';font-size:' + secPt + 'pt;font-weight:' + secW +
    ';text-transform:uppercase;letter-spacing:0.05em;padding:3pt 0;margin-top:' + bs + 'pt;margin-bottom:' + btc + 'pt;display:block;';

  const addressParts = [
    formValues.address,
    [formValues.city_state, formValues.postal_code].filter(Boolean).join(', '),
    formValues.country
  ].filter(Boolean).map(esc);
  const addressLine = addressParts.join(', ');
  const contactParts = [];
  if (formValues.email) contactParts.push(esc(formValues.email));
  if (formValues.phone) contactParts.push(esc(formValues.phone));
  if (formValues.linkedin) contactParts.push('LinkedIn');
  if (formValues.github) contactParts.push('GitHub');
  if (formValues.stackoverflow) contactParts.push('Stack Overflow');
  if (formValues.leetcode) contactParts.push('LeetCode');
  const contactLine = [addressLine, contactParts.join(' | ')].filter(Boolean).join(' | ');
  const personalParts = [formValues.dob, formValues.birth_place, formValues.nationality, formValues.driving_licence].filter(Boolean).map(esc);

  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume</title>';
  html += getFontLinks(pf, sf);
  html += '<style>' + baseCss(pf, sf, bp, bw, lh) + '</style></head><body>';
  html += '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;"><tbody>';
  html += '<tr><td style="padding:' + tb + 'pt ' + lr + 'pt;vertical-align:top;">';
  html += '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:8pt;"><tbody><tr>';
  html += '<td style="vertical-align:top;text-align:' + hAlign + ';">';
  html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';color:' + color + ';text-transform:uppercase;letter-spacing:-0.02em;line-height:1.1;">' + esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '') + '</div>';
  if (formValues.job_target) html += '<div style="font-size:' + subPt + 'pt;font-weight:' + subW + ';text-transform:uppercase;margin-top:2pt;">' + esc(formValues.job_target) + '</div>';
  if (contactLine) html += '<div style="font-size:' + bp + 'pt;color:#4b5563;margin-top:4pt;">' + contactLine + '</div>';
  if (personalParts.length) html += '<div style="font-size:' + bp + 'pt;color:#4b5563;margin-top:2pt;">' + personalParts.join(' | ') + '</div>';
  html += '</td></tr></tbody></table>';
  sections.forEach(function(sec) {
    const body = renderSectionBody(sec, bp, lh);
    if (!body) return;
    html += '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-top:' + bs + 'pt;"><tbody>';
    html += '<tr><td style="padding:0;vertical-align:top;">';
    html += '<div style="' + secHeadStyle + 'margin-top:0;">' + esc(sec.title) + '</div>';
    html += body;
    html += '</td></tr></tbody></table>';
  });
  html += '</td></tr></tbody></table>';
  html += '</body></html>';
  return html;
};

// ===========================================================================
//  2. CleanTemplate
// ===========================================================================
const buildCleanDocxHtml = (params) => {
  const { formValues, sections, resumeSettings } = params;
  const text = resumeSettings.text || {};
  const layout = resumeSettings.layout || {};
  const pf = text.primaryFont || 'Georgia';
  const sf = text.secondaryFont || 'Arial';
  const bp = text.body || 9;
  const bw = text.bodyWeight || 400;
  const lh = text.lineHeight || 1.5;
  const h1Pt = text.primaryHeading || 32;
  const h1W = text.primaryHeadingWeight || 900;
  const subPt = text.secondaryHeading || 10;
  const subW = text.secondaryHeadingWeight || 'normal';
  const secPt = text.sectionTitle || 10;
  const secW = text.sectionTitleWeight || 800;
  const tb = layout.topBottom || 28;
  const lr = layout.leftRight || 28;
  const bs = layout.betweenSections || 16;
  const btc = layout.betweenTitlesContent || 10;
  const hAlign = layout.headerAlignment || 'left';

  const SIDEBAR_TYPES = new Set(['skills', 'languages', 'hobbies']);
  const sidebarSections = sections.filter(s => SIDEBAR_TYPES.has(s.type));
  const mainSections = sections.filter(s => !SIDEBAR_TYPES.has(s.type));

  const sideSecHead = (title) =>
    '<div style="margin-bottom:' + btc + 'pt;">' +
    '<span style="font-family:' + fontStack(sf) + ';font-size:' + secPt + 'pt;font-weight:' + secW + ';text-transform:uppercase;letter-spacing:0.12em;color:#111;display:block;">' + esc(title) + '</span>' +
    '<div style="width:28pt;border-bottom:2pt solid #111;margin-top:3pt;"></div>' +
    '</div>';

  const mainSecHead = (title) =>
    '<div style="margin-bottom:' + btc + 'pt;margin-top:' + bs + 'pt;">' +
    '<span style="font-family:' + fontStack(sf) + ';font-size:' + secPt + 'pt;font-weight:' + secW + ';text-transform:uppercase;letter-spacing:0.12em;color:#111;display:block;">' + esc(title) + '</span>' +
    '<div style="width:28pt;border-bottom:2pt solid #111;margin-top:3pt;"></div>' +
    '</div>';

  const renderSidebarSkills = (sec) => {
    const showLevel = sec.hideExperienceLevel === false;
    let out = sideSecHead(sec.title);
    (sec.skills || []).forEach(sk => {
      out += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:4pt;">' + esc(sk.name);
      if (showLevel && sk.level !== undefined) out += ' <span style="color:#888;font-size:' + (bp - 1) + 'pt;">(' + skillLevels[sk.level] + ')</span>';
      out += '</p>';
    });
    return out;
  };

  const renderSidebarLangs = (sec) => {
    let out = sideSecHead(sec.title);
    (sec.languages || []).forEach(l => {
      out += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:4pt;">' + esc(l.language);
      if (!sec.hideProficiency && l.level) out += ' <span style="color:#888;">(' + esc(l.level) + ')</span>';
      out += '</p>';
    });
    return out;
  };

  const renderSidebarHobbies = (sec) => {
    if (!sec.hobbies) return '';
    return sideSecHead(sec.title) + '<p style="font-size:' + bp + 'pt;color:#333;white-space:pre-wrap;">' + esc(sec.hobbies) + '</p>';
  };

  const labelStyle = 'font-family:' + fontStack(sf) + ';font-size:7.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#111;display:block;margin-bottom:1pt;';
  const valueStyle = 'font-size:' + bp + 'pt;color:#333;display:block;margin-bottom:8pt;';

  let sidebarHtml = '';
  const hasContact = formValues.email || formValues.phone || formValues.address || formValues.city_state || formValues.dob || formValues.nationality || formValues.driving_licence;
  if (hasContact) {
    sidebarHtml += sideSecHead('Details');
    if (formValues.address || formValues.city_state) {
      sidebarHtml += '<span style="' + labelStyle + '">Address</span>';
      sidebarHtml += '<span style="' + valueStyle + '">' + [formValues.address, formValues.city_state, formValues.country].filter(Boolean).map(esc).join(', ') + '</span>';
    }
    if (formValues.phone) sidebarHtml += '<span style="' + labelStyle + '">Phone</span><span style="' + valueStyle + '">' + esc(formValues.phone) + '</span>';
    if (formValues.email) sidebarHtml += '<span style="' + labelStyle + '">Email</span><span style="' + valueStyle + ';word-break:break-all;">' + esc(formValues.email) + '</span>';
    if (formValues.driving_licence) sidebarHtml += '<span style="' + labelStyle + '">Driving Licence</span><span style="' + valueStyle + '">' + esc(formValues.driving_licence) + '</span>';
    if (formValues.nationality) sidebarHtml += '<span style="' + labelStyle + '">Nationality</span><span style="' + valueStyle + '">' + esc(formValues.nationality) + '</span>';
    if (formValues.dob) sidebarHtml += '<span style="' + labelStyle + '">Date of Birth</span><span style="' + valueStyle + '">' + esc(formValues.dob) + '</span>';
    if (formValues.birth_place) sidebarHtml += '<span style="' + labelStyle + '">Place of Birth</span><span style="' + valueStyle + '">' + esc(formValues.birth_place) + '</span>';
  }

  const links = [];
  if (formValues.linkedin) links.push('LinkedIn');
  if (formValues.github) links.push('GitHub');
  if (formValues.stackoverflow) links.push('Stack Overflow');
  if (formValues.leetcode) links.push('LeetCode');
  if (formValues.website) links.push('Portfolio');
  if (links.length) {
    sidebarHtml += sideSecHead('Links');
    links.forEach(l => { sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:3pt;">' + esc(l) + '</p>'; });
  }

  sidebarSections.forEach(sec => {
    if (sec.type === 'skills') sidebarHtml += renderSidebarSkills(sec);
    else if (sec.type === 'languages') sidebarHtml += renderSidebarLangs(sec);
    else if (sec.type === 'hobbies') sidebarHtml += renderSidebarHobbies(sec);
  });

  let mainHtml = '';
  mainSections.forEach(sec => {
    const body = renderSectionBody(sec, bp, lh);
    if (!body) return;
    mainHtml += mainSecHead(sec.title) + body;
  });

  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume</title>';
  html += getFontLinks(pf, sf);
  html += '<style>' + baseCss(pf, sf, bp, bw, lh) + '</style></head><body>';
  html += '<div style="padding:' + tb + 'pt ' + lr + 'pt ' + Math.round(tb * 0.5) + 'pt;text-align:' + hAlign + ';">';
  html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';text-transform:uppercase;letter-spacing:0.02em;color:#111;line-height:1.05;margin-bottom:6pt;">' + esc(formValues.first_name || '') + '<br/>' + esc(formValues.last_name || '') + '</div>';
  if (formValues.job_target) html += '<div style="font-size:' + subPt + 'pt;font-weight:' + subW + ';color:#888;">' + esc(formValues.job_target) + '</div>';
  html += '</div>';
  html += '<div style="border-top:1pt solid #ccc;margin:0 ' + lr + 'pt;"></div>';
  html += '<table width="100%" style="width:100%;border-collapse:collapse;table-layout:fixed;"><colgroup><col width="30%"/><col width="70%"/></colgroup><tbody><tr>';
  html += '<td width="30%" bgcolor="#ffffff" style="width:30%;vertical-align:top;padding:14pt 14pt 14pt 0pt;border-right:1pt solid #e0e0e0;">' + sidebarHtml + '</td>';
  html += '<td width="70%" bgcolor="#ffffff" style="width:70%;vertical-align:top;padding:14pt 0pt 14pt 16pt;">' + mainHtml + '</td>';
  html += '</tr></tbody></table></body></html>';
  return html;
};

// ===========================================================================
//  3. ClearTemplate
// ===========================================================================
const buildClearDocxHtml = (params) => {
  const { formValues, sections, resumeSettings, themeColor } = params;
  const text = resumeSettings.text || {};
  const layout = resumeSettings.layout || {};
  const pf = text.primaryFont || 'Arial';
  const sf = text.secondaryFont || pf;
  const bp = text.body || 9;
  const bw = text.bodyWeight || 400;
  const lh = text.lineHeight || 1.5;
  const h1Pt = text.primaryHeading || 20;
  const h1W = text.primaryHeadingWeight || 800;
  const subPt = text.secondaryHeading || 8.5;
  const subW = text.secondaryHeadingWeight || 600;
  const secPt = text.sectionTitle || 10;
  const secW = text.sectionTitleWeight || 700;
  const color = themeColor || '#94a3b8';
  const tb = layout.topBottom || 0;
  const lr = layout.leftRight || 0;
  const bs = layout.betweenSections || 10;
  const btc = layout.betweenTitlesContent || 5;

  const SIDEBAR_TYPES = new Set(['skills', 'languages', 'hobbies']);
  const sidebarSections = sections.filter(s => SIDEBAR_TYPES.has(s.type));
  const mainSections = sections.filter(s => !SIDEBAR_TYPES.has(s.type));

  const sideHeadStyle = 'color:' + color + ';border-top:1px solid ' + color + ';border-bottom:1px solid ' + color + ';font-family:' + fontStack(sf) + ';font-size:' + (secPt - 1) + 'pt;font-weight:' + secW + ';text-transform:uppercase;letter-spacing:0.05em;padding:2pt 0;margin-top:' + Math.max(bs - 2, 4) + 'pt;margin-bottom:' + Math.max(btc - 1, 2) + 'pt;display:block;';
  const mainHeadStyle = 'color:' + color + ';border-top:1px solid ' + color + ';border-bottom:1px solid ' + color + ';font-family:' + fontStack(sf) + ';font-size:' + secPt + 'pt;font-weight:' + secW + ';text-transform:uppercase;letter-spacing:0.05em;padding:2pt 0;margin-top:' + bs + 'pt;margin-bottom:' + btc + 'pt;display:block;';

  let sidebarHtml = '';
  const links = [];
  if (formValues.linkedin) links.push('LinkedIn');
  if (formValues.github) links.push('GitHub');
  if (formValues.stackoverflow) links.push('Stack Overflow');
  if (formValues.leetcode) links.push('LeetCode');
  if (formValues.website) links.push('Portfolio');
  if (links.length) {
    sidebarHtml += '<div style="' + sideHeadStyle + '">Links</div>';
    links.forEach(l => { sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:2pt;">' + esc(l) + '</p>'; });
  }

  const hasPD = formValues.dob || formValues.birth_place || formValues.nationality || formValues.driving_licence;
  if (hasPD) {
    sidebarHtml += '<div style="' + sideHeadStyle + '">Details</div>';
    if (formValues.dob) {
      sidebarHtml += '<div style="font-size:7.5pt;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:1pt;">Date of Birth</div>';
      sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:4pt;">' + esc(formValues.dob) + (formValues.birth_place ? ', ' + esc(formValues.birth_place) : '') + '</p>';
    }
    if (formValues.nationality) {
      sidebarHtml += '<div style="font-size:7.5pt;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:1pt;">Nationality</div>';
      sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:4pt;">' + esc(formValues.nationality) + '</p>';
    }
    if (formValues.driving_licence) {
      sidebarHtml += '<div style="font-size:7.5pt;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:1pt;">Driving License</div>';
      sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:4pt;">' + esc(formValues.driving_licence) + '</p>';
    }
  }

  sidebarSections.forEach(sec => {
    sidebarHtml += '<div style="' + sideHeadStyle + '">' + esc(sec.title) + '</div>';
    if (sec.type === 'skills') {
      const showLevel = sec.hideExperienceLevel === false;
      (sec.skills || []).forEach(sk => {
        sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:2pt;">' + esc(sk.name) + (showLevel && sk.level !== undefined ? ' (' + skillLevels[sk.level] + ')' : '') + '</p>';
      });
    } else if (sec.type === 'languages') {
      (sec.languages || []).forEach(l => {
        sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:2pt;">' + esc(l.language) + (!sec.hideProficiency && l.level ? ' (' + esc(l.level) + ')' : '') + '</p>';
      });
    } else if (sec.type === 'hobbies' && sec.hobbies) {
      sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#333;">' + esc(sec.hobbies) + '</p>';
    }
  });

  let mainHtml = '';
  mainSections.forEach(sec => {
    const body = renderSectionBody(sec, bp, lh);
    if (!body) return;
    mainHtml += '<div style="' + mainHeadStyle + '">' + esc(sec.title) + '</div>' + body;
  });

  const cityCountry = [formValues.city_state, formValues.country].filter(Boolean).join(', ');
  const contactInHeader = [cityCountry, formValues.phone ? esc(formValues.phone) : '', formValues.email ? esc(formValues.email) : ''].filter(Boolean).join(' | ');

  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume</title>';
  html += getFontLinks(pf, sf);
  html += '<style>' + baseCss(pf, sf, bp, bw, lh) + '</style></head><body>';
  html += '<table width="100%" style="width:100%;border-collapse:collapse;"><tbody>';
  html += '<tr><td bgcolor="' + color + '" style="background-color:' + color + ';padding:40pt ' + (18 + lr) + 'pt 13pt ' + (16 + lr) + 'pt;">';
  html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';color:#111;line-height:1.1;margin-bottom:3pt;">' + esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '') + '</div>';
  if (formValues.job_target) html += '<div style="font-size:' + subPt + 'pt;font-weight:' + subW + ';text-transform:uppercase;letter-spacing:0.1em;color:#333;margin-bottom:6pt;">' + esc(formValues.job_target) + '</div>';
  if (contactInHeader) html += '<div style="font-size:' + bp + 'pt;color:#333;">' + contactInHeader + '</div>';
  html += '</td></tr></tbody></table>';
  html += '<div style="padding-left:' + lr + 'pt;padding-right:' + lr + 'pt;">';
  html += '<table width="100%" style="width:100%;border-collapse:collapse;table-layout:fixed;"><colgroup><col width="32%"/><col width="68%"/></colgroup><tbody><tr>';
  html += '<td width="32%" bgcolor="#ffffff" style="width:32%;vertical-align:top;padding:10pt 14pt 14pt 0pt;border-right:1pt solid #e5e5e5;">' + sidebarHtml + '</td>';
  html += '<td width="68%" bgcolor="#ffffff" style="width:68%;vertical-align:top;padding:10pt 0pt 14pt 14pt;">' + mainHtml + '</td>';
  html += '</tr></tbody></table></div></body></html>';
  return html;
};

// ===========================================================================
//  4. CorporateTemplate
// ===========================================================================
const buildCorporateDocxHtml = (params) => {
  const { formValues, sections, resumeSettings } = params;
  const text = resumeSettings.text || {};
  const layout = resumeSettings.layout || {};
  const pf = text.primaryFont || 'Georgia';
  const sf = text.secondaryFont || 'Arial';
  const bp = text.body || 8.5;
  const bw = text.bodyWeight || 400;
  const lh = text.lineHeight || 1.5;
  const h1Pt = text.primaryHeading || 26;
  const h1W = text.primaryHeadingWeight || 700;
  const secPt = text.sectionTitle || 9;
  const secW = text.sectionTitleWeight || 700;
  const tb = layout.topBottom || 20;
  const lr = layout.leftRight || 20;
  const bs = layout.betweenSections || 14;
  const btc = layout.betweenTitlesContent || 6;

  const SIDEBAR_TYPES = new Set(['skills', 'languages', 'hobbies', 'core_competencies']);
  const sidebarSections = sections.filter(s => SIDEBAR_TYPES.has(s.type));
  const mainSections = sections.filter(s => !SIDEBAR_TYPES.has(s.type));

  const sideHead = (title) =>
    '<div style="text-align:center;margin-top:' + bs + 'pt;margin-bottom:6pt;">' +
    '<span style="font-family:' + fontStack(sf) + ';font-size:' + (secPt - 0.5) + 'pt;font-weight:' + secW + ';letter-spacing:0.18em;text-transform:uppercase;color:#111;">&#9702; ' + esc(title) + ' &#9702;</span>' +
    '</div>';

  const skillItem = (name) =>
    '<div style="text-align:center;margin-bottom:6pt;">' +
    '<div style="font-size:' + bp + 'pt;color:#333;margin-bottom:2pt;">' + esc(name) + '</div>' +
    '<div style="width:55%;border-bottom:1.5pt solid #111;margin:0 auto;"></div>' +
    '</div>';

  const mainHead = (title) =>
    '<div style="margin-top:' + bs + 'pt;margin-bottom:6pt;">' +
    '<span style="font-family:' + fontStack(sf) + ';font-size:' + secPt + 'pt;font-weight:' + secW + ';letter-spacing:0.14em;text-transform:uppercase;color:#111;">' + esc(title) + '</span>' +
    '<div style="border-bottom:0.75pt solid #e5e7eb;margin-top:3pt;"></div>' +
    '</div>';

  let sidebarHtml = '';
  const hasDetail = formValues.address || formValues.city_state || formValues.phone || formValues.email || formValues.dob || formValues.nationality || formValues.driving_licence;
  if (hasDetail) {
    sidebarHtml += sideHead('Details');
    const detailItems = [
      formValues.address,
      [formValues.city_state, formValues.postal_code].filter(Boolean).join(', '),
      formValues.country,
      formValues.phone,
      formValues.email,
      formValues.dob,
      formValues.nationality,
      formValues.driving_licence
    ].filter(Boolean);
    detailItems.forEach(d => { sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#374151;text-align:center;margin-bottom:2pt;">' + esc(d) + '</p>'; });
  }

  const links = [];
  if (formValues.linkedin) links.push('LinkedIn');
  if (formValues.github) links.push('GitHub');
  if (formValues.stackoverflow) links.push('Stack Overflow');
  if (formValues.leetcode) links.push('LeetCode');
  if (formValues.website) links.push('Portfolio');
  if (links.length) {
    sidebarHtml += sideHead('Links');
    links.forEach(l => { sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#374151;text-align:center;margin-bottom:3pt;">' + esc(l) + '</p>'; });
  }

  sidebarSections.forEach(sec => {
    sidebarHtml += sideHead(sec.title);
    if (sec.type === 'skills') {
      const showLevel = sec.hideExperienceLevel === false;
      (sec.skills || []).forEach(sk => {
        sidebarHtml += skillItem(sk.name + (showLevel && sk.level !== undefined ? ' (' + skillLevels[sk.level] + ')' : ''));
      });
    } else if (sec.type === 'languages') {
      (sec.languages || []).forEach(l => {
        sidebarHtml += skillItem(l.language + (!sec.hideProficiency && l.level ? ' \u2013 ' + l.level : ''));
      });
    } else if (sec.type === 'hobbies' && sec.hobbies) {
      sec.hobbies.split('\n').forEach(h => { sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#374151;text-align:center;">' + esc(h) + '</p>'; });
    } else if (sec.type === 'core_competencies') {
      const showLevel = sec.hideExperienceLevel === false;
      (sec.items || []).forEach(item => {
        const name = typeof item === 'object' ? (item.name || item.title || '') : String(item);
        const level = typeof item === 'object' ? (item.level ?? 2) : 2;
        sidebarHtml += skillItem(name + (showLevel ? ' (' + skillLevels[level] + ')' : ''));
      });
    }
  });

  let mainHtml = '';
  mainSections.forEach(sec => {
    const body = renderSectionBody(sec, bp, lh);
    if (!body) return;
    mainHtml += mainHead(sec.title) + body;
  });

  const subLine = [
    formValues.job_target ? esc(formValues.job_target) : '',
    [formValues.city_state, formValues.country].filter(Boolean).map(esc).join(', '),
    formValues.phone ? esc(formValues.phone) : ''
  ].filter(Boolean).join(' | ');

  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume</title>';
  html += getFontLinks(pf, sf);
  html += '<style>' + baseCss(pf, sf, bp, bw, lh) + '</style></head><body>';
  html += '<div style="text-align:center;padding:' + tb + 'pt ' + lr + 'pt ' + Math.round(tb * 0.6) + 'pt;border-bottom:1px solid #f3f4f6;">';
  html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';color:#111;line-height:1.1;margin-bottom:6pt;">' + esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '') + '</div>';
  if (subLine) html += '<div style="font-size:' + bp + 'pt;color:#6b7280;">' + subLine + '</div>';
  html += '</div>';
  html += '<table width="100%" style="width:100%;border-collapse:collapse;table-layout:fixed;"><colgroup><col width="30%"/><col width="70%"/></colgroup><tbody><tr>';
  html += '<td width="30%" bgcolor="#fafafa" style="width:30%;background-color:#fafafa;vertical-align:top;padding:4pt 12pt 14pt 14pt;border-right:1pt solid #f3f4f6;">' + sidebarHtml + '</td>';
  html += '<td width="70%" bgcolor="#ffffff" style="width:70%;vertical-align:top;padding:2pt 14pt 14pt 14pt;">' + mainHtml + '</td>';
  html += '</tr></tbody></table></body></html>';
  return html;
};

// ===========================================================================
//  5. Professional
// ===========================================================================
const buildProfessionalDocxHtml = (params) => {
  const { formValues, sections, resumeSettings, themeColor } = params;
  const text = resumeSettings.text || {};
  const layout = resumeSettings.layout || {};
  const pf = text.primaryFont || 'Arial';
  const sf = text.secondaryFont || pf;
  const bp = text.body || 9;
  const bw = text.bodyWeight || 400;
  const lh = text.lineHeight || 1.5;
  const h1Pt = text.primaryHeading || 22;
  const h1W = text.primaryHeadingWeight || 700;
  const subPt = text.secondaryHeading || 10;
  const subW = text.secondaryHeadingWeight || 600;
  const secPt = text.sectionTitle || 10;
  const secW = text.sectionTitleWeight || 700;
  const color = themeColor || '#2c3e50';
  const tb = layout.topBottom || 20;
  const lr = layout.leftRight || 20;
  const bs = layout.betweenSections || 12;
  const btc = layout.betweenTitlesContent || 6;

  const SIDEBAR_TYPES = new Set(['skills', 'hobbies', 'languages']);
  const sidebarSections = sections.filter(s => SIDEBAR_TYPES.has(s.type));
  const mainSections = sections.filter(s => !SIDEBAR_TYPES.has(s.type));

  const sideHeadStyle = 'font-size:' + secPt + 'pt;font-weight:' + secW + ';font-family:' + fontStack(sf) + ';color:#ffffff;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6pt;margin-top:14pt;display:block;';
  const mainHeadStyle = 'font-size:' + secPt + 'pt;font-weight:' + secW + ';font-family:' + fontStack(sf) + ';border-bottom:1px solid #e5e7eb;padding-bottom:3pt;margin-bottom:' + btc + 'pt;margin-top:' + bs + 'pt;color:#111827;text-transform:uppercase;letter-spacing:0.05em;display:block;';

  let sidebarHtml = '';
  sidebarHtml += '<div style="text-align:center;margin-bottom:12pt;">';
  sidebarHtml += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';color:#ffffff;line-height:1.2;">' + esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '') + '</div>';
  sidebarHtml += '<div style="width:24pt;height:1px;background-color:rgba(255,255,255,0.4);margin:6pt auto;"></div>';
  if (formValues.job_target) sidebarHtml += '<div style="font-size:' + subPt + 'pt;font-weight:' + subW + ';color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:0.1em;">' + esc(formValues.job_target) + '</div>';
  sidebarHtml += '</div>';

  const hasContact = formValues.email || formValues.phone || formValues.address || formValues.city_state || formValues.nationality || formValues.driving_licence;
  if (hasContact) {
    sidebarHtml += '<span style="' + sideHeadStyle + 'margin-top:0;">Details</span>';
    const items = [
      [formValues.address, formValues.city_state, formValues.country].filter(Boolean).join(', '),
      formValues.phone,
      formValues.email,
      formValues.linkedin ? 'LinkedIn' : '',
      formValues.github ? 'GitHub' : '',
      formValues.stackoverflow ? 'Stack Overflow' : '',
      formValues.leetcode ? 'LeetCode' : '',
      formValues.driving_licence ? 'Driving Licence: ' + formValues.driving_licence : '',
      formValues.nationality ? 'Nationality: ' + formValues.nationality : '',
      formValues.birth_place ? 'Place of Birth: ' + formValues.birth_place : '',
      formValues.dob ? 'DOB: ' + formValues.dob : ''
    ].filter(Boolean);
    items.forEach(d => { sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#d1d5db;margin-bottom:4pt;word-break:break-all;">' + esc(d) + '</p>'; });
  }

  sidebarSections.forEach(sec => {
    sidebarHtml += '<span style="' + sideHeadStyle + '">' + esc(sec.title) + '</span>';
    if (sec.type === 'skills') {
      const showLevel = sec.hideExperienceLevel === false;
      (sec.skills || []).forEach(sk => {
        const pct = ((sk.level ?? 3) + 1) * 20;
        sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#ffffff;margin-bottom:2pt;">' + esc(sk.name) + '</p>';
        if (showLevel) sidebarHtml += '<div style="width:100%;background-color:rgba(255,255,255,0.2);height:2pt;margin-bottom:6pt;"><div style="background-color:#ffffff;height:100%;width:' + pct + '%;"></div></div>';
        else sidebarHtml += '<div style="margin-bottom:6pt;"></div>';
      });
    } else if (sec.type === 'languages') {
      (sec.languages || []).forEach(l => {
        sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#ffffff;margin-bottom:8pt;">' + esc(l.language) + (!sec.hideProficiency && l.level ? ' (' + esc(l.level) + ')' : '') + '</p>';
      });
    } else if (sec.type === 'hobbies' && sec.hobbies) {
      sidebarHtml += '<p style="font-size:' + bp + 'pt;color:#d1d5db;">' + esc(sec.hobbies) + '</p>';
    }
  });

  let mainHtml = '';
  mainSections.forEach(sec => {
    const body = renderSectionBody(sec, bp, lh);
    if (!body) return;
    mainHtml += '<span style="' + mainHeadStyle + '">' + esc(sec.title) + '</span>' + body;
  });

  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume</title>';
  html += getFontLinks(pf, sf);
  html += '<style>' + baseCss(pf, sf, bp, bw, lh) + '</style></head><body>';
  html += '<table width="100%" style="width:100%;border-collapse:collapse;table-layout:fixed;min-height:297mm;"><colgroup><col width="35%"/><col width="65%"/></colgroup><tbody><tr>';
  html += '<td width="35%" bgcolor="' + color + '" style="width:35%;background-color:' + color + ';vertical-align:top;padding:30pt 14pt 20pt 14pt;">' + sidebarHtml + '</td>';
  html += '<td width="65%" bgcolor="#ffffff" style="width:65%;vertical-align:top;padding:20pt 20pt 20pt 18pt;">' + mainHtml + '</td>';
  html += '</tr></tbody></table></body></html>';
  return html;
};

// ===========================================================================
//  6. LinkedInPrime — FIXED
//     FIX 1: Profile photo — colored square with initials (Word can't clip img to circle)
//     FIX 2: Skills — 3-per-row bordered table matching pill preview layout
//     FIX 3: Experience — tight line-height/margins between title, company, date, city
// ===========================================================================
const buildLinkedInDocxHtml = (params) => {
  const { formValues, sections, resumeSettings, themeColor } = params;
  const text = resumeSettings.text || {};
  const layout = resumeSettings.layout || {};
  const pf = text.primaryFont || 'Arial';
  const sf = text.secondaryFont || pf;
  const bp = text.body || 9;
  const bw = text.bodyWeight || 400;
  const lh = text.lineHeight || 1.5;
  const h1Pt = text.primaryHeading || 22;
  const h1W = text.primaryHeadingWeight || 700;
  const secPt = text.sectionTitle || 10;
  const secW = text.sectionTitleWeight || 700;
  const color = themeColor || '#0a66c2';
  const tb = layout.topBottom || 20;
  const lr = layout.leftRight || 20;

  const bodyColor = '#374151';
  const mutedColor = '#6b7280';
  const subtleColor = '#9ca3af';

  const secHeadStyle =
    'color:#000000;font-family:' + fontStack(sf) +
    ';font-size:' + secPt + 'pt;font-weight:' + secW +
    ';text-transform:uppercase;letter-spacing:0.05em;' +
    'margin-bottom:6pt;display:block;border-bottom:1pt solid #e5e7eb;padding-bottom:4pt;';

  // Word-safe divider
  const divider =
    '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:8pt 0 6pt 0;">' +
    '<tbody><tr><td style="border-top:1pt solid #e5e7eb;font-size:0;line-height:0;padding:0;">&nbsp;</td></tr></tbody>' +
    '</table>';

  const fmt2 = (d) => {
    if (!d) return '';
    if (String(d).toLowerCase() === 'present') return 'Present';
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return String(d);
    return dt.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };

  const calcDur = (s, e) => {
    if (!s) return '';
    const sd = new Date(s);
    if (isNaN(sd.getTime())) return '';
    const ed = (!e || String(e).toLowerCase() === 'present') ? new Date() : new Date(e);
    if (isNaN(ed.getTime())) return '';
    const totalMonths = (ed.getFullYear() - sd.getFullYear()) * 12 + (ed.getMonth() - sd.getMonth());
    if (totalMonths <= 0) return '';
    const yrs = Math.floor(totalMonths / 12);
    const mos = totalMonths % 12;
    return [yrs > 0 && (yrs + ' yr' + (yrs > 1 ? 's' : '')), mos > 0 && (mos + ' mo' + (mos > 1 ? 's' : ''))].filter(Boolean).join(' ');
  };

  const dr2 = (s, e) => [fmt2(s), fmt2(e)].filter(Boolean).join(' \u2013 ');

  const findSec = (type) => (sections || []).filter(s => s.type === type);
  const summarySecs      = findSec('summary');
  const experienceSecs   = findSec('experience');
  const educationSecs    = findSec('education');
  const skillSecs        = findSec('skills');
  const langSecs         = findSec('languages');
  const coursesSecs      = findSec('courses');
  const honorsSecs       = findSec('honors');
  const customSimpleSecs = findSec('custom_simple');
  const customAdvSecs    = findSec('custom');

  let bodyHtml = '';

  // ── Summary ──────────────────────────────────────────────────────
  summarySecs.forEach(sec => {
    bodyHtml += '<div style="margin-bottom:10pt;">';
    bodyHtml += '<span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
    bodyHtml += '<div style="font-size:' + bp + 'pt;color:' + bodyColor + ';line-height:' + lh + ';">';
    bodyHtml += htmlToDocxSafe(sec.summary);
    bodyHtml += '</div></div>' + divider;
  });

  // ── Contact Information ────────────────────────────────────────────
  const addrParts = [formValues.address, formValues.city_state, formValues.country].filter(Boolean);
  const addressLine = addrParts.map(esc).join(', ');
  const hasContact = addressLine || formValues.email || formValues.phone || formValues.linkedin || formValues.website;
  if (hasContact) {
    bodyHtml += '<div style="margin-bottom:10pt;">';
    bodyHtml += '<span style="' + secHeadStyle + '">Contact Information</span>';
    if (addressLine) bodyHtml += '<p style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin:2pt 0;">' + addressLine + '</p>';
    if (formValues.email) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#2563eb;margin:2pt 0;">' + esc(formValues.email) + '</p>';
    if (formValues.phone) bodyHtml += '<p style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin:2pt 0;">' + esc(formValues.phone) + '</p>';
    if (formValues.linkedin) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#2563eb;margin:2pt 0;">' + esc(String(formValues.linkedin).replace(/^https?:\/\/(www\.)?/, '')) + '</p>';
    if (formValues.website) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#2563eb;margin:2pt 0;">' + esc(String(formValues.website).replace(/^https?:\/\/(www\.)?/, '')) + '</p>';
    bodyHtml += '</div>' + divider;
  }

  // ── Experience — FIX 3: use <div> not <p> to eliminate default paragraph gaps ──
  experienceSecs.forEach(sec => {
    bodyHtml += '<div style="margin-bottom:10pt;">';
    bodyHtml += '<span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
    (sec.experiences || []).forEach(exp => {
      const range = dr2(exp.startDate, exp.endDate);
      const dur = calcDur(exp.startDate, exp.endDate);
      bodyHtml += '<div style="margin-bottom:10pt;">';
      bodyHtml += '<div style="font-family:' + fontStack(sf) + ';font-size:' + (bp + 1) + 'pt;font-weight:700;color:#111;margin:0;padding:0;line-height:1.3;">' + esc(exp.jobTitle || '') + '</div>';
      if (exp.company) bodyHtml += '<div style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + esc(exp.company) + '</div>';
      if (range) bodyHtml += '<div style="font-size:' + (bp - 1) + 'pt;color:' + mutedColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + range + (dur ? ' \u00B7 ' + dur : '') + '</div>';
      if (exp.city) bodyHtml += '<div style="font-size:' + (bp - 1) + 'pt;color:' + subtleColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + esc(exp.city) + '</div>';
      if (exp.description) {
        bodyHtml += '<div style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin-top:4pt;">';
        bodyHtml += htmlToDocxSafe(exp.description);
        bodyHtml += '</div>';
      }
      bodyHtml += '</div>';
    });
    bodyHtml += '</div>' + divider;
  });

  // ── Education ─────────────────────────────────────────────────────
  educationSecs.forEach(sec => {
    bodyHtml += '<div style="margin-bottom:10pt;">';
    bodyHtml += '<span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
    (sec.educations || []).forEach(edu => {
      const range = dr2(edu.startDate, edu.endDate);
      bodyHtml += '<div style="margin-bottom:10pt;">';
      bodyHtml += '<div style="font-family:' + fontStack(sf) + ';font-size:' + (bp + 1) + 'pt;font-weight:700;color:#111;margin:0;padding:0;line-height:1.3;">' + esc(edu.institute || edu.school || '') + '</div>';
      if (edu.degree) bodyHtml += '<div style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + esc(edu.degree) + '</div>';
      if (range) bodyHtml += '<div style="font-size:' + (bp - 1) + 'pt;color:' + mutedColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + range + '</div>';
      if (edu.city) bodyHtml += '<div style="font-size:' + (bp - 1) + 'pt;color:' + subtleColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + esc(edu.city) + '</div>';
      if (edu.description) {
        bodyHtml += '<div style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin-top:4pt;">';
        bodyHtml += htmlToDocxSafe(edu.description);
        bodyHtml += '</div>';
      }
      bodyHtml += '</div>';
    });
    bodyHtml += '</div>' + divider;
  });

  // ── Skills — FIX 2: 3-per-row bordered pill table ────────────────────────
  skillSecs.forEach(sec => {
    bodyHtml += '<div style="margin-bottom:10pt;">';
    bodyHtml += '<span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
    const skills = sec.skills || [];
    if (skills.length > 0) {
      bodyHtml += '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">';
      bodyHtml += '<colgroup><col style="width:32%;"/><col style="width:2%;"/><col style="width:32%;"/><col style="width:2%;"/><col style="width:32%;"/></colgroup>';
      bodyHtml += '<tbody>';
      for (let i = 0; i < skills.length; i += 3) {
        const s0 = skills[i], s1 = skills[i + 1], s2 = skills[i + 2];
        const cellStyle = 'vertical-align:middle;padding:3pt 6pt;border:1pt solid #e5e7eb;background-color:#f9fafb;font-size:' + (bp - 1) + 'pt;color:' + bodyColor + ';font-family:' + fontStack(pf) + ';';
        const spacerStyle = 'width:2%;padding:0;border:none;background:transparent;font-size:0;line-height:0;';
        bodyHtml += '<tr>';
        bodyHtml += '<td style="' + cellStyle + '">' + (s0 ? esc(s0.name) : '&nbsp;') + '</td>';
        bodyHtml += '<td style="' + spacerStyle + '">&nbsp;</td>';
        bodyHtml += '<td style="' + cellStyle + '">' + (s1 ? esc(s1.name) : '&nbsp;') + '</td>';
        bodyHtml += '<td style="' + spacerStyle + '">&nbsp;</td>';
        bodyHtml += '<td style="' + cellStyle + '">' + (s2 ? esc(s2.name) : '&nbsp;') + '</td>';
        bodyHtml += '</tr>';
        bodyHtml += '<tr><td colspan="5" style="height:3pt;padding:0;border:none;font-size:0;line-height:0;">&nbsp;</td></tr>';
      }
      bodyHtml += '</tbody></table>';
    }
    bodyHtml += '</div>' + divider;
  });

  // ── Languages — 3-column ─────────────────────────────────────────
  langSecs.forEach(sec => {
    bodyHtml += '<div style="margin-bottom:10pt;">';
    bodyHtml += '<span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
    const langs = sec.languages || [];
    bodyHtml += '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tbody>';
    for (let i = 0; i < langs.length; i += 3) {
      bodyHtml += '<tr>';
      for (let j = 0; j < 3; j++) {
        const l = langs[i + j];
        bodyHtml += '<td style="padding-right:20pt;padding-bottom:5pt;vertical-align:top;font-size:' + bp + 'pt;">';
        if (l) {
          bodyHtml += '<span style="font-weight:600;color:#111;font-family:' + fontStack(pf) + ';">' + esc(l.language) + '</span>';
          if (!sec.hideProficiency && l.level) {
            bodyHtml += ' <span style="color:' + mutedColor + ';font-size:' + (bp - 1) + 'pt;">(' + esc(l.level) + ')</span>';
          }
        }
        bodyHtml += '</td>';
      }
      bodyHtml += '</tr>';
    }
    bodyHtml += '</tbody></table>';
    bodyHtml += '</div>' + divider;
  });

  // ── Courses ───────────────────────────────────────────────────────
  coursesSecs.forEach(sec => {
    bodyHtml += '<div style="margin-bottom:10pt;">';
    bodyHtml += '<span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
    (sec.courses || []).forEach(c => {
      const range = dr2(c.startDate, c.endDate);
      bodyHtml += '<div style="margin-bottom:8pt;">';
      bodyHtml += '<div style="font-family:' + fontStack(sf) + ';font-size:' + bp + 'pt;font-weight:600;color:#111;margin:0;padding:0;line-height:1.3;">' + esc(c.course || '') + '</div>';
      if (c.institution) bodyHtml += '<div style="font-size:' + (bp - 1) + 'pt;color:' + mutedColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + esc(c.institution) + '</div>';
      if (range) bodyHtml += '<div style="font-size:' + (bp - 1) + 'pt;color:' + subtleColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + range + '</div>';
      if (c.description) bodyHtml += '<div style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin-top:2pt;">' + htmlToDocxSafe(c.description) + '</div>';
      bodyHtml += '</div>';
    });
    bodyHtml += '</div>' + divider;
  });

  // ── Honors ────────────────────────────────────────────────────────
  honorsSecs.forEach(sec => {
    bodyHtml += '<div style="margin-bottom:10pt;">';
    bodyHtml += '<span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
    (sec.items || []).forEach(item => {
      const range = dr2(item.startDate, item.endDate);
      bodyHtml += '<div style="margin-bottom:8pt;">';
      bodyHtml += '<div style="font-family:' + fontStack(sf) + ';font-size:' + (bp + 1) + 'pt;font-weight:700;color:#111;margin:0;padding:0;line-height:1.3;">' + esc(item.title || '') + '</div>';
      if (item.issuer) bodyHtml += '<div style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + esc(item.issuer) + '</div>';
      if (range) bodyHtml += '<div style="font-size:' + (bp - 1) + 'pt;color:' + mutedColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + range + '</div>';
      if (item.description) bodyHtml += '<div style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin-top:4pt;">' + htmlToDocxSafe(item.description) + '</div>';
      bodyHtml += '</div>';
    });
    bodyHtml += '</div>' + divider;
  });

  // ── Custom Simple ──────────────────────────────────────────────────
  const lvlLabels = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];
  customSimpleSecs.forEach(sec => {
    bodyHtml += '<div style="margin-bottom:10pt;">';
    bodyHtml += '<span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
    (sec.items || []).forEach(item => {
      const name = typeof item === 'object' ? (item.name || item.title || '') : String(item);
      const levelName = (typeof item === 'object' && !sec.hideExperienceLevel && item.level != null) ? lvlLabels[item.level] : null;
      bodyHtml += '<p style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin:2pt 0;">' + esc(name);
      if (levelName) bodyHtml += ' <span style="color:' + subtleColor + ';font-size:' + (bp - 1) + 'pt;">(' + esc(levelName) + ')</span>';
      bodyHtml += '</p>';
    });
    bodyHtml += '</div>' + divider;
  });

  // ── Custom Advanced ───────────────────────────────────────────────
  customAdvSecs.forEach(sec => {
    bodyHtml += '<div style="margin-bottom:10pt;">';
    bodyHtml += '<span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
    (sec.items || []).forEach(item => {
      const range = dr2(item.startDate, item.endDate);
      bodyHtml += '<div style="margin-bottom:8pt;">';
      bodyHtml += '<div style="font-family:' + fontStack(sf) + ';font-size:' + (bp + 1) + 'pt;font-weight:700;color:#111;margin:0;padding:0;line-height:1.3;">' + esc(item.title || '') + '</div>';
      if (item.city) bodyHtml += '<div style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + esc(item.city) + '</div>';
      if (range) bodyHtml += '<div style="font-size:' + (bp - 1) + 'pt;color:' + mutedColor + ';margin:1pt 0 0 0;padding:0;line-height:1.3;">' + range + '</div>';
      if (item.description) bodyHtml += '<div style="font-size:' + bp + 'pt;color:' + bodyColor + ';margin-top:4pt;">' + htmlToDocxSafe(item.description) + '</div>';
      bodyHtml += '</div>';
    });
    bodyHtml += '</div>' + divider;
  });

  const initials = ((formValues.first_name || '').charAt(0) + (formValues.last_name || '').charAt(0)).toUpperCase();

  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume</title>';
  html += getFontLinks(pf, sf);
  html += '<style>' + baseCss(pf, sf, bp, bw, lh) + '</style></head><body>';

  // ── HEADER ──────────────────────────────────────────────────────────────────
  // Layout matches LinkedIn preview as closely as possible in DOCX:
  //   Row 1: Cover image — full content width (495pt), 100pt tall
  //   Row 2: Profile photo (circle) left + Name/title right, white bg
  //   Row 3: Bottom padding / divider
  //
  // DOCX margin = 720 twips = 50pt each side → content width = 595 - 100 = 495pt
  // Cover must bleed to full width so we use negative margins trick:
  // Outer wrapper table has NO padding (margin:0), then body sections add padding back.

  // 360 twips margin = 25pt each side → content width = 595 - 50 = 545pt
  const PAGE_W = 545;    // pt — usable content width
  const BANNER_H = 100;  // pt — cover banner height
  const PHOTO_SIZE = 72; // pt — profile photo size

  // ── HEADER TABLE ─────────────────────────────────────────────────────────
  // Use a single outer table with zero padding to get cover edge-to-edge.
  // Then a second row for profile photo + name with proper padding.
  // DOCX margins are set to 720 twips = 50pt. We override with 360 twips = 25pt
  // in the asBlob call so cover can use more width.
  // Table is 495pt wide (content area).

  html += '<table width="' + PAGE_W + '" cellpadding="0" cellspacing="0" ' +
    'style="width:' + PAGE_W + 'pt;border-collapse:collapse;table-layout:fixed;">';
  html += '<tbody>';

  // Row 1: Cover image full width
  html += '<tr>';
  if (formValues.coverImage) {
    html += '<td style="padding:0;line-height:0;font-size:0;" height="' + BANNER_H + '" width="' + PAGE_W + '">';
    html += '<img src="' + formValues.coverImage + '" ' +
      'width="' + PAGE_W + '" height="' + BANNER_H + '" ' +
      'style="width:' + PAGE_W + 'pt;height:' + BANNER_H + 'pt;display:block;" />';
    html += '</td>';
  } else {
    html += '<td bgcolor="' + color + '" width="' + PAGE_W + '" height="' + BANNER_H + '" ' +
      'style="background-color:' + color + ';padding:0;line-height:0;font-size:0;">&nbsp;</td>';
  }
  html += '</tr>';

  // Row 2: White bg — profile photo + name (LinkedIn preview style)
  html += '<tr>';
  html += '<td bgcolor="#ffffff" style="background-color:#ffffff;padding:14pt ' + lr + 'pt 10pt ' + lr + 'pt;">';
  html += '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">';
  html += '<tbody><tr>';

  // Profile photo — larger to match preview
  const PHOTO_DISPLAY = PHOTO_SIZE + 8; // 80pt display size
  html += '<td style="vertical-align:middle;padding-right:16pt;width:' + (PHOTO_DISPLAY + 16) + 'pt;">';
  if (formValues.profileImage) {
    html += '<img src="' + formValues.profileImage + '" ' +
      'width="' + PHOTO_DISPLAY + '" height="' + PHOTO_DISPLAY + '" ' +
      'style="width:' + PHOTO_DISPLAY + 'pt;height:' + PHOTO_DISPLAY + 'pt;display:block;' +
      'border:3pt solid #e5e7eb;border-radius:' + (PHOTO_DISPLAY/2) + 'pt;" />';
  } else {
    html += '<table width="' + PHOTO_DISPLAY + '" height="' + PHOTO_DISPLAY + '" cellpadding="0" cellspacing="0" ' +
      'style="width:' + PHOTO_DISPLAY + 'pt;height:' + PHOTO_DISPLAY + 'pt;' +
      'border-collapse:collapse;background-color:' + color + ';border:3pt solid #e5e7eb;' +
      'border-radius:' + (PHOTO_DISPLAY/2) + 'pt;">' +
      '<tbody><tr><td style="text-align:center;vertical-align:middle;' +
      'font-family:' + fontStack(sf) + ';font-size:24pt;font-weight:700;color:#ffffff;">' +
      esc(initials) + '</td></tr></tbody></table>';
  }
  html += '</td>';

  // Name + title — match preview font sizes
  html += '<td style="vertical-align:middle;">';
  html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + (h1Pt + 4) + 'pt;font-weight:' + h1W + ';color:#111;line-height:1.1;margin-bottom:5pt;">' +
    esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '') + '</div>';
  if (formValues.job_target) {
    html += '<div style="font-size:' + (bp + 2) + 'pt;color:' + mutedColor + ';margin:0;font-weight:400;">' + esc(formValues.job_target) + '</div>';
  }
  html += '</td>';
  html += '</tr></tbody></table>';
  html += '</td>';
  html += '</tr>';
  html += '</tbody></table>';

  // Divider after header
  html += '<div style="padding:0 ' + lr + 'pt;">' + divider + '</div>';

  // Body sections
  html += '<div style="padding:0 ' + lr + 'pt ' + tb + 'pt;">' + bodyHtml + '</div>';
  html += '</body></html>';
  return html;
};

// ===========================================================================
//  7. VividTemplate
// ===========================================================================
const buildVividDocxHtml = (params) => {
  const { formValues, sections, resumeSettings, themeColor } = params;
  const text = resumeSettings.text || {};
  const layout = resumeSettings.layout || {};
  const pf = text.primaryFont || 'Arial';
  const sf = text.secondaryFont || pf;
  const bp = text.body || 9;
  const bw = text.bodyWeight || 400;
  const lh = text.lineHeight || 1.5;
  const h1Pt = text.primaryHeading || 36;
  const h1W = text.primaryHeadingWeight || 900;
  const subPt = text.secondaryHeading || 9;
  const subW = text.secondaryHeadingWeight || 700;
  const secPt = text.sectionTitle || 10;
  const secW = text.sectionTitleWeight || 800;
  const headerBg = themeColor || '#ffeb3b';
  const tb = layout.topBottom || 28;
  const lr = layout.leftRight || 28;
  const bs = layout.betweenSections || 16;
  const btc = layout.betweenTitlesContent || 8;

  const secHead = (title) =>
    '<div style="display:inline-block;background-color:#111;color:#ffffff;font-family:' + fontStack(sf) + ';font-size:' + secPt + 'pt;font-weight:' + secW + ';letter-spacing:0.12em;text-transform:uppercase;padding:2pt 8pt;margin-bottom:' + btc + 'pt;">' + esc(title) + '</div><br/>';

  const entryBlock = (title, sub, dateStr, descHtml, bodyPt2) =>
    '<div style="margin-bottom:10pt;">' +
    '<span style="font-family:' + fontStack(sf) + ';font-size:' + (bodyPt2 + 1) + 'pt;font-weight:700;color:#111;">' + esc(title || '') + '</span>' +
    (sub ? '<span style="font-size:' + bodyPt2 + 'pt;color:#555;">' + esc(sub) + '</span>' : '') + '<br/>' +
    (dateStr ? '<span style="font-size:' + (bodyPt2 - 1) + 'pt;font-weight:600;color:#9ca3af;letter-spacing:0.06em;text-transform:uppercase;">' + esc(dateStr.toUpperCase()) + '</span><br/>' : '') +
    (descHtml ? '<p style="font-size:' + bodyPt2 + 'pt;color:#374151;line-height:' + lh + ';margin-top:4pt;">' + esc(strip(descHtml)) + '</p>' : '') +
    '</div>';

  const skillBar = (level, total) => {
    const filled = Math.max(1, Math.min(total, Math.round(level ?? 0) + 1));
    let bar = '<table width="100%" style="width:100%;border-collapse:separate;border-spacing:2pt 0;margin-top:2pt;margin-bottom:6pt;table-layout:fixed;"><tbody><tr>';
    for (let i = 0; i < total; i++) {
      bar += '<td style="background-color:' + (i < filled ? '#111' : '#e5e7eb') + ';height:4pt;padding:0;line-height:0;font-size:0;">&nbsp;</td>';
    }
    bar += '</tr></tbody></table>';
    return bar;
  };

  let bodyHtml = '';
  const links = [];
  if (formValues.linkedin) links.push('LinkedIn');
  if (formValues.github) links.push('GitHub');
  if (formValues.stackoverflow) links.push('Stack Overflow');
  if (formValues.leetcode) links.push('LeetCode');
  if (formValues.website) links.push('Portfolio');

  const hasPD = formValues.dob || formValues.birth_place || formValues.nationality || formValues.driving_licence;
  if (hasPD || links.length) {
    bodyHtml += '<table width="100%" style="width:100%;border-collapse:collapse;table-layout:fixed;margin-bottom:' + bs + 'pt;"><colgroup><col width="50%"/><col width="50%"/></colgroup><tbody><tr>';
    let detailsCell = '';
    if (hasPD) {
      detailsCell += secHead('Details');
      if (formValues.dob || formValues.birth_place) detailsCell += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:4pt;">' + [formValues.dob, formValues.birth_place].filter(Boolean).map(esc).join(', ') + '</p>';
      if (formValues.nationality) detailsCell += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:4pt;">' + esc(formValues.nationality) + '</p>';
      if (formValues.driving_licence) detailsCell += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:4pt;">' + esc(formValues.driving_licence) + '</p>';
    }
    let linksCell = '';
    if (links.length) {
      linksCell += secHead('Links');
      links.forEach(l => { linksCell += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:2pt;text-decoration:underline;">' + esc(l) + '</p>'; });
    }
    bodyHtml += '<td width="50%" style="width:50%;vertical-align:top;padding-right:20pt;">' + detailsCell + '</td>';
    bodyHtml += '<td width="50%" style="width:50%;vertical-align:top;">' + linksCell + '</td>';
    bodyHtml += '</tr></tbody></table>';
  }

  sections.forEach(function(sec) {
    bodyHtml += '<div style="margin-bottom:' + bs + 'pt;">';
    bodyHtml += secHead(sec.title);

    if (sec.type === 'summary') {
      bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;line-height:' + lh + ';text-align:justify;">' + esc(strip(sec.summary)) + '</p>';
    } else if (sec.type === 'experience') {
      (sec.experiences || []).forEach(exp => {
        const sub = [exp.company ? ', ' + exp.company : '', exp.city ? ', ' + exp.city : ''].join('');
        bodyHtml += entryBlock(exp.jobTitle, sub, dr(exp.startDate, exp.endDate), exp.description, bp);
      });
    } else if (sec.type === 'education') {
      (sec.educations || []).forEach(edu => {
        const sub = [edu.institute ? ', ' + edu.institute : '', edu.city ? ', ' + edu.city : ''].join('');
        bodyHtml += entryBlock(edu.degree, sub, dr(edu.startDate, edu.endDate), edu.description, bp);
      });
    } else if (sec.type === 'certifications') {
      (sec.certifications || []).forEach(cert => {
        const start = cert.startDate || cert.startYear;
        const end = cert.endDate || cert.endYear;
        bodyHtml += entryBlock(cert.name, cert.organization ? ', ' + cert.organization : '', dr(start, end), cert.description, bp);
      });
    } else if (sec.type === 'skills') {
      const showLevel = sec.hideExperienceLevel === false;
      (sec.skills || []).forEach(sk => {
        bodyHtml += '<div style="margin-bottom:4pt;font-family:' + fontStack(sf) + ';font-size:' + bp + 'pt;font-weight:700;color:#111;text-transform:uppercase;letter-spacing:0.04em;">' + esc(sk.name) + '</div>';
        if (showLevel) bodyHtml += skillBar(sk.level ?? 3, 5);
      });
    } else if (sec.type === 'languages') {
      bodyHtml += '<table width="100%" style="width:100%;border-collapse:collapse;table-layout:fixed;"><colgroup><col width="50%"/><col width="50%"/></colgroup><tbody>';
      const langs = sec.languages || [];
      for (let i = 0; i < langs.length; i += 2) {
        const l1 = langs[i], l2 = langs[i + 1];
        bodyHtml += '<tr>';
        bodyHtml += '<td width="50%" style="width:50%;vertical-align:top;padding-right:12pt;padding-bottom:6pt;">';
        if (l1) {
          bodyHtml += '<p style="font-size:' + bp + 'pt;font-weight:500;color:#111;margin-bottom:1pt;">' + esc(l1.language) + '</p>';
          if (!sec.hideProficiency) bodyHtml += skillBar(0, 6);
        }
        bodyHtml += '</td>';
        bodyHtml += '<td width="50%" style="width:50%;vertical-align:top;padding-bottom:6pt;">';
        if (l2) {
          bodyHtml += '<p style="font-size:' + bp + 'pt;font-weight:500;color:#111;margin-bottom:1pt;">' + esc(l2.language) + '</p>';
          if (!sec.hideProficiency) bodyHtml += skillBar(0, 6);
        }
        bodyHtml += '</td>';
        bodyHtml += '</tr>';
      }
      bodyHtml += '</tbody></table>';
    } else if (sec.type === 'hobbies') {
      (sec.hobbies || '').split('\n').forEach(h => { bodyHtml += '<p style="font-size:' + bp + 'pt;font-weight:500;color:#374151;">' + esc(h) + '</p>'; });
    } else if (sec.type === 'courses') {
      (sec.courses || []).forEach(c => {
        bodyHtml += entryBlock(c.course, c.institution ? ' - ' + c.institution : '', dr(c.startDate, c.endDate), null, bp);
      });
    } else if (sec.type === 'internships') {
      (sec.internships || []).forEach(intern => {
        const sub = [intern.employer ? ', ' + intern.employer : '', intern.city ? ', ' + intern.city : ''].join('');
        bodyHtml += entryBlock(intern.jobTitle, sub, dr(intern.startDate, intern.endDate), intern.description, bp);
      });
    } else if (sec.type === 'activities') {
      (sec.activities || []).forEach(act => {
        const sub = [act.employer ? ' - ' + act.employer : '', act.city ? ', ' + act.city : ''].join('');
        bodyHtml += entryBlock(act.functionTitle, sub, dr(act.startDate, act.endDate), act.description, bp);
      });
    } else if (sec.type === 'custom_simple') {
      const showLevel = sec.hideExperienceLevel === false;
      (sec.items || []).forEach(item => {
        const name = typeof item === 'object' ? (item.name || item.title || '') : String(item);
        const level = typeof item === 'object' ? (item.level ?? 2) : 2;
        bodyHtml += '<div style="margin-bottom:4pt;font-family:' + fontStack(sf) + ';font-size:' + bp + 'pt;font-weight:700;color:#111;text-transform:uppercase;">' + esc(name);
        if (showLevel) bodyHtml += ' <span style="font-weight:400;color:#6b7280;font-size:' + (bp - 0.5) + 'pt;text-transform:none;">(' + skillLevels[level] + ')</span>';
        bodyHtml += '</div>';
      });
    } else if (sec.type === 'custom') {
      (sec.items || []).forEach(item => {
        bodyHtml += entryBlock(item.title, item.city ? ', ' + item.city : '', dr(item.startDate, item.endDate), item.description, bp);
      });
    } else {
      const body = renderSectionBody(sec, bp, lh);
      if (body) bodyHtml += body;
    }

    bodyHtml += '</div>';
  });

  const cityCountry = [formValues.address, formValues.city_state, formValues.country].filter(Boolean).map(esc).join(', ');
  const contactLine2 = [formValues.email, formValues.phone].filter(Boolean).map(esc).join(' | ');

  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume</title>';
  html += getFontLinks(pf, sf);
  html += '<style>' + baseCss(pf, sf, bp, bw, lh) + '</style></head><body>';
  html += '<table width="100%" style="width:100%;border-collapse:collapse;background-color:' + headerBg + ';">';
  html += '<tbody><tr><td style="vertical-align:top;padding:40pt ' + (16 + lr) + 'pt 16pt;">';
  html += '<table width="100%" style="width:100%;border-collapse:collapse;"><tbody><tr>';
  html += '<td width="55%" style="width:55%;vertical-align:middle;">';
  html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';color:#111;line-height:1.0;letter-spacing:-0.01em;">';
  if (formValues.first_name) html += '<div>' + esc(formValues.first_name) + '</div>';
  if (formValues.last_name) html += '<div>' + esc(formValues.last_name) + '</div>';
  html += '</div></td>';
  html += '<td width="45%" style="width:45%;vertical-align:top;padding-left:12pt;">';
  if (formValues.job_target) html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + subPt + 'pt;font-weight:' + subW + ';text-transform:uppercase;letter-spacing:0.08em;color:#333;margin-bottom:6pt;">' + esc(formValues.job_target) + '</div>';
  if (cityCountry) html += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:1pt;">' + cityCountry + '</p>';
  if (contactLine2) html += '<p style="font-size:' + bp + 'pt;color:#333;font-weight:500;">' + contactLine2 + '</p>';
  html += '</td>';
  html += '</tr></tbody></table></td></tr></tbody></table>';
  html += '<div style="padding:' + tb + 'pt ' + lr + 'pt ' + tb + 'pt;">' + bodyHtml + '</div>';
  html += '</body></html>';
  return html;
};

// ===========================================================================
//  TEMPLATE ROUTER
// ===========================================================================
const buildDocxHtml = (params) => {
  const template = (params.resumeSettings && params.resumeSettings.theme && params.resumeSettings.theme.template)
    ? params.resumeSettings.theme.template
    : 'ats';

  switch (template) {
    case 'clean':        return buildCleanDocxHtml(params);
    case 'clear':        return buildClearDocxHtml(params);
    case 'corporate':    return buildCorporateDocxHtml(params);
    case 'professional': return buildProfessionalDocxHtml(params);
    case 'linkedin':     return buildLinkedInDocxHtml(params);
    case 'vivid':        return buildVividDocxHtml(params);
    case 'ats':
    default:             return buildPrimeATSDocxHtml(params);
  }
};

// ===========================================================================
//  MAIN HOOK
// ===========================================================================
export const useDownload = ({ componentRef, formValues, resumeSettings, sections, themeColor, resumeType }) => {
  const dispatch = useDispatch();

  const handleDownloadPDF = async () => {
    try {
      const decreaseResult = await dispatch(decreaseSubscriptionCount(resumeType));
      if (decreaseSubscriptionCount.rejected.match(decreaseResult)) {
        toast.error("Download limit reached. Please upgrade your plan.");
        return;
      }
      const resumeEl = componentRef.current;
      if (!resumeEl) return;

      const cloned = resumeEl.cloneNode(true);
      cloned.querySelectorAll('*').forEach(el => {
        const s = el.style;
        const cn = typeof el.className === 'string' ? el.className : '';
        if (
          s.overflow === 'auto' || s.overflow === 'scroll' ||
          s.overflowY === 'auto' || s.overflowY === 'scroll' ||
          cn.includes('overflow-y-auto') || cn.includes('overflow-y-scroll') ||
          cn.includes('h-screen') || cn.includes('hide-scrollbar')
        ) {
          s.overflow = 'visible';
          s.overflowY = 'visible';
          s.height = 'auto';
          s.maxHeight = 'none';
        }
      });

      const primaryFont = resumeSettings && resumeSettings.text ? resumeSettings.text.primaryFont : 'Arial';
      const secondaryFont = resumeSettings && resumeSettings.text ? resumeSettings.text.secondaryFont : primaryFont;
      const template = (resumeSettings && resumeSettings.theme && resumeSettings.theme.template)
        ? resumeSettings.theme.template : '';

      const fullHtml = [
        '<!DOCTYPE html><html lang="en"><head>',
        '<meta charset="UTF-8"/>',
        getFontLinks(primaryFont, secondaryFont),
        '<style>',
        '  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; font-family: ' + fontStack(primaryFont) + ' !important; }',
        '  body { margin: 0; padding: 0; font-family: ' + fontStack(primaryFont) + '; }',
        '  @page { size: A4; margin: 0; }',
        '  table { border-collapse: collapse; }',
        '  td { vertical-align: top; }',
        '  a { color: inherit; text-decoration: none; }',
        '  ul { list-style-type: disc; padding-left: 1.2rem; margin: 0.25rem 0; }',
        '  ol { list-style-type: decimal; padding-left: 1.2rem; margin: 0.25rem 0; }',
        '  li { margin-bottom: 0.15rem; }',
        '  p { margin: 0.1rem 0; }',
        template === 'professional'
          ? '  #professional-resume-wrapper { background: linear-gradient(to right, ' + (themeColor || '#2c3e50') + ' 35%, #ffffff 35%) !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }'
          : '',
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

  // Convert any image src to base64 data URI for html-docx-js embedding.
  // html-docx-js only supports data:image/... base64 — external URLs are ignored.
  const toBase64 = async (src) => {
    if (!src) return null;
    if (src.startsWith('data:')) return src;

    const blobToBase64 = (blob) => new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(blob);
    });

    // blob: URL — direct fetch, no CORS issue
    if (src.startsWith('blob:')) {
      try {
        const blob = await fetch(src).then(r => r.blob());
        return await blobToBase64(blob);
      } catch (e) { return null; }
    }

    // http/https — try fetch with cors
    try {
      const resp = await fetch(src, { mode: 'cors', credentials: 'include' });
      if (resp.ok) {
        const blob = await resp.blob();
        return await blobToBase64(blob);
      }
    } catch (_) {}

    // Canvas fallback
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || 200;
          canvas.height = img.naturalHeight || 200;
          canvas.getContext('2d').drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.92));
        } catch (e) { resolve(null); }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  };

  // Extract base64 from a rendered <img> element already in the DOM.
  // Since the browser has already loaded the image, we can draw it to canvas
  // without any CORS issues — the pixel data is already available.
  const imgElementToBase64 = (imgEl) => {
    if (!imgEl || !imgEl.complete || !imgEl.naturalWidth) return null;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = imgEl.naturalWidth;
      canvas.height = imgEl.naturalHeight;
      canvas.getContext('2d').drawImage(imgEl, 0, 0);
      return canvas.toDataURL('image/jpeg', 0.92);
    } catch (e) {
      return null;
    }
  };

  const handleDownloadDocx = async () => {
    try {
      const decreaseResult = await dispatch(decreaseSubscriptionCount(resumeType));
      if (decreaseSubscriptionCount.rejected.match(decreaseResult)) {
        toast.error("Download limit reached. Please upgrade your plan.");
        return;
      }

      // Use pre-saved base64 fields (set by LinkedInPersonalDetails on crop save).
      // These are stored as profileImageBase64 / coverImageBase64 in formValues.
      // This avoids all CORS issues since the base64 was captured before server upload.
      let profileBase64 = formValues.profileImageBase64 || null;
      let coverBase64 = formValues.coverImageBase64 || null;

      // Fallback: try DOM canvas extraction (works if image is same-origin)
      if (!profileBase64 || !coverBase64) {
        if (componentRef && componentRef.current) {
          const allImgs = componentRef.current.querySelectorAll('img');
          allImgs.forEach((imgEl) => {
            const alt = imgEl.getAttribute('alt') || '';
            if (!profileBase64 && alt === 'Profile') {
              profileBase64 = imgElementToBase64(imgEl);
            }
            if (!coverBase64 && alt === 'Cover') {
              coverBase64 = imgElementToBase64(imgEl);
            }
          });
        }
      }

      const enrichedFormValues = {
        ...formValues,
        profileImage: profileBase64,
        coverImage: coverBase64,
      };

      const fullHtml = buildDocxHtml({ formValues: enrichedFormValues, sections, resumeSettings, themeColor });

      // LinkedIn template: use minimal margins so cover image fills the page width
      const template = (resumeSettings && resumeSettings.theme && resumeSettings.theme.template)
        ? resumeSettings.theme.template : 'ats';
      const docxMargins = template === 'linkedin'
        ? { top: 360, right: 360, bottom: 720, left: 360 }
        : { top: 720, right: 720, bottom: 720, left: 720 };

      const converted = htmlDocx.asBlob(fullHtml, {
        orientation: 'portrait',
        margins: docxMargins,
      });

      saveAs(
        converted,
        (formValues.first_name || 'resume') + '_' + (formValues.last_name || '') + '.docx'
      );
    } catch (err) {
      console.error('DOCX download error:', err);
      toast.error("Something went wrong.");
    }
  };

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