const fs = require('fs');
const path = '/Users/project_office/frontend/ResumeBuilderFront/app/TemplateNew/CleanTemplate.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/<div key=\{([^}]+)\} style=\{\{\s*marginBottom:\s*["']([^"']+)["'],\s*breakInside:\s*['"]avoid['"],\s*pageBreakInside:\s*['"]avoid['"]\s*\}\}>/g, '<div key={$1} style={{ marginBottom: "$2" }}>');

fs.writeFileSync(path, content);
console.log('Done fixing CleanTemplate.jsx wrappers');
