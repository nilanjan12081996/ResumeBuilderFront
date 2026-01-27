import React from "react";

const FONT_SIZE_LABELS = ["S", "M", "L"];
const FONT_SIZE_MAP = {
  0: "10px",
  1: "12px",
  2: "14px",
};

const LINE_HEIGHT_STEPS = [1, 1.25, 1.5, 1.75, 2];

const FONT_WEIGHT_OPTIONS = [
  { label: "Regular", value: "400" },
  { label: "Medium", value: "500" },
  { label: "Semibold", value: "600" },
  { label: "Bold", value: "700" },
];

const PRIME_ATS_FONT_CONTROLS = [
  { key: "primaryHeading", label: "Primary Heading", min: 8, max: 32, step: 0.5, unit: "pt" },
  { key: "secondaryHeading", label: "Secondary Heading", min: 8, max: 32, step: 0.5, unit: "pt" },
  { key: "body", label: "Body", min: 5, max: 32, step: 0.5, unit: "pt" },
  { key: "sectionTitle", label: "Section Titles", min: 6, max: 35, step: 0.5, unit: "pt" },
];

const TemplateText = ({ textSettings, setTextSettings, isPrimeAtsTemp }) => {
  const lineHeightIndex = LINE_HEIGHT_STEPS.indexOf(textSettings.lineHeight);

  const getLineHeightPercent = (value) => {
    return Math.round(((value - 1) / (2 - 1)) * 100 + 50);
  };

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
            <option>Lato</option>
            <option>Inter</option>
            <option>Roboto</option>
            <option>Arial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Secondary Font
          </label>
          <select
            value={textSettings.secondaryFont}
            onChange={(e) =>
              setTextSettings({
                ...textSettings,
                secondaryFont: e.target.value,
              })
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-[#800080]"
          >
            <option>Roboto Mono</option>
            <option>Inter</option>
            <option>Roboto</option>
            <option>Arial</option>
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

      {/* FONT SIZE (Normal Template) */}
      {!isPrimeAtsTemp && (
        <div className="flex items-center gap-4">
          <label className="w-28 text-sm font-medium text-gray-600">
            Font Size
          </label>

          <div className="relative flex-1">
            <input
              type="range"
              min={0}
              max={FONT_SIZE_LABELS.length - 1}
              step={1}
              value={textSettings.fontScale}
              onChange={(e) => {
                const scale = Number(e.target.value);
                setTextSettings({
                  ...textSettings,
                  fontScale: scale,
                  fontSize: FONT_SIZE_MAP[scale],
                });
              }}
              style={{
                "--fill": `${(textSettings.fontScale / (FONT_SIZE_LABELS.length - 1)) * 100}%`,
              }}
              className="step-slider w-full"
            />

            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              {FONT_SIZE_LABELS.map((_, i) => (
                <span key={i} className="h-4 w-[6px] mt-1 bg-[#800080] rounded" />
              ))}
            </div>
          </div>

          <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
            {FONT_SIZE_LABELS[textSettings.fontScale]}
          </span>
        </div>
      )}

      {/* FONT SIZE (PRIME ATS) */}
      {isPrimeAtsTemp && (
        <div className="space-y-6">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Font Size
          </p>

          {PRIME_ATS_FONT_CONTROLS.map((item) => {
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
              </div>
            );
          })}
        </div>
      )}

      {/* FONT WEIGHT */}
      {isPrimeAtsTemp && (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateText;
