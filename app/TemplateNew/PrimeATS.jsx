"use client";
import React from "react";

const PrimeATS = ({ formData, sectionOrder, themeColor, resumeSettings }) => {
  // Helper to format dates to "JAN 2026"
  // const formatDate = (dateValue) => {
  //   if (!dateValue) return "";
  //   const d = new Date(dateValue);
  //   return d
  //     .toLocaleString("en-US", { month: "short", year: "numeric" })
  //     .toUpperCase();
  // };
  const { text, layout } = resumeSettings;
  const formatDate = (dateValue) => {
    if (!dateValue) return null;

    // Handle PRESENT separately
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

  // --- RENDER FUNCTIONS ---

  const renderSummary = () =>
    formData.summary && (
      <section key="summary">
        <h3 className="font-bold uppercase tracking-wider"
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
        {/* <p className="text-xs leading-relaxed whitespace-pre-wrap">
          {formData.summary}
        </p> */}
        <div
          className="
          text-xs leading-relaxed text-gray-700 text-justify
          [&_ul]:list-disc
          [&_ul]:pl-4
          [&_ol]:list-decimal
          [&_ol]:pl-4
          [&_li]:mb-1
        "
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
        <h3 className=" font-bold py-1 uppercase tracking-wider"
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
          Professional Experience
        </h3>
        <div className="flex flex-col gap-4"
          style={{
            fontSize: `${text.body}pt`,
            fontWeight: text.bodyWeight
          }}
        >
          {formData.employmentHistory.map((job, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline">
                <div className="w-1/2">
                  <h4 className=" font-bold text-black">
                    {job.job_title}
                    {job.employer ? `, ${job.employer}` : ""}
                    <span className="font-normal text-gray-600 ml-1">
                      {job.city_state ? `, ${job.city_state}` : ""}
                    </span>
                  </h4>
                </div>
                <div className="w-1/2 text-right">
                  <span className="font-bold text-black">
                    {formatDate(job.startDate)} —{" "}
                    {formatDate(job.endDate) || "PRESENT"}
                  </span>
                </div>
              </div>
              {job.description && (
                <div
                  className="
                    text-gray-700 mt-1 leading-relaxed
                      [&_p]:mb-1
                      [&_ul]:list-disc [&_ul]:pl-4
                      [&_ol]:list-decimal [&_ol]:pl-4
                      [&_li]:mb-1
                      [&_strong]:font-semibold
                      [&_em]:italic
                    "
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
        <h3 className=" font-bold mb-3 py-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight
          }}
        >
          Education
        </h3>
        <div className="flex flex-col gap-4"
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
                    {formatDate(edu.startDate)} —{" "}
                    {formatDate(edu.endDate) || "PRESENT"}
                  </span>
                </div>
              </div>
              {edu.description && (
                <p className="text-[11px] mt-1 text-gray-700">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderSkills = () =>
    hasSkills && (
      <section key="skills">
        <h3 className=" font-bold mb-2 py-1 uppercase tracking-wider"
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
          Technical Skills
        </h3>
        <div className="grid grid-cols-2 gap-x-8 mt-2"
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
                  {item.level || "Expert"}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderHobbies = () =>
    formData.hobbies && (
      <section key="hobbies">
        <h3 className="font-bold mb-2 py-1 uppercase tracking-wider"
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
      <section key="languages" className="mb-6">
        <h3 className="font-bold mb-2 py-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
            borderTop: `1px solid ${themeColor}`,
            fontFamily: text.secondaryFont,
            fontSize: `${text.sectionTitle}pt`,
            fontWeight: text.sectionTitleWeight,
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
              {l.language} ({l.level})
            </span>
          ))}
        </div>
      </section>
    );

  const renderCourses = () =>
    formData.coursesHistory?.some((c) => c.course || c.institution) &&
    formData.coursesHistory.length > 0 && (
      <section key="courses" className="mb-6">
        <h3 className="font-bold text-sm mb-3 pb-1 uppercase tracking-wider"
          style={{
            color: themeColor,
            borderBottom: `1px solid ${themeColor}`,
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
                  {formatDate(course.startDate)} — {formatDate(course.endDate)}
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
      <section key="activities" className="mb-6">
        <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-3 pb-1 uppercase tracking-wider">
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
                  {formatDate(activity.startDate)} —{" "}
                  {formatDate(activity.endDate)}
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
      <section key="internships" className="mb-6">
        <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-3 pb-1 uppercase tracking-wider">
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
            <section key={sectionId} className="mb-6">
              <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-3 pb-1 uppercase tracking-wider">
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
                        {formatDate(item.startDate)} —{" "}
                        {formatDate(item.endDate)}
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
          <section key="custom-default" className="mb-6">
            <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-3 pb-1 uppercase tracking-wider">
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

  return (
    <div className="h-screen overflow-y-auto hide-scrollbar"

    >
      <div className="min-h-[297mm] w-full bg-white text-gray-800 font-sans shadow-lg resume-root"
        style={{
          padding: `${layout.topBottom}pt ${layout.leftRight}pt`,
          fontFamily: text.primaryFont,
          lineHeight: text.lineHeight,
          fontSize: text.fontSize
        }}
      >
        {/* ----------------- HEADER SECTION ----------------- */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="font-bold uppercase tracking-tight"
              style={{
                color: themeColor,
                fontFamily: text.secondaryFont,
                fontSize: `${text.primaryHeading}pt`,
                fontWeight: text.primaryHeadingWeight
              }}
            >
              {formData.first_name} {formData.last_name}
            </h1>
            <h2 className="text-black mt-1 uppercase"
              style={{
                fontSize: `${text.secondaryHeading}pt`,
                fontWeight: text.secondaryHeadingWeight
              }}
            >
              {formData.job_target}
            </h2>

            {/* Contact Details Row */}
            <div className="mt-2 text-gray-600 flex flex-wrap gap-x-2 items-center"
              style={{
                fontSize: `${text.body}pt`,
                fontWeight: text.bodyWeight
              }}
            >
              <span>{formData.address}</span>
              {formData.city_state && (
                <span>
                  | {formData.city_state}, {formData.postal_code}
                </span>
              )}
              {formData.email && (
                <>
                  <span>|</span>
                  <a
                    href={`mailto:${formData.email}`}
                    className="text-[#2b6cb0] underline"
                  >
                    {formData.email}
                  </a>
                </>
              )}
              {formData.phone && <span>| {formData.phone}</span>}
              {formData.linkedin && <span>| LinkedIn</span>}
            </div>
            {hasContactInfo && (
              <div className="mt-1 text-[11px] text-gray-600"
                style={{
                  fontSize: `${text.body}pt`,
                  fontWeight: text.bodyWeight
                }}
              >
                <span className="font-bold">Personal Details: </span>
                {formData.dob && <span>{formData.dob} | </span>}
                {formData.nationality && <span>{formData.nationality} | </span>}
              </div>
            )}
            {/* Secondary Details (DOB, Nationality etc) */}
          </div>

          {/* Profile Image - Top Right */}
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

        {/* Render Sections based on Order */}
        {order.map((sectionId) => {
          if (sectionRenderers[sectionId]) {
            return sectionRenderers[sectionId]();
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default PrimeATS;
