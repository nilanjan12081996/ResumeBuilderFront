"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const A4_H = 1122; // 297mm at 96dpi

const ResumePageViewer = ({ children, contentRef, sections, formValues, resumeSettings }) => {
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Calculate total pages
const recalculate = useCallback(() => {
  const el = contentRef?.current;
  if (!el) return;

  // Temporarily remove constraints to measure true content height
  const prev = {
    overflow: el.style.overflow,
    height: el.style.height,
    maxHeight: el.style.maxHeight,
  };

  el.style.overflow = 'visible';
  el.style.height = 'auto';
  el.style.maxHeight = 'none';

  const naturalHeight = el.scrollHeight;

  // Restore
  el.style.overflow = prev.overflow;
  el.style.height = prev.height;
  el.style.maxHeight = prev.maxHeight;

 const pages = Math.max(1, Math.ceil((naturalHeight - 3) / A4_H));
  setTotalPages(pages);
}, [contentRef]);

  useEffect(() => {
    const timer = setTimeout(recalculate, 200);
    return () => clearTimeout(timer);
  }, [sections, formValues, resumeSettings, recalculate]);

  useEffect(() => {
    const el = contentRef?.current;
    if (!el) return;
    const obs = new ResizeObserver(() => recalculate());
    obs.observe(el);
    return () => obs.disconnect();
  }, [contentRef, recalculate]);

  // Track scroll → update currentPage
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => {
      const page = Math.round(container.scrollTop / A4_H) + 1;
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [totalPages]);

  const goToPage = useCallback((page) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clamped);
    scrollRef.current?.scrollTo({ top: (clamped - 1) * A4_H, behavior: "smooth" });
  }, [totalPages]);

  return (
    <div className="flex flex-col h-screen bg-[#f0f0f0]">

      {/* Resume viewport */}
      <div className="flex-1 overflow-hidden relative">
        <div ref={scrollRef} className="h-full overflow-y-scroll hide-scrollbar">
          {children}
        </div>

        {/* Bottom fade */}
        {totalPages > 1 && currentPage < totalPages && (
          <div
            className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(240,240,240,0.9))" }}
          />
        )}
      </div>

      {/* Navigation — always render when totalPages > 1 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-3 bg-[#f0f0f0] border-t border-gray-200 shrink-0">

          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow transition-all duration-200
              ${currentPage <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                : "bg-white text-gray-700 hover:bg-[#800080] hover:text-white cursor-pointer"
              }`}
          >
            <FiChevronLeft className="text-lg" />
          </button>

          <span className="text-sm font-semibold text-gray-600 min-w-[48px] text-center">
            {currentPage} / {totalPages}
          </span>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`rounded-full transition-all duration-200 ${
                  i + 1 === currentPage
                    ? "w-5 h-2 bg-[#800080]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow transition-all duration-200
              ${currentPage >= totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                : "bg-white text-gray-700 hover:bg-[#800080] hover:text-white cursor-pointer"
              }`}
          >
            <FiChevronRight className="text-lg" />
          </button>

        </div>
      )}
    </div>
  );
};

export default ResumePageViewer;