"use client";
import React from "react";

const LinkedInPrime = ({ formData, sections, sectionOrder, themeColor, resumeSettings }) => {
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

  // ===================== DYNAMIC SECTION RENDERERS =====================

  const renderSkillsFromSection = (section) => {
    return (
      <section key={section.id} className="mb-6">
        <h3
          className="font-bold mb-3 uppercase tracking-wider"
          style={{
            color: "#FFFFFF",
            fontFamily: text.secondaryFont,
            fontSize: `${text.secondaryHeading}pt`,
            fontWeight: text.secondaryHeadingWeight,
          }}
        >
          {section.title}
        </h3>
        <div
          className="text-white leading-relaxed space-y-1"
          style={{
            fontSize: `${text.body}pt`,
            fontWeight: text.bodyWeight
          }}
        >
          {section.skills?.map((skill, index) => (
            <div key={skill.id || index}>
              {skill.name}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSummaryFromSection = (section) => (
    <section key={section.id} className="mb-8">
      <h3
        className="font-bold uppercase tracking-wider mb-4"
        style={{
          color: "#000000",
          fontFamily: text.secondaryFont,
          fontSize: `${text.secondaryHeading}pt`,
          fontWeight: text.secondaryHeadingWeight,
        }}
      >
        {section.title}
      </h3>
      <div
        className="leading-relaxed text-gray-800 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
        style={{
          fontSize: `${text.body}pt`,
          fontWeight: text.bodyWeight,
          textAlign: 'justify'
        }}
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
      <div 
        className="w-16 h-0.5 bg-gray-400 mt-6"
      />
    </section>
  );

  const renderEducationFromSection = (section) => (
    <section key={section.id} className="mb-8">
      <h3
        className="font-bold uppercase tracking-wider mb-4"
        style={{
          color: "#000000",
          fontFamily: text.secondaryFont,
          fontSize: `${text.secondaryHeading}pt`,
          fontWeight: text.secondaryHeadingWeight,
        }}
      >
        {section.title}
      </h3>
      <div
        className="flex flex-col"
        style={{
          fontSize: `${text.body}pt`,
          fontWeight: text.bodyWeight,
          gap: `${layout.betweenEntries}pt`
        }}
      >
        {section.educations?.map((edu, index) => (
          <div key={edu.id || index}>
            <h4 className="font-bold text-black text-base">
              {edu.institute}
            </h4>
            <p className="text-gray-700">
              {edu.degree}
            </p>
            {edu.startDate && (
              <p className="text-gray-600">
                {formatDate(edu.startDate)}
                {edu.endDate && (
                  <>
                    {" - "}
                    {formatDate(edu.endDate)}
                  </>
                )}
              </p>
            )}
            {edu.city && (
              <p className="text-gray-400 italic">
                {edu.city}
              </p>
            )}
            {edu.description && (
              <div
                className="text-gray-700 mt-2 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: edu.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  const renderExperienceFromSection = (section) => (
    <section key={section.id} className="mb-8">
      <h3
        className="font-bold uppercase tracking-wider mb-4"
        style={{
          color: "#000000",
          fontFamily: text.secondaryFont,
          fontSize: `${text.secondaryHeading}pt`,
          fontWeight: text.secondaryHeadingWeight,
        }}
      >
        {section.title}
      </h3>
      <div
        className="flex flex-col"
        style={{
          fontSize: `${text.body}pt`,
          fontWeight: text.bodyWeight,
          gap: `${layout.betweenEntries}pt`
        }}
      >
        {section.experiences?.map((exp, index) => (
          <div key={exp.id || index}>
            <h4 className="font-bold text-black text-base">
              {exp.company}
            </h4>
            <p className="text-gray-700 font-semibold">
              {exp.jobTitle}
            </p>
            {exp.startDate && (
              <p className="text-gray-600">
                {formatDate(exp.startDate)}
                {" - "}
                {exp.endDate ? formatDate(exp.endDate) : "Present"}
                {exp.startDate && exp.endDate && (() => {
                  const start = new Date(exp.startDate);
                  const end = exp.endDate && exp.endDate.toLowerCase() !== 'present' 
                    ? new Date(exp.endDate) 
                    : new Date();
                  const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                                (end.getMonth() - start.getMonth());
                  const years = Math.floor(months / 12);
                  const remainingMonths = months % 12;
                  return ` (${years > 0 ? `${years} year${years > 1 ? 's' : ''} ` : ''}${remainingMonths} month${remainingMonths !== 1 ? 's' : ''})`;
                })()}
              </p>
            )}
            {exp.city && (
              <p className="text-gray-400 italic">
                {exp.city}
              </p>
            )}
            {exp.description && (
              <div
                className="text-gray-700 mt-2 leading-relaxed [&_p]:mb-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
                style={{ textAlign: 'justify' }}
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );

  // Separate sections for sidebar and main content
  const sidebarSections = [];
  const mainSections = [];

  sections?.forEach((section) => {
    if (section.type === "skills") {
      sidebarSections.push(section);
    } else {
      mainSections.push(section);
    }
  });

  // ===================== MAIN RENDER LOGIC =====================

  return (
    <div className="h-screen overflow-y-auto hide-scrollbar">
      <div
        className="min-h-[297mm] w-full bg-white text-gray-800 font-sans shadow-lg resume-root flex"
        style={{
          fontFamily: text.primaryFont,
          lineHeight: text.lineHeight,
          fontSize: text.fontSize
        }}
      >
        {/* ----------------- LEFT SIDEBAR (Dark Background) ----------------- */}
        <div 
          className="w-[35%] text-white p-8"
          style={{
            backgroundColor: themeColor || '#3d5a6b',
            paddingTop: `${layout.topBottom}pt`,
            paddingBottom: `${layout.topBottom}pt`,
          }}
        >
          {/* Contact Section */}
          <section className="mb-8">
            <h3
              className="font-bold mb-3 uppercase tracking-wider"
              style={{
                color: "#FFFFFF",
                fontFamily: text.secondaryFont,
                fontSize: `${text.secondaryHeading}pt`,
                fontWeight: text.secondaryHeadingWeight,
              }}
            >
              Contact
            </h3>
            
            <div
              className="text-white space-y-2"
              style={{
                fontSize: `${text.body}pt`,
                fontWeight: text.bodyWeight,
              }}
            >
              {formData.linkedin && (
                <div>
                  <a
                    href={formData.linkedin}
                    target="_blank"
                    className="text-white hover:underline break-all"
                  >
                    {formData.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              )}
              {formData.email && (
                <div>
                  <a
                    href={`mailto:${formData.email}`}
                    className="text-white hover:underline"
                  >
                    {formData.email}
                  </a>
                </div>
              )}
              {formData.phone && (
                <div className="text-white">
                  {formData.phone}
                </div>
              )}
              {formData.website && (
                <div>
                  <a
                    href={formData.website}
                    target="_blank"
                    className="text-white hover:underline break-all"
                  >
                    {formData.website.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Skills Section in Sidebar */}
          {sidebarSections.map((section) => {
            if (section.type === "skills") {
              return renderSkillsFromSection(section);
            }
            return null;
          })}

          {/* Placeholder sections for Languages, Honors-Awards if needed */}
        </div>

        {/* ----------------- RIGHT MAIN CONTENT ----------------- */}
        <div 
          className="w-[65%] bg-white"
          style={{
            padding: `${layout.topBottom}pt ${layout.leftRight}pt`,
          }}
        >
          {/* Header with Name */}
          <div className="mb-6">
            <h1
              className="font-bold text-black"
              style={{
                fontFamily: text.secondaryFont,
                fontSize: `${text.primaryHeading}pt`,
                fontWeight: text.primaryHeadingWeight,
              }}
            >
              {formData.first_name} {formData.last_name}
            </h1>

            {/* Headline/Job Target */}
            <p
              className="text-gray-700 mt-2 leading-relaxed"
              style={{
                fontSize: `${text.body}pt`,
                fontWeight: text.bodyWeight,
              }}
            >
              {formData.job_target}
            </p>

            {/* Location */}
            {formData.city_state && (
              <p
                className="text-gray-400 mt-1 italic"
                style={{
                  fontSize: `${text.body}pt`,
                  fontWeight: text.bodyWeight,
                }}
              >
                {formData.city_state}
              </p>
            )}
          </div>

          {/* Main Sections (Summary, Experience, Education) */}
          {mainSections.map((section) => {
            switch (section.type) {
              case "summary":
                return renderSummaryFromSection(section);
              case "education":
                return renderEducationFromSection(section);
              case "experience":
                return renderExperienceFromSection(section);
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default LinkedInPrime;