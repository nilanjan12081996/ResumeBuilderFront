"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { FiZoomIn, FiZoomOut, FiChevronLeft, FiChevronRight, FiMove } from "react-icons/fi";

const A4_W = 794;
const A4_H = 1123;

const TEMPLATE_PAGE_BREAK_MAP = {
  "prime ats": 1123,
  "prime": 1123,
  "primeats": 1123,
  "professional": 1123,
  "executive": 1123,
  "clear": 1123,
  "minimalist": 1123,
  "clean": 1123,
  "essential": 1123,
  "corporate": 1123,
  "industry standard": 1123,
  "vivid": 1123,
  "linkedin prime": 1123,
  "linkedinprime": 1123,
};
const DEFAULT_PAGE_BREAK_H = 1123;

/**
 * Simulate PDF page-break-inside:avoid behaviour in the browser preview.
 *
 * For every page boundary at (prevCut + pageBreakH) we check whether any
 * avoid-break element (li, p, skill-row div etc.) would be split by that cut.
 * If yes we move the cut to just before that element's top — exactly what the
 * PDF engine does.  This makes each preview page end at the same content line
 * as the corresponding PDF page.
 */
function computePagination(container, pageBreakH, templateName) {
  const containerTop = container.getBoundingClientRect().top;
  const isSidebarTemplate = templateName && ["corporate", "industry standard", "professional", "executive", "clean", "essential", "clear", "minimalist"].includes(templateName.toLowerCase());
  const hasTfoot = isSidebarTemplate && !["corporate", "industry standard"].includes(templateName.toLowerCase());
  const theadH = isSidebarTemplate ? 20 : 0;
  const tfootH = hasTfoot ? 20 : 0;

  const avoidElsArray = Array.from(container.querySelectorAll('.section-heading, .resume-content li, .resume-content p, [style*="avoid"]'));
  const avoidEls = [];
  
  avoidElsArray.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const x = Math.round(rect.left - container.getBoundingClientRect().left);
    const top = Math.round(rect.top - containerTop);
    const height = Math.round(rect.height);
    if (height > 0 && top < container.scrollHeight) {
      avoidEls.push({ el, index, x, top, height, bottom: top + height });
    }
  });

  avoidEls.sort((a, b) => a.top - b.top);

  const columnShifts = {};
  const mutations = [];

  const getNextBoundary = (y) => {
    let boundary = 0;
    let pageIdx = 0;
    while (boundary <= y) {
      let capacity = pageBreakH;
      if (isSidebarTemplate) {
        if (pageIdx === 0) capacity = pageBreakH - tfootH;
        else capacity = pageBreakH - tfootH - theadH;
      }
      boundary += capacity;
      pageIdx++;
    }
    return boundary;
  };

  avoidEls.forEach(item => {
    let colKey = Object.keys(columnShifts).find(k => Math.abs(parseInt(k) - item.x) < 50);
    if (!colKey) {
      colKey = item.x.toString();
      columnShifts[colKey] = 0;
    }

    const shift = columnShifts[colKey];
    const topWithShift = item.top + shift;
    const bottomWithShift = topWithShift + item.height;

    const nextBoundary = getNextBoundary(topWithShift);

    const BOTTOM_MARGIN = 15; // User requested ~10px gap
    const TOP_MARGIN = 20;    // Reduced top margin to align with a small gap

    if (bottomWithShift > nextBoundary - BOTTOM_MARGIN && item.height < pageBreakH * 0.8) {
      let targetItem = item;
      let targetTopWithShift = topWithShift;

      let currentItem = item;

      // Only attach to the immediate heading, don't climb multiple levels
      // Actually, to maximize page filling as requested by the user, we should NOT drag headings
      // that are far away. We just push the exact element that crossed the boundary.
      // Removed the while(true) loop to prevent entire sections from being pushed to the next page.

      const pushAmount = (nextBoundary + TOP_MARGIN) - targetTopWithShift;
      columnShifts[colKey] += pushAmount;
      mutations.push({ index: targetItem.index, marginTop: pushAmount });
    }
  });

  const totalH = container.scrollHeight;
  const maxShift = Math.max(0, ...Object.values(columnShifts), 0);
  const newTotalH = totalH + maxShift;

  const breaks = [];
  let boundary = 0;
  let pageIdx = 0;
  while (true) {
    let capacity = pageBreakH;
    if (isSidebarTemplate) {
      if (pageIdx === 0) capacity = pageBreakH - tfootH;
      else capacity = pageBreakH - tfootH - theadH;
    }
    boundary += capacity;
    if (boundary >= newTotalH) break;
    breaks.push(boundary);
    pageIdx++;
  }

  return { breaks, mutations };
}

