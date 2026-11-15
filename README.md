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

## Documentation sync (November 11, 2026)
- New commands documented in the Command Explorer, command details, Playground, Permissions and FAQ: `/suggest`, `/suggestions`, `/me`, `/question_week` (all five languages for the card text, details in EN/RU with fallbacks as before).
- `/setup` is documented with a single allowed role, separate `@everyone` / `@here` options, and "omitted options keep their current values"; `/config` is documented as an interactive editor (pick one setting, change it, Save changes; only changed fields are written).
- `/reset` and `/reset_logs` are documented with the Confirm / Cancel step; `/qotd` and `/edit` with the 1,500-character limit and suggestion credit.
- `/diagnostics` description mentions the `@everyone` thread-reply check.
- Privacy Policy: added suggestion data and the new role / mention settings; Last Updated set to November 11, 2026.
- New strings are applied by a single override block placed after the last `Object.assign(translations.it, ...)`, so earlier dictionary entries are superseded without being deleted.
- The QOTD Preview Builder already matched the bot's message format and was left unchanged.
- `/suggest` is documented with the limit of one unreviewed suggestion per member (details, FAQ, Playground, changelog).

## Documentation sync (suggestion queue update)
- Changelog: new entry `change17` (suggestion queue, rejection reasons, author notifications) in all five languages, placed above the previous entry.
- `/suggest` details, `/suggestions` card and details, FAQ and Playground now describe: one unreviewed suggestion per member with a Delete my suggestion button, refusal of empty / too-short / filler questions, arrow-button paging through the queue, the required rejection reason and the direct message to the author.
- Privacy Policy: added the withdrawn status, the stored rejection reason and the direct message to the author.
- Same override mechanism as before: the new strings sit in a block after the last `Object.assign(translations.it, ...)`.



## Creator Console (November 15, 2026)
- Added the shared Hidden Creator Console entry points: `Ctrl + Shift + K`, a 2-second press on the Quello logo, and a sidebar entry after creator verification.
- Added the standalone `about.html` creator page and its EN / RU / DE / FR / IT copy.
- Added the Violet → Magenta → Red brand tokens while retaining dark/light theme support.
- The console uses the existing Dashboard session token and asks the existing API to verify creator access. It does not trust a client-side owner flag.
- The bot API now exposes `/api/creator/overview` and `/api/creator/diagnostics`; both require a valid signed session and enforce `BOT_OWNER_ID` server-side.
- Passkey and TOTP are explicitly reported as not configured in this build. Do not advertise them as active until WebAuthn/TOTP enrollment, secure secret storage, recovery and server-side verification have been implemented.
- The uploaded website archive has `API_BASE` set to the example placeholder in `site-config.js`; set it to the real deployed Quello API origin before publishing this archive. Never put Discord client secrets or session signing secrets in the website repository.
- The creator's personal avatar was not present in either supplied ZIP. `about.html` currently uses a styled initial placeholder; replace it with the previously selected creator avatar asset when that image is supplied in the project files.
