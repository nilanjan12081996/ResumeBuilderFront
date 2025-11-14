import { FileInput, Label, Modal, ModalBody, ModalHeader, Spinner, TextInput } from "flowbite-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { BiImport, BiLogoLinkedinSquare } from "react-icons/bi"
import { HiClipboardList } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { linkedInBasicInfo, linkedInEduInfo, linkedInExpInfo, linkedInLangInfo, linkedInPdf, linkedInSkillInfo } from "../reducers/LinkedinSlice"
import { addCountResume, addCountResumeOrg } from "../reducers/ResumeSlice"
import { toast } from "react-toastify"

const LinkedInReWriteModal=({
     openModalLinkedInRewrite,
    setOpenModalLinkedInRewrite,
    HandlerLinkedInRewrite,
    setOpenModalCreateResumeLinkedIn,
     resumeIdLkdin,
      setResumeIdLkdin
})=>{
    const{loading}=useSelector((state)=>state?.linkedIn)
    const dispatch=useDispatch()
     const { profileData } = useSelector((state) => state?.profile)
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
     const resumeFile = watch("file");
      useEffect(() => {
        if (resumeFile && resumeFile[0]) {
          console.log("Resume file selected:", resumeFile[0]);
        }
      }, [resumeFile]);

      const onSubmit=(data)=>{
         const formData=new FormData()
                 if (data.file && data.file[0]) {
              
              formData.append("file", data.file[0]);
            } else {
              console.error("No resume file selected");
              toast.error("Please select a resume file to upload");
              return;
            }

            if(profileData?.data?.signUpType?.[0]?.UserSignUpTypeMap?.sign_up_type_id===1)
            {
                dispatch(addCountResume({ref_type:"linkedin_resume"})).then((res)=>{
                  console.log("res",res);
                  
               if(res?.payload?.status_code===200){
                    dispatch(linkedInPdf(formData)).then((res)=>{
                console.log(res,"res");
                if(res?.payload?.status_code===201){
                  console.log("res?.payload?.created_data?.id",res?.payload?.created_data?.id);
                  const newId = res?.payload?.created_data?.id;
                  setResumeIdLkdin(newId);
                  try{
                    Promise.all([
                  dispatch(linkedInBasicInfo({lkdin_resume_id:res?.payload?.created_data?.id,...res?.payload?.raw_data?.linkedin_rewrite_data?.personal_info})),
                  dispatch(linkedInExpInfo({lkdin_resume_id:res?.payload?.created_data?.id,experience_info:res?.payload?.raw_data?.linkedin_rewrite_data?.experience_info})),
                  dispatch(linkedInEduInfo({lkdin_resume_id:res?.payload?.created_data?.id,education_info:res?.payload?.raw_data?.linkedin_rewrite_data?.education_info})),
                  dispatch(linkedInSkillInfo({lkdin_resume_id:res?.payload?.created_data?.id,skill_info:res?.payload?.raw_data?.linkedin_rewrite_data?.skill_info})),
                  dispatch(linkedInLangInfo({lkdin_resume_id:res?.payload?.created_data?.id,language_info:res?.payload?.raw_data?.linkedin_rewrite_data?.language_info})),


                    ]).then(()=>{
                      HandlerLinkedInRewrite(newId)
                    })
                   
                       
                   

                   
                  }catch(error){
                     console.error("Error while saving resume sections", error);
                      toast.error("Something went wrong while saving resume data");
                  }
                 
                }
                
            })
               }
                else if(res?.payload?.response?.data?.status_code===400){
                       toast.error(res?.payload?.response?.data?.message,{
                         autoClose:false
                       })
                     }
            })
            }
            else{
                dispatch(addCountResumeOrg({ref_type:"linkedin_resume"})).then((res)=>{
               if(res?.payload?.status_code===200){
                    dispatch(linkedInPdf(formData)).then((res)=>{
                console.log(res,"res");
                if(res?.payload?.status_code===201){
                  console.log("res?.payload?.created_data?.id",res?.payload?.created_data?.id);
                  const newId = res?.payload?.created_data?.id;
                  setResumeIdLkdin(newId);
                  try{
                    Promise.all([
                  dispatch(linkedInBasicInfo({lkdin_resume_id:res?.payload?.created_data?.id,...res?.payload?.raw_data?.linkedin_rewrite_data?.personal_info})),
                  dispatch(linkedInExpInfo({lkdin_resume_id:res?.payload?.created_data?.id,experience_info:res?.payload?.raw_data?.linkedin_rewrite_data?.experience_info})),
                  dispatch(linkedInEduInfo({lkdin_resume_id:res?.payload?.created_data?.id,education_info:res?.payload?.raw_data?.linkedin_rewrite_data?.education_info})),
                  dispatch(linkedInSkillInfo({lkdin_resume_id:res?.payload?.created_data?.id,skill_info:res?.payload?.raw_data?.linkedin_rewrite_data?.skill_info})),
                  dispatch(linkedInLangInfo({lkdin_resume_id:res?.payload?.created_data?.id,language_info:res?.payload?.raw_data?.linkedin_rewrite_data?.language_info})),


                    ]).then(()=>{
                      HandlerLinkedInRewrite(newId)
                    })
                   
                       
                   

                   
                  }catch(error){
                     console.error("Error while saving resume sections", error);
                      toast.error("Something went wrong while saving resume data");
                  }
                 
                }
                
            })
               }
                else if(res?.payload?.response?.data?.status_code===400){
                       toast.error(res?.payload?.response?.data?.message,{
                         autoClose:false
                       })
                     }
            })
            }
          

            
      }
    return(
        <>
         <Modal
                size="4xl"
                className="apply_modal_area"
                show={openModalLinkedInRewrite}
                onClose={() => setOpenModalLinkedInRewrite(false)}
              >
                <ModalHeader className="bg-white text-black modal_header">
                  <div className="flex items-center gap-1">
                    <HiClipboardList className="text-[#800080] text-3xl" />
                    LinkedIn Rewrite
                  </div>
                </ModalHeader>
                <ModalBody className="bg-white p-0 rounded-b-[4px]">
                     {
                        loading&&(
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
                        <Spinner size="xl" color="purple" />
                        <span className="ml-3 text-lg font-semibold text-purple-700">Processing...</span>
                        </div>
                        )
                    }
                    <form
                    onSubmit={handleSubmit(onSubmit)}
                     >
                  <div className="p-5">
                    <div className="lg:w-full">
                      <div className="flex w-full items-center justify-center">
                        <Label
                          htmlFor="dropzone-file"
                          className="resume_upload_box_small flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <BiImport className="text-[70px] text-[#92278F]" />
                            <p className="mb-2 text-xl text-[#92278F]">
                              {resumeFile && resumeFile[0]
                          ? resumeFile[0].name
                          : "Import LinkedIn Pdf"}
                            </p>
                        {resumeFile && resumeFile[0] && (
                        <p className="text-sm text-green-600">
                          File selected successfully
                        </p>
                      )}
                          </div>
                          <FileInput id="dropzone-file" className="hidden" 
                            accept=".pdf,.doc,.docx"
                      {...register("file", { required: true })}
                      aria-invalid={errors.file ? "true" : "false"}
                          />
                        </Label>
                      </div>
                       {errors.file?.type === "required" && (
                  <p className="text-red-700 text-sm" role="alert">
                    Please upload LinkenIn Pdf
                  </p>
                )}
                    </div>
                  </div>
                  <div className="p-5 inset-shadow-xs">
                    <button
                    type="submit"
                     // onClick={() => HandlerLinkedInRewrite(true)}
                      className="bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px]"
                    >
                      Continue
                    </button>
                  </div>
                  </form>
                </ModalBody>
              </Modal>
        </>
    )
}
export default LinkedInReWriteModal