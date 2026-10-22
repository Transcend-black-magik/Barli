# Barli

React and Vite hotel website.

## Development

- `npm run dev` starts the development server.
- `npm run build` builds the homepage, About Us, Contact, room collection, four category pages, twelve room detail previews, and 404 entry.
- `npm test` checks routes, booking validation, and responsive scroll policy.

## Source structure

`src/app/` owns routing and the persistent header. Each page owns its sections and styling under `src/pages/`: `home/`, `about-us/`, `contact/`, `rooms-and-suites/`, and `errors/`. Room category and detail screens live inside `rooms-and-suites/category/` and `details/`; collection content lives in `data/`.

Shared layout, feedback, and booking form components live in `src/components/`. Reusable animation hooks live in `src/hooks/`; booking validation and scroll policy live in `src/utils/`. Shared fonts/reset and homepage styles live in `src/styles/`. Public image URLs are rooted at `/`.

## Navigation and motion

About Us supports `/about-us/` and the existing `/our-story/` URL. Room categories and individual previews have refreshable URLs emitted during production builds. Browser back restores the previous scroll position. Supported browsers use reversible View Transitions for room journeys; page reveals and regular navigation remain available without that API. Reduced-motion preferences are respected. Rooms scroll naturally; 02 and 03 use the full-size image layout, without forced viewport compression. About's sticky stack is limited to sufficiently large desktop viewports; mobile content stays in normal document flow.

## Forms and content

Contact and room booking forms validate input and prepare downloadable text requests locally. They do not transmit personal information, reserve inventory, take payments, or confirm bookings. Connect a verified hotel backend before enabling live submission. Room variants, capacities, and photographs are illustrative previews; replace them with actual inventory. Image sources and licensing are recorded in `ASSET-SOURCES.md` and `src/data/photography/`.

## Cleanup

Superseded story components, the unused Abuja gallery component and editorial scroll hook, obsolete reference assets, and the temporary `.reference-research` folder have been removed. The existing `/our-story/` HTML entry remains as a supported About Us URL.
