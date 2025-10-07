import { Label, TextInput } from "flowbite-react"
import { useEffect } from "react"
import { BiCodeAlt } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaTags } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

const SkillsLkdin = ({ lkdDetails, skills, setSkills }) => {
    console.log(lkdDetails,"lkdDetailsSkills");
    
 useEffect(() => {
  if (lkdDetails?.data?.[0]?.skills_info?.length > 0) {
    const formattedSkills = lkdDetails?.data?.[0]?.skills_info.map((s) => ({
      id: s.id,
      skill_category: s.category || "",
      skill: s.skill_set || "",
    }));
    setSkills(formattedSkills);
  }
}, [lkdDetails?.data?.[0]?.skills_info]);
  const handleAddSkill = () => {
    const newSkill = {
      id: Date.now(),
      skill_category: "",
      skill: "",
    };
    setSkills([...skills, newSkill]);
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleChange = (id, field, value) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  return (
    <div className="tab_wrap">
      {skills.map((skill, index) => (
        <div key={skill.id} className="mb-6 border-b pb-4">
          <div className="mb-4 lg:flex items-center justify-between">
            <div className="mb-2 lg:mb-0">
              <h4 className="text-[16px] text-[#151515] font-semibold pb-1">
                Skill Category #{index + 1}
              </h4>
              <p className="text-[14px] text-[#939393] font-normal">
                Add your key skills and competencies
              </p>
            </div>
            <div className="flex justify-end items-center gap-2">
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
              >
                <BsFillPlusCircleFill className="text-sm" /> Add Skill
              </button>
              {skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="bg-[#ffffff] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1"
                >
                  <MdDelete className="text-sm text-[#FF0000]" /> Delete
                </button>
              )}
            </div>
          </div>

          <div className="resume_form_area">
            <div className="w-full resume_form_box mb-3">
              <div className="mb-1 block">
                <Label htmlFor={`skill_category_${index}`}>Skill Category</Label>
              </div>
              <div className="field_box flex items-center">
                <div className="p-3">
                  <FaTags className="text-[#928F8F]" />
                </div>
                <TextInput
                  id={`skill_category_${index}`}
                  type="text"
                  sizing="md"
                  placeholder="e.g., Web Development, Frameworks"
                  className="w-full"
                  value={skill.skill_category}
                  onChange={(e) =>
                    handleChange(skill.id, "skill_category", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="w-full resume_form_box">
              <div className="mb-1 block">
                <Label htmlFor={`skills_${index}`}>Skills</Label>
              </div>
              <div className="field_box flex items-center">
                <div className="p-3">
                  <BiCodeAlt className="text-[#928F8F]" />
                </div>
                <TextInput
                  id={`skills_${index}`}
                  type="text"
                  sizing="md"
                  placeholder="Separate multiple skills with commas"
                  className="w-full"
                  value={skill.skill}
                  onChange={(e) =>
                    handleChange(skill.id, "skill", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsLkdin;
