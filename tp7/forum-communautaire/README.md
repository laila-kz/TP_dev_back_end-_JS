
# Forum Communautaire

Small community forum built with Vue and Firebase (starter project for learning). Provides discussion threads, categories, authentication, and simple CRUD for posts and responses.

## Features

- User registration and login
- Create, edit, delete discussions
- Category listing and discussion browsing
- Post responses and basic moderation

## Tech stack

- Frontend: Vue 3, Vite
- Backend: Firebase (Firestore + Auth)

## Quick start

1. Install dependencies

```bash
npm install
```

2. Configure Firebase

- Create a Firebase project and enable Firestore and Authentication.
- Copy your Firebase config into `src/firebase/config.js` (follow the existing file format).

3. Run locally

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## Project structure

- `src/` — Vue app source
	- `components/` — UI components (cards, navbar, responses)
	- `views/` — Route-level views (Home, Discussion, New Discussion, Profile)
	- `firebase/` — Firebase config and helpers
	- `router/` — Vue Router setup

## Environment & Deployment notes

- Ensure Firestore rules and indexes are configured before deploying.
- To deploy to Firebase Hosting (optional):

```bash
firebase init hosting
firebase deploy --only hosting
```

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes and open a PR

## License

This project is for learning and demonstration purposes. Add a license if you intend to open-source it.

## Contact

If you have questions, open an issue or contact the maintainer.
