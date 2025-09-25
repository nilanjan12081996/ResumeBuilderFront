import { Checkbox, Datepicker, Label, Select, Textarea, TextInput } from "flowbite-react"
import { BiSolidBriefcase, BiSolidBuilding } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaTags } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { MdDelete, MdOutlineWorkOutline } from "react-icons/md"

const ExpLkdin=()=>{
    return(
        <>
                <div className='tab_wrap'>
                    <div className='mb-4'>
                        <div className='mb-4 lg:flex items-center justify-between'>
                            <div className='mb-2 lg:mb-0'>
                            <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Experience 1</h4>
                            <p className='text-[14px] text-[#939393] font-normal'>Add your work experience and internships</p>
                            </div>
                            <div className='flex justify-end items-center gap-2'>
                            <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Education</button>
                            <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                        </div>
                        </div>
                        <div className='resume_form_area'>
                        <div className='lg:flex gap-4 mb-3'>
                            <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">Company</Label>
                                </div>
                                <div className='field_box flex items-center'>
                                <div className='p-3'>
                                    <BiSolidBuilding className='text-[#928F8F]' />
                                </div>
                                <TextInput id="base" type="text" sizing="md" placeholder='Company or Organization Name' />
                                </div>
                            </div>
                            <div className='lg:w-6/12 resume_form_box'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">Position</Label>
                                </div>
                                <div className='field_box flex items-center'>
                                <div className='p-3'>
                                    <BiSolidBriefcase className='text-[#928F8F]' />
                                </div>
                                <TextInput id="base" type="text" sizing="md" placeholder='Job Title or Role' />
                                </div>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <div className='w-full resume_form_box'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">Location</Label>
                                </div>
                                <div className='field_box flex items-center'>
                                <div className='p-3'>
                                    <FaLocationDot className='text-[#928F8F]' />
                                </div>
                                <TextInput id="base" type="text" sizing="md" placeholder='City, Country' />
                                </div>
                            </div>
                        </div>
                        <div className='lg:flex gap-4 mb-3'>
                            <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">Skill Set</Label>
                                </div>
                                <div className='field_box flex items-center'>
                                <div className='p-3'>
                                    <FaTags className='text-[#928F8F]' />
                                </div>
                                <TextInput id="base" type="text" sizing="md" placeholder='Add your Skills ' />
                                </div>
                            </div>
                            <div className='lg:w-6/12 resume_form_box'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">Job Type</Label>
                                </div>
                                <div className='field_box flex items-center'>
                                <div className='p-3'>
                                    <MdOutlineWorkOutline className='text-[#928F8F]' />
                                </div>
                                <Select required className='w-full'>
                                    <option>Choose Job Type</option>
                                    <option>01</option>
                                    <option>02</option>
                                    <option>03</option>
                                </Select>
                                </div>
                            </div>
                        </div>
                        <div className='lg:flex gap-4 mb-3'>
                            <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">Start Date <span>*</span></Label>
                                </div>
                                <div className='field_box_date'>
                                <Datepicker /> 
                                </div>
                            </div>
                            <div className='lg:w-6/12 resume_form_box'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">End Date <span>*</span></Label>
                                </div>
                                <div className='field_box_date'>
                                <Datepicker /> 
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
export default ExpLkdin