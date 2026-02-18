"use client";

import { FileInput, Label, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiImport } from "react-icons/bi";
import { HiClipboardList } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { extracteResume } from "../reducers/DashboardSlice";

const LinkedInReWriteModal = ({ 
  openModalImproveexistingResume, 
  setOpenModalImproveexistingResume 
}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const resumeFile = watch("resume_file");

  const handleResumeImprove = async (data) => {
    if (!data.resume_file || !data.resume_file[0]) {
      toast.error("Please select resume file");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume_pdf", data.resume_file[0]);

      const improveRes = await dispatch(extracteResume(formData));
      const improvePayload = improveRes?.payload;

      if (!improvePayload || improvePayload.status !== "success") {
        toast.error("Resume extraction failed");
        return;
      }

      // toast.success("Resume extracted successfully!");
      router.push("/linkedIn-rewrite");

    } catch (error) {
      // toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      size="lg"
      className="apply_modal_area"
      show={openModalImproveexistingResume}
      onClose={() => setOpenModalImproveexistingResume(false)}
    >
      <ModalHeader className="bg-white text-black modal_header">
        <div className="flex items-center gap-1">
          <HiClipboardList className="text-[#800080] text-3xl" />
          LinkedIn Rewrite
        </div>
      </ModalHeader>

      <ModalBody className="bg-white p-0 rounded-b-[4px]">
        <form onSubmit={handleSubmit(handleResumeImprove)}>
          <div className="lg:flex gap-5 p-5">
            <div className="w-full">
              <div className="flex w-full items-center justify-center">
                <Label
                  htmlFor="dropzone-file"
                  className="resume_upload_box_small flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <BiImport className="text-[50px] lg:text-[70px] text-[#92278F]" />
                    <p className="mb-2 text-base lg:text-xl text-[#92278F]">
                      {resumeFile && resumeFile[0]
                        ? resumeFile[0].name
                        : "Import your Resume"}
                    </p>
                    {resumeFile && resumeFile[0] && (
                      <p className="text-sm text-green-600">
                        File selected successfully
                      </p>
                    )}
                  </div>

                  <FileInput
                    id="dropzone-file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    {...register("resume_file", { required: true })}
                    aria-invalid={errors.resume_file ? "true" : "false"}
                  />
                </Label>
              </div>

              {errors.resume_file?.type === "required" && (
                <p className="text-red-700 text-sm" role="alert">
                  Please upload the resume
                </p>
              )}
            </div>
          </div>

          <div className="p-5 inset-shadow-xs">
            <button
              disabled={loading}
              className={`bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-white font-semibold w-full text-center rounded-[7px]
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default LinkedInReWriteModal;
