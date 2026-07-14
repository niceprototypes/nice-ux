// Central data surface for every design-system table, organized by context (the
// consuming table component): `tables/moduleTokenTable/` and
// `tables/componentDemoTable/`, each a folder of one-file-per-config. The shared
// preview machinery lives in `constants`/`styles` here and `../utilities`.
export * from "./tables/moduleTokenTable"
export * from "./tables/componentDemoTable"
