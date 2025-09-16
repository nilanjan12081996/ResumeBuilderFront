"use client";
const Resume1=()=>{
    return(
        <>
        <div className="max-w-3xl mx-auto bg-white text-black p-8 border border-gray-300 shadow-sm">
      {/* Header */}
      <div className="text-center border-b border-gray-400 pb-2 mb-4">
        <h1 className="text-2xl font-bold tracking-wide uppercase">Firstname Lastname</h1>
        <p className="text-sm mt-1">
          +1(123) 456-7890 • San Francisco, CA
        </p>
        <p className="text-sm">
          contact@faangpath.com • linkedin.com/in/sample • www.faangpath.com
        </p>
      </div>

      {/* Objective */}
      <section className="mb-4">
        <h2 className="font-bold uppercase border-b border-gray-400 text-sm mb-1">
          Objective
        </h2>
        <p className="text-sm">
          Software Engineer with 2+ years of experience in XXX, seeking full-time XXX roles.
        </p>
      </section>

      {/* Education */}
      <section className="mb-4">
        <h2 className="font-bold uppercase border-b border-gray-400 text-sm mb-1">
          Education
        </h2>
        <div className="text-sm">
          <p className="font-semibold">
            Master of Computer Science, Stanford University
            <span className="float-right">Expected 2020</span>
          </p>
          <p>A, B, C, D</p>
          <p className="font-semibold mt-2">
            Bachelor of Computer Science, Stanford University
            <span className="float-right">2014 - 2017</span>
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-4">
        <h2 className="font-bold uppercase border-b border-gray-400 text-sm mb-1">
          Skills
        </h2>
        <ul className="list-disc ml-5 text-sm">
          <li>Technical Skills: A, B, C, D</li>
          <li>XYZ Skills: A, B, C, D</li>
        </ul>
      </section>

      {/* Experience */}
      <section className="mb-4">
        <h2 className="font-bold uppercase border-b border-gray-400 text-sm mb-1">
          Experience
        </h2>

        {/* Experience 1 */}
        <div className="mb-3">
          <p className="font-semibold text-sm">
            Role Name
            <span className="float-right">Jan 2017 - Jun 2019</span>
          </p>
          <p className="text-sm italic">Company Name — San Francisco, CA</p>
          <ul className="list-disc ml-5 text-sm">
            <li>Achieved XXX growth for XYZ using A, B, and C skills.</li>
            <li>Led XYZ project for 5+ team members in ABC.</li>
            <li>Developed XYZ that led to a measurable improvement in ABC.</li>
          </ul>
        </div>

        {/* Experience 2 */}
        <div className="mb-3">
          <p className="font-semibold text-sm">
            Role Name
            <span className="float-right">Jan 2019 - Present</span>
          </p>
          <p className="text-sm italic">Company Name — San Francisco, CA</p>
          <ul className="list-disc ml-5 text-sm">
            <li>Achieved XXX growth for XYZ using A, B, and C skills.</li>
            <li>Developed XYZ tool that led to measurable success in ABC.</li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-4">
        <h2 className="font-bold uppercase border-b border-gray-400 text-sm mb-1">
          Projects
        </h2>
        <ul className="list-disc ml-5 text-sm">
          <li>
            <span className="font-semibold">Short Project Title:</span> Designed
            a scalable system that handled over 1M requests and quantified
            success using A, B, and C skills.
          </li>
          <li>
            <span className="font-semibold">Short Project Title:</span> Developed
            data pipeline and dashboard that visualized XYZ across 200+ users.
          </li>
        </ul>
      </section>

      {/* Extra-Curricular */}
      <section className="mb-4">
        <h2 className="font-bold uppercase border-b border-gray-400 text-sm mb-1">
          Extra-Curricular Activities
        </h2>
        <ul className="list-disc ml-5 text-sm">
          <li>
            Created professional development social media platforms (TikTok,
            Instagram) viewed by over 200k+ job seekers per week.
          </li>
          <li>Published 5+ blogs on interview prep.</li>
          <li>Sample bullet</li>
        </ul>
      </section>

      {/* Leadership */}
      <section>
        <h2 className="font-bold uppercase border-b border-gray-400 text-sm mb-1">
          Leadership
        </h2>
        <p className="text-sm">
          Founded the FAANGPath Discord community with over 6000+ job seekers
          and industry mentors. Actively developed and moderated online events,
          career content, and more alongside other admins and a team of 5.
        </p>
      </section>
    </div>
        </>
    )
}
export default Resume1