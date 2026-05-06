const dates = ["02/2024", "12/2025", "Nov’23", "Nov’2013", "Aug’2010", "2024-02", "11/22"];

const normalizeDateStr = (dateStr) => {
  if (!dateStr) return "";
  dateStr = dateStr.trim();
  // If the string is already YYYY-MM, return it
  if (/^\d{4}-\d{2}$/.test(dateStr)) return dateStr;
  
  // If it's MM/YYYY, convert to YYYY-MM
  const mmYyyyMatch = dateStr.match(/^(\d{2})\/(\d{4})$/);
  if (mmYyyyMatch) {
    return `${mmYyyyMatch[2]}-${mmYyyyMatch[1]}`;
  }

  // If it's MM/YY, convert to YYYY-MM
  const mmYyMatch = dateStr.match(/^(\d{2})\/(\d{2})$/);
  if (mmYyMatch) {
    return `20${mmYyMatch[2]}-${mmYyMatch[1]}`;
  }

  // If it's MM-YYYY, convert to YYYY-MM
  const mmYyyyMatchDash = dateStr.match(/^(\d{2})-(\d{4})$/);
  if (mmYyyyMatchDash) {
    return `${mmYyyyMatchDash[2]}-${mmYyyyMatchDash[1]}`;
  }

  // If it's something like Jan 2024 or Jan'24 or Nov’23
  const monthMap = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
  };
  
  const strLower = dateStr.toLowerCase();
  for (const [mName, mNum] of Object.entries(monthMap)) {
    if (strLower.startsWith(mName)) {
        // extract year
        const yearMatch = dateStr.match(/\d{2,4}$/);
        if (yearMatch) {
          let year = yearMatch[0];
          if (year.length === 2) year = '20' + year; // assume 2000s for 2-digit years
          return `${year}-${mNum}`;
        }
    }
  }

  // If it's just a year (e.g. 2013)
  if (/^\d{4}$/.test(dateStr)) {
     return `${dateStr}-01`;
  }

  // Fallback
  return dateStr;
};

dates.forEach(d => console.log(`${d} -> ${normalizeDateStr(d)}`));

const bullets = ["• Architected and led", "- Built dynamic", "* Established testing", "Mentored and led"];
const cleanBullet = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/^[\u2022\-\*\u25E6\u2023\u25BA]\s*/, '');
};

bullets.forEach(b => console.log(`${b} -> ${cleanBullet(b)}`));
