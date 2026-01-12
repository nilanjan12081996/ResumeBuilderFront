

"use client";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Datepicker } from "flowbite-react"
import { MdDelete } from "react-icons/md"
import { RiDraggable } from "react-icons/ri"
import { useState } from "react"
import { FaPlus } from "react-icons/fa6";

const EducationNew = ({ education,setEducation,register,watch}) => {
 
    const addMore = () => {
        setEducation([...education, { id: Date.now() }])
    }

    const deleteEmp = (index) => {
        if(education.length > 1){
            const list = [...education];
            list.splice(index, 1);
            setEducation(list);
        }
    }

  return (
    <>
              <div className='mb-4'>
              <h2 className='text-xl font-bold text-black pb-1'>Education</h2>
              <p className='text-sm text-[#808897] font-medium'>
               A varied education on your resume sums up the value that your learnings and background will bring to job.
              </p>
            </div>
            <div className='acco_section'>
              <Accordion alwaysOpen> 
                {education.map((item, index) => {
                  const watchedSchoole = watch(`educationHistory.${index}.school`);
                const watchedDegree = watch(`educationHistory.${index}.degree`);
                console.log("watchedSchoole",watchedSchoole);
                console.log("watchedDegree",watchedDegree);
                
                
                return(
    
              
                <AccordionPanel key={index}>
                  <div className='flex items-start gap-2'>
                    <div className='drag_point'>
                      <button><RiDraggable className='text-xl' /></button>
                    </div>
                    <div className='w-full'>
                      <AccordionTitle className='font-bold text-sm'>{watchedSchoole || watchedDegree 
                            ? `${watchedDegree || ''}${watchedDegree ? ' at ' + watchedSchoole : ''}` 
                            : "(Not specified)"}</AccordionTitle>
                      <AccordionContent>
                          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
                              {/* Job Title */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  School
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                  {...register(`educationHistory.${index}.school`)}
                                />
                              </div>
    
                              {/* Employer */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Degree
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                 {...register(`educationHistory.${index}.degree`)}
                                />
                              </div>
    
                              {/* Strat & End Date */}
                              <div className='date_area'>
                                <label className="block text-sm font-medium text-gray-700">
                                  Strat & End Date
                                </label>
                                <div className='flex gap-5'>
                                  <div>
                                    <Datepicker />
                                  </div>
                                  <div>
                                    <Datepicker />
                                  </div>
                                  </div>
                              </div>
                              
                              {/* City */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  City, State
                                </label>
                                <input
                                  type="text"
                                  placeholder=""
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                  {...register(`educationHistory.${index}.city_state`)}
                                />
                              </div>
    
                              {/* Address */}
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                  Description
                                </label>
                                <textarea id="message" rows="4" className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Write here..."
                               {...register(`educationHistory.${index}.description`)}
                                ></textarea>
                              </div>
    
                          </form>
                      </AccordionContent>
                    </div>
                    <div className='delete_point'>
                      <button onClick={()=>deleteEmp(index)}><MdDelete className='text-xl' /></button>
                    </div>
                  </div>
                </AccordionPanel>
                  )
    })}
              </Accordion>
              
              <div className='mt-4'>
                <button type="button" onClick={addMore} className='flex items-center gap-2 text-blue-500 font-bold'>
                    <FaPlus /> Add one more education
                </button>
              </div>
            </div >
    </>
  );
};

export default EducationNew;