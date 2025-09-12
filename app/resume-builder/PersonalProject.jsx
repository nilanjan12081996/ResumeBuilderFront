import { Datepicker, Label, Textarea, TextInput } from "flowbite-react"
import { BiCodeAlt, BiLink, BiSolidBriefcase } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaDiagramProject } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"

const PersonalProject=()=>{
    return(
        <>
        <div className='tab_wrap'>
        <div className='mb-4'>
            <div className='mb-4 lg:flex items-center justify-between'>
                <div className='mb-2 lg:mb-0'>
                <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Projects</h4>
                <p className='text-[14px] text-[#939393] font-normal'>Add notable projects you&lsquo;ve worked on</p>
                </div>
                <div className='flex justify-end items-center gap-2'>
                <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Project</button>
                <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
            </div>
            </div>
            <div className='resume_form_area'>

            <div className='lg:flex gap-4 mb-3'>
                <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                    <div className="mb-1 block">
                    <Label htmlFor="base">Project Title</Label>
                    </div>
                    <div className='field_box flex items-center'>
                    <div className='p-3'>
                        <FaDiagramProject className='text-[#928F8F]' />
                    </div>
                    <TextInput id="base" type="text" sizing="md" placeholder='Name of the project' />
                    </div>
                </div>
                <div className='lg:w-6/12 resume_form_box'>
                    <div className="mb-1 block">
                    <Label htmlFor="base">Your Role</Label>
                    </div>
                    <div className='field_box flex items-center'>
                    <div className='p-3'>
                        <BiSolidBriefcase className='text-[#928F8F]' />
                    </div>
                    <TextInput id="base" type="text" sizing="md" placeholder='E.g Developer, Designer, etc.' />
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
                <div className='g:w-6/12 resume_form_box'>
                    <div className="mb-1 block">
                    <Label htmlFor="base">End Date <span>*</span></Label>
                    </div>
                    <div className='field_box_date'>
                    <Datepicker /> 
                    </div>
                </div>
            </div>

            <div className='mb-3'>
                <div className='w-full resume_form_box'>
                    <div className="mb-1 block">
                    <Label htmlFor="base">Project URL</Label>
                    </div>
                    <div className='field_box flex items-center'>
                    <div className='p-3'>
                        <BiLink className='text-[#928F8F]' />
                    </div>
                    <TextInput id="base" type="text" sizing="md" placeholder='E.g. https://yourname.design' />
                    </div>
                </div>
            </div>

            <div className='mb-3'>
                <div className='w-full resume_form_box'>
                    <div className="mb-1 block">
                    <Label htmlFor="base">Technologies Used</Label>
                    </div>
                    <div className='field_box flex items-center'>
                    <div className='p-3'>
                        <BiCodeAlt className='text-[#928F8F]' />
                    </div>
                    <TextInput id="base" type="text" sizing="md" placeholder='Enter the technologies used in this project' />
                    </div>
                </div>
            </div>

            <div className='w-full resume_form_box mb-3'>
                <div className="mb-1 block">
                <Label htmlFor="base">Description</Label>
                </div>
                <div className='flex items-center'>
                <Textarea id="comment" placeholder="Write a description about the project" required rows={3} />
                </div>
            </div>


            </div>
        </div>
        
        </div>
        </>
    )
}
export default PersonalProject