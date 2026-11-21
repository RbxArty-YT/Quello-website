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

The public landing page does not expose private server statistics or leaderboards. Those server-specific tools are available only inside the Discord-authenticated Dashboard to users with the appropriate server access.


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



## Admin Console (November 15, 2026)
- Added the shared Hidden Admin Console entry points: `Ctrl + Shift + K`, a 2-second press on the Quello logo, and a sidebar entry after admin verification.
- Added the standalone `about.html` creator page and its EN / RU / DE / FR / IT copy.
- Added the Violet → Magenta → Red brand tokens while retaining dark/light theme support.
- The console uses the existing Dashboard session token and asks the existing API to verify admin access. It does not trust a client-side owner flag.
- The bot API now exposes `/api/creator/overview` and `/api/creator/diagnostics`; both require a valid signed session and enforce `BOT_OWNER_ID` server-side.
- Passkey and TOTP are explicitly reported as not configured in this build. Do not advertise them as active until WebAuthn/TOTP enrollment, secure secret storage, recovery and server-side verification have been implemented.
- The website archive has `API_BASE` configured as `https://qotd.xipho.ru` in `site-config.js`. Confirm that this is the intended production API origin before deployment. Never put Discord client secrets or session signing secrets in the website repository.
- The creator's personal avatar was not present in either supplied ZIP. `about.html` currently uses a styled initial placeholder; replace it with the previously selected creator avatar asset when that image is supplied in the project files.

## Brand gradient and About page fixes (November 15, 2026)
- `brand-gradient.css` is loaded last on every page and defines the single violet → pink → red brand gradient used for primary buttons, hero headings, switches, progress bar and scrollbar. Edit the `--brand-gradient*` variables there to change the look site-wide.
- Leftover Discord-blue / cool-blue glows were removed from `theme.css`, `landing-redesign.css` and `motion-polish.css`.
- `about.html` now shows `creator-avatar.png` (falls back to the letter badge if the file is missing), uses the shared theme toggle and follows the saved/system theme like the other pages, and has a tidy two-row header on phones.

## Admin Console on phones
- Verified creators get a small round ✦ button (bottom-right) on every page, plus the "Admin Console" entry in the side menu (☰) and in the About header.
- Long-pressing the Quello logo for 2 seconds also works now (touch events, movement tolerance, context menu and link navigation suppressed).
- The button only appears after `/api/me` confirms `is_creator`, so it needs a valid login (`quello-dash-token`) and a real `API_BASE`.

## Terms of Service and Privacy Policy pages
- `terms.html` and `privacy.html` share `legal.css`, `legal.js` and `legal-content.js`.
- All text (en / ru / de / fr / it) lives in `legal-content.js`. The page follows the site language (`quello-site-language-v2`) and has its own language dropdown, theme toggle, contents list with scroll tracking, and summary cards. The English text inside the HTML files is only a no-JavaScript fallback: when you edit the policy, edit `legal-content.js` (and the dates in its `dates` object).

## Avatar menu
- On the dashboard the avatar menu links to the documentation only; on every other page it links to the dashboard only. "Log out" is always there.
- The Admin Console no longer adds a button to the About header; use the round ✦ button, the side menu, Ctrl + Shift + K, or hold the Quello logo.

## Sign-in gate and localization audit (November 16, 2026)
- New `login-gate.js` (loaded synchronously in the `<head>` of `index.html`): visitors without a valid Discord session are redirected to `login.html`. Open without signing in: `login.html`, `dashboard.html` (it handles its own sign-in), `about.html`, `privacy.html`, `terms.html`. After signing in, `dashboard.js` sends the person back to the page they asked for (`quello-after-login`).
- To open another page without sign-in, add its file name to `OPEN` in `login-gate.js`; to protect a new page, include the script in its `<head>`.
- `login.html` has a "Continue without signing in" button (`login_guest`): it sets `quello-guest` in `sessionStorage` and opens `index.html#home`; `login-gate.js` lets that tab read the documentation until it is closed. The stray `login-gate.js` tags were removed from `about.html`, `privacy.html` and `terms.html`.
- Localization (EN / RU / DE / FR / IT), applied by one override block after the last `Object.assign(translations.it, ...)` in `index.html`:
  - Added keys that were missing from the live dictionary (`about_nav`, `evo_steps_link`, `nav_dashboard`; EN entries for `privacy_link` and `change7`-`change9`, so switching back to English now updates those texts).
  - DE / FR / IT command texts brought in line with the bot: `/edit`, `/delete`, `/info` use message links (not IDs), Confirm / Cancel for `/edit`, `/delete`, `/reset`, `/reset_logs`, history filters, `/logs` and `/audit_log` filters, FAQ and troubleshooting answers, setup steps, permissions and overview texts.
  - Terminology: German Eigentümer (not Besitzer), "Feinschliff" instead of "Politur", Russian "ветка" instead of "тред", Russian Playground naming and DISCORD-БОТ badge, Bot Owner / Server Owner translated in Russian, `change4_text` aligned across languages.
  - Dashboard / login: German "deinen Avatar"; removed the unused `login_docs` string. Admin Console: `signin` and `hold` added for DE / FR / IT.
  - Changelog dates now follow the selected language (`changelog-dates.js`); new changelog entry "Sign-in for the documentation & localization fixes".



