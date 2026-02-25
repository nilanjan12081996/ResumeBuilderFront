"use client";
import React from "react";

const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

const VividTemplate = ({ formData, sections, sectionOrder, resumeSettings, themeColor }) => {
  const text    = resumeSettings?.text   || {};
  const layout  = resumeSettings?.layout || {};

  // ── themeColor শুধু header bg তে ──
  const headerBg = themeColor || "#ffeb3b";

  const topBottom            = layout.topBottom            ?? 28;
  const leftRight            = layout.leftRight            ?? 28;
  const betweenSections      = layout.betweenSections      ?? 16;
  const betweenTitlesContent = layout.betweenTitlesContent ?? 8;

  const primaryFont            = text.primaryFont            || "Arial, Helvetica, sans-serif";
  const secondaryFont          = text.secondaryFont          || "Arial, Helvetica, sans-serif";
  const bodySize               = text.body                   || 9;
  const bodyWeight             = text.bodyWeight             || "normal";
  const lineHeight             = text.lineHeight             || 1.5;
  const sectionTitleSize       = text.sectionTitle           || 10;
  const sectionTitleWeight     = text.sectionTitleWeight     || "800";
  const primaryHeadingSize     = text.primaryHeading         || 36;
  const primaryHeadingWeight   = text.primaryHeadingWeight   || "900";
  const secondaryHeadingSize   = text.secondaryHeading       || 9;
  const secondaryHeadingWeight = text.secondaryHeadingWeight || "700";

  // ── Helpers ───────────────────────────────────────────────────────────────
  const formatDate = (dateValue) => {
    if (!dateValue) return null;
    if (typeof dateValue === "string" && dateValue.toLowerCase() === "present") return "Present";
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleString("en-US", { month: "short", year: "numeric" }).toUpperCase();
  };

  const dateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end   = formatDate(endDate);
    if (start && end) return `${start} — ${end}`;
    return start || end || "";
  };

  // ── Shared styles ─────────────────────────────────────────────────────────
  const bodyStyle = {
    fontFamily: primaryFont,
    fontSize: `${bodySize}pt`,
    fontWeight: bodyWeight,
    lineHeight: lineHeight,
    color: "#374151",
  };

  const sectionGap = { marginBottom: `${betweenSections}pt` };

  // ── Section heading — black badge label ──────────────────────────────────
  const SectionHeading = ({ title }) => (
    <div style={{
      display: "inline-block",
      backgroundColor: "#111",
      color: "#fff",
      fontFamily: secondaryFont,
      fontSize: `${sectionTitleSize}pt`,
      fontWeight: sectionTitleWeight,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "2pt 8pt",
      marginBottom: `${betweenTitlesContent}pt`,
    }}>
      {title}
    </div>
  );

  // ── Entry title row ───────────────────────────────────────────────────────
  const EntryTitle = ({ title, sub }) => (
    <div style={{ marginBottom: "2pt" }}>
      <span style={{
        fontFamily: secondaryFont,
        fontSize: `${bodySize + 1}pt`,
        fontWeight: "700",
        color: "#111",
      }}>
        {title}
      </span>
      {sub && (
        <span style={{
          fontFamily: primaryFont,
          fontSize: `${bodySize}pt`,
          fontWeight: "400",
          color: "#555",
        }}>
          {sub}
        </span>
      )}
    </div>
  );

  const DateLine = ({ range }) =>
    range ? (
      <div style={{
        fontFamily: primaryFont,
        fontSize: `${bodySize - 1}pt`,
        fontWeight: "600",
        color: "#9ca3af",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        marginBottom: "4pt",
      }}>
        {range}
      </div>
    ) : null;

  // ── Skill bar — table-based, PDF-safe ────────────────────────────────────
  const SkillBar = ({ level, total = 5 }) => {
    const filled = Math.max(1, Math.min(total, Math.round(level ?? 0) + 1));
    const SEG_H  = "4pt";
    const cells  = Array.from({ length: total }).map((_, i) => i < filled ? "#111" : "#e5e7eb");
    return (
      <table style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "2pt 0",
        marginTop: "2pt",
        marginBottom: "6pt",
        tableLayout: "fixed",
      }}>
        <tbody>
          <tr>
            {cells.map((bg, i) => (
              <td key={i} style={{
                backgroundColor: bg,
                height: SEG_H,
                padding: 0,
                lineHeight: 0,
                fontSize: 0,
                border: "none",
              }}>&nbsp;</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  const getLangLevel = (langLevel) => {
    if (typeof langLevel === "number") return langLevel;
    const map = {
      "native speaker": 5, "native": 5,
      "highly proficient": 4, "fluent": 4, "advanced": 4,
      "very good command": 3, "upper intermediate": 3,
      "good working knowledge": 2, "intermediate": 2,
      "working knowledge": 1, "elementary": 1, "beginner": 1, "basic": 1,
      "a1": 0, "a2": 1, "b1": 2, "b2": 3, "c1": 4, "c2": 5,
    };
    if (typeof langLevel === "string") return map[langLevel.toLowerCase()] ?? 2;
    return 2;
  };

  // ════════════════════════════════════════════════════════════════════════
  //  SCRATCH SECTIONS
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryScratch = () => {
    if (!formData.summary) return null;
    return (
      <div key="summary" style={sectionGap}>
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
    if (!formData.employmentHistory?.some(j => j.job_title || j.employer)) return null;
    return (
      <div key="employment" style={sectionGap}>
        <SectionHeading title={formData.employmentSectionTitle || "Experience"} />
        {formData.employmentHistory.map((job, i) => (
          <div key={i} style={{ marginBottom: "10pt" }}>
            <EntryTitle
              title={job.job_title}
              sub={`${job.employer ? `, ${job.employer}` : ""}${job.city_state ? `, ${job.city_state}` : ""}`}
            />
            <DateLine range={dateRange(job.startDate, job.endDate)} />
            {job.description && (
              <div className="resume-content" style={bodyStyle}
                dangerouslySetInnerHTML={{ __html: job.description }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEducationScratch = () => {
    if (!formData.educationHistory?.some(e => e.school || e.degree)) return null;
    return (
      <div key="education" style={sectionGap}>
        <SectionHeading title={formData.educationSectionTitle || "Education"} />
        {formData.educationHistory.map((edu, i) => (
          <div key={i} style={{ marginBottom: "8pt" }}>
            <EntryTitle
              title={edu.degree}
              sub={`${edu.school ? `, ${edu.school}` : ""}${edu.city_state ? `, ${edu.city_state}` : ""}`}
            />
            <DateLine range={dateRange(edu.startDate, edu.endDate)} />
            {edu.description && (
              <div className="resume-content" style={bodyStyle}
                dangerouslySetInnerHTML={{ __html: edu.description }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderInternshipsScratch = () => {
    if (!formData.internshipHistory?.some(i => i.jobTitle || i.employer)) return null;
    return (
      <div key="internships" style={sectionGap}>
        <SectionHeading title={formData.internshipsSectionTitle || "Internships"} />
        {formData.internshipHistory.map((job, i) => (
          <div key={i} style={{ marginBottom: "8pt" }}>
            <EntryTitle
              title={job.jobTitle}
              sub={`${job.employer ? `, ${job.employer}` : ""}${job.city ? `, ${job.city}` : ""}`}
            />
            <DateLine range={dateRange(job.startDate, job.endDate)} />
            {job.description && (
              <div className="resume-content" style={bodyStyle}
                dangerouslySetInnerHTML={{ __html: job.description }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderActivitiesScratch = () => {
    if (!formData.activityHistory?.some(a => a.functionTitle || a.employer)) return null;
    return (
      <div key="activities" style={sectionGap}>
        <SectionHeading title={formData.activitiesSectionTitle || "Activities"} />
        {formData.activityHistory.map((act, i) => (
          <div key={i} style={{ marginBottom: "8pt" }}>
            <EntryTitle
              title={act.functionTitle}
              sub={`${act.employer ? ` - ${act.employer}` : ""}${act.city ? `, ${act.city}` : ""}`}
            />
            <DateLine range={dateRange(act.startDate, act.endDate)} />
            {act.description && (
              <div className="resume-content" style={bodyStyle}
                dangerouslySetInnerHTML={{ __html: act.description }} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCoursesScratch = () => {
    if (!formData.coursesHistory?.some(c => c.course || c.institution)) return null;
    return (
      <div key="courses" style={sectionGap}>
        <SectionHeading title={formData.coursesSectionTitle || "Courses"} />
        {formData.coursesHistory.map((c, i) => (
          <div key={i} style={{ marginBottom: "6pt" }}>
            <EntryTitle
              title={c.course}
              sub={c.institution ? ` - ${c.institution}` : ""}
            />
            <DateLine range={dateRange(c.startDate, c.endDate)} />
          </div>
        ))}
      </div>
    );
  };

  const renderSkillsScratch = () => {
    if (!formData.newSkillHistory?.some(s => s.skill)) return null;
    return (
      <div key="skills" style={sectionGap}>
        <SectionHeading title={formData.skillSectionTitle || "Skills"} />
        {formData.newSkillHistory.map((item, i) => (
          <div key={i} style={{ marginBottom: "4pt" }}>
            <div style={{
              fontFamily: secondaryFont,
              fontSize: `${bodySize}pt`,
              fontWeight: "700",
              color: "#111",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: "1pt",
            }}>
              {item.skill}
            </div>
            {!formData.hideExperienceLevel && (
              <SkillBar level={item.level ?? 3} total={5} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderLanguagesScratch = () => {
    if (!formData.languageHistory?.some(l => l.language)) return null;
    return (
      <div key="languages" style={sectionGap}>
        <SectionHeading title={formData.languagesSectionTitle || "Languages"} />
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "50%" }} />
            <col style={{ width: "50%" }} />
          </colgroup>
          <tbody>
            {Array.from({ length: Math.ceil(formData.languageHistory.length / 2) }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {[0, 1].map(colIdx => {
                  const lang = formData.languageHistory[rowIdx * 2 + colIdx];
                  if (!lang) return <td key={colIdx} />;
                  return (
                    <td key={colIdx} style={{ verticalAlign: "top", paddingRight: "12pt", paddingBottom: "6pt" }}>
                      <div style={{ ...bodyStyle, fontWeight: "500", color: "#111", marginBottom: "1pt" }}>
                        {lang.language}
                      </div>
                      {!formData.hideLanguageProficiency && (
                        <SkillBar level={getLangLevel(lang.level)} total={6} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderHobbiesScratch = () => {
    if (!formData.hobbies) return null;
    return (
      <div key="hobbies" style={sectionGap}>
        <SectionHeading title={formData.hobbiesSectionTitle || "Hobbies"} />
        <div style={{ ...bodyStyle, fontWeight: "500" }}>
          {formData.hobbies.split("\n").map((h, i) => (
            <div key={i}>{h}</div>
          ))}
        </div>
      </div>
    );
  };

  const renderScratchSimpleCustom = () =>
    Object.keys(formData)
      .filter(k => k.startsWith("customSimpleHistory_custom_simple_"))
      .map(key => {
        const sectionId = key.replace("customSimpleHistory_", "");
        const history   = formData[key];
        const title     = formData[`customSimpleTitle_${sectionId}`]     || "Custom Section";
        const hideLevel = formData[`customSimpleHideLevel_${sectionId}`] ?? true;
        if (!history?.some(i => i.name)) return null;
        return (
          <div key={sectionId} style={sectionGap}>
            <SectionHeading title={title} />
            {history.map((item, i) => (
              <div key={i} style={{ marginBottom: "4pt" }}>
                <div style={{
                  fontFamily: secondaryFont,
                  fontSize: `${bodySize}pt`,
                  fontWeight: "700",
                  color: "#111",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}>
                  {item.name}
                  {!hideLevel && item.level !== undefined && (
                    <span style={{ fontWeight: "400", color: "#6b7280", marginLeft: "6pt", fontSize: `${bodySize - 0.5}pt`, textTransform: "none" }}>
                      {skillLevels[item.level ?? 2]}
                    </span>
                  )}
                </div>
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
          <div key={sectionId} style={sectionGap}>
            <SectionHeading title={title} />
            {history.map((item, i) => (
              <div key={i} style={{ marginBottom: "8pt" }}>
                <EntryTitle
                  title={item.title}
                  sub={item.city ? `, ${item.city}` : ""}
                />
                <DateLine range={dateRange(item.startDate, item.endDate)} />
                {item.description && (
                  <div className="resume-content" style={bodyStyle}
                    dangerouslySetInnerHTML={{ __html: item.description }} />
                )}
              </div>
            ))}
          </div>
        );
      });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTIONS PROP
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryFromSection = (section) => (
    <div key={section.id} style={sectionGap}>
      <SectionHeading title={section.title} />
      <div className="resume-content" style={{ ...bodyStyle, textAlign: "justify" }}
        dangerouslySetInnerHTML={{ __html: section.summary }} />
    </div>
  );

  const renderExperienceFromSection = (section) => (
    <div key={section.id} style={sectionGap}>
      <SectionHeading title={section.title} />
      {section.experiences?.map((exp, i) => (
        <div key={exp.id || i} style={{ marginBottom: "10pt" }}>
          <EntryTitle
            title={exp.jobTitle}
            sub={`${exp.company ? `, ${exp.company}` : ""}${exp.city ? `, ${exp.city}` : ""}`}
          />
          <DateLine range={dateRange(exp.startDate, exp.endDate)} />
          {exp.description && (
            <div className="resume-content" style={bodyStyle}
              dangerouslySetInnerHTML={{ __html: exp.description }} />
          )}
        </div>
      ))}
    </div>
  );

  const renderEducationFromSection = (section) => (
    <div key={section.id} style={sectionGap}>
      <SectionHeading title={section.title} />
      {section.educations?.map((edu, i) => (
        <div key={edu.id || i} style={{ marginBottom: "8pt" }}>
          <EntryTitle
            title={edu.degree}
            sub={`${edu.institute ? `, ${edu.institute}` : ""}${edu.city ? `, ${edu.city}` : ""}`}
          />
          <DateLine range={dateRange(edu.startDate, edu.endDate)} />
          {edu.description && (
            <div className="resume-content" style={bodyStyle}
              dangerouslySetInnerHTML={{ __html: edu.description }} />
          )}
        </div>
      ))}
    </div>
  );

  const renderCertificationsFromSection = (section) => (
    <div key={section.id} style={sectionGap}>
      <SectionHeading title={section.title} />
      {section.certifications?.map((cert, i) => (
        <div key={cert.id || i} style={{ marginBottom: "8pt" }}>
          <EntryTitle
            title={cert.name}
            sub={cert.organization ? `, ${cert.organization}` : ""}
          />
          <DateLine range={dateRange(cert.startDate || cert.startYear, cert.endDate || cert.endYear)} />
          {cert.description && (
            <div className="resume-content" style={bodyStyle}
              dangerouslySetInnerHTML={{ __html: cert.description }} />
          )}
        </div>
      ))}
    </div>
  );

  const renderCoursesFromSection = (section) => (
    <div key={section.id} style={sectionGap}>
      <SectionHeading title={section.title} />
      {section.courses?.map((c, i) => (
        <div key={c.id || i} style={{ marginBottom: "6pt" }}>
          <EntryTitle
            title={c.course}
            sub={c.institution ? ` - ${c.institution}` : ""}
          />
          <DateLine range={dateRange(c.startDate, c.endDate)} />
        </div>
      ))}
    </div>
  );

  const renderInternshipsFromSection = (section) => (
    <div key={section.id} style={sectionGap}>
      <SectionHeading title={section.title} />
      {section.internships?.map((intern, i) => (
        <div key={intern.id || i} style={{ marginBottom: "8pt" }}>
          <EntryTitle
            title={intern.jobTitle}
            sub={`${intern.employer ? `, ${intern.employer}` : ""}${intern.city ? `, ${intern.city}` : ""}`}
          />
          <DateLine range={dateRange(intern.startDate, intern.endDate)} />
          {intern.description && (
            <div className="resume-content" style={bodyStyle}
              dangerouslySetInnerHTML={{ __html: intern.description }} />
          )}
        </div>
      ))}
    </div>
  );

  const renderActivitiesFromSection = (section) => (
    <div key={section.id} style={sectionGap}>
      <SectionHeading title={section.title} />
      {section.activities?.map((a, i) => (
        <div key={a.id || i} style={{ marginBottom: "8pt" }}>
          <EntryTitle
            title={a.functionTitle}
            sub={`${a.employer ? ` - ${a.employer}` : ""}${a.city ? `, ${a.city}` : ""}`}
          />
          <DateLine range={dateRange(a.startDate, a.endDate)} />
          {a.description && (
            <div className="resume-content" style={bodyStyle}
              dangerouslySetInnerHTML={{ __html: a.description }} />
          )}
        </div>
      ))}
    </div>
  );

  const renderSkillsFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <div key={section.id} style={sectionGap}>
        <SectionHeading title={section.title} />
        {section.skills?.map((skill, i) => (
          <div key={skill.id || i} style={{ marginBottom: "4pt" }}>
            <div style={{
              fontFamily: secondaryFont,
              fontSize: `${bodySize}pt`,
              fontWeight: "700",
              color: "#111",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: "1pt",
            }}>
              {skill.name}
            </div>
            {showLevel && <SkillBar level={skill.level ?? 3} total={5} />}
          </div>
        ))}
      </div>
    );
  };

  const renderLanguagesFromSection = (section) => (
    <div key={section.id} style={sectionGap}>
      <SectionHeading title={section.title} />
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <colgroup>
          <col style={{ width: "50%" }} />
          <col style={{ width: "50%" }} />
        </colgroup>
        <tbody>
          {Array.from({ length: Math.ceil((section.languages?.length || 0) / 2) }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {[0, 1].map(colIdx => {
                const l = section.languages?.[rowIdx * 2 + colIdx];
                if (!l) return <td key={colIdx} />;
                return (
                  <td key={colIdx} style={{ verticalAlign: "top", paddingRight: "12pt", paddingBottom: "6pt" }}>
                    <div style={{ ...bodyStyle, fontWeight: "500", color: "#111", marginBottom: "1pt" }}>
                      {l.language}
                    </div>
                    {!section.hideProficiency && (
                      <SkillBar level={getLangLevel(l.level)} total={6} />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHobbiesFromSection = (section) => {
    if (!section.hobbies) return null;
    return (
      <div key={section.id} style={sectionGap}>
        <SectionHeading title={section.title} />
        <div style={{ ...bodyStyle, fontWeight: "500" }}>
          {section.hobbies.split("\n").map((h, i) => <div key={i}>{h}</div>)}
        </div>
      </div>
    );
  };

  const renderCustomSimpleFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <div key={section.id} style={sectionGap}>
        <SectionHeading title={section.title} />
        {section.items?.map((item, i) => {
          const name  = typeof item === "object" ? (item.name || item.title) : item;
          const level = typeof item === "object" ? (item.level ?? 2) : 2;
          return (
            <div key={i} style={{ marginBottom: "4pt" }}>
              <div style={{
                fontFamily: secondaryFont,
                fontSize: `${bodySize}pt`,
                fontWeight: "700",
                color: "#111",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}>
                {name}
                {showLevel && (
                  <span style={{ fontWeight: "400", color: "#6b7280", marginLeft: "6pt", fontSize: `${bodySize - 0.5}pt`, textTransform: "none" }}>
                    {skillLevels[level]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCustomAdvancedFromSection = (section) => (
    <div key={section.id} style={sectionGap}>
      <SectionHeading title={section.title} />
      {section.items?.map((item, i) => (
        <div key={item.id || i} style={{ marginBottom: "8pt" }}>
          <EntryTitle
            title={item.title}
            sub={item.city ? `, ${item.city}` : ""}
          />
          <DateLine range={dateRange(item.startDate, item.endDate)} />
          {item.description && (
            <div className="resume-content" style={bodyStyle}
              dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
        </div>
      ))}
    </div>
  );

  // ════════════════════════════════════════════════════════════════════════
  //  ORCHESTRATE
  // ════════════════════════════════════════════════════════════════════════

  const renderAllSections = () => {
    if (sections && sections.length > 0) {
      return sections.map(section => {
        switch (section.type) {
          case "summary":        return renderSummaryFromSection(section);
          case "experience":     return renderExperienceFromSection(section);
          case "education":      return renderEducationFromSection(section);
          case "certifications": return renderCertificationsFromSection(section);
          case "courses":        return renderCoursesFromSection(section);
          case "internships":    return renderInternshipsFromSection(section);
          case "activities":     return renderActivitiesFromSection(section);
          case "skills":         return renderSkillsFromSection(section);
          case "languages":      return renderLanguagesFromSection(section);
          case "hobbies":        return renderHobbiesFromSection(section);
          case "custom_simple":  return renderCustomSimpleFromSection(section);
          case "custom":         return renderCustomAdvancedFromSection(section);
          default:               return null;
        }
      });
    }

    const order = sectionOrder || [
      "summary", "employment", "education", "activities",
      "skills", "languages", "hobbies", "internships", "courses",
    ];
    const map = {
      summary:     renderSummaryScratch,
      employment:  renderEmploymentScratch,
      education:   renderEducationScratch,
      skills:      renderSkillsScratch,
      languages:   renderLanguagesScratch,
      hobbies:     renderHobbiesScratch,
      activities:  renderActivitiesScratch,
      internships: renderInternshipsScratch,
      courses:     renderCoursesScratch,
    };
    return [
      ...order.map(id => {
        if (id.startsWith("custom_simple_")) {
          const h     = formData[`customSimpleHistory_${id}`];
          const title = formData[`customSimpleTitle_${id}`] || "Custom Section";
          const hide  = formData[`customSimpleHideLevel_${id}`] ?? true;
          if (!h?.some(i => i.name)) return null;
          return (
            <div key={id} style={sectionGap}>
              <SectionHeading title={title} />
              {h.map((item, i) => (
                <div key={i} style={{ marginBottom: "4pt" }}>
                  <div style={{
                    fontFamily: secondaryFont,
                    fontSize: `${bodySize}pt`,
                    fontWeight: "700",
                    color: "#111",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}>
                    {item.name}
                    {!hide && item.level !== undefined && (
                      <span style={{ fontWeight: "400", color: "#6b7280", marginLeft: "6pt", fontSize: `${bodySize - 0.5}pt`, textTransform: "none" }}>
                        {skillLevels[item.level ?? 2]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        }
        if (id.startsWith("custom_advanced_")) {
          const h     = formData[`customAdvancedHistory_${id}`];
          const title = formData[`customAdvancedTitle_${id}`] || "Custom Section";
          if (!h?.some(i => i.title || i.city)) return null;
          return (
            <div key={id} style={sectionGap}>
              <SectionHeading title={title} />
              {h.map((item, i) => (
                <div key={i} style={{ marginBottom: "8pt" }}>
                  <EntryTitle title={item.title} sub={item.city ? `, ${item.city}` : ""} />
                  <DateLine range={dateRange(item.startDate, item.endDate)} />
                  {item.description && (
                    <div className="resume-content" style={bodyStyle}
                      dangerouslySetInnerHTML={{ __html: item.description }} />
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

  // ── Links ─────────────────────────────────────────────────────────────────
  const links = [];
  if (formData.linkedin)      links.push({ label: "LinkedIn",       url: formData.linkedin });
  if (formData.github)        links.push({ label: "GitHub",         url: formData.github });
  if (formData.stackoverflow) links.push({ label: "Stack Overflow", url: formData.stackoverflow });
  if (formData.leetcode)      links.push({ label: "LeetCode",       url: formData.leetcode });
  if (formData.website)       links.push({ label: "Portfolio",      url: formData.website });

  // ── Details section logic ─────────────────────────────────────────────────
  const hasPhoto = !!formData.profileImage;

  // photo না থাকলে contact header এ দেখায়, থাকলে details section এ নামে
  const hasPersonalDetails = formData.driving_licence || formData.nationality || formData.dob || formData.birth_place;
  const hasContactInDetails = hasPhoto && (
    formData.address || formData.city_state || formData.country ||
    formData.email || formData.phone || formData.postal_code
  );
  const hasDetails = hasPersonalDetails || hasContactInDetails;
  const showDetailsSection = hasDetails || links.length > 0;

  const detailLabelStyle = {
    fontFamily: secondaryFont,
    fontSize: `${bodySize - 0.5}pt`,
    fontWeight: "700",
    color: "#111",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  // ════════════════════════════════════════════════════════════════════════
  //  JSX
  // ════════════════════════════════════════════════════════════════════════

  return (
    <div style={{ overflowY: "auto" }}>
      <style>{`
        .resume-content ul  { list-style-type: disc;    padding-left: 14pt; margin: 2pt 0; }
        .resume-content ol  { list-style-type: decimal; padding-left: 14pt; margin: 2pt 0; }
        .resume-content li  { margin-bottom: 2pt; }
        .resume-content strong { font-weight: bold; }
        .resume-content em     { font-style: italic; }
        .resume-content p      { margin-bottom: 2pt; }
      `}</style>

      <div style={{
        minHeight: "297mm",
        width: "100%",
        backgroundColor: "#fff",
        fontFamily: primaryFont,
        fontSize: `${bodySize}pt`,
        lineHeight: lineHeight,
        color: "#374151",
        boxSizing: "border-box",
        paddingBottom: `${topBottom}pt`,
      }}>

        {/* ══ HEADER — themeColor bg, flush to top ══ */}
        {/* Photo mode uses a wrapper div with position:relative so the img stretches to full height */}
        {hasPhoto ? (
          <div style={{ position: "relative", width: "100%", backgroundColor: headerBg, display: "table" }}>
            {/* Photo — position absolute, stretches full height of the row */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "110pt",
              bottom: 0,
              overflow: "hidden",
            }}>
              <img
                src={formData.profileImage}
                alt="Profile"
                style={{
                  width: "110pt",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </div>
            {/* Content — paddingLeft pushes content past photo */}
            <div style={{
              paddingLeft: `${110 + 16 + leftRight}pt`,
              paddingRight: `${16 + leftRight}pt`,
              paddingTop: "18pt",
              paddingBottom: "16pt",
            }}>
              <div style={{
                fontFamily: secondaryFont,
                fontSize: `${primaryHeadingSize}pt`,
                fontWeight: primaryHeadingWeight,
                color: "#111",
                lineHeight: "1.05",
                letterSpacing: "-0.01em",
                marginBottom: formData.job_target ? "8pt" : "0",
              }}>
                {formData.first_name && <div>{formData.first_name}</div>}
                {formData.last_name  && <div>{formData.last_name}</div>}
              </div>
              {formData.job_target && (
                <div style={{
                  fontFamily: secondaryFont,
                  fontSize: `${secondaryHeadingSize}pt`,
                  fontWeight: secondaryHeadingWeight,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#333",
                }}>
                  {formData.job_target}
                </div>
              )}
            </div>
          </div>
        ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: headerBg }}>
          <tbody>
            <tr>
              {(
                /* ── No photo mode: name left | job_title + contact right (original layout) ── */
                <td style={{
                  verticalAlign: "top",
                  paddingTop: "18pt",
                  paddingBottom: "16pt",
                  paddingLeft: `${16 + leftRight}pt`,
                  paddingRight: `${16 + leftRight}pt`,
                }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <tr>
                        {/* Left: Name */}
                        <td style={{ verticalAlign: "middle", width: "55%" }}>
                          <div style={{
                            fontFamily: secondaryFont,
                            fontSize: `${primaryHeadingSize}pt`,
                            fontWeight: primaryHeadingWeight,
                            color: "#111",
                            lineHeight: "1.0",
                            letterSpacing: "-0.01em",
                          }}>
                            {formData.first_name && <div>{formData.first_name}</div>}
                            {formData.last_name  && <div>{formData.last_name}</div>}
                          </div>
                        </td>
                        {/* Right: Job title + contact */}
                        <td style={{ verticalAlign: "top", width: "45%", paddingLeft: "12pt" }}>
                          {formData.job_target && (
                            <div style={{
                              fontFamily: secondaryFont,
                              fontSize: `${secondaryHeadingSize}pt`,
                              fontWeight: secondaryHeadingWeight,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: "#333",
                              marginBottom: "6pt",
                            }}>
                              {formData.job_target}
                            </div>
                          )}
                          {(formData.address || formData.city_state || formData.country) && (
                            <div style={{ ...bodyStyle, color: "#333", marginBottom: "1pt" }}>
                              {formData.address && <>{formData.address}, </>}
                              {formData.city_state}
                              {formData.city_state && formData.country ? ", " : ""}
                              {formData.country}
                              {formData.postal_code ? ` ${formData.postal_code}` : ""}
                            </div>
                          )}
                          {formData.email && (
                            <div style={{ marginBottom: "1pt" }}>
                              <a href={`mailto:${formData.email}`} style={{ ...bodyStyle, color: "#333", textDecoration: "none", fontWeight: "500" }}>
                                {formData.email}
                              </a>
                            </div>
                          )}
                          {formData.phone && (
                            <div style={{ ...bodyStyle, color: "#333", fontWeight: "500" }}>
                              {formData.phone}
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              )}

            </tr>
          </tbody>
        </table>
        )}

        {/* ══ BODY ══ */}
        <div style={{
          paddingTop: `${topBottom}pt`,
          paddingLeft: `${leftRight}pt`,
          paddingRight: `${leftRight}pt`,
        }}>

          {/* Details + Links section
              - photo নেই: শুধু personal details (dob, nationality, licence) + links
              - photo আছে: contact info + personal details + links সবই এখানে */}
          {showDetailsSection && (
            <div style={{ marginBottom: `${betweenSections}pt` }}>
              <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ width: "50%" }} />
                  <col style={{ width: "50%" }} />
                </colgroup>
                <tbody>
                  <tr>
                    {/* Left col: Details */}
                    <td style={{ verticalAlign: "top", paddingRight: "20pt" }}>
                      {hasDetails && (
                        <>
                          <SectionHeading title="Details" />
                          <table style={{ borderCollapse: "collapse", width: "100%" }}>
                            <tbody>

                              {/* Contact — only when photo exists */}
                              {hasPhoto && (formData.address || formData.city_state || formData.country) && (
                                <tr><td style={{ verticalAlign: "top", paddingBottom: "4pt" }}>
                                  <div style={detailLabelStyle}>Address</div>
                                  <div style={bodyStyle}>
                                    {formData.address && <>{formData.address}, </>}
                                    {formData.city_state}
                                    {formData.city_state && formData.country ? ", " : ""}
                                    {formData.country}
                                    {formData.postal_code ? ` ${formData.postal_code}` : ""}
                                  </div>
                                </td></tr>
                              )}
                              {hasPhoto && formData.phone && (
                                <tr><td style={{ verticalAlign: "top", paddingBottom: "4pt" }}>
                                  <div style={detailLabelStyle}>Phone</div>
                                  <div style={bodyStyle}>{formData.phone}</div>
                                </td></tr>
                              )}
                              {hasPhoto && formData.email && (
                                <tr><td style={{ verticalAlign: "top", paddingBottom: "4pt" }}>
                                  <div style={detailLabelStyle}>Email</div>
                                  <div style={bodyStyle}>
                                    <a href={`mailto:${formData.email}`} style={{ color: "#374151", textDecoration: "none" }}>
                                      {formData.email}
                                    </a>
                                  </div>
                                </td></tr>
                              )}

                              {/* Personal details — always shown if present */}
                              {(formData.dob || formData.birth_place) && (
                                <tr><td style={{ verticalAlign: "top", paddingBottom: "4pt" }}>
                                  <div style={detailLabelStyle}>Date / Place of Birth</div>
                                  <div style={bodyStyle}>
                                    {formData.dob}{formData.dob && formData.birth_place ? ", " : ""}{formData.birth_place}
                                  </div>
                                </td></tr>
                              )}
                              {formData.nationality && (
                                <tr><td style={{ verticalAlign: "top", paddingBottom: "4pt" }}>
                                  <div style={detailLabelStyle}>Nationality</div>
                                  <div style={bodyStyle}>{formData.nationality}</div>
                                </td></tr>
                              )}
                              {formData.driving_licence && (
                                <tr><td style={{ verticalAlign: "top", paddingBottom: "4pt" }}>
                                  <div style={detailLabelStyle}>Driving License</div>
                                  <div style={bodyStyle}>{formData.driving_licence}</div>
                                </td></tr>
                              )}

                            </tbody>
                          </table>
                        </>
                      )}
                    </td>

                    {/* Right col: Links */}
                    <td style={{ verticalAlign: "top" }}>
                      {links.length > 0 && (
                        <>
                          <SectionHeading title="Links" />
                          {links.map((link, i) => (
                            <div key={i} style={{ marginBottom: "2pt" }}>
                              <a href={link.url} style={{ ...bodyStyle, color: "#374151", textDecoration: "underline", textDecorationColor: "#9ca3af" }}>
                                {link.label}
                              </a>
                            </div>
                          ))}
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* All sections */}
          {renderAllSections()}

        </div>
      </div>
    </div>
  );
};

export default VividTemplate;