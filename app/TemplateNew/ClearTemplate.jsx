"use client";
import React from "react";

const SIDEBAR_TYPES = new Set(["languages", "hobbies"]);
const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

const ClearTemplate = ({ formData, sections, sectionOrder, themeColor, resumeSettings }) => {

  // ── Helpers ──────────────────────────────────────────────────────────────
  const formatDate = (dateValue) => {
    if (!dateValue) return null;
    if (typeof dateValue === "string" && dateValue.toLowerCase() === "present") return "Present";
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  const dateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end   = formatDate(endDate);
    if (start && end) return `${start} — ${end}`;
    return start || end || "";
  };

  // ── Scratch checks ────────────────────────────────────────────────────────
  const hasEmployment  = formData.employmentHistory?.some(j => j.job_title || j.employer) && formData.employmentHistory.length > 0;
  const hasEducation   = formData.educationHistory?.some(e => e.school || e.degree) && formData.educationHistory.length > 0;
  const hasSkills      = formData.newSkillHistory?.some(s => s.skill) && formData.newSkillHistory.length > 0;
  const hasLanguages   = formData.languageHistory?.some(l => l.language) && formData.languageHistory.length > 0;
  const hasActivities  = formData.activityHistory?.some(a => a.functionTitle || a.employer) && formData.activityHistory.length > 0;
  const hasInternships = formData.internshipHistory?.some(i => i.jobTitle || i.employer) && formData.internshipHistory.length > 0;
  const hasCourses     = formData.coursesHistory?.some(c => c.course || c.institution) && formData.coursesHistory.length > 0;

  const links = [];
  if (formData.linkedin) links.push({ label: "LinkedIn", url: formData.linkedin });
  if (formData.website)  links.push({ label: "Portfolio", url: formData.website });
  if (formData.github)   links.push({ label: "GitHub", url: formData.github });

  // ════════════════════════════════════════════════════════════════════════
  //  MAIN — SCRATCH
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryScratch = () =>
    formData.summary ? (
      <section key="summary">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{formData.summarySectionTitle || "Profile"}</h2>
        <div
          className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: formData.summary }}
        />
      </section>
    ) : null;

  const renderEmploymentScratch = () =>
    hasEmployment ? (
      <section key="employment">
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{formData.employmentSectionTitle || "Experience"}</h2>
        <div className="flex flex-col gap-6">
          {formData.employmentHistory.map((job, i) => (
            <div key={i}>
              <h3 className="text-xs font-bold text-gray-900">
                {job.job_title}{job.employer ? `, ${job.employer}` : ""}{job.city_state ? `, ${job.city_state}` : ""}
              </h3>
              {dateRange(job.startDate, job.endDate) && (
                <div className="text-xs text-gray-500 mb-2 mt-0.5">{dateRange(job.startDate, job.endDate)}</div>
              )}
              {job.description && (
                <div
                  className="text-xs text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
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
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{formData.educationSectionTitle || "Education"}</h2>
        <div className="flex flex-col gap-6">
          {formData.educationHistory.map((edu, i) => (
            <div key={i}>
              <h3 className="text-xs font-bold text-gray-900 uppercase">
                {edu.degree}{edu.school ? `, ${edu.school}` : ""}
              </h3>
              {dateRange(edu.startDate, edu.endDate) && (
                <div className="text-xs text-gray-500 mb-1 mt-0.5">{dateRange(edu.startDate, edu.endDate)}</div>
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
      <div className="mb-2" key="skills">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">{formData.skillSectionTitle || "Skills"}</h3>
        <div className="flex flex-col gap-2">
          {formData.newSkillHistory.map((s, i) => (
            <span key={i} className="block">
              <span className="text-xs text-gray-700">{s.skill}</span>
              {!formData.hideExperienceLevel && s.level !== undefined && (
                <span className="text-[10px] text-gray-400 uppercase ml-2">{skillLevels[s.level ?? 0]}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    ) : null;

  const renderInternshipsScratch = () =>
    hasInternships ? (
      <section key="internships">
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{formData.internshipsSectionTitle || "Internships"}</h2>
        <div className="flex flex-col gap-6">
          {formData.internshipHistory.map((job, i) => (
            <div key={i}>
              <h3 className="text-xs font-bold text-gray-900">
                {job.jobTitle}{job.employer ? `, ${job.employer}` : ""}{job.city ? `, ${job.city}` : ""}
              </h3>
              {dateRange(job.startDate, job.endDate) && (
                <div className="text-xs text-gray-500 mb-2 mt-0.5">{dateRange(job.startDate, job.endDate)}</div>
              )}
              {job.description && (
                <div
                  className="text-xs text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
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
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{formData.activitiesSectionTitle || "Activities"}</h2>
        <div className="flex flex-col gap-5">
          {formData.activityHistory.map((act, i) => (
            <div key={i}>
              <h3 className="text-xs font-bold text-gray-900">
                {act.functionTitle}{act.employer ? ` - ${act.employer}` : ""}
              </h3>
              {dateRange(act.startDate, act.endDate) && (
                <div className="text-xs text-gray-500 mb-1 mt-0.5">{dateRange(act.startDate, act.endDate)}</div>
              )}
              {act.description && (
                <div
                  className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: act.description }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderCoursesScratch = () =>
    hasCourses ? (
      <section key="courses">
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{formData.coursesSectionTitle || "Courses"}</h2>
        <div className="flex flex-col gap-4">
          {formData.coursesHistory.map((c, i) => (
            <div key={i}>
              <h3 className="text-xs font-bold text-gray-900">
                {c.course}{c.institution ? ` - ${c.institution}` : ""}
              </h3>
              {dateRange(c.startDate, c.endDate) && (
                <div className="text-xs text-gray-500 mt-0.5">{dateRange(c.startDate, c.endDate)}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderLanguagesScratch = () =>
    hasLanguages ? (
      <div className="mb-8 mt-2" key="languages">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">{formData.languagesSectionTitle || "Languages"}</h3>
        <div className="flex flex-col gap-2">
          {formData.languageHistory.map((lang, i) => (
            <div key={i} className="text-xs">
              <span className="block text-gray-800 font-medium">{lang.language}</span>
              {!formData.hideLanguageProficiency && <span className="block text-gray-500 text-[10px]">{lang.level}</span>}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const renderHobbiesScratch = () =>
    formData.hobbies ? (
      <div className="mb-8" key="hobbies">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">{formData.hobbiesSectionTitle || "Hobbies"}</h3>
        <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">{formData.hobbies}</p>
      </div>
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
            <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{title}</h2>
            <div className="flex flex-col gap-2">
              {history.map((item, i) => (
                <span key={i} className="text-xs text-gray-700 block">
                  {item.name}
                  {!hideLevel && item.level !== undefined && (
                    <span className="text-[10px] text-gray-400 uppercase ml-2">{skillLevels[item.level ?? 2]}</span>
                  )}
                </span>
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
            <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{title}</h2>
            <div className="flex flex-col gap-4">
              {history.map((item, i) => (
                <div key={i}>
                  <h3 className="text-xs font-bold text-gray-900">
                    {item.title}{item.city ? `, ${item.city}` : ""}
                  </h3>
                  {dateRange(item.startDate, item.endDate) && (
                    <div className="text-xs text-gray-500 mb-1 mt-0.5">{dateRange(item.startDate, item.endDate)}</div>
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
      <h2 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h2>
      <div
        className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
    </section>
  );

  const renderExperienceFromSection = (section) => (
    <section key={section.id}>
      <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{section.title}</h2>
      <div className="flex flex-col gap-6">
        {section.experiences?.map((exp, i) => (
          <div key={exp.id || i}>
            <h3 className="text-xs font-bold text-gray-900">
              {exp.jobTitle}{exp.company ? `, ${exp.company}` : ""}{exp.city ? `, ${exp.city}` : ""}
            </h3>
            {dateRange(exp.startDate, exp.endDate) && (
              <div className="text-xs text-gray-500 mb-2 mt-0.5">{dateRange(exp.startDate, exp.endDate)}</div>
            )}
            {exp.description && (
              <div
                className="text-xs text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
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
      <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{section.title}</h2>
      <div className="flex flex-col gap-6">
        {section.educations?.map((edu, i) => (
          <div key={edu.id || i}>
            <h3 className="text-xs font-bold text-gray-900 uppercase">
              {edu.degree}{edu.institute ? `, ${edu.institute}` : ""}{edu.city ? `, ${edu.city}` : ""}
            </h3>
            {dateRange(edu.startDate, edu.endDate) && (
              <div className="text-xs text-gray-500 mb-1 mt-0.5">{dateRange(edu.startDate, edu.endDate)}</div>
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
      <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.certifications?.map((cert, i) => (
          <div key={cert.id || i}>
            <h3 className="text-xs font-bold text-gray-900">
              {cert.name}{cert.organization ? `, ${cert.organization}` : ""}
            </h3>
            {(cert.startYear || cert.endYear) && (
              <div className="text-xs text-gray-500 mt-0.5">
                {cert.startYear}{cert.endYear ? ` — ${cert.endYear}` : ""}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderCoursesFromSection = (section) => (
    <section key={section.id}>
      <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.courses?.map((c, i) => (
          <div key={c.id || i}>
            <h3 className="text-xs font-bold text-gray-900">
              {c.course}{c.institution ? ` - ${c.institution}` : ""}
            </h3>
            {dateRange(c.startDate, c.endDate) && (
              <div className="text-xs text-gray-500 mt-0.5">{dateRange(c.startDate, c.endDate)}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderInternshipsFromSection = (section) => (
    <section key={section.id}>
      <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{section.title}</h2>
      <div className="flex flex-col gap-6">
        {section.internships?.map((intern, i) => (
          <div key={intern.id || i}>
            <h3 className="text-xs font-bold text-gray-900">
              {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ""}{intern.city ? `, ${intern.city}` : ""}
            </h3>
            {dateRange(intern.startDate, intern.endDate) && (
              <div className="text-xs text-gray-500 mb-2 mt-0.5">{dateRange(intern.startDate, intern.endDate)}</div>
            )}
            {intern.description && (
              <div
                className="text-xs text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
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
      <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{section.title}</h2>
      <div className="flex flex-col gap-5">
        {section.activities?.map((a, i) => (
          <div key={a.id || i}>
            <h3 className="text-xs font-bold text-gray-900">
              {a.functionTitle}{a.employer ? ` - ${a.employer}` : ""}
            </h3>
            {dateRange(a.startDate, a.endDate) && (
              <div className="text-xs text-gray-500 mb-1 mt-0.5">{dateRange(a.startDate, a.endDate)}</div>
            )}
            {a.description && (
              <div
                className="text-xs text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: a.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderSkillsFromSection = (section) => (
    <div className="mb-2" key={section.id}>
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">{section.title}</h3>
      <div className="flex flex-col gap-2">
        {section.skills?.map((skill, i) => (
          <span key={skill.id || i} className="block">
            <span className="text-xs text-gray-700">{skill.name}</span>
            {section.hideExperienceLevel === false && skill.level !== undefined && (
              <span className="text-[10px] text-gray-400 uppercase ml-2">{skillLevels[skill.level ?? 0]}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );

  const renderLanguagesFromSection = (section) => (
    <div className="mb-8 mt-2" key={section.id}>
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">{section.title}</h3>
      <div className="flex flex-col gap-2">
        {section.languages?.map((l, i) => (
          <div key={i} className="text-xs">
            <span className="block text-gray-800 font-medium">{l.language}</span>
            {!section.hideProficiency && <span className="block text-gray-500 text-[10px]">{l.level}</span>}
          </div>
        ))}
      </div>
    </div>
  );

  const renderHobbiesFromSection = (section) =>
    section.hobbies ? (
      <div className="mb-8" key={section.id}>
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">{section.title}</h3>
        <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">{section.hobbies}</p>
      </div>
    ) : null;

  const renderCustomSimpleFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <section key={section.id}>
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{section.title}</h2>
        <div className="flex flex-col gap-2">
          {section.items?.map((item, i) => {
            const name  = typeof item === "object" ? (item.name || item.title) : item;
            const level = typeof item === "object" ? (item.level ?? 2) : 2;
            return (
              <span key={i} className="text-xs text-gray-700 block">
                {name}
                {showLevel && <span className="text-[10px] text-gray-400 uppercase ml-2">{skillLevels[level]}</span>}
              </span>
            );
          })}
        </div>
      </section>
    );
  };

  const renderCustomAdvancedFromSection = (section) => (
    <section key={section.id}>
      <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.items?.map((item, i) => (
          <div key={item.id || i}>
            <h3 className="text-xs font-bold text-gray-900">
              {item.title}{item.city ? `, ${item.city}` : ""}
            </h3>
            {dateRange(item.startDate, item.endDate) && (
              <div className="text-xs text-gray-500 mb-1 mt-0.5">{dateRange(item.startDate, item.endDate)}</div>
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
    const order = sectionOrder || ["summary","employment","education","skills","internships","activities","courses","custom","languages","hobbies"];
    const map = {
      summary:    renderSummaryScratch,
      employment: renderEmploymentScratch,
      education:  renderEducationScratch,
      skills:     renderSkillsScratch,
      internships:renderInternshipsScratch,
      activities: renderActivitiesScratch,
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
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{title}</h2>
              <div className="flex flex-col gap-2">
                {h.map((item, i) => (
                  <span key={i} className="text-xs text-gray-700 block">
                    {item.name}{!hide && item.level !== undefined && <span className="text-[10px] text-gray-400 uppercase ml-2">{skillLevels[item.level ?? 2]}</span>}
                  </span>
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
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">{title}</h2>
              <div className="flex flex-col gap-4">
                {h.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-xs font-bold text-gray-900">{item.title}{item.city ? `, ${item.city}` : ""}</h3>
                    {dateRange(item.startDate, item.endDate) && <div className="text-xs text-gray-500 mb-1 mt-0.5">{dateRange(item.startDate, item.endDate)}</div>}
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

  return (
    <div className="min-h-[297mm] bg-white text-gray-800 font-sans shadow-xl">
      {/* Header */}
      <div className="p-10 flex items-center gap-6" style={{ backgroundColor: themeColor }}>
        {formData.profileImage && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shrink-0 shadow-sm bg-gray-200">
            <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{formData.first_name} {formData.last_name}</h1>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-700 mb-4">{formData.job_target}</p>
          <div className="text-xs text-gray-800 flex flex-col gap-1">
            {(formData.address || formData.city_state || formData.country) && (
              <span>
                {formData.address}{formData.address && (formData.city_state || formData.country) ? ", " : ""}
                {formData.city_state}{formData.city_state && formData.country ? ", " : ""}
                {formData.country}{formData.postal_code ? ` ${formData.postal_code}` : ""}
              </span>
            )}
            <div className="flex flex-wrap gap-4">
              {formData.phone && <span>{formData.phone}</span>}
              {formData.email && <a href={`mailto:${formData.email}`} className="underline hover:text-black">{formData.email}</a>}
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex min-h-[800px]">
        {/* Sidebar */}
        <div className="w-[28%] p-8 pl-10 pt-10">
          {links.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2 text-gray-900">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">Links</span>
              </div>
              <div className="flex flex-col gap-1">
                {links.map((link, i) => (
                  <a key={i} href={link.url} className="text-xs text-gray-600 hover:underline hover:text-black decoration-dotted">{link.label}</a>
                ))}
              </div>
            </div>
          )}
          {(formData.dob || formData.birth_place || formData.nationality || formData.driving_licence) && (
            <section className="flex flex-col gap-4 mb-4">
              {formData.dob && (
                <div>
                  <p className="text-[11px] font-bold text-gray-900">Date / Place of birth</p>
                  <p className="text-[11px] text-gray-600">{formData.dob}{formData.birth_place ? `, ${formData.birth_place}` : ""}</p>
                </div>
              )}
              {formData.nationality && (
                <div>
                  <p className="text-[11px] font-bold text-gray-900">Nationality</p>
                  <p className="text-[11px] text-gray-600">{formData.nationality}</p>
                </div>
              )}
              {formData.driving_licence && (
                <div>
                  <p className="text-[11px] font-bold text-gray-900">Driving license</p>
                  <p className="text-[11px] text-gray-600">{formData.driving_licence}</p>
                </div>
              )}
            </section>
          )}
          {renderSidebarContent()}
        </div>

        {/* Main */}
        <div className="w-[75%] p-8 pr-10 pt-10 flex flex-col gap-8">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default ClearTemplate;

// "use client";
// import React from "react";
// import { Link, Phone, Mail, MapPin, Calendar } from "lucide-react"; // Assuming you have lucide-react or similar icons

// const ClearTemplate = ({ formData, themeColor, sectionOrder }) => {
//   // --- Helpers ---
//   const formatDate = (dateValue) => {
//     if (!dateValue) return "";
//     const d = new Date(dateValue);
//     return d.toLocaleString("en-US", { month: "short", year: "numeric" }); // e.g. Jan 2026
//   };

//   const getYear = (dateValue) => {
//     if (!dateValue) return "";
//     const d = new Date(dateValue);
//     return d.getFullYear();
//   };

//   // --- Logic Checks ---
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

//   // Combine links for the sidebar
//   const links = [];
//   if (formData.linkedin)
//     links.push({ label: "LinkedIn", url: formData.linkedin });
//   if (formData.website)
//     links.push({ label: "Portfolio", url: formData.website });
//   if (formData.github) links.push({ label: "GitHub", url: formData.github });

//   // --- RENDER FUNCTIONS ---
//   const renderSummary = () =>
//     formData.summary && (
//       <section key="summary">
//         <h2 className="text-lg font-bold text-gray-900 mb-2">Profile</h2>
//         {/* <p className="text-xs leading-relaxed text-gray-700 text-justify whitespace-pre-wrap">
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
//         <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">
//           Education
//         </h2>
//         <div className="flex flex-col gap-6">
//           {formData.educationHistory.map((edu, idx) => (
//             <div key={idx}>
//               <h3 className="text-xs font-bold text-gray-900 uppercase">
//                 {edu.degree}
//                 {edu.school ? `, ${edu.school}` : ""}
//               </h3>
//               <div className="text-xs text-gray-500 mb-1 mt-0.5">
//                 {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
//               </div>
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
//         <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">
//           Experience
//         </h2>
//         <div className="flex flex-col gap-6">
//           {formData.employmentHistory.map((job, idx) => (
//             <div key={idx}>
//               <h3 className="text-xs font-bold text-gray-900">
//                 {job.job_title}
//                 {job.employer ? `, ${job.employer}` : ""}
//                 {job.city_state ? `, ${job.city_state}` : ""}
//               </h3>
//               <div className="text-xs text-gray-500 mb-2 mt-0.5">
//                 {formatDate(job.startDate)} — {formatDate(job.endDate)}
//               </div>
//               {job.description && (
//                 <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
//                   {job.description}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderSkills = () =>
//     hasSkills && (
//       <div className="mb-2" key="skills">
//         <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">
//           Skills
//         </h3>
//         <div className="flex flex-col gap-2">
//           {formData.newSkillHistory.map((skill, idx) => (
//             <span key={idx} className="block">
//               <span className="text-xs text-gray-700">{skill.skill}</span>
//               {!formData.hideExperienceLevel && (
//                 <span className="text-[10px] text-gray-400 uppercase ml-2">
//                   {
//                     ["Novice", "Beginner", "Skillful", "Experienced", "Expert"][
//                       skill.level || 0
//                     ]
//                   }
//                 </span>
//               )}
//             </span>
//           ))}
//         </div>
//       </div>
//     );

//   const renderInternships = () =>
//     hasInternships && (
//       <section key="internships">
//         <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">
//           Internships
//         </h2>
//         <div className="flex flex-col gap-6">
//           {formData.internshipHistory.map((job, idx) => (
//             <div key={idx}>
//               <h3 className="text-xs font-bold text-gray-900">
//                 {job.jobTitle}
//                 {job.employer ? `, ${job.employer}` : ""}
//                 {job.city ? `, ${job.city}` : ""}
//               </h3>
//               <div className="text-xs text-gray-500 mb-2 mt-0.5">
//                 {getYear(job.startDate)} — {getYear(job.endDate)}
//               </div>
//               {job.description && (
//                 <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
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
//         <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">
//           Activities
//         </h2>
//         <div className="flex flex-col gap-5">
//           {formData.activityHistory.map((act, idx) => (
//             <div key={idx}>
//               <h3 className="text-xs font-bold text-gray-900">
//                 {act.functionTitle} {act.employer ? `- ${act.employer}` : ""}
//               </h3>
//               <div className="text-xs text-gray-500 mb-1 mt-0.5">
//                 {formatDate(act.startDate)} — {formatDate(act.endDate)}
//               </div>
//               {act.description && (
//                 <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
//                   {act.description}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderCourses = () =>
//     hasCourses && (
//       <section key="courses">
//         <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">
//           Courses
//         </h2>
//         <div className="flex flex-col gap-4">
//           {formData.coursesHistory.map((course, idx) => (
//             <div key={idx}>
//               <h3 className="text-xs font-bold text-gray-900">
//                 {course.course}{" "}
//                 {course.institution ? `- ${course.institution}` : ""}
//               </h3>
//               <div className="text-xs text-gray-500 mt-0.5">
//                 {formatDate(course.startDate)} — {formatDate(course.endDate)}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderLanguages = () =>
//     hasLanguages && (
//       <div className="mb-8 mt-2" key="languages">
//         <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
//           Languages
//         </h3>
//         <div className="flex flex-col gap-2">
//           {formData.languageHistory.map((lang, idx) => (
//             <div key={idx} className="text-xs">
//               <span className="block text-gray-800 font-medium">
//                 {lang.language}
//               </span>
//               <span className="block text-gray-500 text-[10px]">
//                 {lang.level}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );

//   const renderHobbies = () =>
//     formData.hobbies && (
//       <div className="mb-8" key="hobbies">
//         <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
//           Hobbies
//         </h3>
//         <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
//           {formData.hobbies}
//         </p>
//       </div>
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
//               <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">
//                 {title}
//               </h2>
//               <div className="flex flex-col gap-4">
//                 {history.map((item, idx) => (
//                   <div key={idx}>
//                     <h3 className="text-xs font-bold text-gray-900">
//                       {item.activity} {item.city ? `, ${item.city}` : ""}
//                     </h3>
//                     <div className="text-xs text-gray-500 mb-1 mt-0.5">
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
//           <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">
//             {formData.customSectionTitle || "Custom Section"}
//           </h2>
//           <div className="flex flex-col gap-4">
//             {formData.customSectionHistory.map((item, idx) => (
//               <div key={idx}>
//                 <h3 className="text-xs font-bold text-gray-900">
//                   {item.activity} {item.city ? `, ${item.city}` : ""}
//                 </h3>
//                 <div className="text-xs text-gray-500 mb-1 mt-0.5">
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

//   const sidebarSections = {
//     languages: renderLanguages,
//     hobbies: renderHobbies,
//   };

//   const mainSections = {
//     summary: renderSummary,
//     employment: renderEmployment,
//     education: renderEducation,
//     skills: renderSkills,
//     internships: renderInternships,
//     activities: renderActivities,
//     courses: renderCourses,
//     custom: renderCustom,
//   };

//   const order = sectionOrder || [
//     "summary",
//     "employment",
//     "education",
//     "skills",
//     "internships",
//     "activities",
//     "courses",
//     "custom",
//     "languages",
//     "hobbies",
//   ];

//   return (
//     <div className="min-h-[297mm] bg-white text-gray-800 font-sans shadow-xl">
//       {/* ----------------- HEADER (TEAL BLOCK) ----------------- */}
//       <div
//         className=" p-10 flex items-center gap-6"
//         style={{ backgroundColor: themeColor }}
//       >
//         {/* Optional: Profile Image (Hidden if not provided, per design thumbnail) */}
//         {formData.profileImage && (
//           <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shrink-0 shadow-sm bg-gray-200">
//             <img
//               src={formData.profileImage}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}

//         <div className="flex-1">
//           <h1 className="text-3xl font-bold text-gray-900 mb-1">
//             {formData.first_name} {formData.last_name}
//           </h1>
//           <p className="text-sm font-medium uppercase tracking-wide text-gray-700 mb-4">
//             {formData.job_target}
//           </p>

//           <div className="text-xs text-gray-800 flex flex-col gap-1">
//             {/* Address Line */}
//             {(formData.address || formData.city_state || formData.country) && (
//               <span>
//                 {formData.address}
//                 {formData.address && (formData.city_state || formData.country)
//                   ? ", "
//                   : ""}
//                 {formData.city_state}
//                 {formData.city_state && formData.country ? ", " : ""}
//                 {formData.country}
//                 {formData.postal_code ? ` ${formData.postal_code}` : ""}
//               </span>
//             )}

//             {/* Contact Line */}
//             <div className="flex flex-wrap gap-4">
//               {formData.phone && <span>{formData.phone}</span>}
//               {formData.email && (
//                 <a
//                   href={`mailto:${formData.email}`}
//                   className="underline hover:text-black"
//                 >
//                   {formData.email}
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ----------------- MAIN GRID ----------------- */}
//       <div className="flex min-h-[800px]">
//         {" "}
//         {/* Flex container for columns */}
//         {/* ================= LEFT SIDEBAR (25%) ================= */}
//         <div className="w-[28%] p-8 pl-10 pt-10">
//           {/* LINKS */}
//           {links.length > 0 && (
//             <div className="mb-8">
//               <div className="flex items-center gap-2 mb-2 text-gray-900">
//                 {/* Simple link icon SVG representation */}
//                 <svg
//                   width="14"
//                   height="14"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
//                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
//                 </svg>
//                 <span className="text-xs font-bold uppercase tracking-wider">
//                   Links
//                 </span>
//               </div>
//               <div className="flex flex-col gap-1">
//                 {links.map((link, idx) => (
//                   <a
//                     key={idx}
//                     href={link.url}
//                     className="text-xs text-gray-600 hover:underline hover:text-black decoration-dotted"
//                   >
//                     {link.label}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}

//           {(formData.dob ||
//             formData.birth_place ||
//             formData.nationality ||
//             formData.driving_licence) && (
//             <section className="flex flex-col gap-4 mb-4">
//               {formData.dob && (
//                 <div>
//                   <p className="text-[11px] font-bold text-gray-900">
//                     Date / Place of birth
//                   </p>
//                   <p className="text-[11px] text-gray-600">
//                     {formData.dob}
//                     {formData.birth_place ? `, ${formData.birth_place}` : ""}
//                   </p>
//                 </div>
//               )}

//               {formData.nationality && (
//                 <div>
//                   <p className="text-[11px] font-bold text-gray-900">
//                     Nationality
//                   </p>
//                   <p className="text-[11px] text-gray-600">
//                     {formData.nationality}
//                   </p>
//                 </div>
//               )}

//               {formData.driving_licence && (
//                 <div>
//                   <p className="text-[11px] font-bold text-gray-900">
//                     Driving license
//                   </p>
//                   <p className="text-[11px] text-gray-600">
//                     {formData.driving_licence}
//                   </p>
//                 </div>
//               )}
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
//         {/* ================= RIGHT CONTENT (75%) ================= */}
//         <div className="w-[75%] p-8 pr-10 pt-10 flex flex-col gap-8">
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

// export default ClearTemplate;
