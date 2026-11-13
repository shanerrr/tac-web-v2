# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The site serves four audiences. When they conflict, **the public wins**.

1. **Public, all ages (primary).** Curious visitors, younger people included, who meet aging through other people's stories and films and come away thinking about it differently. "Younger people are aging too" is part of the mission, not a side audience.
2. **Older adults as voices.** People 55+ who appear in the stories, films, poems and exhibits, and who may contribute in future.
3. **Partners and funders.** Organizations, grantmakers and collaborators judging whether the work is credible and has reach (GOLD and My Aging Story impact, partner and funder lists).
4. **Educators and practitioners.** People in healthcare, community work and teaching who come for resources about aging and ageism.

## Product Purpose

The Age Collective challenges ageism through storytelling, film, poetry, art and community dialogue. The site is the public home for that work. It publishes real people's aging stories and short documentaries, records projects and their impact, and points people to resources.

Success: visitors of any age spend time with real stories, rethink their assumptions about aging, and start talking about it. Partners see a credible, active initiative. Practitioners find usable material.

Core line (binding): **"We're all aging. Let's talk about it."**

## Positioning

The work is grassroots, intergenerational, and rooted in first-person stories. It was founded in 2021 by two sisters, who still lead and run it. They started after watching their own immigrant parents navigate complex systems as older adults, and after seeing older adults dismissed in healthcare and community settings. It began as written narratives and grew into films, an in-person exhibit, a national poetry anthology and community dialogue. Older adults speak in their own words, with name, age and place. The framing is systemic: "Aging isn't the problem. Ageism is." It names how income, race, gender, ability and access to care shape aging.

Stated values (existing copy):
- **Community First.** Inclusive, intergenerational community; younger and older adults in the same conversation.
- **Aging is Living.** Joy, loss, growth, change and resilience, plus the structural factors that shape them.
- **Conversation creates Change.** Listening and being listened to; stories, poetry and film as tools against ageist assumptions.

## Operating Context

- Canadian, national reach (`en-CA`). The exhibit is rooted in Edmonton, Alberta; GOLD drew poems from every province and two territories.
- Stories and films come from long-running relationships. Participants often become collaborators.
- Projects run as funded, time-bound programs with calls, judging panels, exhibits and reports. Their pages also serve as public records of the program and its supporters.
- Contact: info@theagecollective.com. Social: LinkedIn (`/company/the-age-collective`), Instagram (`@theagecollective`), YouTube (`@TheAgeCollective`). Domain: theagecollective.com.

## Capabilities and Constraints

**Stack and hosting**
- Astro (scaffold on branch `refactor/cf`, migrating from the Next.js 16 site at commit `3582b8c`).
- Deploys to **Cloudflare** (binding).
- CMS: **Contentful** (decided 2026-11-13, after trying EmDash and Payload: both ran their server on Workers and exceeded the Free plan). The site is static: content is fetched from Contentful's Delivery API at build time and goes live with the next deploy. Its content types:
  - Stories: name, age, decade, pronoun, location, quote, portrait, rich-text body, related stories/films, show flag
  - Films: title, subject name, age, location, duration, banner, YouTube URL
  - Resources: title, description, thumbnail, tags, external link, featured flag
  - GOLD judges (ordered) and GOLD poets: photo, bio, poem title, social links
  - Sitewide alert banner: message, link, active flag
  - Tagged media sets used on pages: about collage/feature/bottom, GOLD cover, My Aging Story gallery
- Analytics after leaving Vercel: undecided.

**Content scope (same content set, new look, restructured IA)**
- About: mission, ageism explainer, values, founders' story, contact.
- Stories: feed plus individual story with related stories and films.
- Films: short documentaries, played via YouTube.
- Resources: one featured resource plus a tagged hub of external links, with an invitation to suggest resources.
- Projects: My Aging Story (exhibit) and GOLD (poetry project with a downloadable anthology PDF, judges, poets, a provinces/territories map and the age distribution).
- Privacy Policy, Terms of Use, sitewide alert banner, 404 and error states.
- The IA restructure is in scope. How sections are grouped and what leads is open.

**Engagement**
- **Potential:** a blog with user submissions. Undecided: who can submit, moderation, and CMS support.
- Not confirmed, so don't build without asking: newsletter, events listings, a volunteer path, donations.

