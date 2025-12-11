import { forwardRef, useEffect } from "react"
import { convertToSubmitFormat } from "../utils/DateSubmitFormatter"
import { useDispatch, useSelector } from "react-redux";
import { currentSubscription, getIpData } from "../reducers/PlanSlice";

const Template2 = forwardRef(({ data, education, experiences, skills, languages, personalPro, achivments, certificates, getUpdateResumeInfoData }, ref) => {

  const { ipData, createOrderData, error, currentSubscriptionData } = useSelector(
    (state) => state.planst
  );
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getIpData()).then((res) => {
      if (res?.payload?.ip) {
        dispatch(currentSubscription(res?.payload?.ip))
      }
    })
  }, [])
  console.log("datas", data);


  const validGoal = data.goal?.trim() !== "";

  const validEducation = (education || []).filter(e =>
    e.institution?.trim() ||
    e.degree?.trim() ||
    e.field_study?.trim() ||
    e.start_time ||
    e.end_time ||
    e.location?.trim() ||
    e.cgpa?.trim() ||
    e.additionalInfo?.trim()
  );

  const validExperiences = (experiences || []).filter(ex =>
    ex.company_name?.trim() ||
    ex.position?.trim() ||
    ex.location?.trim() ||
    ex.start_date ||
    ex.end_date ||
    ex.skill?.trim()
    // (ex.projects && ex.projects.length > 0)
  );

  console.log('validExperiences', validExperiences)

  const validSkills = (skills || []).filter(s =>
    s.skill_category?.trim() ||
    s.skill?.trim()
  );

  const validLanguages = (languages || []).filter(l =>
    l.language_name?.trim() ||
    l.proficiency?.trim()
  );

  const validPersonalProjects = (personalPro || []).filter(p =>
    p.project_title?.trim() ||
    p.role?.trim() ||
    p.description?.trim() ||
    p.start_time ||
    p.end_time ||
    p.project_url?.trim() ||
    p.skill?.trim()
  );

  const validCertificates = (certificates || []).filter(c =>
    c.certification_name?.trim() ||
    c.issuing_organization?.trim() ||
    c.obtained_date ||
    c.certification_id
  );


  const validAchievements = (achivments || []).filter(a =>
    a.achievement_title?.trim() ||
    a.organization?.trim() ||
    a.receive_date ||
    a.description?.trim()
  );

  function formatSmartDate(dateInput) {
    if (!dateInput) return "";

    // Convert to Date object properly
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(date)) return "";

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    // Detect original string format (only if user sent a string)
    const original = typeof dateInput === "string" ? dateInput : "";

    const hasDay =
      original.includes("-") && original.split("-")[2]?.length === 2 ||
      original.includes("/") && original.split("/")[0]?.length === 2;

    // CASE 1 → User never selected a day (Month-Year only)
    // CASE 2 → Parser defaults day = 1 when only month/year
    if (!hasDay || day === 1) {
      return `${month} ${year}`;
    }

    // CASE 3 → Full date
    return `${day} ${month} ${year}`;
  }








  return (
    <div>
      <div ref={ref} className="min-h-screen bg-gray-50 py-4 px-4 sm:py-8 sm:px-6 lg:px-8 ">
        {/* <style jsx>{`
        @media print {
        .print-watermark {
          display: none;
        }
          
          .min-h-screen {
            min-height: auto !important;
          }
          
          .bg-\\[\\#f6f8fa\\] {
            background: white !important;
          }
          
          .shadow-lg {
            box-shadow: none !important;
          }
          
          .rounded-xl {
            border-radius: 0 !important;
          }
          
       
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          
          .w-\\[800px\\] {
            width: 100% !important;
            max-width: none !important;
          }

         .print-watermark {
            display: block;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 80px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.08);
            text-transform: uppercase;
            letter-spacing: 4px;
            z-index: 9999;
            pointer-events: none;
            white-space: nowrap;
            user-select: none;
          }

        }
      `}</style> */}

        <style jsx>{`
        /* Hide watermark on screen, show only when printing */
        .print-watermark {
          display: none;
        }

        @media print {
          .min-h-screen {
            min-height: auto !important;
          }
          
          .bg-gray-50 {
            background: white !important;
          }
          
          .shadow-xl {
            box-shadow: none !important;
          }
          
          /* Ensure colors print correctly */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Optimize for A4 */
          .max-w-4xl {
            width: 100% !important;
            max-width: none !important;
          }

          /* Show watermark only when printing */
          .print-watermark {
            display: block;
            position: fixed;
            bottom: 20px;
            right: 20px;
            // transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 25px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.20);
            text-transform: uppercase;
            letter-spacing: 4px;
            z-index: 9999;
            pointer-events: none;
            white-space: nowrap;
            user-select: none;
          }
        }
      `}</style>

        <div className="print-watermark">

          {
            currentSubscriptionData?.data?.length === 0 && ('Powered By Hiring Eye')
          }

        </div>
        <div className="max-w-4xl mx-auto bg-white shadow-xl">
          {/* Header */}
          <div className=" text-black">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-center text-[#2f6aeb]">{data?.full_name || ""}</h1>
            <p className="text-sm font-semibold text-[#2f6aeb] mb-4 text-center">{data?.title || ""}</p>
            {/* <div className="text-xs sm:text-sm leading-relaxed text-center">
            <p className="mb-1">{data?.email||""} • {data?.phone||""} • {data?.location||""}</p>
            <p>{data?.github_profile||""} •{data?.linkdin_profile||""} • {data?.personal_web||""}</p>
          </div> */}
            <div className="text-xs sm:text-sm leading-relaxed text-center">
              <p className="mb-1">
                {[data?.email, data?.phone, data?.location].filter(Boolean).join(' • ')}
              </p>
              <p>
                {[data?.github_profile, data?.linkdin_profile, data?.personal_web].filter(Boolean).join(' • ')}
              </p>
            </div>

          </div>

          <div className="px-6 py-6">
            {/* Professional Summary */}
            {validGoal && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 mb-2">Professional Summary</h2>
                <div className="border-b border-blue-700 mb-3"></div>
                <p className="text-sm leading-relaxed text-gray-800">
                  {data?.goal || ""}

                </p>
              </section>
            )}
            {/* Education */}
            {/* <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-700 mb-2">Education</h2>
            <div className="border-b border-blue-700 mb-3"></div>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">B.Tech</p>
                  <p className="text-sm text-gray-700">Bharathidasan College of Engineering</p>
                </div>
                <div className="mt-1 sm:mt-0 sm:ml-4">
                  <p className="text-sm text-gray-600">2017 GGN</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-700">Level Higher Secondary School</p>
                </div>
                <div className="mt-1 sm:mt-0 sm:ml-4">
                  <p className="text-sm text-gray-600">2013</p>
                </div>
              </div>
            </div>
          </section> */}
            {validEducation.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 mb-2">Education</h2>
                <div className="border-b border-blue-700 mb-3"></div>

                <div className="space-y-4">
                  {
                    education.map((entry, index) => (
                      <div
                        key={entry.id || index}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-start"
                      >
                        {/* Left Side: Degree + Institution */}
                        <div className="flex-1">

                          <p className="font-semibold text-gray-900">{entry.degree || ""}</p>


                          <p className="text-sm text-gray-700">{entry.institution || ""}</p>


                          <p className="text-xs text-gray-600 italic">
                            {entry.field_study || ""}
                          </p>


                          <p className="text-xs text-gray-500">{entry.additionalInfo || ""}</p>


                          {entry.gpa && (
                            <p className="text-xs text-gray-600">
                              GPA: {entry.gpa}
                            </p>
                          )}


                        </div>

                        {/* Right Side: Dates + Location */}
                        <div className="mt-1 sm:mt-0 sm:ml-4 text-right">
                          {(entry.start_time || entry.end_time) && (
                            <p className="text-sm text-gray-600">
                              {entry.start_time
                                ?
                                // new Date(entry.start_time).toLocaleDateString("en-US", {
                                //     month: "short",
                                //     year: "numeric",
                                //   })
                                formatSmartDate(entry.start_time)
                                : ""}
                              {entry.end_time
                                ? ` - 
                
                    ${formatSmartDate(entry.end_time)}
                    
                    `
                                : entry.currentlyStudying
                                  ? " - Present"
                                  : ""}
                            </p>
                          )}
                          {entry.location && (
                            <p className="text-sm text-gray-600">{entry.location}</p>
                          )}
                        </div>
                      </div>
                    ))


                  }
                </div>
              </section>
            )}


            {/* Professional Experience */}
            {/* <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-700 mb-2">Professional Experience</h2>
            <div className="border-b border-blue-700 mb-4"></div>
            
           
            <div className="mb-5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="font-semibold text-gray-900">Software Developer</h3>
                <p className="text-sm text-gray-600 mt-1 sm:mt-0">March 2021 - Present</p>
              </div>
              <p className="text-sm text-gray-700 mb-2">JollyGood Software (P) Ltd</p>
              <ul className="text-sm text-gray-800 space-y-1">
                <li>• Developed responsive client programs using React.js and tailored CSS. Created and website performance and code modularity</li>
                <li>• improving load times by 30%</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="font-semibold text-gray-900">Front-End Developer Intern</h3>
              </div>
              <p className="text-sm text-gray-700 mb-2">Uniqkey</p>
              <ul className="text-sm text-gray-800 space-y-1">
                <li>• Built & 3 responsive web application for developers using React.js and TypeScript, improved user engagement by</li>
                <li>• 20% through UI/UX updates</li>
              </ul>
            </div>

   
            <div className="mb-5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="font-semibold text-gray-900">Web Developer Intern</h3>
              </div>
              <p className="text-sm text-gray-700 mb-2">Bharath Intern</p>
              <ul className="text-sm text-gray-800 space-y-1">
                <li>• Built & fully responsive business website using Rest.js and tailored CSS, achieving a 95+ mobile responsiveness score</li>
              </ul>
            </div>
          </section> */}
            {validExperiences.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 mb-2">Professional Experience</h2>
                <div className="border-b border-blue-700 mb-4"></div>

                {
                  experiences.map((exp) => (
                    <div key={exp.id} className="mb-5">
                      {/* Header with Position & Dates */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {exp.position || ""}
                        </h3>
                        {/* <p className="text-sm text-gray-600 mt-1 sm:mt-0">
                        {exp.start_date
                          ? formatSmartDate(exp.start_date)
                          : ""}{" "}
                        –{" "}
                        {exp.current_work
                          ? "Present"
                          : exp.end_date
                            ? formatSmartDate(exp.end_date)
                            : ""}
                      </p> */}
                        <p className="text-sm text-gray-600 mt-1 sm:mt-0">
                          {exp.start_date ? formatSmartDate(exp.start_date) : ""}

                          {/* Show dash only if at least one date exists */}
                          {(exp.start_date || exp.end_date || exp.current_work) && " – "}

                          {exp.current_work
                            ? "Present"
                            : exp.end_date
                              ? formatSmartDate(exp.end_date)
                              : ""}
                        </p>

                      </div>

                      {/* Company + Location */}
                      <p className="text-sm text-gray-700 mb-1">
                        {exp.company_name || ""}{" "}
                        {exp.location ? `– ${exp.location}` : ""}
                      </p>

                      {/* Skill Set */}
                      {/* {exp.skill && (
                      <p className="text-xs text-gray-500 italic mb-2">
                        Skills: {exp.skill} 
                      </p>
                    )} */}
                      {exp.skill && (
                        <p className="text-xs text-gray-500 italic mb-2">
                          Skills:&nbsp;
                          {exp.skill
                            .split(",")
                            .map(s => s.trim())
                            .join(", ")}
                        </p>
                      )}


                      {/* Projects */}
                      {exp.projects && exp.projects.length > 0 && (
                        <ul className="text-sm text-gray-800 space-y-1">
                          {exp.projects.map((proj) => (
                            <li key={proj.id}>
                              <span className="font-medium">
                                {proj.title || ""}
                              </span>{" "}
                              {proj.role && (
                                <>{" "}– {proj.role}</>
                              )}
                              {/* {proj.technology && (
                                <span className="text-gray-600">
                                  {" "}
                                  | Tech: {proj.technology}
                                </span>
                              )} */}
                              <p className="text-gray-700 text-xs ml-4">
                                {proj.description ||
                                  ""}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </section>
            )}





            {/* Skills */}
            {/* <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-700 mb-2">Skills</h2>
            <div className="border-b border-blue-700 mb-3"></div>
            <div className="text-sm text-gray-800 space-y-2">
              <p><span className="font-semibold">JavaScript (ES6+):</span> Java, C++, SQL</p>
              <p><span className="font-semibold">React.js, Express.js, MongoDB:</span> Git, GitHub, Postman, Vercel, Netlify</p>
              <p><span className="font-semibold">REST API, CRUD Operations, Responsive Design, State Management (React Context API)</span></p>
            </div>
          </section> */}
            {validSkills.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 mb-2">Skills</h2>
                <div className="border-b border-blue-700 mb-3"></div>

                {/* If skills are available from form, show them; else fallback to defaults */}
                {skills && skills.length > 0 ? (
                  <div className="text-sm text-gray-800 space-y-2">
                    {skills.map((sk) => (
                      <p key={sk.id}>
                        {sk.skill_category && (
                          <span className="font-semibold">{sk.skill_category}:</span>
                        )}{" "}
                        {sk.skill || ""}
                      </p>
                    ))}
                  </div>
                ) : (
                  // Default static values
                  <div className="text-sm text-gray-800 space-y-2">
                    <p>
                      <span className="font-semibold">JavaScript (ES6+):</span> Java, C++, SQL
                    </p>
                    <p>
                      <span className="font-semibold">React.js, Express.js, MongoDB:</span> Git, GitHub, Postman, Vercel, Netlify
                    </p>
                    <p>
                      <span className="font-semibold">REST API, CRUD Operations, Responsive Design, State Management (React Context API)</span>
                    </p>
                  </div>
                )}
              </section>
            )}


            {/* Languages */}
            {/* <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-700 mb-2">Languages</h2>
            <div className="border-b border-blue-700 mb-3"></div>
            <ul className="text-sm text-gray-800 space-y-1">
              <li>• Tamil - Native</li>
              <li>• English - Native / Speech Intermediate</li>
            </ul>
          </section> */}
            {validLanguages.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 mb-2">Languages</h2>
                <div className="border-b border-blue-700 mb-3"></div>
                <ul className="text-sm text-gray-800 space-y-1">
                  {/* {
                  languages.map((lang) => (
                    <li key={lang.id}>
                      • {lang.language_name || ""} -{" "}
                      {lang.proficiency || ""}
                    </li>
                  ))
                } */}
                  <ul className="text-sm text-gray-800 space-y-1">
                    {languages.map((lang) => {
                      const parts = [lang.language_name, lang.proficiency].filter(Boolean);

                      if (parts.length === 0) return null;
                      return (
                        <li key={lang.id}>
                          • {parts.join(' - ')}
                        </li>
                      );
                    })}
                  </ul>

                </ul>
              </section>
            )}


            {/* Projects */}
            {/* <section>
            <h2 className="text-lg font-bold text-blue-700 mb-2">Projects</h2>
            <div className="border-b border-blue-700 mb-3"></div>
          </section> */}
            {validPersonalProjects.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 mb-2">Projects</h2>
                <div className="border-b border-blue-700 mb-3"></div>

                <div className="space-y-4">
                  {personalPro.length > 0 ? (
                    personalPro.map((project) => (
                      <div key={project.id} className="mb-4">
                        <h3 className="text-md font-semibold text-gray-900">
                          {project.project_title || ""}
                        </h3>
                        <p className="text-sm text-gray-700 italic mb-1">
                          {project.role || ""}{" "}
                          {project.start_time && project.end_time
                            ? `(${convertToSubmitFormat(project.start_time)} - ${convertToSubmitFormat(project.end_time)})`
                            : ""}
                        </p>
                        {project.project_url && (
                          <p className="text-sm text-blue-600 mb-1">
                            <a
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {project.project_url}
                            </a>
                          </p>
                        )}
                        {project.skill && (
                          <p className="text-sm text-gray-800 mb-1">
                            <span className="font-semibold">Technologies: </span>
                            {project.skill}
                          </p>
                        )}
                        {project.description && (
                          <p className="text-sm text-gray-700">{project.description}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="italic text-gray-500">No projects added</p>
                  )}
                </div>
              </section>
            )}

            {validCertificates.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 mb-2">Certifications</h2>
                <div className="border-b border-blue-700 mb-3"></div>

                <div className="space-y-3">
                  {certificates.length > 0 ? (
                    certificates.map((cert) => (
                      <div key={cert.id} className="mb-2">
                        <h3 className="text-md font-semibold text-gray-900">
                          {cert.certification_name || ""}
                        </h3>
                        <p className="text-sm text-gray-700">
                          {cert.issuing_organization || ""}
                        </p>
                        <p className="text-sm text-gray-600">
                          {cert.obtained_date
                            ? `Obtained: ${convertToSubmitFormat(cert.obtained_date)}`
                            : ""}
                        </p>
                        {cert.certification_id && (
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold">ID: </span>
                            {cert.certification_id}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="italic text-gray-500">No certifications added</p>
                  )}
                </div>
              </section>
            )}

            {validAchievements.length > 0 && (
              <section className="mb-6">
                <h2 className="text-lg font-bold text-blue-700 mb-2">Achievements</h2>
                <div className="border-b border-blue-700 mb-3"></div>

                <div className="space-y-3">
                  {achivments.length > 0 ? (
                    achivments.map((ach) => (
                      <div key={ach.id} className="mb-3">
                        {/* Title */}
                        <h3 className="text-md font-semibold text-gray-900">
                          {ach.achievement_title || ""}
                        </h3>

                        {/* Organization & Date */}
                        <p className="text-sm text-gray-700">
                          {ach.organization || ""}
                          {ach.receive_date && (
                            <span className="ml-2 text-gray-500">
                              ({convertToSubmitFormat(ach.receive_date)})
                            </span>
                          )}
                        </p>

                        {/* Description */}
                        {ach.description && (
                          <p className="text-sm text-gray-600">{ach.description}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="italic text-gray-500">No achievements added</p>
                  )}
                </div>
              </section>
            )}


          </div>
        </div>
      </div>
    </div>
  )
})
export default Template2