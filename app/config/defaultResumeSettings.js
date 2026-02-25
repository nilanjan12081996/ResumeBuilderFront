export const defaultResumeSettings = {
  text: {
    // Fonts
    primaryFont: "Arial",
    secondaryFont: "Arial",

    // Line height (index based, see below)
    lineHeight: 1.5, // 50%

    // Font scale: 0 = S, 1 = M, 2 = L
    fontScale: 1,


    primaryHeading: 24.5,
    secondaryHeading: 18.5,
    body: 9,
    sectionTitle: 12,


    primaryHeadingWeight: "700", // Bold
    secondaryHeadingWeight: "700", // Bold
    bodyWeight: "400", // Regular
    sectionTitleWeight: "600", // Semibold
  },

  templateTextOverrides: {
    professional: {
      secondaryHeading: 9,
    },
    clear: {
      secondaryHeading: 10,
    },
    vivid: {
      secondaryHeading: 10,
    },
  },

  layout: {
    pageFormat: "A4",            // default page format
    topBottom: 25,               // 0.50 in × 72 = 36pt
    leftRight: 25,
    betweenSections: 16,         // pt
    betweenTitlesContent: 3,     // pt  
    columnGap: 20,               // keep same as before
    headerAlignment: "left",
  },
  theme: {
    defaultColor: "#2E86C1",
    template: "ats",
    templateColors: {
      professional: "#7c3aed",
      ats: "#2E86C1",
      clean: "#1C1C1C",
      clear: "#77c092",
      vivid: "#FF6F61",
      corporate: "#0B3D91",
      linkedin: "#293d48"
    },
  },
  ai: {
    summary_count: 5,
    experience_count: 5,
  },
};
