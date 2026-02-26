# Yuma Clothing 🌿

Production-ready **e-commerce website for Yuma Clothing** — a women’s and kids fashion brand based in Nepal.
This project represents the official online store for **Yuma (yuma.com.np)**, inspired by *Mother Earth* — symbolizing elegance, warmth, femininity, and timeless fashion.

Built with **Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit**, and integrated with Nepali payment solutions.

---

## ✨ Features

### 🌸 Branding

* Yuma branding across logo, metadata, footer, and social links.
* Nature-inspired luxury aesthetic reflecting femininity and elegance.

### 👗 Product Categories

* **Women:** Dresses, Tops, Ethnic Wear, Casual Wear, Winter Collection, Accessories.
* **Kids:** Girls, Boys, Baby Collection, Seasonal Wear.

### 🛒 E-commerce Functionality

* Product listings by category.
* Product detail pages.
* Shopping cart & checkout system.
* Order confirmation flow.

### 💳 Payment Options

* Cash on Delivery (COD).
* Online payments integration:

  * eSewa
  * Khalti
  * Stripe (optional card payments).

### 📧 Email Notifications

* Order confirmation emails via Resend.
* Configure:

  * `RESEND_API_KEY`
  * `RESEND_FROM`

### 🧑‍💼 Admin Dashboard

* `/admin` panel for orders and product overview.
* Orders stored in-memory by default (can integrate Supabase or database).

### 📱 SEO & Performance

* Mobile-first responsive design.
* SEO optimized metadata.
* Deployment ready for Vercel / Netlify.

---

## 🚀 Technologies Used

* **Next.js 14** — React framework with SSR and optimized routing.
* **TypeScript** — Strong typing and maintainability.
* **Tailwind CSS** — Utility-first styling.
* **Redux Toolkit** — Global state management (cart & checkout).
* **Framer Motion** — Smooth UI animations.
* **ShadCN UI** — Accessible, customizable UI components.

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/bipanalimbu298/yuma-clothing.git
cd yuma-clothing
```

### 2️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

### 4️⃣ Environment Variables (Optional)

Create `.env.local`:

* `STRIPE_SECRET_KEY`
* `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
* `RESEND_API_KEY`
* `RESEND_FROM`

Also update:

* WhatsApp contact link
* Social media URLs
* Domain references

### 5️⃣ Open Browser

```
http://localhost:3000
```

---

## 🌐 Deployment

### Vercel

1. Push repo to GitHub.
2. Import project in Vercel.
3. Add environment variables.
4. Deploy.

### Netlify

* Build command:

```
npm run build
```

* Publish directory:

```
.next
```

* Use Next.js runtime plugin.

---

## 📂 Project Structure

```
yuma-clothing/
│
├── public/                 # Static assets & images
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # Reusable UI components
│   └── lib/
│       ├── features/       # Redux features (cart etc.)
│       ├── hooks/          # Custom hooks
│       ├── store.ts        # Redux store
│       ├── utils.ts        # Helper utilities
│
├── styles/                 # Tailwind styles
├── types/                  # TypeScript types
├── next.config.mjs
├── tailwind.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome.

Steps:

1. Fork repository.
2. Create feature branch.
3. Make changes.
4. Push branch.
5. Submit pull request.

---

## 🐞 Issues & Support

If you find bugs, have suggestions, or need help:

📧 Email: **[bipanal834@gmail.com](mailto:bipanal834@gmail.com)**

---

## 🌿 About Yuma

**Yuma** represents feminine strength, nature, and timeless fashion inspired by the concept of *Mother Earth*.
Our mission is to bring elegant, comfortable, and stylish clothing for women and kids while maintaining a modern global aesthetic rooted in Nepali warmth.

---

**© Yuma Clothing — All Rights Reserved**
