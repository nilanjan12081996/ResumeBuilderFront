const fs = require('fs');
const path = '/Users/project_office/frontend/ResumeBuilderFront/app/TemplateNew/CleanTemplate.jsx';
let content = fs.readFileSync(path, 'utf8');

// Insert EntryHeader after SectionHeading
content = content.replace(/  \/\/ ── SectionHeading ────────────────────────────────────────────────────────[\s\S]+?  \/\/ ── SkillBar/, `  // ── SectionHeading ────────────────────────────────────────────────────────
  const SectionHeading = ({ title }) => (
    <div className="section-heading" style={{ marginBottom: \`\${betweenTitlesContent}pt\` }}>
      <span style={{
        fontFamily: secondaryFont,
        fontSize: \`\${sectionTitleSize}pt\`,
        fontWeight: sectionTitleWeight,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: "#111",
        display: "block",
        breakInside: "avoid", pageBreakInside: "avoid"
      }}>
        {title}
      </span>
      <div style={{ width: "28pt", borderBottom: "2pt solid #111", marginTop: "3pt", breakInside: "avoid", pageBreakInside: "avoid" }} />
    </div>
  );

  const EntryHeader = ({ left, right }) => (
    <div className="section-heading" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", breakInside: "avoid", pageBreakInside: "avoid" }}>
      <span style={titleStyle}>{left}</span>
      {right && <span style={dateStyle}>{right}</span>}
    </div>
  );

  // ── SkillBar`);

// Replace title blocks with EntryHeader
const pattern = /<span style=\{titleStyle\}>\s*([\s\S]*?)\s*<\/span>\s*(?:\{dateRange\([^}]+\)\s*&&\s*<span style=\{dateStyle\}>([^<]+)<\/span>\})?/g;
content = content.replace(pattern, (match, left, right) => {
  if (match.includes('dateRange')) {
    const dateMatch = match.match(/\{dateRange([^}]+)\}/);
    return `<EntryHeader left={<>${left}</>} right={dateRange${dateMatch[1]}} />`;
  } else {
    return `<EntryHeader left={<>${left}</>} />`;
  }
});

fs.writeFileSync(path, content);
console.log('Done fixing CleanTemplate titles');
