import { Label, TextInput } from "flowbite-react"
import { BiLogoLinkedinSquare, BiSolidBriefcase, BiSolidPhone, BiSolidUser } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { FaGlobe } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { TabPanel } from "react-tabs"

const PersonalInfo=({register})=>{
    return(
        <>
   
        <div className='tab_wrap'>
          <div className='mb-4'>
            <div className='mb-4'>
              <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Basic Info</h4>
              <p className='text-[14px] text-[#939393] font-normal'>Add your personal details that will appear at the top of your resume. * Required fields</p>
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
                      <TextInput id="base" type="text" sizing="md" placeholder='Kabilan S' />
                    </div>
                  </div>
                  <div className='lg:w-6/12 resume_form_box'>
                    <div className="mb-1 block">
                      <Label htmlFor="base">Email Address <span>*</span></Label>
                    </div>
                    <div className='field_box flex items-center'>
                      <div className='p-3'>
                        <MdEmail className='text-[#928F8F]' />
                      </div>
                      <TextInput id="base" type="email" sizing="md" placeholder='Kabilan S' />
                    </div>
                  </div>
              </div>
              <div className='lg:flex gap-4 mb-3'>
                  <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                    <div className="mb-1 block">
                      <Label htmlFor="base">Phone Number <span>*</span></Label>
                    </div>
                    <div className='field_box flex items-center'>
                      <div className='p-3'>
                        <BiSolidPhone className='text-[#928F8F]' />
                      </div>
                      <TextInput id="base" type="text" sizing="md" placeholder='+91-5362563762' />
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
            </div>
          </div>
          <div className='mb-4'>
            <div className='mb-4'>
              <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Web & Social</h4>
              <p className='text-[14px] text-[#939393] font-normal'>Add your web presence to make it easy for employers to learn more about you.</p>
            </div>
            <div className='resume_form_area'>
              <div className='lg:flex gap-4 mb-3'>
                  <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                    <div className="mb-1 block">
                      <Label htmlFor="base">Personal Website</Label>
                    </div>
                    <div className='field_box flex items-center'>
                      <div className='p-3'>
                        <FaGlobe className='text-[#928F8F]' />
                      </div>
                      <TextInput id="base" type="text" sizing="md" placeholder='https://yourname.design' />
                    </div>
                  </div>
                  <div className='lg:w-6/12 resume_form_box'>
                    <div className="mb-1 block">
                      <Label htmlFor="base">LinkedIn Profile </Label>
                    </div>
                    <div className='field_box flex items-center'>
                      <div className='p-3'>
                        <BiLogoLinkedinSquare className='text-[#928F8F]' />
                      </div>
                      <TextInput id="base" type="text" sizing="md" placeholder='https://www.linkedin.com/in/johndoe' />
                    </div>
                  </div>
              </div>
              <div className='lg:flex gap-4 mb-3'>
                  <div className='lg:w-6/12 resume_form_box'>
                    <div className="mb-1 block">
                      <Label htmlFor="base">GitHub Profile</Label>
                    </div>
                    <div className='field_box flex items-center'>
                      <div className='p-3'>
                        <BsGithub className='text-[#928F8F]' />
                      </div>
                      <TextInput id="base" type="text" sizing="md" placeholder='https://github.com/johndoe' />
                    </div>
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
              <div className='lg:flex gap-4 mb-3'>
                  <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                    <div className="mb-1 block">
                      <Label htmlFor="base">Career Title</Label>
                    </div>
                    <div className='field_box flex items-center'>
                      <div className='p-3'>
                        <BiSolidBriefcase className='text-[#928F8F]' />
                      </div>
                      <TextInput id="base" type="text" sizing="md" placeholder='UI Designer' />
                    </div>
                  </div>
                  <div className='lg:w-6/12 resume_form_box'>
                    <div className="mb-1 block">
                      <Label htmlFor="base">Career Goals</Label>
                    </div>
                    <div className='field_box flex items-center'>
                      <div className='p-3'>
                        <BiSolidBriefcase className='text-[#928F8F]' />
                      </div>
                      <TextInput id="base" type="text" sizing="md" placeholder='Briefly Describe your career goals' />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
                                
        </>
    )
}
export default PersonalInfo