**Terminology**
- "The Age Collective" is the full name.
- "GOLD" = Growing Older, Living Deeply Poetry Project.
- "My Aging Story" is the exhibit.
- "Localities", not "locations", for GOLD reach (a deliberate copy fix).
- "Older adults", not "seniors", in the org's own voice. Participant quotes keep their own words.

## Brand Commitments

- **Name:** The Age Collective.
- **Tagline:** "We're all aging. Let's talk about it." (binding).
- **Tree-ring logo** (binding): `public/logo.svg`, `public/logo-rings.svg`, `src/app/icon.svg` at commit `3582b8c`. These are deleted in the working tree; restore them from git.
- **Land acknowledgement** (existing footer text; keep it): "The Age Collective is based on the traditional territories of Indigenous Peoples across Canada. As a project that works with individuals from many regions, we recognize that our community gathers across diverse lands and nations. We acknowledge the enduring presence, knowledge, and sovereignty of First Nations, Inuit, and Métis Peoples, and we are committed to learning how our work can contribute to justice, respect, and accountability."
- **Voice (from existing copy):** first-person plural "we", warm and plain-spoken, direct about ageism as discrimination, honest about loss as well as joy, never pitying or cutesy about older age.
- The previous palette, typefaces, textures and hero illustration are **not** binding. The redesign may replace them.

## Evidence on Hand

All of the following is at commit `3582b8c` unless marked as CMS. Cite it as recorded; never round it up or extend it.

**GOLD Poetry Project**
- Funded by the GLOCAL Foundation's CANCONNECT Grant.
- Calls ran June 2025 to February 2026: four national calls for adults 55+.
- Themes: Self & Identity; Place & Belonging; Time, Memory & Legacy; Power & Resistance.
- Poems were de-identified before judging. A panel of older adult poets picked the top ten per theme, for a 40-poem digital anthology (`public/GOLD-Digital-Anthology.pdf`).
- Reach: 142 localities, 319 poems submitted, 260 older adults, 91 organizations.
- Poems came from all provinces and two territories. Poets were aged 55 to 95: 55–64 (28%), 65–74 (43%), 75–84 (23%), 85–95 (6%).
- Outreach partners named on the page: League of Canadian Poets, CCSMH, NIA, CNPEA, Writers Guild of Alberta, and others.

**My Aging Story exhibit**
- February 21–22, 2025, Edmonton. 22 stories collected over three years.
- 105 attendees, 29 surveys, 25 self-reflections.
- Survey results: 83% reported improved perspectives on aging; 93% found the stories and activities interesting; 90% felt inspired to act against ageism.
- Three activities: Story Scavenger Hunt, Self-Reflection Booth, Community Dialogue.
- Visitor reflections (verbatim list) and an exhibit video.
- Funded by Canada Service Corps and Volunteer Alberta through the ACSEL Microgrant Program.

**Other evidence**
- Supporter logos: `public/ACSEL.png`, `CSC.png`, `VA.png`, `glocal.png`, plus `public/canada.svg` (map).
- Participant quotes on the About page (e.g. Jamie, 24; Sushila, 72).
- CMS: stories with portraits, films, resources, judge and poet bios and photos, and exhibit/about photo sets.

**Absent (do not fabricate):** press coverage, endorsements beyond named partners and funders, audience or traffic numbers, a newsletter, donation figures, events beyond those listed.

## Product Principles

1. **Stories are the front door.** The public comes first. Real people's stories and films lead; impact, resources and partner proof support them.
2. **Older adults speak for themselves.** Real names, ages, places and their own words. Never stock faces or invented voices.
3. **Everyone is aging.** Address all ages at once. Younger visitors are part of the conversation, not bystanders to it.
4. **Name the system, not just the feeling.** Ageism is discrimination shaped by power and intersecting inequities. Celebrate older age without sugar-coating it.
5. **Proof is cited, never inflated.** Every number, partner and funder appears as recorded.

## Accessibility & Inclusion

- **Floor:** WCAG 2.2 AA.
- **Aging needs** (part of the audience is in their 80s and 90s):
  - type that reads comfortably at default size
  - strong contrast
  - large tap targets
  - nothing that depends on hover, motion or precise pointer control
  - `prefers-reduced-motion` respected
- Captions for films. Meaningful alt text for portraits and exhibit photos. A skip link.
- Stories carry each person's pronouns; use them.
