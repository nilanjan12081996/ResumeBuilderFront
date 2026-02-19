"use client";
import React from "react";

const SIDEBAR_TYPES = new Set(["skills", "languages", "hobbies"]);
const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

const SectionHeader = ({ title }) => (
  <div className="bg-black text-white inline-block px-3 py-1 text-[11px] font-bold tracking-widest uppercase mb-5">
    {title}
  </div>
);

const VividTemplate = ({ formData, sections, sectionOrder, resumeSettings }) => {

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
  const hasEmployment  = formData.employmentHistory?.some(j => j.job_title || j.employer);
  const hasEducation   = formData.educationHistory?.some(e => e.school || e.degree);
  const hasSkills      = formData.newSkillHistory?.some(s => s.skill);
  const hasLanguages   = formData.languageHistory?.some(l => l.language);
  const hasActivities  = formData.activityHistory?.some(a => a.functionTitle || a.employer);
  const hasInternships = formData.internshipHistory?.some(i => i.jobTitle || i.employer);
  const hasCourses     = formData.coursesHistory?.some(c => c.course || c.institution);

  // ════════════════════════════════════════════════════════════════════════
  //  MAIN — SCRATCH
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryScratch = () =>
    formData.summary ? (
      <section key="summary">
        <SectionHeader title={formData.summarySectionTitle || "Profile"} />
        <div
          className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: formData.summary }}
        />
      </section>
    ) : null;

  const renderEmploymentScratch = () =>
    hasEmployment ? (
      <section key="employment">
        <SectionHeader title={formData.employmentSectionTitle || "Experience"} />
        <div className="flex flex-col gap-6">
          {formData.employmentHistory.map((job, i) => (
            <div key={i}>
              <h3 className="text-[12px] font-bold text-gray-900">
                {job.job_title}
                <span className="font-normal text-gray-600">
                  {job.employer ? `, ${job.employer}` : ""}
                  {job.city_state ? `, ${job.city_state}` : ""}
                </span>
              </h3>
              {dateRange(job.startDate, job.endDate) && (
                <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                  {dateRange(job.startDate, job.endDate)}
                </div>
              )}
              {job.description && (
                <div
                  className="text-[11px] text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
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
        <SectionHeader title={formData.educationSectionTitle || "Education"} />
        <div className="flex flex-col gap-5">
          {formData.educationHistory.map((edu, i) => (
            <div key={i}>
              <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
                {edu.degree}{edu.school ? `, ${edu.school}` : ""}
              </h3>
              {dateRange(edu.startDate, edu.endDate) && (
                <div className="text-[10px] text-gray-400 font-semibold uppercase mt-1 tracking-wider">
                  {dateRange(edu.startDate, edu.endDate)}
                </div>
              )}
              {edu.description && (
                <div
                  className="text-[11px] text-gray-600 mt-1 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const renderInternshipsScratch = () =>
    hasInternships ? (
      <section key="internships">
        <SectionHeader title={formData.internshipsSectionTitle || "Internships"} />
        <div className="flex flex-col gap-6">
          {formData.internshipHistory.map((job, i) => (
            <div key={i}>
              <h3 className="text-[12px] font-bold text-gray-900">
                {job.jobTitle}
                <span className="font-normal text-gray-600">
                  {job.employer ? `, ${job.employer}` : ""}
                  {job.city ? `, ${job.city}` : ""}
                </span>
              </h3>
              {dateRange(job.startDate, job.endDate) && (
                <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                  {dateRange(job.startDate, job.endDate)}
                </div>
              )}
              {job.description && (
                <div
                  className="text-[11px] text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
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
        <SectionHeader title={formData.activitiesSectionTitle || "Activities"} />
        <div className="flex flex-col gap-5">
          {formData.activityHistory.map((act, i) => (
            <div key={i}>
              <h3 className="text-[12px] font-bold text-gray-900">
                {act.functionTitle}{act.employer ? ` - ${act.employer}` : ""}
              </h3>
              {dateRange(act.startDate, act.endDate) && (
                <div className="text-[10px] text-gray-400 font-semibold uppercase mb-1 tracking-wider">
                  {dateRange(act.startDate, act.endDate)}
                </div>
              )}
              {act.description && (
                <div
                  className="text-[11px] text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
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
        <SectionHeader title={formData.coursesSectionTitle || "Courses"} />
        <div className="flex flex-col gap-5">
          {formData.coursesHistory.map((course, i) => (
            <div key={i}>
              <h3 className="text-[12px] font-bold text-gray-900">
                {course.course}{course.institution ? ` - ${course.institution}` : ""}
              </h3>
              {dateRange(course.startDate, course.endDate) && (
                <div className="text-[10px] text-gray-400 font-semibold uppercase mb-1 tracking-wider">
                  {dateRange(course.startDate, course.endDate)}
                </div>
              )}
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
            <SectionHeader title={title} />
            <div className="flex flex-col gap-2">
              {history.map((item, i) => (
                <div key={i} className="text-[11px] font-bold text-gray-900 uppercase tracking-wide">
                  {item.name}
                  {!hideLevel && item.level !== undefined && (
                    <span className="font-normal text-gray-500 ml-2 text-[10px]">
                      {skillLevels[item.level ?? 2]}
                    </span>
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
            <SectionHeader title={title} />
            <div className="flex flex-col gap-6">
              {history.map((item, i) => (
                <div key={i}>
                  <h3 className="text-[12px] font-bold text-gray-900">
                    {item.title}{item.city ? `, ${item.city}` : ""}
                  </h3>
                  {dateRange(item.startDate, item.endDate) && (
                    <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                      {dateRange(item.startDate, item.endDate)}
                    </div>
                  )}
                  {item.description && (
                    <div
                      className="text-[11px] text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      });

  // ── Sidebar: Scratch ─────────────────────────────────────────────────────

  const renderSkillsScratch = () =>
    hasSkills ? (
      <section key="skills">
        <SectionHeader title={formData.skillSectionTitle || "Skills"} />
        <div className="flex flex-col gap-5 mt-2">
          {formData.newSkillHistory.map((item, i) => {
            const pct = ((item.level ?? 3) + 1) * 20;
            return (
              <div key={i} className="w-full">
                <div className="text-[11px] font-bold text-gray-900 mb-1.5 uppercase tracking-wide">{item.skill}</div>
                {!formData.hideExperienceLevel && (
                  <div className="w-full bg-gray-100 h-1.5">
                    <div className="bg-black h-full" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    ) : null;

  const renderLanguagesScratch = () =>
    hasLanguages ? (
      <section key="languages">
        <SectionHeader title={formData.languagesSectionTitle || "Languages"} />
        <div className="grid grid-cols-2 gap-x-16 gap-y-6 max-w-2xl">
          {formData.languageHistory.map((lang, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-[11px] font-medium text-gray-800">{lang.language}</span>
              {!formData.hideLanguageProficiency && (
                <div className="w-full h-1.5 bg-gray-100">
                  <div className="h-full bg-black" style={{
                    width: { "Native speaker": "100%", "Highly proficient": "85%",
                      "Very good command": "60%", "Good working knowledge": "40%",
                      "Working knowledge": "20%" }[lang.level] ?? "20%"
                  }} />
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
        <SectionHeader title={formData.hobbiesSectionTitle || "Hobbies"} />
        <div className="text-[11px] text-gray-800 leading-relaxed font-medium">
          {formData.hobbies.split("\n").map((h, i) => <span key={i} className="block">{h}</span>)}
        </div>
      </section>
    ) : null;

  // ════════════════════════════════════════════════════════════════════════
  //  MAIN — SECTIONS (improve / jd / linkedin)
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryFromSection = (section) => (
    <section key={section.id}>
      <SectionHeader title={section.title} />
      <div
        className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
    </section>
  );

  const renderExperienceFromSection = (section) => (
    <section key={section.id}>
      <SectionHeader title={section.title} />
      <div className="flex flex-col gap-6">
        {section.experiences?.map((exp, i) => (
          <div key={exp.id || i}>
            <h3 className="text-[12px] font-bold text-gray-900">
              {exp.jobTitle}
              <span className="font-normal text-gray-600">
                {exp.company ? `, ${exp.company}` : ""}{exp.city ? `, ${exp.city}` : ""}
              </span>
            </h3>
            {dateRange(exp.startDate, exp.endDate) && (
              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                {dateRange(exp.startDate, exp.endDate)}
              </div>
            )}
            {exp.description && (
              <div
                className="text-[11px] text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
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
      <SectionHeader title={section.title} />
      <div className="flex flex-col gap-5">
        {section.educations?.map((edu, i) => (
          <div key={edu.id || i}>
            <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
              {edu.degree}{edu.institute ? `, ${edu.institute}` : ""}{edu.city ? `, ${edu.city}` : ""}
            </h3>
            {dateRange(edu.startDate, edu.endDate) && (
              <div className="text-[10px] text-gray-400 font-semibold uppercase mt-1 tracking-wider">
                {dateRange(edu.startDate, edu.endDate)}
              </div>
            )}
            {edu.description && (
              <div
                className="text-[11px] text-gray-600 mt-1 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
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
      <SectionHeader title={section.title} />
      <div className="flex flex-col gap-5">
        {section.certifications?.map((cert, i) => (
          <div key={cert.id || i}>
            <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
              {cert.name}{cert.organization ? `, ${cert.organization}` : ""}
            </h3>
            {(cert.startYear || cert.endYear) && (
              <div className="text-[10px] text-gray-400 font-semibold uppercase mt-1 tracking-wider">
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
      <SectionHeader title={section.title} />
      <div className="flex flex-col gap-5">
        {section.courses?.map((c, i) => (
          <div key={c.id || i}>
            <h3 className="text-[12px] font-bold text-gray-900">
              {c.course}{c.institution ? ` - ${c.institution}` : ""}
            </h3>
            {dateRange(c.startDate, c.endDate) && (
              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-1 tracking-wider">
                {dateRange(c.startDate, c.endDate)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderInternshipsFromSection = (section) => (
    <section key={section.id}>
      <SectionHeader title={section.title} />
      <div className="flex flex-col gap-6">
        {section.internships?.map((intern, i) => (
          <div key={intern.id || i}>
            <h3 className="text-[12px] font-bold text-gray-900">
              {intern.jobTitle}
              <span className="font-normal text-gray-600">
                {intern.employer ? `, ${intern.employer}` : ""}{intern.city ? `, ${intern.city}` : ""}
              </span>
            </h3>
            {dateRange(intern.startDate, intern.endDate) && (
              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                {dateRange(intern.startDate, intern.endDate)}
              </div>
            )}
            {intern.description && (
              <div
                className="text-[11px] text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
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
      <SectionHeader title={section.title} />
      <div className="flex flex-col gap-5">
        {section.activities?.map((a, i) => (
          <div key={a.id || i}>
            <h3 className="text-[12px] font-bold text-gray-900">
              {a.functionTitle}{a.employer ? ` - ${a.employer}` : ""}
            </h3>
            {dateRange(a.startDate, a.endDate) && (
              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-1 tracking-wider">
                {dateRange(a.startDate, a.endDate)}
              </div>
            )}
            {a.description && (
              <div
                className="text-[11px] text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: a.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderCustomSimpleFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <section key={section.id}>
        <SectionHeader title={section.title} />
        <div className="flex flex-col gap-2">
          {section.items?.map((item, i) => {
            const name  = typeof item === "object" ? (item.name || item.title) : item;
            const level = typeof item === "object" ? (item.level ?? 2) : 2;
            return (
              <div key={i} className="text-[11px] font-bold text-gray-900 uppercase tracking-wide">
                {name}{showLevel && <span className="font-normal text-gray-500 ml-2 text-[10px]">{skillLevels[level]}</span>}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const renderCustomAdvancedFromSection = (section) => (
    <section key={section.id}>
      <SectionHeader title={section.title} />
      <div className="flex flex-col gap-6">
        {section.items?.map((item, i) => (
          <div key={item.id || i}>
            <h3 className="text-[12px] font-bold text-gray-900">
              {item.title}{item.city ? `, ${item.city}` : ""}
            </h3>
            {dateRange(item.startDate, item.endDate) && (
              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                {dateRange(item.startDate, item.endDate)}
              </div>
            )}
            {item.description && (
              <div
                className="text-[11px] text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  // ── Sidebar: Sections ─────────────────────────────────────────────────────

  const renderSkillsFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <section key={section.id}>
        <SectionHeader title={section.title} />
        <div className="flex flex-col gap-5 mt-2">
          {section.skills?.map((skill, i) => {
            const pct = ((skill.level ?? 3) + 1) * 20;
            return (
              <div key={skill.id || i} className="w-full">
                <div className="text-[11px] font-bold text-gray-900 mb-1.5 uppercase tracking-wide">{skill.name}</div>
                {showLevel && (
                  <div className="w-full bg-gray-100 h-1.5">
                    <div className="bg-black h-full" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const renderLanguagesFromSection = (section) => (
    <section key={section.id}>
      <SectionHeader title={section.title} />
      <div className="grid grid-cols-2 gap-x-16 gap-y-6 max-w-2xl">
        {section.languages?.map((l, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-gray-800">{l.language}</span>
            {!section.hideProficiency && (
              <div className="w-full h-1.5 bg-gray-100">
                <div className="h-full bg-black" style={{
                  width: { "Native speaker": "100%", "Highly proficient": "85%",
                    "Very good command": "60%", "Good working knowledge": "40%",
                    "Working knowledge": "20%" }[l.level] ?? "20%"
                }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderHobbiesFromSection = (section) =>
    section.hobbies ? (
      <section key={section.id}>
        <SectionHeader title={section.title} />
        <div className="text-[11px] text-gray-800 leading-relaxed font-medium">
          {section.hobbies.split("\n").map((h, i) => <span key={i} className="block">{h}</span>)}
        </div>
      </section>
    ) : null;

  // ════════════════════════════════════════════════════════════════════════
  //  RENDER LOGIC
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
      "summary","employment","education","activities","skills","languages",
      "hobbies","internships","courses","custom",
    ];
    const map = {
      summary:    renderSummaryScratch,
      employment: renderEmploymentScratch,
      education:  renderEducationScratch,
      skills:     renderSkillsScratch,
      languages:  renderLanguagesScratch,
      hobbies:    renderHobbiesScratch,
      activities: renderActivitiesScratch,
      internships:renderInternshipsScratch,
      courses:    renderCoursesScratch,
    };
    return [
      ...order.map(id => {
        if (id.startsWith("custom_simple_")) {
          const h     = formData[`customSimpleHistory_${id}`];
          const title = formData[`customSimpleTitle_${id}`] || "Custom Section";
          const hide  = formData[`customSimpleHideLevel_${id}`] ?? true;
          if (!h?.some(i => i.name)) return null;
          return (
            <section key={id}>
              <SectionHeader title={title} />
              <div className="flex flex-col gap-2">
                {h.map((item, i) => (
                  <div key={i} className="text-[11px] font-bold text-gray-900 uppercase tracking-wide">
                    {item.name}{!hide && item.level !== undefined && (
                      <span className="font-normal text-gray-500 ml-2 text-[10px]">{skillLevels[item.level ?? 2]}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        }
        if (id.startsWith("custom_advanced_")) {
          const h     = formData[`customAdvancedHistory_${id}`];
          const title = formData[`customAdvancedTitle_${id}`] || "Custom Section";
          if (!h?.some(i => i.title || i.city)) return null;
          return (
            <section key={id}>
              <SectionHeader title={title} />
              <div className="flex flex-col gap-6">
                {h.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-[12px] font-bold text-gray-900">{item.title}{item.city ? `, ${item.city}` : ""}</h3>
                    {dateRange(item.startDate, item.endDate) && (
                      <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                        {dateRange(item.startDate, item.endDate)}
                      </div>
                    )}
                    {item.description && (
                      <div className="text-[11px] text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                        dangerouslySetInnerHTML={{ __html: item.description }} />
                    )}
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

  // ════════════════════════════════════════════════════════════════════════
  //  JSX
  // ════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-[297mm] bg-white text-gray-800 font-sans shadow-2xl flex flex-col">
      {/* Yellow Header */}
      <div className="bg-[#ffeb3b] p-12 pb-14 flex justify-between items-start">
        <div className="w-[55%]">
          <h1 className="text-[42px] font-bold text-gray-900 leading-none mb-2 tracking-tight">
            {formData.first_name}<br />{formData.last_name}
          </h1>
        </div>
        <div className="w-[45%] text-left flex flex-col gap-1 text-[11px] text-gray-900 leading-snug">
          <p className="font-bold uppercase tracking-wide text-xs mb-1">{formData.job_target}</p>
          {(formData.address || formData.city_state || formData.country) && (
            <p>
              {formData.address}{formData.address && (formData.city_state || formData.country) ? ", " : ""}
              {formData.city_state}{formData.city_state && formData.country ? ", " : ""}
              {formData.country}{formData.postal_code ? ` ${formData.postal_code}` : ""}
            </p>
          )}
          {formData.email && <a href={`mailto:${formData.email}`} className="hover:underline font-medium">{formData.email}</a>}
          {formData.phone && <p className="font-medium">{formData.phone}</p>}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-12 py-10 flex flex-col gap-8">
        {/* Extra details */}
        {(formData.driving_licence || formData.nationality || formData.dob || formData.birth_place) && (
          <section>
            <SectionHeader title="Details" />
            <div className="grid grid-cols-2 gap-y-4 gap-x-10 max-w-lg">
              {formData.driving_licence && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase">Driving License</h4>
                  <p className="text-[11px] text-gray-600">{formData.driving_licence}</p>
                </div>
              )}
              {formData.nationality && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase">Nationality</h4>
                  <p className="text-[11px] text-gray-600">{formData.nationality}</p>
                </div>
              )}
              {(formData.dob || formData.birth_place) && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase">Date / Place of Birth</h4>
                  <p className="text-[11px] text-gray-600">{formData.dob}{formData.dob && formData.birth_place ? ", " : ""}{formData.birth_place}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {renderAllSections()}

        {/* Links */}
        {(formData.linkedin || formData.github) && (
          <section>
            <SectionHeader title="Links" />
            <div className="flex flex-col gap-1 text-[11px]">
              {formData.linkedin && <a href={formData.linkedin} className="text-gray-700 underline decoration-gray-400 underline-offset-2 hover:text-black">LinkedIn</a>}
              {formData.github   && <a href={formData.github}   className="text-gray-700 underline decoration-gray-400 underline-offset-2 hover:text-black">GitHub</a>}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default VividTemplate;

// "use client";
// import React from "react";

// const VividTemplate = ({ formData, sectionOrder }) => {
//   // --- Helpers ---
//   const formatDate = (dateValue) => {
//     if (!dateValue) return "";
//     const d = new Date(dateValue);
//     return d
//       .toLocaleString("en-US", { month: "short", year: "numeric" })
//       .toUpperCase();
//   };

//   const getYear = (dateValue) => {
//     if (!dateValue) return "";
//     const d = new Date(dateValue);
//     return d.getFullYear();
//   };

//   // --- Data Existence Checks ---
//   // We calculate these once to keep the JSX clean
//   const hasDetails =
//     formData.driving_licence ||
//     formData.nationality ||
//     formData.dob ||
//     formData.birth_place;
//   const hasEducation = formData.educationHistory?.some(
//     (edu) => edu.school || edu.degree,
//   );
//   const hasEmployment = formData.employmentHistory?.some(
//     (job) => job.job_title || job.employer,
//   );
//   const hasActivities = formData.activityHistory?.some(
//     (act) => act.functionTitle || act.employer,
//   );
//   const hasSkills = formData.newSkillHistory?.some((s) => s.skill);
//   const hasLanguages = formData.languageHistory?.some((l) => l.language);
//   const hasLinks = formData.linkedin || formData.github;
//   const hasInternships = formData.internshipHistory?.some(
//     (i) => i.jobTitle || i.employer,
//   );
//   const hasCourses = formData.coursesHistory?.some(
//     (c) => c.course || c.institution,
//   );

//   const hideLevel = formData.hideExperienceLevel;

//   // --- Sub-components ---
//   const SectionHeader = ({ title }) => (
//     <div className="bg-black text-white inline-block px-3 py-1 text-[11px] font-bold tracking-widest uppercase mb-5">
//       {title}
//     </div>
//   );

//   // --- RENDER FUNCTIONS ---
//   const renderSummary = () =>
//     formData.summary && (
//       <section key="summary">
//         <SectionHeader title="Profile" />
//         {/* <p className="text-[11px] leading-relaxed text-gray-700 text-justify whitespace-pre-wrap">
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
//         <SectionHeader title="Education" />
//         <div className="flex flex-col gap-5">
//           {formData.educationHistory.map((edu, idx) => (
//             <div key={idx}>
//               <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
//                 {edu.degree}
//                 {edu.school ? `, ${edu.school}` : ""}
//               </h3>
//               {edu.description && (
//                 <p className="text-[11px] text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">
//                   {edu.description}
//                 </p>
//               )}
//               <div className="text-[10px] text-gray-400 font-semibold uppercase mt-1 tracking-wider">
//                 {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderEmployment = () =>
//     hasEmployment && (
//       <section key="employment">
//         <SectionHeader title="Experience" />
//         <div className="flex flex-col gap-6">
//           {formData.employmentHistory.map((job, idx) => (
//             <div key={idx}>
//               <h3 className="text-[12px] font-bold text-gray-900">
//                 {job.job_title}
//                 <span className="font-normal text-gray-600">
//                   {job.employer ? `, ${job.employer}` : ""}
//                   {job.city_state ? `, ${job.city_state}` : ""}
//                 </span>
//               </h3>

//               <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
//                 {formatDate(job.startDate)} — {formatDate(job.endDate)}
//               </div>

//               {job.description && (
//                 <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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
//         <SectionHeader title="Internships" />
//         <div className="flex flex-col gap-6">
//           {formData.internshipHistory.map((job, idx) => (
//             <div key={idx}>
//               <h3 className="text-[12px] font-bold text-gray-900">
//                 {job.jobTitle}
//                 <span className="font-normal text-gray-600">
//                   {job.employer ? `, ${job.employer}` : ""}
//                   {job.city ? `, ${job.city}` : ""}
//                 </span>
//               </h3>

//               <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
//                 {formatDate(job.startDate)} — {formatDate(job.endDate)}
//               </div>

//               {job.description && (
//                 <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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
//         <SectionHeader title="Activities" />
//         <div className="flex flex-col gap-5">
//           {formData.activityHistory.map((act, idx) => (
//             <div key={idx}>
//               <div className="flex justify-between items-baseline mb-1">
//                 <h3 className="text-[12px] font-bold text-gray-900">
//                   {act.functionTitle} {act.employer ? `- ${act.employer}` : ""}
//                 </h3>
//               </div>
//               <div className="text-[10px] text-gray-400 font-semibold uppercase mb-1 tracking-wider">
//                 {getYear(act.startDate)} — {getYear(act.endDate)}
//               </div>
//               {act.description && (
//                 <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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
//         <SectionHeader title="Courses" />
//         <div className="flex flex-col gap-5">
//           {formData.coursesHistory.map((course, idx) => (
//             <div key={idx}>
//               <h3 className="text-[12px] font-bold text-gray-900">
//                 {course.course}{" "}
//                 {course.institution ? `- ${course.institution}` : ""}
//               </h3>
//               <div className="text-[10px] text-gray-400 font-semibold uppercase mb-1 tracking-wider">
//                 {formatDate(course.startDate)} — {formatDate(course.endDate)}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderSkills = () =>
//     hasSkills && (
//       <section key="skills">
//         <SectionHeader title="Skills" />
//         <div className="flex flex-col gap-5 mt-2">
//           {formData.newSkillHistory.map((item, index) => {
//             const percentage = ((item.level ?? 3) + 1) * 120;

//             return (
//               <div key={index} className="w-full">
//                 <div className="text-[11px] font-bold text-gray-900 mb-1.5 uppercase tracking-wide">
//                   {item.skill || ""}
//                 </div>
//                 {!formData.hideExperienceLevel && (
//                   <div className="w-full bg-gray-100 h-1.5">
//                     <div
//                       className="bg-black h-full transition-all duration-500"
//                       style={{ width: percentage }}
//                     />
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     );

//   const renderLanguages = () =>
//     hasLanguages && (
//       <section key="languages">
//         <SectionHeader title="Languages" />
//         <div className="grid grid-cols-2 gap-x-16 gap-y-6 max-w-2xl">
//           {formData.languageHistory.map((lang, idx) => (
//             <div key={idx} className="flex flex-col gap-1">
//               <div className="flex justify-between items-end">
//                 <span className="text-[11px] font-medium text-gray-800">
//                   {lang.language}
//                 </span>
//               </div>
//               <div className="w-full h-1.5 bg-gray-100">
//                 <div
//                   className="h-full bg-black"
//                   style={{
//                     width:
//                       lang.level === "Native"
//                         ? "100%"
//                         : lang.level === "Fluent"
//                           ? "85%"
//                           : lang.level === "Intermediate"
//                             ? "50%"
//                             : "25%",
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     );

//   const renderHobbies = () =>
//     formData.hobbies && (
//       <section key="hobbies">
//         <SectionHeader title="Hobbies" />
//         <div className="text-[11px] text-gray-800 leading-relaxed font-medium">
//           <div className="flex flex-col gap-2">
//             {formData.hobbies.split("\n").map((hobby, i) => (
//               <span key={i} className="block">
//                 {hobby}
//               </span>
//             ))}
//           </div>
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
//               <SectionHeader title={title} />
//               <div className="flex flex-col gap-6">
//                 {history.map((item, idx) => (
//                   <div key={idx}>
//                     <h3 className="text-[12px] font-bold text-gray-900">
//                       {item.activity}
//                       <span className="font-normal text-gray-600">
//                         {item.city ? `, ${item.city}` : ""}
//                       </span>
//                     </h3>

//                     <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
//                       {formatDate(item.startDate)} — {formatDate(item.endDate)}
//                     </div>

//                     {item.description && (
//                       <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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
//           <SectionHeader
//             title={formData.customSectionTitle || "Custom Section"}
//           />
//           <div className="flex flex-col gap-6">
//             {formData.customSectionHistory.map((item, idx) => (
//               <div key={idx}>
//                 <h3 className="text-[12px] font-bold text-gray-900">
//                   {item.activity}
//                   <span className="font-normal text-gray-600">
//                     {item.city ? `, ${item.city}` : ""}
//                   </span>
//                 </h3>

//                 <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
//                   {formatDate(item.startDate)} — {formatDate(item.endDate)}
//                 </div>

//                 {item.description && (
//                   <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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

//   const sectionRenderers = {
//     summary: renderSummary,
//     employment: renderEmployment,
//     education: renderEducation,
//     skills: renderSkills,
//     courses: renderCourses,
//     hobbies: renderHobbies,
//     activities: renderActivities,
//     languages: renderLanguages,
//     internships: renderInternships,
//     custom: renderCustom,
//   };

//   const order = sectionOrder || [
//     "summary",
//     "employment",
//     "education",
//     "activities",
//     "skills",
//     "languages",
//     "hobbies",
//     "internships",
//     "courses",
//     "custom",
//   ];

//   return (
//     <div className="min-h-[297mm] bg-white text-gray-800 font-sans shadow-2xl flex flex-col">
//       {/* ----------------- YELLOW HEADER ----------------- */}
//       <div className="bg-[#ffeb3b] p-12 pb-14 flex justify-between items-start">
//         <div className="w-[55%]">
//           <h1 className="text-[42px] font-bold text-gray-900 leading-none mb-2 tracking-tight">
//             {formData.first_name}
//             <br />
//             {formData.last_name}
//           </h1>
//         </div>

//         <div className="w-[45%] text-left flex flex-col gap-1 text-[11px] text-gray-900 leading-snug">
//           <p className="font-bold uppercase tracking-wide text-xs mb-1">
//             {formData.job_target}
//           </p>
//           {(formData.address || formData.city_state || formData.country) && (
//             <p>
//               {formData.address}
//               {formData.address && (formData.city_state || formData.country)
//                 ? ", "
//                 : ""}
//               {formData.city_state}
//               {formData.city_state && formData.country ? ", " : ""}
//               {formData.country}
//               {formData.postal_code ? ` ${formData.postal_code}` : ""}
//             </p>
//           )}
//           {formData.email && (
//             <a
//               href={`mailto:${formData.email}`}
//               className="hover:underline font-medium"
//             >
//               {formData.email}
//             </a>
//           )}
//           {formData.phone && <p className="font-medium">{formData.phone}</p>}
//         </div>
//       </div>

//       {/* ----------------- MAIN CONTENT ----------------- */}
//       <div className="px-12 py-10 flex flex-col gap-8">
//         {/* --- DETAILS SECTION --- */}
//         {hasDetails && (
//           <section>
//             <SectionHeader title="Details" />
//             <div className="grid grid-cols-2 gap-y-4 gap-x-10 max-w-lg">
//               {formData.driving_licence && (
//                 <div>
//                   <h4 className="text-[10px] font-bold text-gray-900 uppercase">
//                     Driving License
//                   </h4>
//                   <p className="text-[11px] text-gray-600">
//                     {formData.driving_licence}
//                   </p>
//                 </div>
//               )}
//               {formData.nationality && (
//                 <div>
//                   <h4 className="text-[10px] font-bold text-gray-900 uppercase">
//                     Nationality
//                   </h4>
//                   <p className="text-[11px] text-gray-600">
//                     {formData.nationality}
//                   </p>
//                 </div>
//               )}
//               {(formData.dob || formData.birth_place) && (
//                 <div>
//                   <h4 className="text-[10px] font-bold text-gray-900 uppercase">
//                     Date / Place of Birth
//                   </h4>
//                   <p className="text-[11px] text-gray-600">
//                     {formData.dob}
//                     {formData.dob && formData.birth_place ? ", " : ""}
//                     {formData.birth_place}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </section>
//         )}

//         {/* DYNAMIC SECTIONS */}
//         {order.map((sectionId) => {
//           if (sectionRenderers[sectionId]) {
//             return sectionRenderers[sectionId]();
//           }
//           return null;
//         })}

//         {/* --- LINKS SECTION --- */}
//         {hasLinks && (
//           <section>
//             <SectionHeader title="Links" />
//             <div className="flex flex-col gap-1 text-[11px]">
//               {formData.linkedin && (
//                 <a
//                   href={formData.linkedin}
//                   className="text-gray-700 underline decoration-gray-400 underline-offset-2 hover:text-black"
//                 >
//                   LinkedIn
//                 </a>
//               )}
//               {formData.github && (
//                 <a
//                   href={formData.github}
//                   className="text-gray-700 underline decoration-gray-400 underline-offset-2 hover:text-black"
//                 >
//                   GitHub
//                 </a>
//               )}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VividTemplate;
