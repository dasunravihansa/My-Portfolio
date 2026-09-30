# Portfolio V3 — design and implementation

## Design system

The visual language is near-black, editorial typography and restrained electric blue. The hero's Intelligence Core establishes a reusable identity; the architecture diagrams, project presentations, portrait lighting and contact background carry it through the page.

| Token | Value | Purpose |
| --- | --- | --- |
| Background | `#050505` | Main canvas |
| Graphite | `#0A0C0F` | Section atmosphere |
| Surface | `#101318` | Elevated UI |
| White | `#F5F7FA` | Primary text |
| Secondary | `#8B929C` | Supporting copy |
| Blue | `#287BFF` | Buttons, energy, active states |
| Bright blue | `#4DA3FF` | Small highlights |
| Cyan | `#54E8FF` | Core rim lighting |

Geist handles headlines and body text. Geist Mono is reserved for technical metadata. Layouts alternate between an open hero, large project compositions, editorial biography, engineering layers and minimal contact section.

## How the code works

- `app/page.tsx` is a Server Component. The biography, projects, navigation destinations and stack are present in the generated HTML; reading the portfolio does not require the 3D renderer.
- `app/components/PortfolioInteractions.tsx` isolates browser interactions: mobile menu, active-section tracking, video playback, reveal effects, motion controls and the existing EmailJS contact form.
- `app/components/IntelligenceCore.tsx` builds an actual Three.js scene. A metallic sphere, emissive seams, transparent shell and three inclined mechanical orbits share a single renderer. Pointer position gently changes the orientation. The component disposes geometry, materials, listeners and the renderer when unmounted.
- `app/globals.css` holds the design tokens, section compositions, mobile layouts and reduced-motion rules.

### Performance choices

The heavy Three.js module is loaded separately through `next/dynamic`. The renderer caps pixel ratio at 1.5 and animation at roughly 30 frames per second. Offscreen and hidden-tab scenes skip rendering. Paused/reduced-motion scenes render only when needed, such as resizing. The contact Core loads only near the viewport and stays still. A readable brand fallback appears if WebGL cannot initialize or its context is lost.

Project videos use real repository footage, posters, native controls and `preload="none"`; they pause offscreen. The portrait is an optimized WebP loaded through Next Image. EmailJS loads only when a visitor submits the contact form. These are performance safeguards, not a measured Lighthouse score or a guarantee against the previous site's baseline.

### Content provenance

1. EDITH: the owner's requested architecture and project description. Its visualization is an architecture diagram, not an invented screenshot. No public repository link is invented for it.
2. Subarthi College: existing portfolio footage and verified GitHub repository.
3. Arix Live Agent: selected from `dasunravihansa/Arix-AI---gemini-live-agent-challnge`; description and demo link come from that repository's README.

The supplied video is a design reference, not project footage; it is not presented as Dasun's work. The portrait was edited with the built-in image tool: preserve identity, age, skin tone and black T-shirt; remove the original background; add a near-black studio setting and restrained blue rim lighting. The original upload remains unchanged.

Existing email, phone and EmailJS configuration are retained. A LinkedIn URL was not available and has not been invented. Add the correct profile to `contact-links` when available.

## Run locally

```sh
npm ci
npm run dev
```

Production checks:

```sh
npm run lint
npm run build
npm run start
```

In a corporate TLS environment, Next's font downloads may need `NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1`. No insecure certificate bypass is configured.

## Changing the portfolio

Update copy and project links in `app/page.tsx`. Change palette tokens at the top of `app/globals.css`. Change scene materials, orbit geometry and lighting in `IntelligenceCore.tsx`. Replace portrait or video assets in `public/` and update their references. The contact form retains its existing provider and includes success and failure feedback; actual email delivery should be verified by the owner without sending unsolicited test messages.

## Verification performed

- Production build and TypeScript compilation passed.
- ESLint passed after replacing the legacy error page and fixing its internal link.
- Chromium loaded the production page with a working WebGL canvas and no uncaught page errors.
- Viewports of 320, 390, 768 and 1440 pixels had no document-level horizontal overflow.
- Mobile navigation opened and closed after selection; pause control updated the motion state; reduced-motion mode was exercised; all three contact fields were present.
- Desktop hero, project, about, stack, contact, mobile hero and mobile biography screenshots were inspected.
- No real contact email was sent. Lighthouse scores and real-device GPU performance have not been measured.

## Publication status

Changes are committed locally on `codex/portfolio-v3`. Public GitHub push was blocked by automatic approval review because the edited personal portrait requires explicit public-publication consent. No successful push, pull request, or live deployment is claimed. The downloadable source is ready for review.
