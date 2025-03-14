# NextEcommerce

NextEcommerce is a modern eCommerce web application built using **Next.js 15**, **Tailwind CSS**, **ShadCN UI**, **Sanity.io** (as the CMS), and **Stripe** for payments. The project is designed to provide a seamless shopping experience with a clean UI and robust functionality.

## 🚀 Features
- **Modern UI**: Built with Tailwind CSS & ShadCN UI for a sleek design.
- **Sanity.io CMS**: Manage products and content dynamically.
- **Shopping Cart**: Add, remove, and update items in the cart.
- **Stripe Integration**: Secure and seamless checkout with Stripe.
- **Responsive Design**: Fully optimized for desktop & mobile devices.
- **Next.js 15**: Leveraging the latest features for performance and scalability.

## 🛠️ Technologies Used
- **Next.js 15** - React framework for building server-rendered apps.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **ShadCN UI** - Beautiful UI components.
- **Sanity.io** - Headless CMS for dynamic content management.
- **Stripe** - Payment gateway integration.

## 📦 Installation & Setup

### 1. Clone the repository
```sh
git clone https://github.com/your-username/next-ecommerce.git
cd next-ecommerce
```

### 2. Install dependencies
```sh
yarn install  # or npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory and add your API keys:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4. Run the development server
```sh
yarn dev  # or npm run dev
```

### 5. Deploying the project
To deploy on Vercel:
```sh
vercel
```
Or use any preferred hosting platform that supports Next.js.

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).

---
💡 **Feel free to contribute!** If you find any bugs or want to add new features, open an issue or a pull request.

