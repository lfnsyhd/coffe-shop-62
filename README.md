# +62 Coffee & Space ☕

Premium Indonesian Coffee Experience - Modern Mobile Web App

## 🎨 Design Features

- **Bold Black & Yellow Theme** - Inspired by Indonesia's country code +62
- **Modern UI/UX** - Premium animations and micro-interactions
- **Mobile-First** - Optimized for mobile devices (max-width: 480px)
- **Fully Functional** - Complete ordering system with cart and checkout

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **Vite 4** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Vanilla CSS** - Custom design system with animations
- **LocalStorage** - Cart persistence

## 📱 Features

### Pages
1. **Splash Screen** - Animated +62 branding
2. **Home Page** - Categories, best sellers, promo banner
3. **Product Detail** - Size selection, add-ons, customization
4. **Cart** - Item management, quantity controls
5. **Checkout** - Order type, payment methods, customer info
6. **Store Location** - Google Maps integration

### Menu Categories
- ☕ Coffee (Classic & Signature)
- 🥐 Croissant & Pastry
- 🍞 Bread (Roti Sobek)
- 🍰 Roll Cake
- 🍰 Slice Cake
- 🥤 Frappe

### Customization Options
- Size selection (S/M/L)
- Bean selection (+62 Blend, Argopuro, Bali, Flores)
- Add-ons (Syrups, Extra Shot, Dairy alternatives)
- Special notes

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment to Vercel

### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Method 2: Vercel Dashboard
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Deploy automatically

### Important Notes for Deployment:
- ✅ `vercel.json` configured for SPA routing
- ✅ `postinstall` script fixes permissions
- ✅ Node version specified (>=16.0.0)
- ✅ `.npmrc` configured for compatibility

## 📂 Project Structure

```
src/
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
├── styles/
│   └── index.css        # Global design system
├── data/
│   └── menuData.js      # Menu items, categories, prices
└── pages/
    ├── SplashScreen.jsx
    ├── HomePage.jsx
    ├── ProductDetail.jsx
    ├── Cart.jsx
    ├── Checkout.jsx
    └── StoreLocation.jsx
```

## 🎨 Design System

### Colors
- **Primary Background**: `#000000` (Black)
- **Accent**: `#FFCC00` (Yellow)
- **Secondary**: `#333333` (Gray)
- **Text**: `#FFFFFF` (White)

### Typography
- **Font**: Poppins (Google Fonts)
- **Weights**: 400, 600, 700, 800, 900

### Key CSS Classes
- `.btn-primary` - Yellow call-to-action buttons
- `.btn-secondary` - Outlined buttons
- `.card` - Product/content cards
- `.text-yellow` - Yellow accent text
- Responsive grid system
- Custom animations (fadeIn, slideUp, pulse)

## 💡 Usage Tips

### Adding New Menu Items
Edit `src/data/menuData.js`:
```javascript
{
  id: 'new1',
  name: 'New Product',
  price: 35000,
  category: 'coffee',
  image: 'product-image',
  sizes: ['M', 'L'],
  beans: true
}
```

### Customizing Colors
Edit `src/styles/index.css`:
```css
:root {
  --black: #000000;
  --yellow: #FFCC00;
  --gray: #333333;
}
```

## 📱 Mobile Optimization

- Fixed bottom navigation
- Touch-friendly buttons (min 44px)
- Smooth scrolling
- Optimized for 375px - 480px width
- Progressive Web App ready

## 🌟 Premium Features

- ✨ Glassmorphism effects
- 🎭 Smooth micro-animations
- 🎨 Gradient backgrounds
- 💫 Floating animations
- 🔄 Loading states
- 📍 Google Maps integration

## 📝 License

This project is created for +62 Coffee & Space brand.

## 🤝 Support

For deployment issues or questions, contact your development team.

---

**Built with ❤️ using React + Vite**
