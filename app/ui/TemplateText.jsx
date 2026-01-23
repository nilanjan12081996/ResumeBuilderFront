import React, { useState } from "react";

const TemplateText = ({ textSettings, setTextSettings }) => {
  return (
    <div className="space-y-6">

      <div>
        <label>Font</label>
        <select
          value={textSettings.font}
          onChange={(e) =>
            setTextSettings({ ...textSettings, font: e.target.value })
          }
        >
          <option>Arial</option>
          <option>Inter</option>
          <option>Roboto</option>
        </select>
      </div>

      <div>
        <label>Heading Size ({textSettings.headingSize}px)</label>
        <input
          type="range"
          min="18"
          max="32"
          value={textSettings.headingSize}
          onChange={(e) =>
            setTextSettings({
              ...textSettings,
              headingSize: +e.target.value,
            })
          }
        />
      </div>

      <div>
        <label>Body Size ({textSettings.bodySize}px)</label>
        <input
          type="range"
          min="8"
          max="14"
          value={textSettings.bodySize}
          onChange={(e) =>
            setTextSettings({
              ...textSettings,
              bodySize: +e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};


export default TemplateText;
