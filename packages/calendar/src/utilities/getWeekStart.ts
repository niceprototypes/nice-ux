/**
 * Regions whose weeks start on Sunday — used only when the engine has no
 * `Intl.Locale` week info. Convention (a short list of common regions, drawn
 * from CLDR's `firstDay` data), not exhaustive.
 */
export const SUNDAY_START_REGIONS: readonly string[] = ["US", "CA", "JP", "IL", "BR", "MX", "KR", "TW", "PH", "IN"]

/**
 * Regions whose weeks start on Saturday — used only when the engine has no
 * `Intl.Locale` week info. Convention (common MENA regions, drawn from CLDR's
 * `firstDay` data), not exhaustive.
 */
export const SATURDAY_START_REGIONS: readonly string[] = [
  "AE", "AF", "BH", "DZ", "EG", "IQ", "IR", "JO", "KW", "LY", "OM", "QA", "SD", "SY",
]

type WeekInfo = { firstDay?: number }
type LocaleWithWeekInfo = Intl.Locale & { getWeekInfo?: () => WeekInfo; weekInfo?: WeekInfo }

/**
 * First day of the week for a locale, 0 = Sunday … 6 = Saturday.
 *
 * Reads `Intl.Locale.prototype.getWeekInfo()` (or the older `weekInfo`
 * accessor) and converts its ISO weekday (1 = Monday … 7 = Sunday). When the
 * engine provides neither, falls back to the region tables above: Sunday or
 * Saturday for the listed regions, otherwise Monday. The region comes from the
 * tag, or from `maximize()` when the tag has none ("en" → "US").
 *
 * @param locale - BCP 47 language tag
 * @returns Weekday index the week starts on
 */
export function getWeekStart(locale: string): number {
  let intlLocale: LocaleWithWeekInfo
  try {
    intlLocale = new Intl.Locale(locale) as LocaleWithWeekInfo
  } catch {
    return 1
  }
  try {
    const info = typeof intlLocale.getWeekInfo === "function" ? intlLocale.getWeekInfo() : intlLocale.weekInfo
    if (info && typeof info.firstDay === "number") return info.firstDay % 7
  } catch {
    // Fall through to the region table
  }
  let region = intlLocale.region
  if (!region) {
    try {
      region = intlLocale.maximize().region
    } catch {
      region = undefined
    }
  }
  if (region && SUNDAY_START_REGIONS.includes(region)) return 0
  if (region && SATURDAY_START_REGIONS.includes(region)) return 6
  return 1
}
