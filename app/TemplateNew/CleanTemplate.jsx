"use client";
import React from "react";

const CleanTemplate = ({ formData, sectionOrder }) => {
  // --- Helpers ---
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    // Returns format: JAN 2026
    return d
      .toLocaleString("en-US", { month: "short", year: "numeric" })
      .toUpperCase();
  };

  const getYear = (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    return d.getFullYear();
  };

  // --- Logic Checks ---
  const hasContactInfo =
    formData.email ||
    formData.phone ||
    formData.address ||
    formData.city_state ||
    formData.postal_code ||
    formData.driving_licence ||
    formData.nationality ||
    formData.country ||
    formData.birth_place ||
    formData.dob;

  const hasEmployment =
    formData.employmentHistory?.some((job) => job.job_title || job.employer) &&
    formData.employmentHistory.length > 0;
  const hasEducation =
    formData.educationHistory?.some((edu) => edu.school || edu.degree) &&
    formData.educationHistory.length > 0;
  const hasSkills =
    formData.newSkillHistory?.some((s) => s.skill) &&
    formData.newSkillHistory.length > 0;
  const hasLanguages =
    formData.languageHistory?.some((l) => l.language) &&
    formData.languageHistory.length > 0;
  const hasActivities =
    formData.activityHistory?.some((a) => a.functionTitle || a.employer) &&
    formData.activityHistory.length > 0;
  const hasInternships =
    formData.internshipHistory?.some((i) => i.jobTitle || i.employer) &&
    formData.internshipHistory.length > 0;
  const hasCourses =
    formData.coursesHistory?.some((c) => c.course || c.institution) &&
    formData.coursesHistory.length > 0;

  // --- RENDER FUNCTIONS ---
  const renderSummary = () =>
    formData.summary && (
      <section key="summary">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-3">
          Profile
        </h2>
        {/* <p className="text-xs text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
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
          dangerouslySetInnerHTML={{ __html: formData.summary }}
        />
      </section>
    );

  const renderEducation = () =>
    hasEducation && (
      <section key="education">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
          Education
        </h2>
        <div className="flex flex-col gap-5">
          {formData.educationHistory.map((edu, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-gray-900 uppercase">
                  {edu.degree}, {edu.school}
                </h3>
                <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-2">
                  {edu.city_state}
                </span>
              </div>

              <span className="text-[10px] text-gray-400 mt-0.5 mb-1">
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </span>

              {edu.description && (
                <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderEmployment = () =>
    hasEmployment && (
      <section key="employment">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
          Employment History
        </h2>
        <div className="flex flex-col gap-6">
          {formData.employmentHistory.map((job, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-xs font-bold text-gray-900 uppercase">
                    {job.job_title}, {job.employer}
                  </h3>
                </div>
                <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-4">
                  {job.city_state}
                </span>
              </div>

              <div className="text-[10px] text-gray-400 mb-2">
                {formatDate(job.startDate)} — {formatDate(job.endDate)}
              </div>

              {job.description && (
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderInternships = () =>
    hasInternships && (
      <section key="internships">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
          Internships
        </h2>
        <div className="flex flex-col gap-5">
          {formData.internshipHistory.map((job, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xs font-bold text-gray-900 uppercase">
                  {job.jobTitle}, {job.employer}
                </h3>
                <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">
                  {job.city}
                </span>
              </div>

              <div className="text-[10px] text-gray-400 mb-2">
                {formatDate(job.startDate)} — {formatDate(job.endDate)}
              </div>

              {job.description && (
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderActivities = () =>
    hasActivities && (
      <section key="activities">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
          Activities
        </h2>
        <div className="flex flex-col gap-4">
          {formData.activityHistory.map((act, idx) => (
            <div key={idx} className="flex justify-between items-start group">
              <div className="w-[80%]">
                <h3 className="text-xs font-semibold text-gray-800">
                  {act.functionTitle} {act.employer ? `- ${act.employer}` : ""}
                </h3>
                {act.description && (
                  <p className="text-[11px] text-gray-500 mt-1">
                    {act.description}
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 block">
                  {act.city}
                </span>
                <span className="text-[10px] text-gray-400 block">
                  {getYear(act.startDate)} — {getYear(act.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );

  const renderCourses = () =>
    hasCourses && (
      <section key="courses">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
          Courses
        </h2>
        <div className="flex flex-col gap-4">
          {formData.coursesHistory.map((course, idx) => (
            <div key={idx} className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-semibold text-gray-800">
                  {course.course}{" "}
                  {course.institution ? `- ${course.institution}` : ""}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block">
                  {getYear(course.startDate)} — {getYear(course.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );

  const renderSkills = () =>
    hasSkills && (
      <section key="skills" className="mb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">
          Skills
        </h3>
        <div className="flex flex-col gap-2">
          {formData.newSkillHistory.map((skill, idx) => (
            <div key={idx}>
              <span className="text-xs text-gray-700 block">{skill.skill}</span>
              {!formData.hideExperienceLevel && (
                <span className="text-[10px] text-gray-400 uppercase">
                  {
                    ["Novice", "Beginner", "Skillful", "Experienced", "Expert"][
                      skill.level || 0
                    ]
                  }
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
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 text-black">
          Hobbies
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
          {formData.hobbies}
        </p>
      </section>
    );

  const renderLanguages = () =>
    hasLanguages && (
      <section key="languages">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 text-black">
          Languages
        </h3>
        <div className="flex flex-col gap-2">
          {formData.languageHistory.map((lang, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xs font-semibold text-gray-800">
                {lang.language}
              </span>
              <span className="text-[10px] text-gray-500">{lang.level}</span>
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
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
                {title}
              </h2>
              <div className="flex flex-col gap-4">
                {history.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xs font-bold text-gray-900 uppercase">
                        {item.activity}
                        {item.city ? `, ${item.city}` : ""}
                      </h3>
                    </div>

                    <div className="text-[10px] text-gray-400 mb-2">
                      {formatDate(item.startDate)} — {formatDate(item.endDate)}
                    </div>

                    {item.description && (
                      <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
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
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-4">
            {formData.customSectionTitle || "Custom Section"}
          </h2>
          <div className="flex flex-col gap-4">
            {formData.customSectionHistory.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xs font-bold text-gray-900 uppercase">
                    {item.activity}
                    {item.city ? `, ${item.city}` : ""}
                  </h3>
                </div>

                <div className="text-[10px] text-gray-400 mb-2">
                  {formatDate(item.startDate)} — {formatDate(item.endDate)}
                </div>

                {item.description && (
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
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

  // Define section grouping
  const sidebarSections = {
    languages: renderLanguages,
    // 'links' is handled separately as it's not a standard draggable section in page.js usually
  };

  const mainSections = {
    summary: renderSummary,
    employment: renderEmployment,
    education: renderEducation,
    skills: renderSkills,
    hobbies: renderHobbies,
    activities: renderActivities,
    internships: renderInternships,
    courses: renderCourses,
    custom: renderCustom,
  };

  const order = sectionOrder || [
    "summary",
    "employment",
    "education",
    "skills",
    "hobbies",
    "activities",
    "internships",
    "courses",
    "custom",
    "languages",
  ];

  return (
    <div className="min-h-[297mm] bg-white text-gray-900 font-sans p-10 shadow-xl">
      {/* ----------------- HEADER ----------------- */}
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

      {/* ----------------- DIVIDER ----------------- */}
      <hr className="border-t border-gray-300 mb-8" />

      {/* ----------------- TWO COLUMN LAYOUT ----------------- */}
      <div className="flex gap-10">
        {/* ================= LEFT SIDEBAR (30%) ================= */}
        <div className="w-[30%] flex flex-col gap-10 border-r border-gray-200 pr-6">
          {/* DETAILS */}
          {hasContactInfo && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 text-black">
                Details
              </h3>
              <div className="flex flex-col gap-3 text-xs text-gray-600">
                {/* Address */}
                {(formData.address || formData.city_state) && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">
                      Address
                    </span>
                    <span>{formData.address}</span>
                    <span>
                      {formData.city_state}
                      {formData.city_state && formData.country ? ", " : ""}
                      {formData.country}
                    </span>
                    {formData.postal_code && (
                      <span>{formData.postal_code}</span>
                    )}
                  </div>
                )}

                {/* Phone */}
                {formData.phone && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">
                      Phone
                    </span>
                    <span>{formData.phone}</span>
                  </div>
                )}

                {/* Email */}
                {formData.email && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">
                      Email
                    </span>
                    <a
                      href={`mailto:${formData.email}`}
                      className="break-all hover:text-black hover:underline"
                    >
                      {formData.email}
                    </a>
                  </div>
                )}

                {/* Extra Details */}
                {formData.driving_licence && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">
                      Driving License
                    </span>
                    <span>{formData.driving_licence}</span>
                  </div>
                )}
                {formData.nationality && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">
                      Nationality
                    </span>
                    <span>{formData.nationality}</span>
                  </div>
                )}
                {formData.dob && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 uppercase text-[10px]">
                      Date of Birth
                    </span>
                    <span>{formData.dob}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* LINKS */}
          {(formData.linkedin || formData.website) && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 text-black">
                Links
              </h3>
              <div className="flex flex-col gap-2 text-xs text-gray-600">
                {formData.linkedin && (
                  <a
                    href={formData.linkedin}
                    className="underline decoration-dotted"
                  >
                    LinkedIn
                  </a>
                )}
                {formData.website && (
                  <a
                    href={formData.website}
                    className="underline decoration-dotted"
                  >
                    Portfolio
                  </a>
                )}
              </div>
            </section>
          )}

          {/* SIDEBAR SECTIONS */}
          {order.map((sectionId) => {
            if (sidebarSections[sectionId]) {
              return sidebarSections[sectionId]();
            }
            return null;
          })}
        </div>

        {/* ================= RIGHT CONTENT (70%) ================= */}
        <div className="w-[70%] flex flex-col gap-8">
          {/* MAIN SECTIONS */}
          {order.map((sectionId) => {
            if (mainSections[sectionId]) {
              return mainSections[sectionId]();
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CleanTemplate;
