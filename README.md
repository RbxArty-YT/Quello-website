# Quello Website

Updated website for Quello.

## Current site sections
- Command Explorer with Discord-style embed blocks
- Interactive Command Playground
- Step-by-step Build Your QOTD helper
- Interactive QOTD Preview Builder
- Quello Setup Guide
- Permissions overview
- FAQ
- Changelog
- Discord community links
- English / Russian / German / French / Italian language switch
- Did You Know tips, Random QOTD, achievements, and a Quello easter egg
- Community Spotlight
- Terms of Service and Privacy Policy

The site intentionally does not include a Bot Status dashboard, public statistics dashboard, leaderboard dashboard, or QOTD showcase.


Latest update: the site now combines the Quello avatar, slide-out navigation, interactive command exploration, guided QOTD building, setup progress, community highlights, and hidden extras.

## Third-party assets
- `fonts/TwemojiCountryFlags.woff2` — country flag emoji font from [country-flag-emoji-polyfill](https://github.com/talkjs/country-flag-emoji-polyfill) (MIT, © TalkJS). Flag artwork from [Twemoji](https://github.com/twitter/twemoji), © Twitter, Inc. and other contributors, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Redistributed unmodified; see [fonts/LICENSE.md](fonts/LICENSE.md).

## Visual and accessibility update
- Added a restrained cosmic-glass visual layer across the main page and legal pages, with violet/blue ambient lighting and softer panel depth.
- Improved small-screen layout safeguards and horizontal overflow handling without clipping the hero preview vertically.
- Restored high-visibility keyboard focus rings for links, buttons, and form controls, including the Command Playground picker.
- Added an accessible name to the QOTD builder question input.
- Kept the existing EN / RU / DE / FR / IT dictionaries, question examples, commands, and interactive flows intact.
- Added adaptive reveal motion for selected cards and retained reduced-motion support.

## Technical checks performed for this build
- JavaScript syntax checked with Node.js for every project `.js` file.
- HTML parsed successfully and checked for duplicate IDs, images without `alt`, unnamed buttons, and unnamed links.
- Confirmed all five language dictionaries and the responsive/reduced-motion safeguards are present.
- A full interactive Chromium viewport run was attempted, but this environment blocked local browser navigation (`ERR_BLOCKED_BY_ADMINISTRATOR`); visual browser testing therefore remains unverified.


## Documentation sync (November 6, 2026)
- `/edit`, `/delete`, and `/info` are documented with Discord message links (`message_link`) instead of message IDs.
- `/setup`, `/edit`, and `/delete` are documented with the Confirm / Cancel step; the mention role in `/setup` is documented as optional (`allowed_role` is the required one).
- `/diagnostics` is documented as a normal (non-ephemeral) message with a Refresh button and an optional channel.
- Added filters/limits to the `/history`, `/reset`, `/logs`, and `/audit_log` descriptions, and a permissions line for the commands open to everyone.
- The QOTD Preview Builder and its Copy text output now follow the real bot message format (`# QOTD N:` + quoted question + `Suggested by`).
- Privacy Policy: documented answer tracking in QOTD threads, thread IDs, daily backups (7 kept), and short-lived interaction IDs; Last Updated set to November 6, 2026.
