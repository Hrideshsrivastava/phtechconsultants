# Sub-sites

Each folder in `sites/` is a **separate website** with its own link and its own Cloudflare Worker.
The main PH Tech Consultants site stays in the repository root and its Worker is unchanged.

```
phtechconsultants/            → main site (root folder, existing Worker)
└── sites/
    ├── template/             → starter to copy for every new site
    ├── employability-audit/  → Employability Audit programme mini-site
    └── <your-new-site>/      → its own Worker and link
```

Every site has its own `package.json`, build and deploy, so a change or a broken build in one
site does not affect the others. Sites link to each other with normal URLs.

## Create a new site

1. Copy the starter:
   ```
   cp -r sites/template sites/<new-site-name>
   ```
2. In `sites/<new-site-name>/`:
   - `package.json` → change `"name"` to `<new-site-name>`
   - `wrangler.jsonc` → change `"name"` to the Worker name (e.g. `phtc-<new-site-name>`)
   - `index.html` → set the page `<title>`
   - `src/App.jsx` → build the site
3. Run it locally:
   ```
   cd sites/<new-site-name>
   npm install
   npm run dev
   ```

## Deploy it on Cloudflare (one-time setup per site)

1. Cloudflare dashboard → **Workers & Pages → Create → Import a repository** and pick this repo.
2. In the build settings:
   - **Root directory:** `sites/<new-site-name>`
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Build watch paths** (Settings → Build): include `sites/<new-site-name>/*` so only changes
     to this site rebuild it.
3. Add a link under **Settings → Domains & Routes**, e.g. `<new-site-name>.phtechconsultant.com`.

The main site's Worker keeps building from the root folder. To stop it rebuilding when only a
sub-site changes, set its build watch paths to exclude `sites/*`.

## Linking the sites together

- Main site → sub-site: add a normal link, e.g. `<a href="https://<new-site-name>.phtechconsultant.com">`
  in the navbar, footer, or the search index (`src/data/searchIndex.js`).
- Sub-site → main site: the starter's header and footer already link to `https://phtechconsultant.com`.

## Sharing login (optional)

A sub-site can use the same Firebase project as the main site so one account works everywhere.
Copy the config from `src/firebase.js` and add the sub-site's domain under
**Firebase console → Authentication → Settings → Authorized domains**.
