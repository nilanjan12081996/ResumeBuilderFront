import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Datepicker } from "flowbite-react"
import { MdDelete } from "react-icons/md"
import { RiDraggable } from "react-icons/ri"
import { useState } from "react"
import { FaPlus } from "react-icons/fa6";

const EmpHistory=()=>{
    const [empHistory, setEmpHistory] = useState([{ id: 1 }])

    const addMore = () => {
        setEmpHistory([...empHistory, { id: Date.now() }])
    }

    const deleteEmp = (index) => {
        if(empHistory.length > 1){
            const list = [...empHistory];
            list.splice(index, 1);
            setEmpHistory(list);
        }
    }

    return(
        <>
                            <div className='mb-4'>
                              <h2 className='text-xl font-bold text-black pb-1'>Employment History</h2>
                              <p className='text-sm text-[#808897] font-medium'>
                                Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).
                              </p>
                            </div>
                            <div className='acco_section'>
                              <Accordion alwaysOpen> 
                                {empHistory.map((item, index) => (                   
                                <AccordionPanel key={index}>
                                  <div className='flex items-start gap-2'>
                                    <div className='drag_point'>
                                      <button><RiDraggable className='text-xl' /></button>
                                    </div>
                                    <div className='w-full'>
                                      <AccordionTitle className='font-bold text-xl'>(Not specified)</AccordionTitle>
                                      <AccordionContent>
                                          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
                                              {/* Job Title */}
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                  Job Title
                                                </label>
                                                <input
                                                  type="text"
                                                  placeholder=""
                                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                                />
                                              </div>
        
                                              {/* Employer */}
                                              <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                  Employer
                                                </label>
                                                <input
                                                  type="text"
                                                  placeholder=""
                                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
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
                                                />
                                              </div>
        
                                              {/* Address */}
                                              <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700">
                                                  Description
                                                </label>
                                                <textarea id="message" rows="4" className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Write here..."></textarea>
                                              </div>
        
                                          </form>
                                      </AccordionContent>
                                    </div>
                                    <div className='delete_point'>
                                      <button onClick={()=>deleteEmp(index)}><MdDelete className='text-xl' /></button>
                                    </div>
                                  </div>
                                </AccordionPanel>
                                ))}
                              </Accordion>
                              
                              <div className='mt-4'>
                                <button type="button" onClick={addMore} className='flex items-center gap-2 text-blue-500 font-bold'>
                                    <FaPlus /> Add one more employment
                                </button>
                              </div>
                            </div >
        </>
    )
}
export default EmpHistory