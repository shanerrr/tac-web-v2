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
  plate: "6px"
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
    backgroundColor: "{colors.rust}"
    textColor: "{colors.paper}"
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
  sheet-rust:
    backgroundColor: "{colors.rust}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sheet}"
  knockout-quote:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.quote}"
    rounded: "{rounded.sheet}"
    padding: "clamp(1.5rem, 3vw, 2.25rem)"
  project-sheet:
    backgroundColor: "{colors.must}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "clamp(2rem, 4vw, 3.5rem)"
  plate-empty:
    backgroundColor: "{colors.rust}"
    rounded: "{rounded.plate}"
  footer:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
---

# Design System: The Age Collective

## Overview

**Creative North Star: "Ring Hills, Reprinted"**

The site is one risograph print. A sheet of butter paper carries a fixed set of flat inks; tree rings become hills, and small pill-shaped people of every age stand on the ridges together. The hills are cut clean and layered one in front of another, lapped sheets overprint and mix, and a white print grain runs over grounds, pictures and headlines. Nothing is glossy, lit or layered: every surface is ink on paper.

The voice is loud and warm rather than quiet and reverent. Display type is a heavy Clarendon set tight and large; reading text is a high-legibility sans at a generous default size, because part of the audience is in their 80s and 90s. Sections change by changing the whole sheet to another ink, not by adding boxes. Density is low: one idea per sheet, long measures capped, big targets.

Motion is one authored moment: on the home hero the sheet prints in passes, once, in about four seconds. Each line of the tagline prints into register, the hills grow from their centres like rings being added, the button prints onto them, and the figures walk in along the ridges. After that, movement only answers the visitor: a control changes ink when it is used, the figures hop when the hero button is reached for, and they walk on along the ridges as the hero is scrolled away. All of it is removed under `prefers-reduced-motion`.

**Key Characteristics:**
- Butter paper ground, six inks, no tints, no gradients, no shadows.
- Hills are opaque layers, back to front, so ring lines never cross; only lapped sheets overprint.
- Controls answer in ink: an Ink button turns Rust when it is used, a Paper button or header link turns Ink.
- White print grain on grounds, artwork and headlines; never on reading text or the tagline.
- Ring lines in paper colour and the print grain as the only textures.
- Heavy Besley display over Atkinson Hyperlegible Next at 1.25rem body.

## Colors

Flat spot inks on warm paper; every colour is used at full strength, and mixing happens only where two sheets lap.

