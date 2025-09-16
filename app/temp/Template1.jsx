"use client";
import React from "react";

const Template1=({data,education,experiences,skills,languages,personalPro})=> {
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
          <div className="mb-6">
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
          </div>

          {/* Languages */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">LANGUAGES</h3>
            <p className="text-xs">English, Tamil</p>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">ACHIEVEMENTS</h3>
            <ul className="list-disc pl-4 text-xs space-y-1">
              <li>100+ DSA problems solved - LeetCode</li>
              <li>Smart India Hackathon 2023 Participant</li>
              <li>2nd Place in Project Contest - 2023</li>
              <li>Placed in <span className="font-semibold">Xplore</span> Internship</li>
              <li>1st Place in Project Presentation - 2021</li>
              <li>Published Resume Builder Web-app</li>
            </ul>
          </div>
        </div>

        {/* Main: Right */}
        <div className="w-2/3 px-8">
          {/* Summary */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-[#7076b4] mb-3">PROFESSIONAL SUMMARY</h3>
            <p className="text-xs text-gray-700">
              Full Stack Developer with hands-on experience in building scalable, responsive web applications using React.js, Next.js, Node.js, Express, and MongoDB. Passionate about creating user-friendly solutions with robust backend integrations and secure RESTful APIs. Successfully delivered multiple client and student projects with a focus on best practices, responsiveness, and code maintainability.
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
        {exp.startDate || "2022"} – {exp.current_work ? "Present" : (exp.endDate || "2023")}
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
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default Template1
