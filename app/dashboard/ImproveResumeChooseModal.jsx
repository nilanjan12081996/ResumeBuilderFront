import { Modal, ModalBody, ModalHeader } from "flowbite-react"
import Image from "next/image"
import resume1 from "../assets/imagesource/resume1.png";
import resume2 from "../assets/imagesource/resume2.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveTemplate } from "../reducers/ResumeSlice";
const ImproveResumeChooseModal=({  
    openImproveResumeChooseModal,
    setOpenImproveResumeChooseModal,
    resumeId
  })=>{
    const encodedId = btoa(resumeId);
    const dispatch=useDispatch()
      const user_id = sessionStorage.getItem('user_id')
  const parseUserId = JSON.parse(user_id)
        const router = useRouter();
  const [selectedResume, setSelectedResume] = useState(null);
      const handleSelect = (id) => {
    setSelectedResume(id);
  };
  const resumeBuilderHandler = () => {
    if (!selectedResume) {
      toast.error("Please select a resume first!");
      return;
    }
    dispatch(saveTemplate(
      {
        templete_id:selectedResume,
        jd_id:resumeId,
        jd_type:"improve",
        user_id:parseUserId?.user_id
      }
    ))
    router.push(`/improve-resume-builder?template=${selectedResume}&id=${encodedId}`);
  };
    return(
        <>
        <Modal
        size="7xl"
        className="apply_modal_area"
        show={openImproveResumeChooseModal}
        onClose={() => setOpenImproveResumeChooseModal(false)}
      >
        <ModalHeader className="bg-white text-black modal_header">
          Upload Resume or Select Resume
        </ModalHeader>
        <ModalBody className="bg-white p-0 rounded-b-[4px]">
          <div className="lg:flex justify-center items-center gap-5 p-5">
            <div className="lg:w-6/12 border border-[#DADADA] rounded-[7px] p-4 pr-0 mb-4 lg:mb-0">
              <h3 className="text-[#151515] text-base font-medium pb-4">
                Select resume from the list
              </h3>
              <ul className="grid grid-cols-2 gap-2 lg:gap-5 resume_list_area">
                <li>
                  <input
                    type="radio"
                    name="test"
                    id="cb1"
                    onChange={() => handleSelect(1)}
                  />
                  <label
                    for="cb1"
                    className="bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-2"
                  >
                    <Image src={resume1} alt="resume01" className="h-[400px]" />
                  </label>
                  <p className="text-[#000000] text-sm lg:text-base font-semibold text-center pt-1">
                    Modern Template
                  </p>
                </li>
                <li>
                  <input
                    type="radio"
                    name="test"
                    id="cb2"
                    onChange={() => handleSelect(2)}
                  />
                  <label
                    for="cb2"
                    className="bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-2"
                  >
                    <Image src={resume2} alt="resume01" className="h-[400px]" />
                  </label>
                  <p className="text-[#000000] text-sm lg:text-base font-semibold text-center">
                    Professional Template
                  </p>
                </li>
                <li>
                  <input type="radio" name="test" id="cb3" />
                  <label
                    for="cb3"
                    className="bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-2"
                  >
                    <Image src={resume1} alt="resume01" className="" />
                  </label>
                  <p className="text-[#000000] text-sm lg:text-base font-semibold text-center">
                    Technical Template
                  </p>
                </li>
                <li>
                  <input type="radio" name="test" id="cb4" />
                  <label
                    for="cb4"
                    className="bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-2"
                  >
                    <Image src={resume1} alt="resume01" className="" />
                  </label>
                  <p className="text-[#000000] text-sm lg:text-base font-semibold text-center">
                    Modern Template
                  </p>
                </li>
              </ul>
            </div>
            <div className="lg:w-5/12 border border-[#DADADA] rounded-[7px] overflow-hidden">
              {selectedResume === 1 && (
                <Image
                  src={resume1}
                  alt="resume01"
                  className="h-[600px] w-[500px]"
                />
              )}
              {selectedResume === 2 && (
                <Image
                  src={resume2}
                  alt="resume01"
                  className="h-[600px] w-[500px]"
                />
              )}
              {/* <Image src={view_full_resume} alt="view_full_resume" className='' /> */}
            </div>
          </div>
          <div className="p-5 inset-shadow-xs">
            <button
              onClick={resumeBuilderHandler}
              className="bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px]"
            >
              Continue
            </button>
          </div>
        </ModalBody>
      </Modal>
        
        </>
    )
}
export default ImproveResumeChooseModal