"use client";
import React from "react";
import { IoMdContact } from "react-icons/io";
import { BsBagFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";

const SIDEBAR_TYPES = new Set(["skills", "languages", "hobbies", "core_competencies"]);
const skillLevels   = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

const CorporateTemplate = ({ formData, sections, sectionOrder, themeColor, resumeSettings }) => {
  const text   = resumeSettings?.text   || {};
  const layout = resumeSettings?.layout || {};

  const primaryFont          = text.primaryFont          || "'Georgia', 'Times New Roman', serif";
  const secondaryFont        = text.secondaryFont        || "'Arial', Helvetica, sans-serif";
  const bodySize             = text.body                 || 8.5;
  const bodyWeight           = text.bodyWeight           || "normal";
  const lineHeight           = text.lineHeight           || 1.5;
  const sectionTitleSize     = text.sectionTitle         || 9;
  const sectionTitleWeight   = text.sectionTitleWeight   || "700";
  const primaryHeadingSize   = text.primaryHeading       || 26;
  const primaryHeadingWeight = text.primaryHeadingWeight || "700";
  const topBottom            = layout.topBottom          ?? 20;
  const leftRight            = layout.leftRight          ?? 20;
  const betweenSections      = layout.betweenSections    ?? 14;

  // ── Helpers ───────────────────────────────────────────────────────────────
  const formatDate = (v) => {
    if (!v) return null;
    if (String(v).toLowerCase() === "present") return "Present";
    const d = new Date(v);
    if (isNaN(d.getTime())) return String(v);
    return d.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  const dateRange = (s, e) => {
    const a = formatDate(s), b = formatDate(e);
    if (a && b) return `${a} – ${b}`;
    return a || b || "";
  };

  const bodyStyle = {
    fontFamily: primaryFont,
    fontSize:   `${bodySize}pt`,
    fontWeight: bodyWeight,
    lineHeight:  lineHeight,
    color:      "#374151",
  };

  // ════════════════════════════════════════════════════════════
  //  SIDEBAR COMPONENTS
  // ════════════════════════════════════════════════════════════

  // ◦ TITLE ◦  — image-এর মতো diamond-bullet heading
  const SidebarHeading = ({ title }) => (
    <div style={{ textAlign: "center", marginTop: `${betweenSections}pt`, marginBottom: "8pt" }}>
      <span style={{
        fontFamily:     secondaryFont,
        fontSize:       `${sectionTitleSize - 0.5}pt`,
        fontWeight:     sectionTitleWeight,
        letterSpacing:  "0.18em",
        textTransform:  "uppercase",
        color:          "#111",
      }}>
        ◦ {title} ◦
      </span>
    </div>
  );

  // Skill / Language item — name + underline bar (image-এর মতো)
  const SkillItem = ({ name }) => (
    <div style={{ textAlign: "center", marginBottom: "8pt" }}>
      <div style={{ ...bodyStyle, color: "#333", marginBottom: "3pt" }}>{name}</div>
      <div style={{ width: "55%", borderBottom: "1.5pt solid #111", margin: "0 auto" }} />
    </div>
  );

  // ════════════════════════════════════════════════════════════
  //  MAIN CONTENT COMPONENTS
  // ════════════════════════════════════════════════════════════

  // Icon + UPPERCASE TITLE heading — image-এর মতো
  const MainHeading = ({ title, Icon }) => (
    <div style={{ marginTop: `${betweenSections}pt`, marginBottom: "8pt" }}>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            {Icon && (
              <td style={{ verticalAlign: "middle", paddingRight: "5pt", lineHeight: 1 }}>
                <Icon style={{ fontSize: `${sectionTitleSize + 3}pt`, color: "#374151", display: "block" }} />
              </td>
            )}
            <td style={{ verticalAlign: "middle" }}>
              <span style={{
                fontFamily:    secondaryFont,
                fontSize:      `${sectionTitleSize}pt`,
                fontWeight:    sectionTitleWeight,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         "#111",
              }}>
                {title}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  // Timeline entry — ◇ diamond + vertical line (full height) + content
  const TimelineEntry = ({ heading, period, html }) => (
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "4pt" }}>
      <tbody>
        <tr>
          <td style={{
            width: "16pt",
            verticalAlign: "top",
            paddingRight: "8pt",
            paddingTop: "2pt",
            position: "relative",
          }}>
            {/* diamond */}
            <div style={{ textAlign: "center", lineHeight: 1, marginBottom: "2pt", position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "7pt", color: "#9ca3af" }}>◇</span>
            </div>
            {/* vertical line — full td height */}
            <div style={{
              position: "absolute",
              top: "14pt",
              bottom: "0",
              left: "50%",
              width: "1.5pt",
              backgroundColor: "#d1d5db",
              transform: "translateX(-50%)",
            }} />
          </td>
          {/* Right: content */}
          <td style={{ verticalAlign: "top", paddingBottom: "12pt" }}>
            <div style={{
              fontFamily:   secondaryFont,
              fontSize:     `${bodySize + 1.5}pt`,
              fontWeight:   "600",
              color:        "#111",
              lineHeight:   1.25,
              marginBottom: "2pt",
            }}>
              {heading}
            </div>
            {period && (
              <div style={{
                fontFamily:   primaryFont,
                fontSize:     `${bodySize - 0.5}pt`,
                color:        "#9ca3af",
                lineHeight:   1.3,
                marginBottom: "4pt",
              }}>
                {period}
              </div>
            )}
            {html && (
              <div
                className="resume-content"
                style={{ ...bodyStyle, color: "#4b5563" }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );

  // Reusable timeline block
  const TimelineBlock = ({ sectionKey, title, Icon, items }) => {
    if (!items || items.length === 0) return null;
    return (
      <div key={sectionKey}>
        <MainHeading title={title} Icon={Icon} />
        <div style={{ paddingLeft: "8pt" }}>
          {items.map((item, i) => (
            <TimelineEntry
              key={i}
              heading={item.heading}
              period={item.period}
              html={item.html}
            />
          ))}
        </div>
      </div>
    );
  };

  // LineWrapper — vertical line বাম দিকে, যেকোনো content-এর জন্য
  const LineWrapper = ({ children }) => (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <td style={{ width: "16pt", verticalAlign: "top", paddingRight: "8pt", position: "relative" }}>
            <div style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "50%",
              width: "1.5pt",
              backgroundColor: "#d1d5db",
              transform: "translateX(-50%)",
            }} />
          </td>
          <td style={{ verticalAlign: "top", paddingBottom: "4pt" }}>
            {children}
          </td>
        </tr>
      </tbody>
    </table>
  );

  // ════════════════════════════════════════════════════════════
  //  SCRATCH-MODE CHECKS
  // ════════════════════════════════════════════════════════════

  const hasEmployment  = formData.employmentHistory?.some(j => j.job_title || j.employer);
  const hasEducation   = formData.educationHistory?.some(e => e.school || e.degree);
  const hasSkills      = formData.newSkillHistory?.some(s => s.skill);
  const hasLanguages   = formData.languageHistory?.some(l => l.language);
  const hasActivities  = formData.activityHistory?.some(a => a.functionTitle || a.employer);
  const hasInternships = formData.internshipHistory?.some(i => i.jobTitle || i.employer);
  const hasCourses     = formData.coursesHistory?.some(c => c.course || c.institution);

  // ════════════════════════════════════════════════════════════
  //  SIDEBAR RENDERERS — SECTIONS
  // ════════════════════════════════════════════════════════════

  const renderSkillsFromSection = (section) => (
    <div key={section.id}>
      <SidebarHeading title={section.title} />
      {section.skills?.map((skill, i) => (
        <SkillItem key={skill.id || i} name={
          skill.name +
          (section.hideExperienceLevel === false && skill.level !== undefined
            ? ` (${skillLevels[skill.level]})` : "")
        } />
      ))}
    </div>
  );

  const renderLanguagesFromSection = (section) => (
    <div key={section.id}>
      <SidebarHeading title={section.title} />
      {section.languages?.map((l, i) => (
        <SkillItem key={i} name={
          l.language + (!section.hideProficiency && l.level ? ` – ${l.level}` : "")
        } />
      ))}
    </div>
  );

  const renderHobbiesFromSection = (section) =>
    section.hobbies ? (
      <div key={section.id}>
        <SidebarHeading title={section.title} />
        <div style={{ ...bodyStyle, color: "#374151", textAlign: "center" }}>
          {section.hobbies.split("\n").map((h, i) => <div key={i}>{h}</div>)}
        </div>
      </div>
    ) : null;

  const renderCoreCompetenciesFromSection = (section) => (
    <div key={section.id}>
      <SidebarHeading title={section.title} />
      {section.items?.map((item, i) => {
        const name  = typeof item === "object" ? (item.name || item.title) : item;
        const level = typeof item === "object" ? (item.level ?? 2) : 2;
        return (
          <SkillItem key={i} name={
            name + (section.hideExperienceLevel === false ? ` (${skillLevels[level]})` : "")
          } />
        );
      })}
    </div>
  );

  // ════════════════════════════════════════════════════════════
  //  SIDEBAR RENDERERS — SCRATCH
  // ════════════════════════════════════════════════════════════

  const renderSkillsScratch = () =>
    hasSkills ? (
      <div key="skills">
        <SidebarHeading title={formData.skillSectionTitle || "Skills"} />
        {formData.newSkillHistory.map((s, i) => (
          <SkillItem key={i} name={
            s.skill +
            (!formData.hideExperienceLevel && s.level !== undefined
              ? ` (${skillLevels[s.level]})` : "")
          } />
        ))}
      </div>
    ) : null;

  const renderLanguagesScratch = () =>
    hasLanguages ? (
      <div key="languages">
        <SidebarHeading title={formData.languagesSectionTitle || "Languages"} />
        {formData.languageHistory.map((l, i) => (
          <SkillItem key={i} name={
            l.language + (!formData.hideLanguageProficiency && l.level ? ` – ${l.level}` : "")
          } />
        ))}
      </div>
    ) : null;

  const renderHobbiesScratch = () =>
    formData.hobbies ? (
      <div key="hobbies">
        <SidebarHeading title={formData.hobbiesSectionTitle || "Hobbies"} />
        <div style={{ ...bodyStyle, color: "#374151", textAlign: "center" }}>
          {formData.hobbies.split("\n").map((h, i) => <div key={i}>{h}</div>)}
        </div>
      </div>
    ) : null;

  // ════════════════════════════════════════════════════════════
  //  SIDEBAR: Details + Links (always shown)
  // ════════════════════════════════════════════════════════════

  const renderDetailsSidebar = () => {
    const has = formData.address || formData.city_state || formData.country ||
                formData.phone   || formData.email      || formData.dob     ||
                formData.nationality || formData.driving_licence;
    if (!has) return null;
    return (
      <div>
        <SidebarHeading title="Details" />
        <div style={{ ...bodyStyle, color: "#374151", textAlign: "center" }}>
          {formData.address       && <div style={{ marginBottom: "2pt" }}>{formData.address}</div>}
          {(formData.city_state || formData.postal_code) && (
            <div style={{ marginBottom: "2pt" }}>
              {[formData.city_state, formData.postal_code].filter(Boolean).join(", ")}
            </div>
          )}
          {formData.country       && <div style={{ marginBottom: "2pt" }}>{formData.country}</div>}
          {formData.phone         && <div style={{ marginBottom: "2pt" }}>{formData.phone}</div>}
          {formData.email         && (
            <div style={{ marginBottom: "2pt", wordBreak: "break-all" }}>
              <a href={`mailto:${formData.email}`} style={{ color: "#374151", textDecoration: "underline" }}>
                {formData.email}
              </a>
            </div>
          )}
          {formData.dob           && <div style={{ marginBottom: "2pt" }}>{formData.dob}</div>}
          {formData.nationality   && <div style={{ marginBottom: "2pt" }}>{formData.nationality}</div>}
          {formData.driving_licence && <div style={{ marginBottom: "2pt" }}>{formData.driving_licence}</div>}
        </div>
      </div>
    );
  };

  const renderLinksSidebar = () => {
    const links = [
      formData.linkedin      && { label: "LinkedIn",       url: formData.linkedin },
      formData.github        && { label: "GitHub",         url: formData.github },
      formData.stackoverflow && { label: "Stack Overflow", url: formData.stackoverflow },
      formData.leetcode      && { label: "LeetCode",       url: formData.leetcode },
      formData.website       && { label: "Portfolio",      url: formData.website },
    ].filter(Boolean);
    if (!links.length) return null;
    return (
      <div>
        <SidebarHeading title="Links" />
        <div style={{ textAlign: "center" }}>
          {links.map((l, i) => (
            <div key={i} style={{ marginBottom: "3pt" }}>
              <a href={l.url} style={{ ...bodyStyle, color: "#374151", textDecoration: "underline" }}>
                {l.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════
  //  MAIN RENDERERS — SECTIONS
  // ════════════════════════════════════════════════════════════

  const renderSummaryFromSection = (section) => (
    <div key={section.id}>
      <MainHeading title={section.title} Icon={IoMdContact} />
      <LineWrapper>
        <div
          className="resume-content"
          style={{ ...bodyStyle, color: "#374151", textAlign: "justify" }}
          dangerouslySetInnerHTML={{ __html: section.summary }}
        />
      </LineWrapper>
    </div>
  );

  const renderExperienceFromSection = (section) => (
    <TimelineBlock
      key={section.id}
      sectionKey={section.id}
      title={section.title}
      Icon={BsBagFill}
      items={(section.experiences || []).map(exp => ({
        heading: [exp.jobTitle, exp.company, exp.city].filter(Boolean).join(" - "),
        period:  dateRange(exp.startDate, exp.endDate),
        html:    exp.description || null,
      }))}
    />
  );

  const renderEducationFromSection = (section) => (
    <TimelineBlock
      key={section.id}
      sectionKey={section.id}
      title={section.title}
      Icon={HiAcademicCap}
      items={(section.educations || []).map(edu => ({
        heading: [edu.degree, edu.institute, edu.city].filter(Boolean).join(", "),
        period:  dateRange(edu.startDate, edu.endDate),
        html:    edu.description || null,
      }))}
    />
  );

  const renderCertificationsFromSection = (section) => (
    <TimelineBlock
      key={section.id}
      sectionKey={section.id}
      title={section.title}
      Icon={FaStar}
      items={(section.certifications || []).map(cert => ({
        heading: [cert.name, cert.organization].filter(Boolean).join(", "),
        period:  dateRange(cert.startDate || cert.startYear, cert.endDate || cert.endYear),
        html:    cert.description ? `<p>${cert.description}</p>` : null,
      }))}
    />
  );

  const renderCoursesFromSection = (section) => (
    <TimelineBlock
      key={section.id}
      sectionKey={section.id}
      title={section.title}
      Icon={HiAcademicCap}
      items={(section.courses || []).map(c => ({
        heading: [c.course, c.institution].filter(Boolean).join(", "),
        period:  dateRange(c.startDate, c.endDate),
        html:    c.description || null,
      }))}
    />
  );

  const renderInternshipsFromSection = (section) => (
    <TimelineBlock
      key={section.id}
      sectionKey={section.id}
      title={section.title}
      Icon={BsBagFill}
      items={(section.internships || []).map(i => ({
        heading: [i.jobTitle, i.employer, i.city].filter(Boolean).join(", "),
        period:  dateRange(i.startDate, i.endDate),
        html:    i.description || null,
      }))}
    />
  );

  const renderActivitiesFromSection = (section) => (
    <TimelineBlock
      key={section.id}
      sectionKey={section.id}
      title={section.title}
      Icon={FaStar}
      items={(section.activities || []).map(a => ({
        heading: [a.functionTitle, a.employer, a.city].filter(Boolean).join(", "),
        period:  dateRange(a.startDate, a.endDate),
        html:    a.description || null,
      }))}
    />
  );

  const renderHonorsFromSection = (section) => (
    <TimelineBlock
      key={section.id}
      sectionKey={section.id}
      title={section.title}
      Icon={FaStar}
      items={(section.items || []).map(item => ({
        heading: [item.title, item.issuer].filter(Boolean).join(", "),
        period:  dateRange(item.startDate, item.endDate),
        html:    item.description || null,
      }))}
    />
  );

  const renderCustomSimpleFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <div key={section.id}>
        <MainHeading title={section.title} Icon={FaStar} />
        <LineWrapper>
          <div style={{ paddingBottom: "4pt" }}>
            {section.items?.map((item, i) => {
              const name  = typeof item === "object" ? (item.name || item.title) : item;
              const level = typeof item === "object" ? (item.level ?? 2) : 2;
              return (
                <div key={i} style={{ ...bodyStyle, color: "#374151", marginBottom: "3pt" }}>
                  {name}{showLevel && ` (${skillLevels[level]})`}
                </div>
              );
            })}
          </div>
        </LineWrapper>
      </div>
    );
  };

  const renderCustomAdvancedFromSection = (section) => (
    <TimelineBlock
      key={section.id}
      sectionKey={section.id}
      title={section.title}
      Icon={FaStar}
      items={(section.items || []).map(item => ({
        heading: [item.title, item.city].filter(Boolean).join(", "),
        period:  dateRange(item.startDate, item.endDate),
        html:    item.description || null,
      }))}
    />
  );

  // ════════════════════════════════════════════════════════════
  //  MAIN RENDERERS — SCRATCH
  // ════════════════════════════════════════════════════════════

  const renderSummaryScratch = () =>
    formData.summary ? (
      <div key="summary">
        <MainHeading title={formData.summarySectionTitle || "Profile"} Icon={IoMdContact} />
        <LineWrapper>
          <div
            className="resume-content"
            style={{ ...bodyStyle, color: "#374151", textAlign: "justify" }}
            dangerouslySetInnerHTML={{ __html: formData.summary }}
          />
        </LineWrapper>
      </div>
    ) : null;

  const renderEmploymentScratch = () =>
    hasEmployment ? (
      <TimelineBlock
        key="employment"
        sectionKey="employment"
        title={formData.employmentSectionTitle || "Work Experience"}
        Icon={BsBagFill}
        items={formData.employmentHistory
          .filter(e => e.job_title || e.employer)
          .map(e => ({
            heading: [e.job_title, e.employer, e.city_state].filter(Boolean).join(" - "),
            period:  dateRange(e.startDate, e.endDate),
            html:    e.description || null,
          }))}
      />
    ) : null;

  const renderEducationScratch = () =>
    hasEducation ? (
      <TimelineBlock
        key="education"
        sectionKey="education"
        title={formData.educationSectionTitle || "Education"}
        Icon={HiAcademicCap}
        items={formData.educationHistory
          .filter(e => e.school || e.degree)
          .map(e => ({
            heading: [e.degree, e.school, e.city_state].filter(Boolean).join(", "),
            period:  dateRange(e.startDate, e.endDate),
            html:    e.description || null,
          }))}
      />
    ) : null;

  const renderInternshipsScratch = () =>
    hasInternships ? (
      <TimelineBlock
        key="internships"
        sectionKey="internships"
        title={formData.internshipsSectionTitle || "Internships"}
        Icon={BsBagFill}
        items={formData.internshipHistory
          .filter(i => i.jobTitle || i.employer)
          .map(i => ({
            heading: [i.jobTitle, i.employer, i.city].filter(Boolean).join(", "),
            period:  dateRange(i.startDate, i.endDate),
            html:    i.description || null,
          }))}
      />
    ) : null;

  const renderActivitiesScratch = () =>
    hasActivities ? (
      <TimelineBlock
        key="activities"
        sectionKey="activities"
        title={formData.activitiesSectionTitle || "Extra-curricular Activities"}
        Icon={FaStar}
        items={formData.activityHistory
          .filter(a => a.functionTitle || a.employer)
          .map(a => ({
            heading: [a.functionTitle, a.employer, a.city].filter(Boolean).join(", "),
            period:  dateRange(a.startDate, a.endDate),
            html:    a.description || null,
          }))}
      />
    ) : null;

  const renderCoursesScratch = () =>
    hasCourses ? (
      <TimelineBlock
        key="courses"
        sectionKey="courses"
        title={formData.coursesSectionTitle || "Courses"}
        Icon={HiAcademicCap}
        items={formData.coursesHistory
          .filter(c => c.course || c.institution)
          .map(c => ({
            heading: [c.course, c.institution].filter(Boolean).join(", "),
            period:  dateRange(c.startDate, c.endDate),
            html:    null,
          }))}
      />
    ) : null;

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
          <div key={sectionId}>
            <MainHeading title={title} Icon={FaStar} />
            <LineWrapper>
              <div style={{ paddingBottom: "4pt" }}>
                {history.map((item, i) => (
                  <div key={i} style={{ ...bodyStyle, color: "#374151", marginBottom: "3pt" }}>
                    {item.name}
                    {!hideLevel && item.level !== undefined && ` (${skillLevels[item.level ?? 2]})`}
                  </div>
                ))}
              </div>
            </LineWrapper>
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
          <TimelineBlock
            key={sectionId}
            sectionKey={sectionId}
            title={title}
            Icon={FaStar}
            items={history.filter(i => i.title || i.city).map(item => ({
              heading: [item.title, item.city].filter(Boolean).join(", "),
              period:  dateRange(item.startDate, item.endDate),
              html:    item.description || null,
            }))}
          />
        );
      });

  // ════════════════════════════════════════════════════════════
  //  ORCHESTRATE SIDEBAR + MAIN
  // ════════════════════════════════════════════════════════════

  const renderSidebarContent = () => {
    if (sections && sections.length > 0) {
      return sections
        .filter(s => SIDEBAR_TYPES.has(s.type))
        .map(section => {
          switch (section.type) {
            case "skills":            return renderSkillsFromSection(section);
            case "languages":         return renderLanguagesFromSection(section);
            case "hobbies":           return renderHobbiesFromSection(section);
            case "core_competencies": return renderCoreCompetenciesFromSection(section);
            default:                  return null;
          }
        });
    }
    const order = sectionOrder || ["skills", "languages", "hobbies"];
    const map   = {
      skills:    renderSkillsScratch,
      languages: renderLanguagesScratch,
      hobbies:   renderHobbiesScratch,
    };
    return order.filter(id => SIDEBAR_TYPES.has(id)).map(id => map[id]?.() ?? null);
  };

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
            case "honors":         return renderHonorsFromSection(section);
            case "custom_simple":  return renderCustomSimpleFromSection(section);
            case "custom":         return renderCustomAdvancedFromSection(section);
            default:               return null;
          }
        });
    }
    const order = sectionOrder || ["summary","employment","education","activities","internships","courses"];
    const map   = {
      summary:     renderSummaryScratch,
      employment:  renderEmploymentScratch,
      education:   renderEducationScratch,
      internships: renderInternshipsScratch,
      activities:  renderActivitiesScratch,
      courses:     renderCoursesScratch,
    };
    return [
      ...order.filter(id => !SIDEBAR_TYPES.has(id)).map(id => {
        if (id.startsWith("custom_simple_")) {
          const history   = formData[`customSimpleHistory_${id}`];
          const title     = formData[`customSimpleTitle_${id}`]     || "Custom Section";
          const hideLevel = formData[`customSimpleHideLevel_${id}`] ?? true;
          if (!history?.some(i => i.name)) return null;
          return (
            <div key={id}>
              <MainHeading title={title} Icon={FaStar} />
              <LineWrapper>
                <div style={{ paddingBottom: "4pt" }}>
                  {history.map((item, i) => (
                    <div key={i} style={{ ...bodyStyle, color: "#374151", marginBottom: "3pt" }}>
                      {item.name}{!hideLevel && item.level !== undefined && ` (${skillLevels[item.level ?? 2]})`}
                    </div>
                  ))}
                </div>
              </LineWrapper>
            </div>
          );
        }
        if (id.startsWith("custom_advanced_")) {
          const history = formData[`customAdvancedHistory_${id}`];
          const title   = formData[`customAdvancedTitle_${id}`] || "Custom Section";
          if (!history?.some(i => i.title || i.city)) return null;
          return (
            <TimelineBlock
              key={id}
              sectionKey={id}
              title={title}
              Icon={FaStar}
              items={history.filter(i => i.title || i.city).map(item => ({
                heading: [item.title, item.city].filter(Boolean).join(", "),
                period:  dateRange(item.startDate, item.endDate),
                html:    item.description || null,
              }))}
            />
          );
        }
        return map[id]?.() ?? null;
      }),
      ...renderScratchSimpleCustom(),
      ...renderScratchAdvancedCustom(),
    ];
  };

  // ════════════════════════════════════════════════════════════
  //  JSX — fully table-based, no flex anywhere
  // ════════════════════════════════════════════════════════════

  const hasPhoto = !!formData.profileImage;

  return (
    <div style={{ overflowY: "auto" }}>
      <style>{`
        .resume-content ul { list-style-type: disc; padding-left: 14pt; margin: 2pt 0; }
        .resume-content ol { list-style-type: decimal; padding-left: 14pt; margin: 2pt 0; }
        .resume-content li { margin-bottom: 2pt; }
        .resume-content strong { font-weight: bold; }
        .resume-content em     { font-style: italic; }
        .resume-content p      { margin-bottom: 2pt; }
      `}</style>

      <div style={{
        minHeight:       "297mm",
        width:           "100%",
        backgroundColor: "#fff",
        fontFamily:      primaryFont,
        fontSize:        `${bodySize}pt`,
        lineHeight:       lineHeight,
        color:           "#374151",
        boxSizing:       "border-box",
      }}>

        {/* ══ HEADER — centered: photo → name → job | city | phone ══ */}
        <div style={{
          textAlign:    "center",
          paddingTop:   `${topBottom}pt`,
          paddingBottom:"16pt",
          paddingLeft:  `${leftRight}pt`,
          paddingRight: `${leftRight}pt`,
          borderBottom: "1pt solid #f3f4f6",
        }}>
          {/* Profile photo — rounded corners, image-এর মতো */}
          {hasPhoto && (
            <div style={{ marginBottom: "8pt" }}>
              <img
                src={formData.profileImage}
                alt="Profile"
                style={{
                  width:          "68pt",
                  height:         "68pt",
                  objectFit:      "cover",
                  objectPosition: "center top",
                  borderRadius:   "6pt",
                  display:        "inline-block",
                }}
              />
            </div>
          )}

          {/* Name */}
          <div style={{
            fontFamily:  secondaryFont,
            fontSize:    `${primaryHeadingSize}pt`,
            fontWeight:   primaryHeadingWeight,
            color:       "#111",
            letterSpacing:"0.01em",
            lineHeight:   1.1,
            marginBottom: "6pt",
          }}>
            {formData.first_name} {formData.last_name}
          </div>

          {/* job title  |  city, country  |  phone */}
          {(() => {
            const parts = [
              formData.job_target,
              [formData.city_state, formData.country].filter(Boolean).join(", ") || null,
              formData.phone,
            ].filter(Boolean);
            if (!parts.length) return null;
            return (
              <div style={{
                fontFamily:   primaryFont,
                fontSize:     `${bodySize}pt`,
                color:        "#6b7280",
                letterSpacing:"0.02em",
              }}>
                {parts.join("  |  ")}
              </div>
            );
          })()}
        </div>

        {/* ══ BODY — two columns via table ══ */}
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "30%" }} />
            <col style={{ width: "70%" }} />
          </colgroup>
          <tbody>
            <tr>
              {/* LEFT SIDEBAR */}
              <td style={{
                verticalAlign:   "top",
                paddingTop:      "6pt",
                paddingRight:    "14pt",
                paddingBottom:   `${topBottom}pt`,
                paddingLeft:     `${leftRight}pt`,
                borderRight:     "1pt solid #f3f4f6",
                backgroundColor: "#fafafa",
              }}>
                {renderDetailsSidebar()}
                {renderLinksSidebar()}
                {renderSidebarContent()}
              </td>

              {/* RIGHT MAIN */}
              <td style={{
                verticalAlign: "top",
                paddingTop:    "4pt",
                paddingRight:  `${leftRight}pt`,
                paddingBottom: `${topBottom}pt`,
                paddingLeft:   "16pt",
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

export default CorporateTemplate;