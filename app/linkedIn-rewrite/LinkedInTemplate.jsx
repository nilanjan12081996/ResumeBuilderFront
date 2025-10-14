import { Briefcase, GraduationCap } from "lucide-react";
import { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentSubscription, getIpData } from "../reducers/PlanSlice";

const LinkedInTemplate=forwardRef(({data,educationEntries,experiences},ref)=> {
  const {  ipData, createOrderData, error, currentSubscriptionData } = useSelector(
    (state) => state.planst
  );
const dispatch=useDispatch()
  useEffect(()=>{
  dispatch(getIpData()).then((res)=>{
     if (res?.payload?.ip) {
      dispatch(currentSubscription(res?.payload?.ip))
     }
  })
  },[])
  console.log("currentSubscriptionData",currentSubscriptionData);
  return (
    <div ref={ref} className="flex justify-center p-6 bg-gray-100 min-h-screen">
      <style jsx>{`
        /* Hide watermark on screen, show only when printing */
        .print-watermark {
          display: none;
        }

        @media print {
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
          
          /* Ensure colors print correctly */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Optimize for A4 */
          .w-\\[800px\\] {
            width: 100% !important;
            max-width: none !important;
          }

          /* Show watermark only when printing */
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
      `}</style>

         <div className="print-watermark">
          {
            currentSubscriptionData?.data?.length===0&&('Hiring Eye')
          }   
          {/* Hiring Eye */}
        </div>
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
        {/* <div className="px-6 mt-6">
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
        </div> */}


                <div className="px-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Experience</h2>
          {experiences && experiences.length > 0 ? (
            experiences.map((exp, idx) => (
              <div key={exp.id || idx} className="flex items-start space-x-3 mb-6">
                <div className="bg-purple-100 p-2 rounded-full mt-1">
                  <Briefcase className="text-purple-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {exp.position || "Position not specified"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {exp.company_name || "Company name not available"}{" "}
                    {exp.job_type ? `· ${exp.job_type}` : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {exp.start_date
                      ? new Date(exp.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}{" "}
                    –{" "}
                    {exp.current_work
                      ? "Present"
                      : exp.end_date
                      ? new Date(exp.end_date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>

                  {exp.job_description && (
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                      {exp.job_description}
                    </p>
                  )}

                  {exp.skill && (
                    <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                      {exp.skill.split(",").map((skillItem, i) => (
                        <li key={i}>{skillItem.trim()}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No experience data available.</p>
          )}
        </div>

        {/* Education */}
        {/* <div className="px-6 mt-6 mb-8">
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
        </div> */}

        <div className="px-6 mt-6 mb-8">
  <h2 className="text-lg font-semibold mb-4">Education</h2>

  {educationEntries && educationEntries.length > 0 ? (
    educationEntries.map((edu, index) => (
      <div
        key={edu.id || index}
        className="flex items-start space-x-3 mb-4 last:mb-0"
      >
        <div className="bg-yellow-100 p-2 rounded-full">
          <GraduationCap className="text-yellow-600 w-5 h-5" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">
            {edu.institution || "Institution Name"}
          </h3>

          <p className="text-sm text-gray-600">
            {edu.degree ? `${edu.degree}` : ""}{" "}
            {edu.field_study ? `, ${edu.field_study}` : ""}
          </p>

          {/* Date Range */}
          <p className="text-xs text-gray-500">
            {edu.start_time
              ? new Date(edu.start_time).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "Start"}{" "}
            –{" "}
            {edu.currentlyStudying
              ? "Present"
              : edu.end_time
              ? new Date(edu.end_time).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "End"}
          </p>

          {/* GPA or Additional Info (Optional) */}
          {(edu.cgpa || edu.additionalInfo) && (
            <p className="text-xs text-gray-500 mt-1">
              {edu.cgpa ? `GPA: ${edu.cgpa}` : ""}{" "}
              {edu.additionalInfo ? ` | ${edu.additionalInfo}` : ""}
            </p>
          )}
        </div>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500">No education details available.</p>
  )}
</div>

      </div>
    </div>
  );
})
export default LinkedInTemplate
