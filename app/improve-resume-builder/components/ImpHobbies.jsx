'use client';
import React from 'react';

const ImpHobbies = ({ section, sectionIndex, handleUpdate }) => {
    return (
        <>
            <p className="!text-sm !font-medium !text-gray-500 mb-4">
                What do you like? Hobbies can make your resume more personal.
            </p>

            <div className='bg-white rounded-xl border border-gray-200 p-4 shadow-sm'>
                <textarea
                    rows="4"
                    placeholder="e.g. Hiking, Reading, Photography"
                    className="w-full rounded-lg bg-[#eff2f9] p-3 text-sm outline-none resize-none"
                    value={section.hobbies || ''}
                    onChange={(e) => handleUpdate(sectionIndex, 'hobbies', e.target.value)}
                ></textarea>
            </div>
        </>
    );
};

export default ImpHobbies;