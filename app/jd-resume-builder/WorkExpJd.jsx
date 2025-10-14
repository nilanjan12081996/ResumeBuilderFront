// import { Checkbox, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
// import { BiCodeAlt, BiSolidBriefcase, BiSolidBuilding } from "react-icons/bi";
// import { BsFillPlusCircleFill } from "react-icons/bs";
// import { FaTags } from "react-icons/fa";
// import { FaDiagramProject, FaLocationDot } from "react-icons/fa6";
// import { MdDelete } from "react-icons/md";

// const WorkExp=()=>{
//     return(
//         <>
//          <div className='tab_wrap'>
//         <div className='mb-4'>
//         <div className='mb-4 lg:flex items-center justify-between'>
//             <div className='mb-2 lg:mb-0'>
//             <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Experience 1</h4>
//             <p className='text-[14px] text-[#939393] font-normal'>Add your work experience and internships</p>
//             </div>
//             <div className='flex justify-end items-center gap-2'>
//             <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Experience</button>
//             <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
//         </div>
//         </div>
//         <div className='resume_form_area'>
//         <div className='lg:flex gap-4 mb-3'>
//             <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
//                 <div className="mb-1 block">
//                 <Label htmlFor="base">Company</Label>
//                 </div>
//                 <div className='field_box flex items-center'>
//                 <div className='p-3'>
//                     <BiSolidBuilding className='text-[#928F8F]' />
//                 </div>
//                 <TextInput id="base" type="text" sizing="md" placeholder='Company or Organization Name' />
//                 </div>
//             </div>
//             <div className='lg:w-6/12 resume_form_box'>
//                 <div className="mb-1 block">
//                 <Label htmlFor="base">Position</Label>
//                 </div>
//                 <div className='field_box flex items-center'>
//                 <div className='p-3'>
//                     <BiSolidBriefcase className='text-[#928F8F]' />
//                 </div>
//                 <TextInput id="base" type="text" sizing="md" placeholder='Job Title or Role' />
//                 </div>
//             </div>
//         </div>
//         <div className='mb-3'>
//             <div className='w-full resume_form_box'>
//                 <div className="mb-1 block">
//                 <Label htmlFor="base">Location</Label>
//                 </div>
//                 <div className='field_box flex items-center'>
//                 <div className='p-3'>
//                     <FaLocationDot className='text-[#928F8F]' />
//                 </div>
//                 <TextInput id="base" type="text" sizing="md" placeholder='City, Country' />
//                 </div>
//             </div>
//         </div>
//         <div className='mb-3'>
//             <div className='w-full resume_form_box'>
//                 <div className="mb-1 block">
//                 <Label htmlFor="base">Skill Set</Label>
//                 </div>
//                 <div className='field_box flex items-center'>
//                 <div className='p-3'>
//                     <FaTags className='text-[#928F8F]' />
//                 </div>
//                 <TextInput id="base" type="text" sizing="md" placeholder='Add your Skills ' />
//                 </div>
//             </div>
//         </div>
//         <div className='lg:flex gap-4 mb-3'>
//             <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
//                 <div className="mb-1 block">
//                 <Label htmlFor="base">Start Date <span>*</span></Label>
//                 </div>
//                 <div className='field_box_date'>
//                 <Datepicker /> 
//                 </div>
//             </div>
//             <div className='lg:w-6/12 resume_form_box'>
//                 <div className="mb-1 block">
//                 <Label htmlFor="base">End Date <span>*</span></Label>
//                 </div>
//                 <div className='field_box_date'>
//                 <Datepicker /> 
//                 </div>
//             </div>
//         </div>
//         </div>
//         </div>
//         <div className="flex items-center gap-2 resume_form_box mb-4 ml-1">
//             <Checkbox id="age" />
//             <Label htmlFor="age">Currently studying here</Label>
//         </div>
//         <div className='mb-4'>
//             <div className='resume_form_area'>
//             <div className=''>
//                 <div className='mb-4 lg:flex items-center justify-between'>
//                     <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Project 1</h4>

