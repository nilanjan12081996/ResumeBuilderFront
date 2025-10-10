import { Label, TextInput } from "flowbite-react"
import { useEffect } from "react"
import { BiCodeAlt } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaTags } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

const SkillsJd=({register, errors, skills, setSkills, improveResumeData})=>{

  useEffect(() => {
    if (improveResumeData?.raw_data?.skills?.Skills?.length > 0) {
      const existingSkills = improveResumeData.raw_data.skills.Skills.map((sk, index) => ({
        id: `skill-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        skill_category: sk.Skill_Category || "",
        skill: Array.isArray(sk.Skills) ? sk.Skills.join(", ") : "",
      }));
      setSkills(existingSkills);
    } else {
      setSkills([{ id: `skill-default-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, skill_category: "", skill: "" }]);
    }
  }, [improveResumeData, setSkills]);
  
     const addSkils = () => {
    setSkills([...skills, { id: `skill-new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, skill_category: "", skill: "" }]);
  };

  const deleteSkills = (id) => {
    setSkills(skills.filter((sk) => sk.id !== id));
  };

  const updateSkills = (id, field, value) => {
    setSkills(
      skills.map((sk) =>
        sk.id === id ? { ...sk, [field]: value } : sk
      )
    );
  };
    return(
        <>
        <div className='tab_wrap'>
            <div className='mb-4'>
                {
                    skills?.map((sk,skillInd)=>(
                        <div key={`skill-${sk.id}-${skillInd}`}>
                          <div className='mb-4 lg:flex items-center justify-between'>
                    <div className='mb-2 lg:mb-0'>
                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Skill Category {skillInd+1}</h4>
                    <p className='text-[14px] text-[#939393] font-normal'>Add your key skills and competencies</p>
                    </div>
                    <div className='flex justify-end items-center gap-2'>
                    <button
                    type="button"
                     onClick={addSkils}
                    className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Skill</button>
                    <button type="button" onClick={()=>deleteSkills(sk.id)} className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                </div>
                </div>
                <div className='resume_form_area'>
                <div className=''>
                    <div className='w-full resume_form_box mb-3'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Skill Category</Label>
                        </div>
                        <div className='field_box flex items-center'>
                        <div className='p-3'>
                            <FaTags className='text-[#928F8F]' />
                        </div>
                        <TextInput id="base" type="text" sizing="md" placeholder='Tools' className='w-full'
                         value={sk.skill_category}
                      onChange={(e) =>
                        updateSkills(sk.id, "skill_category", e.target.value)
                      }
                        />
                        </div>
                    </div>
                    <div className='w-full resume_form_box'>
                        <div className="mb-1 block">
                        <Label htmlFor="base"> Skills</Label>
                        </div>
                        <div className='field_box flex items-center'>
                        <div className='p-3'>
                            <BiCodeAlt className='text-[#928F8F]' />
                        </div>
                        <TextInput 
                           value={sk.skill}
                      onChange={(e) =>
                        updateSkills(sk.id, "skill", e.target.value)
                      }
                        id="base" type="text" sizing="md" className='w-full' placeholder='Separate multiple skills with commas for better formatting' />
                        </div>
                    </div>
                </div>
                </div>
                        </div>
                    ))
                }
              
            </div>
            </div>
        </>
    )
}
export default SkillsJd