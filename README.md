This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Notes
- Index page shows the trending GIFS
- `/search/:searchTerm` route hosts the `search` page
- User input is handled via route context
- Your last search persists on reload via route context
- GifyContext reads and acts on `searchTerm` changes
- GifyContext provides a hook to access all things data
- Initially opted for Next.js's `Image` component for optimisation, but ended up using an unoptimised version due to GIF format
- I transitioned the architecture from simple `context` to `useReducer` - has potential for improvements
- Utilised Tailwind CSS for rapid prototyping
- Used the `giphy/js-fetch-api` JavaScript SDK for speed
- Implemented infinite scroll using `IntersectionObserver`
- Top Lighthouse score for Accessibility and SEO - Cumulative Layout Shift is one that needs work
- Error handling needs work
- Visual cues in the UI can be better
- This project was reasonable and enjoyable

Thank you!

