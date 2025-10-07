import { Label, Select, TextInput } from "flowbite-react"
import { useEffect } from "react"
import { BiWorld } from "react-icons/bi"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaLanguage } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

const LanguageLkdin=({lkdDetails ,languages, setLanguages})=>{

  useEffect(() => {
    if (lkdDetails?.data?.[0]?.language_info?.length > 0) {
      const mappedLanguages = lkdDetails.data[0].language_info.map((lang) => ({
        id: lang.id,
        language_name: lang.language || "",
        proficiency: lang.level || "",
      }));
      setLanguages(mappedLanguages);
    }
  }, [lkdDetails, setLanguages]);

     const handleAddLanguage = () => {
    setLanguages((prev) => [
      ...prev,
      { id: Date.now(), language_name: "", proficiency: "" },
    ]);
  };

  // ✅ Delete a language
  const handleDeleteLanguage = (id) => {
    setLanguages((prev) => prev.filter((lang) => lang.id !== id));
  };

  // ✅ Update a specific field
  const handleChange = (id, field, value) => {
    setLanguages((prev) =>
      prev.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };
    return(
        <>
        {/* <div className='tab_wrap'>
            <div className='mb-4'>
                <div className='mb-4 flex items-center justify-between'>
                    <div>
                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Languages</h4>
                    <p className='text-[14px] text-[#939393] font-normal'>Add languages you know and proficiency levels</p>
                    </div>
                         <div className="flex justify-end items-center gap-2">
                            <button
                           
                            className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
                            >
                            <BsFillPlusCircleFill className="text-sm" /> Add Language
                            </button>
                            <button
                            
                            className="bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1"
                            >
                            <MdDelete className="text-sm text-[#FF0000]" /> Delete
                            </button>
                        </div>
                </div>
                <div className='resume_form_area'>
                <div className='mb-3'>
                    <div className='w-full resume_form_box'>
                        <div className="mb-1 block">
                        <Label htmlFor="base">Language Name </Label>
                        </div>
                        <div className='field_box flex items-center'>
                        <div className='p-3'>
                            <FaLanguage className='text-[#928F8F]' />
                        </div>
                        <TextInput id="base" type="text" sizing="md" className='w-full' placeholder='E.g English, Hindi, German, etc.' />
                        </div>
                    </div>
                </div>
                <div className='border border-[#E2E2E2] bg-white rounded-[4px] p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                    <span className='bg-[#F6EFFF] w-[26px] h-[26px] rounded-full flex items-center justify-center text-[#000000] text-[13px] font-medium'><BiWorld className='text-[#92278F]' /></span> English
                    </div>
                    <div className='flex justify-end items-center'>
                    <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                    </div>
                </div>
                </div>
            </div>
        </div> */}

            <div className="tab_wrap">
      <div className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-[16px] text-[#151515] font-semibold pb-1">
              Languages
            </h4>
            <p className="text-[14px] text-[#939393] font-normal">
              Add languages you know and proficiency levels
            </p>
          </div>
          <div className="flex justify-end items-center gap-2">
            <button
             type="button"
              onClick={handleAddLanguage}
              className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
            >
              <BsFillPlusCircleFill className="text-sm" /> Add Language
            </button>
          </div>
        </div>

        {/* ✅ Render all language fields */}
        <div className="resume_form_area">
          {languages.map((lang, index) => (
            <div key={lang.id} className="border border-[#E2E2E2] bg-white rounded-[4px] p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#F6EFFF] w-[26px] h-[26px] rounded-full flex items-center justify-center text-[#000000] text-[13px] font-medium">
                    <BiWorld className="text-[#92278F]" />
                  </span>
                  <h5 className="text-[14px] font-medium text-[#151515]">
                    Language {index + 1}
                  </h5>
                </div>
                <button
                type="button"
                  onClick={() => handleDeleteLanguage(lang.id)}
                  className="bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1"
                >
                  <MdDelete className="text-sm text-[#FF0000]" /> Delete
                </button>
              </div>

              {/* Language Name */}
              <div className="mb-3">
                <div className="w-full resume_form_box">
                  <div className="mb-1 block">
                    <Label htmlFor={`language_${lang.id}`}>Language Name</Label>
                  </div>
                  <div className="field_box flex items-center">
                    <div className="p-3">
                      <FaLanguage className="text-[#928F8F]" />
                    </div>
                    <TextInput
                      id={`language_${lang.id}`}
                      type="text"
                      sizing="md"
                      className="w-full"
                      placeholder="E.g English, Hindi, German, etc."
                      value={lang.language_name}
                      onChange={(e) =>
                        handleChange(lang.id, "language_name", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Proficiency Level */}
              <div className="mb-3">
                <div className="w-full resume_form_box">
                  <div className="mb-1 block">
                    <Label htmlFor={`level_${lang.id}`}>Proficiency Level</Label>
                  </div>
                  <Select
                    id={`level_${lang.id}`}
                   
                    value={lang.proficiency}
                    onChange={(e) =>
                      handleChange(lang.id, "proficiency", e.target.value)
                    }
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        </>
    )
}
export default LanguageLkdin