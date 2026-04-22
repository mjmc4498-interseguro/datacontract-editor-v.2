Automatically use context7 for code generation and library documentation.

We use React with Javascript and Vite.

As documentation and when looking up apis for the react libraries use the following context7 stuffs:
- https://react.dev/
- /remix-run/react-router 
- /eemeli/yaml
- /pmndrs/zustand
- /websites/reactflow_dev

Use Tailwind CSS with Tailwind Plus as a style guide.
Use TailwindPlus react for TailwindCSS v4.
Do never use Heroicons

## Interseguro brand palette

The system is themed with the Interseguro corporate palette, configured in
`src/index.css` via Tailwind v4 `@theme`. When adding new UI:

- **Primary color** → Interseguro magenta (`#EA0C90`). Use any `indigo-*`
  utility class (`bg-indigo-600`, `text-indigo-500`, `ring-indigo-400`, ...).
  The `indigo-*` ramp is overridden with the Interseguro magenta scale, so
  every existing component already adopts the brand color automatically.
- **Secondary accent** → Interseguro blue (`#0855C4`). Use `isblue-*`
  utilities (`bg-isblue-600`, `text-isblue-500`, `from-indigo-600 to-isblue-600`
  for brand gradients, ...).
- **Neutral greys** (blue-tinted) → `isgray-*` (`text-isgray-500`,
  `bg-isgray-100`, ...). The darker tones (500–900) are derived from the
  corporate `#454A6C`.
- **Semantic tokens** (for new components): `var(--color-brand-primary)`,
  `--color-brand-primary-hover`, `--color-brand-primary-soft`,
  `--color-brand-accent`, `--color-brand-accent-soft`.

Do not hardcode hex values for branded UI — prefer these utilities/tokens so
a future rebrand is a one-file change.

Use Playwright CLI tool to test if you are unsure.
If you need to start a server, use port 9090 or greater.
To test stuff that is only available in embedded mode, use /embed suburl

When the term data contract is used, this refers to https://raw.githubusercontent.com/bitol-io/open-data-contract-standard/refs/heads/dev/docs/README.md
