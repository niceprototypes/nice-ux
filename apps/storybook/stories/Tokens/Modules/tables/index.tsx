// The token-table configs now live in the central data surface
// `src/dataTables/data.tsx` (one place to survey every table). This barrel
// re-exports them so the Tokens/Docs page and the standalone Tokens/<group>
// stories keep importing from `./tables`.
export type { TokenTable } from "../../../../src/dataTables/data"
export { tokenTables, tokenTableList } from "../../../../src/dataTables/data"
