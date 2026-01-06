import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, menuData, allMenuItems, formatPrice } from '../data/menuData';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('coffee');
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(cart.length);
    }, []);

    const bestSellers = [
        allMenuItems.find(item => item.id === 'sig1'), // Pandan Latte
        allMenuItems.find(item => item.id === 'co5'), // Cafe Latte
        allMenuItems.find(item => item.id === 'c1'), // Butter Croissant
        allMenuItems.find(item => item.id === 'sig2'), // Aren Latte
    ];

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="app-container">
            <div className="page home-page">
                {/* Header */}
                <div className="header">
                    <div>
                        <h1 className="header-title">
                            <span className="text-yellow">+62</span> Coffee
                        </h1>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>Premium Indonesian Coffee</p>
                    </div>
                    <div className="header-actions">
                        <button className="btn-icon" onClick={() => navigate('/location')}>
                            📍
                        </button>
                        <button className="btn-icon" onClick={() => navigate('/cart')} style={{ position: 'relative' }}>
                            🛒
                            {cartCount > 0 && <span className="badge">{cartCount}</span>}
                        </button>
                    </div>
                </div>

                {/* Promo Banner */}
                <div className="promo-banner mb-24">
                    <div className="promo-content">
                        <h2>Grand Opening!</h2>
                        <p>Dapatkan diskon 20% untuk semua menu signature</p>
                        <button className="btn btn-primary">Pesan Sekarang</button>
                    </div>
                </div>

                {/* Categories */}
                <div className="section">
                    <h3 className="mb-16">Menu Categories</h3>
                    <div className="categories-scroll">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                <span className="category-icon">{cat.emoji}</span>
                                <span className="category-name">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Best Sellers */}
                <div className="section mb-24">
                    <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3>Best Sellers ⭐</h3>
                    </div>
                    <div className="products-grid">
                        {bestSellers.map((product) => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div className="product-image">{getProductEmoji(product.category)}</div>
                                <div className="product-info">
                                    <h4 className="product-name">{product.name}</h4>
                                    <p className="product-price text-yellow">{formatPrice(product.price)}</p>
                                </div>
                                <button className="btn-add">+</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category Products */}
                <div className="section" style={{ paddingBottom: '80px' }}>
                    <h3 className="mb-16">
                        {categories.find(c => c.id === selectedCategory)?.name} Menu
                    </h3>
                    <div className="products-grid">
                        {menuData[selectedCategory]?.map((product) => (
                            <div
                                key={product.id}
                                className="product-card"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div className="product-image">{getProductEmoji(product.category)}</div>
                                <div className="product-info">
                                    <h4 className="product-name">{product.name}</h4>
                                    <p className="product-price text-yellow">{formatPrice(product.price)}</p>
                                </div>
                                <button className="btn-add">+</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Navigation */}
                <div className="bottom-nav">
                    <div className="nav-item active" onClick={() => navigate('/home')}>
                        <span className="nav-icon">🏠</span>
                        <span>Home</span>
                    </div>
                    <div className="nav-item" onClick={() => navigate('/cart')}>
                        <span className="nav-icon">🛒</span>
                        <span>Cart</span>
                    </div>
                    <div className="nav-item" onClick={() => navigate('/location')}>
                        <span className="nav-icon">📍</span>
                        <span>Location</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getProductEmoji(category) {
    const emojiMap = {
        coffee: '☕',
        bread: '🍞',
        croissant: '🥐',
        rollCake: '🍰',
        sliceCake: '🍰',
        frappe: '🥤',
        signature: '✨',
    };
    return emojiMap[category] || '☕';
}

export default HomePage;
