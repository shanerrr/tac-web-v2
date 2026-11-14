---
name: The Age Collective
description: A risograph reprint of the ring-hill landscape. Butter paper and six flat inks, with hills layered one in front of another.
colors:
  paper: "#f7ecc9"
  ink: "#2f2d1c"
  rust: "#a8481a"
  tang: "#ee8a3c"
  must: "#e2a52b"
  sage: "#b9c49a"
  olive: "#636128"
typography:
  display:
    fontFamily: "Besley, Rockwell, Georgia, serif"
    fontSize: "clamp(2.25rem, min(6vw, 10vh), max(4.75rem, 3.75vw))"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  poster:
    fontFamily: "Besley, Rockwell, Georgia, serif"
    fontSize: "clamp(3.5rem, 14vw, 12rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Besley, Rockwell, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Besley, Rockwell, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.4vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Besley, Rockwell, Georgia, serif"
    fontSize: "clamp(2.125rem, 5.4vw, 5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  pull-quote:
    fontFamily: "Besley, Rockwell, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.9vw, 2.375rem)"
    fontWeight: 500
    lineHeight: 1.22
    letterSpacing: "-0.01em"
  quote:
    fontFamily: "Besley, Rockwell, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "Atkinson Hyperlegible Next, Verdana, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Atkinson Hyperlegible Next, Verdana, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.55
  chip:
    fontFamily: "Atkinson Hyperlegible Next, Verdana, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.55
rounded:
  sheet: "0px"
  focus: "4px"
  chip: "1rem"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 5vw, 4rem)"
  section: "clamp(4rem, 9vw, 7.5rem)"
  stack: "1.25rem"
  lead: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 2rem"
    height: "3.5rem"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 2rem"
    height: "3.5rem"
  button-paper-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  header:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    height: "5rem"
  button-menu:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1.25rem"
    height: "3rem"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "3rem"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    height: "2.75rem"
  sheet:
    backgroundColor: "{colors.tang}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
  sheet-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sheet}"
  knockout-quote:
    backgroundColor: "{colors.tang}"
    textColor: "{colors.ink}"
    typography: "{typography.quote}"
    rounded: "{rounded.sheet}"
    padding: "clamp(1.5rem, 3vw, 2.25rem)"
  project-sheet:
    backgroundColor: "{colors.must}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "clamp(2rem, 4vw, 3.5rem)"
  arch-portrait:
    backgroundColor: "{colors.rust}"
    rounded: "999px 999px 0 0"
  plate-photo:
    backgroundColor: "{colors.rust}"
    rounded: "{rounded.sheet}"
  footer:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
---

# Design System: The Age Collective

## Overview

**Creative North Star: "Ring Hills, Reprinted": The Long Walk**

The site is one risograph print, and the home page is one walk across it: after the hero every section rises as the crown of the next hill. A sheet of butter paper carries a fixed set of flat inks; tree rings become hills, and small pill-shaped people of every age stand on the ridges together. The hills are cut clean and layered one in front of another, lapped sheets overprint and mix, and a white print grain runs over grounds and drawn pictures; lettering is always printed solid. Nothing is glossy, lit or layered: every surface is ink on paper.

The voice is loud and warm rather than quiet and reverent. Display type is a heavy Clarendon set tight and large; reading text is a high-legibility sans at a generous default size, because part of the audience is in their 80s and 90s. Sections change by changing the whole sheet to another ink, not by adding boxes. Density is low: one idea per sheet, long measures capped, big targets.

Motion is one authored moment: on the home hero the sheet prints in passes, once, in about four seconds. Each line of the tagline prints into register, the hills grow from their centres like rings being added, the button prints onto them, and the figures walk in along the ridges. After that, movement only answers the visitor: a control changes ink when it is used, the figures hop when the hero button is reached for, they walk on along the ridges as the hero is scrolled away, and when the visitor stays still on the hero they talk among themselves (user, 2026-11-13). One more moment closes the page (user, 2026-11-12): on the closing sheet's Rust hill the two people jump and shout, one after the other, then rest and go again, only while that sheet is on screen. All of it is removed under `prefers-reduced-motion`.

**Key Characteristics:**
- Butter paper ground, six inks, no tints, no gradients, no shadows.
- Hills are opaque layers, back to front, so ring lines never cross; only lapped sheets overprint.
- Controls answer by un-printing: a button's fill drops out to the opposite ink inside a rim of its own; header links turn Ink.
- White print grain on grounds and artwork; never on lettering of any size.
- Ring lines in paper colour and the print grain as the only textures.
- Heavy Besley display over Atkinson Hyperlegible Next at 1.25rem body.

