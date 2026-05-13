# VAR UI Foundation

## Figma anchors

- Foundation: `oyr5aYJQliYRER2eBXSG3p`, node `8:2`
- Core primitives: `oyr5aYJQliYRER2eBXSG3p`, node `14:2`
- Auth reference: `oyr5aYJQliYRER2eBXSG3p`, node `172:7`

## Token baseline

- Colors use the Figma `kr` variable names directly in [src/app/globals.css](/Users/kim/Projects/Kirec/src/app/globals.css).
- Spacing tokens currently cover the values confirmed in Foundation and primitive output: `4, 8, 16, 20, 24, 40`.
- Radius tokens currently cover `12, 16, 20, 24, full`.
- Elevation uses `--kr-shadow-low`, matching the `Kirec/Elevation Low` value from the Auth reference.

## Typography mapping

- `type-display-xl`: `56/60, -1.2, 700`
- `type-heading-l`: `32/38, -0.6, 700`
- `type-heading-m`: `24/30, -0.3, 700`
- `type-title-m`: `18/24, -0.1, 400`
- `type-body-l`: `16/24, 400`
- `type-body-m`: `14/20, 400`
- `type-label-m`: `14/18, 400`
- `type-label-s`: `12/16, 0.2, 400`

## Component folders

- `src/components/ui/primitives`
  - shared Figma-aligned building blocks such as `button.tsx`, `icon-button.tsx`, `card.tsx`, `field-base.tsx`, `text-field.tsx`, `textarea.tsx`, `search-field.tsx`, `select-dropdown.tsx`, `date-picker.tsx`, `time-picker.tsx`, `file-upload.tsx`, `stepper.tsx`, `top-app-bar.tsx`, `bottom-navigation.tsx`, `tabs.tsx`, `segmented-control.tsx`, `chip.tsx`, `badge.tsx`, `list-item.tsx`, `empty-state.tsx`, `checkbox.tsx`, `radio.tsx`, `toggle.tsx`, `avatar.tsx`, `modal-dialog.tsx`, `bottom-sheet.tsx`, `toast-snackbar.tsx`, `skeleton.tsx`
- `src/components/auth`
  - auth-only compositions built from primitives
- `src/components/branding`
  - brand mark and future wordmark assets

## Icon rules

- Default to 24px linear icons, matching the `vuesax/linear/*` inventory in Figma.
- Do not add a third-party icon library until the exact icon source strategy is chosen.
- Prefer inline SVG or checked-in assets over temporary CDN links.
- Avoid circular icon containers unless the Figma primitive explicitly uses one.
- App-level icon source of truth lives in [var-icons.tsx](/Users/kim/Projects/Kirec/src/components/ui/icons/var-icons.tsx). Swap SVG paths there instead of redrawing icons inside each component.
- Current code icons are still approximations of the Figma Vuesax set. Once the team approves exported SVGs or a package source, replace the registry contents first and then audit primitives.

## Known Figma conflicts

- The Foundation/Auth nodes resolve to `NEXON Lv1 Gothic`, while some Core Primitive code output resolves to `Noto Sans KR`.
- Core primitive code output uses a medium weight for button and card labels, but the vendored `NEXON Lv1 Gothic` files only provide `300/400/700`.
- The Auth preview card uses a 26px radius, while Foundation radius tokens stop at 24px.
- `Kirec/Elevation Overlay` was named in Foundation, but only `Elevation Low` was directly recoverable from inspected nodes in this batch.
