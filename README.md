# Portfolio

One-page portfolio built with React and Vite.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Add a project

1. Create a new folder in `assets/projects/<slug>/`.
2. Add media files referenced by `project.json`:
   - `cover` image
   - gallery images like `1.png`, `2.png`
   - optional `video.mov` or `video.mp4`
   - optional `poster.png`
3. Create `project.json` in that folder.
4. Import that `project.json` in `src/data/projects.ts`.
5. Add it to `portfolioProjects` with `buildProject(...)`.

## Project shape

```ts
type ProjectFile = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  links?: { label: string; url: string }[];
  cover: string;
  images: string[];
  video?: { source: string; poster?: string };
  featured?: boolean;
};
```
