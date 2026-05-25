'use client';
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaPen, FaCheck } from 'react-icons/fa';
import TipTapEditor from '../editor/TipTapEditor';
import {
  DndContext,
  pointerWithin,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import DraggableWrapper from './DraggableWrapper';
import DragIcon from './DragIcon';
import { TbDragDrop } from 'react-icons/tb';

const ImpDynamicFields = ({ 
  customFields = [], 
  onChange, 
  suggestions = [],
  coreFields = [], // [{ id, name, value, type, footer }]
  onCoreFieldChange = () => {},
  onOrderChange = () => {}, // (newCombinedOrder) => {}
  fieldOrder = [] // Array of IDs in order
}) => {
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  const [customFieldName, setCustomFieldName] = useState('');
  const [customFieldType, setCustomFieldType] = useState('text');
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [error, setError] = useState('');
  
  const [resizing, setResizing] = useState(null); // { index, startX, startWidth }
  const [activeId, setActiveId] = useState(null);

  // Get currently added field names to filter suggestions
  const addedFieldNames = customFields.map(f => f.name?.toLowerCase());
  
  const availableSuggestions = suggestions.filter(s => !addedFieldNames.includes(s.toLowerCase()));

  const handleAddSuggestion = (suggestion) => {
    onChange([...customFields, { id: Date.now().toString(), name: suggestion, value: '', type: 'text' }]);
  };

  const handleAddCustom = () => {
    if (customFieldName.trim()) {
      onChange([...customFields, { id: Date.now().toString(), name: customFieldName.trim(), value: '', type: customFieldType }]);
      setCustomFieldName('');
      setCustomFieldType('text');
      setIsAddingCustom(false);
      setError('');
    } else {
      setError('Please enter a field name');
    }
  };

  const handleRemove = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      const newFields = [...customFields];
      newFields.splice(index, 1);
      onChange(newFields);
      setDeletingIndex(null);
    }, 200);
  };

  const startEditing = (index, currentName) => {
    setEditingIndex(index);
    setEditingName(currentName);
  };

  const saveEditing = (index) => {
    if (editingName.trim()) {
      const newFields = [...customFields];
      newFields[index] = { ...newFields[index], name: editingName.trim() };
      onChange(newFields);
    }
    setEditingIndex(null);
  };

  const handleChangeValue = (index, newValue) => {
    const newFields = [...customFields];
    newFields[index] = { ...newFields[index], value: newValue };
    onChange(newFields);
  };

  const handleUpdateWidth = (index, newWidth) => {
    const newFields = [...customFields];
    newFields[index] = { ...newFields[index], width: Math.min(100, Math.max(50, parseInt(newWidth))) };
    onChange(newFields);
  };

  const onMouseDown = (e, index) => {
    setResizing({
      index,
      startX: e.clientX,
      startWidth: customFields[index].width || 50
    });
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    setResizing(current => {
      if (!current) return null;
      
      const deltaX = e.clientX - current.startX;
      // Assume 1% width is roughly 6-10px depending on screen
      // We'll use a simple ratio for now
      const newWidth = current.startWidth + (deltaX / 10); 
      handleUpdateWidth(current.index, newWidth);
      return current;
    });
  };

  const onMouseUp = () => {
    setResizing(null);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Combine items based on provided order or default to custom then core
  let combinedItems = [...customFields, ...coreFields];
  
  combinedItems.sort((a, b) => {
    // 1. Technologies is always last
    if (a.id === 'technologies' && b.id !== 'technologies') return 1;
    if (b.id === 'technologies' && a.id !== 'technologies') return -1;

    // 2. Description is second to last
    if (a.id === 'description' && b.id !== 'description') return 1;
    if (b.id === 'description' && a.id !== 'description') return -1;

    // 3. Other fields sorted by fieldOrder
    const indexA = fieldOrder && fieldOrder.length > 0 ? fieldOrder.indexOf(a.id) : -1;
    const indexB = fieldOrder && fieldOrder.length > 0 ? fieldOrder.indexOf(b.id) : -1;
    
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return -1; // Place new custom fields at the top
    if (indexB === -1) return 1;
    return indexA - indexB;
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = combinedItems.findIndex((f) => f.id === active.id);
      const newIndex = combinedItems.findIndex((f) => f.id === over.id);
      
      const newOrder = arrayMove(combinedItems, oldIndex, newIndex);
      
      // Separate back into core and custom
      const newCustomFields = newOrder.filter(item => !coreFields.find(cf => cf.id === item.id));
      
      onChange(newCustomFields);
      onOrderChange(newOrder.map(item => item.id));
    }
  };
  
  return (
    <div className="mt-3 border-t pt-3 pb-2 border-gray-100 md:col-span-2">
      {/* Rendered Fields */}
      {combinedItems.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={combinedItems.map((f) => f.id)}
            strategy={rectSortingStrategy}
          >
            <div className="flex flex-wrap gap-y-4 -mx-2 mb-4">
              {combinedItems.map((item, index) => {
                const isCore = coreFields.find(cf => cf.id === item.id);
                const currentName = item.name;
                const fieldType = item.type || 'text';
                const itemWidth = fieldType === 'long_text' ? 100 : (item.width || 50);

                const isDeleting = !isCore && deletingIndex === customFields.findIndex(f => f.id === item.id);
                const customIndex = customFields.findIndex(f => f.id === item.id);

                return (
                  <DraggableWrapper key={item.id} id={item.id} collapseOnDrag={true} width={`${itemWidth}%`}>
                    <div 
                      className={`px-2 transition-all duration-200 ${isDeleting ? "opacity-0 -translate-x-6" : ""}`}
                      style={{ minWidth: '300px' }}
                    >
                      <div className="flex items-center gap-3 mb-1 group">
                        <DragIcon />
                        {!isCore && editingIndex === customIndex ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="text-xs font-semibold text-gray-700 border-b border-[#800080] outline-none px-1 py-0 bg-transparent w-24"
                              autoFocus
                              onKeyDown={(e) => e.key === 'Enter' && saveEditing(customIndex)}
                            />
                            <FaCheck
                              className="text-green-500 cursor-pointer text-xs"
                              onClick={() => saveEditing(customIndex)}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <label className={`block text-xs font-semibold ${isCore ? 'text-gray-600' : 'text-gray-500'}`}>
                              {currentName}
                            </label>
                            {!isCore && (
                              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <FaPen
                                  className="text-[11px] text-[#800080] cursor-pointer hover:opacity-80"
                                  title="Edit label"
                                  onClick={() => startEditing(customIndex, currentName)}
                                />
                                <FaTrash
                                  className="text-[11px] text-red-500 cursor-pointer hover:opacity-80"
                                  title="Remove field"
                                  onClick={() => handleRemove(customIndex)}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {fieldType === 'long_text' ? (
                        <TipTapEditor
                          value={item.value || ''}
                          onChange={(html) => isCore ? onCoreFieldChange(item.id, html) : handleChangeValue(customIndex, html)}
                          footer={item.footer}
                        />
                      ) : (
                        <div className="relative group/input">
                          <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 p-2 pr-4 text-sm focus:ring-[#800080] focus:border-[#800080]"
                            value={item.value || ''}
                            onChange={(e) => isCore ? onCoreFieldChange(item.id, e.target.value) : handleChangeValue(customIndex, e.target.value)}
                          />
                          {fieldType === 'link' && item.value && (
                            <a 
                              href={item.value.startsWith('http') ? item.value : `https://${item.value}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute right-8 top-1/2 -translate-y-1/2 text-[#800080] hover:text-black transition-colors"
                              title="Open link"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                          )}
                          {!isCore && (
                            <div 
                              onMouseDown={(e) => onMouseDown(e, customIndex)}
                              className="absolute right-1 top-1 bottom-1 w-2 cursor-ew-resize flex items-center justify-center group-hover/input:opacity-100 opacity-0 transition-opacity"
                              title="Drag to resize"
                            >
                              <div className="w-1 h-4 bg-gray-200 rounded-full group-hover/input:bg-[#800080]/30" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </DraggableWrapper>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add Custom Field Form */}
      {isAddingCustom && (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4 flex flex-col md:flex-row gap-3 items-start">
          <div className="flex-1 w-full relative">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Field Name</label>
            <input
              type="text"
              placeholder="e.g. Project URL"
              className={`w-full rounded-lg border p-2 text-sm focus:ring-[#800080] focus:border-[#800080] ${error ? 'border-red-500' : 'border-gray-300'}`}
              value={customFieldName}
              onChange={(e) => {
                setCustomFieldName(e.target.value);
                if (error) setError('');
              }}
              autoFocus
            />
            {error && <p className="text-red-500 text-[10px] mt-1 absolute -bottom-4 left-0">{error}</p>}
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Field Type</label>
            <select
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-[#800080] focus:border-[#800080]"
              value={customFieldType}
              onChange={(e) => setCustomFieldType(e.target.value)}
            >
              <option value="text">Short Text</option>
              <option value="link">Link (Clickable)</option>
              <option value="long_text">Long Text (Rich)</option>
            </select>
          </div>
          <div className="flex gap-2 w-full md:w-auto pt-5">
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

      {/* Suggestions and Add Button */}
      <div className={`flex flex-wrap gap-2 items-center`}>
        {availableSuggestions.map((s, i) => (
          <div
            key={i}
            onClick={() => handleAddSuggestion(s)}
            className="cursor-pointer text-xs font-medium px-3 py-1.5 rounded-lg !border border-dashed !border-gray-300 bg-gray-50 text-gray-500 hover:bg-[#f6efff] hover:!border-[#800080] hover:text-[#800080] transition-all flex items-center gap-1"
          >
            <FaPlus size={10} /> {s}
          </div>
        ))}
        {!isAddingCustom && (
          <div
            onClick={() => setIsAddingCustom(true)}
            className="cursor-pointer text-xs font-medium px-3 py-1.5 rounded-lg !border !border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-all flex items-center gap-1"
          >
            <FaPlus size={10} /> Custom Field
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpDynamicFields;