//                       <div className='flex justify-end items-center gap-2'>
//             <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Peoject</button>
//             <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
//         </div>
//                 </div>

//                 <div className='lg:flex gap-4 mb-3'>
//                     <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
//                         <div className="mb-1 block">
//                         <Label htmlFor="base">Project Title</Label>
//                         </div>
//                         <div className='field_box flex items-center'>
//                         <div className='p-3'>
//                             <FaDiagramProject className='text-[#928F8F]' />
//                         </div>
//                         <TextInput id="base" type="text" sizing="md" placeholder='Name of the project' />
//                         </div>
//                     </div>
//                     <div className='lg:w-6/12 resume_form_box'>
//                         <div className="mb-1 block">
//                         <Label htmlFor="base">Your Role</Label>
//                         </div>
//                         <div className='field_box flex items-center'>
//                         <div className='p-3'>
//                             <BiSolidBriefcase className='text-[#928F8F]' />
//                         </div>
//                         <TextInput id="base" type="text" sizing="md" placeholder='E.g Developer, Designer, etc.' />
//                         </div>
//                     </div>
//                 </div>

//                 <div className='mb-3'>
//                     <div className='w-full resume_form_box'>
//                         <div className="mb-1 block">
//                         <Label htmlFor="base">Technologies Used</Label>
//                         </div>
//                         <div className='field_box flex items-center'>
//                         <div className='p-3'>
//                             <BiCodeAlt className='text-[#928F8F]' />
//                         </div>
//                         <TextInput id="base" type="text" sizing="md" placeholder='Enter the technologies used in this project' />
//                         </div>
//                     </div>
//                 </div>

//                 <div className='w-full resume_form_box mb-3'>
//                     <div className="mb-1 block">
//                     <Label htmlFor="base">Description</Label>
//                     </div>
//                     <div className='flex items-center'>
//                     <Textarea id="comment" placeholder="Write a description about the project" required rows={3} />
//                     </div>
//                 </div>

//             </div>
//             </div>
//         </div>
//         </div>
//         </>
//     )
// }
// export default WorkExp;


import { useEffect, useRef, useState } from "react";
import { Checkbox, Datepicker, Label, Textarea, TextInput } from "flowbite-react";
import { BiCodeAlt, BiSolidBriefcase, BiSolidBuilding } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import { FaDiagramProject, FaLocationDot } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import ResuMateQuestionModal from "../modal/ResuMateQuestionModal";

