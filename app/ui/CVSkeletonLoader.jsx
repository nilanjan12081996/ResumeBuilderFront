// ── CV Skeleton Loader ──
const CVSkeletonLoader = () => (
  <div className="lg:flex gap-1 pb-0 animate-pulse">
    <style>{`
      @keyframes cv-scan {
        0%   { top: 0%; opacity: 1; }
        90%  { opacity: 1; }
        100% { top: 100%; opacity: 0; }
      }
      @keyframes shimmer-slide {
        0%   { background-position: -600px 0; }
        100% { background-position: 600px 0; }
      }
      .shimmer-bar {
        background: linear-gradient(90deg, #e8eaf0 25%, #f5f6fa 50%, #e8eaf0 75%);
        background-size: 600px 100%;
        animation: shimmer-slide 1.4s infinite;
        border-radius: 6px;
      }
      .cv-scan-line {
        position: absolute;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #800080, #C44BC4, transparent);
        animation: cv-scan 2s ease-in-out infinite;
        box-shadow: 0 0 10px 2px rgba(128,0,128,0.3);
        z-index: 10;
      }
    `}</style>

    {/* Left Panel Skeleton */}
    <div className="lg:w-6/12 bg-[#eff2f9] rounded-[8px] h-screen overflow-hidden p-4 flex flex-col gap-3">

      {/* ATS Score card skeleton */}
      <div className="bg-white rounded-xl p-4 flex items-center gap-4">
        <div className="shimmer-bar w-[64px] h-[64px] rounded-full flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="shimmer-bar h-4 w-3/4" />
          <div className="shimmer-bar h-3 w-1/2" />
          <div className="shimmer-bar h-2 w-full rounded-full mt-1" />
        </div>
      </div>

      {/* Personal Details skeleton */}
      <div className="bg-white rounded-xl p-4 flex flex-col gap-3">
        <div className="shimmer-bar h-5 w-40" />
        <div className="grid grid-cols-2 gap-3 mt-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="shimmer-bar h-2.5 w-16" />
              <div className="shimmer-bar h-9 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Sections skeleton */}
      {[
        { width: "w-28", bars: 3 },
        { width: "w-20", bars: 2 },
        { width: "w-36", bars: 4 },
        { width: "w-24", bars: 2 },
      ].map((section, i) => (
        <div key={i} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="shimmer-bar w-4 h-4 rounded" />
            <div className={`shimmer-bar h-4 ${section.width}`} />
          </div>
          <div className="shimmer-bar w-4 h-4 rounded" />
        </div>
      ))}
    </div>

    {/* Right Panel - CV Preview Skeleton */}
    <div className="lg:w-6/12 bg-white h-screen overflow-hidden relative">
      {/* Scan line effect */}
      <div className="cv-scan-line" />

      <div className="h-full p-6 flex flex-col gap-0">
        {/* CV Header */}
        <div className="bg-[#f0e6f0] rounded-t-lg px-8 py-6 flex flex-col gap-3">
          <div className="shimmer-bar h-8 w-56" style={{ background: 'linear-gradient(90deg, #dcc0dc 25%, #eedaee 50%, #dcc0dc 75%)', backgroundSize: '600px 100%', animation: 'shimmer-slide 1.4s infinite' }} />
          <div className="shimmer-bar h-4 w-40" style={{ background: 'linear-gradient(90deg, #dcc0dc 25%, #eedaee 50%, #dcc0dc 75%)', backgroundSize: '600px 100%', animation: 'shimmer-slide 1.4s infinite' }} />
          <div className="flex gap-4 mt-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="shimmer-bar h-3 w-28" style={{ background: 'linear-gradient(90deg, #dcc0dc 25%, #eedaee 50%, #dcc0dc 75%)', backgroundSize: '600px 100%', animation: 'shimmer-slide 1.4s infinite' }} />
            ))}
          </div>
        </div>

        {/* CV Body */}
        <div className="flex-1 bg-white px-8 py-5 flex flex-col gap-5">
          {/* Summary section */}
          <div className="flex flex-col gap-2">
            <div className="shimmer-bar h-4 w-36 mb-1" />
            <div className="shimmer-bar h-2 w-full" />
            <div className="shimmer-bar h-2 w-5/6" />
            <div className="shimmer-bar h-2 w-4/6" />
          </div>

          <div className="border-t border-gray-100" />

          {/* Experience section */}
          <div className="flex flex-col gap-2">
            <div className="shimmer-bar h-4 w-28 mb-1" />
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5 mb-2">
                <div className="flex justify-between">
                  <div className="shimmer-bar h-3 w-40" />
                  <div className="shimmer-bar h-3 w-24" />
                </div>
                <div className="shimmer-bar h-2.5 w-32" />
                <div className="shimmer-bar h-2 w-full" />
                <div className="shimmer-bar h-2 w-5/6" />
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100" />

          {/* Skills section */}
          <div className="flex flex-col gap-2">
            <div className="shimmer-bar h-4 w-16 mb-1" />
            <div className="flex flex-wrap gap-2">
              {[80, 64, 96, 72, 56, 88, 68, 76].map((w, i) => (
                <div key={i} className="shimmer-bar h-6 rounded-full" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Education section */}
          <div className="flex flex-col gap-2">
            <div className="shimmer-bar h-4 w-24 mb-1" />
            <div className="flex justify-between">
              <div className="shimmer-bar h-3 w-44" />
              <div className="shimmer-bar h-3 w-20" />
            </div>
            <div className="shimmer-bar h-2.5 w-36" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CVSkeletonLoader;