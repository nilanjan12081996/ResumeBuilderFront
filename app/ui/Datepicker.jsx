// import React from 'react';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const Datepicker = ({ selectedDate, onChange, disabled }) => {
//   // Handle 'PRESENT' case
//   const parsedDate = selectedDate && selectedDate !== 'PRESENT' 
//     ? new Date(selectedDate) 
//     : null;

//   const handleDateChange = (date) => {
//     if (onChange) {
//       onChange(date);
//     }
//   };

//   // If disabled or value is PRESENT, show a disabled text input
//   if (disabled || selectedDate === 'PRESENT') {
//     return (
//       <input
//         type="text"
//         value={selectedDate === 'PRESENT' ? 'Present' : ''}
//         disabled
//         className="w-full rounded-lg border border-gray-300 p-2 text-sm bg-gray-100"
//       />
//     );
//   }

//   return (
//     <div className="datepicker-container w-full">
//       <DatePicker
//         selected={parsedDate}
//         onChange={handleDateChange}
//         showMonthYearPicker
//         dateFormat="MMM, yyyy"
//         placeholderText="Select date"
//         className="w-full rounded-lg border border-gray-300 p-2 text-sm"
//       />
//     </div>
//   );
// };

// export default Datepicker;

import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ selectedDate, onChange, disabled }) => {
  
  // Helper to convert string or null to a valid Date object
  const parseDate = (dateVal) => {
    if (!dateVal || dateVal === 'PRESENT' || dateVal === 'Present') return null;
    
    const date = new Date(dateVal);
    // If Date is valid, return it; otherwise return null to avoid RangeError
    return !isNaN(date.getTime()) ? date : null;
  };

  const parsedDate = parseDate(selectedDate);

  const handleDateChange = (date) => {
    if (onChange) {
      // Pass the date back (usually you'll want to format this to a string for your API)
      onChange(date);
    }
  };

  // If the job is current, we show a 'Present' indicator instead of a picker
  if (disabled || selectedDate === 'PRESENT') {
    return (
      <input
        type="text"
        value={selectedDate === 'PRESENT' ? 'Present' : ''}
        readOnly
        disabled
        className="w-full rounded-lg border border-gray-300 p-2 text-sm bg-gray-100 cursor-not-allowed"
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
        className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:ring-[#800080] focus:border-[#800080]"
      />
    </div>
  );
};

export default Datepicker;