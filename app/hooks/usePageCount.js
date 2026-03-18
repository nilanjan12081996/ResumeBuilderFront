import { useState, useEffect, useCallback, useRef } from "react";

// A4 height at 96 DPI (screen) = 297mm = ~1122px
// But resume templates use pt units internally, so we measure the actual rendered height
const A4_HEIGHT_PX = 1122; // 297mm at 96dpi

/**
 * usePageCount
 *
 * Measures the rendered height of the resume content and calculates
 * how many A4 pages it spans. Also manages current page state.
 *
 * @param {React.RefObject} contentRef  - ref attached to the resume root div
 * @param {Array}           sections    - sections array (triggers recalculation on change)
 * @param {Object}          formValues  - form values (triggers recalculation on change)
 * @param {Object}          resumeSettings - resumeSettings (triggers recalculation on change)
 *
 * @returns {Object} { currentPage, totalPages, goToPage, goNext, goPrev, pageHeightPx }
 */
const usePageCount = (contentRef, sections, formValues, resumeSettings) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const observerRef                   = useRef(null);

  const A4_H = A4_HEIGHT_PX;

  const recalculate = useCallback(() => {
    const el = contentRef?.current;
    if (!el) return;

    const height     = el.scrollHeight;
    const pages      = Math.max(1, Math.ceil(height / A4_H));
    setTotalPages(pages);

    // If current page is now out of range, clamp it
    setCurrentPage((prev) => Math.min(prev, pages));
  }, [contentRef, A4_H]);

  // Recalculate when content changes
  useEffect(() => {
    // Small delay to let the DOM paint
    const timer = setTimeout(recalculate, 150);
    return () => clearTimeout(timer);
  }, [sections, formValues, resumeSettings, recalculate]);

  // ResizeObserver to detect layout shifts
  useEffect(() => {
    const el = contentRef?.current;
    if (!el) return;

    observerRef.current = new ResizeObserver(() => {
      recalculate();
    });
    observerRef.current.observe(el);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [contentRef, recalculate]);

  // Scroll the viewer to the correct page
  const scrollToPage = useCallback(
    (page) => {
      const container = contentRef?.current?.parentElement;
      if (!container) return;
      container.scrollTo({ top: (page - 1) * A4_H, behavior: "smooth" });
    },
    [contentRef, A4_H]
  );

  const goToPage = useCallback(
    (page) => {
      const clamped = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(clamped);
      scrollToPage(clamped);
    },
    [totalPages, scrollToPage]
  );

  const goNext = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const goPrev = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  return {
    currentPage,
    totalPages,
    goToPage,
    goNext,
    goPrev,
    pageHeightPx: A4_H,
  };
};

export default usePageCount;