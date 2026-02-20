import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { generatePDF, generateDocx } from '../reducers/ResumeSlice';

const GOOGLE_FONT_MAP = {
  "Lato": "https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700&display=swap",
  "Inter": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  "Roboto": "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap",
  "Arial": null,
  "Georgia": null,
  "Times New Roman": null,
};

const getFontLink = (fontName) => {
  const url = GOOGLE_FONT_MAP[fontName];
  if (!url) return "";
  return `<link rel="stylesheet" href="${url}"/>`;
};

const fontStack = (fontName) => {
  const safe = fontName || "Arial";
  return `'${safe}', Arial, sans-serif`;
};

export const useDownload = ({ componentRef, formValues, resumeSettings, sections, themeColor }) => {
  const dispatch = useDispatch();

  // ── PDF: clone DOM → send to backend ──
  const handleDownloadPDF = async () => {
    try {
      const resumeEl = componentRef.current;
      if (!resumeEl) return;

      const cloned = resumeEl.cloneNode(true);
      cloned.querySelectorAll("*").forEach(el => {
        const cls = el.className || "";
        if (typeof cls !== "string") return;
        if (
          cls.includes("overflow-y-auto") ||
          cls.includes("overflow-y-scroll") ||
          cls.includes("hide-scrollbar")
        ) {
          el.style.overflow = "visible";
          el.style.height = "auto";
        }
        if (cls.includes("h-screen")) {
          el.style.height = "auto";
          el.style.overflow = "visible";
        }
      });

      const primaryFont   = resumeSettings?.text?.primaryFont   || "Arial";
      const secondaryFont = resumeSettings?.text?.secondaryFont || primaryFont;

      const fontsToLoad = [...new Set([primaryFont, secondaryFont])]
        .map(getFontLink)
        .filter(Boolean)
        .join("\n");

      const fullHtml = [
        '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>',
        fontsToLoad,
        '<style>',
        '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; box-sizing: border-box; }',
        `body { margin: 0; padding: 0; font-family: ${fontStack(primaryFont)}; }`,
        '@page { size: A4; margin: 0; }',
        'table { border-collapse: collapse; }',
        'td { vertical-align: top; }',
        'a { color: #2b6cb0; text-decoration: underline; }',
        'ul { list-style-type: disc; padding-left: 1.2rem; margin: 0.25rem 0; }',
        'li { margin-bottom: 0.2rem; }',
        '</style></head><body><div>',
        cloned.innerHTML,
        '</div></body></html>',
      ].join('');

      const result = await dispatch(generatePDF(fullHtml));

      if (generatePDF.fulfilled.match(result)) {
        const blob = result.payload;
        const fileUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = `${formValues.first_name || "resume"}_${formValues.last_name || ""}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(fileUrl);
      } else {
        console.error("PDF download failed!");
      }
    } catch (err) {
      console.error(err);
      console.error("PDF download failed!");
    }
  };

  // ── DOCX ──
  const handleDownloadDocx = async () => {
    try {
      const primaryFont   = resumeSettings?.text?.primaryFont   || "Arial";
      const secondaryFont = resumeSettings?.text?.secondaryFont || primaryFont;
      const color         = themeColor || "#2c3e50";
      const template      = resumeSettings?.theme?.template || "ats";

      const bodyPt = resumeSettings?.text?.body || 9;
      const h1Pt   = resumeSettings?.text?.primaryHeading || 22;
      const h1W    = resumeSettings?.text?.primaryHeadingWeight || 700;
      const subPt  = resumeSettings?.text?.secondaryHeading || 13;
      const subW   = resumeSettings?.text?.secondaryHeadingWeight || 600;
      const secPt  = resumeSettings?.text?.sectionTitle || 11;
      const secW   = resumeSettings?.text?.sectionTitleWeight || 700;
      const bodyW  = resumeSettings?.text?.bodyWeight || 400;
      const lh     = resumeSettings?.text?.lineHeight || 1.6;

      const e = (s) => {
        if (!s) return "";
        return String(s)
          .replace(/&/g, "&amp;").replace(/</g, "&lt;")
          .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      };

      const strip = (html) => {
        if (!html) return "";
        return html
          .replace(/<br\s*\/?>/gi, " ").replace(/<\/p>/gi, " ")
          .replace(/<li[^>]*>/gi, "").replace(/<\/li>/gi, "; ")
          .replace(/<[^>]+>/g, "")
          .replace(/&amp;/g, "&").replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">").replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " ").trim();
      };

      const fmt = (d) => {
        if (!d) return "";
        if (String(d).toLowerCase() === "present") return "Present";
        const dt = new Date(d);
        if (isNaN(dt.getTime())) return String(d);
        return dt.toLocaleString("en-US", { month: "short", year: "numeric" });
      };
      const dr = (s, end) => [fmt(s), fmt(end)].filter(Boolean).join(" - ");

      // ── Shared section renderers (used by both templates) ──────────────
      const renderSectionBody = (sec) => {
        let out = "";

        if (sec.type === "summary") {
          out += `<p>${e(strip(sec.summary))}</p>`;
        }
        else if (sec.type === "skills") {
          const skills = sec.skills || [];
          out += `<table class="skills-table"><tbody>`;
          for (let i = 0; i < skills.length; i += 2) {
            const s1 = skills[i]; const s2 = skills[i + 1];
            out += `<tr>
              <td class="skill-cell">${e(s1?.name || "")}</td>
              <td class="skill-cell">${s2 ? e(s2.name || "") : ""}</td>
            </tr>`;
          }
          out += `</tbody></table>`;
        }
        else if (sec.type === "experience") {
          (sec.experiences || []).forEach(exp => {
            out += `<div class="item"><div class="item-header">
              <span class="header-right">${e(dr(exp.startDate, exp.endDate))}</span>
              <span class="header-left"><strong>${e(exp.jobTitle)}${exp.company ? ` | ${e(exp.company)}` : ""}${exp.city ? `, ${e(exp.city)}` : ""}</strong></span>
            </div></div>`;
            if (exp.description) out += `<p class="desc">${e(strip(exp.description))}</p>`;
          });
        }
        else if (sec.type === "education") {
          (sec.educations || []).forEach(edu => {
            out += `<div class="item"><div class="item-header">
              <span class="header-right">${e(dr(edu.startDate, edu.endDate))}</span>
              <span class="header-left"><strong>${e(edu.degree)}${edu.institute ? `, ${e(edu.institute)}` : ""}${edu.city ? `, ${e(edu.city)}` : ""}</strong></span>
            </div></div>`;
            if (edu.description) out += `<p class="desc">${e(strip(edu.description))}</p>`;
          });
        }
        else if (sec.type === "certifications") {
          (sec.certifications || []).forEach(cert => {
            const yr = cert.startYear && cert.endYear ? `${cert.startYear} - ${cert.endYear}` : cert.startYear || cert.endYear || "";
            out += `<div class="item"><div class="item-header">
              <span class="header-right">${e(yr)}</span>
              <span class="header-left"><strong>${e(cert.name)}${cert.organization ? ` - ${e(cert.organization)}` : ""}</strong></span>
            </div></div>`;
            if (cert.description) out += `<p class="desc">${e(cert.description)}</p>`;
          });
        }
        else if (sec.type === "languages") {
          const langs = sec.languages || [];
          out += `<table class="skills-table"><tbody>`;
          for (let i = 0; i < langs.length; i += 2) {
            const l1 = langs[i]; const l2 = langs[i + 1];
            const lb1 = l1 ? `${e(l1.language)}${!sec.hideProficiency && l1.level ? ` (${e(l1.level)})` : ""}` : "";
            const lb2 = l2 ? `${e(l2.language)}${!sec.hideProficiency && l2.level ? ` (${e(l2.level)})` : ""}` : "";
            out += `<tr><td class="skill-cell">${lb1}</td><td class="skill-cell">${lb2}</td></tr>`;
          }
          out += `</tbody></table>`;
        }
        else if (sec.type === "hobbies") {
          out += `<p>${e(sec.hobbies)}</p>`;
        }
        else if (sec.type === "courses") {
          (sec.courses || []).forEach(c => {
            out += `<div class="item"><div class="item-header">
              <span class="header-right">${e(dr(c.startDate, c.endDate))}</span>
              <span class="header-left"><strong>${e(c.course)}${c.institution ? `, ${e(c.institution)}` : ""}</strong></span>
            </div></div>`;
          });
        }
        else if (sec.type === "internships") {
          (sec.internships || []).forEach(intern => {
            out += `<div class="item"><div class="item-header">
              <span class="header-right">${e(dr(intern.startDate, intern.endDate))}</span>
              <span class="header-left"><strong>${e(intern.jobTitle)}${intern.employer ? ` | ${e(intern.employer)}` : ""}${intern.city ? `, ${e(intern.city)}` : ""}</strong></span>
            </div></div>`;
            if (intern.description) out += `<p class="desc">${e(strip(intern.description))}</p>`;
          });
        }
        else if (sec.type === "activities") {
          (sec.activities || []).forEach(act => {
            out += `<div class="item"><div class="item-header">
              <span class="header-right">${e(dr(act.startDate, act.endDate))}</span>
              <span class="header-left"><strong>${e(act.functionTitle)}${act.employer ? ` | ${e(act.employer)}` : ""}${act.city ? `, ${e(act.city)}` : ""}</strong></span>
            </div></div>`;
            if (act.description) out += `<p class="desc">${e(strip(act.description))}</p>`;
          });
        }
        else if (sec.type === "custom_simple") {
          const items = sec.items || [];
          out += `<table class="skills-table"><tbody>`;
          for (let i = 0; i < items.length; i += 2) {
            const n1 = typeof items[i] === "object" ? (items[i]?.name || items[i]?.title || "") : (items[i] || "");
            const n2 = items[i + 1] ? (typeof items[i + 1] === "object" ? (items[i + 1]?.name || items[i + 1]?.title || "") : (items[i + 1] || "")) : "";
            out += `<tr><td class="skill-cell">${e(n1)}</td><td class="skill-cell">${e(n2)}</td></tr>`;
          }
          out += `</tbody></table>`;
        }
        else if (sec.type === "custom") {
          (sec.items || []).forEach(item => {
            out += `<div class="item"><div class="item-header">
              <span class="header-right">${e(dr(item.startDate, item.endDate))}</span>
              <span class="header-left"><strong>${e(item.title)}${item.city ? `, ${e(item.city)}` : ""}</strong></span>
            </div></div>`;
            if (item.description) out += `<p class="desc">${e(strip(item.description))}</p>`;
          });
        }

        return out;
      };

      // ════════════════════════════════════════════════════════════════════
      //  PROFESSIONAL TEMPLATE — two-column table DOCX
      // ════════════════════════════════════════════════════════════════════
      const isProfessional = template === "professional";

      let fullHtml = "";

      if (isProfessional) {
        const SIDEBAR_TYPES = new Set(['skills', 'hobbies', 'languages']);
        const sidebarSections = (sections || []).filter(s => SIDEBAR_TYPES.has(s.type));
        const mainSections    = (sections || []).filter(s => !SIDEBAR_TYPES.has(s.type));

        // Sidebar HTML
        let sidebarHtml = "";

        // Contact
        const contactItems = [
          formValues.address     ? `<div>${e(formValues.address)}</div>` : "",
          formValues.city_state  ? `<div>${e(formValues.city_state)}${formValues.country ? `, ${e(formValues.country)}` : ""}</div>` : "",
          formValues.postal_code ? `<div>${e(formValues.postal_code)}</div>` : "",
          formValues.email       ? `<div><a href="mailto:${e(formValues.email)}" style="color:#d1d5db">${e(formValues.email)}</a></div>` : "",
          formValues.phone       ? `<div>${e(formValues.phone)}</div>` : "",
          formValues.linkedin    ? `<div><a href="${e(formValues.linkedin)}" style="color:#d1d5db">LinkedIn</a></div>` : "",
          formValues.github      ? `<div><a href="${e(formValues.github)}" style="color:#d1d5db">GitHub</a></div>` : "",
          formValues.stackoverflow ? `<div><a href="${e(formValues.stackoverflow)}" style="color:#d1d5db">Stack Overflow</a></div>` : "",
          formValues.leetcode    ? `<div><a href="${e(formValues.leetcode)}" style="color:#d1d5db">LeetCode</a></div>` : "",
          formValues.driving_licence ? `<div><span class="side-label">Driving License</span><div>${e(formValues.driving_licence)}</div></div>` : "",
          formValues.nationality ? `<div><span class="side-label">Nationality</span><div>${e(formValues.nationality)}</div></div>` : "",
          formValues.birth_place ? `<div><span class="side-label">Place of Birth</span><div>${e(formValues.birth_place)}</div></div>` : "",
          formValues.dob         ? `<div><span class="side-label">Date of Birth</span><div>${e(formValues.dob)}</div></div>` : "",
        ].filter(Boolean).join("");

        if (contactItems) {
          sidebarHtml += `<div class="side-section"><div class="side-heading">Details</div><div class="side-body">${contactItems}</div></div>`;
        }

        sidebarSections.forEach(sec => {
          let secHtml = "";
          if (sec.type === "skills") {
            (sec.skills || []).forEach(sk => { secHtml += `<div class="side-item">${e(sk.name)}</div>`; });
          } else if (sec.type === "languages") {
            (sec.languages || []).forEach(l => {
              secHtml += `<div class="side-item">${e(l.language)}${!sec.hideProficiency && l.level ? ` (${e(l.level)})` : ""}</div>`;
            });
          } else if (sec.type === "hobbies") {
            secHtml += `<div class="side-body">${e(sec.hobbies)}</div>`;
          }
          sidebarHtml += `<div class="side-section"><div class="side-heading">${e(sec.title)}</div>${secHtml}</div>`;
        });

        // Main HTML
        let mainHtml = "";
        mainSections.forEach(sec => {
          mainHtml += `<div class="main-section"><div class="main-heading">${e(sec.title)}</div>${renderSectionBody(sec)}</div>`;
        });

        fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Resume</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: '${primaryFont}', Arial, sans-serif;
      font-size: ${bodyPt}pt;
      font-weight: ${bodyW};
      line-height: ${lh};
      margin: 0; padding: 0;
      color: #333;
    }
    .layout-table { width: 100%; border-collapse: collapse; }
    .sidebar-td {
      width: 35%;
      background-color: ${color};
      vertical-align: top;
      padding: 24pt 14pt;
    }
    .main-td {
      width: 65%;
      background-color: #ffffff;
      vertical-align: top;
      padding: 20pt 22pt;
    }

    /* ── Name / title ── */
    .name {
      font-family: '${secondaryFont}', Arial, sans-serif;
      font-size: ${h1Pt}pt;
      font-weight: ${h1W};
      color: #ffffff;
      text-align: center;
      line-height: 1.2;
      margin-bottom: 4pt;
    }
    .job-target {
      font-size: ${subPt}pt;
      font-weight: ${subW};
      color: rgba(255,255,255,0.8);
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 10pt;
    }
    .divider {
      width: 24pt;
      border-top: 1px solid rgba(255,255,255,0.4);
      margin: 6pt auto;
    }

    /* ── Sidebar ── */
    .side-section { margin-bottom: 14pt; }
    .side-heading {
      font-family: '${secondaryFont}', Arial, sans-serif;
      font-size: ${secPt}pt;
      font-weight: ${secW};
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid rgba(255,255,255,0.3);
      padding-bottom: 3pt;
      margin-bottom: 6pt;
    }
    .side-body {
      font-size: ${bodyPt}pt;
      color: #d1d5db;
      line-height: ${lh};
    }
    .side-item {
      font-size: ${bodyPt}pt;
      color: #d1d5db;
      margin-bottom: 4pt;
    }
    .side-label {
      font-size: ${bodyPt - 1}pt;
      color: #9ca3af;
      text-transform: uppercase;
      display: block;
      margin-top: 4pt;
    }

    /* ── Main ── */
    .main-section { margin-bottom: 10pt; }
    .main-heading {
      font-family: '${secondaryFont}', Arial, sans-serif;
      font-size: ${secPt}pt;
      font-weight: ${secW};
      color: #111827;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 3pt;
      margin-bottom: 6pt;
      margin-top: 10pt;
    }

    .item { margin-bottom: 8pt; }
    .item-header { overflow: hidden; margin-bottom: 2pt; }
    .header-left { display: block; overflow: hidden; font-size: ${bodyPt}pt; font-weight: ${bodyW}; }
    .header-right { float: right; font-size: ${bodyPt}pt; font-weight: bold; color: #555; margin-left: 8pt; }

    .desc {
      font-size: ${bodyPt}pt;
      font-weight: ${bodyW};
      color: #374151;
      line-height: ${lh};
      margin: 2pt 0 6pt 0;
    }
    p { font-size: ${bodyPt}pt; font-weight: ${bodyW}; color: #374151; line-height: ${lh}; margin: 2pt 0; }

    .skills-table { width: 100%; border-collapse: collapse; margin-top: 4pt; }
    .skill-cell {
      width: 50%;
      padding: 2pt 8pt 2pt 0;
      font-size: ${bodyPt}pt;
      font-weight: ${bodyW};
      color: #1f2937;
      border-bottom: 1px solid #e5e7eb;
      vertical-align: middle;
    }
    a { color: #2b6cb0; }
  </style>
</head>
<body>
<table class="layout-table">
  <tbody>
    <tr>
      <td class="sidebar-td">
        ${formValues.profileImage ? `<div style="text-align:center;margin-bottom:10pt"><img src="${formValues.profileImage}" alt="Profile" style="width:70pt;height:70pt;object-fit:cover;border-radius:50%;border:2pt solid rgba(255,255,255,0.5)"/></div>` : ""}
        <div class="name">${e(formValues.first_name)} ${e(formValues.last_name)}</div>
        <div class="divider"></div>
        ${formValues.job_target ? `<div class="job-target">${e(formValues.job_target)}</div>` : ""}
        ${sidebarHtml}
      </td>
      <td class="main-td">
        ${mainHtml}
      </td>
    </tr>
  </tbody>
</table>
</body>
</html>`;

      } else {
        // ════════════════════════════════════════════════════════════════
        //  ALL OTHER TEMPLATES — original flat layout
        // ════════════════════════════════════════════════════════════════

        const contactParts = [
          [formValues?.address, formValues?.city_state && formValues?.postal_code
            ? `${formValues.city_state}, ${formValues.postal_code}`
            : formValues?.city_state || formValues?.postal_code, formValues?.country]
            .filter(Boolean).map(e).join(", "),
          formValues?.email       ? `Email: ${e(formValues.email)}` : "",
          formValues?.phone       ? `Phone: ${e(formValues.phone)}` : "",
          formValues?.linkedin    ? `LinkedIn: ${e(formValues.linkedin)}` : "",
          formValues?.github      ? `GitHub: ${e(formValues.github)}` : "",
          formValues?.stackoverflow ? `Stack Overflow: ${e(formValues.stackoverflow)}` : "",
          formValues?.leetcode    ? `LeetCode: ${e(formValues.leetcode)}` : "",
        ].filter(Boolean).join(" | ");

        let body = `
<header>
  <h1>${e(formValues?.first_name)} ${e(formValues?.last_name)}</h1>
  <div class="subtitle">${e(formValues?.job_target)}</div>
  <div class="contact-info">${contactParts}</div>
</header>`;

        (sections || []).forEach(sec => {
          body += `<section><h2>${e(sec.title)}</h2>${renderSectionBody(sec)}</section>`;
        });

        fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Resume</title>
  <style>
    body {
      font-family: '${primaryFont}', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: ${lh};
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-size: ${bodyPt}pt;
      font-weight: ${bodyW};
    }
    header {
      text-align: center;
      border-bottom: 2px solid ${color};
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    h1 {
      margin: 0 0 6px 0;
      color: ${color};
      font-size: ${h1Pt}pt;
      font-weight: ${h1W};
      font-family: '${secondaryFont}', Arial, sans-serif;
      text-transform: uppercase;
    }
    .subtitle { font-size: ${subPt}pt; font-weight: ${subW}; color: #444; margin-bottom: 6px; }
    .contact-info { font-size: ${bodyPt}pt; color: #555; }
    h2 {
      color: ${color};
      border-top: 1px solid ${color};
      border-bottom: 1px solid ${color};
      padding: 3px 0;
      margin-top: 20px;
      margin-bottom: 8px;
      font-size: ${secPt}pt;
      font-weight: ${secW};
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: '${secondaryFont}', Arial, sans-serif;
    }
    .item { margin-bottom: 10px; }
    .item-header { overflow: hidden; margin-bottom: 4px; }
    .header-left { display: block; overflow: hidden; font-size: ${bodyPt}pt; }
    .header-right { float: right; font-size: ${bodyPt}pt; font-weight: bold; color: #555; margin-left: 10px; }
    .desc { font-size: ${bodyPt}pt; font-weight: ${bodyW}; color: #374151; line-height: ${lh}; margin: 4px 0 8px 0; }
    p { font-size: ${bodyPt}pt; font-weight: ${bodyW}; color: #374151; line-height: ${lh}; margin: 4px 0; }
    .skills-table { width: 100%; border-collapse: collapse; margin-top: 6px; }
    .skill-cell { width: 50%; padding: 3px 8px 3px 0; font-size: ${bodyPt}pt; font-weight: ${bodyW}; color: #1f2937; border-bottom: 1px solid #e5e7eb; vertical-align: middle; }
    a { color: #2b6cb0; }
  </style>
</head>
<body><div class="cv-container">${body}</div></body>
</html>`;
      }

      const result = await dispatch(generateDocx(fullHtml));

      if (generateDocx.fulfilled.match(result)) {
        const blob = result.payload;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${formValues?.first_name || "resume"}_${formValues?.last_name || ""}.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } else {
        console.error("DOCX download failed!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    window.addEventListener("download-pdf", handleDownloadPDF);
    return () => window.removeEventListener("download-pdf", handleDownloadPDF);
  }, [formValues, resumeSettings, sections, themeColor]);

  useEffect(() => {
    window.addEventListener("download-docx", handleDownloadDocx);
    return () => window.removeEventListener("download-docx", handleDownloadDocx);
  }, [formValues, resumeSettings, sections, themeColor]);

  return { handleDownloadPDF, handleDownloadDocx };
};