import { Label, Select, TextInput } from "flowbite-react"
import { BiWorld } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaLanguage } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

const Language=()=>{
    return(
        <>
         <div className='tab_wrap'>
            <div className='mb-4'>
                <div className='mb-4 lg:flex items-center justify-between'>
                    <div className='mb-2 lg:mb-0'>
                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Languages</h4>
                    <p className='text-[14px] text-[#939393] font-normal'>Add languages you know and proficiency levels</p>
                    </div>
                    <div className='flex justify-end items-center gap-2'>
                    <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add New Language</button>
                </div>
                </div>
                <div className='resume_form_area'>
                <div className='lg:flex gap-4 mb-3'>
                    <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Language Name </Label>
                        </div>
                        <div className='field_box flex items-center'>
                        <div className='p-3'>
                            <FaLanguage className='text-[#928F8F]' />
                        </div>
                        <TextInput id="base" type="text" sizing="md" placeholder='E.g English, Hindi, German, etc.' />
                        </div>
                    </div>
                    <div className='lg:w-6/12 resume_form_box'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Proficiency</Label>
                        </div>
                        <div className='field_box pl-3'>
                        <Select required>
                            <option>Intermediate</option>
                            <option>English</option>
                            <option>Hindi</option>
                            <option>bengali</option>
                        </Select>
                        </div>
                    </div>
                </div>
                <div className='border border-[#E2E2E2] bg-white rounded-[4px] p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                    <span className='bg-[#F6EFFF] w-[26px] h-[26px] rounded-full flex items-center justify-center text-[#000000] text-[13px] font-medium'><BiWorld className='text-[#92278F]' /></span> English
                    </div>
                    <div className='flex justify-end items-center'>
                    <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}
export default Language