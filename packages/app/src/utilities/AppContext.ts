import * as React from "react"
import type { AppEntryType } from "../components/App/App.types"

/** What the shell shares with the scenes under it (services/useScenes, services/useSceneRegion). */
export type AppContextValue = {
  entries: AppEntryType[]
  current: AppEntryType | undefined
  bare: boolean
  open: (entry: AppEntryType) => void
  preload: (entry: AppEntryType) => void
  region: React.RefObject<HTMLDivElement | null>
}

export const AppContext = React.createContext<AppContextValue | null>(null)

/** The shell's context; throws outside an App. */
export const useAppContext = () => {
  const value = React.useContext(AppContext)
  if (!value) throw new Error("@niceprototypes/app: this hook runs only inside <App>")
  return value
}
