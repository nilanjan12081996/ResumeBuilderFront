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
    pagePadding: 24,
    sectionSpacing: 16,
    columnGap: 20,
    headerAlignment: "left",
  },
};
