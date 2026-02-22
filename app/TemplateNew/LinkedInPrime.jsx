"use client";
import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaLinkedin, FaGlobe } from "react-icons/fa";

const LinkedInPrime = ({ formData, sections, themeColor, resumeSettings }) => {
  const { text, layout } = resumeSettings;
  const color = themeColor || "#0a66c2";

  const formatDate = (dateValue) => {
    if (!dateValue) return null;
    const strVal = String(dateValue).trim();
    if (strVal.toLowerCase() === "present") return "Present";
    if (strVal.toUpperCase() === "PRESENT") return "Present";

    // Try parsing as Date
    const d = new Date(strVal);
    if (!isNaN(d.getTime())) {
      return d.toLocaleString("en-US", { month: "short", year: "numeric" });
    }

    // Fallback: return raw string (e.g. "Jan 2020" already formatted)
    return strVal;
  };

  const dateRange = (start, end) => {
    const s = formatDate(start);
    const e = formatDate(end);
    if (s && e) return `${s} – ${e}`;
    return s || e || "";
  };

  const calcDuration = (start, end) => {
    if (!start) return "";
    const s = new Date(start);
    if (isNaN(s.getTime())) return "";
    const e =
      !end || String(end).toLowerCase() === "present"
        ? new Date()
        : new Date(end);
    if (isNaN(e.getTime())) return "";
    const totalMonths =
      (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
    if (totalMonths <= 0) return "";
    const yrs = Math.floor(totalMonths / 12);
    const mos = totalMonths % 12;
    return [
      yrs > 0 && `${yrs} yr${yrs > 1 ? "s" : ""}`,
      mos > 0 && `${mos} mo${mos > 1 ? "s" : ""}`,
    ]
      .filter(Boolean)
      .join(" ");
  };

  // ── Section divider line ──────────────────────────────────────
  const Divider = () => <div className="border-t border-gray-200 my-3" />;

  // ── Section Heading ───────────────────────────────────────────
  const SectionHeading = ({ title }) => (
    <h3
      className="font-bold uppercase tracking-wide mb-3"
      style={{
        color: "#000000",
        fontFamily: text.secondaryFont,
        fontSize: `${text.sectionTitle}pt`,
        fontWeight: text.sectionTitleWeight,
      }}
    >
      {title}
    </h3>
  );

  // ── Separate sections by type ─────────────────────────────────
  const findSection = (type) => (sections || []).filter((s) => s.type === type);
  const skillSections = findSection("skills");
  const languageSections = findSection("languages");
  const summarySections = findSection("summary");
  const experienceSections = findSection("experience");
  const educationSections = findSection("education");
  const coursesSections = findSection("courses");
  const honorsSection = findSection("honors");
  const customSimpleSections = findSection("custom_simple");
  const customAdvSections = findSection("custom");

  // ── RENDERERS ─────────────────────────────────────────────────

  const renderSummary = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div
        className="text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_p]:mb-1"
        style={{
          fontSize: `${text.body}pt`,
          fontWeight: text.bodyWeight,
          textAlign: "justify",
        }}
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
      <Divider />
    </div>
  );

  const renderExperience = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div className="flex flex-col gap-4">
        {section.experiences?.map((exp, i) => {
          const dr = dateRange(exp.startDate, exp.endDate);
          const dur = calcDuration(exp.startDate, exp.endDate);
          return (
            <div key={exp.id || i} className="flex gap-3">
              <div className="flex-1">
                <h4
                  className="font-bold text-black"
                  style={{ fontSize: `${text.body + 1}pt` }}
                >
                  {exp.jobTitle}
                </h4>
                <p className="text-gray-700" style={{ fontSize: `${text.body}pt` }}>
                  {exp.company}
                </p>
                {dr && (
                  <p className="text-gray-500" style={{ fontSize: `${text.body - 1}pt` }}>
                    {dr}
                    {dur ? ` · ${dur}` : ""}
                  </p>
                )}
                {exp.city && (
                  <p className="text-gray-400" style={{ fontSize: `${text.body - 1}pt` }}>
                    {exp.city}
                  </p>
                )}
                {exp.description && (
                  <div
                    className="text-gray-700 mt-2 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_p]:mb-1"
                    style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Divider />
    </div>
  );

  const renderEducation = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div className="flex flex-col gap-4">
        {section.educations?.map((edu, i) => {
          const dr = dateRange(edu.startDate, edu.endDate);
          return (
            <div key={edu.id || i} className="flex gap-3">
              <div className="flex-1">
                <h4
                  className="font-bold text-black"
                  style={{ fontSize: `${text.body + 1}pt` }}
                >
                  {edu.institute}
                </h4>
                {edu.degree && (
                  <p className="text-gray-700" style={{ fontSize: `${text.body}pt` }}>
                    {edu.degree}
                  </p>
                )}
                {dr && (
                  <p className="text-gray-500" style={{ fontSize: `${text.body - 1}pt` }}>
                    {dr}
                  </p>
                )}
                {edu.city && (
                  <p className="text-gray-400" style={{ fontSize: `${text.body - 1}pt` }}>
                    {edu.city}
                  </p>
                )}
                {edu.description && (
                  <div
                    className="text-gray-700 mt-1 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                    style={{ fontSize: `${text.body}pt` }}
                    dangerouslySetInnerHTML={{ __html: edu.description }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Divider />
    </div>
  );

  const renderSkills = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div
        className="flex flex-wrap gap-2"
        style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}
      >
        {section.skills?.map((skill, i) => (
          <span
            key={skill.id || i}
            className="px-3 py-1 rounded-full border text-gray-700 bg-gray-50 border-gray-200"
            style={{ fontSize: `${text.body - 1}pt` }}
          >
            {skill.name}
          </span>
        ))}
      </div>
      <Divider />
    </div>
  );

  const renderLanguages = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div className="flex flex-wrap gap-x-4 gap-y-2" style={{ fontSize: `${text.body}pt` }}>
        {section.languages?.map((l, i) => (
          <div key={l.id || i} className="flex items-center gap-1">
            <span className="font-semibold text-black">{l.language}</span>
            {!section.hideProficiency && l.level && (
              <span className="text-gray-500" style={{ fontSize: `${text.body - 1}pt` }}>
                ({l.level})
              </span>
            )}
          </div>
        ))}
      </div>
      <Divider />
    </div>
  );


  const renderCourses = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div className="flex flex-col gap-3">
        {section.courses?.map((course, i) => (
          <div key={course.id || i}>
            <h4 className="font-semibold text-black" style={{ fontSize: `${text.body}pt` }}>
              {course.course}
            </h4>
            {course.institution && (
              <p className="text-gray-600" style={{ fontSize: `${text.body - 1}pt` }}>
                {course.institution}
              </p>
            )}
            {dateRange(course.startDate, course.endDate) && (
              <p className="text-gray-400" style={{ fontSize: `${text.body - 1}pt` }}>
                {dateRange(course.startDate, course.endDate)}
              </p>
            )}
            {course.description && (
              <div
                className="resume-content"
                style={{ fontSize: `${text.body}pt`, color: "#374151", marginTop: "2pt", lineHeight: text.lineHeight }}
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            )}
          </div>
        ))}
      </div>
      <Divider />
    </div>
  );

  const renderHonors = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div className="flex flex-col gap-4">
        {section.items?.map((item, i) => {
          const dr = dateRange(item.startDate, item.endDate);
          return (
            <div key={item.id || i}>
              <h4 className="font-bold text-black" style={{ fontSize: `${text.body + 1}pt` }}>
                {item.title}
              </h4>
              {item.issuer && (
                <p className="text-gray-700" style={{ fontSize: `${text.body}pt` }}>
                  {item.issuer}
                </p>
              )}
              {dr && (
                <p className="text-gray-500" style={{ fontSize: `${text.body - 1}pt` }}>{dr}</p>
              )}
              {item.description && (
                <div
                  className="text-gray-700 mt-1 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                  style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
            </div>
          );
        })}
      </div>
      <Divider />
    </div>
  );

  // Custom Simple — grid style (competencies, achievements)
  const renderCustomSimple = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div className="flex flex-col gap-2" style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}>
        {section.items?.map((item, i) => {
          const name = typeof item === "object" ? item.name || item.title : item;
          const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
          const levelName = typeof item === "object" && !section.hideExperienceLevel && item.level != null
            ? levels[item.level]
            : null;
          return (
            <div key={i} className="flex items-start gap-2 text-gray-700">
              <span
                className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span>
                {name}
                {levelName && (
                  <span className="text-gray-400 ml-1" style={{ fontSize: `${text.body - 1}pt` }}>
                    ({levelName})
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
      <Divider />
    </div>
  );

  // Custom Advanced
  const renderCustomAdvanced = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div className="flex flex-col gap-4">
        {section.items?.map((item, i) => {
          const dr = dateRange(item.startDate, item.endDate);
          return (
            <div key={item.id || i}>
              <h4 className="font-bold text-black" style={{ fontSize: `${text.body + 1}pt` }}>
                {item.title}
              </h4>
              {item.city && (
                <p className="text-gray-700" style={{ fontSize: `${text.body}pt` }}>
                  {item.city}
                </p>
              )}
              {dr && (
                <p className="text-gray-500" style={{ fontSize: `${text.body - 1}pt` }}>{dr}</p>
              )}
              {item.description && (
                <div
                  className="text-gray-700 mt-1 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                  style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}
            </div>
          );
        })}
      </div>
      <Divider />
    </div>
  );

  // ── Contact info: address build করা — duplicate না দেখানোর জন্য smart merge ──
  // address field এ যদি city/state already থাকে তাহলে city_state আলাদা দেখাবে না
  const buildAddressLine = () => {
    const parts = [];
    if (formData.address) parts.push(formData.address);
    // city_state শুধু তখনই add করো যদি address এ already নেই
    if (
      formData.city_state &&
      !(formData.address || "").includes(formData.city_state)
    ) {
      parts.push(formData.city_state);
    }
    if (
      formData.country &&
      !(formData.address || "").includes(formData.country)
    ) {
      parts.push(formData.country);
    }
    return parts.filter(Boolean).join(", ");
  };

  const addressLine = buildAddressLine();

  // ── MAIN RENDER ───────────────────────────────────────────────
  return (
    <div className="h-screen overflow-y-auto hide-scrollbar">
      <div
        className="min-h-[297mm] w-full bg-white font-sans shadow-lg resume-root"
        style={{ fontFamily: text.primaryFont, lineHeight: text.lineHeight }}
      >

        {/* ══ 1. COVER PHOTO BANNER ════════════════════════════════ */}
        <div className="relative">
          {/* Cover photo area */}
          {formData.coverImage ? (
            <img
              src={formData.coverImage}
              alt="Cover"
              className="w-full object-cover"
              style={{ aspectRatio: "4 / 1" }}
            />
          ) : (
            <div
              className="w-full"
              style={{
                height: "100pt",
                backgroundColor: color,
              }}
            />
          )}

          {/* Profile photo — overlapping cover */}
          <div
            className="absolute left-8 border-4 border-white rounded-full overflow-hidden bg-white"
            style={{
              bottom: "-32pt",
              width: "72pt",
              height: "72pt",
            }}
          >
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white font-bold text-2xl"
                style={{ backgroundColor: color }}
              >
                {(formData.first_name?.[0] || "") + (formData.last_name?.[0] || "")}
              </div>
            )}
          </div>
        </div>

        {/* Spacer for profile photo overlap */}
        <div
          style={{
            paddingTop: "38pt",
            paddingLeft: `${layout.leftRight}pt`,
            paddingRight: `${layout.leftRight}pt`,
          }}
        >

          {/* ══ 2. NAME + HEADLINE ═══════════════════════════════════ */}
          <div className="mb-3">
            <h1
              className="font-bold text-black leading-tight"
              style={{
                fontFamily: text.secondaryFont,
                fontSize: `${text.primaryHeading}pt`,
                fontWeight: text.primaryHeadingWeight,
              }}
            >
              {formData.first_name} {formData.last_name}
            </h1>

            {formData.job_target && (
              <p
                className="mt-1 text-gray-700 leading-snug"
                style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}
              >
                {formData.job_target}
              </p>
            )}
          </div>

          <Divider />

          {/* ══ 3. SUMMARY (if any) ══════════════════════════════════ */}
          {summarySections.map((s) => renderSummary(s))}

          {/* ══ 4. CONTACT INFORMATION ═══════════════════════════════ */}
          <div className="mb-3">
            <SectionHeading title="Contact Information" />
            <div
              className="flex flex-col gap-1 text-gray-700"
              style={{ fontSize: `${text.body}pt`, fontWeight: text.bodyWeight }}
            >
              {/* Address — address + city_state + country smart merge */}
              {addressLine && (
                <div className="flex items-start gap-2">
                  <MdLocationOn className="text-gray-400 flex-shrink-0 mt-[2px]" />
                  <span>{addressLine}</span>
                </div>
              )}

              {/* Email */}
              {formData.email && (
                <div className="flex items-center gap-2">
                  <MdEmail className="text-gray-400 flex-shrink-0" />
                  <a
                    href={`mailto:${formData.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {formData.email}
                  </a>
                </div>
              )}

              {/* Phone */}
              {formData.phone && (
                <div className="flex items-center gap-2">
                  <MdPhone className="text-gray-400 flex-shrink-0" />
                  <span>{formData.phone}</span>
                </div>
              )}

              {/* LinkedIn */}
              {formData.linkedin && (
                <div className="flex items-center gap-2">
                  <FaLinkedin className="text-blue-600 flex-shrink-0" />
                  <a
                    href={
                      formData.linkedin.startsWith("http")
                        ? formData.linkedin
                        : `https://${formData.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {formData.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </div>
              )}

              {/* Website */}
              {formData.website && (
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-gray-400 flex-shrink-0" />
                  <a
                    href={
                      formData.website.startsWith("http")
                        ? formData.website
                        : `https://${formData.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {formData.website.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </div>
              )}
            </div>
          </div>

          <Divider />

          {/* ══ 5. EXPERIENCE ════════════════════════════════════════ */}
          {experienceSections.map((s) => renderExperience(s))}

          {/* ══ 6. EDUCATION ═════════════════════════════════════════ */}
          {educationSections.map((s) => renderEducation(s))}

          {/* ══ 7. SKILLS ════════════════════════════════════════════ */}
          {skillSections.map((s) => renderSkills(s))}

          {/* ══ 8. LANGUAGES ═════════════════════════════════════════ */}
          {languageSections.map((s) => renderLanguages(s))}

          {/* ══ 10. COURSES ══════════════════════════════════════════ */}
          {coursesSections.map((s) => renderCourses(s))}

          {/* ══ 16. HONORS & AWARDS ══════════════════════════════════ */}
          {honorsSection.map((s) => renderHonors(s))}

          {/* ══ 14. CUSTOM SIMPLE (Core Competencies, Achievements etc) */}
          {customSimpleSections.map((s) => renderCustomSimple(s))}

          {/* ══ 15. CUSTOM ADVANCED ══════════════════════════════════ */}
          {customAdvSections.map((s) => renderCustomAdvanced(s))}

        </div>
      </div>
    </div>
  );
};

export default LinkedInPrime;