### Primary
- **Rust** (`rust`, #a8481a): the red, and the second voice. Prints the ageism sheet, a hill and a plate, fills an Ink button while it is being used, and drives native form accents (`accent-color`). It is the one dark sheet ink: text on it is Paper (4.93:1), never Ink (2.38:1). As type it appears on paper only and at display size only (4.93:1 on paper); today that is the current page in the phone menu.

### Secondary
The light sheet inks. Each can be a whole section ground, a project sheet, a hill or an empty plate. Text on all three is Ink.
- **Tangerine** (`tang`, #ee8a3c): the closing contact sheet, the largest hill, text selection.
- **Mustard** (`must`, #e2a52b): the GOLD project sheet, two hills in the home hero, the hill in the phone menu, a plate.
- **Sage** (`sage`, #b9c49a): the My Aging Story sheet, the hill on the closing sheet, a plate. It is not used in the home hero.

### Neutral
- **Butter Paper** (`paper`, #f7ecc9): the page ground, knockouts, ring lines, and text on Ink and Olive.
- **Ink** (`ink`, #2f2d1c): all reading text, display type, buttons, figures, focus rings. 11.76:1 on paper; at least 5.5:1 on every sheet ink.
- **Olive** (`olive`, #636128): the darkest ink. The footer sheet and a hill. Paper text on it is 5.44:1.

### Named Rules
**The Ink On Sheets Rule.** Text on paper, mustard, sage and tangerine is Ink. Paper-coloured text appears only on the dark inks: Ink, Olive and Rust (a rust sheet, or an Ink button in use). No other text and ground pairing exists.

**The Overprint Rule.** Where two sheets lap they multiply (`mix-blend-mode: multiply`) and the darker mix shows. Text stays out of the lap: Ink on sage over mustard is only 3.72:1, so sheets carry extra padding on the lapped edge. Hills in a scene do not overprint: each is opaque and covers the ones behind it, because two sets of ring lines crossing in a lap read as a plaid, not as hills.

## Typography

**Display Font:** Besley (with Rockwell, Georgia, serif)
**Body Font:** Atkinson Hyperlegible Next (with Verdana, sans-serif)

**Character:** A heavy Clarendon with poster weight and soft bracketed slabs, set over a sans drawn for low-vision legibility. The display shouts; the body is plain and easy. Both are self-hosted at build time.

### Hierarchy
- **Display** (clamp(2.25rem, min(6vw, 10vh), max(4.75rem, 3.75vw)), 1.02, -0.02em): the tagline. Centred, each sentence on its own line, both in solid Ink: the first at weight 400, said plainly, the second at 800, carrying the weight. It tops out at 4.75rem up to about 2000px wide; the height cap keeps it clear of the hills on short screens, and past 2000px the ceiling rises with the screen so it holds its place beside the enlarged hills.
- **Headline** (800, clamp(2.25rem, 5vw, 3.75rem), 1.02, -0.02em, balanced wrap): one per section. On a full ink sheet the headline runs larger: clamp(2.5rem, 6vw, 4.75rem) on the ageism sheet and clamp(2.75rem, 8vw, 6rem) on the closing sheet, up to 6rem, larger than the tagline on all but very large screens.
- **Title** (800, clamp(1.5rem, 2.4vw, 1.875rem), 1.15): names of people, films, projects and resources.
- **Figure** (800, clamp(2.125rem, 5.4vw, 5rem), 1, -0.03em, no wrap): one recorded number with its unit, one per project sheet.
- **Quote** (Besley 500, 1.375rem, 1.35): people's own words. In knockouts it scales clamp(1.25rem, 2vw, 1.5rem).
- **Body** (400, 1.25rem, 1.55): all reading text. Paragraphs cap at 34rem; the land acknowledgement at 44rem.
- **Label** (700, 1.125rem): navigation, footer text and links, metadata lines, captions. Sentence case, no tracking. Button labels are 700 at 1.25rem.

### Named Rules
**The Two Faces, Three Weights Rule.** Besley 800 for display, Besley 500 for quoted speech, Atkinson 400 for reading and 700 for anything that acts or labels. The one exception is the first line of the tagline, set in Besley 400 so the second line carries the emphasis. No italics, no uppercase, no letterspaced labels.

**The Grained Lettering Rule.** Headlines are filled with their ink plus the print grain (`background-clip: text`), with 0.2em of extra box below so descenders are filled. The home tagline, titles, quotes and all body text are solid. Under forced colours the grain is dropped and the text is `CanvasText`.

**The Comfortable Default Rule.** Reading text is 1.25rem on a 100% root. The smallest text in the system is the 1.0625rem chip on an empty plate, with one exception: the label of the contact button on the closing sheet scales clamp(1rem, 4.2vw, 1.25rem), so the email address stays on one line on the narrowest phones.

## Layout

A single centred column: `min(100% - 2 × gutter, 76rem)`, gutter clamp(1.25rem, 5vw, 4rem). Sections are separated by padding only, clamp(4rem, 9vw, 7.5rem) top and bottom; a section either sits on paper inside the column or becomes a full-bleed sheet of one ink with the column inside it. The header is fixed to the top of the screen and spans it, with its contents on the column: ring mark and name at the left edge, the links at the right. It is 5rem tall (4.5rem below 56rem) and the page is padded by the same amount, with `scroll-padding-top` set so in-page targets and focused elements clear it; in-page jumps scroll smoothly unless reduced motion is on. Below 56rem the links collapse behind a Menu button into a full-screen menu.

Grids are asymmetric and small: 0.8fr / 1.2fr for the story plates, 1.1fr / 1fr for the ageism sheet, 0.8fr / 1fr for the resource, 1.2fr / 1fr in the footer. The two project sheets sit on a 12-column grid, columns 1 to 7 and 7 to 13, the second dropped 6rem, so they lap by one column. Everything stacks to one column below 48rem (60rem for the ageism sheet); stacked project sheets lap by 2rem with the second inset 2rem. Rhythm inside a block is 1.25rem between a heading and its text, 2rem before a button, 0.5 to 0.75rem between lines of a plate.

The hero fills the first screen (`100svh` less the header) at every size from 320 by 568 up. The copy keeps its own height: clamp(1.5rem, 11vh, 7.5rem) of air under the header, then clamp(1.5rem, 8vh, 5rem) before the scene, so the space above the tagline is always the largest interval. The one action is not in the sky at all: it sits on the hills, centred, clamp(1.25rem, 4vh, 2.5rem) above the bottom of the first screen. The hills take whatever height is left (at least 15rem, or 36svh on a very short screen): the drawing is pinned to its top edge and scaled to cover, so a short screen crops the foot of the hills and a tall one enlarges them, and the ridges and figures are never cut. Below 30rem wide the hill drawing is cropped to its right-hand portion and enlarged rather than squeezed, and its starting height is capped at 44svh. Under 28rem tall (a phone on its side) the button drops to 3rem and the figures on the two front hills are hidden, so nothing overlaps it.

Targets: buttons 3.5rem tall, navigation links 3rem, inline action links 2.75rem.

## Elevation & Depth

Flat. There are no shadows, blurs, gradients, offset plates or raised surfaces anywhere. Depth is a print effect: hills sit one in front of another like cut paper, lapped sheets overprint and darken, and paper shows through as a knockout where a sheet is "not printed".

### Named Rules
**The Knockout Rule.** A panel on an ink sheet is the paper showing through: paper colour with grain, square corners, no border, no shadow. On the Rust sheet, where the sheet's own text is Paper, the words on a knockout are Ink again.

**The Used Ink Rule.** A control shows it is being used by changing ink, never by moving or lifting: an Ink button turns Rust, and a Paper button or header link inverts to Ink with a Paper label (0.2s; 0.15s in the header). Nothing sits behind a control at rest.

## Shapes

Two shapes: the square sheet and the circle. Sheets, knockouts and project sheets have square corners (0). Everything a person presses is a full pill (999px). Hills, rings and arcs are concentric circles whose centres sit below the frame, so only the crown shows; ring lines are paper-coloured strokes (5 units at 75% on hills, stepping 26; 6 units solid on plate arcs). People are pill figures: a 6-unit round head over a 12 by 27 rounded body, in Ink, standing square to the ridge. The brand mark is the existing tree-ring logo with its drawing unchanged: its three colours reprinted in Rust, Mustard and Olive and the page grain knocked out of the ink, so its lines are speckled like the headlines. It is printed from the supplied artwork (`src/assets/logo-source.svg`) by `scripts/logo.mjs`, which writes `public/logo-inks.png` (transparent, shown as a 48px disc beside the name) and `public/logo-mark.png` (on a Paper disc, the favicon).

Three lines exist in the system: the 3px dashed Ink outline of an empty plate (6px corners), which marks a picture that has not arrived; the 3px solid Ink rule along the foot of the header once the page is scrolled; and the 4px outline around the home hero button. The focus ring is 3px solid in the current text colour, offset 4px, with 4px corners.

## Components

### Buttons
Solid, heavy and unmistakable: one flat pill of ink.
- **Shape:** full pill (999px), minimum height 3.5rem, padding 0.75rem 2rem.
- **Primary:** Ink fill, Paper label, Atkinson 700 at 1.25rem, no underline, nothing behind it.
- **Hover / Focus / Press:** the fill turns Rust (0.2s); the label stays Paper. Focus adds the 3px Ink ring at 4px offset.
- **Paper button:** on a dark ground the same pill prints in flat Paper with an Ink label (`--fill`). In use it inverts: Ink fill, Paper label (`--fill-used`). Its focus ring is Paper, drawn 6px inside the pill, so it holds up whatever is behind the button. Two places use it: the action on the Rust ageism sheet, and the home hero button, which sits on the hills at the bottom centre of the first screen, carries a drawn down arrow (3 stroke, round caps) that dips 0.2rem on hover and focus, and alone wears a 4px outline in its label colour: Ink at rest, Paper once the button inverts. Until the stories page exists the hero button jumps to the stories section below. It reads "Learn more" on screen and is announced as "Learn more: read the stories", so the label says where it leads.
- **Menu button:** in the header (below 56rem), the standard Ink button at 3rem tall, padding 0 1.25rem, label 1.125rem; it reads "Menu" or "Close".

### Text Links
- **Style:** inherit the text colour, underline 2px thick at 0.2em offset; 4px thick on hover.
- **Action links** (under a plate, project or resource): Atkinson 700, minimum height 2.75rem.

### Navigation
- **Header:** fixed and full width. At the very top of a page (within 20px) it has no ground, so the hero shows through. Once scrolled it is a band of Paper with grain (fade, 0.2s) with a 3px Ink rule along its foot, which grows down from the band as it appears (0.25s); the rule stands in for the shadow the system does not have. Without script it is always the Paper band with its rule.
- **Header brand:** the ring mark (48px) straight on the paper, with no plate behind it, then the name in lowercase on two lines, "the age" over "collective", in Besley 800 at clamp(1.25rem, 5.5vw, 1.5rem) with a line height of 1, so the two lines stand as tall as the mark. This lowercase lockup is the brand mark only; running text still writes "The Age Collective".
- **Header links (56rem and up):** Atkinson 700 at 1.125rem, 3rem tall, never underlined. A pill the size of the target prints behind a link in Ink, with the label turning Paper: on hover and focus, and permanently for the current page, so a hovered link looks like the current one. Focus adds a 3px Paper ring inside the pill. Under forced colours the current page is underlined.
- **Menu (below 56rem):** the Menu button opens the links as a full-screen sheet of Paper with grain (fade, 0.2s): the four links stacked in Besley 800 at clamp(2.25rem, 11vw, 3.25rem), 4.25rem targets, underlined 4px on hover and focus, the current page in Rust and underlined; the tagline in Besley 800 at 1.25rem below them; a Mustard ring hill in the bottom right corner (hidden on screens under 34rem tall). While it is open the page behind is inert and does not scroll; Escape or the button, now reading "Close", shuts it.
- **Footer:** an Olive sheet without grain, Paper text at 1.125rem. Tagline in Besley 800 clamp(1.75rem, 3vw, 2.25rem), contact link, two link lists (700, 2.75rem targets), the land acknowledgement at 44rem measure, then the legal row.
- **Skip link:** Ink pill with Paper label and no underline, appears at top left over the header on focus.

### Sheets
- **Section sheet:** full-bleed ground of one ink with grain, square. Two are in use: Rust (the ageism sheet, with Paper text, a Paper headline and a Paper button) and Tangerine (the closing sheet, with Ink text and an Ink button).
- **Project sheet:** a square sheet of Mustard or Sage, padding clamp(2rem, 4vw, 3.5rem), holding a Title, one Figure, a short paragraph and an action link. Two sheets lap; the later one multiplies over the earlier, and each carries extra padding on its lapped edge.

### Knockout Quote
- Paper with grain on an ink sheet, square, padding clamp(1.5rem, 3vw, 2.25rem). The words in Besley 500; the name and age below in Atkinson 700. A second quote is inset from the left by clamp(1.5rem, 5vw, 4rem).

### Plates
- **Structure:** a picture slot above (or beside, at 48rem and up) a Title, a bold metadata line, an optional quoted line in Besley 500, and an action link.
- **Ratios:** portraits 4:5, film stills 16:9, resource thumbnails 4:3.
- **Empty state:** the slot is a sheet of one ink with grain, five paper arcs rising from the bottom edge, a 3px dashed Ink outline, and an Ink chip (Paper text, 700, 1.0625rem, 1rem corners) naming what is missing. This is the only state built so far; how a real photograph sits in the slot is not yet established.

### Ring Hills
- Circles of Rust, the sheet inks and Olive, listed back to front. Each is opaque and covers the ones behind it, so every hill shows only its own ring lines, with pill figures on the ridges and grain over the whole picture. In the home hero: Rust and Mustard at the back, Tangerine in the middle, Olive and a second Mustard hill in front. Used once more, small and in Sage, on the closing sheet, where the single hill overprints the Tangerine ground.
- **Motion (home hero only):** the print run, about four seconds, once. Tagline: each line prints into register from 0.05em left and 0.04em up while fading in (0.8s, the second line 0.25s after the first). Hills: each grows from 72% about its own centre while fading in, 1.2s, staggered 0.14s. Button: prints onto the hills at 1.5s (0.7s). Figures: each walks 14 degrees along its ridge into place over 1.6s with a small step, staggered 0.06s. Fills are backwards only, so hover transitions work once a pass has landed.
- **Motion in answer to the visitor:** hovering or focusing the hero button makes the figures hop in a wave (0.5s, 0.04s apart). Where scroll timelines are supported, the figures walk 9 degrees further along their ridges as the hero scrolls out; elsewhere they stand. None of it runs under reduced motion.
- **Figures in the hero** are drawn at 1.25 times the base size so they read as people at desktop widths.

## Do's and Don'ts

### Do:
- **Do** set text in Ink on paper, mustard, sage and tangerine, and in Paper on Ink, Olive and Rust.
- **Do** change section by changing the whole sheet to one ink, square-cornered and full-bleed.
- **Do** let lapped sheets multiply, and pad the lapped edge so no text sits in the mix; keep hills opaque so their ring lines never cross.
- **Do** show a control in use by changing its ink: Ink buttons to Rust, Paper buttons and header links to Ink.
- **Do** keep reading text at 1.25rem and targets at 3.5rem (buttons), 3rem (navigation) and 2.75rem (inline links).
- **Do** put grain on grounds, artwork and Headline lettering; keep the tagline solid.
- **Do** keep every link underlined, except buttons and header navigation at rest.
- **Do** honour `prefers-reduced-motion` and forced colours as the build does.

### Don't:
- **Don't** set Rust type below display size or on anything but paper, and don't put an Ink button on a Rust sheet, where it would vanish when used; use the Paper button there.
- **Don't** put grain over body text, or on the Olive footer, where it costs small text its edges.
- **Don't** put an offset plate, outline or second colour behind a control, a sheet, a picture or text; nothing in the system sits out of register.
- **Don't** add shadows, gradients, blurs or tints of an ink; the system has none.
- **Don't** round the corners of sheets or knockouts; only controls and chips are round.
- **Don't** add a second authored animation to a page that already has the hill print-in.
- **Don't** treat the dashed empty-plate outline as a frame for real pictures.
