"use client";

import { FileInput, Label, Modal, ModalBody, ModalHeader, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiImport } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { extracteResume, fetchMissingSkills } from "../reducers/DashboardSlice"; // adjust path

const JdbasedModal = ({ openModalImproveexistingResume, setOpenModalImproveexistingResume }) => {
  const [resumeFileName, setResumeFileName] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const resumeFile = watch("resume_file");

  useEffect(() => {
    if (resumeFile && resumeFile[0]) {
      setResumeFileName(resumeFile[0].name);
    }
  }, [resumeFile]);

  const handleResumeImprove = async (data) => {
    if (!data.resume_file || !data.resume_file[0]) {
      toast.error("Please select resume PDF");
      return;
    }
    if (!data.job_description) {
      toast.error("Job Description is required");
      return;
    }

    setLoading(true);

    try {
      sessionStorage.setItem("target_jd", data.job_description);

      const formData = new FormData();
      formData.append("resume_pdf", data.resume_file[0]);

      const improveRes = await dispatch(extracteResume(formData));
      const improvePayload = improveRes?.payload;

      if (!improvePayload || improvePayload.status !== "success") {
        toast.error("Resume extraction failed: base resume issue");
        setLoading(false);
        return;
      }

      toast.success("Resume extracted successfully!");
      router.push("/jd-resume-builder");

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    handleResumeImprove(data);
  };

  return (
    <Modal
      size="xl"
      className="apply_modal_area"
      show={openModalImproveexistingResume}
      onClose={() => setOpenModalImproveexistingResume(false)}
    >
      <ModalHeader className="bg-white text-black modal_header">
        JD based resume
      </ModalHeader>
      <ModalBody className="bg-white p-5 rounded-b-[4px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Resume Upload Box */}
          <div className="flex flex-col items-center">
            <Label
              htmlFor="dropzone-file"
              className="resume_upload_box_small flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <BiImport className="text-[70px] text-[#92278F]" />
                <p className="mb-2 text-xl text-[#92278F]">
                  {resumeFileName || "Import your Resume"}
                </p>
                {resumeFileName && (
                  <p className="text-sm text-green-600">File selected successfully</p>
                )}
              </div>
              <FileInput
                id="dropzone-file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                {...register("resume_file", { required: "Please upload the resume" })}
              />
            </Label>
            {errors.resume_file && (
              <p className="text-red-700 text-sm mt-1">{errors.resume_file.message}</p>
            )}
          </div>

          {/* Job Description */}
          <div className="w-full resume_form_box">
            <div className="mb-1 block">
              <Label htmlFor="job_description">
                Job Description <span>*</span>
              </Label>
            </div>
            <Textarea
              id="job_description"
              placeholder="Write a little bit about your job..."
              rows={10}
              {...register("job_description", { required: "Job Description is required" })}
              aria-invalid={errors.job_description ? "true" : "false"}
            />
            {errors.job_description && (
              <p className="text-red-700 text-sm mt-1">{errors.job_description.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default JdbasedModal;
