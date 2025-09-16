"use client";
import React from "react";

const Template=({data,education,experiences,skills,languages,personalPro})=> {
  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 p-8 font-sans">
      {/* Header */}
      <header className="text-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-700"> {data?.full_name || "Your Name"}</h1>
        <p className="mt-1 text-sm">
          {data?.location || "Your City"} | {data?.phone || "Phone"} |{" "}
          <a href="mailto:kabilanselvakumar313@gmail.com" className="text-blue-600 underline">
            {data?.email || "you@example.com"}
          </a>
        </p>
        <p className="mt-1 text-sm space-x-3">
         {data?.linkdin_profile && (
            <a href={data.linkdin_profile} className="text-blue-600 underline">
              LinkedIn
            </a>
          )}
          {data?.github_profile && (
            <a href={data.github_profile} className="text-blue-600 underline">
              GitHub
            </a>
          )}
          {data?.personal_web && (
            <a href={data.personal_web} className="text-blue-600 underline">
              Portfolio
            </a>
          )}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {/* Education */}
         {education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-3">
            Education
          </h2>
          <ul className="space-y-4">
            {education.map((edu) => (
              <li key={edu.id}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree || "Degree"} in {edu.field_study || ""}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {edu.institution || "Institution"} – {edu.location || ""}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">
                        GPA: {edu.gpa}
                      </p>
                    )}
                    {edu.additionalInfo && (
                      <p className="text-sm text-gray-600 mt-1">
                        {edu.additionalInfo}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {edu.start_time
                      ? new Date(edu.start_time).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                    {" – "}
                    {edu.currentlyStudying
                      ? "Present"
                      : edu.end_time
                      ? new Date(edu.end_time).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

          {/* Experience */}
   {/* ================= Work Experience ================= */}
{experiences?.length > 0 && (
  <section className="mb-6">
    <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">
      Professional Experience
    </h2>
    <div className="space-y-4 text-sm">
      {experiences.map((exp) => (
        <div key={exp.id}>
          {/* Job title, company, location, and dates */}
          <p className="font-medium">
            {exp.position || "Job Title"} – {exp.company_name || "Company Name"}
          </p>
          <p className="text-gray-600">
            {exp.location ? `${exp.location} | ` : ""}
            {exp.startDate
              ? new Date(exp.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : ""}
            {" – "}
            {exp.current_work
              ? "Present"
              : exp.endDate
              ? new Date(exp.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : ""}
          </p>

          {/* Projects */}
          {exp.projects && exp.projects.length > 0 && (
            <ul className="list-disc ml-5 mt-2 space-y-1">
              {exp.projects.map((proj) => (
                <li key={proj.id}>
                  <span className="font-medium">
                    {proj.title || "Project Title"}
                  </span>
                  {proj.role && <span> – {proj.role}</span>}
                  {proj.technology && (
                    <span className="text-gray-600"> [{proj.technology}]</span>
                  )}
                  {proj.description && (
                    <p className="text-gray-700 text-sm ml-1">
                      {proj.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Skills */}
          {exp.skill && (
            <p className="mt-1 text-sm text-gray-600">
              <strong>Skills:</strong> {exp.skill}
            </p>
          )}
        </div>
      ))}
    </div>
  </section>
)}


          {/* Skills */}
          {/* <section className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">Skills</h2>
            <ul className="text-sm space-y-1">
              <li>
                <span className="font-medium">Languages & Frameworks:</span> JavaScript, Java, C++, SQL, React.js, Next.js, Tailwind, HTML, CSS
              </li>
              <li>
                <span className="font-medium">Back-End & Tools:</span> Node.js, Express, MongoDB, Git, GitHub, Postman, Vercel
              </li>
              <li>
                <span className="font-medium">Concepts:</span> REST APIs, CRUD, Responsive Design, State Management
              </li>
            </ul>
          </section> */}

          {/* ================= Skills ================= */}
{/* ================= Skills ================= */}
{skills?.length > 0 && (
  <section className="mb-6">
    <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">
      Skills
    </h2>
    <div className="text-sm">
      {skills.map((sk) => (
        <div key={sk.id} className="mb-2">
          <p className="font-medium">{sk.skill_category||"Language & Frameworks"}:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {sk.skill
              ?.split(",")
              .map((s, i) => (
                <span
                  key={i}
                  className={`${s?"px-2 py-1 bg-gray-100 border rounded-md text-xs":""}`}
                >
                  {s.trim()}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  </section>
)}



          {/* Languages */}
          {/* ================= Languages ================= */}
{languages?.length > 0 && (
  <section className="mb-6">
    <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">
      Languages
    </h2>
    <ul className="text-sm space-y-1">
      {languages.map((lang) => (
        <li key={lang.id}>
          <span className="font-medium">{lang.language_name || "Known Language"} — </span>
          {lang.proficiency || "Not specified"}
        </li>
      ))}
    </ul>
  </section>
)}

        </div>

        {/* Right Column */}
        <div>
          {/* Projects */}
          <section className="mb-6">
  <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">
    Projects
  </h2>
  <ul className="text-sm space-y-3 list-disc pl-5">
    {personalPro.map((project) => (
      <li key={project.id}>
        <span className="font-medium">{project.project_title}:</span>{" "}
        {project.description && (
          <span>{project.description}</span>
        )}
        <br />
        {project.role && (
          <span className="text-gray-600">Role: {project.role}</span>
        )}
        {project.skill && (
          <span className="ml-2 text-gray-600">
            | Tech: {project.skill}
          </span>
        )}
        {project.project_url && (
          <span className="ml-2">
            | <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {project.project_url}
            </a>
          </span>
        )}
        {(project.start_time || project.end_time) && (
          <div className="text-xs text-gray-500">
            {project.start_time
              ? `(${project.start_time}`
              : ""}
            {project.end_time ? ` - ${project.end_time})` : ")"}
          </div>
        )}
      </li>
    ))}
  </ul>
</section>


          {/* Certifications */}
          <section>
            <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">Certifications</h2>
            <ul className="text-sm space-y-2">
              <li>HTML & CSS in Depth — Meta (Coursera), 2023</li>
              <li>Programming with JavaScript — Meta (Coursera), 2023</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Template
