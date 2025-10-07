import { Briefcase, GraduationCap } from "lucide-react";

const LinkedInTemplate=({data})=> {
  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl rounded-xl shadow-md overflow-hidden bg-white">
        {/* Header Section */}
        <div className="bg-gray-200 h-28"></div>
        <div className="px-6 mt-10">
          <h1 className="text-2xl font-semibold">{data?.candidate_name||"Manisha Sharma"}</h1>
          <p className="text-gray-600 mt-1">
            {data?.summary||"Web development & UI/UX design specialist focused on building intuitive, impactful digital products with innovative technologies."}
            
          </p>
          <p className="text-sm text-gray-500 mt-2">
          {data?.location||"Hyderabad, Telangana, India"}  
          </p>
        </div>

        {/* About */}
        <div className="px-6 mt-6">
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {data?.description||"Passionate and results-oriented professional with a strong background in web development and UI/UX design. Experienced in creating effective and engaging digital solutions, working on diverse projects ranging from client websites to content creation platforms. Adept at blending technical expertise with creative design to deliver user-friendly and high-performing products. Always eager to learn new technologies and contribute to innovative teams."}
            
          </p>
        </div>

        {/* Experience */}
        <div className="px-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Experience</h2>
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <Briefcase className="text-purple-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">Founder</h3>
              <p className="text-sm text-gray-600">HiringEye · Full-time</p>
              <p className="text-xs text-gray-500">
                Jan 2021 – Present · 2 yr 8 mos
              </p>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                As a versatile Web Developer and UI/UX Designer at TechNest
                Solutions, I have been responsible for delivering innovative,
                user-friendly digital experiences. My role involves collaborating
                closely with cross-functional teams to transform client ideas into
                high-quality websites, focusing on performance, accessibility, and
                visual appeal.
              </p>
              <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                <li>
                  Designed and developed responsive websites for diverse clients,
                  ensuring optimal performance and user satisfaction.
                </li>
                <li>
                  Led UI/UX workshops to streamline project workflows and foster
                  creative solutions.
                </li>
                <li>
                  Optimized e-commerce platforms for better accessibility and
                  higher conversion rates.
                </li>
                <li>
                  Collaborated with teams using HTML, CSS, JavaScript, and design
                  tools like Figma.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="px-6 mt-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Education</h2>
          <div className="flex items-start space-x-3">
            <div className="bg-yellow-100 p-2 rounded-full">
              <GraduationCap className="text-yellow-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">Chitkara University, Patiala</h3>
              <p className="text-sm text-gray-600">
                B.Des UX/UI Designer, Graphics Design
              </p>
              <p className="text-xs text-gray-500">Jan 2019 – Jan 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LinkedInTemplate
