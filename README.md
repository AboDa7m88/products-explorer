# Product Explorer

A small online store demo to browse products, search them, filter by category, open a product page, save favorites and manage a shopping cart. Data comes from the [DummyJSON Products API](https://dummyjson.com/docs/products).


## How to run

```bash
npm install
npm start
```

Then open http://localhost:4200.

## Framework

I chose **Angular** because it aligns with my career goals and allows me to strengthen my front-end development skills while gaining practical experience through building real-world projects.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero section, category chips and an auto-scrolling "Hot Deals" row |
| `/products` | Products grid with search, category filter, favorites view and pagination |
| `/products/:id` | Product details with an image gallery |
| `/cart` | Shopping cart with an order summary |

## Features

- Home page with a hero section, category shortcuts and an auto-scrolling "Hot Deals" row (pauses on hover)
- Products grid with pagination (12 per page)
- Search with a 400 ms debounce
- Category filter
- Product details page with an image gallery
- Discounted products show the new price in a larger font and the old price greyed out and crossed, with a discount badge on the details page
- Favorites saved in `localStorage`, with a counter in the navbar and a "Favorites only" view
- Shopping cart saved in `localStorage`:
  - "Add to Cart" opens a small quantity picker limited by the product stock
  - After confirming, the button itself changes to "Added to cart" for a moment
  - Cart page to increase or decrease quantities, remove items, clear the cart and see the total
  - Cart button in the navbar with a live item counter
- Loading, error (with "Try again") and empty states on both pages
- Responsive layout: 4 cards per row on desktop, 2 on mobile
- Filters and page number are kept in the URL, so refreshing keeps the same results
- The back button returns to the previous page, so the category, search and page number are kept

## Decisions

- **Search and category are not combined.** The API has a separate endpoint for each, so choosing one clears the other.
- **Favorites store the full product** in `localStorage`, because the API has no endpoint for favorites. The "Favorites only" view reads from there and paginates on the client.
- **The cart also lives in `localStorage`** through a single `CartService` that exposes signals, so every component reads the same state.
- **The discounted price is calculated on the client** from `price` and `discountPercentage`, because the API returns the price before the discount.
- **"Hot Deals" uses the API sorting** (`sortBy=discountPercentage`) instead of sorting on the client.
- **The Home page has no navbar.** The hero section is the entry point, and the navbar appears on every other page.
- All API calls live in one service (`ProductsService`). Components never use `HttpClient` directly.

## Optional features

- Page transition animations and a restyled back button
- Auto-scrolling product row on the Home page
- Shopping cart with a quantity picker


## What I would improve with more time

- A fake checkout flow with a form and an "Order placed" page
- Sorting options on the products page (price, rating, discount)
- A discount badge on the product cards
- Similar products on the product details page
- A "Best Selling" row on the Home page
- Add a quantity parameter to `CartService.addToCart`
