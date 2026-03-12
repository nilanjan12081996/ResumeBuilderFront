"use client";
import React from "react";

// ── PDF-safe inline SVG icons (no external deps needed for PDF rendering) ──
const IconLocation = ({ size = 12, color = "#9ca3af" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const IconEmail = ({ size = 12, color = "#9ca3af" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const IconPhone = ({ size = 12, color = "#9ca3af" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const IconLinkedIn = ({ size = 12, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

const IconGlobe = ({ size = 12, color = "#9ca3af" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const LinkedInPrime = ({ formData, sections, themeColor, resumeSettings }) => {
  const { text, layout } = resumeSettings;
  const color = themeColor || "#0a66c2";

  const formatDate = (dateValue) => {
    if (!dateValue) return null;
    const strVal = String(dateValue).trim();
    if (strVal.toLowerCase() === "present") return "Present";
    if (strVal.toUpperCase() === "PRESENT") return "Present";
    const d = new Date(strVal);
    if (!isNaN(d.getTime())) {
      return d.toLocaleString("en-US", { month: "short", year: "numeric" });
    }
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
  const Divider = () => (
    <div style={{ borderTop: "1pt solid #e5e7eb", margin: "10pt 0" }} />
  );

  // ── Section Heading ───────────────────────────────────────────
  const SectionHeading = ({ title }) => (
    <div
      style={{
        color: "#000000",
        fontFamily: text.secondaryFont,
        fontSize: `${text.sectionTitle}pt`,
        fontWeight: text.sectionTitleWeight,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: "8pt",
      }}
    >
      {title}
    </div>
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

  const bodyStyle = {
    fontFamily: text.primaryFont,
    fontSize: `${text.body}pt`,
    fontWeight: text.bodyWeight,
    lineHeight: text.lineHeight,
    color: "#374151",
  };

  // ── RENDERERS ─────────────────────────────────────────────────

  const renderSummary = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div
        className="resume-content"
        style={{ ...bodyStyle, color: "#374151", textAlign: "justify" }}
        dangerouslySetInnerHTML={{ __html: section.summary }}
      />
      <Divider />
    </div>
  );

  const renderExperience = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      {section.experiences?.map((exp, i) => {
        const dr = dateRange(exp.startDate, exp.endDate);
        const dur = calcDuration(exp.startDate, exp.endDate);
        return (
          <div key={exp.id || i} style={{ marginBottom: "10pt" }}>
            <div style={{
              fontFamily: text.secondaryFont || text.primaryFont,
              fontSize: `${text.body + 1}pt`,
              fontWeight: "700",
              color: "#111",
              marginBottom: "1pt",
            }}>
              {exp.jobTitle}
            </div>
            {exp.company && (
              <div style={{ ...bodyStyle, color: "#374151", marginBottom: "1pt" }}>
                {exp.company}
              </div>
            )}
            {dr && (
              <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#6b7280", marginBottom: "1pt" }}>
                {dr}{dur ? ` · ${dur}` : ""}
              </div>
            )}
            {exp.city && (
              <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#9ca3af", marginBottom: "1pt" }}>
                {exp.city}
              </div>
            )}
            {exp.description && (
              <div
                className="resume-content"
                style={{ ...bodyStyle, marginTop: "4pt" }}
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
            )}
          </div>
        );
      })}
      <Divider />
    </div>
  );

  const renderEducation = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      {section.educations?.map((edu, i) => {
        const dr = dateRange(edu.startDate, edu.endDate);
        return (
          <div key={edu.id || i} style={{ marginBottom: "10pt" }}>
            <div style={{
              fontFamily: text.secondaryFont || text.primaryFont,
              fontSize: `${text.body + 1}pt`,
              fontWeight: "700",
              color: "#111",
              marginBottom: "1pt",
            }}>
              {edu.institute}
            </div>
            {edu.degree && (
              <div style={{ ...bodyStyle, color: "#374151", marginBottom: "1pt" }}>
                {edu.degree}
              </div>
            )}
            {dr && (
              <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#6b7280", marginBottom: "1pt" }}>
                {dr}
              </div>
            )}
            {edu.city && (
              <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#9ca3af", marginBottom: "1pt" }}>
                {edu.city}
              </div>
            )}
            {edu.description && (
              <div
                className="resume-content"
                style={{ ...bodyStyle, marginTop: "4pt" }}
                dangerouslySetInnerHTML={{ __html: edu.description }}
              />
            )}
          </div>
        );
      })}
      <Divider />
    </div>
  );

  const renderSkills = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      <div>
        {section.skills?.map((skill, i) => (
          <span key={skill.id || i} style={{
            display: "inline-block",
            border: "1pt solid #e5e7eb",
            borderRadius: "20pt",
            backgroundColor: "#f9fafb",
            padding: "2pt 8pt",
            fontSize: `${text.body - 1}pt`,
            color: "#374151",
            fontFamily: text.primaryFont,
            marginRight: "4pt",
            marginBottom: "4pt",
          }}>
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
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {Array.from({ length: Math.ceil((section.languages?.length || 0) / 3) }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {[0, 1, 2].map(colIdx => {
                const l = section.languages?.[rowIdx * 3 + colIdx];
                if (!l) return <td key={colIdx} style={{ paddingRight: "16pt", paddingBottom: "4pt" }} />;
                return (
                  <td key={colIdx} style={{ paddingRight: "16pt", paddingBottom: "4pt", verticalAlign: "top" }}>
                    <span style={{ fontWeight: "600", color: "#111", fontFamily: text.primaryFont, fontSize: `${text.body}pt` }}>
                      {l.language}
                    </span>
                    {!section.hideProficiency && l.level && (
                      <span style={{ color: "#6b7280", fontSize: `${text.body - 1}pt`, marginLeft: "4pt", fontFamily: text.primaryFont }}>
                        ({l.level})
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Divider />
    </div>
  );

  const renderCourses = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      {section.courses?.map((course, i) => (
        <div key={course.id || i} style={{ marginBottom: "8pt" }}>
          <div style={{
            fontFamily: text.secondaryFont || text.primaryFont,
            fontSize: `${text.body}pt`,
            fontWeight: "600",
            color: "#111",
            marginBottom: "1pt",
          }}>
            {course.course}
          </div>
          {course.institution && (
            <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#6b7280", marginBottom: "1pt" }}>
              {course.institution}
            </div>
          )}
          {dateRange(course.startDate, course.endDate) && (
            <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#9ca3af", marginBottom: "1pt" }}>
              {dateRange(course.startDate, course.endDate)}
            </div>
          )}
          {course.description && (
            <div
              className="resume-content"
              style={{ ...bodyStyle, marginTop: "2pt" }}
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          )}
        </div>
      ))}
      <Divider />
    </div>
  );

  const renderHonors = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      {section.items?.map((item, i) => {
        const dr = dateRange(item.startDate, item.endDate);
        return (
          <div key={item.id || i} style={{ marginBottom: "10pt" }}>
            <div style={{
              fontFamily: text.secondaryFont || text.primaryFont,
              fontSize: `${text.body + 1}pt`,
              fontWeight: "700",
              color: "#111",
              marginBottom: "1pt",
            }}>
              {item.title}
            </div>
            {item.issuer && (
              <div style={{ ...bodyStyle, color: "#374151", marginBottom: "1pt" }}>
                {item.issuer}
              </div>
            )}
            {dr && (
              <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#6b7280", marginBottom: "1pt" }}>
                {dr}
              </div>
            )}
            {item.description && (
              <div
                className="resume-content"
                style={{ ...bodyStyle, marginTop: "4pt" }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        );
      })}
      <Divider />
    </div>
  );

  const renderCustomSimple = (section) => {
    const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
    return (
      <div key={section.id}>
        <SectionHeading title={section.title} />
        {section.items?.map((item, i) => {
          const name = typeof item === "object" ? item.name || item.title : item;
          const levelName =
            typeof item === "object" && !section.hideExperienceLevel && item.level != null
              ? levels[item.level]
              : null;
          return (
            <table key={i} style={{ borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top" }}>
                    <span style={{ ...bodyStyle, color: "#374151" }}>
                      {name}
                      {levelName && (
                        <span style={{ color: "#9ca3af", marginLeft: "4pt", fontSize: `${text.body - 1}pt` }}>
                          ({levelName})
                        </span>
                      )}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
        <Divider />
      </div>
    );
  };

  const renderCustomAdvanced = (section) => (
    <div key={section.id}>
      <SectionHeading title={section.title} />
      {section.items?.map((item, i) => {
        const dr = dateRange(item.startDate, item.endDate);
        return (
          <div key={item.id || i} style={{ marginBottom: "10pt" }}>
            <div style={{
              fontFamily: text.secondaryFont || text.primaryFont,
              fontSize: `${text.body + 1}pt`,
              fontWeight: "700",
              color: "#111",
              marginBottom: "1pt",
            }}>
              {item.title}
            </div>
            {item.city && (
              <div style={{ ...bodyStyle, color: "#374151", marginBottom: "1pt" }}>
                {item.city}
              </div>
            )}
            {dr && (
              <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#6b7280", marginBottom: "1pt" }}>
                {dr}
              </div>
            )}
            {item.description && (
              <div
                className="resume-content"
                style={{ ...bodyStyle, marginTop: "4pt" }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
          </div>
        );
      })}
      <Divider />
    </div>
  );

  // ── Contact address build ─────────────────────────────────────
  const buildAddressLine = () => {
    const parts = [];
    if (formData.address) parts.push(formData.address);
    if (formData.city_state && !(formData.address || "").includes(formData.city_state))
      parts.push(formData.city_state);
    if (formData.country && !(formData.address || "").includes(formData.country))
      parts.push(formData.country);
    return parts.filter(Boolean).join(", ");
  };

  const addressLine = buildAddressLine();
  const iconSize = text.body + 2;

  // ── MAIN RENDER ───────────────────────────────────────────────
  return (
    <div style={{ overflowY: "auto" }}>
      <style>{`
        .resume-content ul { list-style-type: disc; padding-left: 14pt; margin: 2pt 0; }
        .resume-content ol { list-style-type: decimal; padding-left: 14pt; margin: 2pt 0; }
        .resume-content li { margin-bottom: 2pt; }
        .resume-content strong { font-weight: bold; }
        .resume-content em { font-style: italic; }
        .resume-content p { margin-bottom: 2pt; }

        /* ── PDF-safe profile photo circle ── */
        .linkedin-profile-photo {
          width: 72pt;
          height: 72pt;
          border-radius: 50% !important;
          -webkit-border-radius: 50% !important;
          object-fit: cover;
          display: block;
          border: 4pt solid #fff;
        }
        .linkedin-profile-initials {
          width: 72pt;
          height: 72pt;
          border-radius: 50% !important;
          -webkit-border-radius: 50% !important;
          background-color: ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4pt solid #fff;
        }
      `}</style>
      <div
        style={{
          minHeight: "297mm",
          width: "100%",
          backgroundColor: "#fff",
          fontFamily: text.primaryFont,
          lineHeight: text.lineHeight,
          fontSize: `${text.body}pt`,
        }}
      >

        {/* ══ 1. COVER PHOTO BANNER ════════════════════════════════ */}
        <div style={{ position: "relative", width: "100%" }}>
          {/* Cover photo area */}
          {formData.coverImage ? (
            <img
              src={formData.coverImage}
              alt="Cover"
              style={{ width: "100%", display: "block", height: "100pt", objectFit: "cover" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100pt", backgroundColor: color }} />
          )}

          {/* ── Profile photo: use <img> with border-radius directly (PDF-safe) ── */}
          <div style={{
            position: "absolute",
            bottom: "-32pt",
            left: `${layout.leftRight || 20}pt`,
          }}>
            {formData.profileImage ? (
              // KEY FIX: border-radius on <img> itself, no overflow:hidden wrapper needed
              <img
                src={formData.profileImage}
                alt="Profile"
                className="linkedin-profile-photo"
                style={{
                  width: "72pt",
                  height: "72pt",
                  borderRadius: "50%",
                  WebkitBorderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                  border: "4pt solid #fff",
                  // clip-path as fallback for PDF renderers that ignore border-radius on img
                  clipPath: "circle(50%)",
                  WebkitClipPath: "circle(50%)",
                }}
              />
            ) : (
              // Fallback initials — use <div> with border-radius, no overflow:hidden needed since no img child
              <div
                className="linkedin-profile-initials"
                style={{
                  width: "72pt",
                  height: "72pt",
                  borderRadius: "50%",
                  WebkitBorderRadius: "50%",
                  backgroundColor: color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4pt solid #fff",
                }}
              >
                <span style={{ color: "#fff", fontWeight: "700", fontSize: "18pt" }}>
                  {(formData.first_name?.[0] || "") + (formData.last_name?.[0] || "")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Spacer for profile photo overlap */}
        <div style={{
          paddingTop: "38pt",
          paddingLeft: `${layout.leftRight || 20}pt`,
          paddingRight: `${layout.leftRight || 20}pt`,
          paddingBottom: `${layout.topBottom || 20}pt`,
        }}>

          {/* ══ 2. NAME + HEADLINE ═══════════════════════════════════ */}
          <div style={{ marginBottom: "10pt" }}>
            <div style={{
              fontFamily: text.secondaryFont,
              fontSize: `${text.primaryHeading}pt`,
              fontWeight: text.primaryHeadingWeight,
              color: "#111",
              lineHeight: 1.1,
              marginBottom: "3pt",
            }}>
              {formData.first_name} {formData.last_name}
            </div>
            {formData.job_target && (
              <div style={{ ...bodyStyle, color: "#374151" }}>
                {formData.job_target}
              </div>
            )}
          </div>

          <Divider />

          {/* ══ 3. SUMMARY ═══════════════════════════════════════════ */}
          {summarySections.map((s) => renderSummary(s))}

          {/* ══ 4. CONTACT INFORMATION ═══════════════════════════════ */}
          <div style={{ marginBottom: "8pt" }}>
            <SectionHeading title="Contact Information" />

            {/* ── Using inline SVG icons — renders correctly in both screen & PDF ── */}
            {addressLine && (
              <table style={{ borderCollapse: "collapse", marginBottom: "4pt" }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle", paddingRight: "6pt", width: `${iconSize}pt` }}>
                      <IconLocation size={iconSize} color="#9ca3af" />
                    </td>
                    <td style={{ verticalAlign: "top" }}>
                      <span style={{ ...bodyStyle, color: "#374151" }}>{addressLine}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {formData.email && (
              <table style={{ borderCollapse: "collapse", marginBottom: "4pt" }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle", paddingRight: "6pt", width: `${iconSize}pt` }}>
                      <IconEmail size={iconSize} color="#9ca3af" />
                    </td>
                    <td style={{ verticalAlign: "top" }}>
                      <a href={`mailto:${formData.email}`} style={{ ...bodyStyle, color: "#2563eb", textDecoration: "none" }}>
                        {formData.email}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {formData.phone && (
              <table style={{ borderCollapse: "collapse", marginBottom: "4pt" }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle", paddingRight: "6pt", width: `${iconSize}pt` }}>
                      <IconPhone size={iconSize} color="#9ca3af" />
                    </td>
                    <td style={{ verticalAlign: "top" }}>
                      <span style={{ ...bodyStyle, color: "#374151" }}>{formData.phone}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {formData.linkedin && (
              <table style={{ borderCollapse: "collapse", marginBottom: "4pt" }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle", paddingRight: "6pt", width: `${iconSize}pt` }}>
                      <IconLinkedIn size={iconSize} color="#2563eb" />
                    </td>
                    <td style={{ verticalAlign: "top" }}>
                      <a
                        href={formData.linkedin.startsWith("http") ? formData.linkedin : `https://${formData.linkedin}`}
                        style={{ ...bodyStyle, color: "#2563eb", textDecoration: "none", wordBreak: "break-all" }}
                      >
                        {formData.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {formData.website && (
              <table style={{ borderCollapse: "collapse", marginBottom: "4pt" }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "middle", paddingRight: "6pt", width: `${iconSize}pt` }}>
                      <IconGlobe size={iconSize} color="#9ca3af" />
                    </td>
                    <td style={{ verticalAlign: "top" }}>
                      <a
                        href={formData.website.startsWith("http") ? formData.website : `https://${formData.website}`}
                        style={{ ...bodyStyle, color: "#2563eb", textDecoration: "none", wordBreak: "break-all" }}
                      >
                        {formData.website.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
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

          {/* ══ 14. CUSTOM SIMPLE ════════════════════════════════════ */}
          {customSimpleSections.map((s) => renderCustomSimple(s))}

          {/* ══ 15. CUSTOM ADVANCED ══════════════════════════════════ */}
          {customAdvSections.map((s) => renderCustomAdvanced(s))}

        </div>
      </div>
    </div>
  );
};

export default LinkedInPrime;

// "use client";
// import React from "react";
// import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
// import { FaLinkedin, FaGlobe } from "react-icons/fa";

// const LinkedInPrime = ({ formData, sections, themeColor, resumeSettings }) => {
//   const { text, layout } = resumeSettings;
//   const color = themeColor || "#0a66c2";

//   const formatDate = (dateValue) => {
//     if (!dateValue) return null;
//     const strVal = String(dateValue).trim();
//     if (strVal.toLowerCase() === "present") return "Present";
//     if (strVal.toUpperCase() === "PRESENT") return "Present";
//     const d = new Date(strVal);
//     if (!isNaN(d.getTime())) {
//       return d.toLocaleString("en-US", { month: "short", year: "numeric" });
//     }
//     return strVal;
//   };

//   const dateRange = (start, end) => {
//     const s = formatDate(start);
//     const e = formatDate(end);
//     if (s && e) return `${s} – ${e}`;
//     return s || e || "";
//   };

//   const calcDuration = (start, end) => {
//     if (!start) return "";
//     const s = new Date(start);
//     if (isNaN(s.getTime())) return "";
//     const e =
//       !end || String(end).toLowerCase() === "present"
//         ? new Date()
//         : new Date(end);
//     if (isNaN(e.getTime())) return "";
//     const totalMonths =
//       (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
//     if (totalMonths <= 0) return "";
//     const yrs = Math.floor(totalMonths / 12);
//     const mos = totalMonths % 12;
//     return [
//       yrs > 0 && `${yrs} yr${yrs > 1 ? "s" : ""}`,
//       mos > 0 && `${mos} mo${mos > 1 ? "s" : ""}`,
//     ]
//       .filter(Boolean)
//       .join(" ");
//   };

//   // ── Section divider line ──────────────────────────────────────
//   const Divider = () => (
//     <div style={{ borderTop: "1pt solid #e5e7eb", margin: "10pt 0" }} />
//   );

//   // ── Section Heading ───────────────────────────────────────────
//   const SectionHeading = ({ title }) => (
//     <div
//       style={{
//         color: "#000000",
//         fontFamily: text.secondaryFont,
//         fontSize: `${text.sectionTitle}pt`,
//         fontWeight: text.sectionTitleWeight,
//         textTransform: "uppercase",
//         letterSpacing: "0.05em",
//         marginBottom: "8pt",
//       }}
//     >
//       {title}
//     </div>
//   );

//   // ── Separate sections by type ─────────────────────────────────
//   const findSection = (type) => (sections || []).filter((s) => s.type === type);
//   const skillSections = findSection("skills");
//   const languageSections = findSection("languages");
//   const summarySections = findSection("summary");
//   const experienceSections = findSection("experience");
//   const educationSections = findSection("education");
//   const coursesSections = findSection("courses");
//   const honorsSection = findSection("honors");
//   const customSimpleSections = findSection("custom_simple");
//   const customAdvSections = findSection("custom");

//   const bodyStyle = {
//     fontFamily: text.primaryFont,
//     fontSize: `${text.body}pt`,
//     fontWeight: text.bodyWeight,
//     lineHeight: text.lineHeight,
//     color: "#374151",
//   };

//   // ── RENDERERS ─────────────────────────────────────────────────

//   const renderSummary = (section) => (
//     <div key={section.id}>
//       <SectionHeading title={section.title} />
//       <div
//         className="resume-content"
//         style={{ ...bodyStyle, color: "#374151", textAlign: "justify" }}
//         dangerouslySetInnerHTML={{ __html: section.summary }}
//       />
//       <Divider />
//     </div>
//   );

//   const renderExperience = (section) => (
//     <div key={section.id}>
//       <SectionHeading title={section.title} />
//       {section.experiences?.map((exp, i) => {
//         const dr = dateRange(exp.startDate, exp.endDate);
//         const dur = calcDuration(exp.startDate, exp.endDate);
//         return (
//           <div key={exp.id || i} style={{ marginBottom: "10pt" }}>
//             <div style={{
//               fontFamily: text.secondaryFont || text.primaryFont,
//               fontSize: `${text.body + 1}pt`,
//               fontWeight: "700",
//               color: "#111",
//               marginBottom: "1pt",
//             }}>
//               {exp.jobTitle}
//             </div>
//             {exp.company && (
//               <div style={{ ...bodyStyle, color: "#374151", marginBottom: "1pt" }}>
//                 {exp.company}
//               </div>
//             )}
//             {dr && (
//               <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#6b7280", marginBottom: "1pt" }}>
//                 {dr}{dur ? ` · ${dur}` : ""}
//               </div>
//             )}
//             {exp.city && (
//               <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#9ca3af", marginBottom: "1pt" }}>
//                 {exp.city}
//               </div>
//             )}
//             {exp.description && (
//               <div
//                 className="resume-content"
//                 style={{ ...bodyStyle, marginTop: "4pt" }}
//                 dangerouslySetInnerHTML={{ __html: exp.description }}
//               />
//             )}
//           </div>
//         );
//       })}
//       <Divider />
//     </div>
//   );

//   const renderEducation = (section) => (
//     <div key={section.id}>
//       <SectionHeading title={section.title} />
//       {section.educations?.map((edu, i) => {
//         const dr = dateRange(edu.startDate, edu.endDate);
//         return (
//           <div key={edu.id || i} style={{ marginBottom: "10pt" }}>
//             <div style={{
//               fontFamily: text.secondaryFont || text.primaryFont,
//               fontSize: `${text.body + 1}pt`,
//               fontWeight: "700",
//               color: "#111",
//               marginBottom: "1pt",
//             }}>
//               {edu.institute}
//             </div>
//             {edu.degree && (
//               <div style={{ ...bodyStyle, color: "#374151", marginBottom: "1pt" }}>
//                 {edu.degree}
//               </div>
//             )}
//             {dr && (
//               <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#6b7280", marginBottom: "1pt" }}>
//                 {dr}
//               </div>
//             )}
//             {edu.city && (
//               <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#9ca3af", marginBottom: "1pt" }}>
//                 {edu.city}
//               </div>
//             )}
//             {edu.description && (
//               <div
//                 className="resume-content"
//                 style={{ ...bodyStyle, marginTop: "4pt" }}
//                 dangerouslySetInnerHTML={{ __html: edu.description }}
//               />
//             )}
//           </div>
//         );
//       })}
//       <Divider />
//     </div>
//   );

//   const renderSkills = (section) => (
//     <div key={section.id}>
//       <SectionHeading title={section.title} />
//       <div>
//         {section.skills?.map((skill, i) => (
//           <span key={skill.id || i} style={{
//             display: "inline-block",
//             border: "1pt solid #e5e7eb",
//             borderRadius: "20pt",
//             backgroundColor: "#f9fafb",
//             padding: "2pt 8pt",
//             fontSize: `${text.body - 1}pt`,
//             color: "#374151",
//             fontFamily: text.primaryFont,
//             marginRight: "4pt",
//             marginBottom: "4pt",
//           }}>
//             {skill.name}
//           </span>
//         ))}
//       </div>
//       <Divider />
//     </div>
//   );

//   const renderLanguages = (section) => (
//     <div key={section.id}>
//       <SectionHeading title={section.title} />
//       <table style={{ borderCollapse: "collapse" }}>
//         <tbody>
//           {Array.from({ length: Math.ceil((section.languages?.length || 0) / 3) }).map((_, rowIdx) => (
//             <tr key={rowIdx}>
//               {[0, 1, 2].map(colIdx => {
//                 const l = section.languages?.[rowIdx * 3 + colIdx];
//                 if (!l) return <td key={colIdx} style={{ paddingRight: "16pt", paddingBottom: "4pt" }} />;
//                 return (
//                   <td key={colIdx} style={{ paddingRight: "16pt", paddingBottom: "4pt", verticalAlign: "top" }}>
//                     <span style={{ fontWeight: "600", color: "#111", fontFamily: text.primaryFont, fontSize: `${text.body}pt` }}>
//                       {l.language}
//                     </span>
//                     {!section.hideProficiency && l.level && (
//                       <span style={{ color: "#6b7280", fontSize: `${text.body - 1}pt`, marginLeft: "4pt", fontFamily: text.primaryFont }}>
//                         ({l.level})
//                       </span>
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Divider />
//     </div>
//   );

//   const renderCourses = (section) => (
//     <div key={section.id}>
//       <SectionHeading title={section.title} />
//       {section.courses?.map((course, i) => (
//         <div key={course.id || i} style={{ marginBottom: "8pt" }}>
//           <div style={{
//             fontFamily: text.secondaryFont || text.primaryFont,
//             fontSize: `${text.body}pt`,
//             fontWeight: "600",
//             color: "#111",
//             marginBottom: "1pt",
//           }}>
//             {course.course}
//           </div>
//           {course.institution && (
//             <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#6b7280", marginBottom: "1pt" }}>
//               {course.institution}
//             </div>
//           )}
//           {dateRange(course.startDate, course.endDate) && (
//             <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#9ca3af", marginBottom: "1pt" }}>
//               {dateRange(course.startDate, course.endDate)}
//             </div>
//           )}
//           {course.description && (
//             <div
//               className="resume-content"
//               style={{ ...bodyStyle, marginTop: "2pt" }}
//               dangerouslySetInnerHTML={{ __html: course.description }}
//             />
//           )}
//         </div>
//       ))}
//       <Divider />
//     </div>
//   );

//   const renderHonors = (section) => (
//     <div key={section.id}>
//       <SectionHeading title={section.title} />
//       {section.items?.map((item, i) => {
//         const dr = dateRange(item.startDate, item.endDate);
//         return (
//           <div key={item.id || i} style={{ marginBottom: "10pt" }}>
//             <div style={{
//               fontFamily: text.secondaryFont || text.primaryFont,
//               fontSize: `${text.body + 1}pt`,
//               fontWeight: "700",
//               color: "#111",
//               marginBottom: "1pt",
//             }}>
//               {item.title}
//             </div>
//             {item.issuer && (
//               <div style={{ ...bodyStyle, color: "#374151", marginBottom: "1pt" }}>
//                 {item.issuer}
//               </div>
//             )}
//             {dr && (
//               <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#6b7280", marginBottom: "1pt" }}>
//                 {dr}
//               </div>
//             )}
//             {item.description && (
//               <div
//                 className="resume-content"
//                 style={{ ...bodyStyle, marginTop: "4pt" }}
//                 dangerouslySetInnerHTML={{ __html: item.description }}
//               />
//             )}
//           </div>
//         );
//       })}
//       <Divider />
//     </div>
//   );

//   // Custom Simple — bullet dot style
//   const renderCustomSimple = (section) => {
//     const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
//     return (
//       <div key={section.id}>
//         <SectionHeading title={section.title} />
//         {section.items?.map((item, i) => {
//           const name = typeof item === "object" ? item.name || item.title : item;
//           const levelName =
//             typeof item === "object" && !section.hideExperienceLevel && item.level != null
//               ? levels[item.level]
//               : null;
//           return (
//             <table key={i} style={{ borderCollapse: "collapse" }}>
//               <tbody>
//                 <tr>
//                   <td style={{ verticalAlign: "top" }}>
//                     <span style={{ ...bodyStyle, color: "#374151" }}>
//                       {name}
//                       {levelName && (
//                         <span style={{ color: "#9ca3af", marginLeft: "4pt", fontSize: `${text.body - 1}pt` }}>
//                           ({levelName})
//                         </span>
//                       )}
//                     </span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           );
//         })}
//         <Divider />
//       </div>
//     );
//   };

//   // Custom Advanced
//   const renderCustomAdvanced = (section) => (
//     <div key={section.id}>
//       <SectionHeading title={section.title} />
//       {section.items?.map((item, i) => {
//         const dr = dateRange(item.startDate, item.endDate);
//         return (
//           <div key={item.id || i} style={{ marginBottom: "10pt" }}>
//             <div style={{
//               fontFamily: text.secondaryFont || text.primaryFont,
//               fontSize: `${text.body + 1}pt`,
//               fontWeight: "700",
//               color: "#111",
//               marginBottom: "1pt",
//             }}>
//               {item.title}
//             </div>
//             {item.city && (
//               <div style={{ ...bodyStyle, color: "#374151", marginBottom: "1pt" }}>
//                 {item.city}
//               </div>
//             )}
//             {dr && (
//               <div style={{ ...bodyStyle, fontSize: `${text.body - 1}pt`, color: "#6b7280", marginBottom: "1pt" }}>
//                 {dr}
//               </div>
//             )}
//             {item.description && (
//               <div
//                 className="resume-content"
//                 style={{ ...bodyStyle, marginTop: "4pt" }}
//                 dangerouslySetInnerHTML={{ __html: item.description }}
//               />
//             )}
//           </div>
//         );
//       })}
//       <Divider />
//     </div>
//   );

//   // ── Contact address build ─────────────────────────────────────
//   const buildAddressLine = () => {
//     const parts = [];
//     if (formData.address) parts.push(formData.address);
//     if (formData.city_state && !(formData.address || "").includes(formData.city_state))
//       parts.push(formData.city_state);
//     if (formData.country && !(formData.address || "").includes(formData.country))
//       parts.push(formData.country);
//     return parts.filter(Boolean).join(", ");
//   };

//   const addressLine = buildAddressLine();

//   // ── MAIN RENDER ───────────────────────────────────────────────
//   return (
//     <div style={{ overflowY: "auto" }}>
//       <style>{`
//         .resume-content ul { list-style-type: disc; padding-left: 14pt; margin: 2pt 0; }
//         .resume-content ol { list-style-type: decimal; padding-left: 14pt; margin: 2pt 0; }
//         .resume-content li { margin-bottom: 2pt; }
//         .resume-content strong { font-weight: bold; }
//         .resume-content em { font-style: italic; }
//         .resume-content p { margin-bottom: 2pt; }
//       `}</style>
//       <div
//         style={{
//           minHeight: "297mm",
//           width: "100%",
//           backgroundColor: "#fff",
//           fontFamily: text.primaryFont,
//           lineHeight: text.lineHeight,
//           fontSize: `${text.body}pt`,
//         }}
//       >

//         {/* ══ 1. COVER PHOTO BANNER ════════════════════════════════ */}
//         <div style={{ position: "relative", width: "100%" }}>
//           {/* Cover photo area */}
//           {formData.coverImage ? (
//             <img
//               src={formData.coverImage}
//               alt="Cover"
//               style={{ width: "100%", display: "block", height: "100pt", objectFit: "cover" }}
//             />
//           ) : (
//             <div style={{ width: "100%", height: "100pt", backgroundColor: color }} />
//           )}

//           {/* Profile photo — overlapping cover, position absolute */}
//           <div style={{
//             position: "absolute",
//             bottom: "-32pt",
//             left: `${layout.leftRight || 20}pt`,
//             width: "72pt",
//             height: "72pt",
//             borderRadius: "50%",
//             overflow: "hidden",
//             border: "4pt solid #fff",
//             backgroundColor: "#fff",
//           }}>
//             {formData.profileImage ? (
//               <img
//                 src={formData.profileImage}
//                 alt="Profile"
//                 style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
//               />
//             ) : (
//               <div style={{
//                 width: "100%",
//                 height: "100%",
//                 backgroundColor: color,
//                 display: "table",
//               }}>
//                 <div style={{ display: "table-cell", verticalAlign: "middle", textAlign: "center" }}>
//                   <span style={{ color: "#fff", fontWeight: "700", fontSize: "18pt" }}>
//                     {(formData.first_name?.[0] || "") + (formData.last_name?.[0] || "")}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Spacer for profile photo overlap */}
//         <div style={{
//           paddingTop: "38pt",
//           paddingLeft: `${layout.leftRight || 20}pt`,
//           paddingRight: `${layout.leftRight || 20}pt`,
//           paddingBottom: `${layout.topBottom || 20}pt`,
//         }}>

//           {/* ══ 2. NAME + HEADLINE ═══════════════════════════════════ */}
//           <div style={{ marginBottom: "10pt" }}>
//             <div style={{
//               fontFamily: text.secondaryFont,
//               fontSize: `${text.primaryHeading}pt`,
//               fontWeight: text.primaryHeadingWeight,
//               color: "#111",
//               lineHeight: 1.1,
//               marginBottom: "3pt",
//             }}>
//               {formData.first_name} {formData.last_name}
//             </div>
//             {formData.job_target && (
//               <div style={{ ...bodyStyle, color: "#374151" }}>
//                 {formData.job_target}
//               </div>
//             )}
//           </div>

//           <Divider />

//           {/* ══ 3. SUMMARY ═══════════════════════════════════════════ */}
//           {summarySections.map((s) => renderSummary(s))}

//           {/* ══ 4. CONTACT INFORMATION ═══════════════════════════════ */}
//           <div style={{ marginBottom: "8pt" }}>
//             <SectionHeading title="Contact Information" />
//             {addressLine && (
//               <table style={{ borderCollapse: "collapse", marginBottom: "4pt" }}>
//                 <tbody>
//                   <tr>
//                     <td style={{ verticalAlign: "top", paddingRight: "6pt", paddingTop: "1pt" }}>
//                       <MdLocationOn style={{ color: "#9ca3af", fontSize: `${text.body + 2}pt` }} />
//                     </td>
//                     <td style={{ verticalAlign: "top" }}>
//                       <span style={{ ...bodyStyle, color: "#374151" }}>{addressLine}</span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             )}
//             {formData.email && (
//               <table style={{ borderCollapse: "collapse", marginBottom: "4pt" }}>
//                 <tbody>
//                   <tr>
//                     <td style={{ verticalAlign: "top", paddingRight: "6pt", paddingTop: "1pt" }}>
//                       <MdEmail style={{ color: "#9ca3af", fontSize: `${text.body + 2}pt` }} />
//                     </td>
//                     <td style={{ verticalAlign: "top" }}>
//                       <a href={`mailto:${formData.email}`} style={{ ...bodyStyle, color: "#2563eb", textDecoration: "none" }}>
//                         {formData.email}
//                       </a>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             )}
//             {formData.phone && (
//               <table style={{ borderCollapse: "collapse", marginBottom: "4pt" }}>
//                 <tbody>
//                   <tr>
//                     <td style={{ verticalAlign: "top", paddingRight: "6pt", paddingTop: "1pt" }}>
//                       <MdPhone style={{ color: "#9ca3af", fontSize: `${text.body + 2}pt` }} />
//                     </td>
//                     <td style={{ verticalAlign: "top" }}>
//                       <span style={{ ...bodyStyle, color: "#374151" }}>{formData.phone}</span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             )}
//             {formData.linkedin && (
//               <table style={{ borderCollapse: "collapse", marginBottom: "4pt" }}>
//                 <tbody>
//                   <tr>
//                     <td style={{ verticalAlign: "top", paddingRight: "6pt", paddingTop: "1pt" }}>
//                       <FaLinkedin style={{ color: "#2563eb", fontSize: `${text.body + 2}pt` }} />
//                     </td>
//                     <td style={{ verticalAlign: "top" }}>
//                       <a
//                         href={formData.linkedin.startsWith("http") ? formData.linkedin : `https://${formData.linkedin}`}
//                         style={{ ...bodyStyle, color: "#2563eb", textDecoration: "none", wordBreak: "break-all" }}
//                       >
//                         {formData.linkedin.replace(/^https?:\/\/(www\.)?/, "")}
//                       </a>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             )}
//             {formData.website && (
//               <table style={{ borderCollapse: "collapse", marginBottom: "4pt" }}>
//                 <tbody>
//                   <tr>
//                     <td style={{ verticalAlign: "top", paddingRight: "6pt", paddingTop: "1pt" }}>
//                       <FaGlobe style={{ color: "#9ca3af", fontSize: `${text.body + 2}pt` }} />
//                     </td>
//                     <td style={{ verticalAlign: "top" }}>
//                       <a
//                         href={formData.website.startsWith("http") ? formData.website : `https://${formData.website}`}
//                         style={{ ...bodyStyle, color: "#2563eb", textDecoration: "none", wordBreak: "break-all" }}
//                       >
//                         {formData.website.replace(/^https?:\/\/(www\.)?/, "")}
//                       </a>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             )}
//           </div>

//           <Divider />

//           {/* ══ 5. EXPERIENCE ════════════════════════════════════════ */}
//           {experienceSections.map((s) => renderExperience(s))}

//           {/* ══ 6. EDUCATION ═════════════════════════════════════════ */}
//           {educationSections.map((s) => renderEducation(s))}

//           {/* ══ 7. SKILLS ════════════════════════════════════════════ */}
//           {skillSections.map((s) => renderSkills(s))}

//           {/* ══ 8. LANGUAGES ═════════════════════════════════════════ */}
//           {languageSections.map((s) => renderLanguages(s))}

//           {/* ══ 10. COURSES ══════════════════════════════════════════ */}
//           {coursesSections.map((s) => renderCourses(s))}

//           {/* ══ 16. HONORS & AWARDS ══════════════════════════════════ */}
//           {honorsSection.map((s) => renderHonors(s))}

//           {/* ══ 14. CUSTOM SIMPLE ════════════════════════════════════ */}
//           {customSimpleSections.map((s) => renderCustomSimple(s))}

//           {/* ══ 15. CUSTOM ADVANCED ══════════════════════════════════ */}
//           {customAdvSections.map((s) => renderCustomAdvanced(s))}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default LinkedInPrime;