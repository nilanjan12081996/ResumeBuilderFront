import React from 'react';


const DynamicTemplate = ({ levels, sections, data }) => {
  // 1. Helper: Render content based on section type
  const renderDynamicSection = (section) => {
    console.log(section,"section");
    
    switch (section.type) {
      case 'summary':
        // Only render if user has typed a goal
        if (!data?.goal || data.goal.trim() === "") return null;
        return (
          <section key={section.id} className="mb-6">
            <h2 className="text-lg font-bold text-blue-700 mb-1 uppercase tracking-tight">
              {section.title}
            </h2>
            <div className="border-b-2 border-blue-700 mb-2"></div>
            <p className="text-sm text-gray-800 leading-relaxed break-words whitespace-pre-line">
              {data.goal}
            </p>
          </section>
        );

      case 'skills':
        // Only render if skills array exists and has at least one skill name
        const hasSkills = section.skills?.some(sk => sk.name && sk.name.trim() !== "");
        if (!hasSkills) return null;

        return (
          <section key={section.id} className="mb-6">
            <h2 className="text-lg font-bold text-blue-700 mb-1 uppercase tracking-tight">
              {section.title}
            </h2>
            <div className="border-b-2 border-blue-700 mb-2"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
              {section.skills.map((sk) => {
                // Only show individual skill if it has a name
                if (!sk.name) return null;
                return (
                  <div key={sk.id} className="flex justify-between items-center text-sm border-b border-gray-100 py-1">
                    <span className="font-semibold text-gray-900">{sk.name}</span>
                    <span className="text-blue-600 font-medium italic">
                      {levels[sk.level] || "Level"}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  // 2. LIVE CHECK: Show header if ANY field has value
  const hasAnyHeaderData = [
    data?.first_name, 
    data?.last_name, 
    data?.job_target, 
    data?.email_add, 
    data?.phone_no,
    data?.city_state,
    data?.linkedin
  ].some(val => val && val.trim() !== "");

  const hasAnyBodyData = sections.some(s => 
    (s.type === 'summary' && data?.goal?.trim()) || 
    (s.type === 'skills' && s.skills?.some(sk => sk.name?.trim()))
  );

  // If everything is empty, show the "Blank" state
  if (!hasAnyHeaderData && !hasAnyBodyData) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-xl p-8 min-h-[297mm] flex items-center justify-center border-2 border-dashed border-gray-200">
        <div className="text-center">
          <p className="text-gray-300 text-2xl font-light uppercase tracking-widest">Resume Preview</p>
          <p className="text-gray-400 text-sm mt-2">Information will appear here as you type</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl p-10 min-h-[297mm] text-black">
      
      {/* STATIC SECTION: Personal Details - Shows if ANY header field is filled */}
      {hasAnyHeaderData && (
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2f6aeb] uppercase tracking-tighter">
            {data?.first_name || ""} {data?.last_name || ""}
          </h1>
          
          {data?.job_target && (
            <p className="text-md font-bold text-gray-700 mt-1 uppercase tracking-[0.2em]">
              {data.job_target}
            </p>
          )}
          
          <div className="text-xs text-gray-600 mt-4 leading-relaxed font-medium">
            <p className="flex justify-center gap-2 flex-wrap">
              {[data?.email_add, data?.phone_no, data?.city_state, data?.country]
                .filter(Boolean)
                .join('  •  ')}
            </p>
            {data?.linkedin && (
              <p className="text-blue-600 mt-1 hover:underline cursor-pointer">{data.linkedin}</p>
            )}
          </div>
        </header>
      )}

      {/* DYNAMIC SECTIONS: Summary and Skills based on Accordion Order */}
      <div className="mt-2">
        {sections.map((section) => renderDynamicSection(section))}
      </div>

    </div>
  );
};

export default DynamicTemplate;