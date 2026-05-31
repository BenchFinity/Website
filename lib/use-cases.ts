export type UseCaseStatus = "live-foundation" | "roadmap";

export type UseCase = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  status: UseCaseStatus;
  statusLabel: string;
  keywords: string[];
  liveToday: string[];
  roadmap: string[];
  proof: string[];
};

export const featuredUseCases: UseCase[] = [
  {
    slug: "model-railroad",
    title: "Model railroad and HO rolling stock",
    eyebrow: "Beachhead",
    description:
      "Use the shipped baseplate generator as the foundation for a measured, visible, retrievable rolling-stock storage system. Cradles, labels, and whole-roster generation are roadmap.",
    status: "roadmap",
    statusLabel: "Roadmap system, live baseplate foundation",
    keywords: [
      "Gridfinity model railroad",
      "HO scale storage",
      "rolling stock storage",
    ],
    liveToday: [
      "Generate Gridfinity-compatible baseplates in the browser.",
      "Export STL, split ZIP, and Bambu Studio-style 3MF files.",
      "Use printer-bed presets, auto-split, magnets, connectors, and 42 mm pitch.",
    ],
    roadmap: [
      "Capture a roster by measurement, photo, or scan.",
      "Generate fitted rolling-stock trays and dividers for specific car lengths.",
      "Keep labels, cradles, and baseplates coordinated across the collection.",
    ],
    proof: [
      "Designed for large, irregular, valuable collections.",
      "Fit and protection matter more than generic cubbies.",
      "Published models will be the proof surface once real fitted trays exist.",
    ],
  },
  {
    slug: "toolbox-buildout",
    title: "Toolbox and tool-chest buildouts",
    eyebrow: "Workshop",
    description:
      "Turn a drawer or box into a consistent Gridfinity-standard layout. Today, Workbench generates the baseplate foundation; whole-loadout inserts and labeling are roadmap.",
    status: "roadmap",
    statusLabel: "Roadmap loadout, live baseplate foundation",
    keywords: [
      "Gridfinity tool chest",
      "toolbox organization",
      "Packout Gridfinity",
    ],
    liveToday: [
      "Generate baseplates sized to the drawer or tray you measure.",
      "Split large layouts for the printer bed you actually own.",
      "Configure magnets and connectors for the physical grid.",
    ],
    roadmap: [
      "Ingest a set of tools and generate coordinated inserts.",
      "Bridge Gridfinity layouts into Packout-style organizers.",
      "Maintain a consistent labeling and layout system across boxes.",
    ],
    proof: [
      "Built around tools with known slots, not loose storage.",
      "Fit and durability are the adoption test.",
      "The same grid logic can carry from bench drawer to job box.",
    ],
  },
  {
    slug: "tool-tracing",
    title: "Tool tracing and fitted trays",
    eyebrow: "Roadmap",
    description:
      "Capture a tool outline, generate a fitted tray or shadow-board cell, and keep it aligned with the rest of the workspace system. This is a roadmap capability.",
    status: "roadmap",
    statusLabel: "Roadmap capability",
    keywords: [
      "Gridfinity tool insert",
      "tool shadow board",
      "fitted tray generator",
    ],
    liveToday: [
      "Generate the Gridfinity-compatible baseplate under the tray.",
      "Use deterministic parameters for the grid, pitch, connectors, and print bed.",
      "Export print-ready files without an account.",
    ],
    roadmap: [
      "Trace a tool from photo, scan, or measurement.",
      "Generate fitted trays, foam-style shadow cells, and labels.",
      "Adjust geometry and keep the tray coordinated with the larger system.",
    ],
    proof: [
      "Described functionally, without competitor naming.",
      "Roadmap-labeled anywhere the fitted tray generation appears.",
      "The shipped baseplate generator remains the present-tense claim.",
    ],
  },
];

export const expansionUseCases = [
  {
    title: "Electronics and SMD parts",
    description:
      "SMD strips, reel storage, IC tubes, and small-parts trays are an early expansion target. Inventory ingestion and BOM-driven layouts are roadmap.",
  },
  {
    title: "Gridfinity to Milwaukee Packout",
    description:
      "Packout bridge inserts have proven demand. Benchfinity will treat the bridge as part of a coordinated loadout, not a one-model adapter.",
  },
  {
    title: "Camera, tackle, board games, ammo, and 5S",
    description:
      "Additional verticals prove breadth once real models and workflows exist. They stay index-level until there is enough content for dedicated pages.",
  },
] as const;

export function getUseCase(slug: string) {
  return featuredUseCases.find((useCase) => useCase.slug === slug) ?? null;
}
