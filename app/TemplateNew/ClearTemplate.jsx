'use client';
import React from 'react';
import { Link, Phone, Mail, MapPin, Calendar } from 'lucide-react'; // Assuming you have lucide-react or similar icons

const ClearTemplate = ({ formData }) => {

  // --- Helpers ---
  const formatDate = (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    return d.toLocaleString('en-US', { month: 'short', year: 'numeric' }); // e.g. Jan 2026
  };

  const getYear = (dateValue) => {
    if (!dateValue) return "";
    const d = new Date(dateValue);
    return d.getFullYear();
  };

  // --- Logic Checks ---
  const hasEmployment = formData.employmentHistory?.some(job => job.job_title || job.employer) && formData.employmentHistory.length > 0;
  const hasEducation = formData.educationHistory?.some(edu => edu.school || edu.degree) && formData.educationHistory.length > 0;
  const hasSkills = formData.newSkillHistory?.some(s => s.skill) && formData.newSkillHistory.length > 0;
  const hasLanguages = formData.languageHistory?.some(l => l.language) && formData.languageHistory.length > 0;
  const hasActivities = formData.activityHistory?.some(a => a.functionTitle || a.employer) && formData.activityHistory.length > 0;
  const hasInternships = formData.internshipHistory?.some(i => i.jobTitle || i.employer) && formData.internshipHistory.length > 0;
  const hasCourses = formData.coursesHistory?.some(c => c.course || c.institution) && formData.coursesHistory.length > 0;
  const hasCustom = formData.customSectionHistory?.some(c => c.activity) && formData.customSectionHistory.length > 0;

  // Combine links for the sidebar
  const links = [];
  if (formData.linkedin) links.push({ label: "LinkedIn", url: formData.linkedin });
  if (formData.website) links.push({ label: "Portfolio", url: formData.website });
  if (formData.github) links.push({ label: "GitHub", url: formData.github });

  return (
    <div className="min-h-[297mm] bg-white text-gray-800 font-sans shadow-xl">
      
      {/* ----------------- HEADER (TEAL BLOCK) ----------------- */}
      <div className="bg-[#4fffa3] p-10 flex items-center gap-6">
        
        {/* Optional: Profile Image (Hidden if not provided, per design thumbnail) */}
        {formData.profileImage && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shrink-0 shadow-sm bg-gray-200">
             <img 
               src={formData.profileImage} 
               alt="Profile" 
               className="w-full h-full object-cover"
             />
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {formData.first_name} {formData.last_name}
          </h1>
          <p className="text-sm font-medium uppercase tracking-wide text-gray-700 mb-4">
            {formData.job_target}
          </p>

          <div className="text-xs text-gray-800 flex flex-col gap-1">
            {/* Address Line */}
            {(formData.address || formData.city_state || formData.country) && (
              <span>
                {formData.address}
                {formData.address && (formData.city_state || formData.country) ? ', ' : ''}
                {formData.city_state}
                {formData.city_state && formData.country ? ', ' : ''}
                {formData.country}
                {formData.postal_code ? ` ${formData.postal_code}` : ''}
              </span>
            )}
            
            {/* Contact Line */}
            <div className="flex flex-wrap gap-4">
               {formData.phone && <span>{formData.phone}</span>}
               {formData.email && (
                 <a href={`mailto:${formData.email}`} className="underline hover:text-black">
                   {formData.email}
                 </a>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- MAIN GRID ----------------- */}
      <div className="flex min-h-[800px]"> {/* Flex container for columns */}
        
        {/* ================= LEFT SIDEBAR (25%) ================= */}
        <div className="w-[28%] p-8 pl-10 pt-10">
          
          {/* LINKS */}
          {links.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2 text-gray-900">
                 {/* Simple link icon SVG representation */}
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                 <span className="text-xs font-bold uppercase tracking-wider">Links</span>
              </div>
              <div className="flex flex-col gap-1">
                {links.map((link, idx) => (
                  <a key={idx} href={link.url} className="text-xs text-gray-600 hover:underline hover:text-black decoration-dotted">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {(formData.dob || formData.birth_place || formData.nationality || formData.driving_licence) && (
            <section className="flex flex-col gap-4">
             
              
              {formData.dob && (
                <div>
                  <p className="text-[11px] font-bold text-gray-900">Date / Place of birth</p>
                  <p className="text-[11px] text-gray-600">{formData.dob}{formData.birth_place ? `, ${formData.birth_place}` : ''}</p>
                </div>
              )}

              {formData.nationality && (
                <div>
                  <p className="text-[11px] font-bold text-gray-900">Nationality</p>
                  <p className="text-[11px] text-gray-600">{formData.nationality}</p>
                </div>
              )}

              {formData.driving_licence && (
                <div>
                  <p className="text-[11px] font-bold text-gray-900">Driving license</p>
                  <p className="text-[11px] text-gray-600">{formData.driving_licence}</p>
                </div>
              )}
            </section>
          )}

          {/* LANGUAGES */}
          {hasLanguages && (
            <div className="mb-8 mt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">Languages</h3>
              <div className="flex flex-col gap-2">
                {formData.languageHistory.map((lang, idx) => (
                  <div key={idx} className="text-xs">
                    <span className="block text-gray-800 font-medium">{lang.language}</span>
                    <span className="block text-gray-500 text-[10px]">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS (If space allows, or if they fit better here than main content) */}
         
          
             {/* HOBBIES */}
            {formData.hobbies && (
                <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">Hobbies</h3>
                <p className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                    {formData.hobbies}
                </p>
                </div>
            )}

        </div>

        {/* ================= RIGHT CONTENT (75%) ================= */}
        <div className="w-[75%] p-8 pr-10 pt-10 flex flex-col gap-8">
          
          {/* PROFILE */}
          {formData.summary && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Profile</h2>
              <p className="text-xs leading-relaxed text-gray-700 text-justify whitespace-pre-wrap">
                {formData.summary}
              </p>
            </section>
          )}

          {/* EDUCATION */}
          {hasEducation && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">Education</h2>
              <div className="flex flex-col gap-6">
                {formData.educationHistory.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs font-bold text-gray-900 uppercase">
                      {edu.degree}{edu.school ? `, ${edu.school}` : ''}
                    </h3>
                    <div className="text-xs text-gray-500 mb-1 mt-0.5">
                       {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </div>
                    {edu.description && (
                      <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* EXPERIENCE */}
          {hasEmployment && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">Experience</h2>
              <div className="flex flex-col gap-6">
                {formData.employmentHistory.map((job, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs font-bold text-gray-900">
                      {job.job_title}{job.employer ? `, ${job.employer}` : ''}{job.city_state ? `, ${job.city_state}` : ''}
                    </h3>
                    <div className="text-xs text-gray-500 mb-2 mt-0.5">
                       {formatDate(job.startDate)} — {formatDate(job.endDate)}
                    </div>
                    {job.description && (
                      <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {job.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

           {hasSkills && (
            <div className="mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-1">Skills</h3>
              <div className="flex flex-col gap-2">
                 {formData.newSkillHistory.map((skill, idx) => (
                    <>
                    <span key={idx} className="text-xs text-gray-700 block">
                      {skill.skill}
                    </span>
                         {!formData.hideExperienceLevel && (
                        <span className="text-[10px] text-gray-400 uppercase">
                            {[ "Novice","Beginner", "Skillful", "Experienced", "Expert"][(skill.level || 0)]}
                        </span>
                    )}
                    </>
                 ))}
              </div>
            </div>
          )}

           {/* INTERNSHIPS */}
           {hasInternships && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">Internships</h2>
              <div className="flex flex-col gap-6">
                {formData.internshipHistory.map((job, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs font-bold text-gray-900">
                      {job.jobTitle}{job.employer ? `, ${job.employer}` : ''}{job.city ? `, ${job.city}` : ''}
                    </h3>
                    <div className="text-xs text-gray-500 mb-2 mt-0.5">
                       {getYear(job.startDate)} — {getYear(job.endDate)}
                    </div>
                    {job.description && (
                      <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {job.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ACTIVITIES */}
          {hasActivities && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">Activities</h2>
              <div className="flex flex-col gap-5">
                {formData.activityHistory.map((act, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs font-bold text-gray-900">
                        {act.functionTitle} {act.employer ? `- ${act.employer}` : ""}
                    </h3>
                    <div className="text-xs text-gray-500 mb-1 mt-0.5">
                        {formatDate(act.startDate)} — {formatDate(act.endDate)}
                    </div>
                    {act.description && (
                       <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                         {act.description}
                       </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

           {/* COURSES */}
           {hasCourses && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">Courses</h2>
              <div className="flex flex-col gap-4">
                {formData.coursesHistory.map((course, idx) => (
                  <div key={idx}>
                     <h3 className="text-xs font-bold text-gray-900">
                        {course.course} {course.institution ? `- ${course.institution}` : ""}
                    </h3>
                    <div className="text-xs text-gray-500 mt-0.5">
                         {formatDate(course.startDate)} — {formatDate(course.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CUSTOM SECTION */}
          {hasCustom && (
              <section>
              <h2 className="text-lg font-bold text-gray-900 uppercase mb-4">
                  {formData.customSectionTitle || "Custom Section"}
              </h2>
              <div className="flex flex-col gap-4">
                {formData.customSectionHistory.map((item, idx) => (
                   <div key={idx}>
                    <h3 className="text-xs font-bold text-gray-900">
                        {item.activity} {item.city ? `, ${item.city}` : ""}
                    </h3>
                     <div className="text-xs text-gray-500 mb-1 mt-0.5">
                      {formatDate(item.startDate)} — {formatDate(item.endDate)}
                   </div>
                   {item.description && (
                     <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
                       {item.description}
                     </p>
                   )}
                 </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default ClearTemplate;