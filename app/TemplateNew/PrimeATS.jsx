"use client";
import React from "react";

const PrimeATS = ({ formData, sections, sectionOrder, themeColor, resumeSettings }) => {
  const { text, layout } = resumeSettings;

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
    if (start && end) return `${start} — ${end}`;
    return start || end || "";
  };

  const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

  // ── Shared styles ──
  const sectionHeadingStyle = {
    color: themeColor,
    borderBottom: `1px solid ${themeColor}`,
    borderTop: `1px solid ${themeColor}`,
    fontFamily: text.secondaryFont,
    fontSize: `${text.sectionTitle}pt`,
    fontWeight: text.sectionTitleWeight,
    marginTop: `${layout.betweenSections}pt`,
    marginBottom: `${layout.betweenTitlesContent}pt`,
    padding: "3pt 0",
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const bodyStyle = {
    fontSize: `${text.body}pt`,
    fontWeight: text.bodyWeight,
  };

  // ── Section Heading Component ──
  const SectionHeading = ({ title }) => (
    <div style={sectionHeadingStyle}>{title}</div>
  );

  // ── Two-column row (title left, date right) using table ──
  const TwoColRow = ({ left, right }) => (
    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
      <colgroup>
        <col style={{ width: "70%" }} />
        <col style={{ width: "30%" }} />
      </colgroup>
      <tbody>
        <tr>
          <td style={{ verticalAlign: "top", paddingRight: "8pt", ...bodyStyle }}>{left}</td>
          <td style={{ verticalAlign: "top", textAlign: "right", whiteSpace: "nowrap", fontWeight: "bold", color: "#000", ...bodyStyle }}>{right}</td>
        </tr>
      </tbody>
    </table>
  );

  // ===================== SCRATCH RESUME RENDERERS =====================

  const hasEmployment = formData.employmentHistory?.some((j) => j.job_title || j.employer);
  const hasEducation = formData.educationHistory?.some((e) => e.school || e.degree);
  const hasSkills = formData.newSkillHistory?.some((s) => s.skill);

  const renderSummary = () =>
    formData.summary && (
      <section key="summary">
        <SectionHeading title={formData.summarySectionTitle || "Profile"} />
        <div
          style={{ ...bodyStyle, lineHeight: text.lineHeight, color: "#374151", textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: formData.summary }}
        />
      </section>
    );

  const renderEmployment = () =>
    hasEmployment && (
      <section key="employment">
        <SectionHeading title={formData.employmentSectionTitle || "Professional Experience"} />
        {formData.employmentHistory.map((job, i) => (
          <div key={i} style={{ marginBottom: "8pt" }}>
            <TwoColRow
              left={
                <strong style={{ color: "#000" }}>
                  {job.job_title}{job.employer ? `, ${job.employer}` : ""}
                  <span style={{ fontWeight: "normal", color: "#4b5563" }}>{job.city_state ? `, ${job.city_state}` : ""}</span>
                </strong>
              }
              right={dateRange(job.startDate, job.endDate)}
            />
            {job.description && (
              <div
                style={{ ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight }}
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            )}
          </div>
        ))}
      </section>
    );

  const renderEducation = () =>
    hasEducation && (
      <section key="education">
        <SectionHeading title={formData.educationSectionTitle || "Education"} />
        {formData.educationHistory.map((edu, i) => (
          <div key={i} style={{ marginBottom: "6pt" }}>
            <TwoColRow
              left={
                <strong style={{ color: "#000" }}>
                  {edu.degree}{edu.school ? `, ${edu.school}` : ""}
                  <span style={{ fontWeight: "normal", color: "#4b5563" }}>{edu.city_state ? `, ${edu.city_state}` : ""}</span>
                </strong>
              }
              right={dateRange(edu.startDate, edu.endDate)}
            />
            {edu.description && (
              <div
                style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}
                dangerouslySetInnerHTML={{ __html: edu.description }}
              />
            )}
          </div>
        ))}
      </section>
    );

  const renderSkills = () =>
    hasSkills && (
      <section key="skills">
        <SectionHeading title={formData.skillSectionTitle || "Skills"} />
        <table style={{ width: "100%", borderCollapse: "collapse", ...bodyStyle }}>
          <tbody>
            {Array.from({ length: Math.ceil(formData.newSkillHistory.length / 2) }, (_, rowIdx) => {
              const s1 = formData.newSkillHistory[rowIdx * 2];
              const s2 = formData.newSkillHistory[rowIdx * 2 + 1];
              return (
                <tr key={rowIdx}>
                  <td style={{ width: "50%", padding: "2pt 8pt 2pt 0", borderBottom: "1px solid #f3f4f6", color: "#1f2937", verticalAlign: "middle" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <tbody><tr>
                        <td>{s1?.skill}</td>
                        {!formData.hideExperienceLevel && <td style={{ textAlign: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "capatalize" }}>{typeof s1?.level === "number" ? skillLevels[s1.level] : s1?.level || ""}</td>}
                      </tr></tbody>
                    </table>
                  </td>
                  <td style={{ width: "50%", padding: "2pt 0 2pt 8pt", borderBottom: "1px solid #f3f4f6", color: "#1f2937", verticalAlign: "middle" }}>
                    {s2 && (
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody><tr>
                          <td>{s2?.skill}</td>
                          {!formData.hideExperienceLevel && <td style={{ textAlign: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "uppercase" }}>{typeof s2?.level === "number" ? skillLevels[s2.level] : s2?.level || ""}</td>}
                        </tr></tbody>
                      </table>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );

  const renderHobbies = () =>
    formData.hobbies && (
      <section key="hobbies">
        <SectionHeading title={formData.hobbiesSectionTitle || "Hobbies"} />
        <p style={{ ...bodyStyle, color: "#374151" }}>{formData.hobbies}</p>
      </section>
    );

  const renderLanguages = () =>
    formData.languageHistory?.some((l) => l.language) && (
      <section key="languages">
        <SectionHeading title={formData.languagesSectionTitle || "Languages"} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6pt", ...bodyStyle }}>
          {formData.languageHistory.map((l, i) => (
            <span key={i} style={{ background: "#f3f4f6", padding: "2pt 6pt", borderRadius: "3pt", color: "#374151" }}>
              {l.language}{!formData.hideLanguageProficiency && l.level ? ` (${l.level})` : ""}
            </span>
          ))}
        </div>
      </section>
    );

  const renderCourses = () =>
    formData.coursesHistory?.some((c) => c.course || c.institution) && (
      <section key="courses">
        <SectionHeading title={formData.coursesSectionTitle || "Courses"} />
        {formData.coursesHistory.map((course, i) => (
          <div key={i} style={{ marginBottom: "4pt" }}>
            <TwoColRow
              left={<strong style={{ color: "#000" }}>{course.course}{course.institution ? `, ${course.institution}` : ""}</strong>}
              right={dateRange(course.startDate, course.endDate)}
            />
          </div>
        ))}
      </section>
    );

  const renderActivities = () =>
    formData.activityHistory?.some((a) => a.functionTitle || a.employer) && (
      <section key="activities">
        <SectionHeading title={formData.activitiesSectionTitle || "Extra-curricular Activities"} />
        {formData.activityHistory.map((act, i) => (
          <div key={i} style={{ marginBottom: "6pt" }}>
            <TwoColRow
              left={<strong style={{ color: "#000" }}>{act.functionTitle}{act.employer ? `, ${act.employer}` : ""}{act.city ? `, ${act.city}` : ""}</strong>}
              right={dateRange(act.startDate, act.endDate)}
            />
            {act.description && <p style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}>{act.description}</p>}
          </div>
        ))}
      </section>
    );

  const renderInternships = () =>
    formData.internshipHistory?.some((i) => i.jobTitle || i.employer) && (
      <section key="internships">
        <SectionHeading title={formData.internshipsSectionTitle || "Internships"} />
        {formData.internshipHistory.map((intern, i) => (
          <div key={i} style={{ marginBottom: "6pt" }}>
            <TwoColRow
              left={<strong style={{ color: "#000" }}>{intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ""}{intern.city ? `, ${intern.city}` : ""}</strong>}
              right={dateRange(intern.startDate, intern.endDate)}
            />
            {intern.description && <p style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}>{intern.description}</p>}
          </div>
        ))}
      </section>
    );

  // ===================== IMPROVE RESUME RENDERERS =====================

  const renderSkillsFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    const skills = section.skills || [];
    return (
      <section key={section.id}>
        <SectionHeading title={section.title} />
        <table style={{ width: "100%", borderCollapse: "collapse", ...bodyStyle }}>
          <tbody>
            {Array.from({ length: Math.ceil(skills.length / 2) }, (_, rowIdx) => {
              const s1 = skills[rowIdx * 2];
              const s2 = skills[rowIdx * 2 + 1];
              return (
                <tr key={rowIdx}>
                  <td style={{ width: "50%", padding: "2pt 8pt 2pt 0", borderBottom: "1px solid #f3f4f6", color: "#1f2937", verticalAlign: "middle" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <tbody><tr>
                        <td>{s1?.name}</td>
                        {showLevel && <td style={{ textAlign: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "capitalize" }}>{typeof s1?.level === "number" ? skillLevels[s1.level] : s1?.level || ""}</td>}
                      </tr></tbody>
                    </table>
                  </td>
                  <td style={{ width: "50%", padding: "2pt 0 2pt 8pt", borderBottom: "1px solid #f3f4f6", color: "#1f2937", verticalAlign: "middle" }}>
                    {s2 && (
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody><tr>
                          <td>{s2?.name}</td>
                          {showLevel && <td style={{ textAlign: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "capitalize" }}>{typeof s2?.level === "number" ? skillLevels[s2.level] : s2?.level || ""}</td>}
                        </tr></tbody>
                      </table>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  };

  const renderSummaryFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      <div
        style={{ ...bodyStyle, lineHeight: text.lineHeight, color: "#374151", textAlign: "justify" }}
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
    </section>
  );

  const renderEducationFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.educations?.map((edu, i) => (
        <div key={edu.id || i} style={{ marginBottom: "6pt" }}>
          <TwoColRow
            left={
              <strong style={{ color: "#000" }}>
                {edu.degree}{edu.institute ? `, ${edu.institute}` : ""}
                <span style={{ fontWeight: "normal", color: "#4b5563" }}>{edu.city ? `, ${edu.city}` : ""}</span>
              </strong>
            }
            right={dateRange(edu.startDate, edu.endDate)}
          />
          {edu.description && (
            <div style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }} dangerouslySetInnerHTML={{ __html: edu.description }} />
          )}
        </div>
      ))}
    </section>
  );

  const renderExperienceFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.experiences?.map((exp, i) => (
        <div key={exp.id || i} style={{ marginBottom: "8pt" }}>
          <TwoColRow
            left={
              <strong style={{ color: "#000" }}>
                {exp.jobTitle}{exp.company ? `, ${exp.company}` : ""}
                <span style={{ fontWeight: "normal", color: "#4b5563" }}>{exp.city ? `, ${exp.city}` : ""}</span>
              </strong>
            }
            right={dateRange(exp.startDate, exp.endDate)}
          />
          {exp.description && (
            <div style={{ ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight }} dangerouslySetInnerHTML={{ __html: exp.description }} />
          )}
        </div>
      ))}
    </section>
  );

  const renderCertificationsFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.certifications?.map((cert, i) => (
        <div key={cert.id || i} style={{ marginBottom: "4pt" }}>
          <TwoColRow
            left={<strong style={{ color: "#000" }}>{cert.name}{cert.organization ? ` — ${cert.organization}` : ""}</strong>}
            right={cert.startYear && cert.endYear ? `${cert.startYear} — ${cert.endYear}` : cert.startYear || cert.endYear || ""}
          />
          {cert.description && <p style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}>{cert.description}</p>}
        </div>
      ))}
    </section>
  );

  const renderHobbiesFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      <p style={{ ...bodyStyle, color: "#374151" }}>{section.hobbies}</p>
    </section>
  );

  const renderCoursesFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.courses?.map((course, i) => (
        <div key={course.id || i} style={{ marginBottom: "4pt" }}>
          <TwoColRow
            left={<strong style={{ color: "#000" }}>{course.course}{course.institution ? `, ${course.institution}` : ""}</strong>}
            right={dateRange(course.startDate, course.endDate)}
          />
        </div>
      ))}
    </section>
  );

  const renderLanguagesFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6pt", ...bodyStyle }}>
        {section.languages?.map((l, i) => (
          <span key={i} style={{ background: "#f3f4f6", padding: "2pt 6pt", borderRadius: "3pt", color: "#374151" }}>
            {l.language}{!section.hideProficiency && l.level ? ` (${l.level})` : ""}
          </span>
        ))}
      </div>
    </section>
  );

  const renderInternshipsFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.internships?.map((intern, i) => (
        <div key={intern.id || i} style={{ marginBottom: "6pt" }}>
          <TwoColRow
            left={<strong style={{ color: "#000" }}>{intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ""}{intern.city ? `, ${intern.city}` : ""}</strong>}
            right={dateRange(intern.startDate, intern.endDate)}
          />
          {intern.description && <p style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}>{intern.description}</p>}
        </div>
      ))}
    </section>
  );

  const renderActivitiesFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.activities?.map((act, i) => (
        <div key={act.id || i} style={{ marginBottom: "6pt" }}>
          <TwoColRow
            left={<strong style={{ color: "#000" }}>{act.functionTitle}{act.employer ? `, ${act.employer}` : ""}{act.city ? `, ${act.city}` : ""}</strong>}
            right={dateRange(act.startDate, act.endDate)}
          />
          {act.description && <p style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }}>{act.description}</p>}
        </div>
      ))}
    </section>
  );

  const renderCustomSimpleFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    const items = section.items || [];
    return (
      <section key={section.id}>
        <SectionHeading title={section.title} />
        <table style={{ width: "100%", borderCollapse: "collapse", ...bodyStyle }}>
          <tbody>
            {Array.from({ length: Math.ceil(items.length / 2) }, (_, rowIdx) => {
              const it1 = items[rowIdx * 2];
              const it2 = items[rowIdx * 2 + 1];
              const n1 = typeof it1 === "object" ? it1?.name || it1?.title : it1;
              const n2 = it2 ? (typeof it2 === "object" ? it2?.name || it2?.title : it2) : "";
              return (
                <tr key={rowIdx}>
                  <td style={{ width: "50%", padding: "2pt 8pt 2pt 0", borderBottom: "1px solid #f3f4f6", color: "#1f2937" }}>
                    {n1}
                    {showLevel && it1 && <span style={{ float: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "capitalize" }}>{skillLevels[it1?.level ?? 2]}</span>}
                  </td>
                  <td style={{ width: "50%", padding: "2pt 0 2pt 8pt", borderBottom: "1px solid #f3f4f6", color: "#1f2937" }}>
                    {n2}
                    {showLevel && it2 && <span style={{ float: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "capitalize" }}>{skillLevels[it2?.level ?? 2]}</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  };

  const renderCustomAdvancedFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.items?.map((item, i) => (
        <div key={item.id || i} style={{ marginBottom: "6pt" }}>
          <TwoColRow
            left={<strong style={{ color: "#000" }}>{item.title}{item.city ? `, ${item.city}` : ""}</strong>}
            right={dateRange(item.startDate, item.endDate)}
          />
          {item.description && (
            <div style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }} dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
        </div>
      ))}
    </section>
  );

  // ===================== MAIN RENDER =====================

  const renderDynamicSections = () => {
    if (sections && sections.length > 0) {
      return sections.map((section) => {
        switch (section.type) {
          case "skills":         return renderSkillsFromSection(section);
          case "summary":        return renderSummaryFromSection(section);
          case "education":      return renderEducationFromSection(section);
          case "certifications": return renderCertificationsFromSection(section);
          case "experience":     return renderExperienceFromSection(section);
          case "hobbies":        return renderHobbiesFromSection(section);
          case "courses":        return renderCoursesFromSection(section);
          case "languages":      return renderLanguagesFromSection(section);
          case "internships":    return renderInternshipsFromSection(section);
          case "activities":     return renderActivitiesFromSection(section);
          case "custom_simple":  return renderCustomSimpleFromSection(section);
          case "custom":         return renderCustomAdvancedFromSection(section);
          default:               return null;
        }
      });
    }

    // Scratch resume
    const sectionRenderers = {
      summary: renderSummary,
      employment: renderEmployment,
      education: renderEducation,
      skills: renderSkills,
      courses: renderCourses,
      hobbies: renderHobbies,
      activities: renderActivities,
      languages: renderLanguages,
      internships: renderInternships,
    };

    const order = sectionOrder || ["summary", "employment", "education", "skills", "courses", "hobbies", "activities", "languages", "internships"];

    return order.map((sectionId) => {
      if (typeof sectionId === "string" && sectionId.startsWith("custom_simple_")) {
        const history = formData[`customSimpleHistory_${sectionId}`];
        const title = formData[`customSimpleTitle_${sectionId}`] || "Custom Section";
        const hideLevel = formData[`customSimpleHideLevel_${sectionId}`] ?? true;
        if (!history?.some((i) => i.name)) return null;
        const items = history;
        return (
          <section key={sectionId}>
            <SectionHeading title={title} />
            <table style={{ width: "100%", borderCollapse: "collapse", ...bodyStyle }}>
              <tbody>
                {Array.from({ length: Math.ceil(items.length / 2) }, (_, rowIdx) => {
                  const it1 = items[rowIdx * 2];
                  const it2 = items[rowIdx * 2 + 1];
                  return (
                    <tr key={rowIdx}>
                      <td style={{ width: "50%", padding: "2pt 8pt 2pt 0", borderBottom: "1px solid #f3f4f6", color: "#1f2937" }}>
                        {it1?.name}
                        {!hideLevel && <span style={{ float: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "uppercase" }}>{skillLevels[it1?.level ?? 2]}</span>}
                      </td>
                      <td style={{ width: "50%", padding: "2pt 0 2pt 8pt", borderBottom: "1px solid #f3f4f6", color: "#1f2937" }}>
                        {it2?.name}
                        {!hideLevel && it2 && <span style={{ float: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "uppercase" }}>{skillLevels[it2?.level ?? 2]}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        );
      }

      if (typeof sectionId === "string" && sectionId.startsWith("custom_advanced_")) {
        const history = formData[`customAdvancedHistory_${sectionId}`];
        const title = formData[`customAdvancedTitle_${sectionId}`] || "Custom Section";
        if (!history?.some((i) => i.title || i.city)) return null;
        return (
          <section key={sectionId}>
            <SectionHeading title={title} />
            {history.map((item, idx) => (
              <div key={idx} style={{ marginBottom: "6pt" }}>
                <TwoColRow
                  left={<strong style={{ color: "#000" }}>{item.title}{item.city ? `, ${item.city}` : ""}</strong>}
                  right={dateRange(item.startDate, item.endDate)}
                />
                {item.description && (
                  <div style={{ ...bodyStyle, color: "#374151", marginTop: "2pt" }} dangerouslySetInnerHTML={{ __html: item.description }} />
                )}
              </div>
            ))}
          </section>
        );
      }

      return sectionRenderers[sectionId]?.() ?? null;
    });
  };

  // ── Header alignment ──
  const headerAlign = layout.headerAlignment || "left";
  const headerTextAlign = headerAlign === "center" ? "center" : headerAlign === "right" ? "right" : "left";

  return (
    <div style={{ overflowY: "auto" }}>
      <div
        style={{
          minHeight: "297mm",
          width: "100%",
          backgroundColor: "#fff",
          fontFamily: text.primaryFont || "Arial",
          lineHeight: text.lineHeight || 1.5,
          fontSize: `${text.body}pt`,
          padding: `${layout.topBottom}pt ${layout.leftRight}pt`,
          boxSizing: "border-box",
        }}
      >
        {/* ── Header using table ── */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "8pt" }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: "top", textAlign: headerTextAlign }}>
                <div style={{
                  color: themeColor,
                  fontFamily: text.secondaryFont || text.primaryFont,
                  fontSize: `${text.primaryHeading}pt`,
                  fontWeight: text.primaryHeadingWeight || 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.025em",
                }}>
                  {formData.first_name} {formData.last_name}
                </div>

                <div style={{
                  fontSize: `${text.secondaryHeading}pt`,
                  fontWeight: text.secondaryHeadingWeight || 600,
                  textTransform: "uppercase",
                  marginTop: "2pt",
                }}>
                  {formData.job_target}
                </div>

                <div style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight, color: "#4b5563", marginTop: "4pt" }}>
                  {[formData.address, formData.city_state && formData.postal_code
                    ? `${formData.city_state}, ${formData.postal_code}`
                    : formData.city_state || formData.postal_code, formData.country]
                    .filter(Boolean).join(", ")}
                  {formData.email && <span> | <a href={`mailto:${formData.email}`} style={{ color: "#2b6cb0" }}>{formData.email}</a></span>}
                  {formData.phone && <span> | {formData.phone}</span>}
                </div>

                {(formData.linkedin || formData.github || formData.stackoverflow || formData.leetcode) && (
                  <div style={{ fontSize: `${text.body}pt`, marginTop: "2pt" }}>
                    {formData.linkedin && <a href={formData.linkedin} style={{ color: "#2b6cb0" }}>LinkedIn</a>}
                    {formData.github && <span> | <a href={formData.github} style={{ color: "#2b6cb0" }}>GitHub</a></span>}
                    {formData.stackoverflow && <span> | <a href={formData.stackoverflow} style={{ color: "#2b6cb0" }}>Stack Overflow</a></span>}
                    {formData.leetcode && <span> | <a href={formData.leetcode} style={{ color: "#2b6cb0" }}>LeetCode</a></span>}
                  </div>
                )}

                {(formData.dob || formData.nationality) && (
                  <div style={{ fontSize: `${text.body}pt`, color: "#4b5563", marginTop: "2pt" }}>
                    {formData.dob && <span>{formData.dob}</span>}
                    {formData.birth_place && <span> | {formData.birth_place}</span>}
                    {formData.nationality && <span> | {formData.nationality}</span>}
                    {formData.driving_licence && <span> | {formData.driving_licence}</span>}
                  </div>
                )}
              </td>

              {formData.profileImage && (
                <td style={{ width: "80pt", verticalAlign: "top", textAlign: "right" }}>
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    style={{ width: "72pt", height: "72pt", objectFit: "cover", borderRadius: "4pt" }}
                  />
                </td>
              )}
            </tr>
          </tbody>
        </table>

        {/* ── Sections ── */}
        {renderDynamicSections()}
      </div>
    </div>
  );
};

export default PrimeATS;





// "use client";
// import React from "react";

// const PrimeATS = ({ formData, sections, sectionOrder, themeColor, resumeSettings }) => {
//   const { text, layout } = resumeSettings;

//   const formatDate = (dateValue) => {
//     if (!dateValue) return null;
//     if (typeof dateValue === "string" && dateValue.toLowerCase() === "present") return "Present";
//     const d = new Date(dateValue);
//     if (isNaN(d.getTime())) return null;
//     return d.toLocaleString("en-US", { month: "short", year: "numeric" });
//   };


//   const dateRange = (startDate, endDate) => {
//     const start = formatDate(startDate);
//     const end   = formatDate(endDate);
//     if (start && end) return `${start} — ${end}`;
//     return start || end || "";
//   };

//   const sectionHeadingStyle = {
//     color: themeColor,
//     borderBottom: `1px solid ${themeColor}`,
//     borderTop: `1px solid ${themeColor}`,
//     fontFamily: text.secondaryFont,
//     fontSize: `${text.sectionTitle}pt`,
//     fontWeight: text.sectionTitleWeight,
//     marginTop: `${layout.betweenSections}pt`,
//     marginBottom: `${layout.betweenTitlesContent}pt`,
//   };

//   // ===================== SCRATCH RESUME RENDERERS =====================

//   const hasEmployment = formData.employmentHistory?.some((job) => job.job_title || job.employer);
//   const hasEducation = formData.educationHistory?.some((edu) => edu.school || edu.degree);
//   const hasSkills = formData.newSkillHistory?.some((s) => s.skill);
//   const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

//   const renderSummary = () =>
//     formData.summary && (
//       <section key="summary">
//         <h3 className="font-bold uppercase tracking-wider py-1" style={sectionHeadingStyle}>
//           {formData.summarySectionTitle || "Profile"}
//         </h3>
//         <div
//           className="leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//           style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}
//           dangerouslySetInnerHTML={{ __html: formData.summary }}
//         />
//       </section>
//     );

//   const renderEmployment = () =>
//     hasEmployment && (
//       <section key="employment">
//         <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>
//           {formData.employmentSectionTitle || "Professional Experience"}
//         </h3>
//         <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//           {formData.employmentHistory.map((job, index) => (
//             <div key={index}>
//               <div className="flex justify-between items-baseline">
//                 <div className="w-1/2">
//                   <h4 className="font-bold text-black">
//                     {job.job_title}{job.employer ? `, ${job.employer}` : ""}
//                     <span className="font-normal text-gray-600 ml-1">{job.city_state ? `, ${job.city_state}` : ""}</span>
//                   </h4>
//                 </div>
//                 <div className="w-1/2 text-right">
//                   <span className="font-bold text-black">
//                     {dateRange(job.startDate, job.endDate) && (
//                       <span className="font-bold text-black">{dateRange(job.startDate, job.endDate)}</span>
//                     )}
//                   </span>
//                 </div>
//               </div>
//               {job.description && (
//                 <div
//                   className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic"
//                   dangerouslySetInnerHTML={{ __html: job.description }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderEducation = () =>
//     hasEducation && (
//       <section key="education">
//         <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>
//           {formData.educationSectionTitle || "Education"}
//         </h3>
//         <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//           {formData.educationHistory.map((edu, index) => (
//             <div key={index}>
//               <div className="flex justify-between items-baseline">
//                 <div className="w-1/2">
//                   <h4 className="font-bold text-black">
//                     {edu.degree}{edu.school ? `, ${edu.school}` : ""}
//                     <span className="font-normal text-gray-600 ml-1">{edu.city_state ? `, ${edu.city_state}` : ""}</span>
//                   </h4>
//                 </div>
//                 <div className="w-1/2 text-right">
//                   <span className="font-bold text-black">
//                     {dateRange(edu.startDate, edu.endDate) && (
//                       <span className="font-bold text-black">{dateRange(edu.startDate, edu.endDate)}</span>
//                     )}
//                   </span>
//                 </div>
//               </div>
//               {edu.description && (
//                 <div
//                   className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//                   dangerouslySetInnerHTML={{ __html: edu.description }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderSkills = () =>
//     hasSkills && (
//       <section key="skills">
//         <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>
//           {formData.skillSectionTitle || "Skills"}
//         </h3>
//         <div className="grid grid-cols-2 gap-x-8 mt-2" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//           {formData.newSkillHistory.map((item, index) => (
//             <div key={index} className="flex justify-between border-b border-gray-100 pb-1">
//               <span className="text-gray-800">{item.skill}</span>
//               {!formData.hideExperienceLevel && (
//                 <span className="text-gray-400 text-[10px] uppercase">
//                   {typeof item.level === "number" ? skillLevels[item.level] : (item.level || "Expert")}
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderHobbies = () =>
//     formData.hobbies && (
//       <section key="hobbies">
//         <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>
//           {formData.hobbiesSectionTitle || "Hobbies"}
//         </h3>
//         <p style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }} className="text-gray-700">
//           {formData.hobbies}
//         </p>
//       </section>
//     );

//   const renderLanguages = () =>
//     formData.languageHistory?.some((l) => l.language) && (
//       <section key="languages">
//         <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>
//           {formData.languagesSectionTitle || "Languages"}
//         </h3>
//         <div className="flex flex-wrap gap-2" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//           {formData.languageHistory.map((l, i) => (
//             <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">
//               {l.language}{!formData.hideLanguageProficiency && l.level ? ` (${l.level})` : ""}
//             </span>
//           ))}
//         </div>
//       </section>
//     );

//   const renderCourses = () =>
//     formData.coursesHistory?.some((c) => c.course || c.institution) && (
//       <section key="courses">
//         <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>
//           {formData.coursesSectionTitle || "Courses"}
//         </h3>
//         <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//           {formData.coursesHistory.map((course, index) => (
//             <div key={index}>
//               <div className="flex justify-between items-baseline">
//                 <h4 className="font-bold text-black">
//                   {course.course}{course.institution ? `, ${course.institution}` : ""}
//                 </h4>
//                 <span className="font-bold text-black">
//                   {dateRange(course.startDate, course.endDate)}
//                 </span>
//               </div>
//               {course.description && (
//                 <p className="mt-1 text-gray-700 whitespace-pre-wrap leading-normal">{course.description}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderActivities = () =>
//     formData.activityHistory?.some((a) => a.functionTitle || a.employer) && (
//       <section key="activities">
//         <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>
//           {formData.activitiesSectionTitle || "Extra-curricular Activities"}
//         </h3>
//         <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//           {formData.activityHistory.map((activity, index) => (
//             <div key={index}>
//               <div className="flex justify-between items-baseline">
//                 <h4 className="font-bold text-black">
//                   {activity.functionTitle}{activity.employer ? `, ${activity.employer}` : ""}{activity.city ? `, ${activity.city}` : ""}
//                 </h4>
//                 <span className="font-bold text-black">
//                   {dateRange(activity.startDate, activity.endDate)}
//                 </span>
//               </div>
//               {activity.description && (
//                 <p className="mt-1 text-gray-700 whitespace-pre-wrap leading-normal">{activity.description}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderInternships = () =>
//     formData.internshipHistory?.some((i) => i.jobTitle || i.employer) && (
//       <section key="internships">
//         <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>
//           {formData.internshipsSectionTitle || "Internships"}
//         </h3>
//         <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//           {formData.internshipHistory.map((intern, index) => (
//             <div key={index}>
//               <div className="flex justify-between items-baseline">
//                 <h4 className="font-bold text-black">
//                   {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ""}{intern.city ? `, ${intern.city}` : ""}
//                 </h4>
//                 <span className="font-bold text-black">
//                   {dateRange(intern.startDate, intern.endDate)}
//                 </span>
//               </div>
//               {intern.description && (
//                 <p className="mt-1 text-gray-700 whitespace-pre-wrap leading-normal">{intern.description}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   // Scratch: Simple custom sections (customSimpleHistory_custom_simple_xxx)
//   const renderScratchSimpleCustomSections = () =>
//     Object.keys(formData)
//       .filter((key) => key.startsWith("customSimpleHistory_custom_simple_"))
//       .map((key) => {
//         const sectionId = key.replace("customSimpleHistory_", "");
//         const history = formData[key];
//         const title = formData[`customSimpleTitle_${sectionId}`] || "Custom Section";
//         const hideLevel = formData[`customSimpleHideLevel_${sectionId}`] ?? true;
//         if (!history?.some((item) => item.name)) return null;
//         return (
//           <section key={sectionId}>
//             <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{title}</h3>
//             <div className="grid grid-cols-2 gap-x-8 mt-2" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//               {history.map((item, index) => (
//                 <div key={index} className="flex justify-between border-b border-gray-100 pb-1">
//                   <span className="text-gray-800">{item.name}</span>
//                   {!hideLevel && (
//                     <span className="text-gray-400 text-[10px] uppercase">{skillLevels[item.level ?? 2]}</span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         );
//       });

//   // Scratch: Advanced custom sections (customAdvancedHistory_custom_advanced_xxx)
//   const renderScratchAdvancedCustomSections = () =>
//     Object.keys(formData)
//       .filter((key) => key.startsWith("customAdvancedHistory_custom_advanced_"))
//       .map((key) => {
//         const sectionId = key.replace("customAdvancedHistory_", "");
//         const history = formData[key];
//         const title = formData[`customAdvancedTitle_${sectionId}`] || "Custom Section";
//         if (!history?.some((item) => item.title || item.city)) return null;
//         return (
//           <section key={sectionId}>
//             <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{title}</h3>
//             <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//               {history.map((item, index) => (
//                 <div key={index}>
//                   <div className="flex justify-between items-baseline">
//                     <h4 className="font-bold text-black">
//                       {item.title}{item.city ? `, ${item.city}` : ""}
//                     </h4>
//                     <span className="font-bold text-black">
//                       {dateRange(item.startDate, item.endDate)}
//                     </span>
//                   </div>
//                   {item.description && (
//                     <div
//                       className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//                       dangerouslySetInnerHTML={{ __html: item.description }}
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         );
//       });

//   // ===================== IMPROVE RESUME RENDERERS =====================

//   const renderSkillsFromSection = (section) => {
//     const showLevel = section.hideExperienceLevel === false;
//     return (
//       <section key={section.id}>
//         <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//         <div className="grid grid-cols-2 gap-x-8 mt-2" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//           {section.skills?.map((skill, index) => (
//             <div key={skill.id || index} className="flex justify-between border-b border-gray-100 pb-1">
//               <span className="text-gray-800">{skill.name}</span>
//               {showLevel && (
//                 <span className="text-gray-400 text-[10px] uppercase">
//                   {typeof skill.level === "number" ? skillLevels[skill.level] : (skill.level || "Expert")}
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   };

//   const renderSummaryFromSection = (section) => (
//     <section key={section.id}>
//       <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//       <div
//         className="leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//         style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}
//         dangerouslySetInnerHTML={{ __html: section.summary }}
//       />
//     </section>
//   );

//   const renderEducationFromSection = (section) => (
//     <section key={section.id}>
//       <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//       <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//         {section.educations?.map((edu, index) => (
//           <div key={edu.id || index}>
//             <div className="flex justify-between items-baseline">
//               <div className="w-1/2">
//                 <h4 className="font-bold text-black">
//                   {edu.degree}{edu.institute ? `, ${edu.institute}` : ""}
//                   <span className="font-normal text-gray-600 ml-1">{edu.city ? `, ${edu.city}` : ""}</span>
//                 </h4>
//               </div>
//               <div className="w-1/2 text-right">
//                 <span className="font-bold text-black">
//                   {dateRange(edu.startDate, edu.endDate)}
//                 </span>
//               </div>
//             </div>
//             {edu.description && (
//               <div
//                 className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//                 dangerouslySetInnerHTML={{ __html: edu.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderExperienceFromSection = (section) => (
//     <section key={section.id}>
//       <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//       <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//         {section.experiences?.map((exp, index) => (
//           <div key={exp.id || index}>
//             <div className="flex justify-between items-baseline">
//               <div className="w-1/2">
//                 <h4 className="font-bold text-black">
//                   {exp.jobTitle}{exp.company ? `, ${exp.company}` : ""}
//                   <span className="font-normal text-gray-600 ml-1">{exp.city ? `, ${exp.city}` : ""}</span>
//                 </h4>
//               </div>
//               <div className="w-1/2 text-right">
//                 <span className="font-bold text-black">
//                   {dateRange(exp.startDate, exp.endDate)}
//                 </span>
//               </div>
//             </div>
//             {exp.description && (
//               <div
//                 className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//                 dangerouslySetInnerHTML={{ __html: exp.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderCertificationsFromSection = (section) => (
//     <section key={section.id}>
//       <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//       <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//         {section.certifications?.map((cert, index) => (
//           <div key={cert.id || index}>
//             <div className="flex justify-between items-baseline">
//               <h4 className="font-bold text-black">
//                 {cert.name}{cert.organization ? `, ${cert.organization}` : ""}
//               </h4>
//               <span className="font-bold text-black">
//                 {cert.startYear && cert.endYear
//                   ? `${cert.startYear} — ${cert.endYear}`
//                   : cert.startYear || cert.endYear || ""}
//               </span>
//             </div>
//             {cert.description && <p className="text-gray-700 mt-1">{cert.description}</p>}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderHobbiesFromSection = (section) => (
//     <section key={section.id}>
//       <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//       <p style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }} className="text-gray-700">
//         {section.hobbies}
//       </p>
//     </section>
//   );

//   const renderCoursesFromSection = (section) => (
//     <section key={section.id}>
//       <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//       <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//         {section.courses?.map((course, index) => (
//           <div key={course.id || index}>
//             <div className="flex justify-between items-baseline">
//               <h4 className="font-bold text-black">
//                 {course.course}{course.institution ? `, ${course.institution}` : ""}
//               </h4>
//               <span className="font-bold text-black">
//                 {dateRange(course.startDate, course.endDate)}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderLanguagesFromSection = (section) => (
//     <section key={section.id}>
//       <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//       <div className="flex flex-wrap gap-2" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//         {section.languages?.map((l, i) => (
//           <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">
//             {l.language}{!section.hideProficiency && l.level ? ` (${l.level})` : ""}
//           </span>
//         ))}
//       </div>
//     </section>
//   );

//   const renderInternshipsFromSection = (section) => (
//     <section key={section.id}>
//       <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//       <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//         {section.internships?.map((intern, index) => (
//           <div key={intern.id || index}>
//             <div className="flex justify-between items-baseline">
//               <h4 className="font-bold text-black">
//                 {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ""}{intern.city ? `, ${intern.city}` : ""}
//               </h4>
//               <span className="font-bold text-black">
//                 {dateRange(intern.startDate, intern.endDate)}
//               </span>
//             </div>
//             {intern.description && (
//               <p className="mt-1 text-gray-700 whitespace-pre-wrap leading-normal">{intern.description}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderActivitiesFromSection = (section) => (
//     <section key={section.id}>
//       <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//       <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//         {section.activities?.map((activity, index) => (
//           <div key={activity.id || index}>
//             <div className="flex justify-between items-baseline">
//               <h4 className="font-bold text-black">
//                 {activity.functionTitle}{activity.employer ? `, ${activity.employer}` : ""}{activity.city ? `, ${activity.city}` : ""}
//               </h4>
//               <span className="font-bold text-black">
//                 {dateRange(activity.startDate, activity.endDate)}
//               </span>
//             </div>
//             {activity.description && (
//               <p className="mt-1 text-gray-700 whitespace-pre-wrap leading-normal">{activity.description}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderCustomSimpleFromSection = (section) => {
//     const showLevel = section.hideExperienceLevel === false;
//     return (
//       <section key={section.id}>
//         <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//         <div className="" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//           {section.items?.map((item, index) => {
//             const displayName = typeof item === "object" ? (item.name || item.title) : item;
//             const level = typeof item === "object" ? (item.level ?? 2) : 2;
//             return (
//               <div key={index} className="flex justify-between border-b border-gray-100">
//                 <span className="text-gray-800">{displayName}</span>
//                 {showLevel && (
//                   <span className="text-gray-400 text-[10px] uppercase">{skillLevels[level]}</span>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     );
//   };

//   const renderCustomAdvancedFromSection = (section) => (
//     <section key={section.id}>
//       <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{section.title}</h3>
//       <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//         {section.items?.map((item, index) => (
//           <div key={item.id || index}>
//             <div className="flex justify-between items-baseline">
//               <h4 className="font-bold text-black">
//                 {item.title}{item.city ? `, ${item.city}` : ""}
//               </h4>
//               <span className="font-bold text-black">
//                 {dateRange(item.startDate, item.endDate)}
//               </span>
//             </div>
//             {item.description && (
//               <div
//                 className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//                 dangerouslySetInnerHTML={{ __html: item.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   // ===================== MAIN RENDER LOGIC =====================

//   const renderDynamicSections = () => {

//     if (sections && sections.length > 0) {
//       return sections.map((section) => {
//         switch (section.type) {
//           case "skills":        return renderSkillsFromSection(section);
//           case "summary":       return renderSummaryFromSection(section);
//           case "education":     return renderEducationFromSection(section);
//           case "certifications":return renderCertificationsFromSection(section);
//           case "experience":    return renderExperienceFromSection(section);
//           case "hobbies":       return renderHobbiesFromSection(section);
//           case "courses":       return renderCoursesFromSection(section);
//           case "languages":     return renderLanguagesFromSection(section);
//           case "internships":   return renderInternshipsFromSection(section);
//           case "activities":    return renderActivitiesFromSection(section);
//           case "custom_simple": return renderCustomSimpleFromSection(section);
//           case "custom":        return renderCustomAdvancedFromSection(section);
//           default:              return null;
//         }
//       });
//     }

//     // ── Scratch Resume: sectionOrder + formData ──
//     const sectionRenderers = {
//       summary:    renderSummary,
//       employment: renderEmployment,
//       education:  renderEducation,
//       skills:     renderSkills,
//       courses:    renderCourses,
//       hobbies:    renderHobbies,
//       activities: renderActivities,
//       languages:  renderLanguages,
//       internships:renderInternships,
//     };

//     const order = sectionOrder || [
//       "summary","employment","education","skills",
//       "courses","hobbies","activities","languages","internships",
//     ];

//     return [
//       ...order.map((sectionId) => {
//         // Dynamic custom sections
//         if (typeof sectionId === "string" && sectionId.startsWith("custom_simple_")) {
//           const history = formData[`customSimpleHistory_${sectionId}`];
//           const title   = formData[`customSimpleTitle_${sectionId}`] || "Custom Section";
//           const hideLevel = formData[`customSimpleHideLevel_${sectionId}`] ?? true;
//           if (!history?.some((i) => i.name)) return null;
//           return (
//             <section key={sectionId}>
//               <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{title}</h3>
//               <div className="grid grid-cols-2 gap-x-8 mt-2" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//                 {history.map((item, idx) => (
//                   <div key={idx} className="flex justify-between border-b border-gray-100 pb-1">
//                     <span className="text-gray-800">{item.name}</span>
//                     {!hideLevel && <span className="text-gray-400 text-[10px] uppercase">{skillLevels[item.level ?? 2]}</span>}
//                   </div>
//                 ))}
//               </div>
//             </section>
//           );
//         }

//         if (typeof sectionId === "string" && sectionId.startsWith("custom_advanced_")) {
//           const history = formData[`customAdvancedHistory_${sectionId}`];
//           const title   = formData[`customAdvancedTitle_${sectionId}`] || "Custom Section";
//           if (!history?.some((i) => i.title || i.city)) return null;
//           return (
//             <section key={sectionId}>
//               <h3 className="font-bold py-1 uppercase tracking-wider" style={sectionHeadingStyle}>{title}</h3>
//               <div className="flex flex-col gap-4" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//                 {history.map((item, idx) => (
//                   <div key={idx}>
//                     <div className="flex justify-between items-baseline">
//                       <h4 className="font-bold text-black">{item.title}{item.city ? `, ${item.city}` : ""}</h4>
//                       <span className="font-bold text-black">
//                         {dateRange(item.startDate, item.endDate)}
//                       </span>
//                     </div>
//                     {item.description && (
//                       <div
//                         className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//                         dangerouslySetInnerHTML={{ __html: item.description }}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </section>
//           );
//         }

//         // Static sections
//         return sectionRenderers[sectionId]?.() ?? null;
//       }),
//     ];
//   };

//   const headerAlign = layout.headerAlignment || "left";
//   const alignmentClass   = headerAlign === "center" ? "text-center items-center" : headerAlign === "right" ? "text-right items-end" : "text-left items-start";
//   const containerJustify = headerAlign === "center" ? "justify-center" : headerAlign === "right" ? "justify-end" : "justify-between";

//   return (
//     <div className="h-screen overflow-y-auto hide-scrollbar">
//       <div
//         className="min-h-[297mm] w-full bg-white text-gray-800 font-sans shadow-lg resume-root"
//         style={{
//           padding: `${layout.topBottom}pt ${layout.leftRight}pt`,
//           fontFamily: text.primaryFont,
//           lineHeight: text.lineHeight,
//           fontSize: text.fontSize,
//         }}
//       >
//         {/* ── Header ── */}
//         <div className={`flex ${containerJustify} gap-4`}>
//           <div className={`flex-1 flex flex-col ${alignmentClass}`}>
//             <h1
//               className="font-bold uppercase tracking-tight"
//               style={{ color: themeColor, fontFamily: text.secondaryFont, fontSize: `${text.primaryHeading}pt`, fontWeight: text.primaryHeadingWeight }}
//             >
//               {formData.first_name} {formData.last_name}
//             </h1>
//             <h2 className="uppercase mt-1" style={{ fontSize: `${text.secondaryHeading}pt`, fontWeight: text.secondaryHeadingWeight }}>
//               {formData.job_target}
//             </h2>
//             <div className="mt-2 flex flex-wrap items-center gap-x-2 text-gray-600" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//               {formData.address && <span>{formData.address},</span>}
//               {(formData.city_state || formData.postal_code) && (
//                 <span>{formData.city_state}{formData.postal_code ? `, ${formData.postal_code}` : ""},</span>
//               )}
//               {formData.country && <span>{formData.country}</span>}
//               {formData.email && (<><span>|</span><a href={`mailto:${formData.email}`} className="text-[#2b6cb0] underline">{formData.email}</a></>)}
//               {formData.phone && <span>| {formData.phone}</span>}
//             </div>
//             <div className="mt-1 flex flex-wrap gap-x-3" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//               {formData.linkedin    && <a href={formData.linkedin}      target="_blank" className="text-[#2b6cb0] underline">LinkedIn</a>}
//               {formData.github      && <a href={formData.github}        target="_blank" className="text-[#2b6cb0] underline">GitHub</a>}
//               {formData.stackoverflow && <a href={formData.stackoverflow} target="_blank" className="text-[#2b6cb0] underline">Stack Overflow</a>}
//               {formData.leetcode    && <a href={formData.leetcode}      target="_blank" className="text-[#2b6cb0] underline">LeetCode</a>}
//             </div>
//             {(formData.dob || formData.nationality) && (
//               <div className="mt-1 text-gray-600" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
//                 {formData.dob        && <span>{formData.dob}</span>}
//                 {formData.birth_place && <span> | {formData.birth_place}</span>}
//                 {formData.nationality && <span> | {formData.nationality}</span>}
//                 {formData.driving_licence && <span> | {formData.driving_licence}</span>}
//               </div>
//             )}
//           </div>
//           {formData.profileImage && (
//             <div className="w-24 h-24 ml-4">
//               <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover rounded-md shadow-sm" />
//             </div>
//           )}
//         </div>

//         {/* ── Sections ── */}
//         {renderDynamicSections()}
//       </div>
//     </div>
//   );
// };

// export default PrimeATS;