const WorkExpJd = ({ jdBasedDetailsData, experiences, setExperiences }) => {
  const [showResuMate, setShowResuMate] = useState(false);
  const buttonRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('jdBasedDetailsDataExp', jdBasedDetailsData?.data?.[0]?.experience);
    if (jdBasedDetailsData?.data?.[0]?.experience?.length > 0) {
      const formattedExperiences = jdBasedDetailsData.data[0].experience.map(exp => {
        let skills = [];
        try {
          skills = JSON.parse(exp.skill_set); // string to array convert
        } catch (e) {
          skills = [];
        }

        return {
          id: exp.id,
          company_name: exp.company_name || "",
          position: exp.Position || "",
          location: exp.location || "",
          skill: Array.isArray(skills) ? skills.join(",") : exp.skill_set || "",
          start_date: exp.start_date ? new Date(exp.start_date) : null,
          end_date: exp.end_date ? new Date(exp.end_date) : null,
          current_work: false,
          projects: exp.projects || [
            { id: Date.now(), title: "", role: "", technology: "", description: "" }
          ]
        };
      });
      setExperiences(formattedExperiences);
    }
  }, [jdBasedDetailsData]);



  // Delete experience
  const deleteExperience = (expId) => {
    setExperiences(experiences.filter((exp) => exp.id !== expId));
  };

  // Add new project under a specific experience
  const addProject = (expId) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === expId
          ? { ...exp, projects: [...exp.projects, { id: Date.now() }] }
          : exp
      )
    );
  };

  // Delete project under a specific experience
  const deleteProject = (expId, projId) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === expId
          ? { ...exp, projects: exp.projects.filter((p) => p.id !== projId) }
          : exp
      )
    );
  };

  const updateExperienceField = (expId, field, value) => {
    setExperiences(experiences.map(exp =>
      exp.id === expId ? { ...exp, [field]: value } : exp
    ));
  };

  // update field for project
  const updateProjectField = (expId, projId, field, value) => {
    setExperiences(experiences.map(exp =>
      exp.id === expId ? {
        ...exp,
        projects: exp.projects.map(proj =>
          proj.id === projId ? { ...proj, [field]: value } : proj
        )
      } : exp
    ));
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        company_name: "",
        position: "",
        location: "",
        skill: "",
        start_date: null,
        end_date: null,
        current_work: false,
        projects: [{ id: Date.now() + 1, title: "", role: "", technology: "", description: "" }]
      }
    ]);
  };

  return (
    <>
      {experiences.map((exp, expIndex) => (
        <div className="tab_wrap" key={exp.id}>
          <div className="mb-4">
            <div className="mb-4 lg:flex items-center justify-between">
              <div className="mb-2 lg:mb-0">
                <h4 className="text-[16px] text-[#151515] font-semibold pb-1">
                  Experience {expIndex + 1}
                </h4>
                <p className="text-[14px] text-[#939393] font-normal">
                  Add your work experience and internships
                </p>
              </div>
              <div className="flex justify-end items-center gap-2">
                <button
                  type="button"
                  onClick={addExperience}
                  className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
                >
                  <BsFillPlusCircleFill className="text-sm" /> Add Experience
                </button>
                <button
                  type="button"
                  onClick={() => deleteExperience(exp.id)}
                  className="bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1"
                >
                  <MdDelete className="text-sm text-[#FF0000]" /> Delete
                </button>
              </div>
            </div>

            {/* Work Experience Form */}
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
                      onChange={(e) => updateExperienceField(exp.id, "company_name", e.target.value)}
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
                      onChange={(e) => updateExperienceField(exp.id, "position", e.target.value)}
                    />
                  </div>
                </div>
              </div>

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
                      onChange={(e) => updateExperienceField(exp.id, "location", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="w-full resume_form_box">
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
                      placeholder="Add your Skills"
                      value={exp.skill}
                      onChange={(e) => updateExperienceField(exp.id, "skill", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="lg:flex gap-4 mb-3">
                <div className="lg:w-6/12 resume_form_box mb-2 lg:mb-0">
                  <div className="mb-1 block">
                    <Label htmlFor="base">
                      Start Date <span>*</span>
                    </Label>
                  </div>
                  <div className="field_box_date">
                    <Datepicker
                      id={`start-date-${exp.id}`}
                      value={exp.start_date} // from your state
                      onChange={(date) => {
                        if (date instanceof Date && !isNaN(date)) {
                          updateExperienceField(exp.id, "start_date", date);
                        }
                      }}
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
                    <Datepicker
                      id={`end-date-${exp.id}`}
                      value={exp.end_date ? new Date(exp.end_date) : null}  // from your state
                      // disabled={exp.endDate}
                      onChange={(date) => {
                        if (date instanceof Date && !isNaN(date)) {
                          updateExperienceField(exp.id, "end_date", date);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 resume_form_box mb-4 ml-1">
            <Checkbox id={`current-${exp.id}`}
              checked={exp.current_work || false}
              onChange={(e) =>
                updateExperienceField(exp.id, "current_work", e.target.checked)
              } />
            <Label htmlFor="age">Currently studying here</Label>
          </div>

          {/* Projects Section */}
          {exp.projects.map((proj, projIndex) => (
            <div className="mb-4" key={proj.id}>
              <div className="resume_form_area">
                <div className="">
                  <div className="mb-4 lg:flex items-center justify-between">
                    <h4 className="text-[16px] text-[#151515] font-semibold pb-1">
                      Project {projIndex + 1}
                    </h4>

                    <div className="flex justify-end items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addProject(exp.id)}
                        className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
                      >
                        <BsFillPlusCircleFill className="text-sm" /> Add Project
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteProject(exp.id, proj.id)}
                        className="bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1"
                      >
                        <MdDelete className="text-sm text-[#FF0000]" /> Delete
                      </button>
                    </div>
                  </div>

                  <div className="lg:flex gap-4 mb-3">
                    <div className="lg:w-6/12 resume_form_box mb-2 lg:mb-0">
                      <div className="mb-1 block">
                        <Label htmlFor={`proj-title-${proj.id}`}>Project Title</Label>
                      </div>
                      <div className="field_box flex items-center">
                        <div className="p-3">
                          <FaDiagramProject className="text-[#928F8F]" />
                        </div>
                        <TextInput
                          id={`proj-title-${proj.id}`}
                          type="text"
                          sizing="md"
                          placeholder="Name of the project"
                          value={proj.title}
                          onChange={(e) =>
                            updateProjectField(exp.id, proj.id, "title", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="lg:w-6/12 resume_form_box">
                      <div className="mb-1 block">
                        <Label htmlFor={`proj-role-${proj.id}`}>Your Role</Label>
                      </div>
                      <div className="field_box flex items-center">
                        <div className="p-3">
                          <BiSolidBriefcase className="text-[#928F8F]" />
                        </div>
                        <TextInput
                          id={`proj-role-${proj.id}`}
                          type="text"
                          sizing="md"
                          placeholder="E.g Developer, Designer, etc."
                          value={proj.role}
                          onChange={(e) =>
                            updateProjectField(exp.id, proj.id, "role", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="w-full resume_form_box">
                      <div className="mb-1 block">
                        <Label htmlFor={`proj-tech-${proj.id}`}>Technologies Used</Label>
                      </div>
                      <div className="field_box flex items-center">
                        <div className="p-3">
                          <BiCodeAlt className="text-[#928F8F]" />
                        </div>
                        <TextInput
                          id={`proj-tech-${proj.id}`}
                          type="text"
                          sizing="md"
                          placeholder="Enter the technologies used in this project"
                          value={proj.technology}
                          onChange={(e) =>
                            updateProjectField(exp.id, proj.id, "technology", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full resume_form_box mb-3">
                    <div className="mb-1 block">
                      <Label id={`proj-desc-${proj.id}`}>Description</Label>
                    </div>
                    <div className="flex items-center">
                      <Textarea
                        id={`proj-desc-${proj.id}`}
                        placeholder="Write a description about the project"

                        rows={3}
                        value={proj.description}
                        onChange={(e) =>
                          updateProjectField(exp.id, proj.id, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* ===================  ResuMate Button =================== */}
       <div className="relative">
      <div>
        <button
          ref={buttonRef} // 👈 added this line
          type="button"
          className="bg-[#E8F0FE] hover:bg-[#4C6EF5] rounded-[7px] text-[12px] leading-[30px] text-[#2F4CCA] hover:text-[#ffffff] font-medium cursor-pointer px-4 py-2 flex items-center gap-2 shadow-lg"
          onClick={() => setShowResuMate(true)}
        >
          ResuMate
        </button>
      </div>

      {/* Pass buttonRef to the modal */}
      <ResuMateQuestionModal
        showResuMate={showResuMate}
        setShowResuMate={setShowResuMate}
        buttonRef={buttonRef} // 👈 added this line
      />
    </div>

    </>
  );
};

export default WorkExpJd;






