"use client";
import React from "react";
import { renderDynamicFields } from "./renderDynamicFields";

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

  const SectionHeading = ({ title }) => (
    <div className="section-heading" style={sectionHeadingStyle}>{title}</div>
  );

  const TwoColRow = ({ left, right }) => (
    <table className="section-heading" style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", breakInside: "avoid", pageBreakInside: "avoid" }}>
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
          className="resume-content"
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
            {renderDynamicFields(job, { ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight })}
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
            {renderDynamicFields(edu, { ...bodyStyle, color: "#374151", marginTop: "2pt" })}
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
                <tr key={rowIdx} style={{ }}>
                  <td style={{ width: "50%", padding: "2pt 8pt 2pt 0", color: "#1f2937", verticalAlign: "middle" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <tbody><tr>
                        <td>{s1?.skill}</td>
                        {!formData.hideExperienceLevel && <td style={{ textAlign: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "capitalize" }}>{typeof s1?.level === "number" ? skillLevels[s1.level] : s1?.level || ""}</td>}
                      </tr></tbody>
                    </table>
                  </td>
                  <td style={{ width: "50%", padding: "2pt 0 2pt 8pt", color: "#1f2937", verticalAlign: "middle" }}>
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
            {renderDynamicFields(course, { ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight })}
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
            {renderDynamicFields(act, { ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight })}
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
            {renderDynamicFields(intern, { ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight })}
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
                <tr key={rowIdx} style={{ }}>
                  <td style={{ width: "50%", padding: "2pt 8pt 2pt 0", color: "#1f2937", verticalAlign: "middle" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <tbody><tr>
                        <td>{s1?.name}</td>
                        {showLevel && <td style={{ textAlign: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "capitalize" }}>{typeof s1?.level === "number" ? skillLevels[s1.level] : s1?.level || ""}</td>}
                      </tr></tbody>
                    </table>
                  </td>
                  <td style={{ width: "50%", padding: "2pt 0 2pt 8pt", color: "#1f2937", verticalAlign: "middle" }}>
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
        className="resume-content"
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
          {renderDynamicFields(edu, { ...bodyStyle, color: "#374151", marginTop: "2pt" })}
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
          {renderDynamicFields(exp, { ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight })}
        </div>
      ))}
    </section>
  );

  const renderCertificationsFromSection = (section) => (
    <section key={section.id}>
      <SectionHeading title={section.title} />
      {section.certifications?.map((cert, i) => (
        <div key={cert.id || i} style={{ marginBottom: "8pt" }}>
          <TwoColRow
            left={
              <strong style={{ color: "#000" }}>
                {cert.name}{cert.city ? `, ${cert.city}` : ""}
              </strong>
            }
            right={dateRange(cert.startYear, cert.endYear)}
          />
          {renderDynamicFields(cert, { ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight })}
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
          {renderDynamicFields(course, { ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight })}
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
          {renderDynamicFields(intern, { ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight })}
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
          {renderDynamicFields(act, { ...bodyStyle, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight })}
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
            {items.map((item, idx) => {
              const name = typeof item === "object" ? item?.name || item?.title : item;
              return (
                <tr key={idx} style={{ }}>
                  <td style={{ width: showLevel ? "80%" : "100%", padding: "2pt 0", color: "#1f2937" }}>
                    {name}
                  </td>
                  {showLevel && item && (
                    <td style={{ width: "20%", padding: "2pt 0", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "capitalize", textAlign: "right" }}>
                      {skillLevels[item?.level ?? 2]}
                    </td>
                  )}
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
          {renderDynamicFields(item, { ...bodyStyle, color: "#374151", marginTop: "2pt" })}
        </div>
      ))}
    </section>
  );

  // ===================== MAIN RENDER =====================

  const renderDynamicSections = () => {
    if (sections && sections.length > 0) {
      return sections.map((section) => {
        switch (section.type) {
          case "skills": return renderSkillsFromSection(section);
          case "summary": return renderSummaryFromSection(section);
          case "education": return renderEducationFromSection(section);
          case "certifications": return renderCertificationsFromSection(section);
          case "experience": return renderExperienceFromSection(section);
          case "hobbies": return renderHobbiesFromSection(section);
          case "courses": return renderCoursesFromSection(section);
          case "languages": return renderLanguagesFromSection(section);
          case "internships": return renderInternshipsFromSection(section);
          case "activities": return renderActivitiesFromSection(section);
          case "custom_simple": return renderCustomSimpleFromSection(section);
          case "custom": return renderCustomAdvancedFromSection(section);
          default: return null;
        }
      });
    }

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
                    <tr key={rowIdx} style={{ }}>
                      <td style={{ width: "50%", padding: "2pt 8pt 2pt 0", color: "#1f2937" }}>
                        {it1?.name}
                        {!hideLevel && <span style={{ float: "right", color: "#9ca3af", fontSize: `${text.body - 1}pt`, textTransform: "uppercase" }}>{skillLevels[it1?.level ?? 2]}</span>}
                      </td>
                      <td style={{ width: "50%", padding: "2pt 0 2pt 8pt", color: "#1f2937" }}>
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
                {renderDynamicFields(item, { ...bodyStyle, color: "#374151", marginTop: "2pt" })}
              </div>
            ))}
          </section>
        );
      }

      return sectionRenderers[sectionId]?.() ?? null;
    });
  };

  const headerAlign = layout.headerAlignment || "left";
  const headerTextAlign = headerAlign === "center" ? "center" : headerAlign === "right" ? "right" : "left";

  return (
    <div style={{ overflowY: "auto" }}>
      <style>{`
        .resume-content ul { list-style-type: disc; padding-left: 16pt; margin: 2pt 0; }
        .resume-content ol { list-style-type: decimal; padding-left: 16pt; margin: 2pt 0; }
        .resume-content li { margin-bottom: 2pt; }
        .resume-content strong { font-weight: bold; }
        .resume-content em { font-style: italic; }
        .resume-content p { margin-bottom: 2pt; }
      `}</style>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          fontFamily: text.primaryFont || "Arial",
          lineHeight: text.lineHeight || 1.5,
          fontSize: `${text.body}pt`,
          boxSizing: "border-box",
        }}
      >
        <thead><tr><th style={{ height: `${layout.topBottom}pt`, padding: 0, margin: 0, border: "none" }}></th></tr></thead>
        <tbody>
          <tr>
            <td style={{ paddingLeft: `${layout.leftRight}pt`, paddingRight: `${layout.leftRight}pt`, verticalAlign: "top" }}>
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

                {(formData.dob || formData.birth_place || formData.nationality || formData.driving_licence) && (
                  <div style={{ fontSize: `${text.body}pt`, color: "#4b5563", marginTop: "2pt" }}>
                    {[
                      formData.dob,
                      formData.birth_place,
                      formData.nationality,
                      formData.driving_licence,
                    ]
                      .filter(Boolean)
                      .join(" | ")}
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
            </td>
          </tr>

          {/* Map each section into its own table row to prevent Chromium's massive single-cell multi-page gap bug */}
          {renderDynamicSections()?.map((sectionNode, idx) => 
            sectionNode ? (
              <tr key={idx}>
                <td style={{ paddingLeft: `${layout.leftRight}pt`, paddingRight: `${layout.leftRight}pt`, verticalAlign: "top" }}>
                  {sectionNode}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
        <tfoot><tr><td style={{ height: `${layout.topBottom}pt`, padding: 0, margin: 0, border: "none" }}></td></tr></tfoot>
      </table>
    </div>
  );
};

export default PrimeATS;
