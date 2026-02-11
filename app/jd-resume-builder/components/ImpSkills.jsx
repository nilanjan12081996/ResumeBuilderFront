import React, { useState, useEffect } from "react";
import { Label } from "flowbite-react";
import { TbDragDrop } from "react-icons/tb";
import { Tab, Tabs, TabList } from "react-tabs";
import { FaPen, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import 'react-tabs/style/react-tabs.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchMissingSkills } from "../../reducers/DashboardSlice";

const ImpSkills = ({ section, sectionIndex, handleSkillUpdate, handleSkillDragStart, handleSkillDrop, draggedSkillIndex, setDraggedSkillIndex }) => {
    const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
    const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
    const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];
    const dispatch = useDispatch();

    const currentSkillsString = section.skills.map(s => s.name).join(", ");
    useEffect(() => {
        const targetJd = sessionStorage.getItem("target_jd");
        const securityId = process.env.NEXT_PUBLIC_AI_SECURITY_ID;
        const payload = {
            security_id: securityId,
            Skill: currentSkillsString,
            JD: targetJd || ""
        };
        if (securityId) {
            dispatch(fetchMissingSkills(payload));
        }
    }, []);

    const { missingSkillsData } = useSelector((state) => state?.dash);

    const [localMissingSkills, setLocalMissingSkills] = useState([]);

    useEffect(() => {
        if (missingSkillsData?.payload?.missing_skills) {
            setLocalMissingSkills(missingSkillsData.payload.missing_skills);
        }
    }, [missingSkillsData]);

    const [editingSkillIndex, setEditingSkillIndex] = useState(null);
    const [deletingSkillIndex, setDeletingSkillIndex] = useState(null);
    const hideExperienceLevel = section.hideExperienceLevel || false;

    const removeMissingSkill = (skillName) => {
        setLocalMissingSkills(prev => prev.filter(s => s !== skillName));
    };


  const addSkill = (skillName = "") => {
    const newSkill = {
        id: `ts_${Math.random().toString(36).substr(2, 9)}`,
        name: skillName,
        level: 2 // Default to Skillful
    };
    
    handleSkillUpdate(sectionIndex, null, "add", newSkill);

    if (skillName) {
        removeMissingSkill(skillName);
    } else {
        // If manually added (empty name), set the last item to editing mode
        // We use the current length because the new skill will be at that index
        setEditingSkillIndex(section.skills.length);
    }
};

    const applyAllSkills = () => {
        localMissingSkills.forEach((skillName, index) => {
            const newSkill = {
                id: `ts_${Date.now() + index}`,
                name: skillName,
                level: 2
            };
            handleSkillUpdate(sectionIndex, null, "add", newSkill);
        });
        setLocalMissingSkills([]);
    };

    const handleDelete = (sIndex, skillId) => {
        setDeletingSkillIndex(sIndex);

        setTimeout(() => {
            handleSkillUpdate(sectionIndex, skillId, "delete");
            setDeletingSkillIndex(null);
        }, 500);
    };

    return (
        <>
            <div>
                <p className="!text-sm !font-medium !text-gray-500">
                    Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing.
                </p>
                {localMissingSkills.length > 0 && (
                    <div className="mt-4 mb-6 p-4 border border-dashed border-purple-300 rounded-lg bg-purple-50/30">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-[#800080]">Missing Skills for this Job:</span>
                            <button
                                onClick={applyAllSkills}
                                className="text-xs font-bold !text-white !bg-[#800080] px-3 py-1 rounded-md hover:!bg-[#f9c3f9] transition"
                            >
                                + Apply All
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {localMissingSkills.map((mSkill, idx) => (
                                <div
                                    key={idx}
                                    className="group flex items-center gap-1 bg-white border border-gray-200 pl-3 pr-1 py-1 rounded-full cursor-pointer hover:border-purple-400 hover:shadow-sm transition-all"
                                    onClick={() => addSkill(mSkill)}
                                >
                                    <span className="text-xs font-medium text-gray-700">{mSkill}</span>
                                    <div
                                        className="p-1 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Parent এর addSkill কল হওয়া আটকাবে
                                            removeMissingSkill(mSkill);
                                        }}
                                    >
                                        <FaTimes size={10} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* --- Missing Skills UI Section End --- */}

                <div className="flex items-center gap-2 my-1">
                    <input
                        id="hideLevelToggleImp"
                        type="checkbox"
                        className="!w-4 !h-4 text-[#800080] bg-gray-100 border-gray-300 rounded focus:ring-[#800080]"
                        checked={hideExperienceLevel}
                        onChange={(e) => handleSkillUpdate(sectionIndex, null, "hideExperienceLevel", e.target.checked)}
                    />
                    <label htmlFor="hideLevelToggleImp" className="text-sm font-medium text-gray-500 cursor-pointer">
                        Don't show experience level
                    </label>
                </div>
            </div>

            {section.skills.map((skill, sIndex) => {
                const isEditing = editingSkillIndex === sIndex;
                return (
                    <div
                        key={skill.id}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => handleSkillDrop(e, sectionIndex, sIndex)}
                        className={`
                            group flex items-center justify-between gap-4 mb-2 p-2 !border-b !border-gray-300
                            transition-all duration-300 ease-in-out
                            ${draggedSkillIndex === sIndex ? "opacity-20 scale-95" : ""}
                            ${deletingSkillIndex === sIndex ? "-translate-x-6 opacity-0" : ""}
                        `}
                    >
                        {/* Drag Handle */}
                        <span
                            className="cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleSkillDragStart(e, sIndex)}
                            onDragEnd={() => setDraggedSkillIndex(null)}
                        >
                            <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                        </span>

                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={skill.name}
                                    onChange={(e) => handleSkillUpdate(sectionIndex, skill.id, 'name', e.target.value)}
                                    onBlur={() => {
                                        setEditingSkillIndex(null);
                                        if (!skill.name.trim()) handleDelete(sIndex, skill.id);
                                    }}
                                    autoFocus
                                    className="w-full text-sm font-medium !border-b outline-none bg-transparent px-1"
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{skill.name || "Your Skill"}</span>
                                    <div className="flex items-center gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                                        <FaPen className="text-sm text-gray-400 cursor-pointer hover:text-purple-600" onClick={() => setEditingSkillIndex(sIndex)} />
                                        <FaTrash className="text-sm text-gray-400 cursor-pointer hover:text-red-500" onClick={(e) => { e.stopPropagation(); handleDelete(sIndex, skill.id); }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {!hideExperienceLevel && (
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-xs font-medium text-gray-600">{levels[skill.level]}</span>
                                <Tabs selectedIndex={skill.level} onSelect={(tabIndex) => handleSkillUpdate(sectionIndex, skill.id, 'level', tabIndex)}>
                                    <TabList className="flex gap-1">
                                        {levels.map((lvl, i) => (
                                            <Tab key={i} className="outline-none">
                                                <div
                                                    className={`w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${skill.level === i ? "scale-110 border border-[#800080] shadow-md" : "opacity-60 hover:opacity-100"}`}
                                                    style={{ backgroundColor: tabColors[i], color: textColor[i] }}
                                                    title={lvl}
                                                >
                                                    {i + 1}
                                                </div>
                                            </Tab>
                                        ))}
                                    </TabList>
                                </Tabs>
                            </div>
                        )}
                    </div>
                );
            })}
            <button
                type="button"
                onClick={() => addSkill("")}
                className="flex items-center gap-2 !text-sm !text-[#800080] font-medium mt-4 hover:underline"
            >
                <FaPlus size={12} /> Add one more skill
            </button>
        </>
    );
};

export default ImpSkills;