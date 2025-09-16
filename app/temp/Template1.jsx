"use client";
import React from "react";

const Template1=({data,education,experiences,skills,languages,personalPro,achivments,certificates})=> {
  return (
      <div className="min-h-screen bg-[#f6f8fa] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 flex w-[800px]">
        {/* Sidebar: Left */}
        <div className="w-2/5 bg-[#eff2fc] p-6 rounded-xl flex flex-col justify-start">
          {/* Profile Name */}
          <h2 className="text-xl font-semibold text-[#4b56ab] mb-4">{data?.full_name ||"Kabilan S"}</h2>
           <p className="text-sm font-semibold text-[#4b56ab] mb-4">{data?.title ||"Developer"}</p>
          
          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">CONTACT</h3>
            <p className="text-xs mb-1 break-all">{data?.email||"kabilansivaavan123@gmail.com"}</p>
            <p className="text-xs mb-1">{data?.phone||"+91 6369476404"}</p>
            <p className="text-xs mb-1">{data?.location||"Trichy, TN"}</p>
            <a href="#" className="text-xs text-[#4b56ab] underline break-all">{data?.github_profile||"GitHub"}</a>
            <a href="#" className="text-xs text-[#4b56ab] underline break-all">{data?.linkdin_profile||"Linkedin"}</a>
            <a href="#" className="text-xs text-[#4b56ab] underline">{data?.personal_web||"website"}</a>
          </div>
          
          {/* Skills */}
          {/* <div className="mb-6">
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React.js / Next.js", "Tailwind CSS",
                "Node.js / Express", "MongoDB",
                "JavaScript, TypeScript",
                "REST API, JWT, Axios"
              ].map(skill => (
                <span key={skill} className="bg-[#dde3fa] text-xs px-2 py-1 rounded">{skill}</span>
              ))}
            </div>
          </div> */}

          <div className="mb-6">
  <h3 className="text-sm font-bold text-[#7076b4] mb-3">SKILLS</h3>

  {skills && skills.length > 0 ? (
    <div className="space-y-3">
      {skills.map((sk) => (
        <div key={sk.id}>
          {/* Skill Category */}
          <p className="text-xs font-semibold text-[#333] mb-1">
            {sk.skill_category || "General Skills"}
          </p>

          {/* Skills List */}
          <div className="flex flex-wrap gap-2">
            {sk.skill
              ? sk.skill.split(",").map((item, i) => (
                  <span
                    key={i}
                    className="bg-[#dde3fa] text-xs px-2 py-1 rounded"
                  >
                    {item.trim()}
                  </span>
                ))
              : <span className="text-gray-400 text-xs">No skills added</span>}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-xs text-gray-500">No skills added yet.</p>
  )}
</div>


          {/* Languages */}
          {/* <div className="mb-6">
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">LANGUAGES</h3>
            <p className="text-xs">English, Tamil</p>
          </div> */}

<div className="mb-6">
  <h3 className="text-sm font-bold text-[#7076b4] mb-3">LANGUAGES</h3>
  {languages && languages.length > 0 ? (
    <ul className="text-xs space-y-1">
      {languages.map((lang) => (
        <li key={lang.id} className="flex items-center gap-1">
          <span className="font-medium">{lang.language_name || "Language"}</span>
          {lang.proficiency && (
            <span className="text-gray-500 text-xs">({lang.proficiency})</span>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-xs text-gray-500">No languages added yet.</p>
  )}
</div>



          {/* Achievements */}
          {/* <div>
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">ACHIEVEMENTS</h3>
            <ul className="list-disc pl-4 text-xs space-y-1">
              <li>100+ DSA problems solved - LeetCode</li>
              <li>Smart India Hackathon 2023 Participant</li>
              <li>2nd Place in Project Contest - 2023</li>
              <li>Placed in <span className="font-semibold">Xplore</span> Internship</li>
              <li>1st Place in Project Presentation - 2021</li>
              <li>Published Resume Builder Web-app</li>
            </ul>
          </div> */}

          <div className="mb-6">
  <h3 className="text-sm font-bold text-[#7076b4] mb-3">ACHIEVEMENTS</h3>

  {achivments && achivments.length > 0 ? (
    <ul className="list-disc pl-4 text-xs space-y-3">
      {achivments.map((ach, i) => (
        <li key={ach.id || i}>
          {/* Title */}
          <span className="font-semibold">
            {ach.achievement_title || "Achievement Title"}
          </span>

          {/* Organization */}
          {ach.organization && (
            <span className="ml-1 text-[#6471af] text-[11px]">
              – {ach.organization}
            </span>
          )}

          {/* Date */}
          {ach.receive_date && (
            <div className="text-[11px] text-gray-500">
              {new Date(ach.receive_date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>
          )}

          {/* Description */}
          {ach.description && (
            <p className="text-xs mt-1">{ach.description}</p>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-xs text-gray-500">No achievements added yet.</p>
  )}
</div>

        </div>

        {/* Main: Right */}
        <div className="w-2/3 px-8">
          {/* Summary */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">PROFESSIONAL SUMMARY</h3>
            <p className="text-xs text-gray-700">
              {data?.goal||"Full Stack Developer with hands-on experience in building scalable, responsive web applications using React.js, Next.js, Node.js, Express, and MongoDB. Passionate about creating user-friendly solutions with robust backend integrations and secure RESTful APIs. Successfully delivered multiple client and student projects with a focus on best practices, responsiveness, and code maintainability."}
              
            </p>
          </div>

          {/* Experience */}
          {/* <div className="mb-4">
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">EXPERIENCE</h3>
            <div className="mb-2">
              <p className="font-semibold text-xs">Software Developer Intern</p>
              <p className="text-xs text-[#6471af]">StartupFlint</p>
              <p className="text-xs text-gray-700">Developed resume builder web app using React.js and Tailwind CSS. Optimized user experience and code reusability, improving load times by 30%.</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold text-xs">Front-End Developer Intern</p>
              <p className="text-xs text-[#6471af]">Unaced</p>
              <p className="text-xs text-gray-700">Integrated micro-animations for enhanced student dashboards (React.js) and improved responsiveness across 70% through UI/UX updates.</p>
            </div>
            <div>
              <p className="font-semibold text-xs">Web Developer Intern</p>
              <p className="text-xs text-[#6471af]">SunriseDesignTech</p>
              <p className="text-xs text-gray-700">Built multiple responsive websites using Next.js and Tailwind CSS, achieving 90+ site mobile responsiveness score.</p>
            </div>
          </div> */}



<div className="mb-4">
  <h3 className="text-sm font-bold text-[#7076b4] mb-3">EXPERIENCE</h3>
  {experiences.map((exp) => (
    <div key={exp.id} className="mb-3">

      {/* Position / Role */}
      <p className="font-semibold text-xs">
        {exp.position || "Software Developer Intern"}
      </p>

      {/* Company + Location */}
      <p className="text-xs text-[#6471af]">
        {exp.company_name || "StartupFlint"} – {exp.location || "Kolkata"}
      </p>

      {/* Duration */}
      <p className="text-[10px] text-gray-500 mb-1">
        {/* {exp.start_date || "2022"} – {exp.current_work ? "Present" : (exp.end_date || "2023")} */}
          {exp.start_date
    ? exp.start_date.toISOString().split("T")[0]
    : "2022"}{" "}
  –{" "}
  {exp.current_work
    ? "Present"
    : exp.end_date
    ? exp.end_date.toISOString().split("T")[0]
    : "2023"}
      </p>

      {/* Skillset */}
      {exp.skill ? (
        <p className="text-[11px] text-gray-600 mb-1">
          <span className="font-medium">Skills:</span> {exp.skill}
        </p>
      ) : (
        <p className="text-[11px] text-gray-400 italic mb-1">
          Skills: React, Node.js, MongoDB
        </p>
      )}

      {/* Projects */}
      {exp.projects && exp.projects.length > 0 ? (
        <div className="ml-3">
          {exp.projects.map((proj, i) => (
            <div key={proj.id} className="mb-2">
              {/* Project Title & Role */}
              <p className="text-xs font-semibold">
                {proj.title || `Project ${i + 1}`}{" "}
                {proj.role && (
                  <span className="font-normal text-gray-500">
                    – {proj.role}
                  </span>
                )}
              </p>

              {/* Technologies */}
              {proj.technology && (
                <p className="text-[11px] text-[#6471af] mb-1">
                  Tech: {proj.technology}
                </p>
              )}

              {/* Description */}
              <p className="text-xs text-gray-700 break-all">
                {proj.description ||
                  "Worked on implementing features, fixing bugs, and collaborating with team members to deliver the project successfully."}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-700">
          Worked on multiple projects improving efficiency and user experience.
        </p>
      )}
    </div>
  ))}
</div>




          {/* Education */}
          {/* <div className="mb-4">
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">EDUCATION</h3>
            <div className="flex flex-col">
              <div className="flex justify-between text-xs">
                <div>B.Tech, Computer Science</div>
                <div className="text-[#6471af]">2021-2025</div>
              </div>
              <span className="text-xs mb-2">Saranathan College of Engineering</span>
              <div className="flex justify-between text-xs">
                <div>Higher Secondary School</div>
                <div className="text-[#6471af]">2021</div>
              </div>
              <span className="text-xs mb-2">James Higher Secondary School</span>
              <div className="flex justify-between text-xs">
                <div>High School</div>
              </div>
              <span className="text-xs">Govt High School</span>
            </div>
          </div> */}

          <div className="mb-4">
  <h3 className="text-sm font-bold text-[#7076b4] mb-3">EDUCATION</h3>
  <div className="flex flex-col">
    {education.map((entry, index) => (
      <div key={entry.id} className="mb-2">
        {/* Degree + Field of Study + Date */}
        <div className="flex justify-between text-xs">
          <div>
            {entry.degree}{entry.field_study ? `, ${entry.field_study}` : "B.Tech, Computer Science"}
          </div>
          <div className="text-[#6471af]">
            {/* {entry.start_time
              ? `${entry.start_time} - ${entry.currentlyStudying ? "Present" : entry.end_time || ""}`
              : "2021-2025"} */}
                  {entry.start_time
                      ? new Date(entry.start_time).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                    {" – "}
                    {entry.currentlyStudying
                      ? "Present"
                      : entry.end_time
                      ? new Date(entry.end_time).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
          </div>
        </div>

        {/* Institution / School */}
        <span className="text-xs mb-1 block">{entry.institution||"Saranathan College of Engineering"}-{entry.location||"Kolkata"}</span>

        {/* GPA or Extra Info (optional) */}
        {(entry.gpa || entry.additionalInfo) && (
          <span className="text-[11px] text-gray-600 block">
            {entry.gpa ? `GPA: ${entry.gpa}` : "7.8"}
            {entry.gpa && entry.additionalInfo ? " • " : ""}
            {entry.additionalInfo}
          </span>
        )}
      </div>
    ))}
  </div>
</div>


          {/* Projects */}
          {/* <div>
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">PROJECTS</h3>
            <ul className="list-disc pl-4 text-xs space-y-2">
              <li>
                <span className="font-semibold">Resume Builder App</span> <br />
                Create & download resume generator with dynamic PDF export.
              </li>
              <li>
                <span className="font-semibold">Expense Tracker App</span> <br />
                Manage expenses through budget management, and visualization.
              </li>
              <li>
                <span className="font-semibold">CRUD Task Manager</span> <br />
                MERN-based task manager with CRUD operations and RESTful APIs.
              </li>
            </ul>
          </div> */}

          <div className="mb-6">
  <h3 className="text-sm font-bold text-[#7076b4] mb-3">PROJECTS</h3>

  {personalPro && personalPro.length > 0 ? (
    <ul className="list-disc pl-4 text-xs space-y-3">
      {personalPro.map((proj) => (
        <li key={proj.id}>
          {/* Project Title */}
          <span className="font-semibold">{proj.project_title || "Untitled Project"}</span>

          {/* Role */}
          {proj.role && (
            <span className="ml-1 text-[#6471af] text-[11px]">
              ({proj.role})
            </span>
          )}

          {/* Date Range */}
          {(proj.start_time || proj.end_time) && (
            <div className="text-[11px] text-gray-500">
              {proj.start_time || "Start"} – {proj.end_time || "Present"}
            </div>
          )}

          {/* Description */}
          {proj.description && (
            <p className="text-xs mt-1">{proj.description}</p>
          )}

          {/* Technologies */}
          {proj.skill && (
            <div className="flex flex-wrap gap-1 mt-1">
              {proj.skill.split(",").map((tech, i) => (
                <span
                  key={i}
                  className="bg-[#dde3fa] text-[10px] px-2 py-0.5 rounded"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          )}

          {/* URL */}
          {proj.project_url && (
            <a
              href={proj.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[11px] text-blue-600 underline mt-1"
            >
              {proj.project_url}
            </a>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-xs text-gray-500">No projects added yet.</p>
  )}
</div>

<div className="mb-6">
  <h3 className="text-sm font-bold text-[#7076b4] mb-3">CERTIFICATES</h3>

  {certificates && certificates.length > 0 ? (
    <ul className="list-disc pl-4 text-xs space-y-2">
      {certificates.map((cer, index) => (
        <li key={cer.id || index}>
          {/* Certificate Name */}
          <span className="font-semibold">{cer.certification_name || "Certificate Name"}</span>

          {/* Issuing Organization */}
          {cer.issuing_organization && (
            <span className="ml-1 text-gray-600">
              – {cer.issuing_organization}
            </span>
          )}

          {/* Obtained Date */}
          {cer.obtained_date && (
            <div className="text-[11px] text-gray-500">
              {new Date(cer.obtained_date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>
          )}

          {/* Certification ID */}
          {cer.certification_id && (
            <p className="text-[11px] text-[#7076b4]">
              ID: {cer.certification_id}
            </p>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-xs text-gray-500">No certificates added yet.</p>
  )}
</div>


        </div>
      </div>
    </div>
  );
}
export default Template1
