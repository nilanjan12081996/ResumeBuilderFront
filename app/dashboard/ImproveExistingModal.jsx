"use client";

import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { HiSparkles } from "react-icons/hi2";
import { FiFileText, FiUploadCloud, FiArrowRight } from "react-icons/fi";
import { extracteResume } from "../reducers/DashboardSlice";

const ImproveExistingModal = ({ open, onClose }) => {
  const [resumeFileName, setResumeFileName] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    if (!data.resume_file?.[0]) {
      toast.error("Please upload your resume");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume_pdf", data.resume_file[0]);

      const result = await dispatch(extracteResume(formData));
      if (!result?.payload || result.payload.status !== "success") {
        toast.error("Resume extraction failed. Please try again.");
        return;
      }

      router.push("/improve-resume-builder");
    } catch (err) {
      console.error(err);
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
              Improve Existing Resume
            </h3>
            <button className="rm-close-btn" onClick={onClose} type="button">✕</button>
          </div>
          <p className="rm-subtitle">
            Upload your resume and get AI-powered improvements instantly
          </p>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="rm-body">
          <form id="improve-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="rm-body-inner">

              {/* Resume Upload */}
              <div>
                <div className="rm-label">
                  <FiUploadCloud style={{ color: "#800080", fontSize: "1rem" }} />
                  Your Resume
                  <span className="rm-pill">PDF / DOC</span>
                </div>

                <label
                  htmlFor="improve-file-input"
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
                    id="improve-file-input"
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
            form="improve-form"
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
                  Create Resume
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

export default ImproveExistingModal;