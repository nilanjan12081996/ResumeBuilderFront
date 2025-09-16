const Template2=()=>{
    return(
        <>
         <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 font-sans text-sm text-gray-800">
      {/* Header */}
      <div className="text-center border-b pb-2 mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Kabilan S</h1>
        <div className="mt-2 space-x-2 text-xs text-gray-600 flex flex-col items-center">
          <span>kabilanselvakumar813@gmail.com</span>
          <span>+91 6383488489</span>
          <span>Trichy, TN</span>
        </div>
        <div className="flex flex-col items-center mt-2 space-y-1">
          <a
            href="www.linkedin.com/in/kabilan-s-baa12456"
            className="text-blue-700 underline"
            target="_blank" rel="noopener noreferrer"
          >
            linkedin.com/in/kabilan-s-baa12456
          </a>
          <a
            href="github.com/K-KABILAN"
            className="text-blue-700 underline"
            target="_blank" rel="noopener noreferrer"
          >
            github.com/K-KABILAN
          </a>
          <a
            href="kabilan-portfolio.vercel.app/"
            className="text-blue-700 underline"
            target="_blank" rel="noopener noreferrer"
          >
            kabilan-portfolio.vercel.app
          </a>
        </div>
      </div>
      {/* Sections */}
      <section className="mb-4">
        <h2 className="font-bold text-base text-blue-700 mb-1">Professional Summary</h2>
        <p>
          Full Stack Developer with hands-on experience in building scalable, responsive web applications using React.js, Next.js, Node.js, Express, and MongoDB. Passionate about creating seamless UI/UX experiences and integrating systems with RESTful APIs. Successfully delivered multiple client and team projects with a focus on performance, responsiveness, and code maintainability.
        </p>
      </section>
      <section className="mb-4">
        <h2 className="font-bold text-base text-blue-700 mb-1">Education</h2>
        <div className="flex flex-col space-y-1">
          <span>B.Tech, Saranathan College of Engineering <span className="float-right">2021-2025</span></span>
          <span>Intermediate, Laxmi Higher Secondary School <span className="float-right">2021</span></span>
        </div>
      </section>
      <section className="mb-4">
        <h2 className="font-bold text-base text-blue-700 mb-1">Professional Experience</h2>
        <div className="flex flex-col space-y-3">
          <div>
            <p className="font-semibold">Software Developer Intern</p>
            <p className="italic">Unikaksha</p>
            <ul className="list-disc pl-4">
              <li>Developed responsive dashboards using React.js and Tailwind CSS. Optimized website performance and code reusability, improving load times by 30%.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Front End Developer Intern</p>
            <p className="italic">Unikaksha</p>
            <ul className="list-disc pl-4">
              <li>Created enhanced resource interfaces for dashboards using React.js and TypeScript. Improved user engagement by 25%.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Web Developer Intern</p>
            <p className="italic">Saranathan College of Engineering</p>
            <ul className="list-disc pl-4">
              <li>Built and improved business website using Next.js and Tailwind CSS, achieving 50% mobile responsiveness scores.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-4">
        <h2 className="font-bold text-base text-blue-700 mb-1">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "JavaScript", "CSS", "C++", "SQL", "React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3",
            "Node.js", "Express.js", "MongoDB", "Git", "GitHub", "Postman", "Vercel", "Netlify",
            "REST APIs", "CRUD Operations", "Responsive Design", "State Management (Redux,Context API)"
          ].map(skill => (
            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded" key={skill}>{skill}</span>
          ))}
        </div>
      </section>
      <section className="mb-4">
        <h2 className="font-bold text-base text-blue-700 mb-1">Languages</h2>
        <p>English Native · Spanish Intermediate</p>
      </section>
      <section>
        <h2 className="font-bold text-base text-blue-700 mb-1">Projects</h2>
        <div className="text-gray-600 italic">[Details Hidden]</div>
      </section>
    </div>
        </>
    )
}
export default Template2