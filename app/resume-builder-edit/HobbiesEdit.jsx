'use client';
import React from 'react';

const Hobbies = ({ register, noHeader }) => {
    return (
        <>
            {!noHeader && (
                <div className='mb-4'>
                    <h2 className='text-xl font-bold text-black pb-1'>Hobbies</h2>
                    <p className='text-sm text-[#808897] font-medium'>
                        What do you like?
                    </p>
                </div>
            )}

            <div className='bg-white rounded-xl border border-gray-200 p-4 shadow-sm'>
                <textarea
                    rows="4"
                    placeholder="e.g. Hiking, Reading, Photography"
                    className="w-full rounded-lg border border-gray-300 bg-[#f9fafb] p-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...register("hobbies")}
                ></textarea>
            </div>
        </>
    );
};

export default Hobbies;
