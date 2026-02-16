import React, { useState } from "react";
import { BiCustomize, BiBriefcase, BiAward } from "react-icons/bi";
import { MdLocalFlorist, MdVolunteerActivism, MdCardMembership } from "react-icons/md";
import { FaChessKnight, FaLanguage, FaCertificate, FaPlus, FaList } from "react-icons/fa6";
import { FaTimes, FaCheck } from "react-icons/fa";
import { HiSpeakerphone, HiAcademicCap } from "react-icons/hi";

const AddSectionButton = ({ onAddNewSection, sections = [] }) => {
    const [showSectionList, setShowSectionList] = useState(false);

    const sectionTemplates = [
        { 
            id: 'custom_simple', 
            label: 'Custom Section (Simple)', 
            icon: <FaList />, 
            isCustom: true,
            description: 'For lists like technologies, tools, skill'
        },
        { 
            id: 'custom_advanced', 
            label: 'Custom Section (Advanced)', 
            icon: <BiCustomize />, 
            isCustom: true,
            description: 'Full details with dates and descriptions'
        },
        { id: 'summary', label: 'Professional Summary', icon: <HiAcademicCap />, isCustom: false },
        { id: 'skills', label: 'Skills', icon: <FaLanguage />, isCustom: false },
        { id: 'education', label: 'Education', icon: <HiAcademicCap />, isCustom: false },
        { id: 'experience', label: 'Experience', icon: <BiBriefcase />, isCustom: false },
        { id: 'certifications', label: 'Certifications', icon: <FaCertificate />, isCustom: false },
        { id: 'courses', label: 'Courses', icon: <HiAcademicCap />, isCustom: false },
        { id: 'hobbies', label: 'Hobbies', icon: <FaChessKnight />, isCustom: false },
        { id: 'languages', label: 'Languages', icon: <FaLanguage />, isCustom: false },
        { id: 'internships', label: 'Internships', icon: <BiBriefcase />, isCustom: false },
        { id: 'extra_curricular', label: 'Extra-curricular Activities', icon: <MdLocalFlorist />, isCustom: false },
        { id: 'references', label: 'References', icon: <HiSpeakerphone />, isLocked: true },
        { id: 'conferences', label: 'Conferences', icon: <HiSpeakerphone />, isLocked: true },
        { id: 'volunteering', label: 'Volunteering', icon: <MdVolunteerActivism />, isLocked: true },
        { id: 'awards', label: 'Awards', icon: <BiAward />, isLocked: true },
        { id: 'affiliations', label: 'Affiliations', icon: <MdCardMembership />, isLocked: true },
        { id: 'licenses', label: 'Licenses & Certifications', icon: <FaCertificate />, isLocked: true },
    ];

    const handleSelectSection = (sectionId, isAlreadyAdded) => {
        // Don't do anything if section is already added or locked
        if (isAlreadyAdded) return;

        const selectedTemplate = sectionTemplates.find(s => s.id === sectionId);
        if (selectedTemplate && !selectedTemplate.isLocked) {
            if (onAddNewSection) {
                // ✅ Custom Simple Section
                if (sectionId === 'custom_simple') {
                    onAddNewSection({
                        type: 'custom_simple',
                        title: 'Custom Section (Simple)',
                        items: [
                            {
                                id: `simple_${Date.now()}`,
                                name: '',
                                level: 2
                            }
                        ],
                        hideExperienceLevel: true
                    });
                } 
                // ✅ Custom Advanced Section
                else if (sectionId === 'custom_advanced') {
                    onAddNewSection({
                        type: 'custom',
                        title: 'Custom Section (Advanced)',
                        items: [{
                            id: `custom_${Date.now()}`,
                            title: "",
                            city: "",
                            startDate: "",
                            endDate: "",
                            description: "",
                        }]
                    });
                }
                // ✅ Summary Section
                else if (sectionId === 'summary') {
                    onAddNewSection({
                        type: 'summary',
                        title: 'Professional Summary',
                        summary: ''
                    });
                }
                // ✅ Skills Section
                else if (sectionId === 'skills') {
                    onAddNewSection({
                        type: 'skills',
                        title: 'Skills',
                        skills: [{
                            id: `skill_${Date.now()}`,
                            name: '',
                            level: 2
                        }],
                        hideExperienceLevel: false
                    });
                }
                // ✅ Education Section
                else if (sectionId === 'education') {
                    onAddNewSection({
                        type: 'education',
                        title: 'Education',
                        educations: [{
                            id: `edu_${Date.now()}`,
                            institute: '',
                            degree: '',
                            startDate: '',
                            endDate: '',
                            city: '',
                            description: ''
                        }]
                    });
                }
                // ✅ Experience Section
                else if (sectionId === 'experience') {
                    onAddNewSection({
                        type: 'experience',
                        title: 'Experience',
                        experiences: [{
                            id: `exp_${Date.now()}`,
                            jobTitle: '',
                            company: '',
                            city: '',
                            startDate: '',
                            endDate: '',
                            description: ''
                        }]
                    });
                }
                // ✅ Certifications Section
                else if (sectionId === 'certifications') {
                    onAddNewSection({
                        type: 'certifications',
                        title: 'Certifications',
                        certifications: [{
                            id: `cert_${Date.now()}`,
                            name: '',
                            organization: '',
                            city: '',
                            startYear: '',
                            endYear: '',
                            description: ''
                        }]
                    });
                }
                // ✅ Other sections use custom advanced format
                else {
                    onAddNewSection({
                        type: 'custom',
                        title: selectedTemplate.label,
                        items: [{
                            id: `custom_${Date.now()}`,
                            title: "",
                            city: "",
                            startDate: "",
                            endDate: "",
                            description: "",
                        }]
                    });
                }
            }
            setShowSectionList(false);
        }
    };

    return (
        <div className="mb-4">
            {!showSectionList ? (
                // Add Section Button
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <button
                        type="button"
                        onClick={() => setShowSectionList(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[#800080] border-2 border-dashed border-[#800080] rounded-lg hover:bg-[#f6efff] transition-all cursor-pointer"
                    >
                        <FaPlus className="text-lg" />
                        <span className="font-medium">Add New Section</span>
                    </button>
                </div>
            ) : (
                // Section Selection View
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-black pb-1">Add Additional Sections</h2>
                            <p className="text-sm text-[#808897] font-medium">
                                Choose from predefined sections or create a custom one
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowSectionList(false)}
                            className="text-gray-400 hover:text-gray-600 p-2"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sectionTemplates.map((section) => {
                            // ✅ Check if section is already added
                            const isAlreadyAdded = 
                                section.id === 'custom_simple' ? false :  // ✅ Allow multiple simple custom sections
                                section.id === 'custom_advanced' ? false :  // ✅ Allow multiple advanced custom sections
                                sections.some(s => s.type === section.id);
                            
                            const isDisabled = section.isLocked || isAlreadyAdded;

                            return (
                                <button
                                    type="button"
                                    key={section.id}
                                    onClick={() => handleSelectSection(section.id, isAlreadyAdded)}
                                    disabled={isDisabled}
                                    className={`flex items-start gap-3 p-4 rounded-lg border transition-all text-left group relative
                                        ${isDisabled
                                            ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-60'
                                            : 'bg-white border-gray-200 hover:border-[#800080] hover:shadow-md cursor-pointer'
                                        }`}
                                >
                                    <div className={`text-2xl ${
                                        section.isCustom && !isAlreadyAdded 
                                            ? 'text-[#800080]' 
                                            : 'text-gray-400 group-hover:text-gray-600'
                                    }`}>
                                        {section.icon}
                                    </div>
                                    <div className="flex-1">
                                        <span className={`font-medium block ${
                                            section.isCustom && !isAlreadyAdded 
                                                ? 'text-[#800080]' 
                                                : 'text-gray-700'
                                        }`}>
                                            {section.label}
                                        </span>
                                        {section.description && (
                                            <span className="text-xs text-gray-500 block mt-1">
                                                {section.description}
                                            </span>
                                        )}
                                        {isAlreadyAdded && !section.isLocked && (
                                            <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                                <FaCheck className="text-xs" />
                                                Already added
                                            </span>
                                        )}
                                    </div>
                                    {section.isLocked && (
                                        <div className="text-gray-300">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddSectionButton;