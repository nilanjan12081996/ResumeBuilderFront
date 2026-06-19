const fs = require('fs');
const path = '/Users/project_office/frontend/ResumeBuilderFront/app/TemplateNew/Professional.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<div style=\{\{\s*\.\.\.bodyStyle,\s*fontWeight:\s*'bold',\s*color:\s*'#000'\s*\}\}>\s*([\s\S]*?)\s*<\/div>\s*\{dateRange\([^}]+\)\s*&&\s*\(\s*<div style=\{\{\s*fontSize:\s*`\$\{text\.body - 1\}pt`,\s*color:\s*'#9ca3af',\s*textTransform:\s*'uppercase',\s*marginBottom:\s*'2pt'(?:,\s*letterSpacing:\s*'0.05em')?\s*\}\}>\s*\{dateRange([^}]+)\}\s*<\/div>\s*\)\s*\}/g;

content = content.replace(regex, (match, title, dateInner) => {
  return `<EntryHeader title={<>${title.trim()}</>} date={dateRange${dateInner}} />`;
});

fs.writeFileSync(path, content);
console.log('Done replacing Professional.jsx titles');
