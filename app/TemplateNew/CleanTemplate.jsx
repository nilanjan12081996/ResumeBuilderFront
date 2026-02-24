"use client";
import React from "react";

const SIDEBAR_TYPES = new Set(["languages", "hobbies", "skills"]);
const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

const CleanTemplate = ({ formData, sections, sectionOrder, resumeSettings }) => {

  // ── resumeSettings with safe defaults ────────────────────────────────────
  const text = resumeSettings?.text || {};
  const layout = resumeSettings?.layout || {};

  // ── Helpers ───────────────────────────────────────────────────────────────
  const formatDate = (dateValue) => {
    if (!dateValue) return null;
    if (typeof dateValue === "string" && dateValue.toLowerCase() === "present") return "Present";
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  const dateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    if (start && end) return `${start} – ${end}`;
    return start || end || "";
  };

  // ── Check data presence ───────────────────────────────────────────────────
  const hasContactInfo =
    formData.email || formData.phone || formData.address ||
    formData.city_state || formData.postal_code || formData.driving_licence ||
    formData.nationality || formData.country || formData.birth_place || formData.dob;
  const hasEmployment  = formData.employmentHistory?.some(j => j.job_title || j.employer);
  const hasEducation   = formData.educationHistory?.some(e => e.school || e.degree);
  const hasSkills      = formData.newSkillHistory?.some(s => s.skill);
  const hasLanguages   = formData.languageHistory?.some(l => l.language);
  const hasActivities  = formData.activityHistory?.some(a => a.functionTitle || a.employer);
  const hasInternships = formData.internshipHistory?.some(i => i.jobTitle || i.employer);
  const hasCourses     = formData.coursesHistory?.some(c => c.course || c.institution);

  // ── Dynamic style objects (resumeSettings-driven) ─────────────────────────
  const primaryFont    = text.primaryFont    || "Georgia, 'Times New Roman', serif";
  const secondaryFont  = text.secondaryFont  || "Arial, Helvetica, sans-serif";
  const lineHeight     = text.lineHeight     || 1.5;
  const bodySize       = text.body           || 9;
  const bodyWeight     = text.bodyWeight     || "normal";
  const sectionTitleSize   = text.sectionTitle       || 10;
  const sectionTitleWeight = text.sectionTitleWeight || "800";
  const primaryHeadingSize   = text.primaryHeading       || 32;
  const primaryHeadingWeight = text.primaryHeadingWeight || "900";
  const secondaryHeadingSize   = text.secondaryHeading       || 10;
  const secondaryHeadingWeight = text.secondaryHeadingWeight || "normal";

  const topBottom   = layout.topBottom         || 28;
  const leftRight   = layout.leftRight         || 28;
  const betweenSections      = layout.betweenSections      || 16;
  const betweenTitlesContent = layout.betweenTitlesContent || 10;
  const headerAlignment = layout.headerAlignment || "left";
  const headerTextAlign = headerAlignment === "center" ? "center" : headerAlignment === "right" ? "right" : "left";

  const bodyStyle = {
    fontFamily: primaryFont,
    fontSize: `${bodySize}pt`,
    fontWeight: bodyWeight,
    lineHeight: lineHeight,
    color: "#333",
  };

  // ── Short underline heading component (image style) ───────────────────────
  // ✅ Only underlines the text width, not full width
  const SectionHeading = ({ title }) => (
    <div style={{ marginBottom: `${betweenTitlesContent}pt` }}>
      <span style={{
        fontFamily: secondaryFont,
        fontSize: `${sectionTitleSize}pt`,
        fontWeight: sectionTitleWeight,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: "#111",
        display: "block",
      }}>
        {title}
      </span>
      {/* ✅ Short fixed underline, ~2-3 words wide like the image */}
      <div style={{
        width: "28pt",
        borderBottom: "2pt solid #111",
        marginTop: "3pt",
      }} />
    </div>
  );

  const labelStyle = {
    fontFamily: secondaryFont,
    fontSize: "7.5pt",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#111",
    display: "block",
    marginBottom: "1pt",
  };

  const valueStyle = {
    ...bodyStyle,
    display: "block",
    marginBottom: "8pt",
  };

  // ── SkillBar — level 1 now shows a small visible bar ─────────────────────
  // ✅ pctMap updated: 0→0, 1→10, 2→40, 3→70, 4→100
  const SkillBar = ({ level }) => {
    const lvl = level ?? 0;
    const pctMap = [0, 10, 40, 70, 100];
    const pct = pctMap[Math.max(0, Math.min(4, Math.round(lvl)))];
    const BAR_HEIGHT = "4pt";

    return (
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "2pt", marginBottom: "6pt", tableLayout: "fixed" }}>
        <tbody>
          <tr>
            {pct > 0 && (
              <td style={{
                width: `${pct}%`,
                backgroundColor: "#111",
                height: BAR_HEIGHT,
                padding: 0,
                lineHeight: 0,
                fontSize: 0,
              }}>&nbsp;</td>
            )}
            {pct < 100 && (
              <td style={{
                width: `${100 - pct}%`,
                backgroundColor: "#ddd",
                height: BAR_HEIGHT,
                padding: 0,
                lineHeight: 0,
                fontSize: 0,
              }}>&nbsp;</td>
            )}
          </tr>
        </tbody>
      </table>
    );
  };

  // ════════════════════════════════════════════════════════════════════════
  //  SIDEBAR SECTIONS — SCRATCH
  // ════════════════════════════════════════════════════════════════════════

  const renderInfoSidebar = () => {
    if (!hasContactInfo) return null;
    return (
      <div key="info" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={formData.infoSectionTitle || "Details"} />

        {(formData.address || formData.city_state) && (
          <>
            <span style={labelStyle}>Address</span>
            <span style={valueStyle}>
              {formData.address && <>{formData.address}<br /></>}
              {formData.city_state}
              {formData.city_state && (formData.country || formData.postal_code) ? ", " : ""}
              {formData.country}
              {formData.postal_code && <><br />{formData.postal_code}</>}
            </span>
          </>
        )}
        {formData.phone && (
          <>
            <span style={labelStyle}>Phone</span>
            <span style={valueStyle}>{formData.phone}</span>
          </>
        )}
        {formData.email && (
          <>
            <span style={labelStyle}>Email</span>
            <a href={`mailto:${formData.email}`} style={{ ...valueStyle, wordBreak: "break-all", color: "#333", textDecoration: "none" }}>
              {formData.email}
            </a>
          </>
        )}
        {formData.driving_licence && (
          <>
            <span style={labelStyle}>Driving Licence</span>
            <span style={valueStyle}>{formData.driving_licence}</span>
          </>
        )}
        {formData.nationality && (
          <>
            <span style={labelStyle}>Nationality</span>
            <span style={valueStyle}>{formData.nationality}</span>
          </>
        )}
        {formData.dob && (
          <>
            <span style={labelStyle}>Date of Birth</span>
            <span style={valueStyle}>{formData.dob}</span>
          </>
        )}
        {formData.birth_place && (
          <>
            <span style={labelStyle}>Place of Birth</span>
            <span style={valueStyle}>{formData.birth_place}</span>
          </>
        )}
      </div>
    );
  };

  const renderSkillsSidebar = () => {
    if (!hasSkills) return null;
    return (
      <div key="skills" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={formData.skillSectionTitle || "Skills"} />
        {formData.newSkillHistory.map((skill, i) => (
          <div key={i}>
            <span style={{ ...bodyStyle, display: "block", marginBottom: "1pt" }}>{skill.skill}</span>
            {!formData.hideExperienceLevel
              ? <SkillBar level={skill.level ?? 0} />
              : <div style={{ marginBottom: "5pt" }} />
            }
          </div>
        ))}
      </div>
    );
  };

  const getLangLevel = (langLevel) => {
    if (typeof langLevel === "number") return langLevel;
    const map = {
      "native": 4, "fluent": 4, "advanced": 3, "upper intermediate": 3,
      "intermediate": 2, "elementary": 1, "beginner": 1, "basic": 1, "a1": 0, "a2": 1,
      "b1": 2, "b2": 3, "c1": 3, "c2": 4,
    };
    if (typeof langLevel === "string") {
      return map[langLevel.toLowerCase()] ?? 2;
    }
    return 2;
  };

  const renderLanguagesSidebar = () => {
    if (!hasLanguages) return null;
    return (
      <div key="languages" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={formData.languagesSectionTitle || "Languages"} />
        {formData.languageHistory.map((lang, i) => (
          <div key={i}>
            <span style={{ ...bodyStyle, display: "block", marginBottom: "1pt" }}>{lang.language}</span>
            {!formData.hideLanguageProficiency
              ? <SkillBar level={getLangLevel(lang.level)} />
              : <div style={{ marginBottom: "5pt" }} />
            }
          </div>
        ))}
      </div>
    );
  };

  const renderHobbiesSidebar = () => {
    if (!formData.hobbies) return null;
    return (
      <div key="hobbies" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={formData.hobbiesSectionTitle || "Hobbies"} />
        <span style={{ ...bodyStyle, display: "block", whiteSpace: "pre-wrap" }}>{formData.hobbies}</span>
      </div>
    );
  };

  const renderLinksSidebar = () => {
    const links = [];
    if (formData.linkedin) links.push({ label: "LinkedIn", url: formData.linkedin });
    if (formData.github)   links.push({ label: "GitHub",   url: formData.github });
    if (formData.website)  links.push({ label: "Portfolio", url: formData.website });
    if (!links.length) return null;
    return (
      <div key="links" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title="Links" />
        {links.map((l, i) => (
          <a key={i} href={l.url} style={{ ...bodyStyle, display: "block", marginBottom: "3pt", color: "#333", textDecoration: "underline" }}>
            {l.label}
          </a>
        ))}
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════════
  //  MAIN SECTIONS — SCRATCH
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryScratch = () => {
    if (!formData.summary) return null;
    return (
      <div key="summary" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={formData.summarySectionTitle || "Profile"} />
        <div
          className="resume-content"
          style={{ ...bodyStyle, textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: formData.summary }}
        />
      </div>
    );
  };

  const renderEmploymentScratch = () => {
    if (!hasEmployment) return null;
    return (
      <div key="employment" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={formData.employmentSectionTitle || "Employment History"} />
        {formData.employmentHistory.map((job, i) => (
          <div key={i} style={{ marginBottom: "12pt" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", paddingRight: "6pt" }}>
                    <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                      {job.job_title}{job.employer ? `, ${job.employer}` : ""}
                    </span>
                  </td>
                  {job.city_state && (
                    <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                      <span style={{ ...bodyStyle, fontSize: `${bodySize - 0.5}pt`, color: "#555" }}>{job.city_state}</span>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
            {dateRange(job.startDate, job.endDate) && (
              <div style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777", marginTop: "1pt", marginBottom: "4pt" }}>
                {dateRange(job.startDate, job.endDate)}
              </div>
            )}
            {job.description && (
              <div className="resume-content" style={{ ...bodyStyle }} dangerouslySetInnerHTML={{ __html: job.description }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEducationScratch = () => {
    if (!hasEducation) return null;
    return (
      <div key="education" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={formData.educationSectionTitle || "Education"} />
        {formData.educationHistory.map((edu, i) => (
          <div key={i} style={{ marginBottom: "10pt" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", paddingRight: "6pt" }}>
                    <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                      {edu.degree}{edu.school ? `, ${edu.school}` : ""}
                    </span>
                  </td>
                  {edu.city_state && (
                    <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                      <span style={{ ...bodyStyle, fontSize: `${bodySize - 0.5}pt`, color: "#555" }}>{edu.city_state}</span>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
            {dateRange(edu.startDate, edu.endDate) && (
              <div style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777", marginTop: "1pt", marginBottom: "4pt" }}>
                {dateRange(edu.startDate, edu.endDate)}
              </div>
            )}
            {edu.description && (
              <div className="resume-content" style={{ ...bodyStyle }} dangerouslySetInnerHTML={{ __html: edu.description }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderInternshipsScratch = () => {
    if (!hasInternships) return null;
    return (
      <div key="internships" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={formData.internshipsSectionTitle || "Internships"} />
        {formData.internshipHistory.map((job, i) => (
          <div key={i} style={{ marginBottom: "10pt" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", paddingRight: "6pt" }}>
                    <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                      {job.jobTitle}{job.employer ? `, ${job.employer}` : ""}
                    </span>
                  </td>
                  {job.city && (
                    <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                      <span style={{ ...bodyStyle, fontSize: `${bodySize - 0.5}pt`, color: "#555" }}>{job.city}</span>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
            {dateRange(job.startDate, job.endDate) && (
              <div style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777", marginTop: "1pt", marginBottom: "4pt" }}>
                {dateRange(job.startDate, job.endDate)}
              </div>
            )}
            {job.description && (
              <div className="resume-content" style={{ ...bodyStyle }} dangerouslySetInnerHTML={{ __html: job.description }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderActivitiesScratch = () => {
    if (!hasActivities) return null;
    return (
      <div key="activities" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={formData.activitiesSectionTitle || "Activities"} />
        {formData.activityHistory.map((act, i) => (
          <div key={i} style={{ marginBottom: "10pt" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top", paddingRight: "6pt" }}>
                    <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                      {act.functionTitle}{act.employer ? ` - ${act.employer}` : ""}
                    </span>
                  </td>
                  {act.city && (
                    <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                      <span style={{ ...bodyStyle, fontSize: `${bodySize - 0.5}pt`, color: "#555" }}>{act.city}</span>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
            {dateRange(act.startDate, act.endDate) && (
              <div style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777", marginTop: "1pt", marginBottom: "4pt" }}>
                {dateRange(act.startDate, act.endDate)}
              </div>
            )}
            {act.description && (
              <div className="resume-content" style={{ ...bodyStyle }} dangerouslySetInnerHTML={{ __html: act.description }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCoursesScratch = () => {
    if (!hasCourses) return null;
    return (
      <div key="courses" style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={formData.coursesSectionTitle || "Courses"} />
        {formData.coursesHistory.map((c, i) => (
          <div key={i} style={{ marginBottom: "6pt" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top" }}>
                    <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                      {c.course}{c.institution ? ` - ${c.institution}` : ""}
                    </span>
                  </td>
                  {dateRange(c.startDate, c.endDate) && (
                    <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                      <span style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777" }}>{dateRange(c.startDate, c.endDate)}</span>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════════
  //  MAIN SECTIONS — FROM SECTIONS PROP
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryFromSection = (section) => (
    <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
      <SectionHeading title={section.title} />
      <div
        className="resume-content"
        style={{ ...bodyStyle, textAlign: "justify" }}
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
    </div>
  );

  const renderExperienceFromSection = (section) => (
    <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
      <SectionHeading title={section.title} />
      {section.experiences?.map((exp, i) => (
        <div key={exp.id || i} style={{ marginBottom: "12pt" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top", paddingRight: "6pt" }}>
                  <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                    {exp.jobTitle}{exp.company ? `, ${exp.company}` : ""}
                  </span>
                </td>
                {exp.city && (
                  <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                    <span style={{ ...bodyStyle, fontSize: `${bodySize - 0.5}pt`, color: "#555" }}>{exp.city}</span>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {dateRange(exp.startDate, exp.endDate) && (
            <div style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777", marginTop: "1pt", marginBottom: "4pt" }}>
              {dateRange(exp.startDate, exp.endDate)}
            </div>
          )}
          {exp.description && (
            <div className="resume-content" style={{ ...bodyStyle }} dangerouslySetInnerHTML={{ __html: exp.description }} />
          )}
        </div>
      ))}
    </div>
  );

  const renderEducationFromSection = (section) => (
    <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
      <SectionHeading title={section.title} />
      {section.educations?.map((edu, i) => (
        <div key={edu.id || i} style={{ marginBottom: "10pt" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top", paddingRight: "6pt" }}>
                  <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                    {edu.degree}{edu.institute ? `, ${edu.institute}` : ""}
                  </span>
                </td>
                {edu.city && (
                  <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                    <span style={{ ...bodyStyle, fontSize: `${bodySize - 0.5}pt`, color: "#555" }}>{edu.city}</span>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {dateRange(edu.startDate, edu.endDate) && (
            <div style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777", marginTop: "1pt", marginBottom: "4pt" }}>
              {dateRange(edu.startDate, edu.endDate)}
            </div>
          )}
          {edu.description && (
            <div className="resume-content" style={{ ...bodyStyle }} dangerouslySetInnerHTML={{ __html: edu.description }} />
          )}
        </div>
      ))}
    </div>
  );

  const renderCertificationsFromSection = (section) => (
    <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
      <SectionHeading title={section.title} />
      {section.certifications?.map((cert, i) => (
        <div key={cert.id || i} style={{ marginBottom: "8pt" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top", paddingRight: "6pt" }}>
                  <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                    {cert.name}{cert.organization ? `, ${cert.organization}` : ""}
                  </span>
                </td>
                {(cert.startYear || cert.endYear) && (
                  <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                    <span style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777" }}>
                      {cert.startYear}{cert.endYear ? ` – ${cert.endYear}` : ""}
                    </span>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {cert.description && (
            <div className="resume-content" style={{ ...bodyStyle, marginTop: "2pt" }} dangerouslySetInnerHTML={{ __html: cert.description }} />
          )}
        </div>
      ))}
    </div>
  );

  const renderCoursesFromSection = (section) => (
    <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
      <SectionHeading title={section.title} />
      {section.courses?.map((c, i) => (
        <div key={c.id || i} style={{ marginBottom: "6pt" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top" }}>
                  <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                    {c.course}{c.institution ? ` - ${c.institution}` : ""}
                  </span>
                </td>
                {dateRange(c.startDate, c.endDate) && (
                  <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                    <span style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777" }}>{dateRange(c.startDate, c.endDate)}</span>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );

  const renderInternshipsFromSection = (section) => (
    <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
      <SectionHeading title={section.title} />
      {section.internships?.map((intern, i) => (
        <div key={intern.id || i} style={{ marginBottom: "10pt" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top", paddingRight: "6pt" }}>
                  <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                    {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ""}
                  </span>
                </td>
                {intern.city && (
                  <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                    <span style={{ ...bodyStyle, fontSize: `${bodySize - 0.5}pt`, color: "#555" }}>{intern.city}</span>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {dateRange(intern.startDate, intern.endDate) && (
            <div style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777", marginTop: "1pt", marginBottom: "4pt" }}>
              {dateRange(intern.startDate, intern.endDate)}
            </div>
          )}
          {intern.description && (
            <div className="resume-content" style={{ ...bodyStyle }} dangerouslySetInnerHTML={{ __html: intern.description }} />
          )}
        </div>
      ))}
    </div>
  );

  const renderActivitiesFromSection = (section) => (
    <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
      <SectionHeading title={section.title} />
      {section.activities?.map((a, i) => (
        <div key={a.id || i} style={{ marginBottom: "10pt" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top", paddingRight: "6pt" }}>
                  <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                    {a.functionTitle}{a.employer ? ` - ${a.employer}` : ""}
                  </span>
                </td>
                {a.city && (
                  <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                    <span style={{ ...bodyStyle, fontSize: `${bodySize - 0.5}pt`, color: "#555" }}>{a.city}</span>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {dateRange(a.startDate, a.endDate) && (
            <div style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777", marginTop: "1pt", marginBottom: "4pt" }}>
              {dateRange(a.startDate, a.endDate)}
            </div>
          )}
          {a.description && (
            <div className="resume-content" style={{ ...bodyStyle }} dangerouslySetInnerHTML={{ __html: a.description }} />
          )}
        </div>
      ))}
    </div>
  );

  // Skills from section — sidebar
  const renderSkillsFromSection = (section) => (
    <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
      <SectionHeading title={section.title} />
      {section.skills?.map((skill, i) => (
        <div key={skill.id || i}>
          <span style={{ ...bodyStyle, display: "block", marginBottom: "1pt" }}>{skill.name}</span>
          {section.hideExperienceLevel === false
            ? <SkillBar level={skill.level ?? 0} />
            : <div style={{ marginBottom: "5pt" }} />
          }
        </div>
      ))}
    </div>
  );

  const renderLanguagesFromSection = (section) => (
    <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
      <SectionHeading title={section.title} />
      {section.languages?.map((l, i) => (
        <div key={i}>
          <span style={{ ...bodyStyle, fontWeight: "600", display: "block", marginBottom: "1pt" }}>{l.language}</span>
          {!section.hideProficiency
            ? <SkillBar level={getLangLevel(l.level)} />
            : <div style={{ marginBottom: "5pt" }} />
          }
        </div>
      ))}
    </div>
  );

  const renderHobbiesFromSection = (section) => {
    if (!section.hobbies) return null;
    return (
      <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={section.title} />
        <span style={{ ...bodyStyle, display: "block", whiteSpace: "pre-wrap" }}>{section.hobbies}</span>
      </div>
    );
  };

  const renderCustomSimpleFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
        <SectionHeading title={section.title} />
        {section.items?.map((item, i) => {
          const name  = typeof item === "object" ? (item.name || item.title) : item;
          const level = typeof item === "object" ? (item.level ?? 2) : 2;
          return (
            <div key={i}>
              <span style={{ ...bodyStyle, display: "block", marginBottom: "1pt" }}>{name}</span>
              {showLevel
                ? <SkillBar level={level} />
                : <div style={{ marginBottom: "5pt" }} />
              }
            </div>
          );
        })}
      </div>
    );
  };

  const renderCustomAdvancedFromSection = (section) => (
    <div key={section.id} style={{ marginBottom: `${betweenSections}pt` }}>
      <SectionHeading title={section.title} />
      {section.items?.map((item, i) => (
        <div key={item.id || i} style={{ marginBottom: "10pt" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top" }}>
                  <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                    {item.title}{item.city ? `, ${item.city}` : ""}
                  </span>
                </td>
                {dateRange(item.startDate, item.endDate) && (
                  <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                    <span style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777" }}>{dateRange(item.startDate, item.endDate)}</span>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {item.description && (
            <div className="resume-content" style={{ ...bodyStyle, marginTop: "2pt" }} dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
        </div>
      ))}
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════
  //  SCRATCH CUSTOM SECTIONS
  // ════════════════════════════════════════════════════════════════════════

  const renderScratchSimpleCustom = () =>
    Object.keys(formData)
      .filter(k => k.startsWith("customSimpleHistory_custom_simple_"))
      .map(key => {
        const sectionId = key.replace("customSimpleHistory_", "");
        const history   = formData[key];
        const title     = formData[`customSimpleTitle_${sectionId}`] || "Custom Section";
        const hideLevel = formData[`customSimpleHideLevel_${sectionId}`] ?? true;
        if (!history?.some(i => i.name)) return null;
        return (
          <div key={sectionId} style={{ marginBottom: `${betweenSections}pt` }}>
            <SectionHeading title={title} />
            {history.map((item, i) => (
              <div key={i}>
                <span style={{ ...bodyStyle, display: "block", marginBottom: "1pt" }}>{item.name}</span>
                {!hideLevel && item.level !== undefined
                  ? <SkillBar level={item.level ?? 2} />
                  : <div style={{ marginBottom: "5pt" }} />
                }
              </div>
            ))}
          </div>
        );
      });

  const renderScratchAdvancedCustom = () =>
    Object.keys(formData)
      .filter(k => k.startsWith("customAdvancedHistory_custom_advanced_"))
      .map(key => {
        const sectionId = key.replace("customAdvancedHistory_", "");
        const history   = formData[key];
        const title     = formData[`customAdvancedTitle_${sectionId}`] || "Custom Section";
        if (!history?.some(i => i.title || i.city)) return null;
        return (
          <div key={sectionId} style={{ marginBottom: `${betweenSections}pt` }}>
            <SectionHeading title={title} />
            {history.map((item, i) => (
              <div key={i} style={{ marginBottom: "10pt" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                  <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top" }}>
                        <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                          {item.title}{item.city ? `, ${item.city}` : ""}
                        </span>
                      </td>
                      {dateRange(item.startDate, item.endDate) && (
                        <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                          <span style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777" }}>{dateRange(item.startDate, item.endDate)}</span>
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
                {item.description && (
                  <div className="resume-content" style={{ ...bodyStyle, marginTop: "2pt" }} dangerouslySetInnerHTML={{ __html: item.description }} />
                )}
              </div>
            ))}
          </div>
        );
      });

  // ════════════════════════════════════════════════════════════════════════
  //  RENDER ORCHESTRATION
  // ════════════════════════════════════════════════════════════════════════

  const renderMainContent = () => {
    if (sections && sections.length > 0) {
      return sections
        .filter(s => !SIDEBAR_TYPES.has(s.type))
        .map(section => {
          switch (section.type) {
            case "summary":        return renderSummaryFromSection(section);
            case "experience":     return renderExperienceFromSection(section);
            case "education":      return renderEducationFromSection(section);
            case "certifications": return renderCertificationsFromSection(section);
            case "courses":        return renderCoursesFromSection(section);
            case "internships":    return renderInternshipsFromSection(section);
            case "activities":     return renderActivitiesFromSection(section);
            case "custom_simple":  return renderCustomSimpleFromSection(section);
            case "custom":         return renderCustomAdvancedFromSection(section);
            default:               return null;
          }
        });
    }

    const order = sectionOrder || [
      "summary", "employment", "education", "activities",
      "internships", "courses", "custom", "languages", "hobbies",
    ];
    const map = {
      summary:     renderSummaryScratch,
      employment:  renderEmploymentScratch,
      education:   renderEducationScratch,
      activities:  renderActivitiesScratch,
      internships: renderInternshipsScratch,
      courses:     renderCoursesScratch,
    };
    return [
      ...order
        .filter(id => !SIDEBAR_TYPES.has(id))
        .map(id => {
          if (id.startsWith("custom_simple_")) {
            const h = formData[`customSimpleHistory_${id}`];
            const title = formData[`customSimpleTitle_${id}`] || "Custom Section";
            const hide = formData[`customSimpleHideLevel_${id}`] ?? true;
            if (!h?.some(i => i.name)) return null;
            return (
              <div key={id} style={{ marginBottom: `${betweenSections}pt` }}>
                <SectionHeading title={title} />
                {h.map((item, i) => (
                  <div key={i}>
                    <span style={{ ...bodyStyle, display: "block", marginBottom: "1pt" }}>{item.name}</span>
                    {!hide && item.level !== undefined
                      ? <SkillBar level={item.level ?? 2} />
                      : <div style={{ marginBottom: "5pt" }} />
                    }
                  </div>
                ))}
              </div>
            );
          }
          if (id.startsWith("custom_advanced_")) {
            const h = formData[`customAdvancedHistory_${id}`];
            const title = formData[`customAdvancedTitle_${id}`] || "Custom Section";
            if (!h?.some(i => i.title || i.city)) return null;
            return (
              <div key={id} style={{ marginBottom: `${betweenSections}pt` }}>
                <SectionHeading title={title} />
                {h.map((item, i) => (
                  <div key={i} style={{ marginBottom: "10pt" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                      <colgroup><col style={{ width: "70%" }} /><col style={{ width: "30%" }} /></colgroup>
                      <tbody>
                        <tr>
                          <td style={{ verticalAlign: "top" }}>
                            <span style={{ fontFamily: secondaryFont, fontSize: `${bodySize + 0.5}pt`, fontWeight: "700", color: "#111" }}>
                              {item.title}{item.city ? `, ${item.city}` : ""}
                            </span>
                          </td>
                          {dateRange(item.startDate, item.endDate) && (
                            <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap" }}>
                              <span style={{ ...bodyStyle, fontSize: `${bodySize - 1}pt`, color: "#777" }}>{dateRange(item.startDate, item.endDate)}</span>
                            </td>
                          )}
                        </tr>
                      </tbody>
                    </table>
                    {item.description && (
                      <div className="resume-content" style={{ ...bodyStyle, marginTop: "2pt" }} dangerouslySetInnerHTML={{ __html: item.description }} />
                    )}
                  </div>
                ))}
              </div>
            );
          }
          return map[id]?.() ?? null;
        }),
      ...renderScratchSimpleCustom(),
      ...renderScratchAdvancedCustom(),
    ];
  };

  const renderSidebarContent = () => {
    if (sections && sections.length > 0) {
      return sections
        .filter(s => SIDEBAR_TYPES.has(s.type))
        .map(section => {
          switch (section.type) {
            case "skills":    return renderSkillsFromSection(section);
            case "languages": return renderLanguagesFromSection(section);
            case "hobbies":   return renderHobbiesFromSection(section);
            default:          return null;
          }
        });
    }
    const order = sectionOrder || ["skills", "languages", "hobbies"];
    const map = {
      skills:    renderSkillsSidebar,
      languages: renderLanguagesSidebar,
      hobbies:   renderHobbiesSidebar,
    };
    return order
      .filter(id => SIDEBAR_TYPES.has(id))
      .map(id => map[id]?.() ?? null);
  };

  // ════════════════════════════════════════════════════════════════════════
  //  JSX — TABLE LAYOUT, PDF-safe, no flexbox
  // ════════════════════════════════════════════════════════════════════════

  return (
    <div style={{ overflowY: "auto" }}>
      <style>{`
        .resume-content ul { list-style-type: disc; padding-left: 14pt; margin: 2pt 0; }
        .resume-content ol { list-style-type: decimal; padding-left: 14pt; margin: 2pt 0; }
        .resume-content li { margin-bottom: 2pt; }
        .resume-content strong { font-weight: bold; }
        .resume-content em { font-style: italic; }
        .resume-content p { margin-bottom: 2pt; }
      `}</style>

      <div style={{
        minHeight: "297mm",
        width: "100%",
        backgroundColor: "#fff",
        fontFamily: primaryFont,
        fontSize: `${bodySize}pt`,
        lineHeight: lineHeight,
        color: "#333",
        boxSizing: "border-box",
      }}>

        {/* ── HEADER ── */}
        <div style={{ padding: `${topBottom}pt ${leftRight}pt ${Math.round(topBottom * 0.5)}pt ${leftRight}pt`, textAlign: headerTextAlign }}>
          <div style={{
            fontFamily: secondaryFont,
            fontSize: `${primaryHeadingSize}pt`,
            fontWeight: primaryHeadingWeight,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            color: "#111",
            lineHeight: "1.05",
            marginBottom: "6pt",
          }}>
            {formData.first_name}<br />{formData.last_name}
          </div>
          {formData.job_target && (
            <div style={{
              fontFamily: primaryFont,
              fontSize: `${secondaryHeadingSize}pt`,
              fontWeight: secondaryHeadingWeight,
              color: "#888",
              marginBottom: "0",
            }}>
              {formData.job_target}
            </div>
          )}
        </div>

        {/* Horizontal rule */}
        <div style={{ borderTop: "1pt solid #ccc", marginLeft: `${leftRight}pt`, marginRight: `${leftRight}pt` }} />

        {/* ── TWO-COLUMN BODY ── */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <colgroup>
            <col style={{ width: "30%" }} />
            <col style={{ width: "70%" }} />
          </colgroup>
          <tbody>
            <tr>
              {/* LEFT SIDEBAR */}
              <td style={{
                verticalAlign: "top",
                padding: `${Math.round(topBottom * 0.7)}pt ${Math.round(leftRight * 0.6)}pt ${Math.round(topBottom * 0.7)}pt ${leftRight}pt`,
                borderRight: "1pt solid #e0e0e0",
              }}>
                {renderInfoSidebar()}
                {renderLinksSidebar()}
                {renderSidebarContent()}
              </td>

              {/* RIGHT MAIN CONTENT */}
              <td style={{
                verticalAlign: "top",
                padding: `${Math.round(topBottom * 0.7)}pt ${leftRight}pt ${Math.round(topBottom * 0.7)}pt ${Math.round(leftRight * 0.7)}pt`,
              }}>
                {renderMainContent()}
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default CleanTemplate;