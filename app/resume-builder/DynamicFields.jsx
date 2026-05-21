'use client';
import React, { useState } from 'react';
import { useFieldArray, Controller } from 'react-hook-form';
import { FaPlus, FaTrash, FaPen, FaCheck } from 'react-icons/fa';
import TipTapEditor from '../editor/TipTapEditor';

const DynamicFields = ({ control, register, watch, setValue, fieldPath, suggestions = [] }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldPath,
  });

  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customFieldName, setCustomFieldName] = useState('');
  const [customFieldType, setCustomFieldType] = useState('text');
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState('');

  // Get currently added field names to filter suggestions
  const addedFieldNames = fields.map(f => f.name?.toLowerCase());
  
  const availableSuggestions = suggestions.filter(s => !addedFieldNames.includes(s.toLowerCase()));

  const handleAddSuggestion = (suggestion) => {
    append({ name: suggestion, value: '', type: 'text' });
  };

  const handleAddCustom = () => {
    if (customFieldName.trim()) {
      append({ name: customFieldName.trim(), value: '', type: customFieldType });
      setCustomFieldName('');
      setCustomFieldType('text');
      setIsAddingCustom(false);
    }
  };

  const startEditing = (index, currentName) => {
    setEditingIndex(index);
    setEditingName(currentName);
  };

  const saveEditing = (index) => {
    if (editingName.trim()) {
      setValue(`${fieldPath}.${index}.name`, editingName.trim());
    }
    setEditingIndex(null);
  };

  return (
    <div className="mt-4 border-t pt-4 border-gray-100 md:col-span-2">
      {/* Suggestions and Add Button */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        {availableSuggestions.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleAddSuggestion(s)}
            className="text-xs px-3 py-1.5 rounded-full border border-[#800080] text-[#800080] hover:bg-[#800080] hover:text-white transition-colors flex items-center gap-1"
          >
            <FaPlus size={10} /> {s}
          </button>
        ))}
        {!isAddingCustom && (
          <button
            type="button"
            onClick={() => setIsAddingCustom(true)}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center gap-1 font-medium"
          >
            <FaPlus size={10} /> Custom Field
          </button>
        )}
      </div>

      {/* Add Custom Field Form */}
      {isAddingCustom && (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4 flex flex-col md:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Field Name</label>
            <input
              type="text"
              placeholder="e.g. Project URL"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-[#800080] focus:border-[#800080]"
              value={customFieldName}
              onChange={(e) => setCustomFieldName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Field Type</label>
            <select
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-[#800080] focus:border-[#800080]"
              value={customFieldType}
              onChange={(e) => setCustomFieldType(e.target.value)}
            >
              <option value="text">Short Text</option>
              <option value="long_text">Long Text (Rich)</option>
            </select>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={handleAddCustom}
              className="px-4 py-2 bg-[#800080] text-white text-sm font-medium rounded-lg hover:bg-[#600060] transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Rendered Fields */}
      {fields.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {fields.map((item, index) => {
            const currentName = watch(`${fieldPath}.${index}.name`);
            const fieldType = watch(`${fieldPath}.${index}.type`) || 'text';

            return (
              <div key={item.id} className={fieldType === 'long_text' ? 'md:col-span-2' : ''}>
                <div className="flex items-center justify-between mb-1 group">
                  {editingIndex === index ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="text-xs font-semibold text-gray-700 border-b border-[#800080] outline-none px-1 py-0 bg-transparent w-24"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && saveEditing(index)}
                      />
                      <FaCheck
                        className="text-green-500 cursor-pointer text-xs"
                        onClick={() => saveEditing(index)}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <label className="block text-xs font-semibold text-gray-500 uppercase">
                        {currentName}
                      </label>
                      <FaPen
                        className="text-[10px] text-gray-400 cursor-pointer hover:text-[#800080] opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => startEditing(index, currentName)}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove field"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>

                {fieldType === 'long_text' ? (
                  <Controller
                    name={`${fieldPath}.${index}.value`}
                    control={control}
                    render={({ field }) => <TipTapEditor value={field.value} onChange={field.onChange} />}
                  />
                ) : (
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-[#800080] focus:border-[#800080]"
                    {...register(`${fieldPath}.${index}.value`)}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DynamicFields;
