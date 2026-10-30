# @niceprototypes/card

`Card`, `CardHeader`, `CardBody` and `CardFooter`. Card is a token-styled surface (outline,
elevated or filled) that stacks its children in a column. Tile stays the section and hero
composite; Card is the bordered, rounded, optionally interactive container.

## Install

```sh
npm install @niceprototypes/card
```

Peer dependencies: `@niceprototypes/flex`, `@niceprototypes/ink`, `@niceprototypes/styles`, `react`, `react-dom`, `styled-components`.

## Usage

```tsx
import { Card, CardBody, CardFooter, CardHeader } from "@niceprototypes/card"

<Card variant="elevated">
  <CardHeader title="Plan" description="Billed monthly." end={<Button>Edit</Button>} />
  <CardBody>Unlimited projects.</CardBody>
  <CardFooter>
    <Button>Cancel</Button>
  </CardFooter>
</Card>

// A link card, and a selectable (toggle button) card
<Card href="/plans/pro"><CardHeader title="Pro" /></Card>
<Card onClick={() => setChosen(!chosen)} selected={chosen}><CardHeader title="Pro" /></Card>
```

## Props

Prop types are `CardProps`, `CardHeaderProps`, `CardBodyProps` and `CardFooterProps`; allowed
values per prop are in `manifest/agents/catalog.json`.

The root is `<a>` with `href`, `<button type="button">` with `onClick`, and `<div>` otherwise.
A button card with `selected` set carries `aria-pressed`. `disabled` disables the button, or
marks the link `aria-disabled` and stops it navigating. A link or button card must not contain
interactive elements (invalid HTML); Card warns in development when it does. Change the title's
heading level with `titleProps={{ as: "h2" }}`.

## Tokens

`card.*` in `@niceprototypes/styles` (`src/tokens/components/card.json`): background colours (the
Tile set), base and selected border colour, hover border colour, border width and radius,
elevated and hover shadows, padding, gap, focus ring and disabled opacity. `padding`, `gap` and
`borderRadius` props override the card tokens with core gap and radius tokens.
