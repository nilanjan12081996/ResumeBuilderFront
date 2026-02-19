'use client';
import React from 'react';

const Professional = ({ formData, sections, sectionOrder, themeColor, resumeSettings }) => {
  const { text, layout } = resumeSettings;

  // ── Helpers ──────────────────────────────────────────────────────────────
  const formatDate = (dateValue) => {
    if (!dateValue) return null;
    if (typeof dateValue === 'string' && dateValue.toLowerCase() === 'present') return 'Present';
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
  };

  const dateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end   = formatDate(endDate);
    if (start && end) return `${start} — ${end}`;
    return start || end || '';
  };

  const skillLevels = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];

  const hasContactInfo =
    formData.email || formData.phone || formData.address ||
    formData.city_state || formData.postal_code ||
    formData.driving_licence || formData.nationality || formData.country;

  // ── Shared heading styles ─────────────────────────────────────────────────
  const mainHeadingStyle = {
    fontSize: `${text.sectionTitle}pt`,
    fontWeight: text.sectionTitleWeight,
    fontFamily: text.secondaryFont,
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '4px',
    marginBottom: `${layout.betweenTitlesContent}pt`,
    marginTop: `${layout.betweenSections}pt`,
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const sideHeadingStyle = {
    fontSize: `${text.sectionTitle}pt`,
    fontWeight: text.sectionTitleWeight,
    fontFamily: text.secondaryFont,
    marginBottom: '8px',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const bodyStyle = { fontSize: `${text.body}pt`, fontWeight: text.bodyWeight };

  // ════════════════════════════════════════════════════════════════════════
  //  SIDEBAR RENDERERS
  // ════════════════════════════════════════════════════════════════════════

  // ── Sidebar: Scratch ────────────────────────────────────────────────────
  const renderSkillsScratch = () => {
    const hasSkills = formData.newSkillHistory?.some(s => s.skill);
    if (!hasSkills) return null;
    const hideLevel = formData.hideExperienceLevel;
    return (
      <div key="skills" className="w-full text-start">
        <h3 style={sideHeadingStyle}>
          {formData.skillSectionTitle || 'Skills'}
        </h3>
        <div className="flex flex-col gap-3">
          {formData.newSkillHistory.map((item, i) => {
            const pct = ((item.level ?? 3) + 1) * 20;
            return (
              <div key={i} className="w-full">
                <div className="text-xs text-white mb-1.5" style={bodyStyle}>{item.skill}</div>
                {!hideLevel && (
                  <div className="w-full bg-white/20 h-[2px] rounded-full overflow-hidden">
                    <div className="bg-white h-full" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderHobbiesScratch = () =>
    formData.hobbies ? (
      <div key="hobbies" className="w-full text-start">
        <h3 style={sideHeadingStyle}>{formData.hobbiesSectionTitle || 'Hobbies'}</h3>
        <p className="text-xs text-gray-300 font-light whitespace-pre-wrap leading-relaxed" style={bodyStyle}>
          {formData.hobbies}
        </p>
      </div>
    ) : null;

  const renderLanguagesScratch = () => {
    if (!formData.languageHistory?.some(l => l.language)) return null;
    const profMap = {
      'Native speaker': 100, 'Highly proficient': 80,
      'Very good command': 60, 'Good working knowledge': 40, 'Working knowledge': 20,
    };
    return (
      <div key="languages" className="w-full text-start">
        <h3 style={sideHeadingStyle}>{formData.languagesSectionTitle || 'Languages'}</h3>
        <div className="flex flex-col gap-3">
          {formData.languageHistory.map((item, i) => (
            <div key={i} className="w-full">
              <div className="text-xs text-white mb-1.5" style={bodyStyle}>
                {item.language}
                {!formData.hideLanguageProficiency && item.level ? ` (${item.level})` : ''}
              </div>
              {!formData.hideLanguageProficiency && (
                <div className="w-full bg-white/20 h-[2px] rounded-full overflow-hidden">
                  <div className="bg-white h-full" style={{ width: `${profMap[item.level] ?? 20}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Sidebar: Sections (improve/jd/linkedin) ─────────────────────────────
  const renderSkillsFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <div key={section.id} className="w-full text-start">
        <h3 style={sideHeadingStyle}>{section.title}</h3>
        <div className="flex flex-col gap-3">
          {section.skills?.map((skill, i) => {
            const pct = ((skill.level ?? 3) + 1) * 20;
            return (
              <div key={skill.id || i} className="w-full">
                <div className="text-xs text-white mb-1.5" style={bodyStyle}>{skill.name}</div>
                {showLevel && (
                  <div className="w-full bg-white/20 h-[2px] rounded-full overflow-hidden">
                    <div className="bg-white h-full" style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderLanguagesFromSection = (section) => {
    if (!section.languages?.length) return null;
    const profMap = {
      'Native speaker': 100, 'Highly proficient': 80,
      'Very good command': 60, 'Good working knowledge': 40, 'Working knowledge': 20,
    };
    return (
      <div key={section.id} className="w-full text-start">
        <h3 style={sideHeadingStyle}>{section.title}</h3>
        <div className="flex flex-col gap-3">
          {section.languages.map((l, i) => (
            <div key={i} className="w-full">
              <div className="text-xs text-white mb-1.5" style={bodyStyle}>
                {l.language}
                {!section.hideProficiency && l.level ? ` (${l.level})` : ''}
              </div>
              {!section.hideProficiency && (
                <div className="w-full bg-white/20 h-[2px] rounded-full overflow-hidden">
                  <div className="bg-white h-full" style={{ width: `${profMap[l.level] ?? 20}%` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════════════════════
  //  MAIN CONTENT RENDERERS — SCRATCH
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryScratch = () =>
    formData.summary ? (
      <section key="summary">
        <h2 style={mainHeadingStyle}>{formData.summarySectionTitle || 'Profile'}</h2>
        <div
          className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
          style={bodyStyle}
          dangerouslySetInnerHTML={{ __html: formData.summary }}
        />
      </section>
    ) : null;

  const renderEmploymentScratch = () => {
    const hasEmp = formData.employmentHistory?.some(j => j.job_title || j.employer);
    if (!hasEmp) return null;
    return (
      <section key="employment">
        <h2 style={mainHeadingStyle}>{formData.employmentSectionTitle || 'Employment History'}</h2>
        <div className="flex flex-col gap-4">
          {formData.employmentHistory.map((job, i) => (
            <div key={i}>
              <h3 className="font-bold text-black" style={bodyStyle}>
                {job.job_title}{job.employer ? `, ${job.employer}` : ''}{job.city_state ? `, ${job.city_state}` : ''}
              </h3>
              {dateRange(job.startDate, job.endDate) && (
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                  {dateRange(job.startDate, job.endDate)}
                </div>
              )}
              {job.description && (
                <div
                  className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic"
                  style={bodyStyle}
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderEducationScratch = () => {
    const hasEdu = formData.educationHistory?.some(e => e.school || e.degree);
    if (!hasEdu) return null;
    return (
      <section key="education">
        <h2 style={mainHeadingStyle}>{formData.educationSectionTitle || 'Education'}</h2>
        <div className="flex flex-col gap-4">
          {formData.educationHistory.map((edu, i) => (
            <div key={i}>
              <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
                {edu.degree}{edu.school ? `, ${edu.school}` : ''}{edu.city_state ? `, ${edu.city_state}` : ''}
              </h3>
              {dateRange(edu.startDate, edu.endDate) && (
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                  {dateRange(edu.startDate, edu.endDate)}
                </div>
              )}
              {edu.description && (
                <div
                  className="text-gray-700 mt-1 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
                  style={bodyStyle}
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderCoursesScratch = () => {
    if (!formData.coursesHistory?.some(c => c.course || c.institution)) return null;
    return (
      <section key="courses">
        <h2 style={mainHeadingStyle}>{formData.coursesSectionTitle || 'Courses'}</h2>
        <div className="flex flex-col gap-4">
          {formData.coursesHistory.map((course, i) => (
            <div key={i}>
              <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
                {course.course}{course.institution ? `, ${course.institution}` : ''}
              </h3>
              {dateRange(course.startDate, course.endDate) && (
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                  {dateRange(course.startDate, course.endDate)}
                </div>
              )}
              {course.description && (
                <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1" style={bodyStyle}>
                  {course.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderActivitiesScratch = () => {
    if (!formData.activityHistory?.some(a => a.functionTitle || a.employer)) return null;
    return (
      <section key="activities">
        <h2 style={mainHeadingStyle}>{formData.activitiesSectionTitle || 'Extra-curricular Activities'}</h2>
        <div className="flex flex-col gap-4">
          {formData.activityHistory.map((a, i) => (
            <div key={i}>
              <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
                {a.functionTitle}{a.employer ? `, ${a.employer}` : ''}{a.city ? `, ${a.city}` : ''}
              </h3>
              {dateRange(a.startDate, a.endDate) && (
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                  {dateRange(a.startDate, a.endDate)}
                </div>
              )}
              {a.description && (
                <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1" style={bodyStyle}>{a.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderInternshipsScratch = () => {
    if (!formData.internshipHistory?.some(i => i.jobTitle || i.employer)) return null;
    return (
      <section key="internships">
        <h2 style={mainHeadingStyle}>{formData.internshipsSectionTitle || 'Internships'}</h2>
        <div className="flex flex-col gap-4">
          {formData.internshipHistory.map((intern, i) => (
            <div key={i}>
              <h3 className="font-bold text-black" style={bodyStyle}>
                {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ''}{intern.city ? `, ${intern.city}` : ''}
              </h3>
              {dateRange(intern.startDate, intern.endDate) && (
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                  {dateRange(intern.startDate, intern.endDate)}
                </div>
              )}
              {intern.description && (
                <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed" style={bodyStyle}>
                  {intern.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderScratchSimpleCustomSections = () =>
    Object.keys(formData)
      .filter(key => key.startsWith('customSimpleHistory_custom_simple_'))
      .map(key => {
        const sectionId  = key.replace('customSimpleHistory_', '');
        const history    = formData[key];
        const title      = formData[`customSimpleTitle_${sectionId}`] || 'Custom Section';
        const hideLevel  = formData[`customSimpleHideLevel_${sectionId}`] ?? true;
        if (!history?.some(i => i.name)) return null;
        return (
          <section key={sectionId}>
            <h2 style={mainHeadingStyle}>{title}</h2>
            <div className="grid grid-cols-2 gap-x-8 mt-2" style={bodyStyle}>
              {history.map((item, idx) => (
                <div key={idx} className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-800">{item.name}</span>
                  {!hideLevel && (
                    <span className="text-gray-400 text-[10px] uppercase">{skillLevels[item.level ?? 2]}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      });

  const renderScratchAdvancedCustomSections = () =>
    Object.keys(formData)
      .filter(key => key.startsWith('customAdvancedHistory_custom_advanced_'))
      .map(key => {
        const sectionId = key.replace('customAdvancedHistory_', '');
        const history   = formData[key];
        const title     = formData[`customAdvancedTitle_${sectionId}`] || 'Custom Section';
        if (!history?.some(i => i.title || i.city)) return null;
        return (
          <section key={sectionId}>
            <h2 style={mainHeadingStyle}>{title}</h2>
            <div className="flex flex-col gap-4" style={bodyStyle}>
              {history.map((item, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-black">
                    {item.title}{item.city ? `, ${item.city}` : ''}
                  </h3>
                  {dateRange(item.startDate, item.endDate) && (
                    <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                      {dateRange(item.startDate, item.endDate)}
                    </div>
                  )}
                  {item.description && (
                    <div
                      className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
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
  //  MAIN CONTENT RENDERERS — SECTIONS (improve / jd / linkedin)
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryFromSection = (section) => (
    <section key={section.id}>
      <h2 style={mainHeadingStyle}>{section.title}</h2>
      <div
        className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
        style={bodyStyle}
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
    </section>
  );

  const renderExperienceFromSection = (section) => (
    <section key={section.id}>
      <h2 style={mainHeadingStyle}>{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.experiences?.map((exp, i) => (
          <div key={exp.id || i}>
            <h3 className="font-bold text-black" style={bodyStyle}>
              {exp.jobTitle}{exp.company ? `, ${exp.company}` : ''}{exp.city ? `, ${exp.city}` : ''}
            </h3>
            {dateRange(exp.startDate, exp.endDate) && (
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                {dateRange(exp.startDate, exp.endDate)}
              </div>
            )}
            {exp.description && (
              <div
                className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic"
                style={bodyStyle}
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
      <h2 style={mainHeadingStyle}>{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.educations?.map((edu, i) => (
          <div key={edu.id || i}>
            <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
              {edu.degree}{edu.institute ? `, ${edu.institute}` : ''}{edu.city ? `, ${edu.city}` : ''}
            </h3>
            {dateRange(edu.startDate, edu.endDate) && (
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                {dateRange(edu.startDate, edu.endDate)}
              </div>
            )}
            {edu.description && (
              <div
                className="text-gray-700 mt-1 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
                style={bodyStyle}
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
      <h2 style={mainHeadingStyle}>{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.certifications?.map((cert, i) => (
          <div key={cert.id || i}>
            <h3 className="font-bold text-black" style={bodyStyle}>
              {cert.name}{cert.organization ? `, ${cert.organization}` : ''}
            </h3>
            {(cert.startYear || cert.endYear) && (
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                {cert.startYear && cert.endYear
                  ? `${cert.startYear} — ${cert.endYear}`
                  : cert.startYear || cert.endYear}
              </div>
            )}
            {cert.description && (
              <p className="text-gray-700 mt-1" style={bodyStyle}>{cert.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderCoursesFromSection = (section) => (
    <section key={section.id}>
      <h2 style={mainHeadingStyle}>{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.courses?.map((course, i) => (
          <div key={course.id || i}>
            <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
              {course.course}{course.institution ? `, ${course.institution}` : ''}
            </h3>
            {dateRange(course.startDate, course.endDate) && (
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                {dateRange(course.startDate, course.endDate)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderInternshipsFromSection = (section) => (
    <section key={section.id}>
      <h2 style={mainHeadingStyle}>{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.internships?.map((intern, i) => (
          <div key={intern.id || i}>
            <h3 className="font-bold text-black" style={bodyStyle}>
              {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ''}{intern.city ? `, ${intern.city}` : ''}
            </h3>
            {dateRange(intern.startDate, intern.endDate) && (
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                {dateRange(intern.startDate, intern.endDate)}
              </div>
            )}
            {intern.description && (
              <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed" style={bodyStyle}>
                {intern.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderActivitiesFromSection = (section) => (
    <section key={section.id}>
      <h2 style={mainHeadingStyle}>{section.title}</h2>
      <div className="flex flex-col gap-4">
        {section.activities?.map((a, i) => (
          <div key={a.id || i}>
            <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
              {a.functionTitle}{a.employer ? `, ${a.employer}` : ''}{a.city ? `, ${a.city}` : ''}
            </h3>
            {dateRange(a.startDate, a.endDate) && (
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                {dateRange(a.startDate, a.endDate)}
              </div>
            )}
            {a.description && (
              <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1" style={bodyStyle}>{a.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderHobbiesFromSection = (section) =>
    section.hobbies ? (
      <section key={section.id}>
        <h2 style={mainHeadingStyle}>{section.title}</h2>
        <p className="text-gray-700" style={bodyStyle}>{section.hobbies}</p>
      </section>
    ) : null;

  const renderCustomSimpleFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <section key={section.id}>
        <h2 style={mainHeadingStyle}>{section.title}</h2>
        <div className="grid grid-cols-2 gap-x-8 mt-2" style={bodyStyle}>
          {section.items?.map((item, i) => {
            const name  = typeof item === 'object' ? (item.name || item.title) : item;
            const level = typeof item === 'object' ? (item.level ?? 2) : 2;
            return (
              <div key={i} className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-800">{name}</span>
                {showLevel && (
                  <span className="text-gray-400 text-[10px] uppercase">{skillLevels[level]}</span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const renderCustomAdvancedFromSection = (section) => (
    <section key={section.id}>
      <h2 style={mainHeadingStyle}>{section.title}</h2>
      <div className="flex flex-col gap-4" style={bodyStyle}>
        {section.items?.map((item, i) => (
          <div key={item.id || i}>
            <h3 className="font-bold text-black">
              {item.title}{item.city ? `, ${item.city}` : ''}
            </h3>
            {dateRange(item.startDate, item.endDate) && (
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                {dateRange(item.startDate, item.endDate)}
              </div>
            )}
            {item.description && (
              <div
                className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  // ════════════════════════════════════════════════════════════════════════
  //  SIDEBAR / MAIN SPLIT LOGIC
  //  sidebar types: skills, hobbies, languages
  //  main types: everything else
  // ════════════════════════════════════════════════════════════════════════

  const SIDEBAR_TYPES = new Set(['skills', 'hobbies', 'languages']);

  const renderSidebarContent = () => {
    // ── sections mode ──
    if (sections && sections.length > 0) {
      return sections
        .filter(s => SIDEBAR_TYPES.has(s.type))
        .map(section => {
          switch (section.type) {
            case 'skills':    return renderSkillsFromSection(section);
            case 'hobbies':   return renderHobbiesFromSection(section);
            case 'languages': return renderLanguagesFromSection(section);
            default:          return null;
          }
        });
    }

    // ── scratch mode ──
    const order = sectionOrder || [
      'summary','employment','education','skills',
      'courses','hobbies','activities','languages','internships',
    ];
    const sidebarRenderers = {
      skills:    renderSkillsScratch,
      hobbies:   renderHobbiesScratch,
      languages: renderLanguagesScratch,
    };
    return order.map(id => sidebarRenderers[id]?.() ?? null);
  };

  const renderMainContent = () => {
    // ── sections mode ──
    if (sections && sections.length > 0) {
      return sections
        .filter(s => !SIDEBAR_TYPES.has(s.type))
        .map(section => {
          switch (section.type) {
            case 'summary':        return renderSummaryFromSection(section);
            case 'experience':     return renderExperienceFromSection(section);
            case 'education':      return renderEducationFromSection(section);
            case 'certifications': return renderCertificationsFromSection(section);
            case 'courses':        return renderCoursesFromSection(section);
            case 'internships':    return renderInternshipsFromSection(section);
            case 'activities':     return renderActivitiesFromSection(section);
            case 'hobbies':        return renderHobbiesFromSection(section); // fallback if not in sidebar
            case 'custom_simple':  return renderCustomSimpleFromSection(section);
            case 'custom':         return renderCustomAdvancedFromSection(section);
            default:               return null;
          }
        });
    }

    // ── scratch mode ──
    const order = sectionOrder || [
      'summary','employment','education','skills',
      'courses','hobbies','activities','languages','internships',
    ];

    const mainRenderers = {
      summary:    renderSummaryScratch,
      employment: renderEmploymentScratch,
      education:  renderEducationScratch,
      courses:    renderCoursesScratch,
      activities: renderActivitiesScratch,
      internships:renderInternshipsScratch,
    };

    return [
      ...order
        .filter(id => !SIDEBAR_TYPES.has(id))
        .map(id => {
          if (typeof id === 'string' && id.startsWith('custom_simple_')) {
            const history   = formData[`customSimpleHistory_${id}`];
            const title     = formData[`customSimpleTitle_${id}`] || 'Custom Section';
            const hideLevel = formData[`customSimpleHideLevel_${id}`] ?? true;
            if (!history?.some(i => i.name)) return null;
            return (
              <section key={id}>
                <h2 style={mainHeadingStyle}>{title}</h2>
                <div className="grid grid-cols-2 gap-x-8 mt-2" style={bodyStyle}>
                  {history.map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-gray-100 pb-1">
                      <span className="text-gray-800">{item.name}</span>
                      {!hideLevel && <span className="text-gray-400 text-[10px] uppercase">{skillLevels[item.level ?? 2]}</span>}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (typeof id === 'string' && id.startsWith('custom_advanced_')) {
            const history = formData[`customAdvancedHistory_${id}`];
            const title   = formData[`customAdvancedTitle_${id}`] || 'Custom Section';
            if (!history?.some(i => i.title || i.city)) return null;
            return (
              <section key={id}>
                <h2 style={mainHeadingStyle}>{title}</h2>
                <div className="flex flex-col gap-4" style={bodyStyle}>
                  {history.map((item, idx) => (
                    <div key={idx}>
                      <h3 className="font-bold text-black">{item.title}{item.city ? `, ${item.city}` : ''}</h3>
                      {dateRange(item.startDate, item.endDate) && (
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                          {dateRange(item.startDate, item.endDate)}
                        </div>
                      )}
                      {item.description && (
                        <div
                          className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return mainRenderers[id]?.() ?? null;
        }),
      ...renderScratchSimpleCustomSections(),
      ...renderScratchAdvancedCustomSections(),
    ];
  };

  // ════════════════════════════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════════════════════════════
  return (
    <div className="h-screen overflow-y-auto hide-scrollbar">
      <div
        className="min-h-[297mm] bg-white shadow-xl flex resume-root"
        style={{
          fontFamily: text.primaryFont,
          lineHeight: text.lineHeight,
          fontSize: text.fontSize,
        }}
      >
        {/* ── LEFT SIDEBAR ── */}
        <div
          className="w-[35%] text-white p-8 flex flex-col gap-6 items-center text-center"
          style={{ backgroundColor: themeColor }}
        >
          {/* Profile Image */}
          {formData.profileImage && (
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Name + Title */}
          <div className="w-full flex flex-col items-center">
            <h1
              className="font-bold leading-tight break-words"
              style={{
                fontFamily: text.secondaryFont,
                fontSize: `${text.primaryHeading}pt`,
                fontWeight: text.primaryHeadingWeight,
              }}
            >
              {formData.first_name} <br /> {formData.last_name}
            </h1>
            <div className="w-8 h-[1px] bg-white/40 my-3" />
            {formData.job_target && (
              <p
                className="uppercase tracking-widest text-white/80"
                style={{ fontSize: `${text.secondaryHeading}pt`, fontWeight: text.secondaryHeadingWeight }}
              >
                {formData.job_target}
              </p>
            )}
          </div>

          {/* Contact Details */}
          {hasContactInfo && (
            <div className="w-full flex flex-col items-start">
              <h3 style={sideHeadingStyle}>Details</h3>
              <div className="flex flex-col gap-2 text-xs text-gray-300 font-light items-start" style={bodyStyle}>
                {(formData.address || formData.city_state) && (
                  <div>
                    {formData.address && <span className="block">{formData.address}</span>}
                    <span className="block">
                      {formData.city_state}{formData.country ? `, ${formData.country}` : ''}
                    </span>
                    {formData.postal_code && <span className="block">{formData.postal_code}</span>}
                  </div>
                )}
                {formData.email && (
                  <a href={`mailto:${formData.email}`} className="break-all hover:text-white border-b border-gray-400 pb-0.5">
                    {formData.email}
                  </a>
                )}
                {formData.phone && <span>{formData.phone}</span>}
                {formData.linkedin && (
                  <a href={formData.linkedin} target="_blank" className="break-all hover:text-white">
                    LinkedIn
                  </a>
                )}
                {formData.github && (
                  <a href={formData.github} target="_blank" className="break-all hover:text-white">
                    GitHub
                  </a>
                )}
                {formData.driving_licence && (
                  <div className="mt-1 text-start">
                    <span className="font-semibold text-gray-400 block text-[10px] uppercase">Driving License</span>
                    <span>{formData.driving_licence}</span>
                  </div>
                )}
                {formData.nationality && (
                  <div className="mt-1 text-start">
                    <span className="font-semibold text-gray-400 block text-[10px] uppercase">Nationality</span>
                    <span>{formData.nationality}</span>
                  </div>
                )}
                {formData.birth_place && (
                  <div className="mt-1 text-start">
                    <span className="font-semibold text-gray-400 block text-[10px] uppercase">Place of Birth</span>
                    <span>{formData.birth_place}</span>
                  </div>
                )}
                {formData.dob && (
                  <div className="mt-1 text-start">
                    <span className="font-semibold text-gray-400 block text-[10px] uppercase">Date of Birth</span>
                    <span>{formData.dob}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Sidebar sections (skills, hobbies, languages) */}
          {renderSidebarContent()}
        </div>

        {/* ── RIGHT MAIN CONTENT ── */}
        <div
          className="w-[65%] p-10 flex flex-col gap-6 text-gray-800"
          style={{
            paddingTop:    `${layout.topBottom}pt`,
            paddingBottom: `${layout.topBottom}pt`,
            paddingLeft:   `${layout.leftRight}pt`,
            paddingRight:  `${layout.leftRight}pt`,
          }}
        >
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default Professional;


// 'use client';
// import React from 'react';

// const Professional = ({ formData, empHistory, themeColor, sectionOrder, resumeSettings }) => {
//   const { text, layout } = resumeSettings;

//   const hasContactInfo =
//     formData.email ||
//     formData.phone ||
//     formData.address ||
//     formData.city_state ||
//     formData.postal_code ||
//     formData.driving_licence ||
//     formData.nationality ||
//     formData.country;
//   console.log("EDU FORM DATA", formData.educationHistory);

//   const hasEmployment = formData.employmentHistory?.some(job => job.job_title || job.employer) && formData.employmentHistory.length > 0;
//   const hasSkills = formData.newSkillHistory?.some(s => s.skill) && formData.newSkillHistory.length > 0;
//   const hideLevel = formData.hideExperienceLevel;

//   const formatDate = (dateValue) => {
//     if (!dateValue) return "";
//     const d = new Date(dateValue);
//     return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
//   };

//   // --- RENDER FUNCTIONS FOR SECTIONS ---

//   const renderSkills = () => (
//     hasSkills && (
//       <div key="skills" className="mt-1 w-full text-start">
//         <h3 className="text-xs font-serif font-bold mb-2">Skills</h3>
//         <div className="flex flex-col gap-4">
//           {formData.newSkillHistory.map((item, index) => {
//             const percentage = ((item.level ?? 3) + 1) * 20;
//             return (
//               <div key={index} className="w-full">
//                 <div className="text-xs text-white mb-1.5">{item.skill || ""}</div>
//                 {!hideLevel && (
//                   <div className="w-full bg-[#1a4f46] h-[2px] rounded-full overflow-hidden">
//                     <div
//                       className="bg-white h-full transition-all duration-500 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
//                       style={{ width: `${percentage}%` }}
//                     />
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     )
//   );

//   const renderHobbies = () => (
//     formData.hobbies && (
//       <div key="hobbies" className="mt-4 w-full text-start">
//         <h3 className="text-xs font-serif font-bold mb-2">Hobbies</h3>
//         <p className="text-xs text-gray-300 font-light whitespace-pre-wrap leading-relaxed">
//           {formData.hobbies}
//         </p>
//       </div>
//     )
//   );

//   const renderLanguages = () => (
//     formData.languageHistory?.some(l => l.language) && formData.languageHistory.length > 0 && (
//       <div key="languages" className="mt-4 w-full text-start">
//         <h3 className="text-xs font-serif font-bold mb-2">Languages</h3>
//         <div className="flex flex-col gap-4">
//           {formData.languageHistory.map((item, index) => {
//             let percentage = 20;
//             switch (item.level) {
//               case "Native speaker": percentage = 100; break;
//               case "Highly proficient": percentage = 80; break;
//               case "Very good command": percentage = 60; break;
//               case "Good working knowledge": percentage = 40; break;
//               case "Working knowledge": percentage = 20; break;
//               default: percentage = 20;
//             }
//             return (
//               <div key={index} className="w-full">
//                 <div className="text-xs text-white mb-1.5">{item.language || ""}</div>
//                 <div className="w-full bg-[#1a4f46] h-[2px] rounded-full overflow-hidden">
//                   <div
//                     className="bg-white h-full transition-all duration-500 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
//                     style={{ width: `${percentage}%` }}
//                   />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     )
//   );

//   // --- MAIN CONTENT RENDER FUNCTIONS ---

//   const renderSummary = () => (
//     formData.summary && (
//       <section>
//         <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1">
//           Profile
//         </h2>

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
//     )
//   );



//   const renderEmployment = () => (
//     hasEmployment && (
//       <section key="employment">
//         <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1">
//           Employment History
//         </h2>
//         <div className="flex flex-col gap-4">
//           {formData.employmentHistory.map((job, index) => {
//             const displayStart = formatDate(job.startDate);
//             const displayEnd = formatDate(job.endDate);
//             return (
//               <div key={index} className="mb-2">
//                 <h3 className="text-[12px] font-bold text-black">
//                   {job.job_title}
//                   {job.employer ? `, ${job.employer}` : ''}
//                   {job.city_state ? `, ${job.city_state}` : ''}
//                 </h3>
//                 {(displayStart || displayEnd) && (
//                   <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                     {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
//                   </div>
//                 )}
//                 {job.description && (
//                   <div
//                     className="
//                       text-xs text-gray-700 mt-1 leading-relaxed
//                       [&_p]:mb-1
//                       [&_ul]:list-disc [&_ul]:pl-4
//                       [&_ol]:list-decimal [&_ol]:pl-4
//                       [&_li]:mb-1
//                       [&_strong]:font-semibold
//                       [&_em]:italic
//                     "
//                     dangerouslySetInnerHTML={{ __html: job.description }}
//                   />
//                 )}

//               </div>
//             );
//           })}
//         </div>
//       </section>
//     )
//   );

//   const renderEducation = () => (
//     formData.educationHistory?.some(job => job.school || job.degree) && formData.educationHistory.length > 0 && (
//       <section key="education">
//         <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1 border-gray-200">
//           Education
//         </h2>
//         <div className="flex flex-col gap-4 mt-3">
//           {formData.educationHistory.map((edu, index) => {
//             const displayStart = formatDate(edu.startDate);
//             const displayEnd = formatDate(edu.endDate);
//             return (
//               <div key={index} className="mb-2">
//                 <h3 className="text-[12px] font-bold text-black leading-tight">
//                   {edu.degree}{edu.school ? `, ${edu.school}` : ''}{edu.city_state ? `, ${edu.city_state}` : ''}
//                 </h3>
//                 {(displayStart || displayEnd) && (
//                   <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                     {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
//                   </div>
//                 )}
//                 {edu.description && (
//                   <div
//                     className="text-xs text-gray-700 mt-1
//                     [&_ul]:list-disc [&_ul]:pl-4
//                     [&_li]:mb-1"
//                     dangerouslySetInnerHTML={{ __html: edu.description }}
//                   />
//                 )}


//               </div>
//             )
//           })}
//         </div>
//       </section>
//     )
//   );

//   const renderCourses = () => (
//     formData.coursesHistory?.some(c => c.course || c.institution) && formData.coursesHistory.length > 0 && (
//       <section key="courses">
//         <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1 border-gray-200">
//           Courses
//         </h2>
//         <div className="flex flex-col gap-4 mt-3">
//           {formData.coursesHistory.map((course, index) => {
//             const displayStart = formatDate(course.startDate);
//             const displayEnd = formatDate(course.endDate);
//             return (
//               <div key={index} className="mb-2">
//                 <h3 className="text-[12px] font-bold text-black leading-tight">
//                   {course.course}{course.institution ? `, ${course.institution}` : ''}
//                 </h3>
//                 {(displayStart || displayEnd) && (
//                   <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                     {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
//                   </div>
//                 )}
//                 {course.description && (
//                   <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1">
//                     {course.description}
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     )
//   );

//   const renderActivities = () => (
//     formData.activityHistory?.some(a => a.functionTitle || a.employer) && formData.activityHistory.length > 0 && (
//       <section key="activities">
//         <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1 border-gray-200">
//           Extra-curricular Activities
//         </h2>
//         <div className="flex flex-col gap-4 mt-3">
//           {formData.activityHistory.map((activity, index) => {
//             const displayStart = formatDate(activity.startDate);
//             const displayEnd = formatDate(activity.endDate);
//             return (
//               <div key={index} className="mb-2">
//                 <h3 className="text-[12px] font-bold text-black leading-tight">
//                   {activity.functionTitle}{activity.employer ? `, ${activity.employer}` : ''}{activity.city ? `, ${activity.city}` : ''}
//                 </h3>
//                 {(displayStart || displayEnd) && (
//                   <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                     {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
//                   </div>
//                 )}
//                 {activity.description && (
//                   <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1">
//                     {activity.description}
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     )
//   );

//   const renderInternships = () => (
//     formData.internshipHistory?.some(intern => intern.jobTitle || intern.employer) && formData.internshipHistory.length > 0 && (
//       <section key="internships">
//         <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1">
//           Internships
//         </h2>
//         <div className="flex flex-col gap-4">
//           {formData.internshipHistory.map((intern, index) => {
//             const displayStart = formatDate(intern.startDate);
//             const displayEnd = formatDate(intern.endDate);
//             return (
//               <div key={index} className="mb-2">
//                 <h3 className="text-[12px] font-bold text-black">
//                   {intern.jobTitle}
//                   {intern.employer ? `, ${intern.employer}` : ''}
//                   {intern.city ? `, ${intern.city}` : ''}
//                 </h3>
//                 {(displayStart || displayEnd) && (
//                   <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                     {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
//                   </div>
//                 )}
//                 {intern.description && (
//                   <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
//                     {intern.description}
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     )
//   );

//   const renderCustom = () => (
//     <>
//       {Object.keys(formData)
//         .filter(key => key.startsWith('customSectionHistory_'))
//         .map(key => {
//           const sectionId = key.replace('customSectionHistory_', '');
//           const history = formData[key];
//           const title = formData[`customSectionTitle_${sectionId}`] || 'Custom Section';
//           if (!history?.some(item => item.activity || item.city)) return null;
//           return (
//             <section key={sectionId}>
//               <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1">
//                 {title}
//               </h2>
//               <div className="flex flex-col gap-4">
//                 {history.map((item, index) => {
//                   const displayStart = formatDate(item.startDate);
//                   const displayEnd = formatDate(item.endDate);
//                   return (
//                     <div key={index} className="mb-2">
//                       <h3 className="text-[12px] font-bold text-black">
//                         {item.activity}
//                         {item.city ? `, ${item.city}` : ''}
//                       </h3>
//                       {(displayStart || displayEnd) && (
//                         <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                           {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
//                         </div>
//                       )}
//                       {item.description && (
//                         <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
//                           {item.description}
//                         </p>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </section>
//           );
//         })}
//       {formData.customSectionHistory?.some(item => item.activity || item.city) && (
//         <section key="custom-default">
//           <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1">
//             {formData.customSectionTitle || 'Custom Section'}
//           </h2>
//           <div className="flex flex-col gap-4">
//             {formData.customSectionHistory.map((item, index) => {
//               const displayStart = formatDate(item.startDate);
//               const displayEnd = formatDate(item.endDate);
//               return (
//                 <div key={index} className="mb-2">
//                   <h3 className="text-[12px] font-bold text-black">
//                     {item.activity}
//                     {item.city ? `, ${item.city}` : ''}
//                   </h3>
//                   {(displayStart || displayEnd) && (
//                     <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                       {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
//                     </div>
//                   )}
//                   {item.description && (
//                     <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
//                       {item.description}
//                     </p>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       )}
//     </>
//   );

//   const mainSections = {
//     'summary': renderSummary,
//     'employment': renderEmployment,
//     'education': renderEducation,
//     'courses': renderCourses,
//     'activities': renderActivities,
//     'internships': renderInternships,
//     'custom': renderCustom
//   };

//   const sidebarSections = {
//     'skills': renderSkills,
//     'hobbies': renderHobbies,
//     'languages': renderLanguages,
//   };

//   // If sectionOrder is not provided (e.g. initial load), provide default order
//   const order = sectionOrder || ['summary', 'employment', 'education', 'skills', 'courses', 'hobbies', 'activities', 'languages', 'internships', 'custom'];

//   return (
//     <div className="h-screen overflow-y-auto hide-scrollbar">

//       <div className="min-h-[297mm] bg-white shadow-xl flex resume-root"
//          style={{
//         fontFamily: text.primaryFont,
//         lineHeight: text.lineHeight,
//         fontSize: text.fontSize
//       }}
//       >

//         {/* ----------------- LEFT SIDEBAR ----------------- */}
//         <div className="w-[35%] text-white p-8 flex flex-col gap-6 items-center text-center" style={{ backgroundColor: themeColor }}>

//           {/* Profile Image */}
//           {formData.profileImage && (
//             <div className="w-15 h-15 mb-1 rounded-full overflow-hidden border-4 border-white shadow-lg">
//               <img
//                 src={formData.profileImage}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           )}

//           {/* Name Block */}
//           <div className="mt-1 w-full flex flex-col items-center">
//             <h1 className="text-xl font-serif font-bold leading-tight break-words">
//               {formData.first_name} <br />
//               {formData.last_name}
//             </h1>

//             <div className="w-8 h-[1px] bg-gray-400 my-4 opacity-50"></div>

//             {formData.job_target && (
//               <div className="">
//                 <p className="uppercase tracking-[0.2em] font-medium text-gray-300" >
//                   {formData.job_target}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Details Section */}
//           {hasContactInfo && (
//             <div className="w-full flex flex-col items-start">
//               <h3 className="text-xs font-serif font-bold mb-2">Details</h3>
//               <div className="flex flex-col gap-2 text-xs text-gray-300 font-light items-start">

//                 {(formData.address || formData.city_state) && (
//                   <div className="mb-1">
//                     <span className="block text-start">{formData.address}</span>
//                     <span className="block text-start">{formData.city_state}{formData?.country && "," + formData.country}</span>
//                     {formData.postal_code && <span className="block text-start">{formData.postal_code}</span>}
//                   </div>
//                 )}

//                 {formData.email && (
//                   <a href={`mailto:${formData.email}`} className="break-all hover:text-white border-b border-gray-400 pb-0.5">
//                     {formData.email}
//                   </a>
//                 )}

//                 {formData.phone && (
//                   <div className="block text-start">{formData.phone}</div>
//                 )}


//                 {formData.driving_licence && (
//                   <div className="mt-2 text-start">
//                     <span className="font-semibold text-gray-400 block text-[10px] uppercase">Driving License</span>
//                     <span>{formData.driving_licence}</span>
//                   </div>
//                 )}

//                 {formData.nationality && (
//                   <div className="mt-1 text-start">
//                     <span className="font-semibold text-gray-400 block text-[10px] uppercase">Nationality</span>
//                     <span>{formData.nationality}</span>
//                   </div>
//                 )}

//                 {formData.birth_place && (
//                   <div className="mt-1 text-start">
//                     <span className="font-semibold text-gray-400 block text-[10px] uppercase">Place of Birth</span>
//                     <span>{formData.birth_place}</span>
//                   </div>
//                 )}

//                 {formData.dob && (
//                   <div className="mt-1 text-start">
//                     <span className="font-semibold text-gray-400 block text-[10px] uppercase">Date of Birth</span>
//                     <span>{formData.dob}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Render Sidebar Sections based on Order */}
//           {order.map(sectionId => {
//             if (sidebarSections[sectionId]) {
//               return sidebarSections[sectionId]();
//             }
//             return null;
//           })}

//         </div>


//         {/* ----------------- RIGHT CONTENT ----------------- */}
//         <div className="w-[65%] p-10 flex flex-col gap-8 text-gray-800">

//           {/* Render Main Content Sections based on Order */}
//           {order.map(sectionId => {
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

// export default Professional;