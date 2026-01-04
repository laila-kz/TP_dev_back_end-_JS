
# TP06 — Event List Demo

A small event-listing application built with Vue 3 and Firebase. It demonstrates authentication (signup/login), listing events, and a simple event creation flow. Intended as a learning project and starter template for deploying a small Vue + Firebase app.

## Features

- User signup and login
- List events with basic details (title, date, location)
- Create and view events (basic CRUD scaffolding)
- Firebase Authentication and Firestore integration

## Tech stack

- Frontend: Vue 3 + Vite
- Backend: Firebase (Authentication, Firestore)

## Quick start

1. Install dependencies

```bash
npm install
```

2. Firebase setup

- Create a Firebase project at https://console.firebase.google.com
- Enable **Authentication** (Email/Password) and **Firestore**.
- Copy your Firebase SDK config into `src/firebase/config.js` following the existing file structure.

3. Run locally

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## Project structure

- `src/` — application source
	- `components/` — reusable UI components (EventList, Login, SignUp)
	- `firebase/` — Firebase config and helper functions
	- `App.vue`, `main.js` — app entry and bootstrapping
	- `assets/` — styles and static assets

- `public/` — static public files
- `index.html` — Vite entry

## Firestore rules & indexes

- Before deploying, set Firestore rules appropriate to your app (e.g., allow reads to public data, protect writes to authenticated users).
- Add necessary Firestore indexes if you use compound queries; use `firebase emulators:start` or the console to create indexes.

## Deployment (optional)

To deploy to Firebase Hosting:

```bash
firebase init hosting
firebase deploy --only hosting
```

Make sure your `firebase.json` and `public` build output are configured to serve the Vite build (typically `dist/`).

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feat/your-feature`)
3. Commit and open a Pull Request

## License

This repository is for educational purposes. Add an open-source license if you plan to publish.

## Contact

Open an issue if you need help or want to suggest improvements.
