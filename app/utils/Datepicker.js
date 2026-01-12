import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

const CustomDateInput = ({ value, onClick }) => (
  <button
    className="w-full bg-slate-100 border-none rounded-md p-3 text-left text-sm text-gray-800 focus:ring-2 focus:ring-blue-500"
    onClick={onClick}
  >
    {value || "Select Date"}
  </button>
);

// const Datepicker = ({ selectedDate, onChange }) => {
//   return (
//     <DatePicker
//       selected={selectedDate}
//       onChange={onChange}
//       // This setting hides the days and shows the 3x4 month grid
//       showMonthYearPicker
//       // Matches your screenshot format: "Jan, 2026"
//       dateFormat="MMM, yyyy"
//       // Custom input to match your grey-themed text fields
//       customInput={<CustomDateInput />}
//     />
//   );
// };
export default Datepicker