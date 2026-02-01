import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ selectedDate, onChange, disabled }) => {
  // Handle 'PRESENT' case
  const parsedDate = selectedDate && selectedDate !== 'PRESENT' 
    ? new Date(selectedDate) 
    : null;

  const handleDateChange = (date) => {
    if (onChange) {
      onChange(date);
    }
  };

  // If disabled or value is PRESENT, show a disabled text input
  if (disabled || selectedDate === 'PRESENT') {
    return (
      <input
        type="text"
        value={selectedDate === 'PRESENT' ? 'Present' : ''}
        disabled
        className="w-full rounded-lg border border-gray-300 p-2 text-sm bg-gray-100"
      />
    );
  }

  return (
    <div className="datepicker-container w-full">
      <DatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        showMonthYearPicker
        dateFormat="MMM, yyyy"
        placeholderText="Select date"
        className="w-full rounded-lg border border-gray-300 p-2 text-sm"
      />
    </div>
  );
};

export default Datepicker;