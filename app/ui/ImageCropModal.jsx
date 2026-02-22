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

      // Canvas size: aspectRatio দিলে সেটা use করো, না হলে image এর নিজের ratio
      const MAX = 1200;
      let w, h;

      if (aspectRatio) {
        // caller দিয়ে দিয়েছে (e.g. 1 for profile, 16/9 for cover)
        if (aspectRatio >= 1) {
          w = MAX;
          h = Math.round(MAX / aspectRatio);
        } else {
          h = MAX;
          w = Math.round(MAX * aspectRatio);
        }
      } else {
        // image এর নিজের ratio — পুরোটা দেখাবে, crop হবে না
        const imgRatio = img.width / img.height;
        if (imgRatio >= 1) {
          w = MAX;
          h = Math.round(MAX / imgRatio);
        } else {
          h = MAX;
          w = Math.round(MAX * imgRatio);
        }
      }

      setCropW(w);
      setCropH(h);

      // image পুরো canvas cover করবে
      const scaleX = w / img.width;
      const scaleY = h / img.height;
      const fitScale = Math.max(scaleX, scaleY);

      setAutoScale(fitScale);
      setScale(fitScale);
      setMinScale(fitScale * 0.8); // zoom out একটু কম রাখো
      setPosition({ x: 0, y: 0 });
      setRotation(0);
      setImageLoaded(true);
    };
    img.src = imageSrc;
  }, [imageSrc, aspectRatio]);

  useEffect(() => {
    if (imageLoaded) drawCanvas();
  }, [scale, rotation, position, imageLoaded, cropW, cropH]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    canvas.width = cropW;
    canvas.height = cropH;

    ctx.clearRect(0, 0, cropW, cropH);
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, cropW, cropH);

    ctx.save();
    ctx.translate(cropW / 2 + position.x, cropH / 2 + position.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
    ctx.restore();

    // Grid overlay
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 0.5;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo((cropW / 3) * i, 0); ctx.lineTo((cropW / 3) * i, cropH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, (cropH / 3) * i); ctx.lineTo(cropW, (cropH / 3) * i); ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(0, 0, cropW, cropH);
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setDragging(false);

  const handleTouchStart = (e) => {
    const t = e.touches[0];
    setDragging(true);
    setDragStart({ x: t.clientX - position.x, y: t.clientY - position.y });
  };
  const handleTouchMove = (e) => {
    if (!dragging) return;
    const t = e.touches[0];
    setPosition({ x: t.clientX - dragStart.x, y: t.clientY - dragStart.y });
  };

  const handleReset = () => {
    setScale(autoScale);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleSave = () => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  canvas.toBlob((blob) => {
    const reader = new FileReader();
    reader.onloadend = () => onSave(reader.result);
    reader.readAsDataURL(blob);
  }, "image/jpeg", 1.0);
};
  return (
    <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Crop Photo</h3>
            <p className="text-xs text-gray-400 mt-0.5">Drag to reposition</p>
          </div>
          <button type="button" onClick={onCancel}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-xs transition">
            ✕
          </button>
        </div>

        <div className="flex justify-center bg-[#1a1a2e] py-5 px-4">
          <canvas
            ref={canvasRef}
            width={cropW}
            height={cropH}
            className="cursor-grab active:cursor-grabbing rounded-lg w-full"
            style={{ maxWidth: cropW, height: "auto" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          />
        </div>

        <div className="px-5 py-4 space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Zoom</span>
              <span>{Math.round((scale / autoScale) * 100)}%</span>
            </div>
            <input type="range" min={minScale} max={autoScale * 3} step={0.001} value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full h-1.5 rounded-full accent-[#800080] cursor-pointer" />
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Rotation</span>
              <span>{rotation}°</span>
            </div>
            <input type="range" min={-180} max={180} step={1} value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full h-1.5 rounded-full accent-[#800080] cursor-pointer" />
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setRotation(r => r - 90)}
              className="flex-1 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition">
              ↺ −90°
            </button>
            <button type="button" onClick={handleReset}
              className="flex-1 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition">
              Reset
            </button>
            <button type="button" onClick={() => setRotation(r => r + 90)}
              className="flex-1 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition">
              ↻ +90°
            </button>
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 font-medium transition">
              Cancel
            </button>
            <button type="button" onClick={handleSave}
              className="flex-1 py-2.5 rounded-xl !bg-[#800080] !text-white text-sm font-semibold hover:!bg-[#660066] transition">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;