## Colors

Flat spot inks on warm paper; every colour is used at full strength, and mixing happens only where two sheets lap.

**The One Job Rule.** Outside the drawn hills (which use every ink), each ink has one job, so a colour tells the visitor what they are looking at: **Rust** is a story (every name tag and quote mark, the stories ridge), with **Tangerine** as its light tint for a film; **Mustard** is the work (the project sheets, and the poster line of the ageism sheet's headline); **Sage** is the conversation (the voices on the ageism sheet and the closing "Be part of the conversation." sheet); **Olive** is the ground: the front hills of the hero and the logo's outer ring. Don't alternate inks between items of the same kind for variety (set 2026-11-13).

### Primary
- **Rust** (`rust`, #a8481a): the red: stories. Prints a hill, prints every story's name tag and quote mark, prints the hill on the closing sheet, and drives native form accents (`accent-color`). It is a dark ink: text on it is Paper (4.93:1), never Ink (2.38:1). It is never a control's colour in use: next to Tangerine it reads as a stain, not a change. As type it appears on paper only and at display size only (4.93:1 on paper); today that is the current page in the phone menu.

### Secondary
The light sheet inks. Each can be a whole section ground, a project sheet, a hill or a plate's ground. Text on all three is Ink.
- **Tangerine** (`tang`, #ee8a3c): films: the film plate on the home page (its band, and its still's ground while it loads); also the largest hill and text selection.
- **Mustard** (`must`, #e2a52b): the work: both project sheets (where they lap, the mustard doubles to a deep orange), two hills in the home hero, the hill in the phone menu, and the poster line of the ageism headline ("to grow older.", solid, 6.38:1 on Ink): the one place a light ink prints as type, on Ink only and at display size only.
- **Sage** (`sage`, #b9c49a): the conversation: both voices on the ageism sheet and the closing contact sheet, the last of the print, which ends on the footer's trim rule. It is not used in the home hero.

### Neutral
- **Butter Paper** (`paper`, #f7ecc9): the page ground, knockouts, ring lines, and text on Ink and Olive.
- **Ink** (`ink`, #2f2d1c): all reading text, display type, buttons, figures, focus rings. 11.76:1 on paper; at least 5.5:1 on every sheet ink.
- **Olive** (`olive`, #636128): the darkest ink. Hills in the hero, the logo, and a square in the footer's colour bar. Paper text on it is 5.44:1.

### Named Rules
**The Ink On Sheets Rule.** Text on paper, mustard, sage and tangerine is Ink. Paper-coloured text appears only on the dark inks: Ink (the ageism sheet), Olive and Rust (a rust label, or a button in use). No other text and ground pairing exists.

**The Overprint Rule.** Where two sheets lap they multiply (`mix-blend-mode: multiply`) and the darker mix shows. Text stays out of the lap: the mix is darker than either sheet, so sheets carry extra padding on the lapped edge. A sheet that carries a photograph is not blended, because multiplying it would tint the photo with whatever lies beneath: it stays opaque and prints its own lap, the ink beneath multiplied over its own along the lapped edge, so the mix looks the same. Hills in a scene do not overprint: each is opaque and covers the ones behind it, because two sets of ring lines crossing in a lap read as a plaid, not as hills.

## Typography

**Display Font:** Besley (with Rockwell, Georgia, serif)
**Body Font:** Atkinson Hyperlegible Next (with Verdana, sans-serif)

**Character:** A heavy Clarendon with poster weight and soft bracketed slabs, set over a sans drawn for low-vision legibility. The display shouts; the body is plain and easy. Both are self-hosted at build time.

### Hierarchy
- **Display** (clamp(2.25rem, min(6vw, 10vh), max(4.75rem, 3.75vw)), 1.02, -0.02em): the tagline. Centred, each sentence on its own line, both in solid Ink: the first at weight 400, said plainly, the second at 800, carrying the weight. It tops out at 4.75rem up to about 2000px wide; the height cap keeps it clear of the hills on short screens, and past 2000px the ceiling rises with the screen so it holds its place beside the enlarged hills (the poster-size tagline was tried and reverted by the user, 2026-11-12).
- **Poster** (700, 2.18em of the line above it, 0.92, -0.035em): one per page at most, the answer of a two-part headline. On the home page it is "to grow older." in Mustard, under "We’re redefining what it means" in Paper, Besley 400 at clamp(2rem, 4.4vw, 3.75rem). Where the first line holds to one line, the poster is cut down to its width, so the two print as one block of type (user, 2026-11-13): 2.18 times the first line, the ratio of the two lines' ink widths in Besley, so it tops out at about 8.2rem. Below about 530px the first line wraps and the poster fills the column instead (min(2.18em, 14.6cqi), the column as its container). It is the ageism sheet's one heavy line, at 700 rather than 800, so it anchors the sheet without shouting over it (quieter pass, user, 2026-11-13).
- **Headline** (800, clamp(2.25rem, 5vw, 3.75rem), 1.02, -0.02em, balanced wrap): one per section. The closing sheet's runs at clamp(2.75rem, 8vw, 6rem).
- **Title** (800, clamp(1.5rem, 2.4vw, 1.875rem), 1.15): names of people, films, projects and resources. On a story plate it is the name chip on the portrait (see Plates).
- **Figure** (800, clamp(2.125rem, 5.4vw, 5rem), 1, -0.03em, no wrap): one recorded number with its unit, one per project sheet. Not on the home page now: its project descriptions carry their own numbers ("40 poems by 40 older adults", "22 personal stories"), so a separate figure would say them twice (2026-11-13).
- **Pull quote** (Besley 500, clamp(1.5rem, 2.9vw, 2.375rem), 1.22, -0.01em, 22em measure): a person's own words as the headline of their story spread, under a hung opening mark in Besley 800 at clamp(6rem, 11vw, 9.5rem) in the story's ink, clamp(0.75rem, 1.5vw, 1.25rem) above the words, (Rust). The mark is decoration; the words carry a visually hidden opening quote for screen readers.
- **Quote** (Besley 500, 1.375rem, 1.35): people's own words. In knockouts it scales clamp(1.25rem, 2vw, 1.5rem).
- **Body** (400, 1.25rem, 1.55): all reading text. Paragraphs cap at 34rem; the land acknowledgement at 44rem. Paragraphs wrap `pretty` so no word sits alone on a last line; action links, and knockout quotes while the ageism sheet is stacked (below 60rem), wrap `balance`. Paper reading text on the Ink sheet runs at clamp(1.25rem, 1.05rem + 0.4vw, 1.375rem) (22px on wide screens, 20px on phones), regular weight (450 was tried and read as one more bold block, user, 2026-11-13), line height 1.6 and +0.01em tracking: light text on a dark ink reads thinner than it is, and the grain shows between thin strokes (user, 2026-11-13).
- **Label** (700, 1.125rem): navigation, footer text and links, metadata lines, captions. Sentence case, no tracking. Button labels are 700 at 1.25rem.

### Named Rules
**The Two Faces, Three Weights Rule.** Besley 800 for display, Besley 500 for quoted speech, Atkinson 400 for reading and 700 for anything that acts or labels. Three exceptions: the first line of the tagline, set in Besley 400 so the second line carries the emphasis; the ageism headline, said the same way ("We’re redefining what it means" in Besley 400, "to grow older." in 800 and Mustard); and the story plates, where only the name is heavy and the metadata line and action link (Atkinson 400) are regular, so three plates under one headline don't all shout. No italics, no uppercase, no letterspaced labels.

**The Solid Lettering Rule.** All lettering prints solid in its ink: headlines, the tagline, titles, quotes and body text. The grain belongs to grounds and artwork only (dropped from headlines by the user, 2026-11-12).

**The Comfortable Default Rule.** Reading text is 1.25rem on a 100% root. The smallest text in the system is the 1.0625rem Ink chip (naming the format on a still).

## Layout

A single centred column: `min(100% - 2 × gutter, 76rem)`, gutter clamp(1.25rem, 5vw, 4rem). Sections are separated by padding only, clamp(4rem, 9vw, 7.5rem) top and bottom, and two paper sections in a row share one interval rather than stacking two; a section either sits on paper inside the column or becomes a full-bleed sheet of one ink with the column inside it. The header is fixed to the top of the screen and spans it, with its contents on the column: ring mark and name at the left edge, the links at the right. It is 5rem tall (4.5rem below 56rem) and the page is padded by the same amount, with `scroll-padding-top` set so in-page targets and focused elements clear it; in-page jumps scroll smoothly unless reduced motion is on. Below 56rem the links collapse behind a Menu button into a full-screen menu.

Grids are asymmetric and small: on the ageism sheet the poster headline spans the column, then from 60rem the argument and its button (left) and the two voices stacked (right, the second inset clamp(2rem, 4vw, 4rem)) at 1fr / 1fr, sharing one top line under the headline (the argument's first line trimmed to its cap height with `text-box`, so its capitals meet the first note's top edge), so no half of the sheet is left empty (user, 2026-11-13); 1.2fr / 1fr in the footer. The two project sheets sit on paper on a 12-column grid, columns 1 to 7 and 7 to 13, the second dropped 6rem, so they lap by one column; they carry no ridge (reverted to these cards by the user, 2026-11-12). Everything stacks to one column below 48rem (60rem for the ageism sheet); stacked project sheets do not lap: they run the full column, 1.5rem apart. Each project sheet is one link: its action stretches over the whole sheet, and the focus ring goes round the sheet. Rhythm inside a block is 1.25rem between a heading and its text, 2rem before a button, 1.25rem between a plate's picture and its words, and 0.5rem between the lines of a plate (the title to its metadata included). Every section on paper opens with its headline.

**The long walk.** After the hero, each section rises as the crown of a hill (`src/components/Ridge.astro`): an SVG in a fixed drawing (1440 by 160 for full-width sections) pinned to the section's top edge and rising into the one above, drawn in proportion to its width, never under 2.5rem tall (cropped at the sides below that). Ridges carry no people: the people live in the hero (user, 2026-11-12). Its front hill is the section's own ink with the section's grain, its sides meet the section's top edge, and a smaller hill with paper ring lines may stand behind it. The section above leaves room for it in its bottom padding (`--crown`). In order: the Ink sheet rises over the hero hills just below the fold; the paper of the stories rises over the Ink sheet, with a Rust ring hill behind; the project sheets sit on that paper without a ridge; the Sage closing sheet rises as a plain crown (its Tangerine ring hill was removed by the user, 2026-11-12); and then the print ends. The closing sheet's foot is a straight trim edge, marked by the footer's 3px Ink rule, and its Rust hill stands on it as on the ground. The footer is not a hill (a full-width crown and a horizon of small hills were both tried and rejected by the user, 2026-11-13): it is the print's margin (see Footer). The film stays a plate inside the stories, not a sheet of its own: a film sheet with its own crown, and a crown for the projects after it, made too many hills (user, 2026-11-13).

The stories are two spreads and a film plate on the column. Each spread is one person: the portrait under an arch (4:5, top corners fully round, up to 26rem wide, its ground the story's ink while it loads) beside their words as a pull quote, and a name tag. The tag is a sheet of Rust with soft grain and Paper words, stuck on at a slant (-1.5deg, then 1.25deg). It holds the name and age (Besley 800, clamp(1.25rem, 2vw, 1.5rem)) over "Place · pronouns" (Atkinson 400, 1.125rem, each item kept whole), padding 0.875rem 1.125rem 1rem. It starts over the portrait's foot (3rem) and hangs below, so it never reaches a face, and from 48rem it sticks out 1.25rem past the portrait's inner corner, toward the words. In the markup it is the spread figure's caption, after the quote (user, 2026-11-12). Below 48rem everything keeps the column's left edge, like every other section: the headline and button, then each spread as portrait (up to 26rem), tag pinned to its bottom-left corner, then the quote. From 48rem the spread is 5fr / 7fr and the second turns round (words left, portrait right); below 48rem they stack, portrait first. The film follows as a wide plate: the still beside a Tangerine band holding "Film · N min", its title (clamp(1.75rem, 3vw, 2.5rem)), its words and its details (balanced lines) together, centred in the band's height (user, 2026-11-13), 2fr / 1fr from 64rem, stacked below. The play pill sits in the still's bottom-left corner, clear of faces.

The two spreads are the two newest written stories in the feed and the film is the newest film; the photos are not links. Below 48rem the film's still stands at 4:3 until it plays. The section has no intro paragraph: "See all stories and films" is the standard Ink button in the header, at the right end of the headline row and level with its foot from 48rem, under the headline (2rem) below that. It carries a drawn right arrow (2.5 stroke, round caps) 0.625rem after the words that steps 0.25rem on when the button is used.

The hero fills the first screen (`100svh` less the header) at every size from 320 by 568 up. The copy keeps its own height: clamp(1.5rem, 11vh, 7.5rem) of air under the header, then clamp(1.5rem, 8vh, 5rem) before the scene, so the space above the tagline is always the largest interval. The one action is not in the sky at all: it sits on the hills, centred, clamp(1.25rem, 4vh, 2.5rem) above the bottom of the first screen. The hills take whatever height is left of the first screen (at least 15rem, or 36svh on a very short screen): the drawing is pinned to its top edge and scaled to cover, so a short screen crops the foot of the hills and a tall one enlarges them, and the ridges and figures are never cut. Below the fold the hero runs on for a hand-off (`--handoff`: the Ink crown's height plus clamp(1.5rem, 4vw, 3.5rem)): the hills continue down past the first screen, and the Ink sheet's crown rises over them there, so the first screen is all sky and hills and the curved hand-off arrives as the visitor scrolls (user, 2026-11-12). Below 30rem wide the hill drawing is cropped to its right-hand portion and enlarged rather than squeezed, and its starting height is capped at 44svh. Under 28rem tall (a phone on its side) the button drops to 3rem and the figures on the two front hills are hidden, so nothing overlaps it.

Targets: buttons 3.5rem tall, navigation links 3rem, inline action links 2.75rem.

## Elevation & Depth

Flat. There are no shadows, blurs, gradients, offset plates or raised surfaces anywhere. Depth is a print effect: hills sit one in front of another like cut paper, lapped sheets overprint and darken, and paper shows through as a knockout where a sheet is "not printed".

### Named Rules
**The Knockout Rule.** A panel on an ink sheet is the paper showing through: paper colour with grain, square corners, no border, no shadow. The ageism sheet goes further: its two voices are not paper but sheets of Sage with soft grain, and the words on them are Ink again (7.55:1).

**The Un-print Rule.** A button shows it is being used by un-printing, never by moving, lifting or turning another ink: every pill carries a 3px rim of its own ink, and in use its fill drops out to the opposite ink while the rim and label stay. An Ink button becomes a Paper pill with an Ink rim and label; a Paper button becomes an Ink pill with a Paper rim and label (0.2s). It reads on every ground, paper, sheet inks and photographs, without a second colour. Header links invert to Ink with a Paper label (0.15s). Nothing sits behind a control at rest.

## Shapes

Two shapes: the square sheet and the circle, and a third made of both: the arch, a square-footed portrait with a fully round top (the crown of a hill), used for story portraits only. Sheets, knockouts, project sheets, portraits, film stills and thumbnails have square corners (0). Everything a person presses is a full pill (999px). Hills, rings and arcs are concentric circles whose centres sit below the frame, so only the crown shows; ring lines are paper-coloured strokes (5 units at 75% on hills, stepping 26; 6 units solid on the arcs of the menu hill). People are pill figures: a 6-unit round head over a 12 by 27 rounded body, in solid Ink without grain, standing square to the ridge. The brand mark is the existing tree-ring logo with its drawing unchanged: its three colours reprinted in Rust, Mustard and Olive and the page grain knocked out of the ink, so its lines are speckled like the printed grounds. It is printed from the supplied artwork (`src/assets/logo-source.svg`) by `scripts/logo.mjs`, which writes `public/logo-inks.png` (transparent, shown as a 48px disc beside the name) and `public/logo-mark.png` (on a Paper disc, the favicon).

Three lines exist in the system: the 3px solid Ink rule along the foot of the header once the page is scrolled; the 3px rim every button carries in its own ink, invisible at rest and the button's outline once it un-prints; and the 4px outline around the home hero button. The focus ring is 3px solid in the current text colour, offset 4px, with 4px corners.

## Components

### Buttons
Solid, heavy and unmistakable: one flat pill of ink.
- **Shape:** full pill (999px), minimum height 3.5rem, padding 0.75rem 2rem.
- **Primary:** Ink fill with a 3px Ink rim (padding reduced by the rim, so the pill keeps its size), Paper label, Atkinson 700 at 1.25rem, no underline, nothing behind it.
- **Hover / Focus / Press:** the button un-prints: the fill drops out to Paper and the label turns Ink inside the Ink rim (0.2s). Focus adds the 3px Ink ring at 4px offset.
- **Paper button:** on a dark ground the same pill prints in flat Paper with an Ink label (`--fill`). Its rim is Paper (`--edge`). In use it un-prints the other way: Ink fill, Paper label, Paper rim, so on the Ink sheet it stays an outlined pill instead of vanishing. Its focus ring is Paper, drawn 8px inside the pill, inside the rim, so it holds up whatever is behind the button. Two places use it: the action on the Ink ageism sheet, and the home hero button, which sits on the hills at the bottom centre of the first screen, carries a drawn down arrow (3 stroke, round caps) that dips 0.2rem on hover and focus, and alone wears a 4px outline in its label colour: Ink at rest, Paper once the button inverts. The hero button jumps to the ageism sheet directly below the hero. It reads "Learn more" on screen and is announced as "Learn more: why ageism is the problem", so the label says where it leads.
- **Menu button:** in the header (below 56rem), the standard Ink button with its rim at 3rem tall, padding 0 1.25rem, label 1.125rem; it reads "Menu" or "Close".

### Text Links
- **Style:** inherit the text colour, underline 2px thick at 0.2em offset; 4px thick on hover.
- **Action links** (under a project or resource): Atkinson 700, minimum height 2.75rem; Atkinson 400 on story plates, where the underline alone marks them.

### Navigation
- **Header:** fixed and full width. At the very top of a page (within 20px) it has no ground, so the hero shows through. Once scrolled it is a band of Paper with grain (fade, 0.2s) with a 3px Ink rule along its foot, which grows down from the band as it appears (0.25s); the rule stands in for the shadow the system does not have. Without script it is always the Paper band with its rule.
- **Header brand:** the ring mark (48px) straight on the paper, with no plate behind it, then the name in lowercase on two lines, "the age" over "collective", in Besley 800 at clamp(1.25rem, 5.5vw, 1.5rem) with a line height of 1, so the two lines stand as tall as the mark. This lowercase lockup is the brand mark only; running text still writes "The Age Collective".
- **Header links (56rem and up):** Atkinson 700 at 1.125rem, 3rem tall, never underlined. A pill the size of the target prints behind a link in Ink, with the label turning Paper: on hover and focus, and permanently for the current page, so a hovered link looks like the current one. Focus adds a 3px Paper ring inside the pill. Under forced colours the current page is underlined.
- **Menu (below 56rem):** the Menu button opens the links as a full-screen sheet of Paper with grain (fade, 0.2s): the four links stacked in Besley 800 at clamp(2.25rem, 11vw, 3.25rem), 4.25rem targets, underlined 4px on hover and focus, the current page in Rust and underlined; the tagline in Besley 800 at 1.25rem below them; a Mustard ring hill in the bottom right corner (hidden on screens under 34rem tall). While it is open the page behind is inert and does not scroll; Escape or the button, now reading "Close", shuts it.
- **Footer:** the print's margin: bare Paper with grain below a straight trim edge, its top a 3px Ink rule (the header's rule mirrored, so the page is bound by two rules). Ink text at 1.125rem (11.76:1, the strongest pairing in the system). Tagline in Besley 800 clamp(1.75rem, 3vw, 2.25rem) (left out on the home page, because the closing sheet has just said it), contact link, two link lists (700, 2.75rem targets), the land acknowledgement at 44rem measure, then the legal row, the slug, which ends at the column's right edge in the colour bar a printer runs along a sheet's margin: one flat 1.125rem square of each ink (Rust, Tangerine, Mustard, Sage, Olive, Ink), 3px of paper between them, decorative and hidden from screen readers. From 48rem the link lists stand at the right through the first two rows, so the acknowledgement sits beside them.
- **Skip link:** Ink pill with Paper label and no underline, appears at top left over the header on focus.

### Sheets
- **Section sheet:** full-bleed ground of one ink with grain, square. Two are in use: Ink (the ageism sheet, straight after the hero, with Paper text, a Paper headline and a Paper button) and Sage (the closing sheet, with Ink text, an Ink button and the Rust hill). **The Soft Grain Rule:** any ground that carries reading text (section sheets, project sheets, voices, name tags, the film band) prints the grain at 45% (`--grain-soft`), and its ridge matches; at full strength the white specks eat small letters' edges. Full grain stays on paper and on artwork (hills, the menu hill).
- **Project sheet:** a square sheet of Mustard, padding clamp(2rem, 4vw, 3.5rem), holding a Title, its description as the lead (Besley 500, clamp(1.25rem, 2vw, 1.625rem), 1.3) and an action link; the whole sheet is the link. From 48rem two sheets lap; the later one multiplies over the earlier, and each carries extra padding on its lapped edge.
- **Portrait label** (no longer on the home page, which uses story spreads; kept for the stories pages): a flat band of the story's ink (Rust with Paper words for the first, Sage with Ink words for the second) whose name line prints over the photo's foot and whose words hang below the photo, so a face is never covered. The name and age in Besley 800 at clamp(1.0625rem, 8cqi, 1.5rem) of the portrait's width; under it the person's quote in Besley 500 at clamp(1.0625rem, 6cqi, 1.1875rem), line height 1.35, in curly quotes with the opening mark hung 0.4em (+0.01em tracking on Rust). Padding 0.75rem 0.875rem 1rem, 0.375rem between name and words. A quote over 160 characters keeps its opening whole sentences and ends in " …". Side by side, the two portraits stretch to one height, so their bands end level.
- **Film plate:** its still beside a Tangerine band with soft grain (2fr / 1fr from 64rem; the band under the still below that): centred in its height, "Film · N min" (Atkinson 700, 1.125rem), the title (Besley 800, clamp(1.75rem, 3vw, 2.5rem)), the film's pull quote when it has one, and the metadata line (Atkinson 700, 1.125rem), which no longer carries the duration. Tangerine is also the still's ground while it loads. The still is the play control: the whole still is the target, with an Ink button ("Play the film", a filled triangle) in its bottom-left corner that un-prints to Paper with an Ink label when any of the still is used; it is announced as "Play the film: {title}". Pressing it swaps the still for YouTube's privacy-enhanced player (youtube-nocookie.com), autoplaying with captions on and taking keyboard focus; the frame's ground turns Ink. Without script it is a link to the film on YouTube. A photo frame clips, so a photo delivered at another shape is cropped rather than stretching the frame.

### Knockout Quote
- A sheet of Sage with soft grain on the Ink sheet, square, padding clamp(1.5rem, 3vw, 2.25rem), pasted on at a slight angle (-0.6deg, then 0.5deg: kept small, as these are sentences to read). The words in Besley 400 at clamp(1.1875rem, 1.7vw, 1.375rem), line height 1.4, in curly quotes, the opening mark hung 0.4em into the padding as on the plates, so a participant's words never read as the organization's own voice; the name and age below at 1.125rem in medium (500), signing the words rather than heading them (quieter pass, user, 2026-11-13). The two always stack; the second is inset from the left by clamp(1.5rem, 5vw, 4rem), and by clamp(2rem, 4vw, 4rem) from 60rem, where they stand beside the argument.

### Plates
- **Structure:** a picture above or beside its words (see Layout), 1.25rem apart; then the words, each line 0.5rem from the next. 
- **Metadata line:** Atkinson 400 at 1.125rem; the name above it is the plate's one heavy line. Written: "Place · pronouns". Film: "Name, age · Place · pronouns (when known) · N min (when recorded)". Each item is kept whole (no wrap) and carries the dot that precedes it, so the line breaks only between items and a wrapped line starts with "·" rather than ending on one.
- **Ratios:** portraits 4:5, film stills 16:9, resource thumbnails 4:3. Photographs are cropped to fill (`object-fit: cover`, cropped on the server).
- **Photographed state:** the photograph is printed as it is: full colour, square (0) or, for story portraits, arched; no frame, no outline, no grain over it, no blur placeholder. A portrait's frame shows in its story's ink while the photo loads; the resource thumbnail's ground is Tangerine.
- **Ink chip:** Ink fill, Paper text, Atkinson 700 at 1.0625rem, 1rem corners, 0.75rem in from the bottom-left corner. It names the format on a still: "Film" on a film still, "Video" on a resource thumbnail that links to YouTube.

### Ring Hills
- Circles of Rust, the sheet inks and Olive, listed back to front. Each is opaque and covers the ones behind it, so every hill shows only its own ring lines, with pill figures on the ridges. The grain prints on the paper and inside each hill, over its ring lines; the figures stand on top in solid Ink, ungrained. In the home hero: Rust and Mustard at the back, Tangerine in the middle, Olive and a second Mustard hill in front. Used once more on the closing sheet: one opaque Rust hill with paper ring lines and two figures, rising from the right across min(44%, 36rem) of the width (20rem below 48rem), on the Sage sheet.
- **Motion (home hero only):** the print run, about four seconds, once. Tagline: each line prints into register from 0.05em left and 0.04em up while fading in (0.8s, the second line 0.25s after the first). Hills: each grows from 72% about its own centre while fading in, 1.2s, staggered 0.14s. Button: prints onto the hills at 1.5s (0.7s). Figures: each walks 14 degrees along its ridge into place over 1.6s with a small step, staggered 0.06s. Fills are backwards only, so hover transitions work once a pass has landed.
- **Ridges:** see The long walk under Layout. They carry no people and do not move.
- **The talk (hero, while the visitor is still):** after 4 seconds on screen with no scroll, wheel, key, tap or click, each hill's group passes the word left to right on a 4.8s loop: the speaker leans 8 degrees toward their neighbour from the feet and nods twice (2px), 1.5s per turn, each hill 0.7s after the last; the one person alone on a hill looks left and right (7 degrees) instead. Any input freezes them where they are rather than snapping them upright, and they carry on after the next quiet spell. The motion toggle (below) in the first screen's bottom-right corner, named "Pause the people talking", stops the talk for good; it appears only with script and without reduced motion.
- **The shout (closing sheet only):** the two people on the Rust hill jump in turn, 0.22s apart, on a 2.6s cycle: a crouch (squash to 1.12 by 0.84 from the feet), a spring up 18px with a stretch, three Ink strokes (2.5 stroke, round caps) bursting from the head at the top of the jump and fading on the way down, a squashed landing, then about 1.4s of rest. It runs only while the sheet is on screen (an IntersectionObserver sets `data-shouting`; otherwise paused). Under reduced motion they stand with the strokes printed, so they still read as shouting. The two are drawn at 1.5 times base size (the second at 0.85 of that), so on screen they match the hero's people. The motion toggle in the sheet's bottom-right corner, named "Pause the people shouting", stops the shout for good, leaving them standing with the strokes printed.
- **Motion toggle:** each looping scene has one: a Paper circle (3rem, 3px rim, the Paper button's inset focus ring) with a drawn 1rem pause glyph, play once stopped, in its section's bottom-right corner (on the hero, the first screen's corner, above the hand-off). Icon only; its name, "Pause/Play the people …", is for screen readers. It is announced with " the people shouting" after its label, appears only with script, and is hidden under reduced motion, where there is nothing to stop.
- **Motion in answer to the visitor:** hovering or focusing the hero button makes the figures hop in a wave (0.5s, 0.04s apart). Where scroll timelines are supported, the figures walk 9 degrees further along their ridges over the first screen of scrolling, from the first pixel (tied to the page scroll, not the hero leaving, since the hand-off below the fold would delay it until they are under the header); elsewhere they stand. None of it runs under reduced motion.
- **Figures in the hero** are drawn at 1.25 times the base size so they read as people at desktop widths. The drawing may draw upward past its top edge so the tallest keep their heads.

## Do's and Don'ts

### Do:
- **Do** set text in Ink on paper, mustard, sage and tangerine, and in Paper on Ink, Olive and Rust.
- **Do** change section by changing the whole sheet to one ink, square-cornered and full-bleed.
- **Do** let lapped sheets multiply, and pad the lapped edge so no text sits in the mix; keep hills opaque so their ring lines never cross.
- **Do** show a button in use by un-printing it inside its rim (Ink to Paper, Paper to Ink); header links turn Ink.
- **Do** keep reading text at 1.25rem and targets at 3.5rem (buttons), 3rem (navigation) and 2.75rem (inline links).
- **Do** put grain on grounds and artwork; keep all lettering solid.
- **Do** keep every link underlined, except buttons and header navigation at rest.
- **Do** honour `prefers-reduced-motion` and forced colours as the build does.

### Don't:
- **Don't** set Rust type below display size or on anything but paper, and don't use it, or any ink but the button's own pair, for a button in use; don't put an Ink button on an Ink sheet, use the Paper button.
- **Don't** put grain over any text, or full grain on a dark ink behind small text, where it costs the letters their edges; every other ground that carries text prints it soft (45%) for the same reason.
- **Don't** put an offset plate, outline or second colour behind a control, a sheet, a picture or text; nothing in the system sits out of register.
- **Don't** add shadows, gradients, blurs or tints of an ink; the system has none.
- **Don't** round the corners of sheets or knockouts; only controls and chips are round; pictures are square or arched (story portraits), never given a small radius.
- **Don't** add another authored animation: the home page has the hill print-in, the hero talk and the shout on the closing hill, and all belong to the same people. Every loop has a pause control and stops under reduced motion.
- **Don't** print a photograph in two inks over its plate (it reads as an old photograph, the opposite of the message, and darkens some photos), and don't put grain over photographs (it reads as dust on faces).
