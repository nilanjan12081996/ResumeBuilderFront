'use client';
import React from 'react';

const PrimeATS = ({ formData }) => {
  // Helper to format dates to "JAN 2026"
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
  };

  const hasContactInfo = 
    formData.email || 
    formData.phone || 
    formData.address || 
    formData.city_state || 
    formData.postal_code || 
    formData.driving_licence || 
    formData.nationality||
    formData.country;

  const hasEmployment = formData.employmentHistory?.some(job => job.job_title || job.employer);
  const hasEducation = formData.educationHistory?.some(edu => edu.school || edu.degree);
  const hasSkills = formData.newSkillHistory?.some(s => s.skill);

  return (
    <div className="min-h-[297mm] w-full bg-white p-12 text-gray-800 font-sans shadow-lg">
      
      {/* ----------------- HEADER SECTION ----------------- */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[#2b6cb0] uppercase tracking-tight">
            {formData.first_name} {formData.last_name}
          </h1>
          <h2 className="text-xl font-bold text-black mt-1 uppercase">
            {formData.job_target}
          </h2>

          {/* Contact Details Row */}
          <div className="mt-2 text-[11px] text-gray-600 flex flex-wrap gap-x-2 items-center">
            <span>{formData.address}</span>
            {formData.city_state && <span>| {formData.city_state}, {formData.postal_code}</span>}
            {formData.email && (
              <>
                <span>|</span>
                <a href={`mailto:${formData.email}`} className="text-[#2b6cb0] underline">{formData.email}</a>
              </>
            )}
            {formData.phone && <span>| {formData.phone}</span>}
            {formData.linkedin && <span>| LinkedIn</span>}
          </div>
            {
              hasContactInfo&&(
                   <div className="mt-1 text-[11px] text-gray-600">
            <span className="font-bold">Personal Details: </span>
            {formData.dob && <span>{formData.dob} | </span>}
            {formData.city_state && <span>{formData.city_state} | </span>}
            {formData.nationality && <span>{formData.nationality} | </span>}
            {formData.postal_code && <span>{formData.postal_code}</span>}
          </div>
              )
            }
          {/* Secondary Details (DOB, Nationality etc) */}
       
        </div>

        {/* Profile Image - Top Right */}
        {formData.profileImage && (
          <div className="w-24 h-24 ml-4">
            <img 
              src={formData.profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-md shadow-sm"
            />
          </div>
        )}
      </div>

      {/* ----------------- SUMMARY / PROFILE ----------------- */}
      {formData.summary && (
        <section className="mb-6">
          <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-2 pb-1 uppercase tracking-wider">
            Profile
          </h3>
          <p className="text-xs leading-relaxed whitespace-pre-wrap">{formData.summary}</p>
        </section>
      )}

      {/* ----------------- EMPLOYMENT HISTORY ----------------- */}
      {hasEmployment && (
        <section className="mb-6">
          <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-3 pb-1 uppercase tracking-wider">
            Professional Experience
          </h3>
          <div className="flex flex-col gap-4">
            {formData.employmentHistory.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xs font-bold text-black">
                    {job.job_title}{job.employer ? `, ${job.employer}` : ''}
                    <span className="font-normal text-gray-600 ml-1">
                      {job.city_state ? `, ${job.city_state}` : ''}
                    </span>
                  </h4>
                  <span className="text-[10px] font-bold text-black">
                    {formatDate(job.startDate)} — {formatDate(job.endDate) || 'PRESENT'}
                  </span>
                </div>
                {job.description && (
                  <p className="text-[11px] mt-1 text-gray-700 whitespace-pre-wrap leading-normal">
                    {job.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ----------------- EDUCATION ----------------- */}
      {hasEducation && (
        <section className="mb-6">
          <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-3 pb-1 uppercase tracking-wider">
            Education
          </h3>
          <div className="flex flex-col gap-4">
            {formData.educationHistory.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xs font-bold text-black">
                    {edu.degree}{edu.school ? `, ${edu.school}` : ''}
                    <span className="font-normal text-gray-600 ml-1">
                      {edu.city_state ? `, ${edu.city_state}` : ''}
                    </span>
                  </h4>
                  <span className="text-[10px] font-bold text-black">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate) || 'PRESENT'}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-[11px] mt-1 text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ----------------- SKILLS ----------------- */}
      {hasSkills && (
        <section className="mb-6">
          <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-2 pb-1 uppercase tracking-wider">
            Technical Skills
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2">
            {formData.newSkillHistory.map((item, index) => (
              <div key={index} className="text-xs flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-800">{item.skill}</span>
                {!formData.hideExperienceLevel && (
                  <span className="text-gray-400 text-[10px] uppercase">{item.level || 'Expert'}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ----------------- HOBBIES / LANGUAGES ----------------- */}
      <div className="grid grid-cols-2 gap-8">
        {formData.hobbies && (
          <section>
            <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-2 pb-1 uppercase tracking-wider">
              Hobbies
            </h3>
            <p className="text-xs text-gray-700">{formData.hobbies}</p>
          </section>
        )}
        
        {formData.languageHistory?.some(l => l.language)&&formData.languageHistory?.length > 0 && (
          <section>
            <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-2 pb-1 uppercase tracking-wider">
              Languages
            </h3>
            <div className="text-xs flex flex-wrap gap-2">
              {formData.languageHistory.map((l, i) => (
                <span key={i} className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                  {l.language} ({l.level})
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ----------------- CUSTOM SECTIONS ----------------- */}
      {Object.keys(formData)
        .filter(key => key.startsWith('customSectionHistory_'))
        .map(key => {
          const sectionId = key.replace('customSectionHistory_', '');
          const history = formData[key];
          const title = formData[`customSectionTitle_${sectionId}`] || 'Custom Section';

          if (!history?.some(item => item.activity || item.city)) return null;

          return (
            <section key={sectionId} className="mb-6 mt-6">
              <h3 className="text-[#2b6cb0] font-bold text-sm border-b-2 border-[#2b6cb0] mb-3 pb-1 uppercase tracking-wider">
                {title}
              </h3>
              <div className="flex flex-col gap-4">
                {history.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-black">
                        {item.activity}{item.city ? `, ${item.city}` : ''}
                      </h4>
                      <span className="text-[10px] font-bold text-black">
                        {formatDate(item.startDate)} — {formatDate(item.endDate)}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-[11px] mt-1 text-gray-700 whitespace-pre-wrap leading-normal">
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

export default PrimeATS;