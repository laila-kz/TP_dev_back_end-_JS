
# TP04 — Job Board (Demo)

A small job-board/demo application built with Vue 3 and Vite. It demonstrates listing jobs, filtering, adding and editing jobs, and integrates with a simple JSON-based or Firebase-backed data source depending on your setup. This project is intended for learning Vue fundamentals and lightweight CRUD workflows.

## Features

- List jobs with title, company, location and tags
- Filter jobs by category or tags
- Add, edit, and delete job entries (simple CRUD)
- Lightweight routing with Vue Router

## Tech stack

- Frontend: Vue 3, Vite
- Data: local `db.json` (development) or Firebase/Firestore (optional)

## Quick start

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. If the project uses the included `db.json` for demo data, you can run a local JSON server (optional):

```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

Point the app API calls to `http://localhost:3000` if you use `json-server`.

## Project structure

- `src/` — Vue app source
	- `components/` — UI components (Job, JobDetail, FilterNav, AddJob, EditJob)
	- `views/` — Route-level views (Home, JobDetail)
	- `router/` — Vue Router setup
	- `api.js` — optional API client wrapper
- `db.json` — demo data for `json-server`
- `index.html`, `vite.config.js` — Vite project files

## Optional: Firebase integration

If you prefer Firebase/Firestore instead of the local JSON file:

1. Create a Firebase project and enable Firestore.
2. Add your Firebase config to `src/firebase/config.js` (create the file if missing).
3. Replace or extend `api.js` to use Firestore reads/writes, or add a `src/firebase/` helper module.

## Deployment

- Build for production:

```bash
npm run build
```

- Serve the `dist/` contents with your static host (Netlify, Vercel, Firebase Hosting, etc.).

To deploy to Firebase Hosting (optional):

```bash
firebase init hosting
firebase deploy --only hosting
```

## Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feat/your-feature`)
3. Commit and open a PR

## License

Add an open-source license if you plan to publish the project.

## Contact

Open issues for bugs or feature requests.
