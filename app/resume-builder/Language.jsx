// import { Label, Select, TextInput } from "flowbite-react"
// import { useState } from "react"
// import { BiWorld } from "react-icons/bi"
// import { BsFillPlusCircleFill } from "react-icons/bs"
// import { FaLanguage } from "react-icons/fa"
// import { MdDelete } from "react-icons/md"

// const Language=()=>{
//     return(
//         <>
//          <div className='tab_wrap'>
//             <div className='mb-4'>
//                 <div className='mb-4 lg:flex items-center justify-between'>
//                     <div className='mb-2 lg:mb-0'>
//                     <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Languages</h4>
//                     <p className='text-[14px] text-[#939393] font-normal'>Add languages you know and proficiency levels</p>
//                     </div>
//                     <div className='flex justify-end items-center gap-2'>
//                     <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add New Language</button>
//                 </div>
//                 </div>
//                 <div className='resume_form_area'>
//                 <div className='lg:flex gap-4 mb-3'>
//                     <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
//                         <div className="mb-1 block">
//                         <Label htmlFor="base">Language Name </Label>
//                         </div>
//                         <div className='field_box flex items-center'>
//                         <div className='p-3'>
//                             <FaLanguage className='text-[#928F8F]' />
//                         </div>
//                         <TextInput id="base" type="text" sizing="md" placeholder='E.g English, Hindi, German, etc.' />
//                         </div>
//                     </div>
//                     <div className='lg:w-6/12 resume_form_box'>
//                         <div className="mb-1 block">
//                         <Label htmlFor="base">Proficiency</Label>
//                         </div>
//                         <div className='field_box pl-3'>
//                         <Select required>
//                             <option>Intermediate</option>
//                             <option>English</option>
//                             <option>Hindi</option>
//                             <option>bengali</option>
//                         </Select>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='border border-[#E2E2E2] bg-white rounded-[4px] p-4 flex items-center justify-between'>
//                     <div className='flex items-center gap-2'>
//                     <span className='bg-[#F6EFFF] w-[26px] h-[26px] rounded-full flex items-center justify-center text-[#000000] text-[13px] font-medium'><BiWorld className='text-[#92278F]' /></span> English
//                     </div>
//                     <div className='flex justify-end items-center'>
//                     <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//             </div>
//         </>
//     )
// }
// export default Language

import { useState } from "react";
import { Label, TextInput, Select } from "flowbite-react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaLanguage } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

// const Language = ({languages,
//                 setLanguages,
//                 register,
//                 errors}) => {
//   const [languages, setLanguages] = useState([
//     { id: Date.now(), name: "", proficiency: "" },
//   ]);

//   // Add new language section
//   const addLanguage = () => {
//     setLanguages([
//       ...languages,
//       { id: Date.now(), name: "", proficiency: "" },
//     ]);
//   };

//   // Delete a language section
//   const deleteLanguage = (id) => {
//     setLanguages(languages.filter((lang) => lang.id !== id));
//   };

//   return (
//     <>
//       <div className="tab_wrap">
//         <div className="mb-4">
//           <div className="mb-4 lg:flex items-center justify-between">
//             <div className="mb-2 lg:mb-0">
//               <h4 className="text-[16px] text-[#151515] font-semibold pb-1">
//                 Languages
//               </h4>
//               <p className="text-[14px] text-[#939393] font-normal">
//                 Add languages you know and proficiency levels
//               </p>
//             </div>
//             <div className="flex justify-end items-center gap-2">
//               <button
//                 onClick={addLanguage}
//                 className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
//               >
//                 <BsFillPlusCircleFill className="text-sm" /> Add New Language
//               </button>
//             </div>
//           </div>

//           <div className="resume_form_area">
//             {languages.map((lang) => (
//               <div
//                 key={lang.id}
//                 className="border border-[#E2E2E2] bg-white rounded-[4px] p-4 mb-3"
//               >
//                 <div className="lg:flex gap-4 mb-3">
//                   {/* Language Name */}
//                   <div className="lg:w-6/12 resume_form_box mb-2 lg:mb-0">
//                     <div className="mb-1 block">
//                       <Label htmlFor={`language-${lang.id}`}>Language Name</Label>
//                     </div>
//                     <div className="field_box flex items-center">
//                       <div className="p-3">
//                         <FaLanguage className="text-[#928F8F]" />
//                       </div>
//                       <TextInput
//                         id={`language-${lang.id}`}
//                         type="text"
//                         sizing="md"
//                         placeholder="E.g English, Hindi, German, etc."
//                       />
//                     </div>
//                   </div>

//                   {/* Proficiency */}
//                   <div className="lg:w-6/12 resume_form_box">
//                     <div className="mb-1 block">
//                       <Label htmlFor={`proficiency-${lang.id}`}>Proficiency</Label>
//                     </div>
//                     <div className="field_box pl-3">
//                       <Select id={`proficiency-${lang.id}`} required>
//                         <option>Beginner</option>
//                         <option>Intermediate</option>
//                         <option>Advanced</option>
//                         <option>Fluent</option>
//                       </Select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Delete button */}
//                 <div className="flex justify-end items-center">
//                   <button
//                     onClick={() => deleteLanguage(lang.id)}
//                     className="bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1"
//                   >
//                     <MdDelete className="text-sm text-[#FF0000]" /> Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Language;

const Language = ({ languages, setLanguages }) => {
  const addLanguage = () => {
    setLanguages([...languages, { id: Date.now(), language_name: "", proficiency: "" }]);
  };

  const deleteLanguage = (id) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const updateLanguage = (id, field, value) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  return (
    <div className="tab_wrap">
      <div className="mb-4">
        <div className="mb-4 lg:flex items-center justify-between">
          <div className="mb-2 lg:mb-0">
            <h4 className="text-[16px] text-[#151515] font-semibold pb-1">
              Languages
            </h4>
            <p className="text-[14px] text-[#939393] font-normal">
              Add languages you know and proficiency levels
            </p>
          </div>
          <button
            onClick={addLanguage}
            type="button"
            className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
          >
            <BsFillPlusCircleFill className="text-sm" /> Add New Language
          </button>
        </div>

        <div className="resume_form_area">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="border border-[#E2E2E2] bg-white rounded-[4px] p-4 mb-3"
            >
              <div className="lg:flex gap-4 mb-3">
                <div className="lg:w-6/12 resume_form_box mb-2 lg:mb-0">
                  <Label>Language Name</Label>
                  <div className="field_box flex items-center">
                    <div className="p-3">
                      <FaLanguage className="text-[#928F8F]" />
                    </div>
                    <TextInput
                      type="text"
                      sizing="md"
                      placeholder="E.g English, Hindi, German, etc."
                      value={lang.language_name}
                      onChange={(e) =>
                        updateLanguage(lang.id, "language_name", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="lg:w-6/12 resume_form_box">
                  <Label>Proficiency</Label>
                  <div className="field_box pl-3">
                    <Select
                      value={lang.proficiency}
                      onChange={(e) =>
                        updateLanguage(lang.id, "proficiency", e.target.value)
                      }
                      required
                    >
                      <option value="">Select proficiency</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Fluent">Fluent</option>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center">
                <button
                  type="button"
                  onClick={() => deleteLanguage(lang.id)}
                  className="bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1"
                >
                  <MdDelete className="text-sm text-[#FF0000]" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Language
