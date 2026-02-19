"use client";
import React from "react";

const SIDEBAR_TYPES = new Set(["languages", "hobbies"]);
const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

const CleanTemplate = ({ formData, sections, sectionOrder, resumeSettings }) => {

  // ── Helpers ──────────────────────────────────────────────────────────────
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

  // ── Scratch checks ────────────────────────────────────────────────────────
  const hasContactInfo =
    formData.email || formData.phone || formData.address ||
    formData.city_state || formData.postal_code || formData.driving_licence ||
    formData.nationality || formData.country || formData.birth_place || formData.dob;
  const hasEmployment  = formData.employmentHistory?.some(j => j.job_title || j.employer) && formData.employmentHistory.length > 0;
  const hasEducation   = formData.educationHistory?.some(e => e.school || e.degree) && formData.educationHistory.length > 0;
  const hasSkills      = formData.newSkillHistory?.some(s => s.skill) && formData.newSkillHistory.length > 0;
  const hasLanguages   = formData.languageHistory?.some(l => l.language) && formData.languageHistory.length > 0;
  const hasActivities  = formData.activityHistory?.some(a => a.functionTitle || a.employer) && formData.activityHistory.length > 0;
  const hasInternships = formData.internshipHistory?.some(i => i.jobTitle || i.employer) && formData.internshipHistory.length > 0;
  const hasCourses     = formData.coursesHistory?.some(c => c.course || c.institution) && formData.coursesHistory.length > 0;

  // ── Shared heading styles ─────────────────────────────────────────────────
  const mainHeading = "text-sm font-bold uppercase tracking-[0.15em] text-black mb-3";
  const sideHeading = "text-xs font-bold uppercase tracking-[0.15em] mb-4 text-black";

  // ════════════════════════════════════════════════════════════════════════
  //  MAIN — SCRATCH
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryScratch = () =>
    formData.summary ? (
      <section key="summary">
        <h2 className={mainHeading}>{formData.summarySectionTitle || "Profile"}</h2>
        <div
          className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: formData.summary }}
        />
      </section>
    ) : null;

  const renderEmploymentScratch = () =>
    hasEmployment ? (
      <section key="employment">
        <h2 className={mainHeading}>{formData.employmentSectionTitle || "Employment History"}</h2>
        <div className="flex flex-col gap-6">
          {formData.employmentHistory.map((job, i) => (
            <div key={i}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xs font-bold text-gray-900 uppercase">
                  {job.job_title}{job.employer ? `, ${job.employer}` : ""}
                </h3>
                {job.city_state && (
                  <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-4">{job.city_state}</span>
                )}
              </div>
              {dateRange(job.startDate, job.endDate) && (
                <div className="text-[10px] text-gray-400 mb-2">{dateRange(job.startDate, job.endDate)}</div>
              )}
              {job.description && (
                <div
                  className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderEducationScratch = () =>
    hasEducation ? (
      <section key="education">
        <h2 className={mainHeading}>{formData.educationSectionTitle || "Education"}</h2>
        <div className="flex flex-col gap-5">
          {formData.educationHistory.map((edu, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-gray-900 uppercase">
                  {edu.degree}{edu.school ? `, ${edu.school}` : ""}
                </h3>
                {edu.city_state && (
                  <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-2">{edu.city_state}</span>
                )}
              </div>
              {dateRange(edu.startDate, edu.endDate) && (
                <span className="text-[10px] text-gray-400 mt-0.5 mb-1">{dateRange(edu.startDate, edu.endDate)}</span>
              )}
              {edu.description && (
                <div
                  className="text-xs text-gray-600 mt-1 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderSkillsScratch = () =>
    hasSkills ? (
      <section key="skills" className="mb-2">
        <h3 className={sideHeading}>{formData.skillSectionTitle || "Skills"}</h3>
        <div className="flex flex-col gap-2">
          {formData.newSkillHistory.map((skill, i) => (
            <div key={i}>
              <span className="text-xs text-gray-700 block">{skill.skill}</span>
              {!formData.hideExperienceLevel && (
                <span className="text-[10px] text-gray-400 uppercase">{skillLevels[skill.level ?? 0]}</span>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderInternshipsScratch = () =>
    hasInternships ? (
      <section key="internships">
        <h2 className={mainHeading}>{formData.internshipsSectionTitle || "Internships"}</h2>
        <div className="flex flex-col gap-5">
          {formData.internshipHistory.map((job, i) => (
            <div key={i}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xs font-bold text-gray-900 uppercase">
                  {job.jobTitle}{job.employer ? `, ${job.employer}` : ""}
                </h3>
                {job.city && <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">{job.city}</span>}
              </div>
              {dateRange(job.startDate, job.endDate) && (
                <div className="text-[10px] text-gray-400 mb-2">{dateRange(job.startDate, job.endDate)}</div>
              )}
              {job.description && (
                <div
                  className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderActivitiesScratch = () =>
    hasActivities ? (
      <section key="activities">
        <h2 className={mainHeading}>{formData.activitiesSectionTitle || "Activities"}</h2>
        <div className="flex flex-col gap-4">
          {formData.activityHistory.map((act, i) => (
            <div key={i} className="flex justify-between items-start group">
              <div className="w-[80%]">
                <h3 className="text-xs font-semibold text-gray-800">
                  {act.functionTitle}{act.employer ? ` - ${act.employer}` : ""}
                </h3>
                {act.description && (
                  <div
                    className="text-[11px] text-gray-500 mt-1 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                    dangerouslySetInnerHTML={{ __html: act.description }}
                  />
                )}
              </div>
              <div className="text-right">
                {act.city && <span className="text-[10px] text-gray-500 block">{act.city}</span>}
                {dateRange(act.startDate, act.endDate) && (
                  <span className="text-[10px] text-gray-400 block">{dateRange(act.startDate, act.endDate)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderCoursesScratch = () =>
    hasCourses ? (
      <section key="courses">
        <h2 className={mainHeading}>{formData.coursesSectionTitle || "Courses"}</h2>
        <div className="flex flex-col gap-4">
          {formData.coursesHistory.map((c, i) => (
            <div key={i} className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-semibold text-gray-800">
                  {c.course}{c.institution ? ` - ${c.institution}` : ""}
                </h3>
              </div>
              {dateRange(c.startDate, c.endDate) && (
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">{dateRange(c.startDate, c.endDate)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderHobbiesScratch = () =>
    formData.hobbies ? (
      <section key="hobbies">
        <h3 className={sideHeading}>{formData.hobbiesSectionTitle || "Hobbies"}</h3>
        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{formData.hobbies}</p>
      </section>
    ) : null;

  const renderLanguagesScratch = () =>
    hasLanguages ? (
      <section key="languages">
        <h3 className={sideHeading}>{formData.languagesSectionTitle || "Languages"}</h3>
        <div className="flex flex-col gap-2">
          {formData.languageHistory.map((lang, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-xs font-semibold text-gray-800">{lang.language}</span>
              {!formData.hideLanguageProficiency && <span className="text-[10px] text-gray-500">{lang.level}</span>}
            </div>
          ))}
        </div>
      </section>
    ) : null;

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
          <section key={sectionId}>
            <h2 className={mainHeading}>{title}</h2>
            <div className="flex flex-col gap-2">
              {history.map((item, i) => (
                <div key={i}>
                  <span className="text-xs text-gray-700 block">{item.name}</span>
                  {!hideLevel && item.level !== undefined && (
                    <span className="text-[10px] text-gray-400 uppercase">{skillLevels[item.level ?? 2]}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
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
          <section key={sectionId}>
            <h2 className={mainHeading}>{title}</h2>
            <div className="flex flex-col gap-4">
              {history.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs font-bold text-gray-900 uppercase">
                      {item.title}{item.city ? `, ${item.city}` : ""}
                    </h3>
                  </div>
                  {dateRange(item.startDate, item.endDate) && (
                    <div className="text-[10px] text-gray-400 mb-2">{dateRange(item.startDate, item.endDate)}</div>
                  )}
                  {item.description && (
                    <div
                      className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      });

  // ════════════════════════════════════════════════════════════════════════
  //  MAIN — SECTIONS (improve / jd / linkedin)
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryFromSection = (section) => (
    <section key={section.id}>
      <h2 className={mainHeading}>{section.title}</h2>
      <div
        className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
    </section>
  );

  const renderExperienceFromSection = (section) => (
    <section key={section.id}>
      <h2 className={mainHeading}>{section.title}</h2>
      <div className="flex flex-col gap-6">
        {section.experiences?.map((exp, i) => (
          <div key={exp.id || i}>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-xs font-bold text-gray-900 uppercase">
                {exp.jobTitle}{exp.company ? `, ${exp.company}` : ""}
              </h3>
              {exp.city && <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-4">{exp.city}</span>}
            </div>
            {dateRange(exp.startDate, exp.endDate) && (
              <div className="text-[10px] text-gray-400 mb-2">{dateRange(exp.startDate, exp.endDate)}</div>
            )}
            {exp.description && (
              <div
                className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderEducationFromSection = (section) => (
    <section key={section.id}>
      <h2 className={mainHeading}>{section.title}</h2>
      <div className="flex flex-col gap-5">
        {section.educations?.map((edu, i) => (
          <div key={edu.id || i} className="flex flex-col">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xs font-bold text-gray-900 uppercase">
                {edu.degree}{edu.institute ? `, ${edu.institute}` : ""}
              </h3>
              {edu.city && <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-2">{edu.city}</span>}
            </div>
            {dateRange(edu.startDate, edu.endDate) && (
              <span className="text-[10px] text-gray-400 mt-0.5 mb-1">{dateRange(edu.startDate, edu.endDate)}</span>
            )}
            {edu.description && (
              <div
                className="text-xs text-gray-600 mt-1 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: edu.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderCertificationsFromSection = (section) => (
    <section key={section.id}>
      <h2 className={mainHeading}>{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.certifications?.map((cert, i) => (
          <div key={cert.id || i}>
            <h3 className="text-xs font-bold text-gray-900 uppercase">
              {cert.name}{cert.organization ? `, ${cert.organization}` : ""}
            </h3>
            {(cert.startYear || cert.endYear) && (
              <div className="text-[10px] text-gray-400 mb-1">
                {cert.startYear}{cert.endYear ? ` — ${cert.endYear}` : ""}
              </div>
            )}
            {cert.description && <p className="text-xs text-gray-600 mt-1">{cert.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );

  const renderCoursesFromSection = (section) => (
    <section key={section.id}>
      <h2 className={mainHeading}>{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.courses?.map((c, i) => (
          <div key={c.id || i} className="flex justify-between items-start">
            <h3 className="text-xs font-semibold text-gray-800">
              {c.course}{c.institution ? ` - ${c.institution}` : ""}
            </h3>
            {dateRange(c.startDate, c.endDate) && (
              <span className="text-[10px] text-gray-400 block">{dateRange(c.startDate, c.endDate)}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderInternshipsFromSection = (section) => (
    <section key={section.id}>
      <h2 className={mainHeading}>{section.title}</h2>
      <div className="flex flex-col gap-5">
        {section.internships?.map((intern, i) => (
          <div key={intern.id || i}>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-xs font-bold text-gray-900 uppercase">
                {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ""}
              </h3>
              {intern.city && <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">{intern.city}</span>}
            </div>
            {dateRange(intern.startDate, intern.endDate) && (
              <div className="text-[10px] text-gray-400 mb-2">{dateRange(intern.startDate, intern.endDate)}</div>
            )}
            {intern.description && (
              <div
                className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: intern.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderActivitiesFromSection = (section) => (
    <section key={section.id}>
      <h2 className={mainHeading}>{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.activities?.map((a, i) => (
          <div key={a.id || i} className="flex justify-between items-start">
            <div className="w-[80%]">
              <h3 className="text-xs font-semibold text-gray-800">
                {a.functionTitle}{a.employer ? ` - ${a.employer}` : ""}
              </h3>
              {a.description && (
                <div
                  className="text-[11px] text-gray-500 mt-1 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: a.description }}
                />
              )}
            </div>
            <div className="text-right">
              {a.city && <span className="text-[10px] text-gray-500 block">{a.city}</span>}
              {dateRange(a.startDate, a.endDate) && (
                <span className="text-[10px] text-gray-400 block">{dateRange(a.startDate, a.endDate)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderSkillsFromSection = (section) => (
    <section key={section.id} className="mb-2">
      <h3 className={sideHeading}>{section.title}</h3>
      <div className="flex flex-col gap-2">
        {section.skills?.map((skill, i) => (
          <div key={skill.id || i}>
            <span className="text-xs text-gray-700 block">{skill.name}</span>
            {section.hideExperienceLevel === false && skill.level !== undefined && (
              <span className="text-[10px] text-gray-400 uppercase">{skillLevels[skill.level ?? 0]}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderHobbiesFromSection = (section) =>
    section.hobbies ? (
      <section key={section.id}>
        <h3 className={sideHeading}>{section.title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{section.hobbies}</p>
      </section>
    ) : null;

  const renderLanguagesFromSection = (section) => (
    <section key={section.id}>
      <h3 className={sideHeading}>{section.title}</h3>
      <div className="flex flex-col gap-2">
        {section.languages?.map((l, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-xs font-semibold text-gray-800">{l.language}</span>
            {!section.hideProficiency && <span className="text-[10px] text-gray-500">{l.level}</span>}
          </div>
        ))}
      </div>
    </section>
  );

  const renderCustomSimpleFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <section key={section.id}>
        <h2 className={mainHeading}>{section.title}</h2>
        <div className="flex flex-col gap-2">
          {section.items?.map((item, i) => {
            const name  = typeof item === "object" ? (item.name || item.title) : item;
            const level = typeof item === "object" ? (item.level ?? 2) : 2;
            return (
              <div key={i}>
                <span className="text-xs text-gray-700 block">{name}</span>
                {showLevel && <span className="text-[10px] text-gray-400 uppercase">{skillLevels[level]}</span>}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const renderCustomAdvancedFromSection = (section) => (
    <section key={section.id}>
      <h2 className={mainHeading}>{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.items?.map((item, i) => (
          <div key={item.id || i}>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-xs font-bold text-gray-900 uppercase">
                {item.title}{item.city ? `, ${item.city}` : ""}
              </h3>
            </div>
            {dateRange(item.startDate, item.endDate) && (
              <div className="text-[10px] text-gray-400 mb-2">{dateRange(item.startDate, item.endDate)}</div>
            )}
            {item.description && (
              <div
                className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  // ════════════════════════════════════════════════════════════════════════
  //  RENDER LOGIC
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
            case "skills":         return renderSkillsFromSection(section);
            case "hobbies":        return renderHobbiesFromSection(section);
            case "custom_simple":  return renderCustomSimpleFromSection(section);
            case "custom":         return renderCustomAdvancedFromSection(section);
            default:               return null;
          }
        });
    }

    const order = sectionOrder || [
      "summary","employment","education","skills","hobbies",
      "activities","internships","courses","custom","languages",
    ];
    const map = {
      summary:    renderSummaryScratch,
      employment: renderEmploymentScratch,
      education:  renderEducationScratch,
      skills:     renderSkillsScratch,
      hobbies:    renderHobbiesScratch,
      activities: renderActivitiesScratch,
      internships:renderInternshipsScratch,
      courses:    renderCoursesScratch,
    };
    return [
      ...order.filter(id => !SIDEBAR_TYPES.has(id)).map(id => {
        if (id.startsWith("custom_simple_")) {
          const h = formData[`customSimpleHistory_${id}`];
          const title = formData[`customSimpleTitle_${id}`] || "Custom Section";
          const hide  = formData[`customSimpleHideLevel_${id}`] ?? true;
          if (!h?.some(i => i.name)) return null;
          return (
            <section key={id}>
              <h2 className={mainHeading}>{title}</h2>
              <div className="flex flex-col gap-2">
                {h.map((item, i) => (
                  <div key={i}>
                    <span className="text-xs text-gray-700 block">{item.name}</span>
                    {!hide && item.level !== undefined && <span className="text-[10px] text-gray-400 uppercase">{skillLevels[item.level ?? 2]}</span>}
                  </div>
                ))}
              </div>
            </section>
          );
        }
        if (id.startsWith("custom_advanced_")) {
          const h = formData[`customAdvancedHistory_${id}`];
          const title = formData[`customAdvancedTitle_${id}`] || "Custom Section";
          if (!h?.some(i => i.title || i.city)) return null;
          return (
            <section key={id}>
              <h2 className={mainHeading}>{title}</h2>
              <div className="flex flex-col gap-4">
                {h.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-xs font-bold text-gray-900 uppercase">{item.title}{item.city ? `, ${item.city}` : ""}</h3>
                    {dateRange(item.startDate, item.endDate) && <div className="text-[10px] text-gray-400 mb-2">{dateRange(item.startDate, item.endDate)}</div>}
                    {item.description && <div className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1" dangerouslySetInnerHTML={{ __html: item.description }} />}
                  </div>
                ))}
              </div>
            </section>
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
      return sections.filter(s => SIDEBAR_TYPES.has(s.type)).map(section => {
        switch (section.type) {
          case "languages": return renderLanguagesFromSection(section);
          case "hobbies":   return renderHobbiesFromSection(section);
          default:          return null;
        }
      });
    }
    const order = sectionOrder || ["languages","hobbies"];
    const map = { languages: renderLanguagesScratch, hobbies: renderHobbiesScratch };
    return order.filter(id => SIDEBAR_TYPES.has(id)).map(id => map[id]?.() ?? null);
  };

  // ════════════════════════════════════════════════════════════════════════
  //  JSX
  // ════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-[297mm] bg-white text-gray-900 font-sans p-10 shadow-xl">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900 mb-2">
          {formData.first_name} {formData.last_name}
        </h1>
        {formData.job_target && (
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-medium">
            {formData.job_target}
          </p>
        )}
      </header>

      <hr className="border-t border-gray-300 mb-8" />

      <div className="flex gap-10">
        {/* Sidebar (30%) */}
        <div className="w-[30%] flex flex-col gap-10 border-r border-gray-200 pr-6">
          {/* Details */}
          {hasContactInfo && (
            <section>
              <h3 className={sideHeading}>Details</h3>
              <div className="flex flex-col gap-3 text-xs text-gray-600">
                {(formData.address || formData.city_state) && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">Address</span>
                    {formData.address && <span>{formData.address}</span>}
                    <span>
                      {formData.city_state}
                      {formData.city_state && formData.country ? ", " : ""}
                      {formData.country}
                    </span>
                    {formData.postal_code && <span>{formData.postal_code}</span>}
                  </div>
                )}
                {formData.phone && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">Phone</span>
                    <span>{formData.phone}</span>
                  </div>
                )}
                {formData.email && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">Email</span>
                    <a href={`mailto:${formData.email}`} className="break-all hover:text-black hover:underline">{formData.email}</a>
                  </div>
                )}
                {formData.driving_licence && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">Driving License</span>
                    <span>{formData.driving_licence}</span>
                  </div>
                )}
                {formData.nationality && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">Nationality</span>
                    <span>{formData.nationality}</span>
                  </div>
                )}
                {formData.dob && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">Date of Birth</span>
                    <span>{formData.dob}</span>
                  </div>
                )}
                {formData.birth_place && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">Place of Birth</span>
                    <span>{formData.birth_place}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Links */}
          {(formData.linkedin || formData.website || formData.github) && (
            <section>
              <h3 className={sideHeading}>Links</h3>
              <div className="flex flex-col gap-2 text-xs text-gray-600">
                {formData.linkedin && <a href={formData.linkedin} className="underline decoration-dotted">LinkedIn</a>}
                {formData.github   && <a href={formData.github}   className="underline decoration-dotted">GitHub</a>}
                {formData.website  && <a href={formData.website}  className="underline decoration-dotted">Portfolio</a>}
              </div>
            </section>
          )}

          {/* Sidebar sections */}
          {renderSidebarContent()}
        </div>

        {/* Main content (70%) */}
        <div className="w-[70%] flex flex-col gap-8">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default CleanTemplate;

// "use client";
// import React from "react";

// const CleanTemplate = ({ formData, sectionOrder }) => {
//   // --- Helpers ---
//   const formatDate = (dateValue) => {
//     if (!dateValue) return "";
//     const d = new Date(dateValue);
//     // Returns format: JAN 2026
//     return d
//       .toLocaleString("en-US", { month: "short", year: "numeric" })
//       .toUpperCase();
//   };

//   const getYear = (dateValue) => {
//     if (!dateValue) return "";
//     const d = new Date(dateValue);
//     return d.getFullYear();
//   };

//   // --- Logic Checks ---
//   const hasContactInfo =
//     formData.email ||
//     formData.phone ||
//     formData.address ||
//     formData.city_state ||
//     formData.postal_code ||
//     formData.driving_licence ||
//     formData.nationality ||
//     formData.country ||
//     formData.birth_place ||
//     formData.dob;

//   const hasEmployment =
//     formData.employmentHistory?.some((job) => job.job_title || job.employer) &&
//     formData.employmentHistory.length > 0;
//   const hasEducation =
//     formData.educationHistory?.some((edu) => edu.school || edu.degree) &&
//     formData.educationHistory.length > 0;
//   const hasSkills =
//     formData.newSkillHistory?.some((s) => s.skill) &&
//     formData.newSkillHistory.length > 0;
//   const hasLanguages =
//     formData.languageHistory?.some((l) => l.language) &&
//     formData.languageHistory.length > 0;
//   const hasActivities =
//     formData.activityHistory?.some((a) => a.functionTitle || a.employer) &&
//     formData.activityHistory.length > 0;
//   const hasInternships =
//     formData.internshipHistory?.some((i) => i.jobTitle || i.employer) &&
//     formData.internshipHistory.length > 0;
//   const hasCourses =
//     formData.coursesHistory?.some((c) => c.course || c.institution) &&
//     formData.coursesHistory.length > 0;

//   // --- RENDER FUNCTIONS ---
//   const renderSummary = () =>
//     formData.summary && (
//       <section key="summary">
//         <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-3">
//           Profile
//         </h2>
//         {/* <p className="text-xs text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
//             {formData.summary}
//           </p> */}
//         <div
//           className="
//           text-xs leading-relaxed text-gray-700 text-justify
//           [&_ul]:list-disc
//           [&_ul]:pl-4
//           [&_ol]:list-decimal
//           [&_ol]:pl-4
//           [&_li]:mb-1
//         "
//           dangerouslySetInnerHTML={{ __html: formData.summary }}
//         />
//       </section>
//     );

//   const renderEducation = () =>
//     hasEducation && (
//       <section key="education">
//         <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
//           Education
//         </h2>
//         <div className="flex flex-col gap-5">
//           {formData.educationHistory.map((edu, idx) => (
//             <div key={idx} className="flex flex-col">
//               <div className="flex justify-between items-baseline">
//                 <h3 className="text-xs font-bold text-gray-900 uppercase">
//                   {edu.degree}, {edu.school}
//                 </h3>
//                 <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-2">
//                   {edu.city_state}
//                 </span>
//               </div>

//               <span className="text-[10px] text-gray-400 mt-0.5 mb-1">
//                 {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
//               </span>

//               {edu.description && (
//                 <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
//                   {edu.description}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderEmployment = () =>
//     hasEmployment && (
//       <section key="employment">
//         <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
//           Employment History
//         </h2>
//         <div className="flex flex-col gap-6">
//           {formData.employmentHistory.map((job, idx) => (
//             <div key={idx}>
//               <div className="flex justify-between items-start mb-1">
//                 <div>
//                   <h3 className="text-xs font-bold text-gray-900 uppercase">
//                     {job.job_title}, {job.employer}
//                   </h3>
//                 </div>
//                 <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-4">
//                   {job.city_state}
//                 </span>
//               </div>

//               <div className="text-[10px] text-gray-400 mb-2">
//                 {formatDate(job.startDate)} — {formatDate(job.endDate)}
//               </div>

//               {job.description && (
//                 <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
//                   {job.description}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderInternships = () =>
//     hasInternships && (
//       <section key="internships">
//         <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
//           Internships
//         </h2>
//         <div className="flex flex-col gap-5">
//           {formData.internshipHistory.map((job, idx) => (
//             <div key={idx}>
//               <div className="flex justify-between items-start mb-1">
//                 <h3 className="text-xs font-bold text-gray-900 uppercase">
//                   {job.jobTitle}, {job.employer}
//                 </h3>
//                 <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">
//                   {job.city}
//                 </span>
//               </div>

//               <div className="text-[10px] text-gray-400 mb-2">
//                 {formatDate(job.startDate)} — {formatDate(job.endDate)}
//               </div>

//               {job.description && (
//                 <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
//                   {job.description}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderActivities = () =>
//     hasActivities && (
//       <section key="activities">
//         <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
//           Activities
//         </h2>
//         <div className="flex flex-col gap-4">
//           {formData.activityHistory.map((act, idx) => (
//             <div key={idx} className="flex justify-between items-start group">
//               <div className="w-[80%]">
//                 <h3 className="text-xs font-semibold text-gray-800">
//                   {act.functionTitle} {act.employer ? `- ${act.employer}` : ""}
//                 </h3>
//                 {act.description && (
//                   <p className="text-[11px] text-gray-500 mt-1">
//                     {act.description}
//                   </p>
//                 )}
//               </div>
//               <div className="text-right">
//                 <span className="text-[10px] text-gray-500 block">
//                   {act.city}
//                 </span>
//                 <span className="text-[10px] text-gray-400 block">
//                   {getYear(act.startDate)} — {getYear(act.endDate)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderCourses = () =>
//     hasCourses && (
//       <section key="courses">
//         <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
//           Courses
//         </h2>
//         <div className="flex flex-col gap-4">
//           {formData.coursesHistory.map((course, idx) => (
//             <div key={idx} className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-xs font-semibold text-gray-800">
//                   {course.course}{" "}
//                   {course.institution ? `- ${course.institution}` : ""}
//                 </h3>
//               </div>
//               <div className="text-right">
//                 <span className="text-[10px] text-gray-400 block">
//                   {getYear(course.startDate)} — {getYear(course.endDate)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderSkills = () =>
//     hasSkills && (
//       <section key="skills" className="mb-2">
//         <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">
//           Skills
//         </h3>
//         <div className="flex flex-col gap-2">
//           {formData.newSkillHistory.map((skill, idx) => (
//             <div key={idx}>
//               <span className="text-xs text-gray-700 block">{skill.skill}</span>
//               {!formData.hideExperienceLevel && (
//                 <span className="text-[10px] text-gray-400 uppercase">
//                   {
//                     ["Novice", "Beginner", "Skillful", "Experienced", "Expert"][
//                       skill.level || 0
//                     ]
//                   }
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
//         <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 text-black">
//           Hobbies
//         </h3>
//         <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
//           {formData.hobbies}
//         </p>
//       </section>
//     );

//   const renderLanguages = () =>
//     hasLanguages && (
//       <section key="languages">
//         <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 text-black">
//           Languages
//         </h3>
//         <div className="flex flex-col gap-2">
//           {formData.languageHistory.map((lang, idx) => (
//             <div key={idx} className="flex flex-col">
//               <span className="text-xs font-semibold text-gray-800">
//                 {lang.language}
//               </span>
//               <span className="text-[10px] text-gray-500">{lang.level}</span>
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderCustom = () => (
//     <>
//       {Object.keys(formData)
//         .filter((key) => key.startsWith("customSectionHistory_"))
//         .map((key) => {
//           const sectionId = key.replace("customSectionHistory_", "");
//           const history = formData[key];
//           const title =
//             formData[`customSectionTitle_${sectionId}`] || "Custom Section";

//           if (!history?.some((item) => item.activity || item.city)) return null;

//           return (
//             <section key={sectionId}>
//               <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
//                 {title}
//               </h2>
//               <div className="flex flex-col gap-4">
//                 {history.map((item, idx) => (
//                   <div key={idx}>
//                     <div className="flex justify-between items-start mb-1">
//                       <h3 className="text-xs font-bold text-gray-900 uppercase">
//                         {item.activity}
//                         {item.city ? `, ${item.city}` : ""}
//                       </h3>
//                     </div>

//                     <div className="text-[10px] text-gray-400 mb-2">
//                       {formatDate(item.startDate)} — {formatDate(item.endDate)}
//                     </div>

//                     {item.description && (
//                       <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
//                         {item.description}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </section>
//           );
//         })}
//       {formData.customSectionHistory?.some(
//         (item) => item.activity || item.city,
//       ) && (
//         <section key="custom-default">
//           <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
//             {formData.customSectionTitle || "Custom Section"}
//           </h2>
//           <div className="flex flex-col gap-4">
//             {formData.customSectionHistory.map((item, idx) => (
//               <div key={idx}>
//                 <div className="flex justify-between items-start mb-1">
//                   <h3 className="text-xs font-bold text-gray-900 uppercase">
//                     {item.activity}
//                     {item.city ? `, ${item.city}` : ""}
//                   </h3>
//                 </div>

//                 <div className="text-[10px] text-gray-400 mb-2">
//                   {formatDate(item.startDate)} — {formatDate(item.endDate)}
//                 </div>

//                 {item.description && (
//                   <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
//                     {item.description}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//     </>
//   );

//   // Define section grouping
//   const sidebarSections = {
//     languages: renderLanguages,
//     // 'links' is handled separately as it's not a standard draggable section in page.js usually
//   };

//   const mainSections = {
//     summary: renderSummary,
//     employment: renderEmployment,
//     education: renderEducation,
//     skills: renderSkills,
//     hobbies: renderHobbies,
//     activities: renderActivities,
//     internships: renderInternships,
//     courses: renderCourses,
//     custom: renderCustom,
//   };

//   const order = sectionOrder || [
//     "summary",
//     "employment",
//     "education",
//     "skills",
//     "hobbies",
//     "activities",
//     "internships",
//     "courses",
//     "custom",
//     "languages",
//   ];

//   return (
//     <div className="min-h-[297mm] bg-white text-gray-900 font-sans p-10 shadow-xl">
//       {/* ----------------- HEADER ----------------- */}
//       <header className="mb-8">
//         <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900 mb-2">
//           {formData.first_name} {formData.last_name}
//         </h1>
//         {formData.job_target && (
//           <p className="text-sm uppercase tracking-[0.2em] text-gray-500 font-medium">
//             {formData.job_target}
//           </p>
//         )}
//       </header>

//       {/* ----------------- DIVIDER ----------------- */}
//       <hr className="border-t border-gray-300 mb-8" />

//       {/* ----------------- TWO COLUMN LAYOUT ----------------- */}
//       <div className="flex gap-10">
//         {/* ================= LEFT SIDEBAR (30%) ================= */}
//         <div className="w-[30%] flex flex-col gap-10 border-r border-gray-200 pr-6">
//           {/* DETAILS */}
//           {hasContactInfo && (
//             <section>
//               <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 text-black">
//                 Details
//               </h3>
//               <div className="flex flex-col gap-3 text-xs text-gray-600">
//                 {/* Address */}
//                 {(formData.address || formData.city_state) && (
//                   <div className="flex flex-col">
//                     <span className="font-semibold text-gray-800 uppercase text-[10px]">
//                       Address
//                     </span>
//                     <span>{formData.address}</span>
//                     <span>
//                       {formData.city_state}
//                       {formData.city_state && formData.country ? ", " : ""}
//                       {formData.country}
//                     </span>
//                     {formData.postal_code && (
//                       <span>{formData.postal_code}</span>
//                     )}
//                   </div>
//                 )}

//                 {/* Phone */}
//                 {formData.phone && (
//                   <div className="flex flex-col">
//                     <span className="font-semibold text-gray-800 uppercase text-[10px]">
//                       Phone
//                     </span>
//                     <span>{formData.phone}</span>
//                   </div>
//                 )}

//                 {/* Email */}
//                 {formData.email && (
//                   <div className="flex flex-col">
//                     <span className="font-semibold text-gray-800 uppercase text-[10px]">
//                       Email
//                     </span>
//                     <a
//                       href={`mailto:${formData.email}`}
//                       className="break-all hover:text-black hover:underline"
//                     >
//                       {formData.email}
//                     </a>
//                   </div>
//                 )}

//                 {/* Extra Details */}
//                 {formData.driving_licence && (
//                   <div className="flex flex-col">
//                     <span className="font-semibold text-gray-800 uppercase text-[10px]">
//                       Driving License
//                     </span>
//                     <span>{formData.driving_licence}</span>
//                   </div>
//                 )}
//                 {formData.nationality && (
//                   <div className="flex flex-col">
//                     <span className="font-semibold text-gray-800 uppercase text-[10px]">
//                       Nationality
//                     </span>
//                     <span>{formData.nationality}</span>
//                   </div>
//                 )}
//                 {formData.dob && (
//                   <div className="flex flex-col">
//                     <span className="font-semibold text-gray-800 uppercase text-[10px]">
//                       Date of Birth
//                     </span>
//                     <span>{formData.dob}</span>
//                   </div>
//                 )}
//               </div>
//             </section>
//           )}

//           {/* LINKS */}
//           {(formData.linkedin || formData.website) && (
//             <section>
//               <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 text-black">
//                 Links
//               </h3>
//               <div className="flex flex-col gap-2 text-xs text-gray-600">
//                 {formData.linkedin && (
//                   <a
//                     href={formData.linkedin}
//                     className="underline decoration-dotted"
//                   >
//                     LinkedIn
//                   </a>
//                 )}
//                 {formData.website && (
//                   <a
//                     href={formData.website}
//                     className="underline decoration-dotted"
//                   >
//                     Portfolio
//                   </a>
//                 )}
//               </div>
//             </section>
//           )}

//           {/* SIDEBAR SECTIONS */}
//           {order.map((sectionId) => {
//             if (sidebarSections[sectionId]) {
//               return sidebarSections[sectionId]();
//             }
//             return null;
//           })}
//         </div>

//         {/* ================= RIGHT CONTENT (70%) ================= */}
//         <div className="w-[70%] flex flex-col gap-8">
//           {/* MAIN SECTIONS */}
//           {order.map((sectionId) => {
//             if (mainSections[sectionId]) {
//               return mainSections[sectionId]();
//             }
//             return null;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CleanTemplate;
