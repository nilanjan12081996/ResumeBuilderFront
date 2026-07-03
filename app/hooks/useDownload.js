import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { generatePDF, generateDocx, decreaseSubscriptionCount } from '../reducers/ResumeSlice';
import { toast } from 'react-toastify';

const GOOGLE_FONT_MAP = {
  'Roboto': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
  'Open Sans': 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap',
  'Lato': 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap',
  'Montserrat': 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap',
  'Source Sans Pro': 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap',
  'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap',
  'Playfair Display': 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap',
  'Merriweather': 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&display=swap',
  'Lora': 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;700&display=swap',
  'Libre Baskerville': 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap',
  'Outfit': 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap'
};

const fontStack = (fontName) => {
  if (!fontName) return 'Arial';
  const serifFonts = new Set(['Playfair Display', 'Merriweather', 'Lora', 'Libre Baskerville', 'Times New Roman', 'Georgia']);
  if (serifFonts.has(fontName)) {
    return 'Times New Roman';
  }
  return 'Arial';
};

export const useDownload = ({ componentRef, formValues, resumeSettings, sections, themeColor, resumeType }) => {
  const dispatch = useDispatch();
  const latestParams = useRef();
  latestParams.current = { componentRef, formValues, resumeSettings, sections, themeColor, resumeType };

  const processImagesForDocx = async (container) => {
    const images = Array.from(container.querySelectorAll('img'));
    for (let img of images) {
      if (img.style.borderRadius === '50%' || img.style.borderRadius === '9999px') {
        try {
          const originalSrc = img.src;
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const imageObj = new Image();
          imageObj.crossOrigin = "Anonymous";
          await new Promise((resolve, reject) => {
            imageObj.onload = resolve;
            imageObj.onerror = reject;
            imageObj.src = originalSrc;
          });
          const size = Math.min(imageObj.width, imageObj.height);
          canvas.width = size;
          canvas.height = size;
          ctx.beginPath();
          ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(imageObj, (imageObj.width - size)/2, (imageObj.height - size)/2, size, size, 0, 0, size, size);
          img.src = canvas.toDataURL('image/png');
          img.style.borderRadius = '0';
        } catch(e) {
          console.error("Failed to make image circular", e);
        }
      }
    }
  };

  const generateHtmlString = async (useRaw = false, processImages = false) => {
    const { componentRef, rawContentRef, resumeSettings, themeColor } = latestParams.current;
    const resumeEl = useRaw ? (rawContentRef?.current || componentRef.current) : componentRef.current;
    if (!resumeEl) return null;

    const cloned = resumeEl.cloneNode(true);
    if (cloned.style) {
      cloned.style.display = 'block';
    }
    cloned.querySelectorAll('*').forEach(el => {
      const s = el.style;
      if (!s) return;
      const cn = typeof el.className === 'string' ? el.className : '';
      if (
        s.overflow === 'auto' || s.overflow === 'scroll' ||
        s.overflowY === 'auto' || s.overflowY === 'scroll' ||
        cn.includes('overflow-y-auto') || cn.includes('overflow-y-scroll') ||
        cn.includes('h-screen') || cn.includes('hide-scrollbar')
      ) {
        s.overflow = 'visible';
        s.overflowY = 'visible';
        s.height = 'auto';
        s.maxHeight = 'none';
      }
      
      // html-docx-js sets DOCX fonts directly from inline styles. 
      // MS Word for Mac panics and falls back to Symbol/Wingdings if it doesn't recognize a web font (like 'Inter').
      // We must map all inline fonts to safe system fonts for DOCX.
      if (processImages && s.fontFamily) {
        s.fontFamily = fontStack(s.fontFamily.replace(/['"]/g, '').split(',')[0].trim());
      }
    });

    if (processImages && cloned.style.fontFamily) {
      cloned.style.fontFamily = fontStack(cloned.style.fontFamily.replace(/['"]/g, '').split(',')[0].trim());
    }

    if (processImages) {
      await processImagesForDocx(cloned);
    }

    const primaryFont = resumeSettings && resumeSettings.text ? resumeSettings.text.primaryFont : 'Arial';
    const template = (resumeSettings && resumeSettings.theme && resumeSettings.theme.template) ? resumeSettings.theme.template : '';
    
    const getFontLinks = (...fontNames) => [...new Set(fontNames.filter(Boolean))].map(f => GOOGLE_FONT_MAP[f] ? '<link rel="stylesheet" href="' + GOOGLE_FONT_MAP[f] + '"/>' : '').join('\n');

    return [
      '<!DOCTYPE html><html lang="en"><head>',
      '<meta charset="UTF-8"/>',
      getFontLinks(primaryFont),
      '<style>',
      '  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; box-sizing: border-box; font-family: ' + fontStack(primaryFont) + ' !important; }',
      '  body { margin: 0; padding: 0; font-family: ' + fontStack(primaryFont) + '; }',
      '  @page { size: 794px 1123px; margin: 0; }',
      '  table { border-collapse: collapse; }',
      '  td { vertical-align: top; }',
      '  a { color: inherit; text-decoration: none; }',
      '  ul { list-style-type: disc; padding-left: 1.2rem; margin: 0; }',
      '  ol { list-style-type: decimal; padding-left: 1.2rem; margin: 0; }',
      '  li { margin: 0; break-inside: auto; page-break-inside: auto; }',
      '  p { margin: 0; break-inside: auto; page-break-inside: auto; }',
      template === 'professional' ? '  #professional-resume-wrapper { background: linear-gradient(to right, ' + (themeColor || '#2c3e50') + ' 35%, #ffffff 35%) !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }' : '',
      '</style>',
      '</head><body>',
      cloned.outerHTML,
      '</body></html>',
    ].join('\n');
  };

  const handleDownloadPDF = async () => {
    const { formValues, resumeType } = latestParams.current;
    try {
      const fullHtml = await generateHtmlString();
      if (!fullHtml) return;

      const decreaseResult = await dispatch(decreaseSubscriptionCount(resumeType));
      if (decreaseSubscriptionCount.rejected.match(decreaseResult)) {
        toast.error("Download limit reached. Please upgrade your plan.");
        return;
      }

      const result = await dispatch(generatePDF(fullHtml));
      if (generatePDF.fulfilled.match(result)) {
        const blob = result.payload;
        const fileUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = (formValues.first_name || 'resume') + '_' + (formValues.last_name || '') + '.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(fileUrl);
      } else {
        console.error('PDF generation failed', result);
      }
    } catch (err) {
      console.error('PDF download error:', err);
    }
  };

  const handleDownloadDocx = async () => {
    const { formValues, resumeType } = latestParams.current;
    try {
      const fullHtml = await generateHtmlString(true, true);
      if (!fullHtml) return;

      const decreaseResult = await dispatch(decreaseSubscriptionCount(resumeType));
      if (decreaseSubscriptionCount.rejected.match(decreaseResult)) {
        toast.error("Download limit reached. Please upgrade your plan.");
        return;
      }

      const result = await dispatch(generateDocx(fullHtml));
      if (generateDocx.fulfilled.match(result)) {
        const blob = result.payload;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (formValues.first_name || 'resume') + '_' + (formValues.last_name || '') + '.docx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } else {
        console.error('DOCX generation failed', result);
      }
    } catch (err) {
      console.error('DOCX download error:', err);
    }
  };

  useEffect(() => {
    window.addEventListener('download-pdf', handleDownloadPDF);
    return () => window.removeEventListener('download-pdf', handleDownloadPDF);
  }, [formValues, resumeSettings, sections, themeColor]);

  useEffect(() => {
    window.addEventListener('download-docx', handleDownloadDocx);
    return () => window.removeEventListener('download-docx', handleDownloadDocx);
  }, [formValues, resumeSettings, sections, themeColor]);

  return { handleDownloadPDF, handleDownloadDocx };
};
