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
  
  // Sort by fieldOrder
  if (fieldOrder.length > 0) {
    combined.sort((a, b) => {
      const idxA = fieldOrder.indexOf(a.id);
      const idxB = fieldOrder.indexOf(b.id);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return -1; // Match ImpDynamicFields.jsx: put un-indexed items at the top
      if (idxB === -1) return 1;
      return idxA - idxB;
    });
  }
  
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