const ResumePageViewer = ({ children, sections, formValues, resumeSettings, contentRef, rawContentRef }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1);
  const [baseScale, setBaseScale] = useState(1);
  const [isAutoFit, setIsAutoFit] = useState(true);
  const [isPanMode, setIsPanMode] = useState(false);
  const [safeBreaks, setSafeBreaks] = useState([]);
  const [mutations, setMutations] = useState([]);

  const containerRef = useRef(null);
  const internalMeasurementRef = useRef(null);
  const measurementRef = rawContentRef || internalMeasurementRef;
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [coords, setCoords] = useState({ startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });

  const templateName = (
    resumeSettings?.theme?.template ||
    resumeSettings?.templateName ||
    resumeSettings?.templateId ||
    ""
  ).toLowerCase();

  const themeColor =
    resumeSettings?.theme?.templateColors?.[templateName] ||
    resumeSettings?.theme?.defaultColor ||
    resumeSettings?.themeColor ||
    "#800080";

  const pageBreakH = TEMPLATE_PAGE_BREAK_MAP[templateName] ?? DEFAULT_PAGE_BREAK_H;

  const recalculate = useCallback(() => {
    const el = measurementRef.current;
    if (!el) return;

    const result = computePagination(el, pageBreakH, templateName);
    setSafeBreaks(result.breaks);
    setMutations(result.mutations);
    setTotalPages(result.breaks.length + 1);

    if (containerRef.current) {
      const fitScale = containerRef.current.clientWidth / A4_W;
      setBaseScale(fitScale);
      if (isAutoFit) setScale(fitScale);
    }
  }, [isAutoFit, pageBreakH]);

  useEffect(() => {
    const t = setTimeout(recalculate, 600);
    return () => clearTimeout(t);
  }, [sections, formValues, resumeSettings, recalculate]);

  useEffect(() => {
    const el = measurementRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => recalculate());
    obs.observe(el);
    window.addEventListener("resize", recalculate);
    return () => { obs.disconnect(); window.removeEventListener("resize", recalculate); };
  }, [recalculate]);

  // Ref array for visible page containers
  const visiblePagesRef = useRef([]);

  useEffect(() => {
    const insertedSpacers = [];

    const containersToProcess = [...visiblePagesRef.current];
    if (contentRef && contentRef.current) {
      Array.from(contentRef.current.children).forEach(child => {
        containersToProcess.push(child);
      });
    }

    containersToProcess.forEach((container) => {
      if (!container) return;
      const avoidEls = Array.from(container.querySelectorAll('.section-heading, .resume-content li, .resume-content p, [style*="avoid"]'));
      
      mutations.forEach(({ index, marginTop }) => {
        if (avoidEls[index] && marginTop > 0) {
          const el = avoidEls[index];
          const tagName = el.tagName.toLowerCase();
          const isLi = tagName === 'li';
          const isTr = tagName === 'tr';
          
          let spacer;
          if (isTr) {
            spacer = document.createElement('tr');
            spacer.className = 'pdf-parity-spacer';
            const td = document.createElement('td');
            td.colSpan = 100;
            td.style.height = `${marginTop}px`;
            td.style.padding = '0';
            td.style.border = 'none';
            spacer.appendChild(td);
          } else {
            spacer = document.createElement(isLi ? 'li' : 'div');
            spacer.className = 'pdf-parity-spacer';
            spacer.style.height = `${marginTop}px`;
            spacer.style.width = '100%';
            spacer.style.flexShrink = '0';
            if (isLi) {
              spacer.style.listStyle = 'none';
              spacer.style.margin = '0';
              spacer.style.padding = '0';
            }
          }
          el.parentNode.insertBefore(spacer, el);
          insertedSpacers.push(spacer);
        }
      });
    });

    return () => {
      insertedSpacers.forEach(spacer => {
        if (spacer.parentNode) spacer.parentNode.removeChild(spacer);
      });
    };
  }, [mutations, safeBreaks, children]);

  const handleZoomIn = () => { setScale(p => Math.min(2, p + 0.1)); setIsAutoFit(false); };
  const handleZoomOut = () => { setScale(p => Math.max(0.2, p - 0.1)); setIsAutoFit(false); };

  const onMouseDown = (e) => {
    if (!isPanMode) return;
    setIsDragging(true);
    const c = scrollContainerRef.current;
    setCoords({ startX: e.pageX - c.offsetLeft, startY: e.pageY - c.offsetTop, scrollLeft: c.scrollLeft, scrollTop: c.scrollTop });
  };
  const onMouseMove = (e) => {
    if (!isDragging || !isPanMode) return;
    e.preventDefault();
    const c = scrollContainerRef.current;
    c.scrollLeft = coords.scrollLeft - (e.pageX - c.offsetLeft - coords.startX) * 1.5;
    c.scrollTop = coords.scrollTop - (e.pageY - c.offsetTop - coords.startY) * 1.5;
  };

  // start and height of each page's content slice
  // Each page shows content between its break points, matching the PDF engine.
  const getPageSlice = (idx) => {
    const start = idx === 0 ? 0 : (safeBreaks[idx - 1] ?? idx * pageBreakH);
    const end = safeBreaks[idx] ?? ((idx + 1) * pageBreakH);
    const sliceH = end - start;
    return { start, sliceH, pageH: pageBreakH };
  };

  const displayScale = Math.round((scale / baseScale) * 100);

  const pdfResetStyles = `
    .resume-document table { border-collapse: collapse; }
    .resume-document td { vertical-align: top; }
    .resume-document a { color: inherit; text-decoration: none; }
    .resume-document ul { list-style-type: disc; padding-left: 1.2rem; margin: 0.25rem 0; }
    .resume-document ol { list-style-type: decimal; padding-left: 1.2rem; margin: 0.25rem 0; }
    .resume-document li { margin-bottom: 0.15rem; }
    .resume-document p { margin: 0.1rem 0; }
  `;

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] overflow-hidden select-none relative" ref={containerRef}>
      <style>{pdfResetStyles}</style>
      
      {/* Off-screen measurement container */}
      <div className="fixed -left-[9999px] top-0 w-[794px] pdf-measurement-box resume-document" ref={measurementRef}>
        {children}
      </div>

      {/* Hidden export wrapper: This is what gets sent to the PDF generator. 
          It contains the EXACT same slices as the visible UI, ensuring 100% parity. */}
      <div ref={contentRef} style={{ display: 'none' }}>
        {Array.from({ length: totalPages }).map((_, idx) => {
          const { start, sliceH } = getPageSlice(idx);
          return (
            <div key={`export-${idx}`} style={{ 
              width: `${A4_W}px`, 
              height: `${A4_H}px`, 
              backgroundColor: "#fff",
              position: "relative",
              overflow: "hidden",
              pageBreakAfter: "always",
              paddingTop: "0px",
              boxSizing: "border-box"
            }}>
              <div style={{ height: `${sliceH}px`, overflow: "hidden", width: "100%", position: 'relative' }}>
                <div style={{ transform: `translateY(-${start}px)`, width: "100%", position: 'relative' }}>
                  {children}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        ref={scrollContainerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        className={`flex-1 relative overflow-auto custom-preview-scrollbar flex flex-col items-center ${isPanMode ? "cursor-grab active:cursor-grabbing" : ""}`}
      >
        <div
          className="m-auto py-4 flex flex-col items-center !py-0 shadow-[0_30px_80px_rgba(0,0,0,0.12)] rounded-sm"
          style={{ width: A4_W * scale, minWidth: A4_W * scale, height: A4_H * scale, minHeight: A4_H * scale }}
        >
          <div style={{ overflow: "hidden", width: "100%", height: "100%", borderRadius: "0.125rem" }}>
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)`, width: `${totalPages * 100}%`, display: "flex" }}
          >
            {Array.from({ length: totalPages }).map((_, idx) => {
              const { start, sliceH, pageH } = getPageSlice(idx);
              return (
                <div key={idx} className="w-full h-full flex justify-start flex-shrink-0">
                  <div
                    style={{
                      width: A4_W,
                      height: A4_H,
                      transform: `scale(${scale})`,
                      transformOrigin: "top left",
                      paddingTop: ["corporate", "industry standard", "professional", "executive", "clean", "essential", "clear", "minimalist"].includes(templateName?.toLowerCase()) && idx > 0 ? "20px" : "0px",
                      background: (() => {
                        const tn = templateName?.toLowerCase() || '';
                        if (tn === 'corporate' || tn === 'industry standard') {
                          return "#ffffff";
                        }
                        if (tn === 'professional' || tn === 'executive') {
                          return `linear-gradient(to right, ${themeColor} 0%, ${themeColor} 35%, #fff 35%, #fff 100%)`;
                        }
                        if (tn === 'clear' || tn === 'clarity' || tn === 'minimalist' || tn === 'linkedin prime' || tn === 'linkedinprime') {
                          return "#ffffff";
                        }
                        return "#ffffff";
                      })()
                    }}
                    className="relative overflow-hidden flex flex-col items-center"
                  >
                    <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                      <div
                        className="w-full overflow-hidden resume-view-container pdf-parity-fix resume-document"
                        style={{ height: sliceH, overflow: "hidden", width: "100%", position: 'relative' }}
                      >
                        <div 
                          ref={el => visiblePagesRef.current[idx] = el}
                          style={{ transform: `translateY(-${start}px)`, width: "100%", position: 'relative' }}
                        >
                          {children}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="h-16 bg-white flex items-center justify-between px-10 z-40 shadow-[0_-15px_40px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-2xl">
          <button onClick={handleZoomOut} className="p-2 cursor-pointer hover:bg-white rounded-xl text-gray-400 hover:text-indigo-600 transition-all"><FiZoomOut size={18} /></button>
          <div className="px-2 min-w-[50px] text-center">
            <span className="text-[11px] font-black text-gray-700">{displayScale}%</span>
          </div>
          <button onClick={handleZoomIn} className="p-2 cursor-pointer hover:bg-white rounded-xl text-gray-400 hover:text-indigo-600 transition-all"><FiZoomIn size={18} /></button>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className={`p-3 rounded-full transition-all border ${currentPage === 0 ? "text-gray-100 cursor-not-allowed" : "cursor-pointer text-indigo-600 border-indigo-100 hover:bg-indigo-50 active:scale-95"}`}
          ><FiChevronLeft size={22} /></button>
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-sm font-black text-indigo-600">{currentPage + 1} / {totalPages}</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Page</span>
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className={`p-3 rounded-full transition-all border ${currentPage === totalPages - 1 ? "text-gray-200 border-gray-100 cursor-not-allowed" : "cursor-pointer text-indigo-600 border-indigo-100 hover:bg-indigo-50 active:scale-95"}`}
          ><FiChevronRight size={22} /></button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <button
              onClick={() => setIsPanMode(!isPanMode)}
              className={`p-3 cursor-pointer rounded-2xl border transition-all ${isPanMode ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-gray-400 hover:bg-indigo-50 hover:text-indigo-600"}`}
            ><FiMove size={20} /></button>
            <div className="absolute bottom-[calc(100%+12px)] right-0 w-[200px] bg-slate-900 text-slate-200 text-[11px] font-medium p-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none text-center leading-relaxed z-50">
              <span className="font-bold text-indigo-400 block mb-1">Pan Tool</span>
              Click and drag the document to move around freely while zoomed in.
              <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-slate-900 rotate-45 rounded-sm"></div>
            </div>
          </div>
          
          <div className="relative group">
            <button
              onClick={() => { setIsAutoFit(true); recalculate(); }}
              className={`px-6 py-2.5 cursor-pointer rounded-2xl text-[10px] font-black uppercase tracking-wider border transition-all ${isAutoFit ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-gray-400 hover:bg-indigo-50 hover:text-indigo-600"}`}
            >Auto Fit</button>
            <div className="absolute bottom-[calc(100%+12px)] right-0 w-[220px] bg-slate-900 text-slate-200 text-[11px] font-medium p-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none text-center leading-relaxed z-50">
              <span className="font-bold text-indigo-400 block mb-1">Auto Fit</span>
              Restores the resume back to its perfectly fitted default size after zooming.
              <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-slate-900 rotate-45 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-preview-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-preview-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-preview-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-preview-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .pdf-measurement-box, .resume-view-container {
          width: 794px !important; max-width: 794px !important;
          min-width: 794px !important; line-height: 1.5 !important;
          box-sizing: border-box !important;
        }
        .pdf-parity-fix * {
          box-sizing: border-box !important;
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      `}</style>
    </div>
  );
};

export default ResumePageViewer;