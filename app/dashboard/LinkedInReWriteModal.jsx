import { FileInput, Label, Modal, ModalBody, ModalHeader, Spinner, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { BiImport, BiLogoLinkedinSquare } from "react-icons/bi"
import { HiClipboardList } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { checkLinkedinAtsScore, linkedInBasicInfo, linkedInEduInfo, linkedInExpInfo, linkedInLangInfo, linkedInPdf, linkedInSkillInfo } from "../reducers/LinkedinSlice"
import { addCountResume, addCountResumeOrg } from "../reducers/ResumeSlice"
import { toast } from "react-toastify"
import LinkdinAtsScoreModal from "../modal/LinkdinAtsScoreModal"

const LinkedInReWriteModal = ({
  openModalLinkedInRewrite,
  setOpenModalLinkedInRewrite,
  HandlerLinkedInRewrite,
  setOpenModalCreateResumeLinkedIn,
  resumeIdLkdin,
  setResumeIdLkdin,
  setOpenModalCreateResumeJd
}) => {
  const { loading } = useSelector((state) => state?.linkedIn)
  const dispatch = useDispatch()
  const { profileData } = useSelector((state) => state?.profile)
  const [showLinkdinAtsModal, setShowLinkdinAtsModal] = useState(false);
  const [atsData, setAtsData] = useState(null);
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

  const onSubmit = (data) => {
    const formData = new FormData()
    if (data.file && data.file[0]) {

      formData.append("file", data.file[0]);
    } else {
      console.error("No resume file selected");
      toast.error("Please select a resume file to upload");
      return;
    }

    // if (profileData?.data?.signUpType?.[0]?.UserSignUpTypeMap?.sign_up_type_id === 1) {
    //   dispatch(addCountResume({ ref_type: "linkedin_resume" })).then((res) => {
    //     console.log("res", res);

    //     if (res?.payload?.status_code === 200) {
    //       dispatch(linkedInPdf(formData)).then((res) => {
    //         console.log(res, "res");
    //         if (res?.payload?.status_code === 201) {
    //           console.log("res?.payload?.created_data?.id", res?.payload?.created_data?.id);
    //           const newId = res?.payload?.created_data?.id;
    //           const checkLinkdinAtsPayload = {
    //             linkedin_resume_id: res?.payload?.created_data?.id,
    //             raw_data: res?.payload?.raw_data,
    //           }
    //           setResumeIdLkdin(newId);
    //           try {
    //             Promise.all([
    //               dispatch(linkedInBasicInfo({ lkdin_resume_id: res?.payload?.created_data?.id, ...res?.payload?.raw_data?.linkedin_rewrite_data?.personal_info })),
    //               dispatch(linkedInExpInfo({ lkdin_resume_id: res?.payload?.created_data?.id, experience_info: res?.payload?.raw_data?.linkedin_rewrite_data?.experience_info })),
    //               dispatch(linkedInEduInfo({ lkdin_resume_id: res?.payload?.created_data?.id, education_info: res?.payload?.raw_data?.linkedin_rewrite_data?.education_info })),
    //               dispatch(linkedInSkillInfo({ lkdin_resume_id: res?.payload?.created_data?.id, skill_info: res?.payload?.raw_data?.linkedin_rewrite_data?.skill_info })),
    //               dispatch(linkedInLangInfo({ lkdin_resume_id: res?.payload?.created_data?.id, language_info: res?.payload?.raw_data?.linkedin_rewrite_data?.language_info })),
    //               dispatch(checkLinkedinAtsScore(checkLinkdinAtsPayload))
    //                 .then((atsRes) => {
    //                   console.log('atsRes', atsRes);
    //                   if (atsRes?.payload?.status === true) {
    //                     setAtsData(atsRes?.payload?.data);
    //                     setShowLinkdinAtsModal(true);
    //                   } else {
    //                     toast.error("Failed to fetch ATS Score");
    //                   }
    //                 })



    //             ])
    //               // .then(() => {
    //               //   HandlerLinkedInRewrite(newId)

    //               // })




    //           } catch (error) {
    //             console.error("Error while saving resume sections", error);
    //             toast.error("Something went wrong while saving resume data");
    //           }

    //         }

    //       })
    //     }
    //     else if (res?.payload?.response?.data?.status_code === 400) {
    //       toast.error(res?.payload?.response?.data?.message, {
    //         autoClose: false
    //       })
    //     }
    //   })
    // }
    // if (profileData?.data?.signUpType?.[0]?.UserSignUpTypeMap?.sign_up_type_id === 1) {
    //   dispatch(addCountResume({ ref_type: "linkedin_resume" })).then((res) => {
    //     if (res?.payload?.status_code === 200) {
    //       dispatch(linkedInPdf(formData)).then((res) => {
    //         if (res?.payload?.status === true && res?.payload?.status_code === 201) {

    //           const newId = res.payload.created_data.id;
    //           const extractedData = res.payload.raw_data?.data;

    //           setResumeIdLkdin(newId);

    //           const checkLinkdinAtsPayload = {
    //             linkedin_resume_id: newId,
    //             raw_data: res.payload.raw_data,
    //           };

    //           Promise.all([
    //             dispatch(linkedInBasicInfo({
    //               lkdin_resume_id: newId,
    //               full_name: extractedData?.full_name || extractedData?.candidate_name,
    //               email: extractedData?.email,
    //               phone: extractedData?.phone,
    //               professional_title: extractedData?.professional_title,
    //               about: extractedData?.summary || "",
    //               description: extractedData?.description || "",
    //               location: extractedData?.location || "",
    //             })),

    //             dispatch(linkedInExpInfo({
    //               lkdin_resume_id: newId,
    //               experience_info: Array.isArray(extractedData?.experience) ? extractedData.experience : [],
    //             })),

    //             dispatch(linkedInEduInfo({
    //               lkdin_resume_id: newId,
    //               education_info: Array.isArray(extractedData?.education) ? extractedData.education : [],
    //             })),

    //             dispatch(linkedInSkillInfo({
    //               lkdin_resume_id: newId,
    //               skill_info: Array.isArray(extractedData?.skills) ? extractedData.skills : [],
    //             })),

    //             dispatch(linkedInLangInfo({
    //               lkdin_resume_id: newId,
    //               language_info: Array.isArray(extractedData?.languages) ? extractedData.languages : [],
    //             })),

    //             dispatch(checkLinkedinAtsScore(checkLinkdinAtsPayload)).then((atsRes) => {
    //               if (atsRes?.payload?.status) {
    //                 setAtsData(atsRes.payload.data);
    //                 setShowLinkdinAtsModal(true);
    //               }
    //             }),
    //           ]);
    //         }
    //       });
    //     }
    //   });
    // }

    // else {
    //   dispatch(addCountResumeOrg({ ref_type: "linkedin_resume" })).then((res) => {
    //     if (res?.payload?.status_code === 200) {
    //       dispatch(linkedInPdf(formData)).then((res) => {
    //         console.log(res, "res");
    //         if (res?.payload?.status_code === 201) {
    //           console.log("res?.payload?.created_data?.id", res?.payload?.created_data?.id);
    //           const newId = res?.payload?.created_data?.id;
    //           const checkLinkdinAtsPayload = {
    //             linkedin_resume_id: res?.payload?.created_data?.id,
    //             raw_data: res?.payload?.raw_data,
    //           }
    //           setResumeIdLkdin(newId);
    //           try {
    //             Promise.all([
    //               dispatch(linkedInBasicInfo({ lkdin_resume_id: res?.payload?.created_data?.id, ...res?.payload?.raw_data?.linkedin_rewrite_data?.personal_info })),
    //               dispatch(linkedInExpInfo({ lkdin_resume_id: res?.payload?.created_data?.id, experience_info: res?.payload?.raw_data?.linkedin_rewrite_data?.experience_info })),
    //               dispatch(linkedInEduInfo({ lkdin_resume_id: res?.payload?.created_data?.id, education_info: res?.payload?.raw_data?.linkedin_rewrite_data?.education_info })),
    //               dispatch(linkedInSkillInfo({ lkdin_resume_id: res?.payload?.created_data?.id, skill_info: res?.payload?.raw_data?.linkedin_rewrite_data?.skill_info })),
    //               dispatch(linkedInLangInfo({ lkdin_resume_id: res?.payload?.created_data?.id, language_info: res?.payload?.raw_data?.linkedin_rewrite_data?.language_info })),
    //               dispatch(checkLinkedinAtsScore(checkLinkdinAtsPayload))
    //                 .then((atsRes) => {
    //                   console.log('atsRes', atsRes);
    //                   if (atsRes?.payload?.status === true) {
    //                     setAtsData(atsRes?.payload?.data);
    //                     setShowLinkdinAtsModal(true);
    //                   } else {
    //                     toast.error("Failed to fetch ATS Score");
    //                   }
    //                 })


    //             ]).then(() => {
    //               // setOpenModalCreateResumeJd(true)
    //               HandlerLinkedInRewrite(newId)
    //             })





    //           } catch (error) {
    //             console.error("Error while saving resume sections", error);
    //             toast.error("Something went wrong while saving resume data");
    //           }

    //         }

    //       })
    //     }
    //     else if (res?.payload?.response?.data?.status_code === 400) {
    //       toast.error(res?.payload?.response?.data?.message, {
    //         autoClose: false
    //       })
    //     }
    //   })
    // }


    dispatch(linkedInPdf(formData)).then((res) => {
      const payload = res?.payload;

      if (payload?.status_code !== 201) return;

      const newId = payload?.created_data?.id;
      const resumeData = payload?.raw_data?.data;
      console.log('resumeData', resumeData)

      setResumeIdLkdin(newId);

      const checkLinkdinAtsPayload = {
        linkedin_resume_id: newId,
        raw_data: resumeData,
      };


      Promise.all([
        dispatch(
          linkedInBasicInfo({
            lkdin_resume_id: newId,

            role: resumeData?.suggested_role || null,
            full_name: resumeData?.full_name || null,
            location: resumeData?.location || null,
            description: resumeData?.professional_title || null,

            email: resumeData?.email || null,
            phone: resumeData?.phone || null,
            professional_title: resumeData?.professional_title || null,

            about: resumeData?.summary || null,
          })
        ),

        dispatch(
          linkedInExpInfo({
            lkdin_resume_id: newId,

            experience_info:
              resumeData?.experience?.steps?.[0]?.Experience?.map((exp) => ({
                id: null,

                company_name: exp?.CompanyName || "",
                position: exp?.Position || "",
                location: exp?.Location || "",

                skill_set: Array.isArray(exp?.SkillSet)
                  ? exp.SkillSet
                  : [],

                additional_information:
                  exp?.Projects?.[0]?.Description || "",

                job_type: "",

                duration: {
                  start_date: exp?.Duration?.StartDate || null,
                  end_date:
                    exp?.Duration?.EndDate === "Present"
                      ? null
                      : exp?.Duration?.EndDate,
                },

                current_work:
                  exp?.Duration?.EndDate === "Present" ? 1 : 0,

                projects:
                  exp?.Projects?.map((proj) => ({
                    title: proj?.Project_title || "",
                    role: proj?.Role || "",
                    technology: Array.isArray(proj?.technologies_used)
                      ? proj.technologies_used
                      : [],
                    description: proj?.Description || "",
                  })) || [],
              })) || [],

            experience_in_years: resumeData?.experience_in_years,
          })
        ),

        dispatch(
          linkedInEduInfo({
            lkdin_resume_id: newId,

            education_info:
              resumeData?.education?.map((edu) => ({
                id: null,

                name_of_the_institution:
                  edu?.CollegeUniversity || "",

                location: edu?.Location || "",

                field_study:
                  edu?.CourseDegree?.includes("(")
                    ? edu.CourseDegree.split("(")[0].trim()
                    : "",

                degree_name:
                  edu?.CourseDegree?.includes("(")
                    ? edu.CourseDegree.split("(")[1]?.replace(")", "").trim()
                    : edu?.CourseDegree || "",

                duration: {
                  start_date: edu?.GraduationYear
                    ? `${edu.GraduationYear}-01-01`
                    : null,

                  end_date: edu?.GraduationYear
                    ? `${edu.GraduationYear}-12-31`
                    : null,
                },

                cgpa:
                  edu?.GPAorGrade !== undefined &&
                    edu?.GPAorGrade !== null
                    ? String(edu.GPAorGrade)
                    : null,

                additional_information:
                  edu?.AdditionalInformation || "",
              })) || [],
          })
        ),

        dispatch(
          linkedInSkillInfo({
            lkdin_resume_id: newId,

            skill_info:
              resumeData?.skills?.map((group) => ({
                skill_category:
                  group?.Skill_Category ||
                  group?.skill_category ||
                  "",

                skills:
                  group?.Skills ||
                  group?.skills ||
                  [],
              })) || [],
          })
        ),

        dispatch(
          linkedInLangInfo({
            lkdin_resume_id: newId,

            language_info:
              resumeData?.languages?.map((lang) => ({
                language_name:
                  lang?.Language ||
                  lang?.language ||
                  "",

                proficiency_level:
                  lang?.Proficiency ||
                  lang?.proficiency ||
                  "",
              })) || [],
          })
        ),

        dispatch(checkLinkedinAtsScore(checkLinkdinAtsPayload)).then((atsRes) => {
          if (atsRes?.payload?.status === true) {
            setAtsData(atsRes?.payload?.data);
            setShowLinkdinAtsModal(true);
          } else {
            toast.error("Failed to fetch ATS Score");
          }
        }),
      ]).then(() => {
        // HandlerLinkedInRewrite(newId);
      });
    });



  }
  return (
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
            loading && (
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
                    Please upload LinkedIn Pdf
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
      <LinkdinAtsScoreModal
        showLinkdinAtsModal={showLinkdinAtsModal}
        setShowLinkdinAtsModal={setShowLinkdinAtsModal}
        atsData={atsData}
        onContinue={() => HandlerLinkedInRewrite(resumeIdLkdin)}

      />
    </>
  )
}
export default LinkedInReWriteModal