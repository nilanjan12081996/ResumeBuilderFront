import { Checkbox, Datepicker, Label, Select, Textarea, TextInput } from "flowbite-react"
import { useEffect } from "react"
import { BiSolidBriefcase, BiSolidBuilding } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaTags } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { MdDelete, MdOutlineWorkOutline } from "react-icons/md"

const ExpLkdin=({lkdDetails, experiences, setExperiences})=>{

    useEffect(()=>{
        if(lkdDetails?.data?.[0]?.experience_info){
            const mappedExp=lkdDetails?.data?.[0]?.experience_info?.map((exp)=>(
                {
        id: exp.id,
        company_name: exp.company_name || "",
        position: exp.position || "",
        location: exp.location || "",
        skill: exp.skill_set || "",
        job_type: exp.job_type || "",
        start_date: exp.start_date || null,
        end_date: exp.end_date || null,
        current_work: exp.end_date === null, // mark current if no end_date
        job_description: exp.job_description || "",
            }
            ))
            setExperiences(mappedExp)
        }
    },[lkdDetails])

      const handleDelete = (id) => {
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    };
    const handleChange = (id, field, value) => {
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        )
      );
    };
    const handleAddExperience = () => {
      setExperiences([
        ...experiences,
        {
          id: Date.now(),
          company_name: "",
          position: "",
          location: "",
          skill: "",
          job_type: "",
          start_date: null,
          end_date: null,
          current_work: false,
          job_description: "",
        },
      ]);
    };


    return (
  <div className="tab_wrap">
    {experiences.map((exp, index) => (
      <div key={exp.id}>
        <div className="mb-4">
          <div className="mb-4 lg:flex items-center justify-between">
            <div className="mb-2 lg:mb-0">
              <h4 className="text-[16px] text-[#151515] font-semibold pb-1">
                Experience {index + 1}
              </h4>
              <p className="text-[14px] text-[#939393] font-normal">
                Add your work experience and internships
              </p>
            </div>
            <div className="flex justify-end items-center gap-2">
              <button
                onClick={handleAddExperience}
                className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
              >
                <BsFillPlusCircleFill className="text-sm" /> Add Experience
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1"
              >
                <MdDelete className="text-sm text-[#FF0000]" /> Delete
              </button>
            </div>
          </div>

          {/* ----------- SAME UI FIELDS, JUST CONTROLLED ------------ */}
          <div className="resume_form_area">
            <div className="lg:flex gap-4 mb-3">
              <div className="lg:w-6/12 resume_form_box mb-2 lg:mb-0">
                <div className="mb-1 block">
                  <Label htmlFor="base">Company</Label>
                </div>
                <div className="field_box flex items-center">
                  <div className="p-3">
                    <BiSolidBuilding className="text-[#928F8F]" />
                  </div>
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    placeholder="Company or Organization Name"
                    value={exp.company_name}
                    onChange={(e) =>
                      handleChange(exp.id, "company_name", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="lg:w-6/12 resume_form_box">
                <div className="mb-1 block">
                  <Label htmlFor="base">Position</Label>
                </div>
                <div className="field_box flex items-center">
                  <div className="p-3">
                    <BiSolidBriefcase className="text-[#928F8F]" />
                  </div>
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    placeholder="Job Title or Role"
                    value={exp.position}
                    onChange={(e) =>
                      handleChange(exp.id, "position", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-3">
              <div className="w-full resume_form_box">
                <div className="mb-1 block">
                  <Label htmlFor="base">Location</Label>
                </div>
                <div className="field_box flex items-center">
                  <div className="p-3">
                    <FaLocationDot className="text-[#928F8F]" />
                  </div>
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    placeholder="City, Country"
                    value={exp.location}
                    onChange={(e) =>
                      handleChange(exp.id, "location", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Skill + Job Type */}
            <div className="lg:flex gap-4 mb-3">
              <div className="lg:w-6/12 resume_form_box mb-2 lg:mb-0">
                <div className="mb-1 block">
                  <Label htmlFor="base">Skill Set</Label>
                </div>
                <div className="field_box flex items-center">
                  <div className="p-3">
                    <FaTags className="text-[#928F8F]" />
                  </div>
                  <TextInput
                    id="base"
                    type="text"
                    sizing="md"
                    placeholder="Add your Skills "
                    value={exp.skill}
                    onChange={(e) =>
                      handleChange(exp.id, "skill", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="lg:w-6/12 resume_form_box">
                <div className="mb-1 block">
                  <Label htmlFor="base">Job Type</Label>
                </div>
                <div className="field_box flex items-center">
                  <div className="p-3">
                    <MdOutlineWorkOutline className="text-[#928F8F]" />
                  </div>
                  <Select
                    required
                    className="w-full"
                    value={exp.job_type}
                    onChange={(e) =>
                      handleChange(exp.id, "job_type", e.target.value)
                    }
                  >
                    <option value="">Choose Job Type</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                  </Select>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="lg:flex gap-4 mb-3">
              <div className="lg:w-6/12 resume_form_box mb-2 lg:mb-0">
                <div className="mb-1 block">
                  <Label htmlFor="base">
                    Start Date <span>*</span>
                  </Label>
                </div>
                <div className="field_box_date">
                  {/* <Datepicker
                    value={exp.start_date}
                  
                onChange={(date) => updateEducationField(entry.id, 'start_date', date)}
                  /> */}
                  <Datepicker
                    value={exp.start_date ? new Date(exp.start_date) : null}
                    onSelectedDateChanged={(date) =>
                        handleChange(exp.id, "start_date", date ? date.toISOString() : null)
                        }
                        />
                </div>
              </div>
              <div className="lg:w-6/12 resume_form_box">
                <div className="mb-1 block">
                  <Label htmlFor="base">
                    End Date <span>*</span>
                  </Label>
                </div>
                <div className="field_box_date">
                  {/* <Datepicker
                    value={exp.end_date}
                    onChange={(date) => updateEducationField(entry.id, 'end_date', date)}
                  /> */}
                  <Datepicker
                        value={exp.end_date ? new Date(exp.end_date) : null}
                        onSelectedDateChanged={(date) =>
                            handleChange(exp.id, "end_date", date ? date.toISOString() : null)
                        }
                    />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 resume_form_box mb-4 ml-1">
          <Checkbox
            id="age"
            checked={exp.current_work}
            onChange={(e) =>
              handleChange(exp.id, "current_work", e.target.checked)
            }
          />
          <Label htmlFor="age">Currently Working here</Label>
        </div>

        {/* Additional Info */}
        <div className="mb-4">
          <div className="resume_form_area">
            <div className="w-full resume_form_box mb-3">
              <div className="mb-1 block">
                <Label htmlFor="base">Additional Information</Label>
              </div>
              <div className="flex items-center">
                <Textarea
                  id="comment"
                  placeholder="Honors, activities, relevant coursework..."
                  required
                  rows={3}
                  value={exp.job_description}
                  onChange={(e) =>
                    handleChange(exp.id, "job_description", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

}
export default ExpLkdin