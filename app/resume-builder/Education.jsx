import { Checkbox, Datepicker, Label, Textarea, TextInput } from "flowbite-react"
import { BiSolidBank } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaLocationDot } from "react-icons/fa6"
import { HiAcademicCap } from "react-icons/hi2"
import { MdDelete } from "react-icons/md"
import { TabPanel } from "react-tabs"

const Education=()=>{
    return(
        <>
       
                                  <div className='tab_wrap'>
                                    <div className='mb-4'>
                                      <div className='mb-4 lg:flex items-center justify-between'>
                                         <div className='mb-2 lg:mb-0'>
                                            <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Education 1</h4>
                                            <p className='text-[14px] text-[#939393] font-normal'>Add your educational background and qualifications</p>
                                         </div>
                                         <div className='flex justify-end items-center gap-2'>
                                          <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Education</button>
                                          <button className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                                        </div>
                                      </div>
                                      <div className='resume_form_area'>
                                        <div className='lg:flex gap-4 mb-3'>
                                            <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                              <div className="mb-1 block">
                                                <Label htmlFor="base">Institution/School</Label>
                                              </div>
                                              <div className='field_box flex items-center'>
                                                <div className='p-3'>
                                                  <BiSolidBank className='text-[#928F8F]' />
                                                </div>
                                                <TextInput id="base" type="text" sizing="md" placeholder='Saranathan College of Engineering' />
                                              </div>
                                            </div>
                                            <div className='lg:w-6/12 resume_form_box'>
                                              <div className="mb-1 block">
                                                <Label htmlFor="base">Location</Label>
                                              </div>
                                              <div className='field_box flex items-center'>
                                                <div className='p-3'>
                                                  <FaLocationDot className='text-[#928F8F]' />
                                                </div>
                                                <TextInput id="base" type="text" sizing="md" placeholder='Trichy, TN' />
                                              </div>
                                            </div>
                                        </div>
                                        <div className='lg:flex gap-4 mb-3'>
                                            <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                              <div className="mb-1 block">
                                                <Label htmlFor="base">Degree</Label>
                                              </div>
                                              <div className='field_box flex items-center'>
                                                <div className='p-3'>
                                                  <HiAcademicCap className='text-[#928F8F]' />
                                                </div>
                                                <TextInput id="base" type="text" sizing="md" placeholder='B.Tech' />
                                              </div>
                                            </div>
                                            <div className='lg:w-6/12 resume_form_box'>
                                              <div className="mb-1 block">
                                                <Label htmlFor="base">Field of study</Label>
                                              </div>
                                              <div className='field_box flex items-center'>
                                                <div className='p-3'>
                                                  <HiAcademicCap className='text-[#928F8F]' />
                                                </div>
                                                <TextInput id="base" type="text" sizing="md" placeholder='Computer Science' />
                                              </div>
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2 resume_form_box mb-4 ml-1">
                                      <Checkbox id="age" />
                                      <Label htmlFor="age">Currently studying here</Label>
                                    </div>
                                    <div className='mb-4'>
                                      <div className='resume_form_area'>
                                        <div className=''>
                                            <div className='w-full resume_form_box mb-3'>
                                              <div className="mb-1 block">
                                                <Label htmlFor="base">Date</Label>
                                              </div>
                                              <div className='field_box_date'>
                                                <Datepicker /> 
                                              </div>
                                            </div>
                                            <div className='w-full resume_form_box mb-3'>
                                              <div className="mb-1 block">
                                                <Label htmlFor="base">GPA or Grade</Label>
                                              </div>
                                              <div className='field_box flex items-center pl-3'>
                                                <TextInput id="base" type="text" sizing="md" placeholder='e.g. 3.8/4.0 or 85%' />
                                              </div>
                                            </div>
                                            <div className='w-full resume_form_box mb-3'>
                                              <div className="mb-1 block">
                                                <Label htmlFor="base">Additional Information</Label>
                                              </div>
                                              <div className='flex items-center'>
                                                <Textarea id="comment" placeholder="Honors, activities, relevant coursework..." required rows={3} />
                                              </div>
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                               
        </>
    )
}

export default Education