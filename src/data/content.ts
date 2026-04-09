export const siteContent = {
  meta: {
    title: "Portfolio",
  },
  navigation: {
    brand: "",
    primaryAriaLabel: "Primary",
    about: "About",
    projects: "Projects",
    contact: "Get in Touch",
  },
  hero: {
    badge: "iOS Engineer",
    title: {
      lead: "Senior",
      accent: "iOS Engineer.",
    },
    lead:
      "I build and ship high-quality iOS apps with a focus on clean architecture, polished UX, and reliable delivery. I turn complex product ideas into scalable mobile products that are ready for real users and real business needs.",
    connectLabel: "Connect",
    locationLabel: "Location",
    locationValue: "Lisbon, Portugal - available worldwide",
    portraitAriaLabel: "Developer portrait",
    portraitAlt: "Developer portrait",
    detailsTitle: "Engineering the Next Frontier.",
  },
  skills: [
    {
      title: "Interface Engineering",
      description:
        "SwiftUI and UIKit systems with dense layouts, motion detail, and premium interaction polish.",
    },
    {
      title: "Data Persistence",
      description:
        "Architecture for CloudKit, Core Data, Realm, and sync flows that stay resilient under load.",
    },
    {
      title: "Performance T&A",
      description:
        "Profiling, frame-budget tuning, and reducing UI overhead before it becomes a product tax.",
    },
    {
      title: "System Architecture",
      description:
        "MVVM, modular app structure, and reusable product patterns for scalable iOS delivery.",
    },
  ],
  contact: {
    title: "Initiate Project",
    identityLabel: "Identity",
    identityPlaceholder: "Full Name",
    endpointLabel: "Endpoint",
    endpointPlaceholder: "name@company.com",
    detailsLabel: "Details",
    detailsPlaceholder: "Your app vision...",
    submit: "Send Signal",
  },
  projectsSection: {
    title: "Selected Projects",
    description:
      "A collection of iOS apps combining polished interfaces, seamless UX, and reliable performance.",
    openCaseStudy: "Open Case Study",
    previewGalleryLabel: "preview gallery",
    videoPreviewSuffix: "video preview",
    screenAltSuffix: "screen",
    walkthroughVideoSuffix: "walkthrough video",
  },
  footer: {
    description: "Available for contract iOS development.",
  },
  modal: {
    close: "Close",
    previousAsset: "Show previous asset",
    nextAsset: "Show next asset",
    assetsAriaLabel: "Project media assets",
    linksLabel: "Links",
    videoBadge: "Video",
    videoThumbnailSuffix: "video thumbnail",
  },
  links: [
    // { label: "GitHub", url: "https://github.com/" },
    // { label: "LinkedIn", url: "https://www.linkedin.com/" },
    // { label: "Twitter (X)", url: "https://x.com/" },
    { label: "Email: kirill.pyulzyu@gmail.com", url: "mailto:kirill.pyulzyu@gmail.com" },
  ],
} as const;
