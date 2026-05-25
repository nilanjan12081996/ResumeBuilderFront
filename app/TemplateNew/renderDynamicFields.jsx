import React from 'react';

export const renderDynamicFields = (item, containerStyle) => {
  const customFields = item.customFields || [];
  const fieldOrder = item.fieldOrder || [];
  
  // Combine description (as core field) and custom fields
  let combined = [...customFields];
  if (item.description) {
    combined.push({
      id: 'description',
      name: 'Description',
      value: item.description,
      type: 'long_text',
      isCore: true
    });
  }
  if (item.technologies) {
    combined.push({
      id: 'technologies',
      name: 'Technologies',
      value: item.technologies,
      type: 'text',
      isCore: true
    });
  }
  
  // Sort all fields enforcing strict client rules:
  // 1. Custom fields at the top (ordered by fieldOrder)
  // 2. Description at the bottom
  // 3. Technologies at the very bottom
  combined.sort((a, b) => {
    // Technologies is always last
    if (a.id === 'technologies' && b.id !== 'technologies') return 1;
    if (b.id === 'technologies' && a.id !== 'technologies') return -1;

    // Description is second to last
    if (a.id === 'description' && b.id !== 'description') return 1;
    if (b.id === 'description' && a.id !== 'description') return -1;

    // Other fields sorted by fieldOrder
    const idxA = fieldOrder.indexOf(a.id);
    const idxB = fieldOrder.indexOf(b.id);
    if (idxA === -1 && idxB === -1) return 0;
    if (idxA === -1) return -1; // Un-indexed custom items at top
    if (idxB === -1) return 1;
    return idxA - idxB;
  });
  
  return combined.map(field => {
    if (!field.value) return null;
    
    if (field.id === 'description') {
      return (
         <div key={field.id} className="resume-content" style={{ ...containerStyle, marginTop: "2pt" }} dangerouslySetInnerHTML={{ __html: field.value }} />
      );
    }
    
    if (field.type === 'long_text') {
      return (
         <div key={field.id} style={{ marginTop: "4pt", marginBottom: "2pt" }}>
            <span style={{ ...containerStyle, fontWeight: "bold", display: "block", marginBottom: "1pt" }}>{field.name}:</span>
            <div className="resume-content" style={{ ...containerStyle }} dangerouslySetInnerHTML={{ __html: field.value }} />
         </div>
      );
    } else {
      // Check if it's a link type or looks like a link
      const isLinkType = field.type === 'link' || field.name?.toLowerCase().includes('url') || field.name?.toLowerCase().includes('link');
      
      if (isLinkType) {
        // Support multiple links separated by comma or space
        const links = field.value.split(/[, \s]+/).filter(l => l.trim().length > 0);
        
        return (
          <div key={field.id} style={{ marginTop: "2pt", marginBottom: "2pt" }}>
            <span style={{ ...containerStyle, fontWeight: "bold" }}>{field.name}: </span>
            {links.map((link, idx) => {
              const href = link.startsWith('http') ? link : `https://${link}`;
              return (
                <React.Fragment key={idx}>
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ ...containerStyle, color: "#0000EE", textDecoration: "underline" }}
                  >
                    {link}
                  </a>
                  {idx < links.length - 1 && <span style={containerStyle}>, </span>}
                </React.Fragment>
              );
            })}
          </div>
        );
      }

      return (
         <div key={field.id} style={{ marginTop: "2pt", marginBottom: "2pt" }}>
            <span style={{ ...containerStyle, fontWeight: "bold" }}>{field.name}: </span>
            <span style={containerStyle}>{field.value}</span>
         </div>
      );
    }
  });
};
