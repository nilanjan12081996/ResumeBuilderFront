import { Datepicker, Label, Textarea, TextInput } from "flowbite-react"
import { useEffect } from "react"
import { BiCodeAlt, BiLink, BiSolidBriefcase } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaDiagramProject } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"

const PersonalProjectJd = ({ personalPro, setPersonalPro, improveResumeData }) => {

  useEffect(() => {
    console.log('PersonalProjectJd',improveResumeData?.raw_data?.projects?.Projects)
    if (improveResumeData?.raw_data?.projects?.Projects?.length > 0) {
      const existingProjects = improveResumeData.raw_data.projects.Projects.map((proj, index) => ({
        id: `proj-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        project_title: proj.ProjectName || "",
        role: proj.YourRole || "",
        start_time: proj.Duration?.StartDate ? (() => {
          try {
            const date = new Date(proj.Duration.StartDate);
            return isNaN(date.getTime()) ? null : date;
          } catch (e) {
            console.error('Error parsing project start date:', proj.Duration.StartDate, e);
            return null;
          }
        })() : null,
        end_time: proj.Duration?.EndDate ? (() => {
          try {
            const date = new Date(proj.Duration.EndDate);
            return isNaN(date.getTime()) ? null : date;
          } catch (e) {
            console.error('Error parsing project end date:', proj.Duration.EndDate, e);
            return null;
          }
        })() : null,
        project_url: "",
        skill: Array.isArray(proj.Technologies) ? proj.Technologies.join(", ") : "",
        description: proj.Description || ""
      }));
      setPersonalPro(existingProjects);
    } else {
      setPersonalPro([{ id: `proj-default-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, project_title: "", role: "", start_time: null, end_time: null, project_url: "", skill: "", description: "" }]);
    }
  }, [improveResumeData, setPersonalPro]);
  const addProjects = () => {
    setPersonalPro([...personalPro, { id: `proj-new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, project_title: "", role: "", start_time: null, end_time: null, project_url: "", skill: "", description: "" }]);
  };

  const deleteProjects = (id) => {
    setPersonalPro(personalPro.filter((pPro) => pPro.id !== id));
  };

  const updateProjects = (id, field, value) => {
    setPersonalPro(
      personalPro.map((pPro) =>
        pPro.id === id ? { ...pPro, [field]: value } : pPro
      )
    );
  };
  return (
    <>
      <div className='tab_wrap'>
        <div className='mb-4'>
          {
            personalPro.map((pPro, proIndex) => (
              <div key={`personal-project-${pPro.id}-${proIndex}`}>
                <div className='mb-4 lg:flex items-center justify-between'>
                  <div className='mb-2 lg:mb-0'>
                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Projects {proIndex + 1}</h4>
                    <p className='text-[14px] text-[#939393] font-normal'>Add notable projects you&lsquo;ve worked on</p>
                  </div>
                  <div className='flex justify-end items-center gap-2'>
                    <button type="button" onClick={addProjects} className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Project</button>
                    <button type="button" onClick={() => deleteProjects(pPro.id)} className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                  </div>
                </div>
                <div className='resume_form_area'>

                  <div className='lg:flex gap-4 mb-3'>
                    <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Project Title</Label>
                      </div>
                      <div className='field_box flex items-center'>
                        <div className='p-3'>
                          <FaDiagramProject className='text-[#928F8F]' />
                        </div>
                        <TextInput
                          value={pPro.project_title}
                          onChange={(e) =>
                            updateProjects(pPro.id, "project_title", e.target.value)
                          } id="base" type="text" sizing="md" placeholder='Name of the project' />
                      </div>
                    </div>
                    <div className='lg:w-6/12 resume_form_box'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Your Role</Label>
                      </div>
                      <div className='field_box flex items-center'>
                        <div className='p-3'>
                          <BiSolidBriefcase className='text-[#928F8F]' />
                        </div>
                        <TextInput
                          value={pPro.role}
                          onChange={(e) =>
                            updateProjects(pPro.id, "role", e.target.value)
                          }
                          id="base" type="text" sizing="md" placeholder='E.g Developer, Designer, etc.' />
                      </div>
                    </div>
                  </div>

                  <div className='lg:flex gap-4 mb-3'>
                    <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Start Date <span>*</span></Label>
                      </div>
                      <div className='field_box_date'>
                        <Datepicker
                          value={pPro.start_time && !isNaN(pPro.start_time.getTime()) ? pPro.start_time : null}
                          onChange={(date) => {
                            if (date instanceof Date && !isNaN(date)) {
                              updateProjects(pPro.id, "start_time", date);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className='g:w-6/12 resume_form_box'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">End Date <span>*</span></Label>
                      </div>
                      <div className='field_box_date'>
                        <Datepicker
                          value={pPro.end_time && !isNaN(pPro.end_time.getTime()) ? pPro.end_time : null}
                          onChange={(date) => {
                            if (date instanceof Date && !isNaN(date)) {
                              updateProjects(pPro.id, "end_time", date);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='mb-3'>
                    <div className='w-full resume_form_box'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Project URL</Label>
                      </div>
                      <div className='field_box flex items-center'>
                        <div className='p-3'>
                          <BiLink className='text-[#928F8F]' />
                        </div>
                        <TextInput
                          value={pPro.project_url}
                          onChange={(e) =>
                            updateProjects(pPro.id, "project_url", e.target.value)
                          }
                          id="base" type="text" sizing="md" placeholder='E.g. https://yourname.design' />
                      </div>
                    </div>
                  </div>

                  <div className='mb-3'>
                    <div className='w-full resume_form_box'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Technologies Used</Label>
                      </div>
                      <div className='field_box flex items-center'>
                        <div className='p-3'>
                          <BiCodeAlt className='text-[#928F8F]' />
                        </div>
                        <TextInput value={pPro.skill}
                          onChange={(e) =>
                            updateProjects(pPro.id, "skill", e.target.value)
                          }
                          id="base" type="text" sizing="md" placeholder='Enter the technologies used in this project' />
                      </div>
                    </div>
                  </div>

                  <div className='w-full resume_form_box mb-3'>
                    <div className="mb-1 block">
                      <Label htmlFor="base">Description</Label>
                    </div>
                    <div className='flex items-center'>
                      <Textarea
                        value={pPro.description}
                        onChange={(e) =>
                          updateProjects(pPro.id, "description", e.target.value)
                        }
                        id="comment" placeholder="Write a description about the project" rows={3} />
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
export default PersonalProjectJd