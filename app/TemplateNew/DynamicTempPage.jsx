'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DynamicTempPage = ({ children, themeColor = "#2E86C1" }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const calculatePages = () => {
      if (!contentRef.current) return;

      // Get actual content height
      const contentHeight = contentRef.current.scrollHeight;
      
      // A4 page height: 297mm = 1122.52px at 96 DPI
      const pageHeight = 297 * 3.7795275591;
      
      // Calculate number of pages needed
      const pages = Math.ceil(contentHeight / pageHeight);
      setTotalPages(pages);
      
      // Reset to first page if current page exceeds total
      if (currentPage >= pages) {
        setCurrentPage(0);
      }
    };

    // Initial calculation
    const timer = setTimeout(calculatePages, 100);

    // Recalculate on window resize
    window.addEventListener('resize', calculatePages);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePages);
    };
  }, [children, currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate scroll position based on current page
  const pageHeight = 297 * 3.7795275591; // A4 height in pixels
  const scrollOffset = -(currentPage * pageHeight);

  return (
    <div className="relative h-screen overflow-hidden bg-gray-100" ref={containerRef}>
      {/* Visible page container with viewport clipping */}
      <div className="h-full overflow-y-auto hide-scrollbar flex items-start justify-center py-8">
        <div
          className="relative bg-white shadow-lg resume-root overflow-hidden"
          style={{
            width: '210mm',
            height: '297mm',
          }}
        >
          {/* Content container with vertical offset */}
          <div
            ref={contentRef}
            className="transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateY(${scrollOffset}px)`,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full shadow-xl backdrop-blur-sm"
            style={{
              backgroundColor: `${themeColor}15`,
              border: `2px solid ${themeColor}40`,
            }}
          >
            {/* Previous Button */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`
                p-2.5 rounded-full transition-all duration-300 transform
                ${currentPage === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:scale-110 hover:shadow-lg active:scale-95'
                }
              `}
              style={{
                backgroundColor: currentPage === 0 ? '#e5e7eb' : themeColor,
                color: '#ffffff',
              }}
              aria-label="Previous page"
            >
              <FaChevronLeft className="text-sm" />
            </button>

            {/* Page Indicator */}
            <div className="flex items-center gap-2">
              <span
                className="font-bold text-lg"
                style={{ color: themeColor }}
              >
                {currentPage + 1}
              </span>
              <span className="text-gray-500 text-sm">/</span>
              <span className="text-gray-600 text-sm font-medium">
                {totalPages}
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className={`
                p-2.5 rounded-full transition-all duration-300 transform
                ${currentPage === totalPages - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:scale-110 hover:shadow-lg active:scale-95'
                }
              `}
              style={{
                backgroundColor: currentPage === totalPages - 1 ? '#e5e7eb' : themeColor,
                color: '#ffffff',
              }}
              aria-label="Next page"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* Page Counter Badge (Top Right) */}
      {totalPages > 1 && (
        <div className="absolute top-6 right-6 z-40">
          <div
            className="px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm text-sm font-semibold"
            style={{
              backgroundColor: `${themeColor}20`,
              color: themeColor,
              border: `1.5px solid ${themeColor}60`,
            }}
          >
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>
      )}

      {/* Keyboard Navigation */}
      <div
        className="absolute inset-0 pointer-events-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') goToPrevPage();
          if (e.key === 'ArrowRight') goToNextPage();
        }}
      />
    </div>
  );
};

export default DynamicTempPage;