'use client';

import React, { useState } from 'react';

const templates = [
  { id: 1, name: 'Professional', type: ['PDF', 'DOCX'], img: '/path/to/Professional.png' },
  { id: 2, name: 'Prime ATS', type: ['PDF', 'DOCX'], img: '/path/to/Prime ATS.png' },
  { id: 3, name: 'Clean', type: ['PDF', 'DOCX'], img: '/path/to/professional.png' },
  { id: 4, name: 'Corporate', type: ['PDF', 'DOCX'], img: '/path/to/Corporate.png' },
  { id: 5, name: 'Clear', type: ['PDF', 'DOCX'], img: '/path/to/Clear.png' },
  { id: 6, name: 'Vivid', type: ['PDF', 'DOCX'], img: '/path/to/Vivid.png' },
  // Add more templates as needed
];

const filters = ['All', 'With photo', 'Two column', 'ATS', 'DOCX', 'Customized', 'Free'];

const CustomizeResume = () => {
  const [activeTab, setActiveTab] = useState('Template & Colors');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {['Template & Colors', 'Text', 'Layout'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 -mb-px font-medium text-sm ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      {activeTab === 'Template & Colors' && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 text-sm rounded-full border transition ${
                activeFilter === filter
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'border-gray-300 text-gray-600 hover:border-gray-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Template Grid */}
      {activeTab === 'Template & Colors' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`cursor-pointer border rounded-lg overflow-hidden relative transition ${
                selectedTemplate === template.id ? 'border-blue-500 shadow' : 'border-gray-200'
              }`}
            >
              <img
                src={template.img}
                alt={template.name}
                className="w-full h-48 object-cover"
              />
              {/* Selection checkmark */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}

              <div className="p-2 text-center">
                <h3 className="font-medium text-sm">{template.name}</h3>
                <div className="flex justify-center gap-1 mt-1 text-xs">
                  {template.type.map((t) => (
                    <span
                      key={t}
                      className="bg-orange-500 text-white px-1 rounded text-[10px] font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder content for other tabs */}
      {activeTab !== 'Template & Colors' && (
        <div className="text-gray-500 text-center py-20">
          {activeTab} settings coming soon...
        </div>
      )}
    </div>
  );
};

export default CustomizeResume;
