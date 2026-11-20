# Render Detective

SheCanCode Advanced Frontend – Week 8, Day 5: React rendering and re-rendering.

A searchable contact list where you can save favorites. It uses `memo`, `useMemo`, `useCallback` and a
`<Profiler>`, plus the class experiments (Examples 1, 2, 4A/4B and 6), one at a time.

```
src/
  App.jsx                   experiment switcher
  RenderDetective.jsx       shared state: contacts, query, onlyFavorites, dark
  components/ContactList.jsx
  components/ContactCard.jsx   memo
  data/contacts.js
  experiments/              Examples 1, 2, 4A/4B, 6
```

No backend, API or Context.

## Run it

```bash
npm install
npm run dev
```

Open the Console (F12). Answers for Parts A–F are in [RENDER.md](RENDER.md).