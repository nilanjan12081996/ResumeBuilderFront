import { Label, TextInput } from "flowbite-react"
import { BiLogoLinkedinSquare, BiSolidBriefcase, BiSolidPhone, BiSolidUser } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { FaGlobe } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { TabPanel } from "react-tabs"

const PersonalSummary=({register,watch})=>{
    return(
        <>
   
         <div className='mb-4'>
              <h2 className='text-xl font-bold text-black pb-1'>Professional Summary</h2>
              <p className='text-sm text-[#808897] font-medium'>
              Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.
              </p>
            </div>
            <div>
               <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                                  Description
                                </label>
                                <textarea id="message" rows="4" className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Write here..."
                               {...register(`summary`)}
                                ></textarea>
                              </div>
            </div>
                                
        </>
    )
}
export default PersonalSummary