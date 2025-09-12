import { Datepicker, Label, TextInput } from "flowbite-react";
import { BiSolidBuilding } from "react-icons/bi";
import { BsFillPersonVcardFill, BsFillPlusCircleFill } from "react-icons/bs";
import { FaCertificate } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Certificates=()=>{
    return(
        <>
         <div className='tab_wrap'>
        <div className='mb-4'>
            <div className='mb-4 lg:flex items-center justify-between'>
                <div className='mb-2 lg:mb-0'>
                <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Certifications</h4>
                <p className='text-[14px] text-[#939393] font-normal'>Fill in the details for this section</p>
                </div>
                <div className='flex justify-end items-center gap-2'>
                <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Certification</button>
                <button className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
            </div>
            </div>
            <div className='resume_form_area'>
            <div className='lg:flex gap-4 mb-3'>
                <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                    <div className="mb-1 block">
                    <Label htmlFor="base">Certification Name</Label>
                    </div>
                    <div className='field_box flex items-center'>
                    <div className='p-3'>
                        <FaCertificate className='text-[#928F8F]' />
                    </div>
                    <TextInput id="base" type="text" sizing="md" placeholder='Name of th certification' />
                    </div>
                </div>
                <div className='lg:w-6/12 resume_form_box'>
                    <div className="mb-1 block">
                    <Label htmlFor="base"> Issuing Organization</Label>
                    </div>
                    <div className='field_box flex items-center'>
                    <div className='p-3'>
                        <BiSolidBuilding className='text-[#928F8F]' />
                    </div>
                    <TextInput id="base" type="email" sizing="md" placeholder='E.g. Coursera, Udemy, etc.' />
                    </div>
                </div>
            </div>
            <div className='lg:flex gap-4 mb-3'>
                <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                    <div className="mb-1 block">
                    <Label htmlFor="base">Date Obtained</Label>
                    </div>
                    <div className='field_box_date'>
                    <Datepicker /> 
                    </div>
                </div>
                <div className='lg:w-6/12 resume_form_box'>
                    <div className="mb-1 block">
                    <Label htmlFor="base">Certification ID</Label>
                    </div>
                    <div className='field_box flex items-center'>
                    <div className='p-3'>
                        <BsFillPersonVcardFill className='text-[#928F8F]' />
                    </div>
                    <TextInput id="base" type="text" sizing="md" placeholder='Enter certification ID' />
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default Certificates;