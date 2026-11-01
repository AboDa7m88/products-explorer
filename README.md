# Product Explorer

A small website to browse products, search them, filter by category, open a product page and save favorites. Data comes from the [DummyJSON Products API](https://dummyjson.com/docs/products).


## How to run

```bash
npm install
npm start
```

Then open http://localhost:4200.

## Framework

I chose **Angular** because ...

## Features

- Products grid with pagination (12 per page)
- Search with a 400 ms debounce
- Category filter
- Product details page with an image gallery
- Favorites saved in `localStorage`, with a counter in the navbar and a "Favorites only" view
- Loading, error (with "Try again") and empty states on both pages
- Responsive layout: 4 cards per row on desktop, 2 on mobile
- Filters and page number are kept in the URL, so refreshing keeps the same results

## Decisions

- **Search and category are not combined.** The API has a separate endpoint for each, so choosing one clears the other.
- **Favorites store the full product** in `localStorage`, because the API has no endpoint for favorites. The "Favorites only" view reads from there and paginates on the client.
- All API calls live in one service (`ProductsService`). Components never use `HttpClient` directly.

## Optional features

- Page transition animations and a restyled back button

## Known issues

- ...

## What I would improve with more time

- ...
