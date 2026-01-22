"use client";
import React from "react";

const VividTemplate = ({ formData, sectionOrder }) => {
  // --- Helpers ---
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    return d
      .toLocaleString("en-US", { month: "short", year: "numeric" })
      .toUpperCase();
  };

  const getYear = (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    return d.getFullYear();
  };

  // --- Data Existence Checks ---
  // We calculate these once to keep the JSX clean
  const hasDetails =
    formData.driving_licence ||
    formData.nationality ||
    formData.dob ||
    formData.birth_place;
  const hasEducation = formData.educationHistory?.some(
    (edu) => edu.school || edu.degree,
  );
  const hasEmployment = formData.employmentHistory?.some(
    (job) => job.job_title || job.employer,
  );
  const hasActivities = formData.activityHistory?.some(
    (act) => act.functionTitle || act.employer,
  );
  const hasSkills = formData.newSkillHistory?.some((s) => s.skill);
  const hasLanguages = formData.languageHistory?.some((l) => l.language);
  const hasLinks = formData.linkedin || formData.github;
  const hasInternships = formData.internshipHistory?.some(
    (i) => i.jobTitle || i.employer,
  );
  const hasCourses = formData.coursesHistory?.some(
    (c) => c.course || c.institution,
  );

  const hideLevel = formData.hideExperienceLevel;

  // --- Sub-components ---
  const SectionHeader = ({ title }) => (
    <div className="bg-black text-white inline-block px-3 py-1 text-[11px] font-bold tracking-widest uppercase mb-5">
      {title}
    </div>
  );

  // --- RENDER FUNCTIONS ---
  const renderSummary = () =>
    formData.summary && (
      <section key="summary">
        <SectionHeader title="Profile" />
        {/* <p className="text-[11px] leading-relaxed text-gray-700 text-justify whitespace-pre-wrap">
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
        <SectionHeader title="Education" />
        <div className="flex flex-col gap-5">
          {formData.educationHistory.map((edu, idx) => (
            <div key={idx}>
              <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
                {edu.degree}
                {edu.school ? `, ${edu.school}` : ""}
              </h3>
              {edu.description && (
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">
                  {edu.description}
                </p>
              )}
              <div className="text-[10px] text-gray-400 font-semibold uppercase mt-1 tracking-wider">
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </div>
            </div>
          ))}
        </div>
      </section>
    );

  const renderEmployment = () =>
    hasEmployment && (
      <section key="employment">
        <SectionHeader title="Experience" />
        <div className="flex flex-col gap-6">
          {formData.employmentHistory.map((job, idx) => (
            <div key={idx}>
              <h3 className="text-[12px] font-bold text-gray-900">
                {job.job_title}
                <span className="font-normal text-gray-600">
                  {job.employer ? `, ${job.employer}` : ""}
                  {job.city_state ? `, ${job.city_state}` : ""}
                </span>
              </h3>

              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                {formatDate(job.startDate)} — {formatDate(job.endDate)}
              </div>

              {job.description && (
                <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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
        <SectionHeader title="Internships" />
        <div className="flex flex-col gap-6">
          {formData.internshipHistory.map((job, idx) => (
            <div key={idx}>
              <h3 className="text-[12px] font-bold text-gray-900">
                {job.jobTitle}
                <span className="font-normal text-gray-600">
                  {job.employer ? `, ${job.employer}` : ""}
                  {job.city ? `, ${job.city}` : ""}
                </span>
              </h3>

              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                {formatDate(job.startDate)} — {formatDate(job.endDate)}
              </div>

              {job.description && (
                <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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
        <SectionHeader title="Activities" />
        <div className="flex flex-col gap-5">
          {formData.activityHistory.map((act, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-[12px] font-bold text-gray-900">
                  {act.functionTitle} {act.employer ? `- ${act.employer}` : ""}
                </h3>
              </div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-1 tracking-wider">
                {getYear(act.startDate)} — {getYear(act.endDate)}
              </div>
              {act.description && (
                <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {act.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );

  const renderCourses = () =>
    hasCourses && (
      <section key="courses">
        <SectionHeader title="Courses" />
        <div className="flex flex-col gap-5">
          {formData.coursesHistory.map((course, idx) => (
            <div key={idx}>
              <h3 className="text-[12px] font-bold text-gray-900">
                {course.course}{" "}
                {course.institution ? `- ${course.institution}` : ""}
              </h3>
              <div className="text-[10px] text-gray-400 font-semibold uppercase mb-1 tracking-wider">
                {formatDate(course.startDate)} — {formatDate(course.endDate)}
              </div>
            </div>
          ))}
        </div>
      </section>
    );

  const renderSkills = () =>
    hasSkills && (
      <section key="skills">
        <SectionHeader title="Skills" />
        <div className="flex flex-col gap-5 mt-2">
          {formData.newSkillHistory.map((item, index) => {
            const percentage = ((item.level ?? 3) + 1) * 120;

            return (
              <div key={index} className="w-full">
                <div className="text-[11px] font-bold text-gray-900 mb-1.5 uppercase tracking-wide">
                  {item.skill || ""}
                </div>
                {!formData.hideExperienceLevel && (
                  <div className="w-full bg-gray-100 h-1.5">
                    <div
                      className="bg-black h-full transition-all duration-500"
                      style={{ width: percentage }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );

  const renderLanguages = () =>
    hasLanguages && (
      <section key="languages">
        <SectionHeader title="Languages" />
        <div className="grid grid-cols-2 gap-x-16 gap-y-6 max-w-2xl">
          {formData.languageHistory.map((lang, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-medium text-gray-800">
                  {lang.language}
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100">
                <div
                  className="h-full bg-black"
                  style={{
                    width:
                      lang.level === "Native"
                        ? "100%"
                        : lang.level === "Fluent"
                          ? "85%"
                          : lang.level === "Intermediate"
                            ? "50%"
                            : "25%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    );

  const renderHobbies = () =>
    formData.hobbies && (
      <section key="hobbies">
        <SectionHeader title="Hobbies" />
        <div className="text-[11px] text-gray-800 leading-relaxed font-medium">
          <div className="flex flex-col gap-2">
            {formData.hobbies.split("\n").map((hobby, i) => (
              <span key={i} className="block">
                {hobby}
              </span>
            ))}
          </div>
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
              <SectionHeader title={title} />
              <div className="flex flex-col gap-6">
                {history.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-[12px] font-bold text-gray-900">
                      {item.activity}
                      <span className="font-normal text-gray-600">
                        {item.city ? `, ${item.city}` : ""}
                      </span>
                    </h3>

                    <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                      {formatDate(item.startDate)} — {formatDate(item.endDate)}
                    </div>

                    {item.description && (
                      <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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
          <SectionHeader
            title={formData.customSectionTitle || "Custom Section"}
          />
          <div className="flex flex-col gap-6">
            {formData.customSectionHistory.map((item, idx) => (
              <div key={idx}>
                <h3 className="text-[12px] font-bold text-gray-900">
                  {item.activity}
                  <span className="font-normal text-gray-600">
                    {item.city ? `, ${item.city}` : ""}
                  </span>
                </h3>

                <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                  {formatDate(item.startDate)} — {formatDate(item.endDate)}
                </div>

                {item.description && (
                  <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
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
    "activities",
    "skills",
    "languages",
    "hobbies",
    "internships",
    "courses",
    "custom",
  ];

  return (
    <div className="min-h-[297mm] bg-white text-gray-800 font-sans shadow-2xl flex flex-col">
      {/* ----------------- YELLOW HEADER ----------------- */}
      <div className="bg-[#ffeb3b] p-12 pb-14 flex justify-between items-start">
        <div className="w-[55%]">
          <h1 className="text-[42px] font-bold text-gray-900 leading-none mb-2 tracking-tight">
            {formData.first_name}
            <br />
            {formData.last_name}
          </h1>
        </div>

        <div className="w-[45%] text-left flex flex-col gap-1 text-[11px] text-gray-900 leading-snug">
          <p className="font-bold uppercase tracking-wide text-xs mb-1">
            {formData.job_target}
          </p>
          {(formData.address || formData.city_state || formData.country) && (
            <p>
              {formData.address}
              {formData.address && (formData.city_state || formData.country)
                ? ", "
                : ""}
              {formData.city_state}
              {formData.city_state && formData.country ? ", " : ""}
              {formData.country}
              {formData.postal_code ? ` ${formData.postal_code}` : ""}
            </p>
          )}
          {formData.email && (
            <a
              href={`mailto:${formData.email}`}
              className="hover:underline font-medium"
            >
              {formData.email}
            </a>
          )}
          {formData.phone && <p className="font-medium">{formData.phone}</p>}
        </div>
      </div>

      {/* ----------------- MAIN CONTENT ----------------- */}
      <div className="px-12 py-10 flex flex-col gap-8">
        {/* --- DETAILS SECTION --- */}
        {hasDetails && (
          <section>
            <SectionHeader title="Details" />
            <div className="grid grid-cols-2 gap-y-4 gap-x-10 max-w-lg">
              {formData.driving_licence && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase">
                    Driving License
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    {formData.driving_licence}
                  </p>
                </div>
              )}
              {formData.nationality && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase">
                    Nationality
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    {formData.nationality}
                  </p>
                </div>
              )}
              {(formData.dob || formData.birth_place) && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase">
                    Date / Place of Birth
                  </h4>
                  <p className="text-[11px] text-gray-600">
                    {formData.dob}
                    {formData.dob && formData.birth_place ? ", " : ""}
                    {formData.birth_place}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* DYNAMIC SECTIONS */}
        {order.map((sectionId) => {
          if (sectionRenderers[sectionId]) {
            return sectionRenderers[sectionId]();
          }
          return null;
        })}

        {/* --- LINKS SECTION --- */}
        {hasLinks && (
          <section>
            <SectionHeader title="Links" />
            <div className="flex flex-col gap-1 text-[11px]">
              {formData.linkedin && (
                <a
                  href={formData.linkedin}
                  className="text-gray-700 underline decoration-gray-400 underline-offset-2 hover:text-black"
                >
                  LinkedIn
                </a>
              )}
              {formData.github && (
                <a
                  href={formData.github}
                  className="text-gray-700 underline decoration-gray-400 underline-offset-2 hover:text-black"
                >
                  GitHub
                </a>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default VividTemplate;
