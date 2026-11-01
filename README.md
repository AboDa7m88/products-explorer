# 🛍️ Product Explorer

A modern and responsive product browsing application built with Angular, designed to provide users with a simple and intuitive way to discover products, explore product details, and save their favorite items.

The application uses the DummyJSON Products API to retrieve real product data, offering a practical shopping experience without requiring a backend or database.

> 🚧 **Project Status: In Progress**
>
> Product Explorer is currently under development. New features, UI improvements, and performance enhancements will be introduced as the project evolves.

## ✨ Features

The application is planned to include the following features:

- **Product Browsing:** Explore products with images, prices, and ratings.
- **Search:** Find products quickly by name.
- **Category Filtering:** Browse products by category.
- **Pagination:** Navigate through product listings efficiently.
- **Product Details:** View detailed product information and images.
- **Favorites:** Save favorite products and access them later.
- **Persistent Storage:** Keep favorite products saved using browser local storage.
- **Responsive Design:** Enjoy a consistent experience across desktop and mobile devices.
- **Loading & Error States:** Clear feedback while data loads or when a request fails.

*Features will be implemented progressively throughout development.*

## 🛠️ Tech Stack

- **Angular** — Frontend framework.
- **TypeScript** — Application logic and type safety.
- **Bootstrap** — Responsive layout and UI styling.
- **RxJS** — Asynchronous operations and reactive data handling.
- **Angular Router** — Navigation between application pages.
- **DummyJSON API** — Product data source.
- **LocalStorage** — Persistent storage for favorite products.

## 🌐 API

Product data is provided by the [DummyJSON Products API](https://dummyjson.com/docs/products).

No API key, custom backend, or database is required.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Angular CLI

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd product-explorer
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   ng serve -o
   ```

5. Open the local development URL displayed in your terminal if the browser does not open automatically.

## 📱 Responsive Design

Product Explorer is being developed with responsive layouts in mind, providing:

- A four-column product grid on desktop screens.
- A two-column product grid on mobile screens.
- Responsive navigation and product details layouts.

The layouts will be tested and refined throughout development.

## 📂 Project Structure

The application will follow a modular Angular architecture, separating pages, reusable components, services, and data models.

```text
src/
└── app/
    ├── components/
    ├── pages/
    ├── services/
    ├── models/
    ├── app.routes.ts
    └── app.config.ts
```

The structure may evolve as the application grows.

## 🔮 Future Improvements

Potential enhancements include:

- Product sorting by price and rating.
- Shopping cart functionality.
- Dark mode with saved preferences.
- Unit testing.
- Deployment to a public hosting platform.

Additional improvements will be considered after the core functionality is complete.

## 👨‍💻 Development Notes

This project is being developed as a practical Angular application to strengthen frontend development skills and apply concepts such as component-based architecture, API integration, routing, reactive programming, and state management.

The codebase and documentation will continue to evolve as development progresses.

## 📄 License

This project is currently intended for learning and portfolio purposes.
