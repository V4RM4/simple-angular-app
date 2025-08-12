## Angular Assignment

Minimal Angular 20 app demonstrating client-side navigation, API consumption with `HttpClient`, and a reactive-UX quiz, styled with Tailwind CSS.

![Angular](https://img.shields.io/badge/Angular-20.1-red?logo=angular&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node-24.3-339933?logo=node.js&logoColor=white)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-Live-orange)](https://angular-ds6.pages.dev/)

### Live URL
- Deployed on Cloudflare Pages: https://angular-ds6.pages.dev/

### Features
- **Routing**: `Home`, `API Data`, `Quiz` pages via Angular Router.
- **API Data**: Simple, free dataset from `https://catfact.ninja/facts?limit=10`.
- **Quiz**: Category-filtered quiz loaded from `public/quiz.json` with clean Tailwind UI.
- **Styling**: Tailwind CSS (v3) via PostCSS, minimal and responsive.

### Tech
- Angular 20 standalone components and `HttpClient`
- Tailwind CSS v3 (`tailwind.config.js`, `postcss.config.js`, `src/styles.css`)
- SSR enabled; browser-only loading on the Quiz page to keep prerender stable

## Quick start
```bash
npm install
npm start
```
Open `http://localhost:4200`.

## Build
```bash
npm run build
```
Publish directory: `dist/angular-assignment/browser`

## Project structure (highlights)
- `src/app/pages/home/home.component.ts`: Home page
- `src/app/pages/api-data/api-data.component.ts`: API Data (Cat Facts)
- `src/app/pages/form/form.component.ts`: Quiz UI (replaces contact form)
- `src/app/services/api.service.ts`: API service (Cat Facts)
- `src/app/services/quiz.service.ts`: Quiz data loader and filter
- `public/quiz.json`: Quiz dataset (categories, questions, options, correct answer)

### Quiz data shape
```json
{
  "categories": ["General", "Angular", "JavaScript"],
  "questions": [
    {
      "id": 1,
      "category": "General",
      "question": "...",
      "options": ["..."],
      "answerIndex": 0
    }
  ]
}
```

## Tailwind setup
- `tailwind.config.js` content scanning: `./src/**/*.{html,ts}`
- `postcss.config.js` plugins: `tailwindcss`, `autoprefixer`
- `src/styles.css` includes Tailwind layers

## 
Developed by Vaisakh Suresh
