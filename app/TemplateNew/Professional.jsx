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
    const end = formatDate(endDate);
    if (start && end) return `${start} — ${end}`;
    return start || end || '';
  };

  const skillLevels = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];

  const hasContactInfo =
    formData.email || formData.phone || formData.address ||
    formData.city_state || formData.postal_code ||
    formData.driving_licence || formData.nationality || formData.country;

  // ── Styles ────────────────────────────────────────────────────────────────
  const sidebarStyle = {
    backgroundColor: themeColor,
    width: '35%',
    verticalAlign: 'top',
    padding: '30pt 14pt',
  };

  const mainStyle = {
    width: '65%',
    verticalAlign: 'top',
    padding: `${layout.topBottom}pt ${layout.leftRight}pt`,
    backgroundColor: '#ffffff',
  };

  const sideHeadingStyle = {
    fontSize: `${text.sectionTitle}pt`,
    fontWeight: text.sectionTitleWeight,
    fontFamily: text.secondaryFont,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6pt',
    marginTop: '14pt',
    display: 'block',
  };

  const mainHeadingStyle = {
    fontSize: `${text.sectionTitle}pt`,
    fontWeight: text.sectionTitleWeight,
    fontFamily: text.secondaryFont,
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '3pt',
    marginBottom: `${layout.betweenTitlesContent}pt`,
    marginTop: `${layout.betweenSections}pt`,
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'block',
  };

  const bodyStyle = {
    fontSize: `${text.body}pt`,
    fontWeight: text.bodyWeight,
    fontFamily: text.primaryFont,
  };

  const skillBarBg = {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: '2px',
    borderRadius: '9999px',
    overflow: 'hidden',
    marginTop: '4pt',
  };

  // ════════════════════════════════════════════════════════════════════════
  //  SIDEBAR RENDERERS
  // ════════════════════════════════════════════════════════════════════════

  const renderSkillsScratch = () => {
    const hasSkills = formData.newSkillHistory?.some(s => s.skill);
    if (!hasSkills) return null;
    const hideLevel = formData.hideExperienceLevel;
    return (
      <div key="skills">
        <span style={sideHeadingStyle}>{formData.skillSectionTitle || 'Skills'}</span>
        {formData.newSkillHistory.map((item, i) => {
          const pct = ((item.level ?? 3) + 1) * 20;
          return (
            <div key={i} style={{ marginBottom: '8pt' }}>
              <div style={{ ...bodyStyle, color: '#ffffff', fontSize: `${text.body}pt` }}>{item.skill}</div>
              {!hideLevel && (
                <div style={skillBarBg}>
                  <div style={{ backgroundColor: '#ffffff', height: '100%', width: `${pct}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderHobbiesScratch = () =>
    formData.hobbies ? (
      <div key="hobbies">
        <span style={sideHeadingStyle}>{formData.hobbiesSectionTitle || 'Hobbies'}</span>
        <p style={{ ...bodyStyle, color: '#d1d5db', margin: 0 }}>{formData.hobbies}</p>
      </div>
    ) : null;

  const renderLanguagesScratch = () => {
    if (!formData.languageHistory?.some(l => l.language)) return null;
    const profMap = { 'Native speaker': 100, 'Highly proficient': 80, 'Very good command': 60, 'Good working knowledge': 40, 'Working knowledge': 20 };
    return (
      <div key="languages">
        <span style={sideHeadingStyle}>{formData.languagesSectionTitle || 'Languages'}</span>
        {formData.languageHistory.map((item, i) => (
          <div key={i} style={{ marginBottom: '8pt' }}>
            <div style={{ ...bodyStyle, color: '#ffffff' }}>
              {item.language}{!formData.hideLanguageProficiency && item.level ? ` (${item.level})` : ''}
            </div>
            {!formData.hideLanguageProficiency && (
              <div style={skillBarBg}>
                <div style={{ backgroundColor: '#ffffff', height: '100%', width: `${profMap[item.level] ?? 20}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSkillsFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    return (
      <div key={section.id}>
        <span style={sideHeadingStyle}>{section.title}</span>
        {section.skills?.map((skill, i) => {
          const pct = ((skill.level ?? 3) + 1) * 20;
          return (
            <div key={skill.id || i} style={{ marginBottom: '8pt' }}>
              <div style={{ ...bodyStyle, color: '#ffffff' }}>{skill.name}</div>
              {showLevel && (
                <div style={skillBarBg}>
                  <div style={{ backgroundColor: '#ffffff', height: '100%', width: `${pct}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderLanguagesFromSection = (section) => {
    if (!section.languages?.length) return null;
    const profMap = { 'Native speaker': 100, 'Highly proficient': 80, 'Very good command': 60, 'Good working knowledge': 40, 'Working knowledge': 20 };
    return (
      <div key={section.id}>
        <span style={sideHeadingStyle}>{section.title}</span>
        {section.languages.map((l, i) => (
          <div key={i} style={{ marginBottom: '8pt' }}>
            <div style={{ ...bodyStyle, color: '#ffffff' }}>
              {l.language}{!section.hideProficiency && l.level ? ` (${l.level})` : ''}
            </div>
            {!section.hideProficiency && (
              <div style={skillBarBg}>
                <div style={{ backgroundColor: '#ffffff', height: '100%', width: `${profMap[l.level] ?? 20}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderHobbiesFromSectionSidebar = (section) =>
    section.hobbies ? (
      <div key={section.id}>
        <span style={sideHeadingStyle}>{section.title}</span>
        <p style={{ ...bodyStyle, color: '#d1d5db', margin: 0 }}>{section.hobbies}</p>
      </div>
    ) : null;

  // ════════════════════════════════════════════════════════════════════════
  //  MAIN CONTENT RENDERERS — SCRATCH
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryScratch = () =>
    formData.summary ? (
      <section key="summary">
        <span style={mainHeadingStyle}>{formData.summarySectionTitle || 'Profile'}</span>
        <div
          style={{ ...bodyStyle, color: '#374151', lineHeight: text.lineHeight, textAlign: 'justify' }}
          dangerouslySetInnerHTML={{ __html: formData.summary }}
        />
      </section>
    ) : null;

  const renderEmploymentScratch = () => {
    const hasEmp = formData.employmentHistory?.some(j => j.job_title || j.employer);
    if (!hasEmp) return null;
    return (
      <section key="employment">
        <span style={mainHeadingStyle}>{formData.employmentSectionTitle || 'Employment History'}</span>
        {formData.employmentHistory.map((job, i) => (
          <div key={i} style={{ marginBottom: '8pt' }}>
            <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
              {job.job_title}{job.employer ? `, ${job.employer}` : ''}{job.city_state ? `, ${job.city_state}` : ''}
            </div>
            {dateRange(job.startDate, job.endDate) && (
              <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2pt' }}>
                {dateRange(job.startDate, job.endDate)}
              </div>
            )}
            {job.description && (
              <div style={{ ...bodyStyle, color: '#374151', lineHeight: text.lineHeight }} dangerouslySetInnerHTML={{ __html: job.description }} />
            )}
          </div>
        ))}
      </section>
    );
  };

  const renderEducationScratch = () => {
    const hasEdu = formData.educationHistory?.some(e => e.school || e.degree);
    if (!hasEdu) return null;
    return (
      <section key="education">
        <span style={mainHeadingStyle}>{formData.educationSectionTitle || 'Education'}</span>
        {formData.educationHistory.map((edu, i) => (
          <div key={i} style={{ marginBottom: '8pt' }}>
            <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
              {edu.degree}{edu.school ? `, ${edu.school}` : ''}{edu.city_state ? `, ${edu.city_state}` : ''}
            </div>
            {dateRange(edu.startDate, edu.endDate) && (
              <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2pt' }}>
                {dateRange(edu.startDate, edu.endDate)}
              </div>
            )}
            {edu.description && (
              <div style={{ ...bodyStyle, color: '#374151' }} dangerouslySetInnerHTML={{ __html: edu.description }} />
            )}
          </div>
        ))}
      </section>
    );
  };

  const renderCoursesScratch = () => {
    if (!formData.coursesHistory?.some(c => c.course || c.institution)) return null;
    return (
      <section key="courses">
        <span style={mainHeadingStyle}>{formData.coursesSectionTitle || 'Courses'}</span>
        {formData.coursesHistory.map((course, i) => (
          <div key={i} style={{ marginBottom: '6pt' }}>
            <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
              {course.course}{course.institution ? `, ${course.institution}` : ''}
            </div>
            {dateRange(course.startDate, course.endDate) && (
              <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2pt' }}>
                {dateRange(course.startDate, course.endDate)}
              </div>
            )}
          </div>
        ))}
      </section>
    );
  };

  const renderActivitiesScratch = () => {
    if (!formData.activityHistory?.some(a => a.functionTitle || a.employer)) return null;
    return (
      <section key="activities">
        <span style={mainHeadingStyle}>{formData.activitiesSectionTitle || 'Extra-curricular Activities'}</span>
        {formData.activityHistory.map((a, i) => (
          <div key={i} style={{ marginBottom: '8pt' }}>
            <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
              {a.functionTitle}{a.employer ? `, ${a.employer}` : ''}{a.city ? `, ${a.city}` : ''}
            </div>
            {dateRange(a.startDate, a.endDate) && (
              <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2pt' }}>
                {dateRange(a.startDate, a.endDate)}
              </div>
            )}
            {a.description && <p style={{ ...bodyStyle, color: '#374151', margin: '2pt 0' }}>{a.description}</p>}
          </div>
        ))}
      </section>
    );
  };

  const renderInternshipsScratch = () => {
    if (!formData.internshipHistory?.some(i => i.jobTitle || i.employer)) return null;
    return (
      <section key="internships">
        <span style={mainHeadingStyle}>{formData.internshipsSectionTitle || 'Internships'}</span>
        {formData.internshipHistory.map((intern, i) => (
          <div key={i} style={{ marginBottom: '8pt' }}>
            <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
              {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ''}{intern.city ? `, ${intern.city}` : ''}
            </div>
            {dateRange(intern.startDate, intern.endDate) && (
              <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2pt' }}>
                {dateRange(intern.startDate, intern.endDate)}
              </div>
            )}
            {intern.description && <p style={{ ...bodyStyle, color: '#374151', margin: '2pt 0' }}>{intern.description}</p>}
          </div>
        ))}
      </section>
    );
  };

  const renderScratchSimpleCustomSections = () =>
    Object.keys(formData)
      .filter(key => key.startsWith('customSimpleHistory_custom_simple_'))
      .map(key => {
        const sectionId = key.replace('customSimpleHistory_', '');
        const history = formData[key];
        const title = formData[`customSimpleTitle_${sectionId}`] || 'Custom Section';
        const hideLevel = formData[`customSimpleHideLevel_${sectionId}`] ?? true;
        if (!history?.some(i => i.name)) return null;
        return (
          <section key={sectionId}>
            <span style={mainHeadingStyle}>{title}</span>
            <table style={{ width: '100%', borderCollapse: 'collapse', ...bodyStyle }}>
              <tbody>
                {Array.from({ length: Math.ceil(history.length / 2) }, (_, rowIdx) => {
                  const i1 = history[rowIdx * 2];
                  const i2 = history[rowIdx * 2 + 1];
                  return (
                    <tr key={rowIdx}>
                      <td style={{ width: '50%', padding: '2pt 8pt 2pt 0', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>
                        {i1?.name}
                        {!hideLevel && <span style={{ float: 'right', color: '#9ca3af', fontSize: `${text.body - 1}pt` }}>{skillLevels[i1?.level ?? 2]}</span>}
                      </td>
                      <td style={{ width: '50%', padding: '2pt 0 2pt 8pt', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>
                        {i2?.name}
                        {!hideLevel && i2 && <span style={{ float: 'right', color: '#9ca3af', fontSize: `${text.body - 1}pt` }}>{skillLevels[i2?.level ?? 2]}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        );
      });

  const renderScratchAdvancedCustomSections = () =>
    Object.keys(formData)
      .filter(key => key.startsWith('customAdvancedHistory_custom_advanced_'))
      .map(key => {
        const sectionId = key.replace('customAdvancedHistory_', '');
        const history = formData[key];
        const title = formData[`customAdvancedTitle_${sectionId}`] || 'Custom Section';
        if (!history?.some(i => i.title || i.city)) return null;
        return (
          <section key={sectionId}>
            <span style={mainHeadingStyle}>{title}</span>
            {history.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '8pt' }}>
                <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
                  {item.title}{item.city ? `, ${item.city}` : ''}
                </div>
                {dateRange(item.startDate, item.endDate) && (
                  <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2pt' }}>
                    {dateRange(item.startDate, item.endDate)}
                  </div>
                )}
                {item.description && (
                  <div style={{ ...bodyStyle, color: '#374151' }} dangerouslySetInnerHTML={{ __html: item.description }} />
                )}
              </div>
            ))}
          </section>
        );
      });

  // ════════════════════════════════════════════════════════════════════════
  //  MAIN CONTENT RENDERERS — SECTIONS
  // ════════════════════════════════════════════════════════════════════════

  const renderSummaryFromSection = (section) => (
    <section key={section.id}>
      <span style={mainHeadingStyle}>{section.title}</span>
      <div
        style={{ ...bodyStyle, color: '#374151', lineHeight: text.lineHeight, textAlign: 'justify' }}
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
    </section>
  );

  const renderExperienceFromSection = (section) => (
    <section key={section.id}>
      <span style={mainHeadingStyle}>{section.title}</span>
      {section.experiences?.map((exp, i) => (
        <div key={exp.id || i} style={{ marginBottom: '8pt' }}>
          <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
            {exp.jobTitle}{exp.company ? `, ${exp.company}` : ''}{exp.city ? `, ${exp.city}` : ''}
          </div>
          {dateRange(exp.startDate, exp.endDate) && (
            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2pt' }}>
              {dateRange(exp.startDate, exp.endDate)}
            </div>
          )}
          {exp.description && (
            <div style={{ ...bodyStyle, color: '#374151', lineHeight: text.lineHeight }} dangerouslySetInnerHTML={{ __html: exp.description }} />
          )}
        </div>
      ))}
    </section>
  );

  const renderEducationFromSection = (section) => (
    <section key={section.id}>
      <span style={mainHeadingStyle}>{section.title}</span>
      {section.educations?.map((edu, i) => (
        <div key={edu.id || i} style={{ marginBottom: '8pt' }}>
          <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
            {edu.degree}{edu.institute ? `, ${edu.institute}` : ''}{edu.city ? `, ${edu.city}` : ''}
          </div>
          {dateRange(edu.startDate, edu.endDate) && (
            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2pt' }}>
              {dateRange(edu.startDate, edu.endDate)}
            </div>
          )}
          {edu.description && (
            <div style={{ ...bodyStyle, color: '#374151' }} dangerouslySetInnerHTML={{ __html: edu.description }} />
          )}
        </div>
      ))}
    </section>
  );

  const renderCertificationsFromSection = (section) => (
    <section key={section.id}>
      <span style={mainHeadingStyle}>{section.title}</span>
      {section.certifications?.map((cert, i) => (
        <div key={cert.id || i} style={{ marginBottom: '6pt' }}>
          <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
            {cert.name}{cert.organization ? `, ${cert.organization}` : ''}
          </div>
          {(cert.startYear || cert.endYear) && (
            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2pt' }}>
              {cert.startYear && cert.endYear ? `${cert.startYear} — ${cert.endYear}` : cert.startYear || cert.endYear}
            </div>
          )}
          {cert.description && <p style={{ ...bodyStyle, color: '#374151', margin: '2pt 0' }}>{cert.description}</p>}
        </div>
      ))}
    </section>
  );

  const renderCoursesFromSection = (section) => (
    <section key={section.id}>
      <span style={mainHeadingStyle}>{section.title}</span>
      {section.courses?.map((course, i) => (
        <div key={course.id || i} style={{ marginBottom: '6pt' }}>
          <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
            {course.course}{course.institution ? `, ${course.institution}` : ''}
          </div>
          {dateRange(course.startDate, course.endDate) && (
            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2pt' }}>
              {dateRange(course.startDate, course.endDate)}
            </div>
          )}
        </div>
      ))}
    </section>
  );

  const renderInternshipsFromSection = (section) => (
    <section key={section.id}>
      <span style={mainHeadingStyle}>{section.title}</span>
      {section.internships?.map((intern, i) => (
        <div key={intern.id || i} style={{ marginBottom: '8pt' }}>
          <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
            {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ''}{intern.city ? `, ${intern.city}` : ''}
          </div>
          {dateRange(intern.startDate, intern.endDate) && (
            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2pt' }}>
              {dateRange(intern.startDate, intern.endDate)}
            </div>
          )}
          {intern.description && <p style={{ ...bodyStyle, color: '#374151', margin: '2pt 0' }}>{intern.description}</p>}
        </div>
      ))}
    </section>
  );

  const renderActivitiesFromSection = (section) => (
    <section key={section.id}>
      <span style={mainHeadingStyle}>{section.title}</span>
      {section.activities?.map((a, i) => (
        <div key={a.id || i} style={{ marginBottom: '8pt' }}>
          <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
            {a.functionTitle}{a.employer ? `, ${a.employer}` : ''}{a.city ? `, ${a.city}` : ''}
          </div>
          {dateRange(a.startDate, a.endDate) && (
            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2pt' }}>
              {dateRange(a.startDate, a.endDate)}
            </div>
          )}
          {a.description && <p style={{ ...bodyStyle, color: '#374151', margin: '2pt 0' }}>{a.description}</p>}
        </div>
      ))}
    </section>
  );

  const renderHobbiesFromSection = (section) =>
    section.hobbies ? (
      <section key={section.id}>
        <span style={mainHeadingStyle}>{section.title}</span>
        <p style={{ ...bodyStyle, color: '#374151', margin: 0 }}>{section.hobbies}</p>
      </section>
    ) : null;

  const renderCustomSimpleFromSection = (section) => {
    const showLevel = section.hideExperienceLevel === false;
    const items = section.items || [];
    return (
      <section key={section.id}>
        <span style={mainHeadingStyle}>{section.title}</span>
        <table style={{ width: '100%', borderCollapse: 'collapse', ...bodyStyle }}>
          <tbody>
            {Array.from({ length: Math.ceil(items.length / 2) }, (_, rowIdx) => {
              const it1 = items[rowIdx * 2];
              const it2 = items[rowIdx * 2 + 1];
              const n1 = typeof it1 === 'object' ? (it1?.name || it1?.title) : it1;
              const n2 = it2 ? (typeof it2 === 'object' ? (it2?.name || it2?.title) : it2) : '';
              return (
                <tr key={rowIdx}>
                  <td style={{ width: '50%', padding: '2pt 8pt 2pt 0', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>
                    {n1}
                    {showLevel && it1 && <span style={{ float: 'right', color: '#9ca3af', fontSize: `${text.body - 1}pt` }}>{skillLevels[it1?.level ?? 2]}</span>}
                  </td>
                  <td style={{ width: '50%', padding: '2pt 0 2pt 8pt', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>
                    {n2}
                    {showLevel && it2 && <span style={{ float: 'right', color: '#9ca3af', fontSize: `${text.body - 1}pt` }}>{skillLevels[it2?.level ?? 2]}</span>}
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
      <span style={mainHeadingStyle}>{section.title}</span>
      {section.items?.map((item, i) => (
        <div key={item.id || i} style={{ marginBottom: '8pt' }}>
          <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>
            {item.title}{item.city ? `, ${item.city}` : ''}
          </div>
          {dateRange(item.startDate, item.endDate) && (
            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2pt' }}>
              {dateRange(item.startDate, item.endDate)}
            </div>
          )}
          {item.description && (
            <div style={{ ...bodyStyle, color: '#374151' }} dangerouslySetInnerHTML={{ __html: item.description }} />
          )}
        </div>
      ))}
    </section>
  );

  // ════════════════════════════════════════════════════════════════════════
  //  SIDEBAR / MAIN SPLIT LOGIC
  // ════════════════════════════════════════════════════════════════════════

  const SIDEBAR_TYPES = new Set(['skills', 'hobbies', 'languages']);

  const renderSidebarContent = () => {
    if (sections && sections.length > 0) {
      return sections
        .filter(s => SIDEBAR_TYPES.has(s.type))
        .map(section => {
          switch (section.type) {
            case 'skills':    return renderSkillsFromSection(section);
            case 'hobbies':   return renderHobbiesFromSectionSidebar(section);
            case 'languages': return renderLanguagesFromSection(section);
            default:          return null;
          }
        });
    }
    const order = sectionOrder || ['summary', 'employment', 'education', 'skills', 'courses', 'hobbies', 'activities', 'languages', 'internships'];
    const sidebarRenderers = { skills: renderSkillsScratch, hobbies: renderHobbiesScratch, languages: renderLanguagesScratch };
    return order.map(id => sidebarRenderers[id]?.() ?? null);
  };

  const renderMainContent = () => {
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
            case 'hobbies':        return renderHobbiesFromSection(section);
            case 'custom_simple':  return renderCustomSimpleFromSection(section);
            case 'custom':         return renderCustomAdvancedFromSection(section);
            default:               return null;
          }
        });
    }

    const order = sectionOrder || ['summary', 'employment', 'education', 'skills', 'courses', 'hobbies', 'activities', 'languages', 'internships'];
    const mainRenderers = {
      summary: renderSummaryScratch,
      employment: renderEmploymentScratch,
      education: renderEducationScratch,
      courses: renderCoursesScratch,
      activities: renderActivitiesScratch,
      internships: renderInternshipsScratch,
    };

    return [
      ...order.filter(id => !SIDEBAR_TYPES.has(id)).map(id => {
        if (typeof id === 'string' && id.startsWith('custom_simple_')) {
          const history = formData[`customSimpleHistory_${id}`];
          const title = formData[`customSimpleTitle_${id}`] || 'Custom Section';
          const hideLevel = formData[`customSimpleHideLevel_${id}`] ?? true;
          if (!history?.some(i => i.name)) return null;
          return (
            <section key={id}>
              <span style={mainHeadingStyle}>{title}</span>
              <table style={{ width: '100%', borderCollapse: 'collapse', ...bodyStyle }}>
                <tbody>
                  {Array.from({ length: Math.ceil(history.length / 2) }, (_, rowIdx) => {
                    const i1 = history[rowIdx * 2]; const i2 = history[rowIdx * 2 + 1];
                    return (
                      <tr key={rowIdx}>
                        <td style={{ width: '50%', padding: '2pt 8pt 2pt 0', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>
                          {i1?.name}{!hideLevel && <span style={{ float: 'right', color: '#9ca3af', fontSize: `${text.body - 1}pt` }}>{skillLevels[i1?.level ?? 2]}</span>}
                        </td>
                        <td style={{ width: '50%', padding: '2pt 0 2pt 8pt', borderBottom: '1px solid #f3f4f6', color: '#1f2937' }}>
                          {i2?.name}{!hideLevel && i2 && <span style={{ float: 'right', color: '#9ca3af', fontSize: `${text.body - 1}pt` }}>{skillLevels[i2?.level ?? 2]}</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          );
        }
        if (typeof id === 'string' && id.startsWith('custom_advanced_')) {
          const history = formData[`customAdvancedHistory_${id}`];
          const title = formData[`customAdvancedTitle_${id}`] || 'Custom Section';
          if (!history?.some(i => i.title || i.city)) return null;
          return (
            <section key={id}>
              <span style={mainHeadingStyle}>{title}</span>
              {history.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '8pt' }}>
                  <div style={{ ...bodyStyle, fontWeight: 'bold', color: '#000' }}>{item.title}{item.city ? `, ${item.city}` : ''}</div>
                  {dateRange(item.startDate, item.endDate) && (
                    <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '2pt' }}>{dateRange(item.startDate, item.endDate)}</div>
                  )}
                  {item.description && <div style={{ ...bodyStyle, color: '#374151' }} dangerouslySetInnerHTML={{ __html: item.description }} />}
                </div>
              ))}
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
  //  RENDER — table-based two-column layout (PDF safe)
  // ════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ overflowY: 'auto' }}>
      <div
        style={{
          minHeight: '297mm',
          backgroundColor: '#ffffff',
          fontFamily: text.primaryFont,
          lineHeight: text.lineHeight,
          fontSize: `${text.body}pt`,
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '35%' }} />
            <col style={{ width: '65%' }} />
          </colgroup>
          <tbody>
            <tr>
              {/* ── LEFT SIDEBAR ── */}
              <td style={sidebarStyle}>
                {/* Profile Image */}
                {formData.profileImage && (
                  <div style={{ textAlign: 'center', marginBottom: '12pt' }}>
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      style={{ width: '80pt', height: '80pt', objectFit: 'cover', borderRadius: '50%', border: '2pt solid rgba(255,255,255,0.6)' }}
                    />
                  </div>
                )}

                {/* Name + Title */}
                <div style={{ textAlign: 'center', marginBottom: '12pt' }}>
                  <div style={{
                    fontFamily: text.secondaryFont,
                    fontSize: `${text.primaryHeading}pt`,
                    fontWeight: text.primaryHeadingWeight,
                    color: '#ffffff',
                    lineHeight: 1.2,
                  }}>
                    {formData.first_name} {formData.last_name}
                  </div>
                  <div style={{ width: '24pt', height: '1px', backgroundColor: 'rgba(255,255,255,0.4)', margin: '6pt auto' }} />
                  {formData.job_target && (
                    <div style={{
                      fontSize: `${text.secondaryHeading}pt`,
                      fontWeight: text.secondaryHeadingWeight,
                      color: 'rgba(255,255,255,0.8)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      {formData.job_target}
                    </div>
                  )}
                </div>

                {/* Contact Details */}
                {hasContactInfo && (
                  <div>
                    <span style={{ ...sideHeadingStyle, marginTop: '0' }}>Details</span>
                    <table style={{ width: '100%', borderCollapse: 'collapse', ...bodyStyle, color: '#d1d5db' }}>
                      <tbody>
                        {(formData.address || formData.city_state) && (
                          <tr><td style={{ paddingBottom: '4pt', color: '#d1d5db', ...bodyStyle }}>
                            {formData.address && <div>{formData.address}</div>}
                            <div>{formData.city_state}{formData.country ? `, ${formData.country}` : ''}</div>
                            {formData.postal_code && <div>{formData.postal_code}</div>}
                          </td></tr>
                        )}
                        {formData.email && (
                          <tr><td style={{ paddingBottom: '4pt' }}>
                            <a href={`mailto:${formData.email}`} style={{ color: '#d1d5db', wordBreak: 'break-all' }}>{formData.email}</a>
                          </td></tr>
                        )}
                        {formData.phone && (
                          <tr><td style={{ paddingBottom: '4pt', color: '#d1d5db', ...bodyStyle }}>{formData.phone}</td></tr>
                        )}
                        {formData.linkedin && (
                          <tr><td style={{ paddingBottom: '4pt' }}>
                            <a href={formData.linkedin} target="_blank" style={{ color: '#d1d5db' }}>LinkedIn</a>
                          </td></tr>
                        )}
                        {formData.github && (
                          <tr><td style={{ paddingBottom: '4pt' }}>
                            <a href={formData.github} target="_blank" style={{ color: '#d1d5db' }}>GitHub</a>
                          </td></tr>
                        )}
                        {formData.stackoverflow && (
                          <tr><td style={{ paddingBottom: '4pt' }}>
                            <a href={formData.stackoverflow} target="_blank" style={{ color: '#d1d5db' }}>Stack Overflow</a>
                          </td></tr>
                        )}
                        {formData.leetcode && (
                          <tr><td style={{ paddingBottom: '4pt' }}>
                            <a href={formData.leetcode} target="_blank" style={{ color: '#d1d5db' }}>LeetCode</a>
                          </td></tr>
                        )}
                        {formData.driving_licence && (
                          <tr><td style={{ paddingBottom: '4pt', color: '#d1d5db', ...bodyStyle }}>
                            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase' }}>Driving License</div>
                            <div>{formData.driving_licence}</div>
                          </td></tr>
                        )}
                        {formData.nationality && (
                          <tr><td style={{ paddingBottom: '4pt', color: '#d1d5db', ...bodyStyle }}>
                            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase' }}>Nationality</div>
                            <div>{formData.nationality}</div>
                          </td></tr>
                        )}
                        {formData.birth_place && (
                          <tr><td style={{ paddingBottom: '4pt', color: '#d1d5db', ...bodyStyle }}>
                            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase' }}>Place of Birth</div>
                            <div>{formData.birth_place}</div>
                          </td></tr>
                        )}
                        {formData.dob && (
                          <tr><td style={{ paddingBottom: '4pt', color: '#d1d5db', ...bodyStyle }}>
                            <div style={{ fontSize: `${text.body - 1}pt`, color: '#9ca3af', textTransform: 'uppercase' }}>Date of Birth</div>
                            <div>{formData.dob}</div>
                          </td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Sidebar sections */}
                {renderSidebarContent()}
              </td>

              {/* ── RIGHT MAIN CONTENT ── */}
              <td style={mainStyle}>
                {renderMainContent()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Professional;


// 'use client';
// import React from 'react';

// const Professional = ({ formData, sections, sectionOrder, themeColor, resumeSettings }) => {
//   const { text, layout } = resumeSettings;

//   // ── Helpers ──────────────────────────────────────────────────────────────
//   const formatDate = (dateValue) => {
//     if (!dateValue) return null;
//     if (typeof dateValue === 'string' && dateValue.toLowerCase() === 'present') return 'Present';
//     const d = new Date(dateValue);
//     if (isNaN(d.getTime())) return null;
//     return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
//   };

//   const dateRange = (startDate, endDate) => {
//     const start = formatDate(startDate);
//     const end = formatDate(endDate);
//     if (start && end) return `${start} — ${end}`;
//     return start || end || '';
//   };

//   const skillLevels = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];

//   const hasContactInfo =
//     formData.email || formData.phone || formData.address ||
//     formData.city_state || formData.postal_code ||
//     formData.driving_licence || formData.nationality || formData.country;

//   // ── Shared heading styles ─────────────────────────────────────────────────
//   const mainHeadingStyle = {
//     fontSize: `${text.sectionTitle}pt`,
//     fontWeight: text.sectionTitleWeight,
//     fontFamily: text.secondaryFont,
//     borderBottom: '1px solid #e5e7eb',
//     paddingBottom: '4px',
//     marginBottom: `${layout.betweenTitlesContent}pt`,
//     marginTop: `${layout.betweenSections}pt`,
//     color: '#111827',
//     textTransform: 'uppercase',
//     letterSpacing: '0.05em',
//   };

//   const sideHeadingStyle = {
//     fontSize: `${text.sectionTitle}pt`,
//     fontWeight: text.sectionTitleWeight,
//     fontFamily: text.secondaryFont,
//     marginBottom: '8px',
//     color: '#fff',
//     textTransform: 'uppercase',
//     letterSpacing: '0.05em',
//   };

//   const bodyStyle = { fontSize: `${text.body}pt`, fontWeight: text.bodyWeight, fontFamily: text.primaryFont, };

//   // ════════════════════════════════════════════════════════════════════════
//   //  SIDEBAR RENDERERS
//   // ════════════════════════════════════════════════════════════════════════

//   // ── Sidebar: Scratch ────────────────────────────────────────────────────
//   const renderSkillsScratch = () => {
//     const hasSkills = formData.newSkillHistory?.some(s => s.skill);
//     if (!hasSkills) return null;
//     const hideLevel = formData.hideExperienceLevel;
//     return (
//       <div key="skills" className="w-full text-start">
//         <h3 style={sideHeadingStyle}>
//           {formData.skillSectionTitle || 'Skills'}
//         </h3>
//         <div className="flex flex-col gap-3">
//           {formData.newSkillHistory.map((item, i) => {
//             const pct = ((item.level ?? 3) + 1) * 20;
//             return (
//               <div key={i} className="w-full">
//                 <div className="text-xs text-white mb-1.5" style={bodyStyle}>{item.skill}</div>
//                 {!hideLevel && (
//                   <div className="w-full bg-white/20 h-[2px] rounded-full overflow-hidden">
//                     <div className="bg-white h-full" style={{ width: `${pct}%` }} />
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const renderHobbiesScratch = () =>
//     formData.hobbies ? (
//       <div key="hobbies" className="w-full text-start">
//         <h3 style={sideHeadingStyle}>{formData.hobbiesSectionTitle || 'Hobbies'}</h3>
//         <p className="text-xs text-gray-300 font-light whitespace-pre-wrap leading-relaxed" style={bodyStyle}>
//           {formData.hobbies}
//         </p>
//       </div>
//     ) : null;

//   const renderLanguagesScratch = () => {
//     if (!formData.languageHistory?.some(l => l.language)) return null;
//     const profMap = {
//       'Native speaker': 100, 'Highly proficient': 80,
//       'Very good command': 60, 'Good working knowledge': 40, 'Working knowledge': 20,
//     };
//     return (
//       <div key="languages" className="w-full text-start">
//         <h3 style={sideHeadingStyle}>{formData.languagesSectionTitle || 'Languages'}</h3>
//         <div className="flex flex-col gap-3">
//           {formData.languageHistory.map((item, i) => (
//             <div key={i} className="w-full">
//               <div className="text-xs text-white mb-1.5" style={bodyStyle}>
//                 {item.language}
//                 {!formData.hideLanguageProficiency && item.level ? ` (${item.level})` : ''}
//               </div>
//               {!formData.hideLanguageProficiency && (
//                 <div className="w-full bg-white/20 h-[2px] rounded-full overflow-hidden">
//                   <div className="bg-white h-full" style={{ width: `${profMap[item.level] ?? 20}%` }} />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // ── Sidebar: Sections (improve/jd/linkedin) ─────────────────────────────
//   const renderSkillsFromSection = (section) => {
//     const showLevel = section.hideExperienceLevel === false;
//     return (
//       <div key={section.id} className="w-full text-start">
//         <h3 style={sideHeadingStyle}>{section.title}</h3>
//         <div className="flex flex-col gap-3">
//           {section.skills?.map((skill, i) => {
//             const pct = ((skill.level ?? 3) + 1) * 20;
//             return (
//               <div key={skill.id || i} className="w-full">
//                 <div className="text-xs text-white mb-1.5" style={bodyStyle}>{skill.name}</div>
//                 {showLevel && (
//                   <div className="w-full bg-white/20 h-[2px] rounded-full overflow-hidden">
//                     <div className="bg-white h-full" style={{ width: `${pct}%` }} />
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const renderLanguagesFromSection = (section) => {
//     if (!section.languages?.length) return null;
//     const profMap = {
//       'Native speaker': 100, 'Highly proficient': 80,
//       'Very good command': 60, 'Good working knowledge': 40, 'Working knowledge': 20,
//     };
//     return (
//       <div key={section.id} className="w-full text-start">
//         <h3 style={sideHeadingStyle}>{section.title}</h3>
//         <div className="flex flex-col gap-3">
//           {section.languages.map((l, i) => (
//             <div key={i} className="w-full">
//               <div className="text-xs text-white mb-1.5" style={bodyStyle}>
//                 {l.language}
//                 {!section.hideProficiency && l.level ? ` (${l.level})` : ''}
//               </div>
//               {!section.hideProficiency && (
//                 <div className="w-full bg-white/20 h-[2px] rounded-full overflow-hidden">
//                   <div className="bg-white h-full" style={{ width: `${profMap[l.level] ?? 20}%` }} />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // ════════════════════════════════════════════════════════════════════════
//   //  MAIN CONTENT RENDERERS — SCRATCH
//   // ════════════════════════════════════════════════════════════════════════

//   const renderSummaryScratch = () =>
//     formData.summary ? (
//       <section key="summary">
//         <h2 style={mainHeadingStyle}>{formData.summarySectionTitle || 'Profile'}</h2>
//         <div
//           className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//           style={bodyStyle}
//           dangerouslySetInnerHTML={{ __html: formData.summary }}
//         />
//       </section>
//     ) : null;

//   const renderEmploymentScratch = () => {
//     const hasEmp = formData.employmentHistory?.some(j => j.job_title || j.employer);
//     if (!hasEmp) return null;
//     return (
//       <section key="employment">
//         <h2 style={mainHeadingStyle}>{formData.employmentSectionTitle || 'Employment History'}</h2>
//         <div className="flex flex-col gap-4">
//           {formData.employmentHistory.map((job, i) => (
//             <div key={i}>
//               <h3 className="font-bold text-black" style={bodyStyle}>
//                 {job.job_title}{job.employer ? `, ${job.employer}` : ''}{job.city_state ? `, ${job.city_state}` : ''}
//               </h3>
//               {dateRange(job.startDate, job.endDate) && (
//                 <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                   {dateRange(job.startDate, job.endDate)}
//                 </div>
//               )}
//               {job.description && (
//                 <div
//                   className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic"
//                   style={bodyStyle}
//                   dangerouslySetInnerHTML={{ __html: job.description }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   };

//   const renderEducationScratch = () => {
//     const hasEdu = formData.educationHistory?.some(e => e.school || e.degree);
//     if (!hasEdu) return null;
//     return (
//       <section key="education">
//         <h2 style={mainHeadingStyle}>{formData.educationSectionTitle || 'Education'}</h2>
//         <div className="flex flex-col gap-4">
//           {formData.educationHistory.map((edu, i) => (
//             <div key={i}>
//               <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
//                 {edu.degree}{edu.school ? `, ${edu.school}` : ''}{edu.city_state ? `, ${edu.city_state}` : ''}
//               </h3>
//               {dateRange(edu.startDate, edu.endDate) && (
//                 <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                   {dateRange(edu.startDate, edu.endDate)}
//                 </div>
//               )}
//               {edu.description && (
//                 <div
//                   className="text-gray-700 mt-1 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//                   style={bodyStyle}
//                   dangerouslySetInnerHTML={{ __html: edu.description }}
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   };

//   const renderCoursesScratch = () => {
//     if (!formData.coursesHistory?.some(c => c.course || c.institution)) return null;
//     return (
//       <section key="courses">
//         <h2 style={mainHeadingStyle}>{formData.coursesSectionTitle || 'Courses'}</h2>
//         <div className="flex flex-col gap-4">
//           {formData.coursesHistory.map((course, i) => (
//             <div key={i}>
//               <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
//                 {course.course}{course.institution ? `, ${course.institution}` : ''}
//               </h3>
//               {dateRange(course.startDate, course.endDate) && (
//                 <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                   {dateRange(course.startDate, course.endDate)}
//                 </div>
//               )}
//               {course.description && (
//                 <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1" style={bodyStyle}>
//                   {course.description}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   };

//   const renderActivitiesScratch = () => {
//     if (!formData.activityHistory?.some(a => a.functionTitle || a.employer)) return null;
//     return (
//       <section key="activities">
//         <h2 style={mainHeadingStyle}>{formData.activitiesSectionTitle || 'Extra-curricular Activities'}</h2>
//         <div className="flex flex-col gap-4">
//           {formData.activityHistory.map((a, i) => (
//             <div key={i}>
//               <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
//                 {a.functionTitle}{a.employer ? `, ${a.employer}` : ''}{a.city ? `, ${a.city}` : ''}
//               </h3>
//               {dateRange(a.startDate, a.endDate) && (
//                 <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                   {dateRange(a.startDate, a.endDate)}
//                 </div>
//               )}
//               {a.description && (
//                 <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1" style={bodyStyle}>{a.description}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   };

//   const renderInternshipsScratch = () => {
//     if (!formData.internshipHistory?.some(i => i.jobTitle || i.employer)) return null;
//     return (
//       <section key="internships">
//         <h2 style={mainHeadingStyle}>{formData.internshipsSectionTitle || 'Internships'}</h2>
//         <div className="flex flex-col gap-4">
//           {formData.internshipHistory.map((intern, i) => (
//             <div key={i}>
//               <h3 className="font-bold text-black" style={bodyStyle}>
//                 {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ''}{intern.city ? `, ${intern.city}` : ''}
//               </h3>
//               {dateRange(intern.startDate, intern.endDate) && (
//                 <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                   {dateRange(intern.startDate, intern.endDate)}
//                 </div>
//               )}
//               {intern.description && (
//                 <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed" style={bodyStyle}>
//                   {intern.description}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>
//     );
//   };

//   const renderScratchSimpleCustomSections = () =>
//     Object.keys(formData)
//       .filter(key => key.startsWith('customSimpleHistory_custom_simple_'))
//       .map(key => {
//         const sectionId = key.replace('customSimpleHistory_', '');
//         const history = formData[key];
//         const title = formData[`customSimpleTitle_${sectionId}`] || 'Custom Section';
//         const hideLevel = formData[`customSimpleHideLevel_${sectionId}`] ?? true;
//         if (!history?.some(i => i.name)) return null;
//         return (
//           <section key={sectionId}>
//             <h2 style={mainHeadingStyle}>{title}</h2>
//             <div className="grid grid-cols-2 gap-x-8 mt-2" style={bodyStyle}>
//               {history.map((item, idx) => (
//                 <div key={idx} className="flex justify-between border-b border-gray-100 pb-1">
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

//   const renderScratchAdvancedCustomSections = () =>
//     Object.keys(formData)
//       .filter(key => key.startsWith('customAdvancedHistory_custom_advanced_'))
//       .map(key => {
//         const sectionId = key.replace('customAdvancedHistory_', '');
//         const history = formData[key];
//         const title = formData[`customAdvancedTitle_${sectionId}`] || 'Custom Section';
//         if (!history?.some(i => i.title || i.city)) return null;
//         return (
//           <section key={sectionId}>
//             <h2 style={mainHeadingStyle}>{title}</h2>
//             <div className="flex flex-col gap-4" style={bodyStyle}>
//               {history.map((item, idx) => (
//                 <div key={idx}>
//                   <h3 className="font-bold text-black">
//                     {item.title}{item.city ? `, ${item.city}` : ''}
//                   </h3>
//                   {dateRange(item.startDate, item.endDate) && (
//                     <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                       {dateRange(item.startDate, item.endDate)}
//                     </div>
//                   )}
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

//   // ════════════════════════════════════════════════════════════════════════
//   //  MAIN CONTENT RENDERERS — SECTIONS (improve / jd / linkedin)
//   // ════════════════════════════════════════════════════════════════════════

//   const renderSummaryFromSection = (section) => (
//     <section key={section.id}>
//       <h2 style={mainHeadingStyle}>{section.title}</h2>
//       <div
//         className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//         style={bodyStyle}
//         dangerouslySetInnerHTML={{ __html: section.summary }}
//       />
//     </section>
//   );

//   const renderExperienceFromSection = (section) => (
//     <section key={section.id}>
//       <h2 style={mainHeadingStyle}>{section.title}</h2>
//       <div className="flex flex-col gap-4">
//         {section.experiences?.map((exp, i) => (
//           <div key={exp.id || i}>
//             <h3 className="font-bold text-black" style={bodyStyle}>
//               {exp.jobTitle}{exp.company ? `, ${exp.company}` : ''}{exp.city ? `, ${exp.city}` : ''}
//             </h3>
//             {dateRange(exp.startDate, exp.endDate) && (
//               <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                 {dateRange(exp.startDate, exp.endDate)}
//               </div>
//             )}
//             {exp.description && (
//               <div
//                 className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic"
//                 style={bodyStyle}
//                 dangerouslySetInnerHTML={{ __html: exp.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderEducationFromSection = (section) => (
//     <section key={section.id}>
//       <h2 style={mainHeadingStyle}>{section.title}</h2>
//       <div className="flex flex-col gap-4">
//         {section.educations?.map((edu, i) => (
//           <div key={edu.id || i}>
//             <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
//               {edu.degree}{edu.institute ? `, ${edu.institute}` : ''}{edu.city ? `, ${edu.city}` : ''}
//             </h3>
//             {dateRange(edu.startDate, edu.endDate) && (
//               <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                 {dateRange(edu.startDate, edu.endDate)}
//               </div>
//             )}
//             {edu.description && (
//               <div
//                 className="text-gray-700 mt-1 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//                 style={bodyStyle}
//                 dangerouslySetInnerHTML={{ __html: edu.description }}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderCertificationsFromSection = (section) => (
//     <section key={section.id}>
//       <h2 style={mainHeadingStyle}>{section.title}</h2>
//       <div className="flex flex-col gap-4">
//         {section.certifications?.map((cert, i) => (
//           <div key={cert.id || i}>
//             <h3 className="font-bold text-black" style={bodyStyle}>
//               {cert.name}{cert.organization ? `, ${cert.organization}` : ''}
//             </h3>
//             {(cert.startYear || cert.endYear) && (
//               <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                 {cert.startYear && cert.endYear
//                   ? `${cert.startYear} — ${cert.endYear}`
//                   : cert.startYear || cert.endYear}
//               </div>
//             )}
//             {cert.description && (
//               <p className="text-gray-700 mt-1" style={bodyStyle}>{cert.description}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderCoursesFromSection = (section) => (
//     <section key={section.id}>
//       <h2 style={mainHeadingStyle}>{section.title}</h2>
//       <div className="flex flex-col gap-4">
//         {section.courses?.map((course, i) => (
//           <div key={course.id || i}>
//             <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
//               {course.course}{course.institution ? `, ${course.institution}` : ''}
//             </h3>
//             {dateRange(course.startDate, course.endDate) && (
//               <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                 {dateRange(course.startDate, course.endDate)}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderInternshipsFromSection = (section) => (
//     <section key={section.id}>
//       <h2 style={mainHeadingStyle}>{section.title}</h2>
//       <div className="flex flex-col gap-4">
//         {section.internships?.map((intern, i) => (
//           <div key={intern.id || i}>
//             <h3 className="font-bold text-black" style={bodyStyle}>
//               {intern.jobTitle}{intern.employer ? `, ${intern.employer}` : ''}{intern.city ? `, ${intern.city}` : ''}
//             </h3>
//             {dateRange(intern.startDate, intern.endDate) && (
//               <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                 {dateRange(intern.startDate, intern.endDate)}
//               </div>
//             )}
//             {intern.description && (
//               <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed" style={bodyStyle}>
//                 {intern.description}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderActivitiesFromSection = (section) => (
//     <section key={section.id}>
//       <h2 style={mainHeadingStyle}>{section.title}</h2>
//       <div className="flex flex-col gap-4">
//         {section.activities?.map((a, i) => (
//           <div key={a.id || i}>
//             <h3 className="font-bold text-black leading-tight" style={bodyStyle}>
//               {a.functionTitle}{a.employer ? `, ${a.employer}` : ''}{a.city ? `, ${a.city}` : ''}
//             </h3>
//             {dateRange(a.startDate, a.endDate) && (
//               <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                 {dateRange(a.startDate, a.endDate)}
//               </div>
//             )}
//             {a.description && (
//               <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1" style={bodyStyle}>{a.description}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </section>
//   );

//   const renderHobbiesFromSection = (section) =>
//     section.hobbies ? (
//       <section key={section.id}>
//         <h2 style={mainHeadingStyle}>{section.title}</h2>
//         <p className="text-gray-700" style={bodyStyle}>{section.hobbies}</p>
//       </section>
//     ) : null;

//   const renderCustomSimpleFromSection = (section) => {
//     const showLevel = section.hideExperienceLevel === false;
//     return (
//       <section key={section.id}>
//         <h2 style={mainHeadingStyle}>{section.title}</h2>
//         <div className="grid grid-cols-2 gap-x-8 mt-2" style={bodyStyle}>
//           {section.items?.map((item, i) => {
//             const name = typeof item === 'object' ? (item.name || item.title) : item;
//             const level = typeof item === 'object' ? (item.level ?? 2) : 2;
//             return (
//               <div key={i} className="flex justify-between border-b border-gray-100 pb-1">
//                 <span className="text-gray-800">{name}</span>
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
//       <h2 style={mainHeadingStyle}>{section.title}</h2>
//       <div className="flex flex-col gap-4" style={bodyStyle}>
//         {section.items?.map((item, i) => (
//           <div key={item.id || i}>
//             <h3 className="font-bold text-black">
//               {item.title}{item.city ? `, ${item.city}` : ''}
//             </h3>
//             {dateRange(item.startDate, item.endDate) && (
//               <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                 {dateRange(item.startDate, item.endDate)}
//               </div>
//             )}
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

//   // ════════════════════════════════════════════════════════════════════════
//   //  SIDEBAR / MAIN SPLIT LOGIC
//   //  sidebar types: skills, hobbies, languages
//   //  main types: everything else
//   // ════════════════════════════════════════════════════════════════════════

//   const SIDEBAR_TYPES = new Set(['skills', 'hobbies', 'languages']);

//   const renderSidebarContent = () => {
//     // ── sections mode ──
//     if (sections && sections.length > 0) {
//       return sections
//         .filter(s => SIDEBAR_TYPES.has(s.type))
//         .map(section => {
//           switch (section.type) {
//             case 'skills': return renderSkillsFromSection(section);
//             case 'hobbies': return renderHobbiesFromSection(section);
//             case 'languages': return renderLanguagesFromSection(section);
//             default: return null;
//           }
//         });
//     }

//     // ── scratch mode ──
//     const order = sectionOrder || [
//       'summary', 'employment', 'education', 'skills',
//       'courses', 'hobbies', 'activities', 'languages', 'internships',
//     ];
//     const sidebarRenderers = {
//       skills: renderSkillsScratch,
//       hobbies: renderHobbiesScratch,
//       languages: renderLanguagesScratch,
//     };
//     return order.map(id => sidebarRenderers[id]?.() ?? null);
//   };

//   const renderMainContent = () => {
//     // ── sections mode ──
//     if (sections && sections.length > 0) {
//       return sections
//         .filter(s => !SIDEBAR_TYPES.has(s.type))
//         .map(section => {
//           switch (section.type) {
//             case 'summary': return renderSummaryFromSection(section);
//             case 'experience': return renderExperienceFromSection(section);
//             case 'education': return renderEducationFromSection(section);
//             case 'certifications': return renderCertificationsFromSection(section);
//             case 'courses': return renderCoursesFromSection(section);
//             case 'internships': return renderInternshipsFromSection(section);
//             case 'activities': return renderActivitiesFromSection(section);
//             case 'hobbies': return renderHobbiesFromSection(section); // fallback if not in sidebar
//             case 'custom_simple': return renderCustomSimpleFromSection(section);
//             case 'custom': return renderCustomAdvancedFromSection(section);
//             default: return null;
//           }
//         });
//     }

//     // ── scratch mode ──
//     const order = sectionOrder || [
//       'summary', 'employment', 'education', 'skills',
//       'courses', 'hobbies', 'activities', 'languages', 'internships',
//     ];

//     const mainRenderers = {
//       summary: renderSummaryScratch,
//       employment: renderEmploymentScratch,
//       education: renderEducationScratch,
//       courses: renderCoursesScratch,
//       activities: renderActivitiesScratch,
//       internships: renderInternshipsScratch,
//     };

//     return [
//       ...order
//         .filter(id => !SIDEBAR_TYPES.has(id))
//         .map(id => {
//           if (typeof id === 'string' && id.startsWith('custom_simple_')) {
//             const history = formData[`customSimpleHistory_${id}`];
//             const title = formData[`customSimpleTitle_${id}`] || 'Custom Section';
//             const hideLevel = formData[`customSimpleHideLevel_${id}`] ?? true;
//             if (!history?.some(i => i.name)) return null;
//             return (
//               <section key={id}>
//                 <h2 style={mainHeadingStyle}>{title}</h2>
//                 <div className="grid grid-cols-2 gap-x-8 mt-2" style={bodyStyle}>
//                   {history.map((item, idx) => (
//                     <div key={idx} className="flex justify-between border-b border-gray-100 pb-1">
//                       <span className="text-gray-800">{item.name}</span>
//                       {!hideLevel && <span className="text-gray-400 text-[10px] uppercase">{skillLevels[item.level ?? 2]}</span>}
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             );
//           }

//           if (typeof id === 'string' && id.startsWith('custom_advanced_')) {
//             const history = formData[`customAdvancedHistory_${id}`];
//             const title = formData[`customAdvancedTitle_${id}`] || 'Custom Section';
//             if (!history?.some(i => i.title || i.city)) return null;
//             return (
//               <section key={id}>
//                 <h2 style={mainHeadingStyle}>{title}</h2>
//                 <div className="flex flex-col gap-4" style={bodyStyle}>
//                   {history.map((item, idx) => (
//                     <div key={idx}>
//                       <h3 className="font-bold text-black">{item.title}{item.city ? `, ${item.city}` : ''}</h3>
//                       {dateRange(item.startDate, item.endDate) && (
//                         <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
//                           {dateRange(item.startDate, item.endDate)}
//                         </div>
//                       )}
//                       {item.description && (
//                         <div
//                           className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
//                           dangerouslySetInnerHTML={{ __html: item.description }}
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             );
//           }

//           return mainRenderers[id]?.() ?? null;
//         }),
//       ...renderScratchSimpleCustomSections(),
//       ...renderScratchAdvancedCustomSections(),
//     ];
//   };

//   // ════════════════════════════════════════════════════════════════════════
//   //  RENDER
//   // ════════════════════════════════════════════════════════════════════════
//   return (
//     <div className="h-screen overflow-y-auto hide-scrollbar">
//       <div
//         className="min-h-[297mm] bg-white shadow-xl flex resume-root"
//         style={{
//           fontFamily: text.primaryFont,
//           lineHeight: text.lineHeight,
//           fontSize: text.fontSize,
//         }}
//       >
//         {/* ── LEFT SIDEBAR ── */}
//         <div
//           className="w-[35%] text-white px-5 py-10 flex flex-col gap-6 items-center text-center"
//           style={{ backgroundColor: themeColor }}
//         >
//           {/* Profile Image */}
//           {formData.profileImage && (
//             <div className="w-30 h-30 rounded-full overflow-hidden border-2 border-white shadow-lg">
//               <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
//             </div>
//           )}

//           {/* Name + Title */}
//           <div className="w-full flex flex-col items-center">
//             <h1
//               className=""
//               style={{
//                 fontFamily: text.secondaryFont,
//                 fontSize: `${text.primaryHeading}pt`,
//                 fontWeight: text.primaryHeadingWeight,
//               }}
//             >
//               {formData.first_name} {formData.last_name}
//             </h1>
//             <div className="w-6 h-[1px] bg-white/40 my-2" />
//             {formData.job_target && (
//               <p
//                 className="uppercase tracking-widest text-white/80"
//                 style={{ fontSize: `${text.secondaryHeading}pt`, fontWeight: text.secondaryHeadingWeight }}
//               >
//                 {formData.job_target}
//               </p>
//             )}
//           </div>

//           {/* Contact Details */}
//           {hasContactInfo && (
//             <div className="w-full flex flex-col items-start">
//               <h3 style={sideHeadingStyle}>Details</h3>
//               <div className="flex flex-col gap-2 text-xs text-gray-300 font-light items-start text-left" style={bodyStyle}>
//                 {(formData.address || formData.city_state) && (
//                   <div>
//                     {formData.address && <span className="block">{formData.address}</span>}
//                     <span className="block">
//                       {formData.city_state}{formData.country ? `, ${formData.country}` : ''}
//                     </span>
//                     {formData.postal_code && <span className="block">{formData.postal_code}</span>}
//                   </div>
//                 )}
//                 {formData.email && (
//                   <a href={`mailto:${formData.email}`} className="break-all hover:text-white border-b border-gray-400 pb-0.5">
//                     {formData.email}
//                   </a>
//                 )}
//                 {formData.phone && <span>{formData.phone}</span>}
//                 {formData.linkedin && (
//                   <a href={formData.linkedin} target="_blank" className="break-all hover:text-white">
//                     LinkedIn
//                   </a>
//                 )}
//                 {formData.github && (
//                   <a href={formData.github} target="_blank" className="break-all hover:text-white">
//                     GitHub
//                   </a>
//                 )}
//                 {formData.stackoverflow && (
//                   <a href={formData.stackoverflow} target="_blank" className="break-all hover:text-white">
//                     Stack Overflow
//                   </a>
//                 )}
//                 {formData.leetcode && (
//                   <a href={formData.leetcode} target="_blank" className="break-all hover:text-white">
//                     LeetCode
//                   </a>
//                 )}
//                 {formData.driving_licence && (
//                   <div className="mt-1 text-start">
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

//           {/* Sidebar sections (skills, hobbies, languages) */}
//           {renderSidebarContent()}
//         </div>

//         {/* ── RIGHT MAIN CONTENT ── */}
//         <div
//           className="w-[65%] !py-5 !px-8 flex flex-col  text-gray-800"
//           style={{
//             paddingTop: `${layout.topBottom}pt`,
//             paddingBottom: `${layout.topBottom}pt`,
//             paddingLeft: `${layout.leftRight}pt`,
//             paddingRight: `${layout.leftRight}pt`,
//           }}
//         >
//           {renderMainContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Professional;
