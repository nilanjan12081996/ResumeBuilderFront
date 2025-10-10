import { Datepicker, Label, Textarea, TextInput } from "flowbite-react"
import { useEffect } from "react"
import { BiSolidBuilding } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaTrophy } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

const AchivmentsJd = ({ improveResumeData, achivments, setAchivments }) => {
  useEffect(() => {
    if (
      improveResumeData?.raw_data?.achievements?.Achievements?.length > 0
    ) {
      console.log(
        "AchivmentsJd",
        improveResumeData.raw_data.achievements.Achievements
      );

      const achievements = improveResumeData.raw_data.achievements.Achievements.map(
        (ach, index) => ({
          id: `ach-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
          achievement_title: ach.achievement_title || "",
          organization: ach.organization || "",
          receive_date: ach.receive_date ? (() => {
            try {
              const date = new Date(ach.receive_date);
              return isNaN(date.getTime()) ? null : date;
            } catch (e) {
              console.error('Error parsing achievement date:', ach.receive_date, e);
              return null;
            }
          })() : null,
          description: ach.description || "",
        })
      );

      setAchivments(achievements);
    } else {
      setAchivments([
        {
          id: `ach-default-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          achievement_title: "",
          organization: "",
          receive_date: null,
          description: "",
        },
      ]);
    }
  }, [improveResumeData, setAchivments]);

  const addAchivments = () => {
    setAchivments([...achivments, { id: `ach-new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, achievement_title: "", organization: "", receive_date: null, description: "" }]);
  };

  const deleteAchivments = (id) => {
    setAchivments(achivments.filter((cer) => cer.id !== id));
  };

  const updateAchivments = (id, field, value) => {
    setAchivments(
      achivments.map((cer) =>
        cer.id === id ? { ...cer, [field]: value } : cer
      )
    );
  };
  return (
    <>
      <div className='tab_wrap'>
        <div className='mb-4'>
          {
            achivments.map((ach, achIndex) => (
              <div key={`achievement-${ach.id}-${achIndex}`}>
                <div className='mb-4 lg:flex items-center justify-between'>
                  <div className='mb-2 lg:mb-0'>
                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Achievement {achIndex + 1}</h4>
                    <p className='text-[14px] text-[#939393] font-normal'>Fill in the details for this section</p>
                  </div>
                  <div className='flex justify-end items-center gap-2'>
                    <button type="button" onClick={addAchivments} className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Achievement</button>
                    <button type="button" onClick={() => deleteAchivments(ach.id)} className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                  </div>
                </div>
                <div className='resume_form_area'>
                  <div className='mb-3'>
                    <div className='w-full resume_form_box'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Achievement Title</Label>
                      </div>
                      <div className='field_box flex items-center'>
                        <div className='p-3'>
                          <FaTrophy className='text-[#928F8F]' />
                        </div>
                        <TextInput
                          value={ach.achievement_title}
                          onChange={(e) =>
                            updateAchivments(ach.id, "achievement_title", e.target.value)
                          }
                          id="base" type="text" sizing="md" placeholder='Employee of the Month, Excellence Award' />
                      </div>
                    </div>
                  </div>
                  <div className='lg:flex gap-4 mb-3'>
                    <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                      <div className="mb-1 block">
                        <Label htmlFor="base"> Issuing Organization</Label>
                      </div>
                      <div className='field_box flex items-center'>
                        <div className='p-3'>
                          <BiSolidBuilding className='text-[#928F8F]' />
                        </div>
                        <TextInput
                          value={ach.organization}
                          onChange={(e) =>
                            updateAchivments(ach.id, "organization", e.target.value)
                          } id="base" type="text" sizing="md" placeholder='Company or Organization Name' />
                      </div>
                    </div>
                    <div className='lg:w-6/12 resume_form_box'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Date Recieved</Label>
                      </div>
                      <div className='field_box_date'>
                        <Datepicker
                          value={ach.receive_date && !isNaN(ach.receive_date.getTime()) ? ach.receive_date : null}
                          onChange={(date) =>
                            updateAchivments(ach.id, "receive_date", date)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <div className='w-full resume_form_box mb-3'>
                      <div className="mb-1 block">
                        <Label htmlFor="base">Description</Label>
                      </div>
                      <div className='flex items-center'>
                        <Textarea
                          value={ach.description}
                          onChange={(e) =>
                            updateAchivments(ach.id, "description", e.target.value)
                          }
                          id="comment" placeholder="Solved 100+ DSA problems on LeetCode." rows={3} />
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
export default AchivmentsJd