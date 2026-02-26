'use client';
import React, { useState, useRef, useEffect } from "react";

const ImageCropModal = ({ imageSrc, onSave, onCancel, aspectRatio = null }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const [cropW, setCropW] = useState(320);
  const [cropH, setCropH] = useState(320);
  const [scale, setScale] = useState(1);
  const [minScale, setMinScale] = useState(0.1);
  const [autoScale, setAutoScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      const MAX = 1200;
      let w, h;
      if (aspectRatio) {
        if (aspectRatio >= 1) { w = MAX; h = Math.round(MAX / aspectRatio); }
        else { h = MAX; w = Math.round(MAX * aspectRatio); }
      } else {
        const imgRatio = img.width / img.height;
        if (imgRatio >= 1) { w = MAX; h = Math.round(MAX / imgRatio); }
        else { h = MAX; w = Math.round(MAX * imgRatio); }
      }
      setCropW(w); setCropH(h);
      const fitScale = Math.max(w / img.width, h / img.height);
      setAutoScale(fitScale); setScale(fitScale);
      setMinScale(fitScale * 0.5);
      setPosition({ x: 0, y: 0 }); setRotation(0); setImageLoaded(true);
    };
    img.src = imageSrc;
  }, [imageSrc, aspectRatio]);

  useEffect(() => { if (imageLoaded) drawCanvas(); }, [scale, rotation, position, imageLoaded, cropW, cropH]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    canvas.width = cropW; canvas.height = cropH;
    ctx.clearRect(0, 0, cropW, cropH);
    ctx.fillStyle = "#1a1f2e";
    ctx.fillRect(0, 0, cropW, cropH);
    ctx.save();
    ctx.translate(cropW / 2 + position.x, cropH / 2 + position.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
    ctx.restore();
  };

  const handleMouseDown = (e) => { setDragging(true); setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y }); };
  const handleMouseMove = (e) => { if (!dragging) return; setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); };
  const handleMouseUp = () => setDragging(false);
  const handleTouchStart = (e) => { const t = e.touches[0]; setDragging(true); setDragStart({ x: t.clientX - position.x, y: t.clientY - position.y }); };
  const handleTouchMove = (e) => { if (!dragging) return; const t = e.touches[0]; setPosition({ x: t.clientX - dragStart.x, y: t.clientY - dragStart.y }); };
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => onSave(reader.result);
      reader.readAsDataURL(blob);
    }, "image/jpeg", 1.0);
  };

  const currentZoomStep = Math.round(scale / autoScale);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .rio-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.72);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-family: 'Inter', sans-serif;
          animation: rio-fade 0.18s ease;
          padding: 1rem;
        }
        @keyframes rio-fade { from { opacity: 0; } to { opacity: 1; } }

        .rio-card {
          width: 100%; max-width: 700px;
          max-height: calc(100dvh - 2rem);
          display: flex; flex-direction: column;
          background: #141820;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 28px 90px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.05);
          animation: rio-up 0.26s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes rio-up {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }

        .rio-topbar {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 18px 24px 14px;
          position: relative;
        }
        .rio-drag-hint {
          font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 400;
        }
        .rio-close {
          position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
          width: 30px; height: 30px; border-radius: 50%;
          background: rgba(255,255,255,0.07);
          border: none; color: rgba(255,255,255,0.5);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 13px; transition: all 0.18s; outline: none;
        }
        .rio-close:hover { background: rgba(255,255,255,0.13); color: #fff; }

        .rio-canvas-area {
          flex: 1; min-height: 0;
          display: flex;
          background: #1c2030;
          position: relative;
        }
        .rio-canvas-wrap {
          flex: 1; min-width: 0; min-height: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 20px 16px 20px 20px;
        }
        .rio-canvas {
          border-radius: 8px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.55);
          width: 100%; height: 100%;
          max-width: 100%; display: block; object-fit: contain;
        }

        .rio-zoom-sidebar {
          flex-shrink: 0; width: 60px;
          display: flex; flex-direction: column; align-items: center;
          justify-content: space-between;
          padding: 20px 0;
          border-left: 1px solid rgba(255,255,255,0.05);
          background: rgba(0,0,0,0.18);
          gap: 0;
        }
        .rio-zoom-label {
          font-size: 10px; color: rgba(255,255,255,0.3);
          letter-spacing: 0.1em; text-transform: uppercase;
          font-weight: 500;
        }
        .rio-zoom-steps {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: space-around;
          width: 100%; position: relative; padding: 12px 0;
        }
        .rio-zoom-steps::before {
          content: '';
          position: absolute; left: 50%; top: 12px; bottom: 12px;
          width: 2px; background: rgba(255,255,255,0.07);
          transform: translateX(-50%); border-radius: 99px;
          z-index: 0;
        }
        .rio-zoom-btn {
          position: relative; z-index: 1;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
          font-size: 10.5px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; outline: none; font-family: 'Inter', sans-serif;
        }
        .rio-zoom-btn.active {
          background: #3b82f6; border-color: #3b82f6; color: #fff;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.2);
        }
        .rio-zoom-btn:hover:not(.active) {
          background: rgba(59,130,246,0.15); border-color: rgba(59,130,246,0.35);
          color: #93c5fd;
        }

        .rio-bottom {
          flex-shrink: 0;
          background: #141820;
          padding: 0 24px 20px;
          display: flex; flex-direction: column; gap: 0;
        }

        .rio-straighten {
          padding: 16px 0 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .rio-straighten-title {
          text-align: center; font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,0.4); margin-bottom: 12px;
          letter-spacing: 0.02em;
        }
        .rio-rot-controls {
          display: flex; align-items: center; gap: 6px;
        }
        .rio-rot-label {
          font-size: 11px; color: rgba(255,255,255,0.35); font-weight: 500;
          min-width: 36px; text-align: center;
        }
        .rio-rot-icon-btn {
          width: 28px; height: 28px; border-radius: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.45); font-size: 15px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: all 0.18s; outline: none; flex-shrink: 0;
        }
        .rio-rot-icon-btn:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.8); }

        .rio-slider-wrap {
          flex: 1; position: relative; height: 36px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .rio-ticks {
          position: absolute; left: 0; right: 0; top: 0;
          height: 16px;
          display: flex; justify-content: space-between; align-items: flex-end;
          pointer-events: none; padding: 0 2px;
        }
        .rio-tick {
          display: flex; flex-direction: column; align-items: center; gap: 1px;
        }
        .rio-tick-bar {
          width: 1.5px; border-radius: 1px;
          background: rgba(255,255,255,0.18);
        }
        .rio-tick-bar.major { height: 10px; background: rgba(255,255,255,0.3); }
        .rio-tick-bar.minor { height: 6px; }
        .rio-tick-text {
          font-size: 9px; color: rgba(255,255,255,0.28);
          font-weight: 500; letter-spacing: 0.03em;
        }

        .rio-range-rot {
          width: 100%; height: 3px; margin-top: 18px;
          appearance: none; -webkit-appearance: none; outline: none; cursor: pointer;
          background: rgba(255,255,255,0.1); border-radius: 99px;
        }
        .rio-range-rot::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px; border-radius: 50%;
          background: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.22), 0 2px 8px rgba(0,0,0,0.4);
          cursor: grab; transition: transform 0.15s;
          border: 2px solid rgba(255,255,255,0.15);
        }
        .rio-range-rot::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(1.2); }
        .rio-range-rot::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 50%;
          background: #3b82f6; border: 2px solid rgba(255,255,255,0.15);
        }

        .rio-section-title {
          text-align: center; font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.5); padding: 12px 0 4px;
          border-top: 1px solid rgba(255,255,255,0.07);
          letter-spacing: 0.01em;
        }

        .rio-save-bar {
          padding-top: 16px;
          display: flex; justify-content: flex-end;
        }
        .rio-save-btn {
          padding: 10px 36px;
          background: #3b82f6; border: none; border-radius: 8px;
          color: #fff; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.18s; outline: none;
          box-shadow: 0 4px 18px rgba(59,130,246,0.4);
          letter-spacing: 0.01em;
        }
        .rio-save-btn:hover {
          background: #2563eb;
          box-shadow: 0 6px 24px rgba(59,130,246,0.55);
          transform: translateY(-1px);
        }
        .rio-save-btn:active { transform: translateY(0); }
      `}</style>

      <div className="rio-overlay">
        <div className="rio-card">

          {/* Top */}
          <div className="rio-topbar">
            <span className="rio-drag-hint">Drag to reposition photo</span>
            <button type="button" className="rio-close" onClick={onCancel}>✕</button>
          </div>

          {/* Canvas area */}
          <div className="rio-canvas-area">
            <div className="rio-canvas-wrap">
              <canvas
                ref={canvasRef}
                width={cropW} height={cropH}
                className="rio-canvas"
                style={{ cursor: dragging ? "grabbing" : "grab" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              />
            </div>

            {/* Zoom sidebar */}
            <div className="rio-zoom-sidebar">
              <span className="rio-zoom-label">Zoom</span>
              <div className="rio-zoom-steps">
                {[3, 2, 1].map(step => (
                  <button
                    key={step} type="button"
                    className={`rio-zoom-btn ${currentZoomStep === step ? 'active' : ''}`}
                    onClick={() => setScale(autoScale * step)}
                  >
                    {step}×
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="rio-bottom">

            {/* Straighten */}
            <div className="rio-straighten">
              <div className="rio-straighten-title">Straighten</div>
              <div className="rio-rot-controls">
                <span className="rio-rot-label">−90°</span>
                <button type="button" className="rio-rot-icon-btn" onClick={() => setRotation(r => r - 90)} title="Rotate left">↰</button>

                <div className="rio-slider-wrap">
                  <div className="rio-ticks">
                    {[
                      { v: -30, major: true },
                      { v: -22 }, { v: -15, major: true },
                      { v: -7 }, { v: 0, major: true },
                      { v: 7 }, { v: 15, major: true },
                      { v: 22 }, { v: 30, major: true },
                    ].map(({ v, major }) => (
                      <div key={v} className="rio-tick">
                        <div className={`rio-tick-bar ${major ? 'major' : 'minor'}`} />
                        {major && <span className="rio-tick-text">{v === 0 ? '0°' : `${v > 0 ? '+' : ''}${v}`}</span>}
                      </div>
                    ))}
                  </div>
                  <input
                    type="range" className="rio-range-rot"
                    min={-180} max={180} step={1} value={rotation}
                    onChange={e => setRotation(Number(e.target.value))}
                  />
                </div>

                <button type="button" className="rio-rot-icon-btn" onClick={() => setRotation(r => r + 90)} title="Rotate right">↱</button>
                <span className="rio-rot-label">+90°</span>
              </div>
            </div>

            {/* Section label replacing tabs */}
            <div className="rio-section-title">Crop &amp; Rotate</div>

            {/* Save */}
            <div className="rio-save-bar">
              <button type="button" className="rio-save-btn" onClick={handleSave}>
                Save photo
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ImageCropModal;