## Scheduled QOTD Dashboard and legal update (November 17, 2026)
- Added owner-level Scheduled QOTD controls in the existing Dashboard: enabled state, first local publication time, IANA time zone, and 1 / 6 / 12 / 24-hour recurrence.
- Added server leaderboard views for QOTD creators and responders, plus QOTD statistics, using the existing bot API endpoints.
- Added localized Dashboard UI strings and documentation FAQ / changelog entries in EN / RU / DE / FR / IT.
- Updated Privacy Policy and Terms of Service in all five languages to describe Discord OAuth `identify` + `guilds`, eligible-server permission checks, scheduled QOTD context sent to Groq, temporary pending-question storage, retry behavior, and AI-generated content limitations.
- No API endpoint duplication was introduced. The site still requires the real deployed API origin in `site-config.js` before deployment.


## AI QOTD scheduling and instant generation (November 17, 2026)
- `/schedule_qotds` and the Dashboard now support a first publication time, IANA time zone, and recurring intervals of every 1, 6, 12, or 24 hours.
- `/random_qotd` generates a question through the configured Groq model and publishes it immediately using the server's main Quello language.
- Updated the command reference, Dashboard frequency selector, and AI-provider disclosures in the legal content.


## Admin Console rename and legal synchronization (November 20, 2026)

- Renamed the shared hidden Creator Console to **Admin Console** in all user-facing EN / RU / DE / FR / IT labels, prompts, access messages, diagnostics, and maintainer documentation.
- Preserved the existing technical asset filenames, CSS classes, data attributes, and `/api/creator/*` routes to avoid breaking selectors or API contracts.
- Preserved the existing Discord OAuth2 sign-in flow and server-side `BOT_OWNER_ID` enforcement.
- Updated the Terms of Service and Privacy Policy in all five languages to describe the diagnostic-only Discord Developer Team metadata check.
- Updated the legal effective date to September 13, 2026 and the last-updated date to November 20, 2026.


## Global announcements (November 20, 2026)
- Discord Administrators (the Discord server permission, not the Developer Portal team role) can use `/setup`, `/config`, `/maintenance`, `/lock`, `/schedule_qotds`, and `/schedule_config`. This does not grant QOTD Manager or owner-only slash-command access.
- Server owners can optionally set an Announcement Channel in `/setup` or the Dashboard. Quello requires View Channel, Send Messages and Embed Links in that channel.
- The Bot Owner can create global announcement Embeds in the website Admin Console. Title or description is required; color, URL, image, thumbnail, author, footer and up to 25 custom fields are optional.
- Each successful Discord delivery is tracked by guild, channel and message ID. The Admin Console provides Edit and Delete actions beside every managed announcement; changes are applied to the published copies. A partial Discord/API failure is reported without silently discarding the remaining delivery records.
- The announcement API endpoints are protected server-side by the existing `BOT_OWNER_ID` check. The feature does not grant access to Developer Team members or alter server roles.
- Terms of Service and Privacy Policy now describe global announcement publishing and the stored campaign/delivery metadata in EN / RU / DE / FR / IT.


## Admin Console roles, Technical Work Mode, legal update (November 21, 2026)

- Admin Console tabs: System Overview, Announcements, Owner Actions and Developer Actions are shown to all four roles (Bot Owner, Team Owner, Admin, Developer); the local preview tools (Appearance, Developer, Localization, Debug, Experiments) remain for the owner-level roles. Tab highlighting now updates for every tab.
- Owner Actions: Technical Work Mode uses a duration selector (`duration_minutes`) and shows the remaining time; the session list loads independently of the Technical Work Mode state. New strings exist in EN / RU / DE / FR / IT.
- Dashboard: the API helper shows a localized message when the bot is in Technical Work Mode (`err_technical`).
- Terms of Service and Privacy Policy (all five languages): Admin Console access by the four roles, announcements by authorized console users, Technical Work Mode, Dashboard session records stored in the bot database, Developer Team data used for access decisions, and the new QOTD prompt description. The static English fallback in `terms.html` / `privacy.html` was regenerated from `legal-content.js`, and the "last updated" date is November 21, 2026.
- Changelog: added the November 21 entry; the earlier "Admin Console authorization" entry used the same i18n key (`change21`) as the November 17 entry and overwrote its text, so it now uses `change26`, and the November 17 entry has its own translations.


## Admin Panel rename, Developer Team tab, QOTD delete (November 21, 2026, later)

- User-facing name changed from Admin Console to **Admin Panel** in all five languages (creator-console.js, Terms, Privacy, regenerated static pages). Older changelog entries keep the name used at the time.
- New **Developer Team** tab in the panel for all four roles: nickname | role | status, where status shows “Pending acceptance” only for invited members. Data comes from `GET /api/creator/team`.
- Owner Actions: sessions are grouped by user with “End all sessions of this user”, a “This session” badge and a two-step confirm button (no `window.confirm`). The hard-coded Russian fetch-error text in the panel was replaced with the localized message.
- Server Dashboard → QOTD list: new **Delete** button next to “Open in Discord” and “Edit”, with an in-card confirmation and a localized warning if the Discord message could not be removed. Strings added in EN / RU / DE / FR / IT.
- Legal text and the November 21 changelog entry updated accordingly.
