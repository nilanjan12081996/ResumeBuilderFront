const fs = require('fs');
const path = '/Users/project_office/frontend/ResumeBuilderFront/app/TemplateNew/ClearTemplate.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/<div key=\{([^}]+)\} style=\{\{\s*marginBottom:\s*["']([^"']+)["'],\s*breakInside:\s*['"]avoid['"],\s*pageBreakInside:\s*['"]avoid['"]\s*\}\}>/g, '<div key={$1} style={{ marginBottom: "$2" }}>');

const pattern = /<div key=\{[^}]+\} style=\{\{\s*marginBottom:\s*["'][^"']+["']\s*\}\}>([\s\S]*?)(?=\{renderDynamicFields)/g;
content = content.replace(pattern, (match, innerContent) => {
  const keyMatch = match.match(/<div key=\{[^}]+\} style=\{\{\s*marginBottom:\s*["'][^"']+["']\s*\}\}>/);
  const keyPart = keyMatch[0];

  return `${keyPart}
    <div className="section-heading" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>${innerContent}    </div>
    `;
});

fs.writeFileSync(path, content);
console.log('Done fixing ClearTemplate.jsx titles');
