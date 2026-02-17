import React, { useState } from "react";
import { BiCustomize, BiBriefcase } from "react-icons/bi";
import { BiAward } from "react-icons/bi";
import { FaLanguage, FaCertificate, FaPlus, FaList } from "react-icons/fa6";
import { FaTimes, FaCheck } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";

const LinkedInAddSectionButton = ({ onAddNewSection, sections = [] }) => {
    const [showSectionList, setShowSectionList] = useState(false);

    const sectionTemplates = [
        {
            id: 'custom_simple',
            label: 'Custom Section (Simple)',
            icon: <FaList />,
            isCustom: true,
            description: 'For lists like technologies, tools, skills',
        },
        {
            id: 'custom_advanced',
            label: 'Custom Section (Advanced)',
            icon: <BiCustomize />,
            isCustom: true,
            description: 'Full details with dates and descriptions',
        },
        { id: 'summary',     label: 'Profile Summary', icon: <HiAcademicCap />,  isCustom: false },
        { id: 'experience',  label: 'Experience',      icon: <BiBriefcase />,     isCustom: false },
        { id: 'education',   label: 'Education',       icon: <HiAcademicCap />,   isCustom: false },
        { id: 'skills',      label: 'Skills',          icon: <FaList />,          isCustom: false },
        { id: 'languages',   label: 'Languages',       icon: <FaLanguage />,      isCustom: false },
        { id: 'courses',     label: 'Courses',         icon: <HiAcademicCap />,   isCustom: false },
        { id: 'honors',      label: 'Honors & Awards', icon: <BiAward />,         isCustom: false },
    ];

    const handleSelectSection = (sectionId, isAlreadyAdded) => {
        if (isAlreadyAdded || !onAddNewSection) return;

        // ── Custom Simple ──────────────────────────────────────────
        if (sectionId === 'custom_simple') {
            const BASE = 'Custom Section (Simple)';
            const existingTitles = sections.filter(s => s.type === 'custom_simple').map(s => s.title);
            let uniqueTitle = BASE;
            let counter = 1;
            while (existingTitles.includes(uniqueTitle)) {
                uniqueTitle = `${BASE} ${counter}`;
                counter++;
            }
            onAddNewSection({
                type: 'custom_simple',
                title: uniqueTitle,
                items: [{ id: `simple_${Date.now()}`, name: '', level: 2 }],
                hideExperienceLevel: true,
            });
        }

        // ── Custom Advanced ────────────────────────────────────────
        else if (sectionId === 'custom_advanced') {
            const BASE = 'Custom Section (Advanced)';
            const existingTitles = sections.filter(s => s.type === 'custom').map(s => s.title);
            let uniqueTitle = BASE;
            let counter = 1;
            while (existingTitles.includes(uniqueTitle)) {
                uniqueTitle = `${BASE} ${counter}`;
                counter++;
            }
            onAddNewSection({
                type: 'custom',
                title: uniqueTitle,
                items: [{
                    id: `custom_${Date.now()}`,
                    title: '', city: '', startDate: '', endDate: '', description: '',
                }],
            });
        }

        // ── Profile Summary ────────────────────────────────────────
        else if (sectionId === 'summary') {
            onAddNewSection({ type: 'summary', title: 'Profile Summary', summary: '' });
        }

        // ── Experience ─────────────────────────────────────────────
        else if (sectionId === 'experience') {
            onAddNewSection({
                type: 'experience',
                title: 'Experience',
                experiences: [{
                    id: `exp_${Date.now()}`,
                    jobTitle: '', company: '', city: '',
                    startDate: '', endDate: '', description: '',
                }],
            });
        }

        // ── Education ──────────────────────────────────────────────
        else if (sectionId === 'education') {
            onAddNewSection({
                type: 'education',
                title: 'Education',
                educations: [{
                    id: `edu_${Date.now()}`,
                    institute: '', degree: '', startDate: '',
                    endDate: '', city: '', description: '',
                }],
            });
        }

        // ── Skills ─────────────────────────────────────────────────
        else if (sectionId === 'skills') {
            onAddNewSection({
                type: 'skills',
                title: 'Skills',
                skills: [{ id: `skill_${Date.now()}`, name: '', level: 2 }],
                hideExperienceLevel: false,
            });
        }

        // ── Languages ──────────────────────────────────────────────
        else if (sectionId === 'languages') {
            onAddNewSection({
                type: 'languages',
                title: 'Languages',
                languages: [{ id: `lang_${Date.now()}`, language: '', level: 'Intermediate' }],
                hideProficiency: false,
            });
        }

        // ── Courses ────────────────────────────────────────────────
        else if (sectionId === 'courses') {
            onAddNewSection({
                type: 'courses',
                title: 'Courses',
                courses: [{
                    id: `course_${Date.now()}`,
                    course: '', institution: '', startDate: '', endDate: '',
                }],
            });
        }

        // ── Honors & Awards ────────────────────────────────────────
        else if (sectionId === 'honors') {
            onAddNewSection({
                type: 'honors',
                title: 'Honors & Awards',
                items: [{
                    id: `honor_${Date.now()}`,
                    title: '', issuer: '', date: '', description: '',
                }],
            });
        }

        setShowSectionList(false);
    };

    return (
        <div className="mb-4">
            {!showSectionList ? (
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
                            // custom_simple & custom_advanced can be added multiple times
                            const isAlreadyAdded =
                                section.id === 'custom_simple'   ? false :
                                section.id === 'custom_advanced'  ? false :
                                section.id === 'honors'
                                    ? sections.some(s => s.type === 'honors')
                                    : sections.some(s => s.type === section.id);

                            const isDisabled = isAlreadyAdded;

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
                                        {isAlreadyAdded && (
                                            <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                                <FaCheck className="text-xs" /> Already added
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkedInAddSectionButton;