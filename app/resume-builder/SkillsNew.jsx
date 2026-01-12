'use client';
// import React from 'react';
// import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Label } from "flowbite-react";
// import { Tabs, TabList, Tab } from "react-tabs";
// import { MdDelete } from "react-icons/md";
// import { RiDraggable } from "react-icons/ri";
// import { FaPlus } from "react-icons/fa6";
// import { TfiHandDrag } from "react-icons/tfi";

// const SkillsNew = ({ register, newskill, setNewSkill, watch, setValue }) => {
    
//     // UI Configuration Constants
//     const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
//     const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];
//     const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

//     const addMore = () => {
//         // Initializing with level 3 (Experienced) as per your screenshot style
//         setNewSkill([...newskill, { id: Date.now(), level: 3 }]);
//     };

//     const deleteSkill = (index) => {
//         if (newskill.length > 1) {
//             const list = [...newskill];
//             list.splice(index, 1);
//             setNewSkill(list);
//         }
//     };

//     const handleLevelUpdate = (index, tabIndex) => {
//         // 1. Update the local state for UI rendering
//         const list = [...newskill];
//         list[index].level = tabIndex;
//         setNewSkill(list);

//         // 2. Update React Hook Form state
//         setValue(`newSkillHistory.${index}.level`, tabIndex);
//     };

//     return (
//         <>
//             <div className='mb-4'>
//                 <h2 className='text-xl font-bold text-black pb-1'>Skills</h2>
//                 <p className='text-sm text-[#808897] font-medium'>
//                     Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing.
//                 </p>
//             </div>

//             <div className='acco_section'>
//                 <Accordion alwaysOpen>
//                     {newskill.map((item, index) => {
//                         // Watch the skill name for the Accordion Title
//                         const watchedSkill = watch(`newSkillHistory.${index}.skill`);
//                         const currentLevel = item.level !== undefined ? item.level : 3;

//                         return (
//                             <AccordionPanel key={item.id}>
//                                 <div className='flex items-start gap-2 mb-4'>
//                                     {/* Drag Handle Icon */}
//                                     <div className='drag_point mt-3'>
//                                         <button type="button">
//                                             <TfiHandDrag className='text-xl text-gray-400' />
//                                         </button>
//                                     </div>

//                                     <div className='w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm'>
//                                         <AccordionTitle className='bg-white hover:bg-gray-50 text-lg font-bold py-3'>
//                                             {watchedSkill || "(Not specified)"}
//                                         </AccordionTitle>
                                        
//                                         <AccordionContent className="bg-white border-t border-gray-100">
//                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2">
                                                
//                                                 {/* Skill Input Area */}
//                                                 <div className='flex flex-col'>
//                                                     <Label className="!text-gray-400 mb-1">Skill</Label>
//                                                     <input
//                                                         type="text"
//                                                         placeholder="e.g. Java"
//                                                         className="w-full rounded-lg border border-gray-300 bg-[#f0f4f9] p-2.5 text-sm outline-none focus:border-blue-500"
//                                                         {...register(`newSkillHistory.${index}.skill`)}
//                                                     />
//                                                 </div>

//                                                 {/* Level Selection Area */}
//                                                 <div className='flex flex-col'>
//                                                     <Label className="!text-gray-400 text-sm mb-1">
//                                                         Level — <span className="font-bold" style={{ color: textColor[currentLevel] }}>
//                                                             {levels[currentLevel]}
//                                                         </span>
//                                                     </Label>
                                                    
//                                                     {/* The Segmented Selector Container */}
//                                                     <div 
//                                                         className='transition-all duration-300 rounded-[5px] p-1' 
//                                                         style={{ backgroundColor: tabColors[currentLevel] }}
//                                                     >
                                                       

//                                                         <Tabs 
//                                                             selectedIndex={currentLevel} 
//                                                             onSelect={(tabIndex) => handleLevelUpdate(index, tabIndex)}
//                                                         >
//                                                             <TabList className="flex border-none cursor-pointer">
//                                                                 {levels.map((_, i) => (
//                                                                     <Tab 
//                                                                         key={i}
//                                                                         className={`flex-1 h-8 rounded-sm mr-1 last:mr-0 outline-none transition-all ${
//                                                                             // Apply low opacity to all boxes that are NOT the selected index
//                                                                             i === currentLevel ? 'opacity-100' : 'opacity-40'
//                                                                         }`}
//                                                                         style={{ 
//                                                                             // Use the main textColor only for the exactly selected box
//                                                                             // Otherwise, use a very light version or the base tab color
//                                                                             backgroundColor: i === currentLevel 
//                                                                                 ? textColor[currentLevel] 
//                                                                                 : 'white' // This will pick up the 'tabColors' background of the container
//                                                                         }}
//                                                                     >
//                                                                         &nbsp;
//                                                                     </Tab>
//                                                                 ))}
//                                                             </TabList>
//                                                         </Tabs>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </AccordionContent>
//                                     </div>

//                                     {/* Delete Button Area */}
//                                     <div className='delete_point mt-3'>
//                                         <button 
//                                             type="button" 
//                                             onClick={() => deleteSkill(index)}
//                                             className="text-gray-400 hover:text-red-500"
//                                         >
//                                             <MdDelete className='text-2xl' />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </AccordionPanel>
//                         );
//                     })}
//                 </Accordion>

//                 <div className='mt-4'>
//                     <button 
//                         type="button" 
//                         onClick={addMore} 
//                         className='flex items-center gap-2 text-blue-500 font-bold hover:underline'
//                     >
//                         <FaPlus /> Add one more Skill
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SkillsNew;



import React from 'react';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Label, Checkbox } from "flowbite-react"; // Added Checkbox
import { Tabs, TabList, Tab } from "react-tabs";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { TfiHandDrag } from "react-icons/tfi";

const SkillsNew = ({ register, newskill, setNewSkill, watch, setValue }) => {
    
    const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
    const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];
    const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

    // 1. This watches the value of the toggle
    const hideExperienceLevel = watch("hideExperienceLevel");
    const showLevel = !hideExperienceLevel;

    const addMore = () => {
        setNewSkill([...newskill, { id: Date.now(), level: 3 }]);
    };

 const deleteSkill = (index) => {
    if (newskill.length > 1) {
        // 1. Update local state for the accordion UI
        const list = [...newskill];
        list.splice(index, 1);
        setNewSkill(list);

        // 2. IMPORTANT: Update React Hook Form state
        // We filter out the deleted index from the current form values
        const currentFormValues = watch("newSkillHistory");
        if (currentFormValues) {
            const updatedFormValues = currentFormValues.filter((_, i) => i !== index);
            setValue("newSkillHistory", updatedFormValues);
        }
    }
};

    const handleLevelUpdate = (index, tabIndex) => {
        const list = [...newskill];
        list[index].level = tabIndex;
        setNewSkill(list);
        setValue(`newSkillHistory.${index}.level`, tabIndex);
    };

    return (
        <>
            <div className='mb-4'>
                <h2 className='text-xl font-bold text-black pb-1'>Skills</h2>
                <p className='text-sm text-[#808897] font-medium'>
                    Choose 5 important skills that show you fit the position.
                </p>
            </div>

            {/* --- TOGGLE BUTTON SECTION --- */}
            <div className="flex items-center gap-2 mb-6 p-2">
                <input 
                    id="hideLevelToggle"
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    {...register("hideExperienceLevel")} 
                />
                <label htmlFor="hideLevelToggle" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Don't show experience level
                </label>
            </div>

            <div className='acco_section'>
                <Accordion alwaysOpen>
                    {newskill.map((item, index) => {
                        const watchedSkill = watch(`newSkillHistory.${index}.skill`);
                        const currentLevel = item.level !== undefined ? item.level : 3;

                        return (
                            <AccordionPanel key={item.id}>
                                <div className='flex items-start gap-2 mb-4'>
                                    <div className='drag_point mt-3'>
                                        <TfiHandDrag className='text-xl text-gray-400' />
                                    </div>

                                    <div className='w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm'>
                                        <AccordionTitle className='bg-white hover:bg-gray-50 text-lg font-bold py-3'>
                                            <div className="flex flex-col items-start">
                                                <span>{watchedSkill || "(Not specified)"}</span>
                                                {/* Subtitle changes based on toggle */}
                                                <span className="text-xs font-normal text-gray-400">
                                                    {showLevel ? levels[currentLevel] : "Level hidden"}
                                                </span>
                                            </div>
                                        </AccordionTitle>
                                        
                                        <AccordionContent className="bg-white border-t border-gray-100">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2">
                                                <div className='flex flex-col'>
                                                    <Label className="!text-gray-400 mb-1">Skill</Label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Java"
                                                        className="w-full rounded-lg border border-gray-300 bg-[#f0f4f9] p-2.5 text-sm outline-none focus:border-blue-500"
                                                        {...register(`newSkillHistory.${index}.skill`)}
                                                    />
                                                </div>

                                                {/* This section disappears if toggle is checked */}
                                                {showLevel && (
                                                    <div className='flex flex-col'>
                                                        <Label className="!text-gray-400 text-sm mb-1">
                                                            Level — <span className="font-bold" style={{ color: textColor[currentLevel] }}>
                                                                {levels[currentLevel]}
                                                            </span>
                                                        </Label>
                                                        
                                                        <div 
                                                            className='transition-all duration-300 rounded-[5px] p-1' 
                                                            style={{ backgroundColor: tabColors[currentLevel] }}
                                                        >
                                                            <Tabs 
                                                                selectedIndex={currentLevel} 
                                                                onSelect={(tabIndex) => handleLevelUpdate(index, tabIndex)}
                                                            >
                                                                <TabList className="flex border-none cursor-pointer">
                                                                    {levels.map((_, i) => (
                                                                        <Tab 
                                                                            key={i}
                                                                            className={`flex-1 h-8 rounded-sm mr-1 last:mr-0 outline-none transition-all ${
                                                                                i === currentLevel ? 'opacity-100' : 'opacity-30'
                                                                            }`}
                                                                            style={{ 
                                                                                backgroundColor: i === currentLevel ? textColor[currentLevel] : 'white' 
                                                                            }}
                                                                        >
                                                                            &nbsp;
                                                                        </Tab>
                                                                    ))}
                                                                </TabList>
                                                            </Tabs>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </div>

                                    <div className='delete_point mt-3'>
                                        <button type="button" onClick={() => deleteSkill(index)} className="text-gray-400 hover:text-red-500">
                                            <MdDelete className='text-2xl' />
                                        </button>
                                    </div>
                                </div>
                            </AccordionPanel>
                        );
                    })}
                </Accordion>

                <button type="button" onClick={addMore} className='mt-4 flex items-center gap-2 text-blue-500 font-bold hover:underline'>
                    <FaPlus /> Add one more Skill
                </button>
            </div>
        </>
    );
};

export default SkillsNew;