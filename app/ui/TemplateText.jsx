import React, { useState } from "react";

const TemplateText = ({ themeColor }) => {
  const [settings, setSettings] = useState({
    font: "Arial",
    headingSize: 24,
    bodySize: 10,
    lineHeight: 1.4,
    headingWeight: "bold",
  });

  return (
    <div className="grid md:grid-cols-2 gap-10">
      
      {/* LEFT CONTROLS */}
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium">Font</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={settings.font}
            onChange={(e) =>
              setSettings({ ...settings, font: e.target.value })
            }
          >
            <option>Arial</option>
            <option>Inter</option>
            <option>Roboto</option>
          </select>
        </div>

        <div>
          <label>Heading Size ({settings.headingSize}px)</label>
          <input
            type="range"
            min="18"
            max="32"
            value={settings.headingSize}
            onChange={(e) =>
              setSettings({ ...settings, headingSize: e.target.value })
            }
          />
        </div>

        <div>
          <label>Body Size ({settings.bodySize}px)</label>
          <input
            type="range"
            min="8"
            max="14"
            value={settings.bodySize}
            onChange={(e) =>
              setSettings({ ...settings, bodySize: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateText;
