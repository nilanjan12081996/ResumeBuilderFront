"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { FiZoomIn, FiZoomOut, FiChevronLeft, FiChevronRight, FiMove } from "react-icons/fi";

const A4_W = 794;
const A4_H = 1123;

const TEMPLATE_PAGE_BREAK_MAP = {
  "prime ats": 1048,
  "prime": 1048,
  "primeats": 1048,
  "professional": 1064,
  "clear": 1065,
  "clean": 1048,
  "corporate": 1081,
  "vivid": 1028,
  "linkedin prime": 1048,
  "linkedinprime": 1048,
};
const DEFAULT_PAGE_BREAK_H = 1048;

/**
 * Use Range.getClientRects() to find individual text-line positions.
 * This is the only browser API that exposes per-line geometry.
 * We find the last complete text line before each pageBreakH boundary.
 */
function computeSafeBreaks(container, pageBreakH) {
  const totalH = container.scrollHeight;
  if (totalH <= pageBreakH) return [];

  const containerTop = container.getBoundingClientRect().top;

  // Collect bottom-Y of every rendered text line
  const lineBottoms = new Set();
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!node.textContent.trim()) continue;
    try {
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = range.getClientRects();
      for (const r of rects) {
        if (r.height > 1) {
          // Round to avoid sub-pixel jitter
          lineBottoms.add(Math.round(r.bottom - containerTop));
        }
      }
    } catch (_) { /* skip inaccessible nodes */ }
  }

  const sorted = Array.from(lineBottoms).sort((a, b) => a - b);

  const breaks = [];
  let pageStart = 0;

  while (true) {
    const targetBreak = pageStart + pageBreakH;
    if (targetBreak >= totalH) break;

    // Last text line that fully fits within this page
    const fitting = sorted.filter(b => b > pageStart && b <= targetBreak);
    const safeCut = fitting.length > 0
      ? fitting[fitting.length - 1]   // last complete line
      : targetBreak;                   // fallback: hard cut

    breaks.push(safeCut);
    pageStart = safeCut;
  }

  return breaks;
}

const ResumePageViewer = ({ children, sections, formValues, resumeSettings }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1);
  const [baseScale, setBaseScale] = useState(1);
  const [isAutoFit, setIsAutoFit] = useState(true);
  const [isPanMode, setIsPanMode] = useState(false);
  const [safeBreaks, setSafeBreaks] = useState([]);

  const containerRef = useRef(null);
  const measurementRef = useRef(null);
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

    const breaks = computeSafeBreaks(el, pageBreakH);
    setSafeBreaks(breaks);
    setTotalPages(breaks.length + 1);

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
  const getPageSlice = (idx) => {
    const start = idx === 0 ? 0 : (safeBreaks[idx - 1] ?? idx * pageBreakH);
    const end = safeBreaks[idx] ?? (start + pageBreakH);
    return { start, pageH: end - start };
  };

  const displayScale = Math.round((scale / baseScale) * 100);

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] overflow-hidden select-none relative" ref={containerRef}>
      {/* Off-screen measurement container */}
      <div className="fixed -left-[9999px] top-0 w-[794px] pdf-measurement-box" ref={measurementRef}>
        {children}
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
              const { start, pageH } = getPageSlice(idx);
              return (
                <div key={idx} className="w-full h-full flex justify-start flex-shrink-0">
                  <div
                    style={{
                      width: A4_W,
                      height: A4_H,
                      transform: `scale(${scale})`,
                      transformOrigin: "top left",
                      paddingTop: idx > 0 ? `${(A4_H - pageBreakH) / 2}px` : "0px",
                    }}
                    className="bg-white relative overflow-hidden flex flex-col items-center"
                  >
                    <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                      <div
                        className="w-full overflow-hidden resume-view-container pdf-parity-fix"
                        style={{ maxHeight: pageH, overflow: "hidden", width: "100%", position: 'relative' }}
                      >
                        <div style={{ transform: `translateY(-${start}px)`, width: "100%", position: 'relative' }}>
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