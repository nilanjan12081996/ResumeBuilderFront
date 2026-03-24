

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generatePDF, generateDocx, decreaseSubscriptionCount } from '../reducers/ResumeSlice';
import { toast } from 'react-toastify';

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
// Two-column sidebar templates
const SIDEBAR_TEMPLATES = new Set(['professional', 'clean', 'clear', 'corporate']);
// Single-column templates
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
//  SHARED: Entry row (title left, date right) — Word-safe table
// ---------------------------------------------------------------------------
const entryRow = (heading, range, bodyPt) =>
  '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed;margin:0;padding:0;">' +
  '<colgroup><col width="70%"/><col width="30%"/></colgroup>' +
  '<tbody><tr>' +
  '<td width="70%" style="width:70%;vertical-align:top;padding:0 8pt 0 0;font-size:' + bodyPt + 'pt;"><strong>' + heading + '</strong></td>' +
  '<td width="30%" style="width:30%;vertical-align:top;text-align:right;font-size:' + bodyPt + 'pt;font-weight:bold;color:#555555;white-space:nowrap;padding:0;">' + range + '</td>' +
  '</tr></tbody></table>';

// ---------------------------------------------------------------------------
//  SHARED: Render section body (used by most templates)
// ---------------------------------------------------------------------------
const renderSectionBody = (sec, bodyPt, lh) => {
  let out = '';

  if (sec.type === 'summary') {
    out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;line-height:' + lh + ';margin:2pt 0;">' + esc(strip(sec.summary)) + '</p>';

  } else if (sec.type === 'experience') {
    (sec.experiences || []).forEach(function (exp) {
      const heading = [exp.jobTitle, exp.company, exp.city].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:8pt;">';
      out += entryRow(heading, esc(dr(exp.startDate, exp.endDate)), bodyPt);
      if (exp.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;line-height:' + lh + ';margin:3pt 0;">' + esc(strip(exp.description)) + '</p>';
      out += '</div>';
    });

  } else if (sec.type === 'education') {
    (sec.educations || []).forEach(function (edu) {
      const heading = [edu.degree, edu.institute || edu.school, edu.city].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:6pt;">';
      out += entryRow(heading, esc(dr(edu.startDate, edu.endDate)), bodyPt);
      if (edu.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;margin:3pt 0;">' + esc(strip(edu.description)) + '</p>';
      out += '</div>';
    });

  } else if (sec.type === 'certifications') {
    (sec.certifications || []).forEach(function (cert) {
      const heading = [cert.name, cert.organization].filter(Boolean).map(esc).join(', ');
      const start = cert.startDate || cert.startYear;
      const end = cert.endDate || cert.endYear;
      out += '<div style="margin-bottom:8pt;">';
      out += entryRow(heading, esc(dr(start, end)), bodyPt);
      if (cert.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;margin:3pt 0;">' + esc(strip(cert.description)) + '</p>';
      out += '</div>';
    });

  } else if (sec.type === 'courses') {
    (sec.courses || []).forEach(function (c) {
      const heading = [c.course, c.institution].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:4pt;">' + entryRow(heading, esc(dr(c.startDate, c.endDate)), bodyPt) + '</div>';
    });

  } else if (sec.type === 'internships') {
    (sec.internships || []).forEach(function (intern) {
      const heading = [intern.jobTitle, intern.employer, intern.city].filter(Boolean).map(esc).join(', ');
      out += '<div style="margin-bottom:6pt;">';
      out += entryRow(heading, esc(dr(intern.startDate, intern.endDate)), bodyPt);
      if (intern.description) out += '<p style="font-size:' + bodyPt + 'pt;color:#374151;margin:3pt 0;">' + esc(strip(intern.description)) + '</p>';
      out += '</div>';
    });

  } else if (sec.type === 'activities') {
    (sec.activities || []).forEach(function (act) {
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
    (sec.items || []).forEach(function (item) {
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
    (sec.items || []).forEach(function (item) {
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
//  1. PrimeATS — Single column, skills in 2-col table, color section headings
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

  // Section heading style: color + top/bottom border
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

  // Use outer table for reliable Word margin/padding
  html += '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;"><tbody>';
  html += '<tr><td style="padding:' + tb + 'pt ' + lr + 'pt;vertical-align:top;">';

  // Header
  html += '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-bottom:8pt;"><tbody><tr>';
  html += '<td style="vertical-align:top;text-align:' + hAlign + ';">';
  html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';color:' + color + ';text-transform:uppercase;letter-spacing:-0.02em;line-height:1.1;">' + esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '') + '</div>';
  if (formValues.job_target) html += '<div style="font-size:' + subPt + 'pt;font-weight:' + subW + ';text-transform:uppercase;margin-top:2pt;">' + esc(formValues.job_target) + '</div>';
  if (contactLine) html += '<div style="font-size:' + bp + 'pt;color:#4b5563;margin-top:4pt;">' + contactLine + '</div>';
  if (personalParts.length) html += '<div style="font-size:' + bp + 'pt;color:#4b5563;margin-top:2pt;">' + personalParts.join(' | ') + '</div>';
  html += '</td></tr></tbody></table>';

  // Sections — each wrapped in a full-width table row for consistent alignment
  sections.forEach(function (sec) {
    const body = renderSectionBody(sec, bp, lh);
    if (!body) return;
    html += '<table width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin-top:' + bs + 'pt;"><tbody>';
    html += '<tr><td style="padding:0;vertical-align:top;">';
    html += '<div style="' + secHeadStyle + 'margin-top:0;">' + esc(sec.title) + '</div>';
    html += body;
    html += '</td></tr>';
    html += '</tbody></table>';
  });

  html += '</td></tr></tbody></table>';
  html += '</body></html>';
  return html;
};

// ===========================================================================
//  2. CleanTemplate — Two col (30% sidebar / 70% main), sidebar: skills/lang/hobbies
//     Header: name (first line break last), job title, horizontal rule above columns
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

  // Section heading: bold uppercase + short 28pt underline
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

  // Sidebar: skills list
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

  // Contact info for sidebar
  const labelStyle = 'font-family:' + fontStack(sf) + ';font-size:7.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#111;display:block;margin-bottom:1pt;';
  const valueStyle = 'font-size:' + bp + 'pt;color:#333;display:block;margin-bottom:8pt;';

  let sidebarHtml = '';
  // Details section
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

  // Links
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

  // Sidebar sections
  sidebarSections.forEach(sec => {
    if (sec.type === 'skills') sidebarHtml += renderSidebarSkills(sec);
    else if (sec.type === 'languages') sidebarHtml += renderSidebarLangs(sec);
    else if (sec.type === 'hobbies') sidebarHtml += renderSidebarHobbies(sec);
  });

  // Main content
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

  // Two-column body
  html += '<table width="100%" style="width:100%;border-collapse:collapse;table-layout:fixed;"><colgroup><col width="30%"/><col width="70%"/></colgroup><tbody><tr>';
  html += '<td width="30%" bgcolor="#ffffff" style="width:30%;vertical-align:top;padding:' + Math.round(tb * 0.5) + 'pt ' + Math.round(lr * 0.6) + 'pt ' + tb + 'pt ' + lr + 'pt;border-right:1pt solid #e0e0e0;">' + sidebarHtml + '</td>';
  html += '<td width="70%" bgcolor="#ffffff" style="width:70%;vertical-align:top;padding:' + Math.round(tb * 0.5) + 'pt ' + lr + 'pt ' + tb + 'pt ' + Math.round(lr * 0.7) + 'pt;">' + mainHtml + '</td>';
  html += '</tr></tbody></table></body></html>';
  return html;
};

// ===========================================================================
//  3. ClearTemplate — Two col, full-width colored header (like clean but colored header)
//     Sidebar: light bg, main: white
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

  // Section headings
  const sideHeadStyle = 'color:' + color + ';border-top:1px solid ' + color + ';border-bottom:1px solid ' + color + ';font-family:' + fontStack(sf) + ';font-size:' + (secPt - 1) + 'pt;font-weight:' + secW + ';text-transform:uppercase;letter-spacing:0.05em;padding:2pt 0;margin-top:' + Math.max(bs - 2, 4) + 'pt;margin-bottom:' + Math.max(btc - 1, 2) + 'pt;display:block;';
  const mainHeadStyle = 'color:' + color + ';border-top:1px solid ' + color + ';border-bottom:1px solid ' + color + ';font-family:' + fontStack(sf) + ';font-size:' + secPt + 'pt;font-weight:' + secW + ';text-transform:uppercase;letter-spacing:0.05em;padding:2pt 0;margin-top:' + bs + 'pt;margin-bottom:' + btc + 'pt;display:block;';

  // Sidebar content
  let sidebarHtml = '';
  // Links
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

  // Personal details
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

  // Main content
  let mainHtml = '';
  mainSections.forEach(sec => {
    const body = renderSectionBody(sec, bp, lh);
    if (!body) return;
    mainHtml += '<div style="' + mainHeadStyle + '">' + esc(sec.title) + '</div>' + body;
  });

  // Full-width colored header
  const cityCountry = [formValues.city_state, formValues.country].filter(Boolean).join(', ');
  const contactInHeader = [cityCountry, formValues.phone ? esc(formValues.phone) : '', formValues.email ? esc(formValues.email) : ''].filter(Boolean).join(' | ');

  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume</title>';
  html += getFontLinks(pf, sf);
  html += '<style>' + baseCss(pf, sf, bp, bw, lh) + '</style></head><body>';

  // Colored header row spanning full width
  html += '<table width="100%" style="width:100%;border-collapse:collapse;"><tbody>';
  html += '<tr><td bgcolor="' + color + '" style="background-color:' + color + ';padding:40pt ' + (18 + lr) + 'pt 13pt ' + (16 + lr) + 'pt;">';
  html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';color:#111;line-height:1.1;margin-bottom:3pt;">' + esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '') + '</div>';
  if (formValues.job_target) html += '<div style="font-size:' + subPt + 'pt;font-weight:' + subW + ';text-transform:uppercase;letter-spacing:0.1em;color:#333;margin-bottom:6pt;">' + esc(formValues.job_target) + '</div>';
  if (contactInHeader) html += '<div style="font-size:' + bp + 'pt;color:#333;">' + contactInHeader + '</div>';
  html += '</td></tr></tbody></table>';

  // Two-column body
  html += '<div style="padding-left:' + lr + 'pt;padding-right:' + lr + 'pt;">';
  html += '<table width="100%" style="width:100%;border-collapse:collapse;table-layout:fixed;"><colgroup><col width="32%"/><col width="68%"/></colgroup><tbody><tr>';
  html += '<td width="32%" bgcolor="#ffffff" style="width:32%;vertical-align:top;padding:' + tb + 'pt 14pt 14pt 0pt;border-right:1pt solid #e5e5e5;">' + sidebarHtml + '</td>';
  html += '<td width="68%" bgcolor="#ffffff" style="width:68%;vertical-align:top;padding:' + tb + 'pt 0pt 14pt 14pt;">' + mainHtml + '</td>';
  html += '</tr></tbody></table></div></body></html>';
  return html;
};

// ===========================================================================
//  4. CorporateTemplate — Two col (30/70), centered header, light sidebar bg
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

  // Sidebar heading: centered ◦ TITLE ◦
  const sideHead = (title) =>
    '<div style="text-align:center;margin-top:' + bs + 'pt;margin-bottom:6pt;">' +
    '<span style="font-family:' + fontStack(sf) + ';font-size:' + (secPt - 0.5) + 'pt;font-weight:' + secW + ';letter-spacing:0.18em;text-transform:uppercase;color:#111;">&#9702; ' + esc(title) + ' &#9702;</span>' +
    '</div>';

  // Skill item: centered name + short underline
  const skillItem = (name) =>
    '<div style="text-align:center;margin-bottom:6pt;">' +
    '<div style="font-size:' + bp + 'pt;color:#333;margin-bottom:2pt;">' + esc(name) + '</div>' +
    '<div style="width:55%;border-bottom:1.5pt solid #111;margin:0 auto;"></div>' +
    '</div>';

  // Main heading with icon placeholder + bottom border
  const mainHead = (title) =>
    '<div style="margin-top:' + bs + 'pt;margin-bottom:6pt;">' +
    '<span style="font-family:' + fontStack(sf) + ';font-size:' + secPt + 'pt;font-weight:' + secW + ';letter-spacing:0.14em;text-transform:uppercase;color:#111;">' + esc(title) + '</span>' +
    '<div style="border-bottom:0.75pt solid #e5e7eb;margin-top:3pt;"></div>' +
    '</div>';

  // Sidebar content
  let sidebarHtml = '';

  // Details
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

  // Links
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
        sidebarHtml += skillItem(l.language + (!sec.hideProficiency && l.level ? ' – ' + l.level : ''));
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

  // Main content
  let mainHtml = '';
  mainSections.forEach(sec => {
    const body = renderSectionBody(sec, bp, lh);
    if (!body) return;
    mainHtml += mainHead(sec.title) + body;
  });

  // Header: centered
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

  // Two-column body
  html += '<table width="100%" style="width:100%;border-collapse:collapse;table-layout:fixed;"><colgroup><col width="30%"/><col width="70%"/></colgroup><tbody><tr>';
  html += '<td width="30%" bgcolor="#fafafa" style="width:30%;background-color:#fafafa;vertical-align:top;padding:4pt 12pt ' + tb + 'pt ' + lr + 'pt;border-right:1pt solid #f3f4f6;">' + sidebarHtml + '</td>';
  html += '<td width="70%" bgcolor="#ffffff" style="width:70%;vertical-align:top;padding:2pt ' + lr + 'pt ' + tb + 'pt 14pt;">' + mainHtml + '</td>';
  html += '</tr></tbody></table></body></html>';
  return html;
};

// ===========================================================================
//  5. Professional — Two col (35% colored sidebar / 65% main)
//     Sidebar: white text on themeColor bg; Main: standard sections
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

  // Sidebar content
  let sidebarHtml = '';

  // Name + title + details in sidebar
  sidebarHtml += '<div style="text-align:center;margin-bottom:12pt;">';
  sidebarHtml += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';color:#ffffff;line-height:1.2;">' + esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '') + '</div>';
  sidebarHtml += '<div style="width:24pt;height:1px;background-color:rgba(255,255,255,0.4);margin:6pt auto;"></div>';
  if (formValues.job_target) sidebarHtml += '<div style="font-size:' + subPt + 'pt;font-weight:' + subW + ';color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:0.1em;">' + esc(formValues.job_target) + '</div>';
  sidebarHtml += '</div>';

  // Contact
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

  // Main content
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
  html += '<td width="35%" bgcolor="' + color + '" style="width:35%;background-color:' + color + ';vertical-align:top;padding:30pt 14pt;">' + sidebarHtml + '</td>';
  html += '<td width="65%" bgcolor="#ffffff" style="width:65%;vertical-align:top;padding:' + tb + 'pt ' + lr + 'pt;">' + mainHtml + '</td>';
  html += '</tr></tbody></table></body></html>';
  return html;
};

// ===========================================================================
//  6. LinkedInPrime — Single col, LinkedIn style header (colored banner),
//     skills as pills, experience with duration
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

  const secHeadStyle = 'color:#000000;font-family:' + fontStack(sf) + ';font-size:' + secPt + 'pt;font-weight:' + secW + ';text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8pt;display:block;';
  const divider = '<div style="border-top:1pt solid #e5e7eb;margin:10pt 0;"></div>';

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

  const addressLine = [formValues.address, formValues.city_state, formValues.country].filter(Boolean).map(esc).join(', ');

  let bodyHtml = '';

  // Contact info section
  const hasContact = addressLine || formValues.email || formValues.phone || formValues.linkedin;
  if (hasContact) {
    bodyHtml += '<div style="margin-bottom:8pt;"><span style="' + secHeadStyle + '">Contact Information</span>';
    if (addressLine) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:4pt;">' + addressLine + '</p>';
    if (formValues.email) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:4pt;">' + esc(formValues.email) + '</p>';
    if (formValues.phone) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:4pt;">' + esc(formValues.phone) + '</p>';
    if (formValues.linkedin) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:4pt;">LinkedIn: ' + esc(formValues.linkedin) + '</p>';
    bodyHtml += '</div>' + divider;
  }

  // Sections
  sections.forEach(function (sec) {
    if (sec.type === 'summary') {
      bodyHtml += '<div style="margin-bottom:8pt;"><span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
      bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;line-height:' + lh + ';">' + esc(strip(sec.summary)) + '</p>';
      bodyHtml += '</div>' + divider;

    } else if (sec.type === 'experience') {
      bodyHtml += '<div style="margin-bottom:8pt;"><span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
      (sec.experiences || []).forEach(exp => {
        const dr2 = [fmt2(exp.startDate), fmt2(exp.endDate)].filter(Boolean).join(' – ');
        const dur = calcDur(exp.startDate, exp.endDate);
        bodyHtml += '<div style="margin-bottom:10pt;">';
        bodyHtml += '<div style="font-family:' + fontStack(sf) + ';font-size:' + (bp + 1) + 'pt;font-weight:700;color:#111;margin-bottom:1pt;">' + esc(exp.jobTitle || '') + '</div>';
        if (exp.company) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:1pt;">' + esc(exp.company) + '</p>';
        if (dr2) bodyHtml += '<p style="font-size:' + (bp - 1) + 'pt;color:#6b7280;margin-bottom:1pt;">' + dr2 + (dur ? ' · ' + dur : '') + '</p>';
        if (exp.city) bodyHtml += '<p style="font-size:' + (bp - 1) + 'pt;color:#9ca3af;margin-bottom:1pt;">' + esc(exp.city) + '</p>';
        if (exp.description) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;margin-top:4pt;line-height:' + lh + ';">' + esc(strip(exp.description)) + '</p>';
        bodyHtml += '</div>';
      });
      bodyHtml += '</div>' + divider;

    } else if (sec.type === 'education') {
      bodyHtml += '<div style="margin-bottom:8pt;"><span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
      (sec.educations || []).forEach(edu => {
        const dr2 = [fmt2(edu.startDate), fmt2(edu.endDate)].filter(Boolean).join(' – ');
        bodyHtml += '<div style="margin-bottom:10pt;">';
        bodyHtml += '<div style="font-family:' + fontStack(sf) + ';font-size:' + (bp + 1) + 'pt;font-weight:700;color:#111;margin-bottom:1pt;">' + esc(edu.institute || edu.school || '') + '</div>';
        if (edu.degree) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:1pt;">' + esc(edu.degree) + '</p>';
        if (dr2) bodyHtml += '<p style="font-size:' + (bp - 1) + 'pt;color:#6b7280;margin-bottom:1pt;">' + dr2 + '</p>';
        if (edu.city) bodyHtml += '<p style="font-size:' + (bp - 1) + 'pt;color:#9ca3af;margin-bottom:1pt;">' + esc(edu.city) + '</p>';
        if (edu.description) bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;margin-top:4pt;">' + esc(strip(edu.description)) + '</p>';
        bodyHtml += '</div>';
      });
      bodyHtml += '</div>' + divider;

    } else if (sec.type === 'skills') {
      bodyHtml += '<div style="margin-bottom:8pt;"><span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
      // Skills as simple list (pills don't render well in Word)
      (sec.skills || []).forEach(sk => {
        bodyHtml += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:2pt;">- ' + esc(sk.name) + '</p>';
      });
      bodyHtml += '</div>' + divider;

    } else if (sec.type === 'languages') {
      bodyHtml += '<div style="margin-bottom:8pt;"><span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
      (sec.languages || []).forEach(l => {
        bodyHtml += '<p style="font-size:' + bp + 'pt;font-weight:600;color:#111;margin-bottom:4pt;">' + esc(l.language) + (!sec.hideProficiency && l.level ? ' <span style="font-weight:normal;color:#6b7280;">(' + esc(l.level) + ')</span>' : '') + '</p>';
      });
      bodyHtml += '</div>' + divider;

    } else {
      const body = renderSectionBody(sec, bp, lh);
      if (!body) return;
      bodyHtml += '<div style="margin-bottom:8pt;"><span style="' + secHeadStyle + '">' + esc(sec.title) + '</span>';
      bodyHtml += body;
      bodyHtml += '</div>' + divider;
    }
  });

  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume</title>';
  html += getFontLinks(pf, sf);
  html += '<style>' + baseCss(pf, sf, bp, bw, lh) + '</style></head><body>';

  // Colored banner header
  html += '<div style="background-color:' + color + ';height:80pt;width:100%;"></div>';
  html += '<div style="padding:10pt ' + lr + 'pt 0;">';
  html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';color:#111;line-height:1.1;margin-bottom:4pt;">' + esc(formValues.first_name || '') + ' ' + esc(formValues.last_name || '') + '</div>';
  if (formValues.job_target) html += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:6pt;">' + esc(formValues.job_target) + '</p>';
  html += '<div style="border-top:1px solid #e5e7eb;margin:8pt 0;"></div>';
  html += '</div>';

  html += '<div style="padding:0 ' + lr + 'pt ' + tb + 'pt;">' + bodyHtml + '</div>';
  html += '</body></html>';
  return html;
};

// ===========================================================================
//  7. VividTemplate — Single col, black badge section headings, skill bars
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

  // Black badge heading
  const secHead = (title) =>
    '<div style="display:inline-block;background-color:#111;color:#ffffff;font-family:' + fontStack(sf) + ';font-size:' + secPt + 'pt;font-weight:' + secW + ';letter-spacing:0.12em;text-transform:uppercase;padding:2pt 8pt;margin-bottom:' + btc + 'pt;">' + esc(title) + '</div><br/>';

  // Entry: bold title, colored sub, date
  const entryBlock = (title, sub, dateStr, descHtml, bodyPt2) =>
    '<div style="margin-bottom:10pt;">' +
    '<span style="font-family:' + fontStack(sf) + ';font-size:' + (bodyPt2 + 1) + 'pt;font-weight:700;color:#111;">' + esc(title || '') + '</span>' +
    (sub ? '<span style="font-size:' + bodyPt2 + 'pt;color:#555;">' + esc(sub) + '</span>' : '') + '<br/>' +
    (dateStr ? '<span style="font-size:' + (bodyPt2 - 1) + 'pt;font-weight:600;color:#9ca3af;letter-spacing:0.06em;text-transform:uppercase;">' + esc(dateStr.toUpperCase()) + '</span><br/>' : '') +
    (descHtml ? '<p style="font-size:' + bodyPt2 + 'pt;color:#374151;line-height:' + lh + ';margin-top:4pt;">' + esc(strip(descHtml)) + '</p>' : '') +
    '</div>';

  // Skills: uppercase label + optional segment bar (5 segments using table)
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

  // Links & Details section (Vivid shows these in header area)
  const links = [];
  if (formValues.linkedin) links.push('LinkedIn');
  if (formValues.github) links.push('GitHub');
  if (formValues.stackoverflow) links.push('Stack Overflow');
  if (formValues.leetcode) links.push('LeetCode');
  if (formValues.website) links.push('Portfolio');

  const hasPD = formValues.dob || formValues.birth_place || formValues.nationality || formValues.driving_licence;
  if (hasPD || links.length) {
    bodyHtml += '<table width="100%" style="width:100%;border-collapse:collapse;table-layout:fixed;margin-bottom:' + bs + 'pt;"><colgroup><col width="50%"/><col width="50%"/></colgroup><tbody><tr>';
    // Left: Details
    let detailsCell = '';
    if (hasPD) {
      detailsCell += secHead('Details');
      if (formValues.dob || formValues.birth_place) detailsCell += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:4pt;">' + [formValues.dob, formValues.birth_place].filter(Boolean).map(esc).join(', ') + '</p>';
      if (formValues.nationality) detailsCell += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:4pt;">' + esc(formValues.nationality) + '</p>';
      if (formValues.driving_licence) detailsCell += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:4pt;">' + esc(formValues.driving_licence) + '</p>';
    }
    // Right: Links
    let linksCell = '';
    if (links.length) {
      linksCell += secHead('Links');
      links.forEach(l => { linksCell += '<p style="font-size:' + bp + 'pt;color:#374151;margin-bottom:2pt;text-decoration:underline;">' + esc(l) + '</p>'; });
    }
    bodyHtml += '<td width="50%" style="width:50%;vertical-align:top;padding-right:20pt;">' + detailsCell + '</td>';
    bodyHtml += '<td width="50%" style="width:50%;vertical-align:top;">' + linksCell + '</td>';
    bodyHtml += '</tr></tbody></table>';
  }

  // Render sections
  sections.forEach(function (sec) {
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
          if (!sec.hideProficiency) bodyHtml += skillBar(0, 6); // simplified bar
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

  // No-photo header (contact shown in header right column)
  const cityCountry = [formValues.address, formValues.city_state, formValues.country].filter(Boolean).map(esc).join(', ');
  const contactLine2 = [formValues.email, formValues.phone].filter(Boolean).map(esc).join(' | ');

  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume</title>';
  html += getFontLinks(pf, sf);
  html += '<style>' + baseCss(pf, sf, bp, bw, lh) + '</style></head><body>';

  // Colored header
  html += '<table width="100%" style="width:100%;border-collapse:collapse;background-color:' + headerBg + ';">';
  html += '<tbody><tr><td style="vertical-align:top;padding:40pt ' + (16 + lr) + 'pt 16pt;">';
  html += '<table width="100%" style="width:100%;border-collapse:collapse;"><tbody><tr>';
  // Name (left)
  html += '<td width="55%" style="width:55%;vertical-align:middle;">';
  html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + h1Pt + 'pt;font-weight:' + h1W + ';color:#111;line-height:1.0;letter-spacing:-0.01em;">';
  if (formValues.first_name) html += '<div>' + esc(formValues.first_name) + '</div>';
  if (formValues.last_name) html += '<div>' + esc(formValues.last_name) + '</div>';
  html += '</div></td>';
  // Job + contact (right)
  html += '<td width="45%" style="width:45%;vertical-align:top;padding-left:12pt;">';
  if (formValues.job_target) html += '<div style="font-family:' + fontStack(sf) + ';font-size:' + subPt + 'pt;font-weight:' + subW + ';text-transform:uppercase;letter-spacing:0.08em;color:#333;margin-bottom:6pt;">' + esc(formValues.job_target) + '</div>';
  if (cityCountry) html += '<p style="font-size:' + bp + 'pt;color:#333;margin-bottom:1pt;">' + cityCountry + '</p>';
  if (contactLine2) html += '<p style="font-size:' + bp + 'pt;color:#333;font-weight:500;">' + contactLine2 + '</p>';
  html += '</td>';
  html += '</tr></tbody></table></td></tr></tbody></table>';

  // Body
  html += '<div style="padding:' + tb + 'pt ' + lr + 'pt ' + tb + 'pt;">' + bodyHtml + '</div>';
  html += '</body></html>';
  return html;
};

// ===========================================================================
//  TEMPLATE ROUTER — picks the right builder based on template name
// ===========================================================================
const buildDocxHtml = (params) => {
  const template = (params.resumeSettings && params.resumeSettings.theme && params.resumeSettings.theme.template)
    ? params.resumeSettings.theme.template
    : 'ats';

  switch (template) {
    case 'clean': return buildCleanDocxHtml(params);
    case 'clear': return buildClearDocxHtml(params);
    case 'corporate': return buildCorporateDocxHtml(params);
    case 'professional': return buildProfessionalDocxHtml(params);
    case 'linkedin': return buildLinkedInDocxHtml(params);
    case 'vivid': return buildVividDocxHtml(params);
    case 'ats':
    default: return buildPrimeATSDocxHtml(params);
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

  // const handleDownloadDocx = async () => {
  //   try {
  //     const decreaseResult = await dispatch(decreaseSubscriptionCount(resumeType));
  //     if (decreaseSubscriptionCount.rejected.match(decreaseResult)) {
  //       toast.error("Download limit reached. Please upgrade your plan.");
  //       return;
  //     }
  //     const resumeEl = componentRef.current;
  //     if (!resumeEl) return;

  //     const cloned = resumeEl.cloneNode(true);
  //     cloned.querySelectorAll('*').forEach(el => {
  //       const s = el.style;
  //       const cn = typeof el.className === 'string' ? el.className : '';
  //       if (
  //         s.overflow === 'auto' || s.overflow === 'scroll' ||
  //         s.overflowY === 'auto' || s.overflowY === 'scroll' ||
  //         cn.includes('overflow-y-auto') || cn.includes('overflow-y-scroll') ||
  //         cn.includes('h-screen') || cn.includes('hide-scrollbar')
  //       ) {
  //         s.overflow = 'visible';
  //         s.overflowY = 'visible';
  //         s.height = 'auto';
  //         s.maxHeight = 'none';
  //       }
  //     });

  //     const primaryFont = resumeSettings && resumeSettings.text ? resumeSettings.text.primaryFont : 'Arial';
  //     const secondaryFont = resumeSettings && resumeSettings.text ? resumeSettings.text.secondaryFont : primaryFont;
  //     const template = (resumeSettings && resumeSettings.theme && resumeSettings.theme.template)
  //       ? resumeSettings.theme.template : '';

  //     const fullHtml = [
  //       '<!DOCTYPE html><html lang="en"><head>',
  //       '<meta charset="UTF-8"/>',
  //       getFontLinks(primaryFont, secondaryFont),
  //       '<style>',
  //       '  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; font-family: ' + fontStack(primaryFont) + ' !important; }',
  //       '  body { margin: 0; padding: 0; font-family: ' + fontStack(primaryFont) + '; }',
  //       '  @page { size: A4; margin: 0; }',
  //       '  table { border-collapse: collapse; }',
  //       '  td { vertical-align: top; }',
  //       '  a { color: inherit; text-decoration: none; }',
  //       '  ul { list-style-type: disc; padding-left: 1.2rem; margin: 0.25rem 0; }',
  //       '  ol { list-style-type: decimal; padding-left: 1.2rem; margin: 0.25rem 0; }',
  //       '  li { margin-bottom: 0.15rem; }',
  //       '  p { margin: 0.1rem 0; }',
  //       template === 'professional'
  //         ? '  #professional-resume-wrapper { background: linear-gradient(to right, ' + (themeColor || '#2c3e50') + ' 35%, #ffffff 35%) !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }'
  //         : '',
  //       '</style>',
  //       '</head><body>',
  //       cloned.outerHTML,
  //       '</body></html>',
  //     ].join('\n');

  //     const result = await dispatch(generateDocx(fullHtml));
  //     if (generateDocx.fulfilled.match(result)) {
  //       const blob = result.payload;
  //       const url = URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = (formValues.first_name || 'resume') + '_' + (formValues.last_name || '') + '.docx';
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //       URL.revokeObjectURL(url);
  //     } else {
  //       console.error('DOCX generation failed', result);
  //     }
  //   } catch (err) {
  //     console.error('DOCX download error:', err);
  //   }
  // };

  const handleDownloadDocx = async () => {
    try {
      const decreaseResult = await dispatch(decreaseSubscriptionCount(resumeType));
      if (decreaseSubscriptionCount.rejected.match(decreaseResult)) {
        toast.error("Download limit reached. Please upgrade your plan.");
        return;
      }
      const resumeEl = componentRef.current;
      if (!resumeEl) return;

      const cloned = resumeEl.cloneNode(true);
      
      // 1. Clean up overflow issues
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

      // ---------------------------------------------------------
      // DOCX SAFE FALLBACK FIX (No Backend Required)
      // ---------------------------------------------------------
      
      // Fix 1: Make Cover Photo Word-Friendly (Remove object-fit)
      const coverImg = cloned.querySelector('img[alt="Cover"]');
      if (coverImg) {
          coverImg.style.objectFit = 'fill'; // Word doesn't understand 'cover'
          coverImg.style.height = 'auto';
          coverImg.style.maxHeight = '120pt'; 
          coverImg.style.width = '100%';
      }

      // Fix 2: Remove absolute positioning so the profile photo doesn't disappear in Word
      const allDivs = cloned.querySelectorAll('div');
      allDivs.forEach(div => {
          if (div.style.position === 'absolute' && div.style.bottom === '-32pt') {
              div.style.position = 'relative'; // Makes it safe for Word
              div.style.bottom = 'auto';
              div.style.left = 'auto';
              div.style.marginTop = '10pt'; // Pushes it slightly below the cover
              div.style.marginLeft = '20pt';
              div.style.display = 'block';
          }
      });

      // Fix 3: Remove border-radius/clip-path (Word makes it square anyway, but CSS can break it)
      const profileImg = cloned.querySelector('img[alt="Profile"]');
      if (profileImg) {
          profileImg.style.borderRadius = '0';
          profileImg.style.WebkitBorderRadius = '0';
          profileImg.style.clipPath = 'none';
      }
      
      // Fix initials fallback border-radius
      const initialsDiv = cloned.querySelector('.linkedin-profile-initials');
      if (initialsDiv) {
          initialsDiv.style.borderRadius = '0';
          initialsDiv.style.WebkitBorderRadius = '0';
      }
      // ---------------------------------------------------------

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