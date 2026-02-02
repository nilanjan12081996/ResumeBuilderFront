import React from 'react';
import { BiCustomize, BiBriefcase, BiAward } from "react-icons/bi";
import { MdLocalFlorist, MdVolunteerActivism, MdCardMembership } from "react-icons/md";
import { FaChessKnight, FaLanguage, FaCertificate } from "react-icons/fa6";
import { HiSpeakerphone, HiAcademicCap } from "react-icons/hi";
import { RiSecurePaymentFill } from "react-icons/ri"; // Using as lock icon proxy if needed, or just FaLock

const AddSection = ({ onSelectSection }) => {
  const sections = [
    { id: 'custom', label: 'Custom Section', icon: <BiCustomize />, isCustom: true },
    { id: 'extra_curricular', label: 'Extra-curricular Activities', icon: <MdLocalFlorist  />, isCustom: false },
    { id: 'courses', label: 'Courses', icon: <HiAcademicCap />, isCustom: false },
    { id: 'internships', label: 'Internships', icon: <BiBriefcase />, isCustom: false },
    { id: 'hobbies', label: 'Hobbies', icon: <FaChessKnight />, isCustom: false },
    { id: 'languages', label: 'Languages', icon: <FaLanguage />, isCustom: false },
    { id: 'references', label: 'References', icon: <HiSpeakerphone />, isCustom: false },
    
    // Using simple icons for others
    { id: 'conferences', label: 'Conferences', icon: <HiSpeakerphone />, isLocked: true },
    { id: 'volunteering', label: 'Volunteering', icon: <MdVolunteerActivism />, isLocked: true },
    { id: 'awards', label: 'Awards', icon: <BiAward />, isLocked: true },
    { id: 'affiliations', label: 'Affiliations', icon: <MdCardMembership />, isLocked: true },
    { id: 'licenses', label: 'Licenses & Certifications', icon: <FaCertificate />, isLocked: true },
  ];

  return (
    <div className=''>
         <div className='mb-6'>
            <h2 className='text-xl font-bold text-black pb-1'>Add Additional Sections</h2>
            <p className='text-sm text-[#808897] font-medium'>
                Here's a description that you can add or skip without it
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => (
                <button
                    type="button"
                    key={section.id}
                    onClick={() => !section.isLocked && onSelectSection && onSelectSection(section.id)}
                    disabled={section.isLocked}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all text-left group
                        ${section.isLocked 
                            ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-60' 
                            : 'bg-white border-gray-200 hover:border-[#800080] hover:shadow-md cursor-pointer'
                        }`}
                >
                    <div className={`text-2xl ${section.id === 'custom' ? 'text-[#800080]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                        {section.icon}
                    </div>
                    <div className="flex-1">
                        <span className={`font-medium block ${section.id === 'custom' ? 'text-[#800080]' : 'text-gray-700'}`}>
                            {section.label}
                        </span>
                    </div>
                    {section.isLocked && (
                         <div className="text-gray-300">
                            {/* Simple Lock Icon */}
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
                         </div>
                    )}
                </button>
            ))}
        </div>
    </div>
  );
};

export default AddSection;
