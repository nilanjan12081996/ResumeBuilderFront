
// import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
//   <button
//     ref={ref}
//     type="button"
//     // Changed bg-gray-100 to bg-white for better contrast
//     // Added outline-none to prevent default browser rings from clashing with custom borders
//     className="date_picker w-full bg-white border border-gray-400 rounded-lg p-2 text-left text-sm text-gray-800 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 min-h-[40px] transition-all outline-none"
//     onClick={onClick}
//   >
//     {value || "Select Date"}
//   </button>
// ));

// const Datepicker = ({ selectedDate, onChange }) => {
//   return (
//     <div className="datepicker-container w-full">
//       <DatePicker
//         selected={selectedDate}
//         onChange={onChange}
//         showMonthYearPicker
//         dateFormat="MMM, yyyy"
//         customInput={<CustomDateInput />}
//         portalId="root-portal" 
//         // Add this to ensure the wrapper doesn't shrink to 0px
//         wrapperClassName="w-full"
//       />
//     </div>
//   );
// };
// export default Datepicker;



// Datepicker.js
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    ref={ref}
    type="button"
    className="date_picker w-full bg-white border border-gray-400 rounded-lg p-2 text-left text-sm text-gray-800 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 min-h-[40px] transition-all outline-none"
    onClick={onClick}
  >
    {value || "Select Date"}
  </button>
));

const Datepicker = ({ selectedDate, onChange }) => {
  // 1. SAFELY PARSE STRING TO DATE
  // If selectedDate is a string (ISO), convert it to Date object. 
  // If it's undefined/null, keep it null.
  const parsedDate = selectedDate ? new Date(selectedDate) : null;

  const handleDateChange = (date) => {
    if (!date) {
      onChange(null);
      return;
    }

    // 2. TIMEZONE CORRECTION
    // Get the timezone offset in minutes and convert to milliseconds
    // We SUBTRACT the offset to force the UTC time to match your Local calendar date
    const offsetDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    
    // Convert to ISO String (This will now look like "2026-04-01T00:00:00.000Z")
    onChange(offsetDate.toISOString());
  };

  return (
    <div className="datepicker-container w-full">
      <DatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        showMonthYearPicker
        dateFormat="MMM, yyyy"
        customInput={<CustomDateInput />}
        portalId="root-portal"
        wrapperClassName="w-full"
      />
    </div>
  );
};

export default Datepicker;