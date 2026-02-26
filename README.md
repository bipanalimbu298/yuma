# Yuma Clothing

Production-ready e-commerce site for **Yuma Clothing** — ladies and kids clothing in Nepal. Built with Next.js 14, TypeScript, Tailwind, Redux, and integrations for COD, eSewa, Khalti, and email notifications.

## Features

- **Branding**: Yuma / Yuma Clothing across logo, meta tags, footer, and social links (Instagram, Facebook, WhatsApp).
- **Categories**: Women (Dresses, Tops, Ethnic, Casual, Winter, Accessories) and Kids (Girls, Boys, Baby, Seasonal).
- **E-commerce**: Product listing by category, product details, cart, checkout, order confirmation.
- **Payments**: Cash on Delivery (COD) and Stripe (card). Configure `STRIPE_SECRET_KEY` for card payments.
- **Email**: Order confirmation emails via Resend (set `RESEND_API_KEY` and `RESEND_FROM`).
- **Admin**: `/admin` — view orders and products (orders stored in-memory by default; add Supabase for persistence).
- **SEO & mobile**: Metadata, responsive layout, Vercel/Netlify ready.

## Table of Contents

- [Shopco](#shopco)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Demo](#demo)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [Issues](#issues)
  - [License](#license)
  - [Contact](#contact)

## Overview

Shopco bridges the gap between design and development by converting Figma designs into production-ready code. The project follows best practices for **SEO**, **performance optimization**, and **accessibility**, making it a perfect foundation for developers looking to create scalable and maintainable e-commerce front-ends.

## Features

- **Next.js 14**: Server-side rendering (SSR), Static Site Generation (SSG), optimized routing, and API integrations.
- **TypeScript**: Strongly typed code for better error detection and maintainability.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Redux**: State management for managing the shopping cart and other global states.
- **Framer Motion**: Smooth animations and transitions for an enhanced user experience.
- **ShadCN UI**: Beautifully styled, accessible, and customizable UI components.
- **Fully Responsive**: Mobile-first design ensuring the layout adapts across devices.
- **Performance Optimized**: Best practices followed for fast loading and interaction.
- **Accessible**: Built with accessibility standards to provide an inclusive experience.

## Technologies

- **Next.js 14** - A popular React framework with built-in SSR and optimization.
- **TypeScript** - A superset of JavaScript for strong typing and code consistency.
- **Tailwind CSS** - A utility-first CSS framework for fast, responsive design.
- **Redux** - A state management library used for the shopping cart and global app state.
- **Framer Motion** - A library for animations and interactions in React.
- **ShadCN UI** - A collection of beautiful, accessible, and customizable UI components.
## Installation

To get started with Shopco locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mohammadoftadeh/next-ecommerce-shopco.git
   cd next-ecommerce-shopco
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   ```bash
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   ```bash
   yarn dev
   ```

4. **Optional — environment variables:** Copy `.env.example` to `.env.local` and set:
   - `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` for card payments.
   - `RESEND_API_KEY` and `RESEND_FROM` for order confirmation emails.
   - Update WhatsApp/social URLs in the footer and contact page.

5. **Open in your browser:** [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel / Netlify)

- **Vercel:** Push to GitHub and import the repo in [Vercel](https://vercel.com). Add env vars in the dashboard. Build command: `npm run build`; output: Next.js.
- **Netlify:** Connect the repo, build command `npm run build`, publish directory `.next` and use the Netlify Next.js runtime (or `npx @netlify/plugin-nextjs`).
- Set the same env vars in the deployment dashboard. Update `public/robots.txt` and your domain’s sitemap URL when live.

## Usage

- **Main page:** `src/app/page.tsx`. **Products data:** `src/lib/data/products.ts`. **Categories:** `src/lib/constants/categories.ts`.
- **Cart & checkout:** Redux cart in `src/lib/features/carts`. Checkout at `/checkout`; orders POST to `src/app/api/orders`.
- **Admin:** Visit `/admin` to view orders and products. For persistent orders, integrate Supabase and replace the in-memory store in `src/app/api/orders/route.ts`.

## Project Structure

```bash
Shopco/
│
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # Reusable components (including ShadCN UI components)
│   └── lib/
│       ├── features/      # The Redux logics for features (e.g., shopping cart)
│       ├── hooks/         # Custom React hooks
│       ├── store.ts       # Redux store
│       ├── utils.ts       # Utility functions
│   ├── styles/            # Tailwind CSS styles (global, utilities and fonts)
│   ├── types/             # TypeScript types
│
├── components.json         # ShadCN UI configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Node.js dependencies and scripts
├── postcss.config.mjs      # Post CSS configuration
└── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
```

## Contributing

Contributions are welcome! If you'd like to contribute, Please follow these steps to contribute to Shopco:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## Issues

Feel free to submit issues for any bugs, feature requests, or general questions related to the project. You can also reach out via [email](mailto:bipanal834@gmail.com) for support.



