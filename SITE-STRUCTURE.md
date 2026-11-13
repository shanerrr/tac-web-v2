# Site structure

Confirmed 2026-11-11. Covers structure only: the visual direction is set when the home page is designed, then applies to every page. Product truth lives in `PRODUCT.md`.

## Priority

All four audiences use one site. When they conflict, the public wins: stories lead, and projects, resources and About support them. The home page puts people in front of stories (it replaces the old splash page, which had none).

## Sitemap

```
/                          Home: tagline, then straight into stories
/stories                   Written stories and films together
/stories/[slug]            One story or film (layout changes with the format)
/projects                  Small index: GOLD, My Aging Story
/projects/gold             Long single page with in-page section links
/projects/my-aging-story   Long single page
/resources                 Featured resource plus the full list, filterable by tag
/about                     Mission, ageism framing, values, founders, contact
/privacy  /terms  404
```

- **Top navigation:** Stories · Projects · Resources · About; the logo links home.
  - No dropdowns or hover menus.
  - Leave room for one more item (the blog, when it's ready).
- **Footer:** the same links, info@theagecollective.com, LinkedIn / Instagram / YouTube, the tagline, the land acknowledgement, Privacy and Terms.
- **Sitewide:** the CMS alert banner and a skip-to-content link.

## What each page does

| Page | Purpose | Carries |
|---|---|---|
| Home | Get people into stories | Tagline, a few featured stories and films, a short ageism framing linking to About, both projects with one real number each, the featured resource, contact |
| Stories | Browse | Filter by format (written / film) and age decade, sort newest or oldest, a count, a message when a filter finds nothing. Filters are kept in the URL |
| Story page | Read or watch one person | Name, age, pronouns, place, portrait or film, quote, full text, 2–3 related stories or films |
| Projects | Short record | Each project's dates, place, a one-line summary, a link |
| GOLD / My Aging Story | Public record of each project | All existing content, figures and funders exactly as recorded |
| Resources | Find something useful | Featured resource, list filterable by tag, "suggest a resource" email link |

## Old URLs

- `/films` permanently redirects to `/stories?format=film`.
- Every other old URL keeps working at its current address.
- Old `/stories#<id>` links can't be redirected by the server (see open decisions).

## What the design must avoid

- A home page with no stories on it.
- Hover-only menus.
- Splitting written stories and films into separate sections.
- A home page full of statistics that reads like a grant report.
- Unconfirmed sections: newsletter, donations, events.

## Constraints

- Static Astro site on Cloudflare.
- The CMS (Contentful) must give every story and film a URL slug; its stories and films have none yet.
- YouTube films load only on click, using the privacy-enhanced (no-cookie) player.
- Accessibility follows `PRODUCT.md`.

## Open decisions (deliberately left open)

Defaults are in brackets.

1. **Home page stories:** a hand-picked "featured" set or the newest. [newest, until a featured flag exists]
2. **Film transcripts:** do any exist? Captions are required either way.
3. **GOLD poems:** web pages or PDF only? Web pages need the poets' permission.
4. **Old `#hash` story links:** worth mapping to the new pages? [no]
5. **Content volume:** how many stories and films exist. [designing for 10–100, no paging]
6. **Blog:** set aside for now.
