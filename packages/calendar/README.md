# nice-react-calendar

Date selection for React. `Calendar` is an ISO-date month grid with locale week
start and RTL-aware keyboard navigation; `DateField` is a picker field built on
`nice-react-input` and `nice-react-popover`. Part of the Nice Prototypes
ecosystem.

## Install

```bash
npm install nice-react-calendar
```

Peer dependencies: `react`, `react-dom` (>=19.2), `styled-components` (>=6.1.18).

Multi-component package: named exports only, no default.

## Usage

### Calendar

```tsx
import { Calendar } from "nice-react-calendar"

const [date, setDate] = React.useState<string | null>("2026-09-24")

<Calendar value={date} onChange={setDate} min="2026-01-01" aria-label="Delivery date" />
```

### DateField

```tsx
import { DateField } from "nice-react-calendar"

<form>
  <DateField name="start" aria-label="Start date" defaultValue="2026-09-24" />
</form>
// FormData: start=2026-09-24
```

### Inside a Field

`DateField` renders through `Input`, so a nice-react-field `Field` wires the
label, description and error with no extra props.

```tsx
import { Field } from "nice-react-field"

<Field label="Start date" description="First day of the booking">
  <DateField name="start" value={start} onChange={setStart} />
</Field>
```

### ISO date contract

Dates cross the API only as ISO 8601 `YYYY-MM-DD` strings (`CalendarDateType`).
A JS `Date` is never accepted or returned: `Date` is Gregorian-only and bound to
a time zone, and a string keeps the public type calendar-agnostic. Internally all
arithmetic is UTC-based (`Date.UTC` / `getUTC*`); only "today" reads the local
wall-clock date. Invalid ISO strings are treated as no value.

v1 is **Gregorian only** — labels are formatted with `calendar: "gregory"`, while
the numbering system still follows the locale (e.g. Arabic-Indic digits for
`ar-EG`).

### RTL

Direction comes from `useLocale()` (nice-react-styles): `StylesProvider`'s `dir`,
else `document.documentElement.dir`, else the locale. Under RTL, ArrowLeft /
ArrowRight are mirrored (ArrowLeft moves to the next day) and the month
navigation carets swap. Layout uses flex on the inline axis, so the header and
grid mirror with the document direction.

## Props

### Calendar

| Prop | Type | Notes |
|---|---|---|
| `value` | `string \| null` | Selected ISO date (controlled) |
| `defaultValue` | `string \| null` | Initial ISO date (uncontrolled) |
| `onChange` | `(value: string) => void` | Called with the selected ISO date |
| `min`, `max` | `string` | Inclusive ISO bounds; focus and month navigation stop at them |
| `isDateDisabled` | `(value: string) => boolean` | Disabled dates stay focusable (`aria-disabled`) |
| `locale` | `string` | BCP 47 tag. Default `useLocale().locale` |
| `firstDayOfWeek` | `0–6` | 0 = Sunday. Default from the locale |
| `size` | `SizeType` | Cell size (`calendar.cell.size`) and nav-button size. Default `"base"` |
| `aria-label`, `className`, `theme`, `ref`, `breakpoints` | | Standard; `aria-label` names the root group |

Week start: `Intl.Locale#getWeekInfo()` (or `weekInfo`). Without it, a
convention table is used: Sunday for US, CA, JP, IL, BR, MX, KR, TW, PH, IN;
Saturday for AE, AF, BH, DZ, EG, IQ, IR, JO, KW, LY, OM, QA, SD, SY; otherwise
Monday.

Keyboard (on a day): ArrowLeft/Right ±1 day (mirrored in RTL), ArrowUp/Down
±7 days, Home/End start/end of the week, PageUp/PageDown ±1 month,
Shift+PageUp/PageDown ±1 year, Enter/Space select. Moving past the visible
month changes the month; the month/year heading is `aria-live="polite"`.

ARIA: `role="grid"` labelled by the heading; `row`, `columnheader` (short
weekday, full name in `abbr`), `gridcell` holding a native `<button>` per day.
One tabbable day (roving tabindex): selected, else today, else the first
enabled day. `aria-selected` on the selected cell, `aria-current="date"` on
today's button.

### DateField

Every `Input` prop except `as`, `type`, `end`, `value`, `defaultValue` and
`onChange`, plus:

| Prop | Type | Notes |
|---|---|---|
| `value` | `string \| null` | ISO date (controlled) |
| `defaultValue` | `string \| null` | ISO date (uncontrolled) |
| `onChange` | `(value: string \| null) => void` | v1 only ever passes a date string |
| `min`, `max`, `isDateDisabled`, `locale` | | Passed to the Calendar |
| `name` | `string` | On a hidden input carrying the ISO value |

v1 is picker-only: the visible input is read-only, has no `name`, and shows the
value formatted with `Intl.DateTimeFormat(locale, { dateStyle: "medium" })`.
The `end` slot holds a "Choose date" button (`aria-haspopup="dialog"`,
`aria-expanded`) that opens a Popover anchored to the input. On open, focus
moves to the calendar's tabbable day; selecting closes the popover and focus
returns to the input. Escape or an outside pointerdown closes it.

## Tokens

`calendar.cell.size:{size}`, `calendar.gap:base`, `calendar.color:{base,today,selected,disabled}`,
`calendar.backgroundColor:{base,selected}`, `calendar.borderColor:today`. Day
border width / radius and the focus ring width use core `borderWidth` /
`borderRadius`; the heading weight uses core `fontWeight`.

## License

MIT
