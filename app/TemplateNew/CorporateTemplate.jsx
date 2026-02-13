"use client";
import React from "react";
import { IoMdContact } from "react-icons/io";
import { BsBagFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";

const TITLE_ICON_MAP = {
  Profile: IoMdContact,
  Experience: BsBagFill,
  Projects: FaStar,
  Education: HiAcademicCap,
  Certifications: FaStar,
};

const CorporateTemplate = ({ formData, sections, sectionOrder }) => {
  // --- Helpers ---
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    if (typeof dateValue === "string" && dateValue.toLowerCase() === "present") {
      return "Present";
    }
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  // --- Data Existence Checks (for scratch resume) ---
  const hasEmployment = formData.employmentHistory?.some(
    (job) => job.job_title || job.employer,
  );
  const hasEducation = formData.educationHistory?.some(
    (edu) => edu.school || edu.degree,
  );
  const hasSkills = formData.newSkillHistory?.some((s) => s.skill);
  const hasLanguages = formData.languageHistory?.some((l) => l.language);
  const hasActivities = formData.activityHistory?.some(
    (act) => act.functionTitle || act.employer,
  );
  const hasInternships = formData.internshipHistory?.some(
    (i) => i.jobTitle || i.employer,
  );
  const hasCourses = formData.coursesHistory?.some(
    (c) => c.course || c.institution,
  );

  // --- Render Functions for SCRATCH RESUME (Main Content) ---

  const renderSummary = () =>
    formData.summary && (
      <section key="summary">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-2">
          <IoMdContact className="text-md" />
          Profile
        </h2>
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

  const renderEmployment = () =>
    hasEmployment && (
      <TimelineSection
        key="employment"
        title="Experience"
        icon={BsBagFill}
        items={formData.employmentHistory.map((e) => ({
          heading: `${e.job_title}${e.employer ? `, ${e.employer}` : ""}${e.city_state ? `, ${e.city_state}` : ""}`,
          period: `${formatDate(e.startDate)} — ${formatDate(e.endDate)}`,
          points: e.description ? [e.description] : [],
        }))}
      />
    );

  const renderEducation = () =>
    hasEducation && (
      <TimelineSection
        key="education"
        title="Education"
        icon={HiAcademicCap}
        items={formData.educationHistory.map((e) => ({
          heading: `${e.degree}, ${e.school}, ${e.city_state}`,
          period: `${formatDate(e.startDate)} — ${formatDate(e.endDate)}`,
          points: e.description ? [e.description] : [],
        }))}
      />
    );

  const renderInternships = () =>
    hasInternships && (
      <TimelineSection
        key="internships"
        title="Internships"
        icon={BsBagFill}
        items={formData.internshipHistory.map((e) => ({
          heading: `${e.jobTitle}${e.employer ? `, ${e.employer}` : ""}${e.city ? `, ${e.city}` : ""}`,
          period: `${formatDate(e.startDate)} — ${formatDate(e.endDate)}`,
          points: e.description ? [e.description] : [],
        }))}
      />
    );

  const renderActivities = () =>
    hasActivities && (
      <TimelineSection
        key="activities"
        title="Activities"
        icon={FaStar}
        items={formData.activityHistory.map((e) => ({
          heading: `${e.functionTitle}${e.employer ? `, ${e.employer}` : ""}${e.city ? `, ${e.city}` : ""}`,
          period: `${formatDate(e.startDate)} — ${formatDate(e.endDate)}`,
          points: e.description ? [e.description] : [],
        }))}
      />
    );

  const renderCourses = () =>
    hasCourses && (
      <TimelineSection
        key="courses"
        title="Courses"
        icon={HiAcademicCap}
        items={formData.coursesHistory.map((e) => ({
          heading: `${e.course}${e.institution ? `, ${e.institution}` : ""}`,
          period: `${formatDate(e.startDate)} — ${formatDate(e.endDate)}`,
          points: [],
        }))}
      />
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
            <TimelineSection
              key={sectionId}
              title={title}
              icon={FaStar}
              items={history.map((item) => ({
                heading: `${item.activity}${item.city ? `, ${item.city}` : ""}`,
                period: `${formatDate(item.startDate)} — ${formatDate(item.endDate)}`,
                points: item.description ? [item.description] : [],
              }))}
            />
          );
        })}
      {formData.customSectionHistory?.some(
        (item) => item.activity || item.city,
      ) && (
        <TimelineSection
          key="custom-default"
          title={formData.customSectionTitle || "Custom Section"}
          icon={FaStar}
          items={formData.customSectionHistory.map((item) => ({
            heading: `${item.activity}${item.city ? `, ${item.city}` : ""}`,
            period: `${formatDate(item.startDate)} — ${formatDate(item.endDate)}`,
            points: item.description ? [item.description] : [],
          }))}
        />
      )}
    </>
  );

  // --- Render Functions for SCRATCH RESUME (Sidebar) ---
  const renderSkills = () =>
    hasSkills && (
      <section key="skills">
        <h3 className="text-xs font-bold uppercase mb-2">Skills</h3>
        <ul className="space-y-1">
          {formData.newSkillHistory.map((s, i) => (
            <li key={i} className="text-xs text-gray-700">
              {s.skill}
              {!formData.hideExperienceLevel && s.level
                ? ` (${["Novice", "Beginner", "Skillful", "Experienced", "Expert"][s.level]})`
                : ""}
            </li>
          ))}
        </ul>
      </section>
    );

  const renderLanguages = () =>
    hasLanguages && (
      <section key="languages">
        <h3 className="text-xs font-bold uppercase mb-2">Languages</h3>
        <ul className="space-y-1">
          {formData.languageHistory.map((l, i) => (
            <li key={i} className="text-xs text-gray-700">
              {l.language} {l.level ? `- ${l.level}` : ""}
            </li>
          ))}
        </ul>
      </section>
    );

  const renderHobbies = () =>
    formData.hobbies && (
      <section key="hobbies">
        <h3 className="text-xs font-bold uppercase mb-2">Hobbies</h3>
        <p className="text-xs text-gray-700 whitespace-pre-wrap">
          {formData.hobbies}
        </p>
      </section>
    );

  // --- Render Functions for IMPROVE RESUME (Dynamic Sections) ---

  const renderSummaryFromSection = (section) => (
    <section key={section.id}>
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-2">
        <IoMdContact className="text-md" />
        {section.title}
      </h2>
      <div
        className="
        text-xs leading-relaxed text-gray-700 text-justify
        [&_ul]:list-disc
        [&_ul]:pl-4
        [&_ol]:list-decimal
        [&_ol]:pl-4
        [&_li]:mb-1
      "
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
    </section>
  );

  const renderExperienceFromSection = (section) => (
    <TimelineSection
      key={section.id}
      title={section.title}
      icon={BsBagFill}
      items={section.experiences?.map((exp) => ({
        heading: `${exp.jobTitle}${exp.company ? `, ${exp.company}` : ""}${exp.city ? `, ${exp.city}` : ""}`,
        period: `${formatDate(exp.startDate)} — ${formatDate(exp.endDate)}`,
        points: exp.description ? [exp.description] : [],
      }))}
    />
  );

  const renderEducationFromSection = (section) => (
    <TimelineSection
      key={section.id}
      title={section.title}
      icon={HiAcademicCap}
      items={section.educations?.map((edu) => ({
        heading: `${edu.degree}, ${edu.institute}, ${edu.city}`,
        period: `${formatDate(edu.startDate)} — ${formatDate(edu.endDate)}`,
        points: edu.description ? [edu.description] : [],
      }))}
    />
  );

  const renderCertificationsFromSection = (section) => (
    <TimelineSection
      key={section.id}
      title={section.title}
      icon={FaStar}
      items={section.certifications?.map((cert) => ({
        heading: `${cert.name}${cert.organization ? `, ${cert.organization}` : ""}`,
        period: cert.startYear ? `${cert.startYear}${cert.endYear ? ` — ${cert.endYear}` : ""}` : "",
        points: cert.description ? [cert.description] : [],
      }))}
    />
  );

  const renderCustomFromSection = (section) => (
    <TimelineSection
      key={section.id}
      title={section.title}
      icon={FaStar}
      items={section.items?.map((item) => ({
        heading: `${item.title}${item.city ? `, ${item.city}` : ""}`,
        period: `${formatDate(item.startDate)} — ${formatDate(item.endDate)}`,
        points: item.description ? [item.description] : [],
      }))}
    />
  );

  const renderSkillsFromSection = (section) => (
    <section key={section.id}>
      <h3 className="text-xs font-bold uppercase mb-2">{section.title}</h3>
      <ul className="space-y-1">
        {section.skills?.map((skill, i) => (
          <li key={skill.id || i} className="text-xs text-gray-700">
            {skill.name}
            {!section.hideExperienceLevel && skill.level !== undefined
              ? ` (${["Novice", "Beginner", "Skillful", "Experienced", "Expert"][skill.level]})`
              : ""}
          </li>
        ))}
      </ul>
    </section>
  );

  const renderCoreCompetenciesFromSection = (section) => (
    <section key={section.id}>
      <h3 className="text-xs font-bold uppercase mb-2">{section.title}</h3>
      <ul className="space-y-1">
        {section.items?.map((item, i) => {
          const displayName = typeof item === 'object' ? (item.name || item.title) : item;
          return (
            <li key={i} className="text-xs text-gray-700">
              {displayName}
              {!section.hideExperienceLevel && typeof item === 'object' && item.level !== undefined && (
                <span className="text-[10px] text-gray-500">
                  {" "}({["Novice", "Beginner", "Skillful", "Experienced", "Expert"][item.level]})
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );

  // --- Section Mapping ---
  const mainSectionRenderers = {
    summary: renderSummary,
    employment: renderEmployment,
    education: renderEducation,
    internships: renderInternships,
    activities: renderActivities,
    courses: renderCourses,
    custom: renderCustom,
  };

  const sidebarSectionRenderers = {
    skills: renderSkills,
    languages: renderLanguages,
    hobbies: renderHobbies,
  };

  // --- Dynamic Section Rendering Logic ---
  const renderMainDynamicSections = () => {
    if (sections && sections.length > 0) {
      return sections
        .filter(section => {
          // Filter out sidebar sections from main content
          return !['skills', 'languages', 'hobbies'].includes(section.type);
        })
        .map((section) => {
          switch (section.type) {
            case "summary":
              return renderSummaryFromSection(section);
            case "experience":
              return renderExperienceFromSection(section);
            case "education":
              return renderEducationFromSection(section);
            case "certifications":
              return renderCertificationsFromSection(section);
            case "custom":
              return renderCustomFromSection(section);
            default:
              return null;
          }
        });
    }

    const order = sectionOrder || [
      "summary",
      "employment",
      "education",
      "activities",
      "internships",
      "courses",
      "custom",
    ];

    return order.map((sectionId) => {
      if (mainSectionRenderers[sectionId]) {
        return mainSectionRenderers[sectionId]();
      }
      return null;
    });
  };

  const renderSidebarDynamicSections = () => {
    if (sections && sections.length > 0) {
      return sections
        .filter(section => {
          // Only render sidebar-appropriate sections
          return ['skills', 'languages', 'hobbies', 'core_competencies'].includes(section.type);
        })
        .map((section) => {
          switch (section.type) {
            case "skills":
              return renderSkillsFromSection(section);
            case "core_competencies":
              return renderCoreCompetenciesFromSection(section);
            case "languages":
              return section.items?.length > 0 ? (
                <section key={section.id}>
                  <h3 className="text-xs font-bold uppercase mb-2">{section.title}</h3>
                  <ul className="space-y-1">
                    {section.items.map((l, i) => (
                      <li key={i} className="text-xs text-gray-700">
                        {typeof l === 'object' ? `${l.language} ${l.level ? `- ${l.level}` : ''}` : l}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null;
            case "hobbies":
              return section.content ? (
                <section key={section.id}>
                  <h3 className="text-xs font-bold uppercase mb-2">{section.title}</h3>
                  <p className="text-xs text-gray-700 whitespace-pre-wrap">
                    {section.content}
                  </p>
                </section>
              ) : null;
            default:
              return null;
          }
        });
    }

    const order = sectionOrder || ["skills", "languages", "hobbies"];

    return order.map((sectionId) => {
      if (sidebarSectionRenderers[sectionId]) {
        return sidebarSectionRenderers[sectionId]();
      }
      return null;
    });
  };

  return (
    <div className="min-h-[297mm] bg-white shadow-xl font-sans text-sm">
      <div className="text-center py-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">
          {formData.first_name} {formData.last_name}
        </h1>
        <p className="uppercase text-[10px] text-gray-500 mt-1 font-semibold tracking-widest">
          {formData.job_target}
        </p>
        <p className="text-[10px] text-gray-400 mt-1">
          {formData.city_state} {formData.country}
        </p>
      </div>

      <div className="flex min-h-[800px]">
        <aside className="w-[32%] px-6 py-8 space-y-6 text-center border-r border-gray-100 bg-gray-50/50">
          {/* DETAILS */}
          {(formData.address ||
            formData.phone ||
            formData.email ||
            formData.dob) && (
            <section>
              <h3 className="text-xs font-bold uppercase mb-3 text-gray-800 tracking-wider">
                Details
              </h3>
              <div className="flex flex-col gap-1.5 text-xs text-gray-600">
                {formData.address && <p>{formData.address}</p>}
                {formData.city_state && (
                  <p>
                    {formData.city_state}, {formData.country}
                  </p>
                )}
                {formData.phone && <p>{formData.phone}</p>}
                {formData.email && (
                  <p className="break-all">{formData.email}</p>
                )}
                {formData.dob && <p>{formData.dob}</p>}
              </div>
            </section>
          )}

          {/* LINKS */}
          {(formData.linkedin || formData.github || formData.website) && (
            <section>
              <h3 className="text-xs font-bold uppercase mb-3 text-gray-800 tracking-wider">
                Links
              </h3>
              <div className="flex flex-col gap-1.5 text-xs text-gray-600">
                {formData.linkedin && (
                  <a href={formData.linkedin} className="hover:underline">
                    LinkedIn
                  </a>
                )}
                {formData.github && (
                  <a href={formData.github} className="hover:underline">
                    GitHub
                  </a>
                )}
                {formData.website && (
                  <a href={formData.website} className="hover:underline">
                    Portfolio
                  </a>
                )}
              </div>
            </section>
          )}

          {/* SIDEBAR DYNAMIC SECTIONS */}
          {renderSidebarDynamicSections()}
        </aside>

        <main className="w-[68%] px-8 py-8 space-y-8">
          {/* MAIN DYNAMIC SECTIONS */}
          {renderMainDynamicSections()}
        </main>
      </div>
    </div>
  );
};

const TimelineSection = ({ title, items, icon: Icon }) => {
  if (!items || items.length === 0) return null;

  return (
    <section>
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mb-4 text-gray-900">
        {Icon && <Icon className="text-lg text-gray-700" />}
        {title}
      </h2>

      <div className="relative border-l-2 border-gray-200 pl-5 space-y-6 ml-2">
        {items.map((item, i) => (
          <div key={i} className="relative">
            {/* Dot */}
            <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-gray-200 border-2 border-white"></div>

            {/* HEADING */}
            <h4 className="text-xs font-bold leading-snug text-gray-800">
              {item.heading}
            </h4>

            {/* PERIOD */}
            {item.period && (
              <p className="text-[10px] text-gray-500 mt-0.5 font-medium mb-1">
                {item.period}
              </p>
            )}

            {/* BULLETS */}
            {item.points && item.points.length > 0 && (
              <div className="text-xs text-gray-600 mt-1 leading-relaxed">
                {item.points.length === 1 ? (
                  <div
                    className="whitespace-pre-wrap [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1"
                    dangerouslySetInnerHTML={{ __html: item.points[0] }}
                  />
                ) : (
                  <ul className="list-disc pl-4 space-y-0.5">
                    {item.points.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CorporateTemplate;