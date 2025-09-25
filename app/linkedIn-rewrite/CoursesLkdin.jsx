import { Datepicker, Label, Textarea, TextInput } from "flowbite-react"
import { BiSolidBuilding } from "react-icons/bi"
import { FaTrophy } from "react-icons/fa"

const CoursesLkdin=()=>{
    return(
        <>
         <div className='tab_wrap'>
            <div className='mb-4'>
                <div className='mb-4 flex items-center justify-between'>
                    <div>
                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Courses</h4>
                    <p className='text-[14px] text-[#939393] font-normal'>Add relevant courses to showcase your skills and expertise</p>
                    </div>
                </div>
                <div className='resume_form_area'>

                <div className='lg:flex gap-4 mb-3'>
                    <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Course Title</Label>
                        </div>
                        <div className='field_box flex items-center'>
                        <div className='p-3'>
                            <FaTrophy className='text-[#928F8F]' />
                        </div>
                        <TextInput id="base" type="text" sizing="md" placeholder='Name of the project' />
                        </div>
                    </div>
                    <div className='lg:w-6/12 resume_form_box'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Associated With</Label>
                        </div>
                        <div className='field_box flex items-center'>
                        <div className='p-3'>
                            <FaTrophy className='text-[#928F8F]' />
                        </div>
                        <TextInput id="base" type="text" sizing="md" placeholder='E.g Developer, Designer, etc.' />
                        </div>
                    </div>
                </div>

                <div className='lg:flex gap-4 mb-3'>
                    <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Issuing Organization</Label>
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
                        <Label htmlFor="base">Completion Date</Label>
                        </div>
                        <div className='field_box_date'>
                        <Datepicker /> 
                        </div>
                    </div>
                </div>

                <div className='w-full resume_form_box mb-3'>
                    <div className="mb-1 block">
                    <Label htmlFor="base">Description</Label>
                    </div>
                    <div className='flex items-center'>
                    <Textarea id="comment" placeholder="Solved 100+ DSA problems on LeetCode." required rows={3} />
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CoursesLkdin