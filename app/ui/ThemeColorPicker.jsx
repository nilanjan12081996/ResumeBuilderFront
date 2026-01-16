'use client';
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { useThemeColor } from './ThemeColorProvider';

const presetColors = [
  '#2163CA',
  '#7C3AED',
  '#DC2626',
  '#D97706',
  '#111827'
];

const ThemeColorPicker = () => {
  const { themeColor, setThemeColor } = useThemeColor();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <p className="text-sm font-medium mb-2">Main color</p>

      <div className="flex gap-2 items-center">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => setThemeColor(color)}
            style={{ backgroundColor: color }}
            className={`w-7 h-7 rounded-full border-2 ${
              themeColor === color ? 'border-black' : 'border-transparent'
            }`}
          />
        ))}

        {/* Custom color */}
        <button
          onClick={() => setShowPicker(!showPicker)}
          style={{ backgroundColor: themeColor }}
          className="w-7 h-7 rounded-full border flex items-center justify-center"
        />
      </div>

      {showPicker && (
        <div className="absolute z-50 mt-2">
          <ChromePicker
            color={themeColor}
            onChange={(color) => setThemeColor(color.hex)}
          />
        </div>
      )}
    </div>
  );
};

export default ThemeColorPicker;
