"use client";
import React from "react";

const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

const ClearTemplate = ({ formData, sections, sectionOrder, themeColor, resumeSettings }) => {
  const color = themeColor || "#94a3b8";
  const text = resumeSettings?.text || {};
  const layout = resumeSettings?.layout || {};
  const topBottom = layout.topBottom ?? 0;
  const leftRight = layout.leftRight ?? 0;

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

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // ─────────────────────────────────────────────────────────────
  //  DYNAMIC STYLES FROM resumeSettings (like PrimeATS)
  // ─────────────────────────────────────────────────────────────

  const sectionHeadingStyle = {
    color: color,
    borderBottom: `1pt solid ${color}`,
    borderTop: `1pt solid ${color}`,
    fontFamily: text.secondaryFont || "Arial",
    fontSize: `${text.sectionTitle || 10}pt`,
    fontWeight: text.sectionTitleWeight || "700",
    marginTop: `${layout.betweenSections || 10}pt`,
    marginBottom: `${layout.betweenTitlesContent || 5}pt`,
    padding: "2pt 0",
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const bodyStyle = {
    fontSize: `${text.body || 9}pt`,
    fontWeight: text.bodyWeight || "normal",
    lineHeight: text.lineHeight || 1.4,
    fontFamily: text.primaryFont || "Arial",
  };

  const SectionHeading = ({ title }) => (
    <div style={sectionHeadingStyle}>{title}</div>
  );

  const SidebarHeading = ({ title }) => (
    <div style={{
      ...sectionHeadingStyle,
      fontSize: `${(text.sectionTitle || 10) - 1}pt`,
      marginTop: `${Math.max((layout.betweenSections || 10) - 2, 4)}pt`,
      marginBottom: `${Math.max((layout.betweenTitlesContent || 5) - 1, 2)}pt`,
    }}>
      {title}
    </div>
  );

  // Two-col row (title left, date right) — table only
  const TwoColRow = ({ left, right }) => (
    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
      <colgroup>
        <col style={{ width: "70%" }} />
        <col style={{ width: "30%" }} />
      </colgroup>
      <tbody>
        <tr>
          <td style={{ verticalAlign: "top", paddingRight: "6pt", ...bodyStyle }}>{left}</td>
          <td style={{ verticalAlign: "top", textAlign: "right", fontSize: `${(text.body || 9) - 0.5}pt`, color: "#555", whiteSpace: "nowrap", fontWeight: "bold" }}>{right}</td>
        </tr>
      </tbody>
    </table>
  );

  // ─────────────────────────────────────────────────────────────
  //  SCRATCH — SIDEBAR
  // ─────────────────────────────────────────────────────────────

  const renderSkillsSidebar = () => {
    if (!formData.newSkillHistory?.some(s => s.skill)) return null;
    return (
      <div key="skills">
        <SidebarHeading title={formData.skillSectionTitle || "Skills"} />
        {formData.newSkillHistory.map((s, i) => (
          <div key={i} style={{ ...bodyStyle, color: "#333", marginBottom: "2pt" }}>
            {s.skill}
            {!formData.hideExperienceLevel && s.level !== undefined
              ? ` (${capitalize(skillLevels[s.level ?? 0])})`
              : ""}
          </div>
        ))}
      </div>
    );
  };

  const renderLanguagesSidebar = () => {
    if (!formData.languageHistory?.some(l => l.language)) return null;
    return (
      <div key="languages">
        <SidebarHeading title={formData.languagesSectionTitle || "Languages"} />
        {formData.languageHistory.map((lang, i) => (
          <div key={i} style={{ ...bodyStyle, color: "#333", marginBottom: "2pt" }}>
            {lang.language}
            {!formData.hideLanguageProficiency && lang.level ? ` (${lang.level})` : ""}
          </div>
        ))}
      </div>
    );
  };

  const renderHobbiesSidebar = () => {
    if (!formData.hobbies) return null;
    return (
      <div key="hobbies">
        <SidebarHeading title={formData.hobbiesSectionTitle || "Hobbies"} />
        <div style={{ ...bodyStyle, color: "#444" }}>{formData.hobbies}</div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────
  //  SCRATCH — MAIN
  // ─────────────────────────────────────────────────────────────

  const renderSummary = () => {
    if (!formData.summary) return null;
    return (
      <section key="summary">
        <SectionHeading title={formData.summarySectionTitle || "Profile"} />
        <div
          className="resume-content"
          style={{ ...bodyStyle, color: "#374151", textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: formData.summary }}
        />
      </section>
    );
  };

  const renderEmployment = () => {
    if (!formData.employmentHistory?.some(j => j.job_title || j.employer)) return null;
    return (
      <section key="employment">
        <SectionHeading title={formData.employmentSectionTitle || "Experience"} />
        {formData.employmentHistory.map((job, i) => (
          <div key={i} style={{ marginBottom: "7pt" }}>
            <TwoColRow
              left={
                <span>
                  <strong style={{ color: "#111" }}>{job.job_title}</strong>
                  {job.employer && <span style={{ color: "#444" }}>, {job.employer}</span>}
                  {job.city_state && <span style={{ color: "#666" }}>, {job.city_state}</span>}
                </span>
              }
              right={dateRange(job.startDate, job.endDate)}
            />
            {job.description && (
              <div
                className="resume-content"
                style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            )}
          </div>
        ))}
      </section>
    );
  };

  const renderEducation = () => {
    if (!formData.educationHistory?.some(e => e.school || e.degree)) return null;
    return (
      <section key="education">
        <SectionHeading title={formData.educationSectionTitle || "Education"} />
        {formData.educationHistory.map((edu, i) => (
          <div key={i} style={{ marginBottom: "6pt" }}>
            <TwoColRow
              left={
                <span>
                  <strong style={{ color: "#111" }}>{edu.degree}</strong>
                  {edu.school && <span style={{ color: "#444" }}>, {edu.school}</span>}
                </span>
              }
              right={dateRange(edu.startDate, edu.endDate)}
            />
            {edu.description && (
              <div
                className="resume-content"
                style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
                dangerouslySetInnerHTML={{ __html: edu.description }}
              />
            )}
          </div>
        ))}
      </section>
    );
  };

  const renderInternships = () => {
    if (!formData.internshipHistory?.some(i => i.jobTitle || i.employer)) return null;
    return (
      <section key="internships">
        <SectionHeading title={formData.internshipsSectionTitle || "Internships"} />
        {formData.internshipHistory.map((job, i) => (
          <div key={i} style={{ marginBottom: "6pt" }}>
            <TwoColRow
              left={
                <span>
                  <strong style={{ color: "#111" }}>{job.jobTitle}</strong>
                  {job.employer && <span style={{ color: "#444" }}>, {job.employer}</span>}
                  {job.city && <span style={{ color: "#666" }}>, {job.city}</span>}
                </span>
              }
              right={dateRange(job.startDate, job.endDate)}
            />
            {job.description && (
              <div
                className="resume-content"
                style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            )}
          </div>
        ))}
      </section>
    );
  };

  const renderActivities = () => {
    if (!formData.activityHistory?.some(a => a.functionTitle || a.employer)) return null;
    return (
      <section key="activities">
        <SectionHeading title={formData.activitiesSectionTitle || "Activities"} />
        {formData.activityHistory.map((act, i) => (
          <div key={i} style={{ marginBottom: "6pt" }}>
            <TwoColRow
              left={
                <span>
                  <strong style={{ color: "#111" }}>{act.functionTitle}</strong>
                  {act.employer && <span style={{ color: "#444" }}>, {act.employer}</span>}
                </span>
              }
              right={dateRange(act.startDate, act.endDate)}
            />
            {act.description && (
              <div
                className="resume-content"
                style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
                dangerouslySetInnerHTML={{ __html: act.description }}
              />
            )}
          </div>
        ))}
      </section>
    );
  };

  const renderCourses = () => {
    if (!formData.coursesHistory?.some(c => c.course || c.institution)) return null;
    return (
      <section key="courses">
        <SectionHeading title={formData.coursesSectionTitle || "Courses"} />
        {formData.coursesHistory.map((c, i) => (
          <div key={i} style={{ marginBottom: "4pt" }}>
            <TwoColRow
              left={
                <span>
                  <strong style={{ color: "#111" }}>{c.course}</strong>
                  {c.institution && <span style={{ color: "#444" }}>, {c.institution}</span>}
                </span>
              }
              right={dateRange(c.startDate, c.endDate)}
            />
          </div>
        ))}
      </section>
    );
  };

  // Custom Simple — list niche niche, level in brackets if enabled
  const renderCustomSimpleScratch = (id) => {
    const h = formData[`customSimpleHistory_${id}`];
    const title = formData[`customSimpleTitle_${id}`] || "Custom Section";
    const hideLevel = formData[`customSimpleHideLevel_${id}`] ?? true;
    if (!h?.some(i => i.name)) return null;
    return (
      <section key={id}>
        <SectionHeading title={title} />
        {h.map((item, i) => (
          <div key={i} style={{ ...bodyStyle, color: "#333", marginBottom: "2pt" }}>
            {item.name}
            {!hideLevel && item.level !== undefined
              ? ` (${capitalize(skillLevels[item.level ?? 2])})`
              : ""}
          </div>
        ))}
      </section>
    );
  };

  // Custom Advanced — title + date + city + description
  const renderCustomAdvancedScratch = (id) => {
    const h = formData[`customAdvancedHistory_${id}`];
    const title = formData[`customAdvancedTitle_${id}`] || "Custom Section";
    if (!h?.some(i => i.title || i.city)) return null;
    return (
      <section key={id}>
        <SectionHeading title={title} />
        {h.map((item, i) => (
          <div key={i} style={{ marginBottom: "6pt" }}>
            <TwoColRow
              left={
                <span>
                  <strong style={{ color: "#111" }}>{item.title}</strong>
                  {item.city && <span style={{ color: "#666" }}>, {item.city}</span>}
                </span>
              }
              right={dateRange(item.startDate, item.endDate)}
            />
            {item.description && (
              <div
                className="resume-content"
                style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        ))}
      </section>
    );
  };

  // ─────────────────────────────────────────────────────────────
  //  SECTIONS PROP (improve / jd / linkedin)
  // ─────────────────────────────────────────────────────────────

  const renderSummaryFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      <div
        className="resume-content"
        style={{ ...bodyStyle, color: "#374151", textAlign: "justify" }}
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
    </section>
  );

  const renderExperienceFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.experiences?.map((exp, i) => (
        <div key={exp.id || i} style={{ marginBottom: "7pt" }}>
          <TwoColRow
            left={
              <span>
                <strong style={{ color: "#111" }}>{exp.jobTitle}</strong>
                {exp.company && <span style={{ color: "#444" }}>, {exp.company}</span>}
                {exp.city && <span style={{ color: "#666" }}>, {exp.city}</span>}
              </span>
            }
            right={dateRange(exp.startDate, exp.endDate)}
          />
          {exp.description && (
            <div
              className="resume-content"
              style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
              dangerouslySetInnerHTML={{ __html: exp.description }}
            />
          )}
        </div>
      ))}
    </section>
  );

  const renderEducationFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.educations?.map((edu, i) => (
        <div key={edu.id || i} style={{ marginBottom: "6pt" }}>
          <TwoColRow
            left={
              <span>
                <strong style={{ color: "#111" }}>{edu.degree}</strong>
                {edu.institute && <span style={{ color: "#444" }}>, {edu.institute}</span>}
                {edu.city && <span style={{ color: "#666" }}>, {edu.city}</span>}
              </span>
            }
            right={dateRange(edu.startDate, edu.endDate)}
          />
          {edu.description && (
            <div
              className="resume-content"
              style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
              dangerouslySetInnerHTML={{ __html: edu.description }}
            />
          )}
        </div>
      ))}
    </section>
  );

  // Certifications — date fix (ISO string → formatted), city + description included
  const renderCertificationsFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.certifications?.map((cert, i) => (
        <div key={cert.id || i} style={{ marginBottom: "5pt" }}>
          <TwoColRow
            left={
              <span>
                <strong style={{ color: "#111" }}>{cert.name}</strong>
                {cert.organization && <span style={{ color: "#444" }}>, {cert.organization}</span>}
                {cert.city && <span style={{ color: "#666" }}>, {cert.city}</span>}
              </span>
            }
            right={dateRange(cert.startYear, cert.endYear)}
          />
          {cert.description && (
            <div
              className="resume-content"
              style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
              dangerouslySetInnerHTML={{ __html: cert.description }}
            />
          )}
        </div>
      ))}
    </section>
  );

  const renderCoursesFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.courses?.map((c, i) => (
        <div key={c.id || i} style={{ marginBottom: "4pt" }}>
          <TwoColRow
            left={
              <span>
                <strong style={{ color: "#111" }}>{c.course}</strong>
                {c.institution && <span style={{ color: "#444" }}>, {c.institution}</span>}
              </span>
            }
            right={dateRange(c.startDate, c.endDate)}
          />
        </div>
      ))}
    </section>
  );

  const renderInternshipsFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.internships?.map((intern, i) => (
        <div key={intern.id || i} style={{ marginBottom: "6pt" }}>
          <TwoColRow
            left={
              <span>
                <strong style={{ color: "#111" }}>{intern.jobTitle}</strong>
                {intern.employer && <span style={{ color: "#444" }}>, {intern.employer}</span>}
                {intern.city && <span style={{ color: "#666" }}>, {intern.city}</span>}
              </span>
            }
            right={dateRange(intern.startDate, intern.endDate)}
          />
          {intern.description && (
            <div
              className="resume-content"
              style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
              dangerouslySetInnerHTML={{ __html: intern.description }}
            />
          )}
        </div>
      ))}
    </section>
  );

  const renderActivitiesFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.activities?.map((a, i) => (
        <div key={a.id || i} style={{ marginBottom: "6pt" }}>
          <TwoColRow
            left={
              <span>
                <strong style={{ color: "#111" }}>{a.functionTitle}</strong>
                {a.employer && <span style={{ color: "#444" }}>, {a.employer}</span>}
              </span>
            }
            right={dateRange(a.startDate, a.endDate)}
          />
          {a.description && (
            <div
              className="resume-content"
              style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
              dangerouslySetInnerHTML={{ __html: a.description }}
            />
          )}
        </div>
      ))}
    </section>
  );

  // Skills sidebar from sections prop — capitalize level, in brackets
  const renderSkillsFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <div key={section.id}>
        <SidebarHeading title={section.title} />
        {section.skills?.map((skill, i) => (
          <div key={skill.id || i} style={{ ...bodyStyle, color: "#333", marginBottom: "2pt" }}>
            {skill.name}
            {showLevel && skill.level !== undefined
              ? ` (${capitalize(skillLevels[skill.level ?? 0])})`
              : ""}
          </div>
        ))}
      </div>
    );
  };

  // Languages sidebar from sections prop
  const renderLanguagesFromSection = (section) => (
    <div key={section.id}>
      <SidebarHeading title={section.title} />
      {section.languages?.map((l, i) => (
        <div key={i} style={{ ...bodyStyle, color: "#333", marginBottom: "2pt" }}>
          {l.language}
          {!section.hideProficiency && l.level ? ` (${l.level})` : ""}
        </div>
      ))}
    </div>
  );

  const renderHobbiesFromSection = (section) => {
    if (!section.hobbies) return null;
    return (
      <div key={section.id}>
        <SidebarHeading title={section.title} />
        <div style={{ ...bodyStyle, color: "#444" }}>{section.hobbies}</div>
      </div>
    );
  };

  // Custom Simple from sections prop — list, capitalize level in brackets
  const renderCustomSimpleFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <section key={section.id}>
        <SectionHeading title={section.title} />
        {section.items?.map((item, i) => {
          const name = typeof item === "object" ? (item.name || item.title) : item;
          const level = typeof item === "object" ? (item.level ?? 2) : 2;
          return (
            <div key={i} style={{ ...bodyStyle, color: "#333", marginBottom: "2pt" }}>
              {name}
              {showLevel ? ` (${capitalize(skillLevels[level])})` : ""}
            </div>
          );
        })}
      </section>
    );
  };

  const renderCustomAdvancedFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.items?.map((item, i) => (
        <div key={item.id || i} style={{ marginBottom: "6pt" }}>
          <TwoColRow
            left={
              <span>
                <strong style={{ color: "#111" }}>{item.title}</strong>
                {item.city && <span style={{ color: "#666" }}>, {item.city}</span>}
              </span>
            }
            right={dateRange(item.startDate, item.endDate)}
          />
          {item.description && (
            <div
              className="resume-content"
              style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          )}
        </div>
      ))}
    </section>
  );

  // ─────────────────────────────────────────────────────────────
  //  ORCHESTRATE
  // ─────────────────────────────────────────────────────────────

  const SIDEBAR_IDS = new Set(["skills", "languages", "hobbies"]);

  const renderSidebarContent = () => {
    if (sections && sections.length > 0) {
      return sections
        .filter(s => SIDEBAR_IDS.has(s.type))
        .map(s => {
          if (s.type === "skills") return renderSkillsFromSection(s);
          if (s.type === "languages") return renderLanguagesFromSection(s);
          if (s.type === "hobbies") return renderHobbiesFromSection(s);
          return null;
        });
    }
    const order = sectionOrder || ["skills", "languages", "hobbies"];
    const map = {
      skills: renderSkillsSidebar,
      languages: renderLanguagesSidebar,
      hobbies: renderHobbiesSidebar,
    };
    return order.filter(id => SIDEBAR_IDS.has(id)).map(id => map[id]?.() ?? null);
  };

  const renderMainContent = () => {
    if (sections && sections.length > 0) {
      return sections
        .filter(s => !SIDEBAR_IDS.has(s.type))
        .map(s => {
          switch (s.type) {
            case "summary": return renderSummaryFromSection(s);
            case "experience": return renderExperienceFromSection(s);
            case "education": return renderEducationFromSection(s);
            case "certifications": return renderCertificationsFromSection(s);
            case "courses": return renderCoursesFromSection(s);
            case "internships": return renderInternshipsFromSection(s);
            case "activities": return renderActivitiesFromSection(s);
            case "custom_simple": return renderCustomSimpleFromSection(s);
            case "custom": return renderCustomAdvancedFromSection(s);
            default: return null;
          }
        });
    }

    const order = sectionOrder || [
      "summary", "employment", "education",
      "internships", "activities", "courses",
    ];
    const map = {
      summary: renderSummary,
      employment: renderEmployment,
      education: renderEducation,
      internships: renderInternships,
      activities: renderActivities,
      courses: renderCourses,
    };
    return order
      .filter(id => !SIDEBAR_IDS.has(id))
      .map(id => {
        if (id.startsWith("custom_simple_")) return renderCustomSimpleScratch(id);
        if (id.startsWith("custom_advanced_")) return renderCustomAdvancedScratch(id);
        return map[id]?.() ?? null;
      });
  };

  // Links
  const links = [];
  if (formData.linkedin) links.push({ label: "LinkedIn", url: formData.linkedin });
  if (formData.github) links.push({ label: "GitHub", url: formData.github });
  if (formData.stackoverflow) links.push({ label: "Stack Overflow", url: formData.stackoverflow });
  if (formData.leetcode) links.push({ label: "LeetCode", url: formData.leetcode });
  if (formData.website) links.push({ label: "Portfolio", url: formData.website });

  // ─────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────

  const hasPhoto = !!formData.profileImage;
  const PHOTO_WIDTH = 120; // pt

  return (
    <div style={{ overflowY: "auto" }}>
      <style>{`
        .resume-content ul { list-style-type: disc; padding-left: 14pt; margin: 2pt 0; }
        .resume-content ol { list-style-type: decimal; padding-left: 14pt; margin: 2pt 0; }
        .resume-content li { margin-bottom: 1pt; }
        .resume-content strong { font-weight: bold; }
        .resume-content em { font-style: italic; }
        .resume-content p { margin-bottom: 2pt; }
      `}</style>

      <div style={{
        minHeight: "297mm",
        width: "100%",
        backgroundColor: "#fff",
        fontFamily: text.primaryFont || "Arial, sans-serif",
        fontSize: `${text.body || 9}pt`,
        lineHeight: text.lineHeight || 1.4,
        boxSizing: "border-box",
        paddingBottom: `${topBottom}pt`,
      }}>

        {/* ── HEADER ── */}
        {hasPhoto ? (
          /* ── Photo mode: position:absolute so image stretches full header height ── */
          <div style={{
            position: "relative",
            width: "100%",
            backgroundColor: color,
            display: "table",   /* shrink-wraps to content height */
          }}>
            {/* Photo — absolute, full height of header */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${PHOTO_WIDTH}pt`,
              bottom: 0,
              overflow: "hidden",
            }}>
              <img
                src={formData.profileImage}
                alt="Profile"
                style={{
                  width: `${PHOTO_WIDTH}pt`,
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  borderRadius: 0,
                }}
              />
            </div>

            {/* Content — pushed right past the photo */}
            <div style={{
              paddingLeft: `${PHOTO_WIDTH + 16 + leftRight}pt`,
              paddingRight: `${18 + leftRight}pt`,
              paddingTop: "16pt",
              paddingBottom: "13pt",
            }}>
              {/* Name */}
              <div style={{
                fontSize: `${text.primaryHeading || 20}pt`,
                fontWeight: text.primaryHeadingWeight || "800",
                fontFamily: text.secondaryFont || text.primaryFont || "Arial",
                color: "#111",
                lineHeight: "1.1",
                marginBottom: "3pt",
              }}>
                {formData.first_name} {formData.last_name}
              </div>

              {/* Job target */}
              {formData.job_target && (
                <div style={{
                  fontSize: `${text.secondaryHeading || 8.5}pt`,
                  fontWeight: text.secondaryHeadingWeight || "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#333",
                  marginBottom: "6pt",
                }}>
                  {formData.job_target}
                </div>
              )}

              {/* Contact */}
              <table style={{ borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    {(formData.city_state || formData.country) && (
                      <td style={{ ...bodyStyle, color: "#333", paddingRight: "10pt", whiteSpace: "nowrap" }}>
                        {formData.city_state}
                        {formData.city_state && formData.country ? ", " : ""}
                        {formData.country}
                      </td>
                    )}
                  </tr>
                  <tr>
                    {formData.phone && (
                      <td style={{ ...bodyStyle, color: "#333", paddingRight: "10pt", whiteSpace: "nowrap" }}>
                        {formData.phone}
                      </td>
                    )}
                    {formData.email && (
                      <td style={{ ...bodyStyle, color: "#333", whiteSpace: "nowrap" }}>
                        · {formData.email}
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ── No-photo mode: original table layout ── */
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: color }}>
            <tbody>
              <tr>
                <td style={{
                  verticalAlign: "top",
                  padding: `16pt ${18 + leftRight}pt 13pt ${16 + leftRight}pt`,
                }}>
                  {/* Name */}
                  <div style={{
                    fontSize: `${text.primaryHeading || 20}pt`,
                    fontWeight: text.primaryHeadingWeight || "800",
                    fontFamily: text.secondaryFont || text.primaryFont || "Arial",
                    color: "#111",
                    lineHeight: "1.1",
                    marginBottom: "3pt",
                  }}>
                    {formData.first_name} {formData.last_name}
                  </div>

                  {/* Job target */}
                  {formData.job_target && (
                    <div style={{
                      fontSize: `${text.secondaryHeading || 8.5}pt`,
                      fontWeight: text.secondaryHeadingWeight || "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#333",
                      marginBottom: "6pt",
                    }}>
                      {formData.job_target}
                    </div>
                  )}

                  {/* Contact */}
                  <table style={{ borderCollapse: "collapse" }}>
                    <tbody>
                      <tr>
                        {(formData.city_state || formData.country) && (
                          <td style={{ ...bodyStyle, color: "#333", paddingRight: "10pt", whiteSpace: "nowrap" }}>
                            {formData.city_state}
                            {formData.city_state && formData.country ? ", " : ""}
                            {formData.country}
                          </td>
                        )}
                      </tr>
                      <tr>
                        {formData.phone && (
                          <td style={{ ...bodyStyle, color: "#333", paddingRight: "10pt", whiteSpace: "nowrap" }}>
                            {formData.phone}
                          </td>
                        )}
                        {formData.email && (
                          <td style={{ ...bodyStyle, color: "#333", whiteSpace: "nowrap" }}>
                            · {formData.email}
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* ── TWO-COLUMN BODY ── */}
        <div style={{ paddingLeft: `${leftRight}pt`, paddingRight: `${leftRight}pt` }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <colgroup>
              <col style={{ width: "32%" }} />
              <col style={{ width: "68%" }} />
            </colgroup>
            <tbody>
              <tr>
                {/* LEFT SIDEBAR */}
                <td style={{
                  verticalAlign: "top",
                  padding: `${topBottom}pt 14pt 14pt 0pt`,
                  backgroundColor: "#f7f7f7",
                  borderRight: "1pt solid #e5e5e5",
                }}>

                  {/* Links */}
                  {links.length > 0 && (
                    <div>
                      <SidebarHeading title="Links" />
                      {links.map((link, i) => (
                        <div key={i} style={{ ...bodyStyle, marginBottom: "2pt" }}>
                          <a href={link.url} style={{ color: color, textDecoration: "none" }}>
                            {link.label}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Personal Details */}
                  {(formData.dob || formData.birth_place || formData.nationality || formData.driving_licence) && (
                    <div>
                      <SidebarHeading title="Details" />
                      {formData.dob && (
                        <div style={{ marginBottom: "4pt" }}>
                          <div style={{ fontSize: "7.5pt", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Date of Birth
                          </div>
                          <div style={{ ...bodyStyle, color: "#333" }}>
                            {formData.dob}{formData.birth_place ? `, ${formData.birth_place}` : ""}
                          </div>
                        </div>
                      )}
                      {formData.nationality && (
                        <div style={{ marginBottom: "4pt" }}>
                          <div style={{ fontSize: "7.5pt", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Nationality
                          </div>
                          <div style={{ ...bodyStyle, color: "#333" }}>{formData.nationality}</div>
                        </div>
                      )}
                      {formData.driving_licence && (
                        <div style={{ marginBottom: "4pt" }}>
                          <div style={{ fontSize: "7.5pt", fontWeight: "700", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Driving License
                          </div>
                          <div style={{ ...bodyStyle, color: "#333" }}>{formData.driving_licence}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Skills / Languages / Hobbies */}
                  {renderSidebarContent()}
                </td>

                {/* RIGHT MAIN CONTENT */}
                <td style={{ verticalAlign: "top", padding: `${topBottom}pt 0pt 14pt 14pt` }}>
                  {renderMainContent()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClearTemplate;