import { Checkbox, Datepicker, Label, Textarea, TextInput } from "flowbite-react"
import { useEffect } from "react"
import { BiSolidBank } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaLocationDot } from "react-icons/fa6"
import { HiAcademicCap } from "react-icons/hi2"
import { MdDelete } from "react-icons/md"

const EducationLkdin = ({ lkdDetails, setValue, register, educationEntries, setEducationEntries }) => {
  console.log('lkdDetails', lkdDetails)
  const addEducation = () => {
    setEducationEntries([...educationEntries, { id: Date.now(), institution: "", location: "", field_study: "", degree: "", start_time: null, end_time: null, cgpa: "" }]);
  };

  const deleteEducation = (id) => {
    setEducationEntries(educationEntries.filter((cer) => cer.id !== id));
  };

  const updateEducationField = (id, field, value) => {
    setEducationEntries(
      educationEntries.map((cer) =>
        cer.id === id ? { ...cer, [field]: value } : cer
      )
    );
  };
  // useEffect(() => {
  //   if (lkdDetails?.data?.[0]?.education_info) {
  //     const mappedEducation = lkdDetails?.data?.[0]?.education_info.map((edu) => {
  //       // Try to separate field and degree if possible
  //       let degree = "";
  //       let field_study = "";
  //       if (edu.course) {
  //         // Look for parentheses (common LinkedIn format)
  //         const match = edu.course.match(/^(.*?)\s*\((.*?)\)$/);
  //         if (match) {
  //           field_study = match[1].trim();  // "Computer Science"
  //           degree = match[2].trim();       // "Bachelor of Science - BS"
  //         } else {
  //           degree = edu.course; // fallback if no parentheses
  //         }
  //       }

  //       return {
  //         id: edu.id,
  //         institution: edu.college || "",
  //         location: edu.location || "",
  //         degree,
  //         field_study,
  //         start_time: edu.course_start ? new Date(edu.course_start) : null,
  //         end_time: edu.course_completed && edu.course_completed !== "1970-01-01"
  //           ? new Date(edu.course_completed)
  //           : null,
  //         cgpa: edu.cgpa || "",
  //         additionalInfo: edu.aditional_info || "",
  //         currentlyStudying: !edu.course_completed || edu.course_completed === "1970-01-01",
  //       };
  //     });

  //     setEducationEntries(mappedEducation);
  //   }
  // }, [lkdDetails]);

  return (
    <>
      {/* <div className='tab_wrap'>
            <div className='mb-4'>
                <div className='mb-4 lg:flex items-center justify-between'>
                    <div className='mb-2 lg:mb-0'>
                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Education 1</h4>
                    <p className='text-[14px] text-[#939393] font-normal'>Add your educational background and qualifications</p>
                    </div>
                    <div className='flex justify-end items-center gap-2'>
                    <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Education</button>
                    <button className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                </div>
                </div>
                <div className='resume_form_area'>
                <div className='lg:flex gap-4 mb-3'>
                    <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Institution/School</Label>
                        </div>
                        <div className='field_box flex items-center'>
                        <div className='p-3'>
                            <BiSolidBank className='text-[#928F8F]' />
                        </div>
                        <TextInput id="base" type="text" sizing="md" placeholder='Saranathan College of Engineering' />
                        </div>
                    </div>
                    <div className='lg:w-6/12 resume_form_box'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Location</Label>
                        </div>
                        <div className='field_box flex items-center'>
                        <div className='p-3'>
                            <FaLocationDot className='text-[#928F8F]' />
                        </div>
                        <TextInput id="base" type="text" sizing="md" placeholder='Trichy, TN' />
                        </div>
                    </div>
                </div>
                <div className='lg:flex gap-4 mb-3'>
                    <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Degree</Label>
                        </div>
                        <div className='field_box flex items-center'>
                        <div className='p-3'>
                            <HiAcademicCap className='text-[#928F8F]' />
                        </div>
                        <TextInput id="base" type="text" sizing="md" placeholder='B.Tech' />
                        </div>
                    </div>
                    <div className='lg:w-6/12 resume_form_box'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Field of study</Label>
                        </div>
                        <div className='field_box flex items-center'>
                        <div className='p-3'>
                            <HiAcademicCap className='text-[#928F8F]' />
                        </div>
                        <TextInput id="base" type="text" sizing="md" placeholder='Computer Science' />
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="flex items-center gap-2 resume_form_box mb-4 ml-1">
                <Checkbox id="age" />
                <Label htmlFor="age">Currently studying here</Label>
            </div>
            <div className='mb-4'>
                <div className='resume_form_area'>
                <div className=''>
                    <div className='w-full resume_form_box mb-3'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Date</Label>
                        </div>
                        <div className='field_box_date'>
                        <Datepicker /> 
                        </div>
                    </div>
                    <div className='w-full resume_form_box mb-3'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Additional Information</Label>
                        </div>
                        <div className='flex items-center'>
                        <Textarea id="comment" placeholder="Honors, activities, relevant coursework..." required rows={3} />
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div> */}

      <div className='tab_wrap'>
        {educationEntries.map((entry, index) => (
          <div key={entry.id} className='mb-4'>
            <div className='mb-4 lg:flex items-center justify-between'>
              <div className='mb-2 lg:mb-0'>
                <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>
                  Education {index + 1}
                </h4>
                <p className='text-[14px] text-[#939393] font-normal'>
                  Add your educational background and qualifications
                </p>
              </div>
              <div className='flex justify-end items-center gap-2'>
                <button
                  type="button"
                  onClick={addEducation}
                  className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'
                >
                  <BsFillPlusCircleFill className='text-sm' /> Add Education
                </button>
                <button
                  type="button"
                  onClick={() => deleteEducation(entry.id)}
                  disabled={educationEntries.length === 1}
                  className={`bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] font-medium cursor-pointer px-2 flex items-center gap-1 ${educationEntries.length === 1
                      ? 'opacity-50 cursor-not-allowed text-[#828282]'
                      : 'text-[#828282] hover:text-[#92278F]'
                    }`}
                >
                  <MdDelete className='text-sm text-[#FF0000]' /> Delete
                </button>
              </div>
            </div>

            <div className='resume_form_area'>
              <div className='lg:flex gap-4 mb-3'>
                <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                  <div className="mb-1 block">
                    <Label htmlFor={`institution-${entry.id}`}>Institution/School</Label>
                  </div>
                  <div className='field_box flex items-center'>
                    <div className='p-3'>
                      <BiSolidBank className='text-[#928F8F]' />
                    </div>
                    <TextInput
                      id={`institution-${entry.id}`}
                      type="text"
                      sizing="md"
                      placeholder='Saranathan College of Engineering'
                      value={entry.institution}
                      onChange={(e) => updateEducationField(entry.id, 'institution', e.target.value)}
                    />
                  </div>
                </div>
                <div className='lg:w-6/12 resume_form_box'>
                  <div className="mb-1 block">
                    <Label htmlFor={`location-${entry.id}`}>Location</Label>
                  </div>
                  <div className='field_box flex items-center'>
                    <div className='p-3'>
                      <FaLocationDot className='text-[#928F8F]' />
                    </div>
                    <TextInput
                      id={`location-${entry.id}`}
                      type="text"
                      sizing="md"
                      placeholder='Trichy, TN'
                      value={entry.location}
                      onChange={(e) => updateEducationField(entry.id, 'location', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className='lg:flex gap-4 mb-3'>
                <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                  <div className="mb-1 block">
                    <Label htmlFor={`degree-${entry.id}`}>Degree</Label>
                  </div>
                  <div className='field_box flex items-center'>
                    <div className='p-3'>
                      <HiAcademicCap className='text-[#928F8F]' />
                    </div>
                    <TextInput
                      id={`degree-${entry.id}`}
                      type="text"
                      sizing="md"
                      placeholder='B.Tech'
                      value={entry.degree}
                      onChange={(e) => updateEducationField(entry.id, 'degree', e.target.value)}
                    />
                  </div>
                </div>
                <div className='lg:w-6/12 resume_form_box'>
                  <div className="mb-1 block">
                    <Label htmlFor={`fieldOfStudy-${entry.id}`}>Field of study</Label>
                  </div>
                  <div className='field_box flex items-center'>
                    <div className='p-3'>
                      <HiAcademicCap className='text-[#928F8F]' />
                    </div>
                    <TextInput
                      id={`field_study-${entry.id}`}
                      type="text"
                      sizing="md"
                      placeholder='Computer Science'
                      value={entry.field_study}
                      onChange={(e) => updateEducationField(entry.id, 'field_study', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 resume_form_box mb-4 ml-1">
              <Checkbox
                id={`currently-studying-${entry.id}`}
                checked={entry.currentlyStudying}
                onChange={(e) => updateEducationField(entry.id, 'currentlyStudying', e.target.checked)}
              />
              <Label htmlFor={`currently-studying-${entry.id}`}>Currently studying here</Label>
            </div>

            <div className='mb-4'>
              <div className='resume_form_area'>
                <div className=''>
                  <div className='w-full resume_form_box mb-3'>
                    <div className="mb-1 block">
                      <Label htmlFor={`date-${entry.id}`}>Start Date</Label>
                    </div>
                    <div className='field_box_date'>
                      <Datepicker
                        id={`date-${entry.id}`}
                        value={entry.start_time}
                        onChange={(date) => updateEducationField(entry.id, 'start_time', date)}
                      />
                    </div>
                  </div>

                  <div className='w-full resume_form_box mb-3'>
                    <div className="mb-1 block">
                      <Label htmlFor={`date-${entry.id}`}>End Date</Label>
                    </div>
                    <div className='field_box_date'>
                      <Datepicker
                        id={`date-${entry.id}`}
                        value={entry.end_time}
                        onChange={(date) => updateEducationField(entry.id, 'end_time', date)}
                        disabled={entry.currentlyStudying}
                      />
                    </div>
                  </div>

                  <div className='w-full resume_form_box mb-3'>
                    <div className="mb-1 block">
                      <Label htmlFor={`gpa-${entry.id}`}>GPA or Grade</Label>
                    </div>
                    <div className='field_box flex items-center pl-3'>
                      <TextInput
                        id={`gpa-${entry.id}`}
                        type="text"
                        sizing="md"
                        placeholder='e.g. 3.8/4.0 or 85%'
                        value={entry.cgpa}
                        onChange={(e) => updateEducationField(entry.id, 'cgpa', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='w-full resume_form_box mb-3'>
                    <div className="mb-1 block">
                      <Label htmlFor={`additionalInfo-${entry.id}`}>Additional Information</Label>
                    </div>
                    <div className='flex items-center'>
                      <Textarea
                        id={`additionalInfo-${entry.id}`}
                        placeholder="Honors, activities, relevant coursework..."
                        rows={3}
                        value={entry.additionalInfo}
                        onChange={(e) => updateEducationField(entry.id, 'additionalInfo', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add separator line between education entries */}
            {index < educationEntries.length - 1 && (
              <hr className='border-t border-[#E5E5E5] my-6' />
            )}
          </div>
        ))}
      </div>
    </>
  )
}
export default EducationLkdin