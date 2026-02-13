import React, { useState } from "react";
import { BiCustomize, BiBriefcase, BiAward } from "react-icons/bi";
import { MdLocalFlorist, MdVolunteerActivism, MdCardMembership } from "react-icons/md";
import { FaChessKnight, FaLanguage, FaCertificate, FaPlus, FaList } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { HiSpeakerphone, HiAcademicCap } from "react-icons/hi";

const AddSectionButton = ({ onAddNewSection }) => {
    const [showSectionList, setShowSectionList] = useState(false);

    const sectionTemplates = [
        { 
            id: 'custom_simple', 
            label: 'Custom Section (Simple)', 
            icon: <FaList />, 
            isCustom: true,
            description: 'For lists like technologies, tools, competencies'
        },
        { 
            id: 'custom_advanced', 
            label: 'Custom Section (Advanced)', 
            icon: <BiCustomize />, 
            isCustom: true,
            description: 'Full details with dates and descriptions'
        },
        { id: 'courses', label: 'Courses', icon: <HiAcademicCap />, isCustom: false },
        { id: 'hobbies', label: 'Hobbies', icon: <FaChessKnight />, isCustom: false },
        { id: 'languages', label: 'Languages', icon: <FaLanguage />, isCustom: false },
        { id: 'awards', label: 'Awards', icon: <BiAward />, isLocked: true },
        { id: 'internships', label: 'Internships', icon: <BiBriefcase />, isCustom: false },
        { id: 'extra_curricular', label: 'Extra-curricular Activities', icon: <MdLocalFlorist />, isCustom: false },
        { id: 'references', label: 'References', icon: <HiSpeakerphone />, isCustom: false },
        { id: 'conferences', label: 'Conferences', icon: <HiSpeakerphone />, isLocked: true },
        { id: 'volunteering', label: 'Volunteering', icon: <MdVolunteerActivism />, isLocked: true },
        { id: 'affiliations', label: 'Affiliations', icon: <MdCardMembership />, isLocked: true },
        { id: 'licenses', label: 'Licenses & Certifications', icon: <FaCertificate />, isLocked: true },
    ];

    const handleSelectSection = (sectionId) => {
        const selectedTemplate = sectionTemplates.find(s => s.id === sectionId);
        if (selectedTemplate && !selectedTemplate.isLocked) {
            if (onAddNewSection) {
                // Simple custom section - just name and level
                if (sectionId === 'custom_simple') {
                    onAddNewSection({
                        type: 'custom_simple',
                        title: 'New Section',
                        items: [
                            {
                                id: `simple_${Date.now()}`,
                                name: '',
                                level: 2 // Default: Skillful level
                            }
                        ],
                        hideExperienceLevel: false
                    });
                } 
                // Advanced custom section - full fields
                else if (sectionId === 'custom_advanced') {
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
                // Predefined sections - use advanced format
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
                        {sectionTemplates.map((section) => (
                            <button
                                type="button"
                                key={section.id}
                                onClick={() => handleSelectSection(section.id)}
                                disabled={section.isLocked}
                                className={`flex items-center gap-3 p-4 rounded-lg border transition-all text-left group
                                    ${section.isLocked
                                        ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-60'
                                        : 'bg-white border-gray-200 hover:border-[#800080] hover:shadow-md cursor-pointer'
                                    }`}
                            >
                                <div className={`text-2xl ${section.isCustom ? 'text-[#800080]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                    {section.icon}
                                </div>
                                <div className="flex-1">
                                    <span className={`font-medium block ${section.isCustom ? 'text-[#800080]' : 'text-gray-700'}`}>
                                        {section.label}
                                    </span>
                                    {section.description && (
                                        <span className="text-xs text-gray-500 block mt-1">
                                            {section.description}
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
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddSectionButton;