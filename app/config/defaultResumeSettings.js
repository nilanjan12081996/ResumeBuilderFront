export const defaultResumeSettings = {
  text: {
    // Fonts
    primaryFont: "Arial",
    secondaryFont: "Arial",

    // Line height (index based, see below)
    lineHeight: 1.5, // 50%

    // Font scale: 0 = S, 1 = M, 2 = L
    fontScale: 1,

    // Font sizes (Prime ATS)
    primaryHeading: 24.5,
    secondaryHeading: 18.5,
    body: 10,
    sectionTitle: 12,

    // Font weights (Prime ATS)
    primaryHeadingWeight: "700", // Bold
    secondaryHeadingWeight: "700", // Bold
    bodyWeight: "400", // Regular
    sectionTitleWeight: "600", // Semibold
  },

  layout: {
    pageFormat: "A4",            // default page format
    topBottom: 36,               // 0.50 in × 72 = 36pt
    leftRight: 36,               // 0.50 in × 72 = 36pt
    betweenSections: 16,         // pt
    betweenTitlesContent: 3,     // pt
    columnGap: 20,               // keep same as before
  },
};
