import React from "react";
import { defaultResumeSettings } from "../config/defaultResumeSettings";

const LAYOUT_CONTROLS = [
  { key: "topBottom", label: "Top & Bottom", min: 0, max: 100, step: 1, unit: "pt" },
  { key: "leftRight", label: "Left & Right", min: 0, max: 100, step: 1, unit: "pt" },
  { key: "betweenSections", label: "Between Sections", min: 0, max: 50, step: 1, unit: "pt" },
  { key: "betweenTitlesContent", label: "Between Titles & Content", min: 0, max: 50, step: 1, unit: "pt" },
];

const TemplateLayout = ({ layoutSettings, setLayoutSettings }) => {
  const defaultSettings = defaultResumeSettings.layout;

  const isDefault = (key, value) => defaultSettings[key] === value;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Format
        </label>
        <select
          value={layoutSettings.pageFormat}
          onChange={(e) =>
            setLayoutSettings({ ...layoutSettings, pageFormat: e.target.value })
          }
          className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-[#800080]"
        >
          <option value="A4">A4 (8.27" x 11.69")</option>
          <option value="Letter">Letter (8.5" x 11")</option>
        </select>
      </div>

      {/* Layout sliders */}
      {LAYOUT_CONTROLS.map((item) => {
        const value = layoutSettings[item.key];
        const defaultValue = defaultSettings[item.key];
        const percent = ((value - item.min) / (item.max - item.min)) * 100;

        return (
          <div key={item.key} className="flex items-center gap-4">
            <label className="w-48 text-sm font-medium text-gray-600">
              {item.label}
            </label>

            <div className="relative flex-1">
              <input
                type="range"
                min={item.min}
                max={item.max}
                step={item.step}
                value={value}
                onChange={(e) =>
                  setLayoutSettings({
                    ...layoutSettings,
                    [item.key]: Number(e.target.value),
                  })
                }
                style={{ "--fill": `${percent}%` }}
                className="step-slider w-full"
              />
            </div>

            {/* Value display */}
            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              {value} {item.unit}
            </span>

            {/* Set as Default button */}
            <button
              type="button"
              className={`px-2 py-1 text-xs font-semibold rounded transition-colors
              ${isDefault(item.key, value)
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
              }`}
              onClick={() =>
                setLayoutSettings({ ...layoutSettings, [item.key]: defaultValue })
              }
              disabled={isDefault(item.key, value)}
            >
              Set as Default
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TemplateLayout;
