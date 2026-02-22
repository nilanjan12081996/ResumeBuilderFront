import React, { useEffect } from "react";
import { defaultResumeSettings } from "../config/defaultResumeSettings";

const LINE_HEIGHT_STEPS = [1, 1.25, 1.5, 1.75, 2];

const FONT_WEIGHT_OPTIONS = [
  { label: "Regular", value: "400" },
  { label: "Medium", value: "500" },
  { label: "Semibold", value: "600" },
  { label: "Bold", value: "700" },
];

const FONT_CONTROLS = [
  { key: "primaryHeading", label: "Primary Heading", min: 8, max: 32, step: 0.5, unit: "pt" },
  { key: "secondaryHeading", label: "Secondary Heading", min: 8, max: 32, step: 0.5, unit: "pt" },
  { key: "body", label: "Body", min: 5, max: 32, step: 0.5, unit: "pt" },
  { key: "sectionTitle", label: "Section Titles", min: 6, max: 35, step: 0.5, unit: "pt" },
];

const GOOGLE_FONT_MAP = {
  "Arial": null,
  "Lato": "https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600;700&display=swap",
  "Inter": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  "Roboto": "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap",
  "Open Sans": "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap",
  "Montserrat": "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
  "Poppins": "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
  "Raleway": "https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap",
  "Nunito": "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap",
  "Source Sans 3": "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap",
  "Merriweather": "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap",
  "Playfair Display": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
  "EB Garamond": "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap",
  "Libre Baskerville": "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap",
  "DM Sans": "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap",
  "Josefin Sans": "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600;700&display=swap",
  "Cabin": "https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap",
};

const FONT_OPTIONS = Object.keys(GOOGLE_FONT_MAP);

const TemplateText = ({ textSettings, setTextSettings, isPrimeAtsTemp, selectedTemplate }) => {
  const baseDefaults = defaultResumeSettings.text;
  const templateOverrides = defaultResumeSettings.templateTextOverrides?.[selectedTemplate?.toLowerCase()] || {};
  const defaultSettings = { ...baseDefaults, ...templateOverrides };
  const lineHeightIndex = LINE_HEIGHT_STEPS.indexOf(textSettings.lineHeight);

  const getLineHeightPercent = (value) => {
    return Math.round(((value - 1) / (2 - 1)) * 100 + 50);
  };

  const isDefault = (key, value) => defaultSettings[key] === value;

  useEffect(() => {
    [textSettings.primaryFont, textSettings.secondaryFont].forEach((font) => {
      const url = GOOGLE_FONT_MAP[font];
      if (!url) return;
      const id = `font-${font.replace(/\s+/g, "-")}`;
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = url;
        document.head.appendChild(link);
      }
    });
  }, [textSettings.primaryFont, textSettings.secondaryFont]);

  return (
    <div className="space-y-10">

      {/* FONT SECTION */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Primary Font
          </label>
          <select
            value={textSettings.primaryFont}
            onChange={(e) =>
              setTextSettings({ ...textSettings, primaryFont: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-[#800080]"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Secondary Font
          </label>
          <select
            value={textSettings.secondaryFont}
            onChange={(e) =>
              setTextSettings({ ...textSettings, secondaryFont: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-[#800080]"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>
      </div>

      {/* LINE HEIGHT */}
      <div className="flex items-center gap-4">
        <label className="w-28 text-sm font-medium text-gray-600">
          Line Height
        </label>

        <div className="relative flex-1">
          <input
            type="range"
            min={0}
            max={LINE_HEIGHT_STEPS.length - 1}
            step={1}
            value={lineHeightIndex}
            onChange={(e) =>
              setTextSettings({
                ...textSettings,
                lineHeight: LINE_HEIGHT_STEPS[Number(e.target.value)],
              })
            }
            style={{
              "--fill": `${(lineHeightIndex / (LINE_HEIGHT_STEPS.length - 1)) * 100}%`,
            }}
            className="step-slider w-full"
          />

          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            {LINE_HEIGHT_STEPS.map((_, i) => (
              <span key={i} className="h-4 w-[6px] mt-1 bg-[#800080] rounded" />
            ))}
          </div>
        </div>

        <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          {getLineHeightPercent(textSettings.lineHeight)}%
        </span>
      </div>

      {/* FONT SIZE */}
      <div className="space-y-6">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Font Size
        </p>

        {FONT_CONTROLS.map((item) => {
          const value = textSettings[item.key];
          const percent = ((value - item.min) / (item.max - item.min)) * 100;

          return (
            <div key={item.key} className="flex items-center gap-4">
              <label className="w-36 text-sm font-medium text-gray-600">
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
                    setTextSettings({
                      ...textSettings,
                      [item.key]: Number(e.target.value),
                    })
                  }
                  style={{ "--fill": `${percent}%` }}
                  className="step-slider w-full"
                />
              </div>

              <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {value} {item.unit}
              </span>

              <button
                type="button"
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors
                  ${value === defaultSettings[item.key]
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                onClick={() =>
                  setTextSettings({
                    ...textSettings,
                    [item.key]: defaultSettings[item.key],
                  })
                }
                disabled={value === defaultSettings[item.key]}
              >
                Set as Default
              </button>
            </div>
          );
        })}
      </div>

      {/* FONT WEIGHT */}
      <div className="space-y-6">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Font Weight
        </p>

        {[
          { key: "primaryHeadingWeight", label: "Primary Heading" },
          { key: "secondaryHeadingWeight", label: "Secondary Heading" },
          { key: "bodyWeight", label: "Body" },
          { key: "sectionTitleWeight", label: "Section Titles" },
        ].map((item) => (
          <div key={item.key} className="flex items-center gap-4">
            <label className="w-36 text-sm font-medium text-gray-600">
              {item.label}
            </label>

            <select
              value={textSettings[item.key]}
              onChange={(e) =>
                setTextSettings({
                  ...textSettings,
                  [item.key]: e.target.value,
                })
              }
              className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-[#800080]"
            >
              {FONT_WEIGHT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <span className={`ml-2 text-xs px-1 rounded ${isDefault(item.key, textSettings[item.key]) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-400"}`}>
              {isDefault(item.key, textSettings[item.key]) ? "Default" : "Changed"}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TemplateText;