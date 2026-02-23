'use client';
import React from 'react';

const Hobbies = ({ register }) => {
    return (
        <>
            <div className='mb-4'>
                <h2 className='text-xl font-bold text-black pb-1'>Hobbies</h2>
                <p className='text-sm text-[#808897] font-medium'>
                    What do you like? Hobbies can make your resume more personal.
                </p>
            </div>

            <div className='bg-white rounded-xl p-4 shadow-sm'>
                <textarea
                    rows="4"
                    placeholder="e.g. Hiking, Reading, Photography"
                    className="w-full rounded-lg bg-[#eff2f9] p-3 text-sm outline-none resize-none"
                    {...register("hobbies")}
                ></textarea>
            </div>
        </>
    );
};

export default Hobbies;