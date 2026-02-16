"use client";
import React from "react";

const PrimeATS = ({ formData, sections, sectionOrder, themeColor, resumeSettings }) => {
  console.log('sections', sections);
  const { text, layout } = resumeSettings;

  const formatDate = (dateValue) => {
    if (!dateValue) return null;

    if (typeof dateValue === "string" && dateValue.toLowerCase() === "present") {
      return "Present";
    }

    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return null;

    return d.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const hasContactInfo =
    formData.email ||
    formData.phone ||
    formData.address ||
    formData.city_state ||
    formData.postal_code ||
    formData.driving_licence ||
    formData.nationality ||
    formData.country;

  const hasEmployment = formData.employmentHistory?.some(
    (job) => job.job_title || job.employer,
  );
  const hasEducation = formData.educationHistory?.some(
    (edu) => edu.school || edu.degree,
  );
  const hasSkills = formData.newSkillHistory?.some((s) => s.skill);

  // ===================== SCRATCH RESUME RENDERERS (FIXED) =====================

  const renderSummary = () =>
    formData.summary && (
      <section key="summary">
        <h3
          className="font-bold uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            marginTop: `${layout.betweenSections}pt`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          Profile
        </h3>
        <div
          className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
          style={{
            fontSize: `${text.body}pt`,
            fontWeight: text.bodyWeight
          }}
          dangerouslySetInnerHTML={{ __html: formData.summary }}
        />
      </section>
    );

  const renderEmployment = () =>
    hasEmployment && (
      <section key="employment">
        <h3
          className="font-bold py-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginTop: `${layout.betweenSections}pt`,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          {formData.employmentSectionTitle || "Professional Experience"}
        </h3>
        <div
          className="flex flex-col gap-4"
          style={{
            fontSize: `${text.body}pt`,
            fontWeight: text.bodyWeight
          }}
        >
          {formData.employmentHistory.map((job, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <div className="w-1/2">
                  <h4 className="font-bold text-black">
                    {job.job_title}
                    {job.employer ? `, ${job.employer}` : ""}
                    <span className="font-normal text-gray-600 ml-1">
                      {job.city_state ? `, ${job.city_state}` : ""}
                    </span>
                  </h4>
                </div>
                <div className="w-1/2 text-right">
                  <span className="font-bold text-black">
                    {formatDate(job.startDate)}
                    {job.endDate && (
                      <>
                        {" — "}
                        {formatDate(job.endDate)}
                      </>
                    )}
                  </span>
                </div>
              </div>
              {job.description && (
                <div
                  className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderEducation = () =>
    hasEducation && (
      <section key="education">
        <h3
          className="font-bold mb-3 py-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginTop: `${layout.betweenSections}pt`,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          {formData.educationSectionTitle || "Education"}
        </h3>
        <div
          className="flex flex-col gap-4"
          style={{
            fontSize: `${text.body}pt`,
            fontWeight: text.bodyWeight
          }}
        >
          {formData.educationHistory.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <div className="w-1/2">
                  <h4 className="font-bold text-black">
                    {edu.degree}
                    {edu.school ? `, ${edu.school}` : ""}
                    <span className="font-normal text-gray-600 ml-1">
                      {edu.city_state ? `, ${edu.city_state}` : ""}
                    </span>
                  </h4>
                </div>
                <div className="w-1/2 text-right">
                  <span className="font-bold text-black">
                    {formatDate(edu.startDate)}
                    {edu.endDate && (
                      <>
                        {" — "}
                        {formatDate(edu.endDate)}
                      </>
                    )}
                  </span>
                </div>
              </div>
              {edu.description && (
                <div
                  className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic"
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderSkills = () => {
    const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
    
    return hasSkills && (
      <section key="skills">
        <h3
          className="font-bold mb-2 py-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginTop: `${layout.betweenSections}pt`,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          {formData.skillSectionTitle || "Skills"}
        </h3>
        <div
          className="grid grid-cols-2 gap-x-8 mt-2"
          style={{
            fontSize: `${text.body}pt`,
            fontWeight: text.bodyWeight
          }}
        >
          {formData.newSkillHistory.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-100 pb-1"
            >
              <span className="text-gray-800">{item.skill}</span>
              {!formData.hideExperienceLevel && (
                <span className="text-gray-400 text-[10px] uppercase">
                  {typeof item.level === 'number' 
                    ? skillLevels[item.level] 
                    : (item.level || "Expert")}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };


  const renderHobbies = () =>
    formData.hobbies && (
      <section key="hobbies">
        <h3
          className="font-bold mb-2 py-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginTop: `${layout.betweenSections}pt`,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          Hobbies
        </h3>
        <p className="text-xs text-gray-700">{formData.hobbies}</p>
      </section>
    );

  const renderLanguages = () =>
    formData.languageHistory?.some((l) => l.language) &&
    formData.languageHistory?.length > 0 && (
      <section key="languages">
        <h3
          className="font-bold mb-2 py-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginTop: `${layout.betweenSections}pt`,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          Languages
        </h3>
        <div className="text-xs flex flex-wrap gap-2">
          {formData.languageHistory.map((l, i) => (
            <span
              key={i}
              className="bg-gray-100 px-2 py-0.5 rounded text-gray-700"
            >
              {l.language} {!formData.hideLanguageProficiency && l.level ? `(${l.level})` : ""}
            </span>
          ))}
        </div>
      </section>
    );

  const renderCourses = () =>
    formData.coursesHistory?.some((c) => c.course || c.institution) &&
    formData.coursesHistory.length > 0 && (
      <section key="courses">
        <h3
          className="font-bold mb-3 pb-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginTop: `${layout.betweenSections}pt`,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          Courses
        </h3>
        <div className="flex flex-col gap-4">
          {formData.coursesHistory.map((course, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <h4 className="text-xs font-bold text-black">
                  {course.course}
                  {course.institution ? `, ${course.institution}` : ""}
                </h4>
                <span className="text-[10px] font-bold text-black">
                  {formatDate(course.startDate)}
                  {course.endDate && (
                    <>
                      {" — "}
                      {formatDate(course.endDate)}
                    </>
                  )}
                </span>
              </div>
              {course.description && (
                <p className="text-[11px] mt-1 text-gray-700 whitespace-pre-wrap leading-normal">
                  {course.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderActivities = () =>
    formData.activityHistory?.some((a) => a.functionTitle || a.employer) &&
    formData.activityHistory.length > 0 && (
      <section key="activities">
        <h3
          className="font-bold mb-3 pb-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginTop: `${layout.betweenSections}pt`,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          Extra-curricular Activities
        </h3>
        <div className="flex flex-col gap-4">
          {formData.activityHistory.map((activity, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <h4 className="text-xs font-bold text-black">
                  {activity.functionTitle}
                  {activity.employer ? `, ${activity.employer}` : ""}
                  {activity.city ? `, ${activity.city}` : ""}
                </h4>
                <span className="text-[10px] font-bold text-black">
                  {formatDate(activity.startDate)} — {formatDate(activity.endDate)}
                </span>
              </div>
              {activity.description && (
                <p className="text-[11px] mt-1 text-gray-700 whitespace-pre-wrap leading-normal">
                  {activity.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderInternships = () =>
    formData.internshipHistory?.some(
      (intern) => intern.jobTitle || intern.employer,
    ) &&
    formData.internshipHistory.length > 0 && (
      <section key="internships">
        <h3
          className="font-bold mb-3 pb-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginTop: `${layout.betweenSections}pt`,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          Internships
        </h3>
        <div className="flex flex-col gap-4">
          {formData.internshipHistory.map((intern, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <h4 className="text-xs font-bold text-black">
                  {intern.jobTitle}
                  {intern.employer ? `, ${intern.employer}` : ""}
                  {intern.city ? `, ${intern.city}` : ""}
                </h4>
                <span className="text-[10px] font-bold text-black">
                  {formatDate(intern.startDate)} — {formatDate(intern.endDate)}
                </span>
              </div>
              {intern.description && (
                <p className="text-[11px] mt-1 text-gray-700 whitespace-pre-wrap leading-normal">
                  {intern.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderCustom = () => (
    <>
      {Object.keys(formData)
        .filter((key) => key.startsWith("customSectionHistory_"))
        .map((key) => {
          const sectionId = key.replace("customSectionHistory_", "");
          const history = formData[key];
          const title =
            formData[`customSectionTitle_${sectionId}`] || "Custom Section";

          if (!history?.some((item) => item.activity || item.city)) return null;

          return (
            <section key={sectionId}>
              <h3
                className="font-bold mb-3 pb-1 uppercase tracking-wider"
                style={{
                  color: themeColor,
                  borderBottom: `1px solid ${themeColor}`,
                  borderTop: `1px solid ${themeColor}`,
                  fontFamily: text.secondaryFont,
                  fontSize: `${text.sectionTitle}pt`,
                  fontWeight: text.sectionTitleWeight,
                  marginTop: `${layout.betweenSections}pt`,
                  marginBottom: `${layout.betweenTitlesContent}pt`,
                }}
              >
                {title}
              </h3>
              <div className="flex flex-col gap-4">
                {history.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-black">
                        {item.activity}
                        {item.city ? `, ${item.city}` : ""}
                      </h4>
                      <span className="text-[10px] font-bold text-black">
                        {formatDate(item.startDate)} — {formatDate(item.endDate)}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-[11px] mt-1 text-gray-700 whitespace-pre-wrap leading-normal">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      {formData.customSectionHistory?.some(
        (item) => item.activity || item.city,
      ) && (
          <section key="custom-default">
            <h3
              className="font-bold mb-3 pb-1 uppercase tracking-wider"
              style={{
                color: themeColor,
                borderBottom: `1px solid ${themeColor}`,
                borderTop: `1px solid ${themeColor}`,
                fontFamily: text.secondaryFont,
                fontSize: `${text.sectionTitle}pt`,
                fontWeight: text.sectionTitleWeight,
                marginTop: `${layout.betweenSections}pt`,
                marginBottom: `${layout.betweenTitlesContent}pt`,
              }}
            >
              {formData.customSectionTitle || "Custom Section"}
            </h3>
            <div className="flex flex-col gap-4">
              {formData.customSectionHistory.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-black">
                      {item.activity}
                      {item.city ? `, ${item.city}` : ""}
                    </h4>
                    <span className="text-[10px] font-bold text-black">
                      {formatDate(item.startDate)} — {formatDate(item.endDate)}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-[11px] mt-1 text-gray-700 whitespace-pre-wrap leading-normal">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
    </>
  );

  // ===================== IMPROVE RESUME RENDERERS (DYNAMIC) =====================

  const renderSkillsFromSection = (section) => {
    const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

    return (
      <section key={section.id}>
        <h3
          className="font-bold mb-2 py-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginTop: `${layout.betweenSections}pt`,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          {section.title}
        </h3>
        <div
          className="grid grid-cols-2 gap-x-8 mt-2"
          style={{
            fontSize: `${text.body}pt`,
            fontWeight: text.bodyWeight
          }}
        >
          {section.skills?.map((skill, index) => (
            <div
              key={skill.id || index}
              className="flex justify-between border-b border-gray-100 pb-1"
            >
              <span className="text-gray-800">{skill.name}</span>
              {!section.hideExperienceLevel && (
                <span className="text-gray-400 text-[10px] uppercase">
                  {typeof skill.level === 'number'
                    ? skillLevels[skill.level]
                    : (skill.level || "Expert")}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSummaryFromSection = (section) => (
    <section key={section.id}>
      <h3
        className="font-bold uppercase tracking-wider"
        style={{
          color: themeColor,
          borderBottom: `1px solid ${themeColor}`,
          borderTop: `1px solid ${themeColor}`,
          marginTop: `${layout.betweenSections}pt`,
          fontFamily: text.secondaryFont,
          fontSize: `${text.sectionTitle}pt`,
          fontWeight: text.sectionTitleWeight,
          marginBottom: `${layout.betweenTitlesContent}pt`,
        }}
      >
        {section.title}
      </h3>
      <div
        className="text-xs leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
        style={{
          fontSize: `${text.body}pt`,
          fontWeight: text.bodyWeight
        }}
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
    </section>
  );

  const renderEducationFromSection = (section) => (
    <section key={section.id}>
      <h3
        className="font-bold mb-3 py-1 uppercase tracking-wider"
        style={{
          color: themeColor,
          borderBottom: `1px solid ${themeColor}`,
          borderTop: `1px solid ${themeColor}`,
          fontFamily: text.secondaryFont,
          fontSize: `${text.sectionTitle}pt`,
          fontWeight: text.sectionTitleWeight,
          marginTop: `${layout.betweenSections}pt`,
          marginBottom: `${layout.betweenTitlesContent}pt`,
        }}
      >
        {section.title}
      </h3>
      <div
        className="flex flex-col gap-4"
        style={{
          fontSize: `${text.body}pt`,
          fontWeight: text.bodyWeight
        }}
      >
        {section.educations?.map((edu, index) => (
          <div key={edu.id || index}>
            <div className="flex justify-between items-baseline">
              <div className="w-1/2">
                <h4 className="font-bold text-black">
                  {edu.degree}
                  {edu.institute ? `, ${edu.institute}` : ""}
                  <span className="font-normal text-gray-600 ml-1">
                    {edu.city ? `, ${edu.city}` : ""}
                  </span>
                </h4>
              </div>
              <div className="w-1/2 text-right">
                <span className="font-bold text-black">
                  {formatDate(edu.startDate)}
                  {edu.endDate && (
                    <>
                      {" — "}
                      {formatDate(edu.endDate)}
                    </>
                  )}
                </span>
              </div>
            </div>
            {edu.description && (
              <div
                className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: edu.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderExperienceFromSection = (section) => (
    <section key={section.id}>
      <h3
        className="font-bold py-1 uppercase tracking-wider"
        style={{
          color: themeColor,
          borderBottom: `1px solid ${themeColor}`,
          borderTop: `1px solid ${themeColor}`,
          fontFamily: text.secondaryFont,
          fontSize: `${text.sectionTitle}pt`,
          fontWeight: text.sectionTitleWeight,
          marginTop: `${layout.betweenSections}pt`,
          marginBottom: `${layout.betweenTitlesContent}pt`,
        }}
      >
        {section.title}
      </h3>
      <div
        className="flex flex-col gap-4"
        style={{
          fontSize: `${text.body}pt`,
          fontWeight: text.bodyWeight
        }}
      >
        {section.experiences?.map((exp, index) => (
          <div key={exp.id || index}>
            <div className="flex justify-between items-baseline">
              <div className="w-1/2">
                <h4 className="font-bold text-black">
                  {exp.jobTitle}
                  {exp.company ? `, ${exp.company}` : ""}
                  <span className="font-normal text-gray-600 ml-1">
                    {exp.city ? `, ${exp.city}` : ""}
                  </span>
                </h4>
              </div>
              <div className="w-1/2 text-right">
                <span className="font-bold text-black">
                  {formatDate(exp.startDate)}
                  {exp.endDate && (
                    <>
                      {" — "}
                      {formatDate(exp.endDate)}
                    </>
                  )}
                </span>
              </div>
            </div>
            {exp.description && (
              <div
                className="text-gray-700 mt-1 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderCertificationsFromSection = (section) => (
    <section key={section.id}>
      <h3
        className="font-bold py-1 uppercase tracking-wider"
        style={{
          color: themeColor,
          borderBottom: `1px solid ${themeColor}`,
          borderTop: `1px solid ${themeColor}`,
          fontFamily: text.secondaryFont,
          fontSize: `${text.sectionTitle}pt`,
          fontWeight: text.sectionTitleWeight,
          marginTop: `${layout.betweenSections}pt`,
          marginBottom: `${layout.betweenTitlesContent}pt`,
        }}
      >
        {section.title}
      </h3>
      <div
        className="flex flex-col gap-4"
        style={{
          fontSize: `${text.body}pt`,
          fontWeight: text.bodyWeight
        }}
      >
        {section.certifications?.map((cert, index) => (
          <div key={cert.id || index}>
            <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-black">
                {cert.name}
                {cert.organization ? `, ${cert.organization}` : ""}
              </h4>
              <span className="font-bold text-black">
                {cert.startYear && `${cert.startYear}`}
                {cert.endYear && ` — ${cert.endYear}`}
              </span>
            </div>
            {cert.description && (
              <p className="text-gray-700 mt-1">{cert.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );

  // ✅ NEW: Unified Custom Simple Section Renderer
  // Handles: custom_simple, core_competencies (both use same structure)
  const renderCustomSimpleSection = (section) => {
    const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
    
    return (
      <section key={section.id}>
        <h3
          className="font-bold mb-2 py-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
            marginTop: `${layout.betweenSections}pt`,
            marginBottom: `${layout.betweenTitlesContent}pt`,
          }}
        >
          {section.title}
        </h3>
        <div
          className="mt-2"
          style={{
            fontSize: `${text.body}pt`,
            fontWeight: text.bodyWeight
          }}
        >
          {section.items?.map((item, index) => {
            const displayName = typeof item === 'object' ? (item.name || item.title) : item;
            const level = typeof item === 'object' ? (item.level ?? 2) : 2;
            
            return (
              <div
                key={index}
                className="flex justify-between pb-1"
              >
                <span className="text-gray-800">{displayName}</span>
                {!section.hideExperienceLevel && (
                  <span className="text-gray-400 text-[10px] uppercase">
                    {skillLevels[level]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  // ✅ Custom Advanced Section (with full details)
  const renderCustomAdvancedSection = (section) => (
    <section key={section.id}>
      <h3
        className="font-bold py-1 uppercase tracking-wider"
        style={{
          color: themeColor,
          borderBottom: `1px solid ${themeColor}`,
          borderTop: `1px solid ${themeColor}`,
          fontFamily: text.secondaryFont,
          fontSize: `${text.sectionTitle}pt`,
          fontWeight: text.sectionTitleWeight,
          marginTop: `${layout.betweenSections}pt`,
          marginBottom: `${layout.betweenTitlesContent}pt`,
        }}
      >
        {section.title}
      </h3>
      <div
        className="flex flex-col gap-4"
        style={{
          fontSize: `${text.body}pt`,
          fontWeight: text.bodyWeight
        }}
      >
        {section.items?.map((item, index) => (
          <div key={item.id || index}>
            <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-black">
                {item.title}
                {item.city ? `, ${item.city}` : ""}
              </h4>
              <span className="font-bold text-black">
                {formatDate(item.startDate)}
                {item.endDate && ` — ${formatDate(item.endDate)}`}
              </span>
            </div>
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

  // ✅ Render Simple Custom Sections from formData
  const renderSimpleCustomSections = () => {
    return Object.keys(formData)
      .filter((key) => key.startsWith("customSimpleHistory_custom_simple_"))
      .map((key) => {
        const sectionId = key.replace("customSimpleHistory_", "");
        const history = formData[key];
        const titleKey = `customSimpleTitle_${sectionId}`;
        const hideLevelKey = `customSimpleHideLevel_${sectionId}`;
        const title = formData[titleKey] || "Custom Section";
        const hideLevel = formData[hideLevelKey] ?? true;

        if (!history?.some((item) => item.name)) return null;

        const skillLevels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

        return (
          <section key={sectionId}>
            <h3
              className="font-bold mb-2 py-1 uppercase tracking-wider"
              style={{
                color: themeColor,
                borderBottom: `1px solid ${themeColor}`,
                borderTop: `1px solid ${themeColor}`,
                fontFamily: text.secondaryFont,
                fontSize: `${text.sectionTitle}pt`,
                fontWeight: text.sectionTitleWeight,
                marginTop: `${layout.betweenSections}pt`,
                marginBottom: `${layout.betweenTitlesContent}pt`,
              }}
            >
              {title}
            </h3>
            <div
              className="grid grid-cols-2 gap-x-8 mt-2"
              style={{
                fontSize: `${text.body}pt`,
                fontWeight: text.bodyWeight
              }}
            >
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-gray-100 pb-1"
                >
                  <span className="text-gray-800">{item.name}</span>
                  {!hideLevel && (
                    <span className="text-gray-400 text-[10px] uppercase">
                      {skillLevels[item.level ?? 2]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      });
  };

  // ✅ Render Advanced Custom Sections from formData
  const renderAdvancedCustomSections = () => {
    return Object.keys(formData)
      .filter((key) => key.startsWith("customAdvancedHistory_custom_advanced_"))
      .map((key) => {
        const sectionId = key.replace("customAdvancedHistory_", "");
        const history = formData[key];
        const titleKey = `customAdvancedTitle_${sectionId}`;
        const title = formData[titleKey] || "Custom Section";

        if (!history?.some((item) => item.title || item.city)) return null;

        return (
          <section key={sectionId}>
            <h3
              className="font-bold mb-3 pb-1 uppercase tracking-wider"
              style={{
                color: themeColor,
                borderBottom: `1px solid ${themeColor}`,
                borderTop: `1px solid ${themeColor}`,
                fontFamily: text.secondaryFont,
                fontSize: `${text.sectionTitle}pt`,
                fontWeight: text.sectionTitleWeight,
                marginTop: `${layout.betweenSections}pt`,
                marginBottom: `${layout.betweenTitlesContent}pt`,
              }}
            >
              {title}
            </h3>
            <div className="flex flex-col gap-4">
              {history.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-xs font-bold text-black">
                      {item.title}
                      {item.city ? `, ${item.city}` : ""}
                    </h4>
                    <span className="text-[10px] font-bold text-black">
                      {formatDate(item.startDate)}
                      {item.endDate && ` — ${formatDate(item.endDate)}`}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-[11px] mt-1 text-gray-700 whitespace-pre-wrap leading-normal">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      });
  };


  // ===================== MAIN RENDER LOGIC =====================

  const renderDynamicSections = () => {
    if (sections && sections.length > 0) {
      return sections.map((section) => {
        switch (section.type) {
          case "skills":
            return renderSkillsFromSection(section);
          case "summary":
            return renderSummaryFromSection(section);
          case "education":
            return renderEducationFromSection(section);
          case "certifications":
            return renderCertificationsFromSection(section);
          case "experience":
            return renderExperienceFromSection(section);
          case "custom_simple":
            return renderCustomSimpleSection(section);
          case "custom":
            return renderCustomAdvancedSection(section);
          default:
            return null;
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
      custom: renderCustom,
    };

    const order = sectionOrder || [
      "summary",
      "employment",
      "education",
      "skills",
      "courses",
      "hobbies",
      "activities",
      "languages",
      "internships",
      "custom",
    ];

    return order.map((sectionId) => {
      if (sectionRenderers[sectionId]) {
        return sectionRenderers[sectionId]();
      }
      return null;
    });
  };

  const headerAlign = layout.headerAlignment || "left";

  const alignmentClass =
    headerAlign === "center"
      ? "text-center items-center"
      : headerAlign === "right"
        ? "text-right items-end"
        : "text-left items-start";

  const containerJustify =
    headerAlign === "center"
      ? "justify-center"
      : headerAlign === "right"
        ? "justify-end"
        : "justify-between";

  return (
    <div className="h-screen overflow-y-auto hide-scrollbar">
      <div
        className="min-h-[297mm] w-full bg-white text-gray-800 font-sans shadow-lg resume-root"
        style={{
          padding: `${layout.topBottom}pt ${layout.leftRight}pt`,
          fontFamily: text.primaryFont,
          lineHeight: text.lineHeight,
          fontSize: text.fontSize
        }}
      >
        <div className={`flex ${containerJustify} gap-4`}>
          <div className={`flex-1 flex flex-col ${alignmentClass}`}>
            <h1
              className="font-bold uppercase tracking-tight"
              style={{
                color: themeColor,
                fontFamily: text.secondaryFont,
                fontSize: `${text.primaryHeading}pt`,
                fontWeight: text.primaryHeadingWeight,
              }}
            >
              {formData.first_name} {formData.last_name}
            </h1>

            <h2
              className="uppercase mt-1"
              style={{
                fontSize: `${text.secondaryHeading}pt`,
                fontWeight: text.secondaryHeadingWeight,
              }}
            >
              {formData.job_target}
            </h2>

            <div
              className="mt-2 flex flex-wrap items-center gap-x-2 text-gray-600"
              style={{
                fontSize: `${text.body}pt`,
                fontWeight: text.bodyWeight,
              }}
            >
              {formData.address && <span>{formData.address},</span>}

              {(formData.city_state || formData.postal_code) && (
                <span>
                  {formData.city_state}, {formData.postal_code},
                </span>
              )}
              {formData.country && <span>{formData.country}</span>}

              {formData.email && (
                <>
                  <span>|</span>
                  <a href={`mailto:${formData.email}`} className="text-[#2b6cb0] underline">
                    {formData.email}
                  </a>
                </>
              )}

              {formData.phone && <span>| {formData.phone}</span>}
            </div>

            <div
              className="mt-1 flex flex-wrap gap-x-3"
              style={{
                fontSize: `${text.body}pt`,
                fontWeight: text.bodyWeight,
              }}
            >
              {formData.linkedin && (
                <a href={formData.linkedin} target="_blank" className="text-[#2b6cb0] underline">
                  LinkedIn
                </a>
              )}

              {formData.github && (
                <a href={formData.github} target="_blank" className="text-[#2b6cb0] underline">
                  GitHub
                </a>
              )}

              {formData.stackoverflow && (
                <a href={formData.stackoverflow} target="_blank" className="text-[#2b6cb0] underline">
                  Stack Overflow
                </a>
              )}

              {formData.leetcode && (
                <a href={formData.leetcode} target="_blank" className="text-[#2b6cb0] underline">
                  LeetCode
                </a>
              )}
            </div>

            {(formData.dob || formData.nationality) && (
              <div
                className="mt-1 text-gray-600"
                style={{
                  fontSize: `${text.body}pt`,
                  fontWeight: text.bodyWeight,
                }}
              >
                <span>Personal Details: </span><br />
                {formData.dob && <span>{formData.dob}</span>}
                {formData.birth_place && <span> | {formData.birth_place}</span>}
                {formData.nationality && <span> | {formData.nationality}</span>}
                {formData.driving_licence && <span> | {formData.driving_licence}</span>}
              </div>
            )}
          </div>

          {formData.profileImage && (
            <div className="w-24 h-24 ml-4">
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-md shadow-sm"
              />
            </div>
          )}
        </div>

        {renderDynamicSections()}
      </div>
    </div>
  );
};

export default PrimeATS;


