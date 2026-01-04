
# TP05 — Simple Posts / Blog Demo

A lightweight posts/forum demo built with Vue 3 and Vite. The app demonstrates listing posts, viewing a single post, tag clouds, and simple create/edit flows — a compact starter for learning Vue composition and single-page app routing.

## Features

- Home feed of posts with title, excerpt and tags
- View single post details
- Create and edit posts (views included)
- Tag cloud for quick filtering
- Composable data fetch utilities (`composables/getPosts.js`, `composables/getPost.js`)

## Tech stack

- Frontend: Vue 3, Vite
- Data: local `db.json` (for demo) or a simple REST endpoint

## Quick start

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. (Optional) Run the demo JSON API

If you want the app to load data from `db.json` during development, run a local JSON server:

```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

Then point API requests to `http://localhost:3000` (the app may already be configured to use local data).

## Project structure

- `src/` — application source
	- `components/` — `NavBar.vue`, `PostList.vue`, `SinglePost.vue`, `TagCloud.vue`, etc.
	- `composables/` — `getPosts.js`, `getPost.js` (data hooks)
	- `router/` — route definitions
	- `views/` — `Home.vue`, `PostDetailView.vue`, `CreatePostView.vue`, `EditPostView.vue`
	- `App.vue`, `main.js`, `style.css`
- `db.json` — demo data file
- `index.html`, `vite.config.js`, `package.json` — project config and scripts

## Usage notes

- The `TagCloud` component provides tag-based filtering — clicking a tag should filter the posts list.
- `CreatePostView.vue` and `EditPostView.vue` provide simple forms; validate and sanitize input if adapting for production.

## Build & Deployment

Build for production:

```bash
npm run build
```

Host the contents of `dist/` on any static hosting (Netlify, Vercel, Firebase Hosting, etc.).

## Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feat/your-feature`)
3. Commit and open a PR

## License

Add an open-source license if you plan to publish.

## Contact

Open an issue for bugs or feature requests.
