const fs = require('fs');

const formValues = {
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com'
};

const sections = [
  { type: 'summary', summary: 'I am a software engineer.' }
];

const resumeSettings = {
  theme: { template: 'clear' },
  text: { primaryFont: 'Arial' },
  layout: {}
};

const params = { formValues, sections, resumeSettings, themeColor: '#000000' };

// copy buildClearDocxHtml and renderSectionBody from useDownload.js
