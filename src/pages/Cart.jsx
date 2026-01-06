import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, addOns } from '../data/menuData';
import './Cart.css';

function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);
    }, []);

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeItem(itemId);
            return;
        }
        const updatedCart = cartItems.map(item =>
            item.id === itemId
                ? { ...item, quantity: newQuantity, total: (item.total / item.quantity) * newQuantity }
                : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.total, 0);
    };

    const getAddOnNames = (item) => {
        const allAddOnItems = [...addOns.syrups, ...addOns.extra, ...addOns.dairy];
        const selectedAddOns = Object.values(item.addOns).flat();
        return selectedAddOns
            .map(id => allAddOnItems.find(a => a.id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    const getProductEmoji = (category) => {
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
    };

    return (
        <div className="app-container">
            <div className="page cart-page">
                {/* Header */}
                <div className="header">
                    <button className="btn-icon" onClick={() => navigate(-1)}>
                        ←
                    </button>
                    <h3>My Cart ({cartItems.length})</h3>
                    <div style={{ width: '48px' }}></div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Add some delicious items to get started!</p>
                        <button className="btn btn-primary" onClick={() => navigate('/home')}>
                            Browse Menu
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item slide-up">
                                    <div className="item-image">
                                        {getProductEmoji(item.product.category)}
                                    </div>
                                    <div className="item-details">
                                        <h4>{item.product.name}</h4>
                                        {item.size && <p className="item-meta">Size: {item.size}</p>}
                                        {item.bean && <p className="item-meta">Bean: {item.bean}</p>}
                                        {getAddOnNames(item) && (
                                            <p className="item-meta">Add-ons: {getAddOnNames(item)}</p>
                                        )}
                                        {item.notes && <p className="item-meta">Notes: {item.notes}</p>}
                                        <div className="item-price text-yellow">{formatPrice(item.total)}</div>
                                    </div>
                                    <div className="item-actions">
                                        <button
                                            className="btn-icon small"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            🗑️
                                        </button>
                                        <div className="qty-control">
                                            <button
                                                className="qty-btn-small"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                className="qty-btn-small"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="cart-summary">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span className="text-yellow">{formatPrice(getTotal())}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax (10%)</span>
                                <span className="text-yellow">{formatPrice(getTotal() * 0.1)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span className="text-yellow">{formatPrice(getTotal() * 1.1)}</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <div className="cart-footer">
                            <button
                                className="btn btn-primary checkout-btn"
                                onClick={() => navigate('/checkout')}
                            >
                                Proceed to Checkout • {formatPrice(getTotal() * 1.1)}
                            </button>
                        </div>
                    </>
                )}

                {/* Bottom Navigation */}
                <div className="bottom-nav">
                    <div className="nav-item" onClick={() => navigate('/home')}>
                        <span className="nav-icon">🏠</span>
                        <span>Home</span>
                    </div>
                    <div className="nav-item active">
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

export default Cart;
