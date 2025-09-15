"use client";
import React from "react";

const Template=({data,education})=> {
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
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">
              Professional Experience
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Software Developer Intern – StartupBricks</p>
                <p>
                  Developed responsive React + Tailwind projects. Optimized performance,
                  improving load times by 30%.
                </p>
              </div>
              <div>
                <p className="font-medium">Front-End Developer Intern – Utilized</p>
                <p>
                  Built modular React + TypeScript UIs. Improved user engagement by 20%.
                </p>
              </div>
              <div>
                <p className="font-medium">Web Developer Intern – SunriseDesignHive</p>
                <p>
                  Created responsive Next.js website, achieving 95+ mobile responsiveness score.
                </p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6">
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
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">Languages</h2>
            <ul className="text-sm space-y-1">
              <li>English — Native</li>
              <li>Spanish — Intermediate</li>
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div>
          {/* Projects */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-blue-700 border-b mb-2">Projects</h2>
            <ul className="text-sm space-y-3 list-disc pl-5">
              <li>
                <span className="font-medium">Resume Builder App:</span> Form-based PDF resume generator (React, Node, MongoDB)
              </li>
              <li>
                <span className="font-medium">Expense Tracker:</span> Real-time budget + expenses tracker (React, Tailwind, Node, MongoDB)
              </li>
              <li>
                <span className="font-medium">CRUD Task Manager:</span> MERN CRUD task app with APIs
              </li>
              <li>
                <span className="font-medium">SunriseDesignHive Landing Page:</span> Responsive business website (Next.js, Tailwind)
              </li>
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
