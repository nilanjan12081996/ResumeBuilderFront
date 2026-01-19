'use client';
import React from 'react';

const Professional = ({ formData ,empHistory, themeColor}) => {
  // 1. Match the snake_case logic from your form's register calls

  console.log("formData",formData);
  
  const hasContactInfo = 
    formData.email || 
    formData.phone || 
    formData.address || 
    formData.city_state || 
    formData.postal_code || 
    formData.driving_licence || 
    formData.nationality||
    formData.country;

  const hasEmployment =formData.employmentHistory?.some(job => job.job_title || job.employer)&& formData.employmentHistory && formData.employmentHistory.length > 0;
    const hasSkills = formData.newSkillHistory?.some(s => s.skill) && formData.newSkillHistory.length > 0;
  const hideLevel = formData.hideExperienceLevel;
  return (
    <div className="min-h-[297mm] bg-white shadow-xl flex text-sm font-sans">
      
      {/* ----------------- LEFT SIDEBAR ----------------- */}
      <div className="w-[35%] text-white p-8 flex flex-col gap-6 items-center text-center" style={{ backgroundColor: themeColor}}>
        
        {/* Profile Image */}
        {formData.profileImage && (
          <div className="w-15 h-15 mb-1 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={formData.profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Name Block */}
        <div className="mt-1 w-full flex flex-col items-center">
          <h1 className="text-xl font-serif font-bold leading-tight break-words">
            {formData.first_name} <br />
            {formData.last_name}
          </h1>
          
          <div className="w-8 h-[1px] bg-gray-400 my-4 opacity-50"></div>

          {formData.job_target && (
            <div className="">
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-300">
                {formData.job_target}
              </p>
            </div>
          )}
        </div>

        {/* Details Section */}
        {hasContactInfo && (
          <div className="w-full flex flex-col items-start">
            <h3 className="text-xs font-serif font-bold mb-2">Details</h3>
            <div className="flex flex-col gap-2 text-xs text-gray-300 font-light items-start">
              
              {(formData.address || formData.city_state) && (
                <div className="mb-1">
                  <span className="block text-start">{formData.address}</span>
                  <span className="block text-start">{formData.city_state}{formData?.country&&","+formData.country}</span>
                  {formData.postal_code && <span className="block text-start">{formData.postal_code}</span>}
                </div>
              )}

              {formData.email && (
                <a href={`mailto:${formData.email}`} className="break-all hover:text-white border-b border-gray-400 pb-0.5">
                  {formData.email}
                </a>
              )}

              {formData.phone && (
                <div className="block text-start">{formData.phone}</div>
              )}

              
              {formData.driving_licence && (
                <div className="mt-2 text-start">
                   <span className="font-semibold text-gray-400 block text-[10px] uppercase">Driving License</span>
                   <span>{formData.driving_licence}</span>
                </div>
              )}

              {formData.nationality && (
                <div className="mt-1 text-start">
                   <span className="font-semibold text-gray-400 block text-[10px] uppercase">Nationality</span>
                   <span>{formData.nationality}</span>
                </div>
              )}

               {formData.birth_place && (
                <div className="mt-1 text-start">
                   <span className="font-semibold text-gray-400 block text-[10px] uppercase">Place of Birth</span>
                   <span>{formData.birth_place}</span>
                </div>
              )}
               
               {formData.dob && (
                <div className="mt-1 text-start">
                   <span className="font-semibold text-gray-400 block text-[10px] uppercase">Date of Birth</span>
                   <span>{formData.dob}</span>
                </div>
              )}
            </div>
          </div>
        )}
        {hasSkills && (
          <div className="mt-1 w-full text-start">
            <h3 className="text-xs font-serif font-bold mb-2">Skills</h3>
            <div className="flex flex-col gap-4">
              {formData.newSkillHistory.map((item, index) => {
                
                const percentage = ((item.level ?? 3) + 1) * 20;

                return (
                  <div key={index} className="w-full">
                    <div className="text-xs text-white mb-1.5">{item.skill || ""}</div>
                    
                    {!hideLevel && (
                      <div className="w-full bg-[#1a4f46] h-[2px] rounded-full overflow-hidden">
                        <div
                          className="bg-white h-full transition-all duration-500 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {formData.hobbies && (
          <div className="mt-4 w-full text-start">
            <h3 className="text-xs font-serif font-bold mb-2">Hobbies</h3>
            <p className="text-xs text-gray-300 font-light whitespace-pre-wrap leading-relaxed">
                {formData.hobbies}
            </p>
          </div>
        )}
        {formData.languageHistory?.some(l => l.language) && formData.languageHistory.length > 0 && (
          <div className="mt-4 w-full text-start">
            <h3 className="text-xs font-serif font-bold mb-2">Languages</h3>
            <div className="flex flex-col gap-4">
              {formData.languageHistory.map((item, index) => {
                let percentage = 20; 
                switch(item.level) {
                    case "Native speaker": percentage = 100; break;
                    case "Highly proficient": percentage = 80; break;
                    case "Very good command": percentage = 60; break;
                    case "Good working knowledge": percentage = 40; break;
                    case "Working knowledge": percentage = 20; break;
                    default: percentage = 20;
                }

                return (
                  <div key={index} className="w-full">
                    <div className="text-xs text-white mb-1.5">{item.language || ""}</div>
                    <div className="w-full bg-[#1a4f46] h-[2px] rounded-full overflow-hidden">
                        <div
                            className="bg-white h-full transition-all duration-500 shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
 
   
      </div>
        

        {/* Languages Section on Left Sidebar with Progress Bar */}


      {/* ----------------- RIGHT CONTENT ----------------- */}
      <div className="w-[65%] p-10 flex flex-col gap-8 text-gray-800">
        
        {/* Profile Summary */}
        {formData.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-0">Profile</h2>
            <p className="text-xs leading-relaxed text-gray-600 whitespace-pre-wrap break-words text-justify">
              {formData.summary}
            </p>
          </section>
        )}

 

  {hasEmployment && (
  <section>
    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1">
      Employment History
    </h2>
    <div className="flex flex-col gap-4">
      {formData.employmentHistory.map((job, index) => {
        
        // --- ADD THIS HELPER FUNCTION ---
        const formatDate = (dateValue) => {
          if (!dateValue) return "";
          const d = new Date(dateValue);
          // Returns format: JAN 2026
          return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
        };

        const displayStart = formatDate(job.startDate);
        const displayEnd = formatDate(job.endDate);

        return (
          <div key={index} className="mb-2">
            <h3 className="text-[12px] font-bold text-black">
              {job.job_title}
              {job.employer ? `, ${job.employer}` : ''}
              {job.city_state ? `, ${job.city_state}` : ''}
            </h3>
            
            {/* --- UPDATED DATE ROW --- */}
            {(displayStart || displayEnd) && (
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
              </div>
            )}
            
            {job.description && (
              <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                {job.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  </section>
)}

        {/* education */}
        {formData.educationHistory?.some(job => job.school || job.degree)&&formData.educationHistory && formData.educationHistory.length > 0 && (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1 border-gray-200">
        Education
      </h2>
      <div className="flex flex-col gap-4 mt-3">
        {formData.educationHistory.map((edu, index) => {
            const formatDate = (dateValue) => {
          if (!dateValue) return "";
          const d = new Date(dateValue);
          // Returns format: JAN 2026
          return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
        };

        const displayStart = formatDate(edu.startDate);
        const displayEnd = formatDate(edu.endDate);

          return(
          <div key={index} className="mb-2">
            {/* School, Degree, and City */}
            <h3 className="text-[12px] font-bold text-black leading-tight">
              {edu.degree}{edu.school ? `, ${edu.school}` : ''}{edu.city_state ? `, ${edu.city_state}` : ''}
            </h3>
            
            {/* Dates - Formatted as uppercase Jan 2026 — Apr 2026 */}
            {/* <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mt-1 mb-1">
              {edu.startDate && edu.endDate 
                ? `${new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — ${new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
                : ""}
            </div> */}
              {(displayStart || displayEnd) && (
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
              </div>
            )}
            
            
            {/* Education Description */}
            {edu.description && (
              <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1">
                {edu.description}
              </p>
            )}
          </div>
          )
        })}
      </div>
    </section>
  )}
  
  {/* Courses Section */}
  {formData.coursesHistory?.some(c => c.course || c.institution) && formData.coursesHistory.length > 0 && (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1 border-gray-200">
        Courses
      </h2>
      <div className="flex flex-col gap-4 mt-3">
        {formData.coursesHistory.map((course, index) => {
          const formatDate = (dateValue) => {
            if (!dateValue) return "";
            const d = new Date(dateValue);
            return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
          };

          const displayStart = formatDate(course.startDate);
          const displayEnd = formatDate(course.endDate);

          return (
            <div key={index} className="mb-2">
              <h3 className="text-[12px] font-bold text-black leading-tight">
                {course.course}{course.institution ? `, ${course.institution}` : ''}
              </h3>

              {(displayStart || displayEnd) && (
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                   {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
                </div>
              )}

              {course.description && (
                <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1">
                  {course.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  )}

  {/* Extra-curricular Activities Section */}
  {formData.activityHistory?.some(a => a.functionTitle || a.employer) && formData.activityHistory.length > 0 && (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1 border-gray-200">
        Extra-curricular Activities
      </h2>
      <div className="flex flex-col gap-4 mt-3">
        {formData.activityHistory.map((activity, index) => {
          const formatDate = (dateValue) => {
            if (!dateValue) return "";
            const d = new Date(dateValue);
            return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
          };

          const displayStart = formatDate(activity.startDate);
          const displayEnd = formatDate(activity.endDate);

          return (
            <div key={index} className="mb-2">
              <h3 className="text-[12px] font-bold text-black leading-tight">
                {activity.functionTitle}{activity.employer ? `, ${activity.employer}` : ''}{activity.city ? `, ${activity.city}` : ''}
              </h3>

              {(displayStart || displayEnd) && (
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                   {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
                </div>
              )}

              {activity.description && (
                <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1">
                  {activity.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  )}

  {/* Internship Section */}
{formData.internshipHistory?.some(intern => intern.jobTitle || intern.employer) && formData.internshipHistory.length > 0 && (
  <section>
    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1">
      Internships
    </h2>
    <div className="flex flex-col gap-4">
      {formData.internshipHistory.map((intern, index) => {
        const formatDate = (dateValue) => {
          if (!dateValue) return "";
          const d = new Date(dateValue);
          return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
        };

        const displayStart = formatDate(intern.startDate);
        const displayEnd = formatDate(intern.endDate);

        return (
          <div key={index} className="mb-2">
            <h3 className="text-[12px] font-bold text-black">
              {intern.jobTitle}
              {intern.employer ? `, ${intern.employer}` : ''}
              {intern.city ? `, ${intern.city}` : ''}
            </h3>
            
            {(displayStart || displayEnd) && (
              <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
              </div>
            )}
            
            {intern.description && (
              <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                {intern.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  </section>
)}

{/* Custom Section */}
  {formData.customSectionHistory?.some(item => item.activity || item.city) && formData.customSectionHistory.length > 0 && (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1">
        {formData.customSectionTitle || "Custom Section"}
      </h2>
      <div className="flex flex-col gap-4">
        {formData.customSectionHistory.map((item, index) => {
          const formatDate = (dateValue) => {
            if (!dateValue) return "";
            const d = new Date(dateValue);
            return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
          };

          const displayStart = formatDate(item.startDate);
          const displayEnd = formatDate(item.endDate);

          return (
            <div key={index} className="mb-2">
              <h3 className="text-[12px] font-bold text-black">
                {item.activity}
                {item.city ? `, ${item.city}` : ''}
              </h3>
              
              {(displayStart || displayEnd) && (
                <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1 font-medium">
                  {displayStart} {displayStart && displayEnd ? ' — ' : ''} {displayEnd}
                </div>
              )}
              
              {item.description && (
                <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  )}
      </div>
    </div>
  );
};

export default Professional;