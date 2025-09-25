import { Label, Textarea, TextInput } from "flowbite-react"
import { BiLogoLinkedinSquare, BiSolidBriefcase, BiSolidUser } from "react-icons/bi"
import { FaLocationDot } from "react-icons/fa6"

const BasicInfoLkdin=()=>{
    return(
        <>
                <div className='tab_wrap'>
                    <div className='mb-4'>
                        <div className='mb-4'>
                        <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Social link</h4>
                        <p className='text-[14px] text-[#939393] font-normal'>Add your web presence to make it easy for employers to learn more about you.</p>
                        </div>
                        <div className='resume_form_area'>
                        <div className='mb-3'>
                            <div className='w-full resume_form_box'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">LinkedIn Profile Link <span>*</span></Label>
                                </div>
                                <div className='field_box flex items-center'>
                                <div className='p-3'>
                                    <BiLogoLinkedinSquare className='text-[#928F8F]' />
                                </div>
                                <TextInput id="base" type="text" sizing="md" placeholder='https://www.linkedin.com/in/johndoe' />
                                </div>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className='mb-4'>
                        <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Basic Info</h4>
                        <p className='text-[14px] text-[#939393] font-normal'>Add your personal details that will appear at the top of your resume. * Required fieldse about you.</p>
                        </div>
                        <div className='resume_form_area'>
                        <div className='lg:flex gap-4 mb-3'>
                            <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">Full Name <span>*</span></Label>
                                </div>
                                <div className='field_box flex items-center'>
                                <div className='p-3'>
                                    <BiSolidUser className='text-[#928F8F]' />
                                </div>
                                <TextInput id="base" type="text" sizing="md" placeholder='Manisha Sharma' />
                                </div>
                            </div>
                            <div className='lg:w-6/12 resume_form_box'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">Location <span>*</span></Label>
                                </div>
                                <div className='field_box flex items-center'>
                                <div className='p-3'>
                                    <FaLocationDot className='text-[#928F8F]' />
                                </div>
                                <TextInput id="base" type="text" sizing="md" placeholder='Trichy, TN' />
                                </div>
                            </div>
                        </div>

                        <div className='w-full resume_form_box mb-3'>
                            <div className="mb-1 block">
                            <Label htmlFor="base">Description <span>*</span></Label>
                            </div>
                            <div className='flex items-center'>
                            <Textarea id="comment" placeholder="Trichy, TN" required rows={3} />
                            </div>
                        </div>

                        <div className='w-full resume_form_box mb-3'>
                            <div className="mb-1 block">
                            <Label htmlFor="base">About <span>*</span></Label>
                            </div>
                            <div className='flex items-center'>
                            <Textarea id="comment" placeholder="Trichy, TN" required rows={3} />
                            </div>
                        </div>

                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className='mb-4'>
                        <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Professional Details</h4>
                        <p className='text-[14px] text-[#939393] font-normal'>Add information about your professional identity and career summary.</p>
                        </div>
                        <div className='resume_form_area'>
                        <div className='mb-3'>
                            <div className='w-full resume_form_box'>
                                <div className="mb-1 block">
                                <Label htmlFor="base">Current Company</Label>
                                </div>
                                <div className='field_box flex items-center'>
                                <div className='p-3'>
                                    <BiSolidBriefcase className='text-[#928F8F]' />
                                </div>
                                <TextInput id="base" type="text" sizing="md" placeholder='Iksen India Ptv. Ltd.' />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default BasicInfoLkdin