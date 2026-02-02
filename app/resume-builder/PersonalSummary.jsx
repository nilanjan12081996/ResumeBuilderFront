import { Label, TextInput } from "flowbite-react"
import { BiLogoLinkedinSquare, BiSolidBriefcase, BiSolidPhone, BiSolidUser } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { FaGlobe } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import { TabPanel } from "react-tabs"
import { HiSparkles } from "react-icons/hi";
import TipTapEditor from "../editor/TipTapEditor";
import { Controller } from "react-hook-form"

const PersonalSummary = ({ register, watch, control }) => {
    return (
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
                    {/* TipTap Editor Integration */}
                    <Controller
                        name="summary"
                        control={control}
                        render={({ field }) => (
                            <TipTapEditor
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <div className="relative flex justify-end mt-2">
                        <button
                            type="button"
                            className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080] hover:bg-[#ebdcfc] transition-colors"
                        >
                            <HiSparkles className="text-md" />
                            Get help with writing
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default PersonalSummary