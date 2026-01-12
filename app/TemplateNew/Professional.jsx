'use client';
import React from 'react';

const Professional = ({ formData ,empHistory}) => {
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
      <div className="w-[35%] bg-[#0e3f36] text-white p-8 flex flex-col gap-6">
        
        {/* Name Block */}
        <div className="mt-4">
          <h1 className="text-3xl font-serif font-bold leading-tight break-words">
            {formData.first_name} <br />
            {formData.last_name}
          </h1>
          
          {formData.job_target && (
            <div className="mt-4 pb-4 border-b border-gray-500">
              <p className="text-xs uppercase tracking-[0.2em] font-medium text-gray-300">
                {formData.job_target}
              </p>
            </div>
          )}
        </div>

        {/* Details Section */}
        {hasContactInfo && (
          <div>
            <h3 className="text-lg font-serif font-bold mb-1">Details</h3>
            <div className="flex flex-col gap-2 text-xs text-gray-300 font-light">
              
              {(formData.address || formData.city_state) && (
                <div className="mb-1">
                  <span className="block">{formData.address}</span>
                  <span className="block">{formData.city_state}{formData?.country&&","+formData.country}</span>
                  {formData.postal_code && <span className="block">{formData.postal_code}</span>}
                </div>
              )}

              {formData.phone && (
                <div className="block">{formData.phone}</div>
              )}

              {formData.email && (
                <a href={`mailto:${formData.email}`} className="break-words block hover:text-white">
                  {formData.email}
                </a>
              )}
              
              {formData.driving_licence && (
                <div className="mt-2">
                   <span className="font-semibold text-gray-400 block text-[10px] uppercase">Driving License</span>
                   <span>{formData.driving_licence}</span>
                </div>
              )}

              {formData.nationality && (
                <div className="mt-1">
                   <span className="font-semibold text-gray-400 block text-[10px] uppercase">Nationality</span>
                   <span>{formData.nationality}</span>
                </div>
              )}

               {formData.birth_place && (
                <div className="mt-1">
                   <span className="font-semibold text-gray-400 block text-[10px] uppercase">Place of Birth</span>
                   <span>{formData.birth_place}</span>
                </div>
              )}
               
               {formData.dob && (
                <div className="mt-1">
                   <span className="font-semibold text-gray-400 block text-[10px] uppercase">Date of Birth</span>
                   <span>{formData.dob}</span>
                </div>
              )}
            </div>
          </div>
        )}
        {hasSkills && (
          <div className="mt-4">
            <h3 className="text-lg font-serif font-bold mb-3">Skills</h3>
            <div className="flex flex-col gap-4">
              {formData.newSkillHistory.map((item, index) => {
                // Calculate percentage: (index 0-4 + 1) * 20
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
   
      </div>

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

        {/* Employment History */}
        {hasEmployment && (
        
        <section>
    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1 pb-1">
      Employment History
    </h2>
    <div className="flex flex-col gap-4">
      {formData.employmentHistory.map((job, index) => (
        <div key={index} className="mb-2">
          <h3 className="text-[12px] font-bold text-black">
            {job.job_title}{job.employer ? `, ${job.employer}` : ''}{job.city_state ?','+ job.city_state : ''}
          </h3>
          
          <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">
            {job.city_state ? job.city_state : ''}
          </div>
          
          {job.description && (
            <p className="text-xs text-gray-700 whitespace-pre-wrap">
              {job.description}
            </p>
          )}
        </div>
      ))}
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
        {formData.educationHistory.map((edu, index) => (
          <div key={index} className="mb-2">
            {/* School, Degree, and City */}
            <h3 className="text-[12px] font-bold text-black leading-tight">
              {edu.degree}{edu.school ? `, ${edu.school}` : ''}{edu.city_state ? `, ${edu.city_state}` : ''}
            </h3>
            
            {/* Dates - Formatted as uppercase Jan 2026 — Apr 2026 */}
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mt-1 mb-1">
              {edu.startDate && edu.endDate 
                ? `${new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — ${new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
                : ""}
            </div>
            
            {/* Education Description */}
            {edu.description && (
              <p className="text-xs text-gray-700 whitespace-pre-wrap mt-1">
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )}
      </div>
    </div>
  );
};

export default Professional;