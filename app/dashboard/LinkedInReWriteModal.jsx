"use client";

import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { HiSparkles } from "react-icons/hi2";
import { FiFileText, FiUploadCloud, FiArrowRight } from "react-icons/fi";
import { extracteResume, resetDashboard } from "../reducers/DashboardSlice";
import { addCountResume, addCountResumeOrg } from "../reducers/ResumeSlice";


const LinkedInReWriteModal = ({ open, onClose }) => {
  const [resumeFileName, setResumeFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const { profileData } = useSelector((state) => state?.profile);

  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const resumeFile = watch("resume_file");

  useEffect(() => {
    if (resumeFile?.[0]) setResumeFileName(resumeFile[0].name);
  }, [resumeFile]);

  useEffect(() => {
    if (!open) {
      setResumeFileName(null);
      setDragOver(false);
      reset();
    }
  }, [open, reset]);

  // const onSubmit = async (data) => {
  //   if (!data.resume_file?.[0]) {
  //     toast.error("Please upload your resume");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     dispatch(resetDashboard());
  //     const formData = new FormData();
  //     formData.append("resume_pdf", data.resume_file[0]);

  //     const result = await dispatch(extracteResume(formData));
  //     if (!result?.payload || result.payload.status !== "success") {
  //       toast.error("Resume extraction failed. Please try again.");
  //       return;
  //     }

  //     router.push("/linkedIn-rewrite");
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const onSubmit = async (data) => {
    if (!data.resume_file?.[0]) {
      toast.error("Please upload your resume");
      return;
    }

    setLoading(true);
    try {
      const isIndividual = profileData?.data?.signUpType?.[0]?.UserSignUpTypeMap?.sign_up_type_id === 1;
      const countAction = isIndividual ? addCountResume : addCountResumeOrg;

      const countRes = await dispatch(countAction({ ref_type: "linkedin_resume" })).unwrap();
      if (countRes?.status_code === 200) {
        dispatch(resetDashboard());
        const formData = new FormData();
        formData.append("resume_pdf", data.resume_file[0]);

        const result = await dispatch(extracteResume(formData));
        if (!result?.payload || result.payload.status !== "success") {
          toast.error("Resume extraction failed. Please try again.");
          return;
        }

        router.push("/linkedIn-rewrite");
      } else {
        toast.error(countRes?.message || "Your plan limit is expired, please upgrade!");
      }

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      size="lg"
      className="resume-modal-narrow"
      show={open}
      onClose={onClose}
    >
      <div className="rm-wrap">

        {/* ── Header ── */}
        <div className="rm-header">
          <div className="rm-header-row">
            <h3 className="rm-title">
              <HiSparkles style={{ fontSize: "1.1rem", color: "#e0aaff" }} />
              LinkedIn Rewrite
            </h3>
            <button className="rm-close-btn" onClick={onClose} type="button">✕</button>
          </div>
          <p className="rm-subtitle">
            Upload your resume and we'll craft a standout LinkedIn profile
          </p>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="rm-body">
          <form id="linkedin-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="rm-body-inner">

              {/* Resume Upload */}
              <div>
                <div className="rm-label">
                  <FiUploadCloud style={{ color: "#800080", fontSize: "1rem" }} />
                  Your Resume
                  <span className="rm-pill">PDF / DOC</span>
                </div>

                <label
                  htmlFor="linkedin-file-input"
                  className={`rm-upload-zone${dragOver ? " drag-over" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={() => setDragOver(false)}
                >
                  <div className="rm-upload-inner">
                    <div className="rm-upload-ring">
                      {resumeFileName
                        ? <FiFileText style={{ fontSize: "1.5rem", color: "#800080" }} />
                        : <FiUploadCloud style={{ fontSize: "1.5rem", color: "#800080" }} />
                      }
                    </div>
                    <span className="rm-upload-title">
                      {resumeFileName ? "Resume Selected" : "Drop your resume here"}
                    </span>
                    {resumeFileName
                      ? <div className="rm-file-badge">✓ {resumeFileName}</div>
                      : <span className="rm-upload-sub">or click to browse · PDF, DOC, DOCX</span>
                    }
                  </div>
                  <input
                    id="linkedin-file-input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: "none" }}
                    {...register("resume_file", { required: "Please upload your resume" })}
                  />
                </label>

                {errors.resume_file && (
                  <p className="text-red-600 text-xs mt-1">{errors.resume_file.message}</p>
                )}
              </div>

            </div>
          </form>
        </div>

        {/* ── Sticky Footer ── */}
        <div className="rm-footer">
          <button
            type="submit"
            form="linkedin-form"
            disabled={loading}
            className="rm-submit-btn"
          >
            <div className="btn-inner">
              {loading ? (
                <>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ animation: "rmSpin 0.9s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Processing your resume…
                </>
              ) : (
                <>
                  <HiSparkles style={{ fontSize: "1rem" }} />
                  Create Rewrite
                  <FiArrowRight style={{ fontSize: "0.95rem" }} />
                </>
              )}
            </div>
            {!loading && <div className="rm-shimmer" />}
          </button>
        </div>

      </div>
    </Modal>
  );
};

export default LinkedInReWriteModal;



// "use client";

// import { FileInput, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { BiImport } from "react-icons/bi";
// import { HiClipboardList } from "react-icons/hi";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { extracteResume } from "../reducers/DashboardSlice";

// const LinkedInReWriteModal = ({
//   openModalImproveexistingResume,
//   setOpenModalImproveexistingResume
// }) => {
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();

//   const resumeFile = watch("resume_file");

//   const handleResumeImprove = async (data) => {
//     if (!data.resume_file || !data.resume_file[0]) {
//       toast.error("Please select resume file");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("resume_pdf", data.resume_file[0]);

//       const improveRes = await dispatch(extracteResume(formData));
//       const improvePayload = improveRes?.payload;

//       if (!improvePayload || improvePayload.status !== "success") {
//         toast.error("Resume extraction failed");
//         return;
//       }

//       // toast.success("Resume extracted successfully!");
//       router.push("/linkedIn-rewrite");

//     } catch (error) {
//       // toast.error("Something went wrong. Please try again.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       size="lg"
//       className="apply_modal_area"
//       show={openModalImproveexistingResume}
//       onClose={() => setOpenModalImproveexistingResume(false)}
//     >
//       <ModalHeader className="bg-white text-black modal_header">
//         <div className="flex items-center gap-1">
//           <HiClipboardList className="text-[#800080] text-3xl" />
//           LinkedIn Rewrite
//         </div>
//       </ModalHeader>

//       <ModalBody className="bg-white p-0 rounded-b-[4px]">
//         <form onSubmit={handleSubmit(handleResumeImprove)}>
//           <div className="lg:flex gap-5 p-5">
//             <div className="w-full">
//               <div className="flex w-full items-center justify-center">
//                 <Label
//                   htmlFor="dropzone-file"
//                   className="resume_upload_box_small flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100"
//                 >
//                   <div className="flex flex-col items-center justify-center pb-6 pt-5">
//                     <BiImport className="text-[50px] lg:text-[70px] text-[#92278F]" />
//                     <p className="mb-2 text-base lg:text-xl text-[#92278F]">
//                       {resumeFile && resumeFile[0]
//                         ? resumeFile[0].name
//                         : "Import your Resume"}
//                     </p>
//                     {resumeFile && resumeFile[0] && (
//                       <p className="text-sm text-green-600">
//                         File selected successfully
//                       </p>
//                     )}
//                   </div>

//                   <FileInput
//                     id="dropzone-file"
//                     className="hidden"
//                     accept=".pdf,.doc,.docx"
//                     {...register("resume_file", { required: true })}
//                     aria-invalid={errors.resume_file ? "true" : "false"}
//                   />
//                 </Label>
//               </div>

//               {errors.resume_file?.type === "required" && (
//                 <p className="text-red-700 text-sm" role="alert">
//                   Please upload the resume
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="p-5 inset-shadow-xs">
//             <button
//               disabled={loading}
//               className={`bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-white font-semibold w-full text-center rounded-[7px]
//               ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//             >
//               {loading ? "Processing..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </ModalBody>
//     </Modal>
//   );
// };

// export default LinkedInReWriteModal;
