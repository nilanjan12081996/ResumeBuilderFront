'use client';
import React from 'react';

const VividTemplate = ({ formData }) => {
  
  // --- Helpers ---
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
  };

  const getYear = (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    return d.getFullYear();
  };

  // --- Data Existence Checks ---
  // We calculate these once to keep the JSX clean
  const hasDetails = formData.driving_licence || formData.nationality || formData.dob || formData.birth_place;
  const hasEducation = formData.educationHistory?.some(edu => edu.school || edu.degree);
  const hasEmployment = formData.employmentHistory?.some(job => job.job_title || job.employer);
  const hasActivities = formData.activityHistory?.some(act => act.functionTitle || act.employer);
  const hasSkills = formData.newSkillHistory?.some(s => s.skill);
  const hasLanguages = formData.languageHistory?.some(l => l.language);
  const hasLinks = formData.linkedin || formData.github;
   const hideLevel = formData.hideExperienceLevel;

  // --- Sub-components ---
  const SectionHeader = ({ title }) => (
    <div className="bg-black text-white inline-block px-3 py-1 text-[11px] font-bold tracking-widest uppercase mb-5">
      {title}
    </div>
  );

  return (
    <div className="min-h-[297mm] bg-white text-gray-800 font-sans shadow-2xl flex flex-col">
      
      {/* ----------------- YELLOW HEADER ----------------- */}
      <div className="bg-[#ffeb3b] p-12 pb-14 flex justify-between items-start">
        <div className="w-[55%]">
          <h1 className="text-[42px] font-bold text-gray-900 leading-none mb-2 tracking-tight">
            {formData.first_name}
            <br />
            {formData.last_name}
          </h1>
        </div>
        
        <div className="w-[45%] text-left flex flex-col gap-1 text-[11px] text-gray-900 leading-snug">
          <p className="font-bold uppercase tracking-wide text-xs mb-1">
            {formData.job_target}
          </p>
          {(formData.address || formData.city_state || formData.country) && (
            <p>
               {formData.address}
               {formData.address && (formData.city_state || formData.country) ? ', ' : ''}
               {formData.city_state}
               {formData.city_state && formData.country ? ', ' : ''}
               {formData.country}
               {formData.postal_code ? ` ${formData.postal_code}` : ''}
            </p>
          )}
          {formData.email && (
            <a href={`mailto:${formData.email}`} className="hover:underline font-medium">
              {formData.email}
            </a>
          )}
          {formData.phone && <p className="font-medium">{formData.phone}</p>}
        </div>
      </div>

      {/* ----------------- MAIN CONTENT ----------------- */}
      <div className="px-12 py-10 flex flex-col gap-8">

        {/* --- DETAILS SECTION --- */}
        {hasDetails && (
          <section>
            <SectionHeader title="Details" />
            <div className="grid grid-cols-2 gap-y-4 gap-x-10 max-w-lg">
              {formData.driving_licence && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase">Driving License</h4>
                  <p className="text-[11px] text-gray-600">{formData.driving_licence}</p>
                </div>
              )}
              {formData.nationality && (
                <div>
                  <h4 className="text-[10px] font-bold text-gray-900 uppercase">Nationality</h4>
                  <p className="text-[11px] text-gray-600">{formData.nationality}</p>
                </div>
              )}
              {(formData.dob || formData.birth_place) && (
                <div>
                   <h4 className="text-[10px] font-bold text-gray-900 uppercase">Date / Place of Birth</h4>
                   <p className="text-[11px] text-gray-600">
                     {formData.dob}
                     {formData.dob && formData.birth_place ? ', ' : ''}
                     {formData.birth_place}
                   </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* --- PROFILE SECTION --- */}
        {formData.summary && (
          <section>
            <SectionHeader title="Profile" />
            <p className="text-[11px] leading-relaxed text-gray-700 text-justify whitespace-pre-wrap">
              {formData.summary}
            </p>
          </section>
        )}

        {/* --- EDUCATION SECTION --- */}
        {hasEducation && (
          <section>
            <SectionHeader title="Education" />
            <div className="flex flex-col gap-5">
              {formData.educationHistory.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="text-[12px] font-bold text-gray-900 uppercase tracking-wide">
                    {edu.degree}{edu.school ? `, ${edu.school}` : ''}
                  </h3>
                  {edu.description && (
                    <p className="text-[11px] text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">
                      {edu.description}
                    </p>
                  )}
                  <div className="text-[10px] text-gray-400 font-semibold uppercase mt-1 tracking-wider">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- EXPERIENCE SECTION --- */}
        {hasEmployment && (
          <section>
            <SectionHeader title="Experience" />
            <div className="flex flex-col gap-6">
              {formData.employmentHistory.map((job, idx) => (
                <div key={idx}>
                  <h3 className="text-[12px] font-bold text-gray-900">
                    {job.job_title}
                    <span className="font-normal text-gray-600">
                        {job.employer ? `, ${job.employer}` : ''}
                        {job.city_state ? `, ${job.city_state}` : ''}
                    </span>
                  </h3>
                  
                  <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                     {formatDate(job.startDate)} — {formatDate(job.endDate)}
                  </div>
                  
                  {job.description && (
                    <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {job.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- ACTIVITIES SECTION --- */}
        {hasActivities && (
           <section>
             <SectionHeader title="Activities" />
             <div className="flex flex-col gap-5">
               {formData.activityHistory.map((act, idx) => (
                 <div key={idx}>
                   <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-[12px] font-bold text-gray-900">
                        {act.functionTitle} {act.employer ? `- ${act.employer}` : ''}
                      </h3>
                      {/* Dates aligned right for Activities per some designs, or kept below. Using below for consistency */}
                   </div>
                    <div className="text-[10px] text-gray-400 font-semibold uppercase mb-1 tracking-wider">
                      {getYear(act.startDate)} — {getYear(act.endDate)}
                   </div>
                   {act.description && (
                     <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                       {act.description}
                     </p>
                   )}
                 </div>
               ))}
             </div>
           </section>
        )}

        {/* --- TOOLS / SKILLS SECTION --- */}
        {/* --- SKILLS SECTION --- */}
{hasSkills && (
  <section>
    {/* Using the SectionHeader component to match the Vivid Template style */}
    <SectionHeader title="Skills" />
    <div className="flex flex-col gap-5 mt-2">
      {formData.newSkillHistory.map((item, index) => {
        // Use the getSkillWidth helper logic to determine the bar length
     const percentage = ((item.level ?? 3) + 1) * 120;

        return (
          <div key={index} className="w-full">
            {/* Skill Name: Black text, matching image_15656c */}
            <div className="text-[11px] font-bold text-gray-900 mb-1.5 uppercase tracking-wide">
              {item.skill || ""}
            </div>
            
            {/* Progress Bar: Only visible if hideLevel is false */}
            {!formData.hideExperienceLevel && (
              <div className="w-full bg-gray-100 h-1.5">
                <div
                  className="bg-black h-full transition-all duration-500"
                  style={{ width: percentage }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  </section>
)}

        {/* --- LANGUAGES SECTION --- */}
        {hasLanguages && (
          <section>
            <SectionHeader title="Languages" />
            <div className="grid grid-cols-2 gap-x-16 gap-y-6 max-w-2xl">
              {formData.languageHistory.map((lang, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between items-end">
                     <span className="text-[11px] font-medium text-gray-800">{lang.language}</span>
                  </div>
                  {/* Visual Bar */}
                  <div className="w-full h-1.5 bg-gray-100">
                    <div 
                      className="h-full bg-black" 
                      style={{ 
                        width: lang.level === 'Native' ? '100%' : 
                               lang.level === 'Fluent' ? '85%' : 
                               lang.level === 'Intermediate' ? '50%' : '25%' 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- HOBBIES SECTION --- */}
        {formData.hobbies && (
          <section>
            <SectionHeader title="Hobbies" />
            <div className="text-[11px] text-gray-800 leading-relaxed font-medium">
               {/* Splitting new lines if it's a list, or just displaying text */}
               <div className="flex flex-col gap-2">
                 {formData.hobbies.split('\n').map((hobby, i) => (
                   <span key={i} className="block">{hobby}</span>
                 ))}
               </div>
            </div>
          </section>
        )}

        {/* --- LINKS SECTION --- */}
        {hasLinks && (
          <section>
            <SectionHeader title="Links" />
            <div className="flex flex-col gap-1 text-[11px]">
               {formData.linkedin && (
                 <a href={formData.linkedin} className="text-gray-700 underline decoration-gray-400 underline-offset-2 hover:text-black">
                   LinkedIn
                 </a>
               )}
               {formData.github && (
                 <a href={formData.github} className="text-gray-700 underline decoration-gray-400 underline-offset-2 hover:text-black">
                   GitHub
                 </a>
               )}
            </div>
          </section>
        )}

      </div>
      
      {/* --- CUSTOM SECTIONS --- */}
      {Object.keys(formData)
        .filter(key => key.startsWith('customSectionHistory_'))
        .map(key => {
          const sectionId = key.replace('customSectionHistory_', '');
          const history = formData[key];
          const title = formData[`customSectionTitle_${sectionId}`] || 'Custom Section';

          if (!history?.some(item => item.activity || item.city)) return null;

          return (
            <section key={sectionId}>
              <SectionHeader title={title} />
              <div className="flex flex-col gap-6">
                {history.map((item, idx) => (
                  <div key={idx}>
                    <h3 className="text-[12px] font-bold text-gray-900">
                      {item.activity}
                      <span className="font-normal text-gray-600">
                          {item.city ? `, ${item.city}` : ''}
                      </span>
                    </h3>
                    
                    <div className="text-[10px] text-gray-400 font-semibold uppercase mb-2 tracking-wider mt-0.5">
                        {formatDate(item.startDate)} — {formatDate(item.endDate)}
                    </div>
                    
                    {item.description && (
                      <p className="text-[11px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
};

export default VividTemplate;