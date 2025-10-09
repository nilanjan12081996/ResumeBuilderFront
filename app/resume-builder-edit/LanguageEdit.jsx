

import { useEffect, useState } from "react";
import { Label, TextInput, Select } from "flowbite-react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaLanguage } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { MdDelete } from "react-icons/md";


const LanguageEdit = ({ setValue,singleResumeInfo,  languages, setLanguages }) => {

    useEffect(() => {
    if (singleResumeInfo?.data?.language_info?.length > 0) {
      const formattedLanguages = singleResumeInfo.data.language_info.map(lang => ({
        id: lang.id,
        language_name: lang.language_name || "",
        proficiency: lang.proficiency || "",
      }));
      setLanguages(formattedLanguages);
    }
  }, [singleResumeInfo]);
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
export default LanguageEdit
