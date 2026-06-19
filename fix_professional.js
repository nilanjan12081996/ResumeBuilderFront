const fs = require('fs');

const path = '/Users/project_office/frontend/ResumeBuilderFront/app/TemplateNew/Professional.jsx';
let content = fs.readFileSync(path, 'utf8');

// The pattern for the wrapper:
const pattern = /<div key=\{[^}]+\} style=\{\{\s*marginBottom:\s*'8pt',\s*breakInside:\s*'avoid',\s*pageBreakInside:\s*'avoid'\s*\}\}>([\s\S]*?)(?=\{renderDynamicFields)/g;

content = content.replace(pattern, (match, innerContent) => {
  // Extract the key part to reconstruct the wrapper
  const keyMatch = match.match(/<div key=\{[^}]+\}/);
  const keyPart = keyMatch[0];

  return `${keyPart} style={{ marginBottom: '8pt' }}>
    <div className="section-heading" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>${innerContent}    </div>
    `;
});

fs.writeFileSync(path, content);
console.log('Done fixing Professional.jsx');
