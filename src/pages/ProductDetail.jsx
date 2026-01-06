import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allMenuItems, beanOptions, addOns, formatPrice } from '../data/menuData';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedBean, setSelectedBean] = useState('blend');
    const [selectedAddOns, setSelectedAddOns] = useState({
        syrups: [],
        extra: [],
        dairy: []
    });
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const foundProduct = allMenuItems.find(item => item.id === id);
        setProduct(foundProduct);
        if (foundProduct?.sizes) {
            setSelectedSize(foundProduct.sizes[0]);
        }
    }, [id]);

    if (!product) {
        return <div className="page">Loading...</div>;
    }

    const calculateTotal = () => {
        let total = product.priceL && selectedSize === 'L' ? product.priceL : product.price;

        // Add-ons
        Object.values(selectedAddOns).flat().forEach(addon => {
            const allAddOns = [...addOns.syrups, ...addOns.extra, ...addOns.dairy];
            const addonItem = allAddOns.find(a => a.id === addon);
            if (addonItem) total += addonItem.price;
        });

        return total * quantity;
    };

    const toggleAddOn = (category, addonId) => {
        setSelectedAddOns(prev => {
            const current = prev[category];
            const newValue = current.includes(addonId)
                ? current.filter(id => id !== addonId)
                : [...current, addonId];
            return { ...prev, [category]: newValue };
        });
    };

    const handleAddToCart = () => {
        const cartItem = {
            product,
            size: selectedSize,
            bean: product.beans ? selectedBean : null,
            addOns: selectedAddOns,
            quantity,
            notes,
            total: calculateTotal(),
            id: Date.now()
        };

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        navigate('/cart');
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
            <div className="page product-detail-page">
                {/* Header */}
                <div className="header">
                    <button className="btn-icon" onClick={() => navigate(-1)}>
                        ←
                    </button>
                    <h3>Product Detail</h3>
                    <button className="btn-icon" onClick={() => navigate('/cart')}>
                        🛒
                    </button>
                </div>

                {/* Product Image */}
                <div className="product-detail-image">
                    <div className="emoji-display">{getProductEmoji(product.category)}</div>
                </div>

                {/* Product Info */}
                <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <p className="price text-yellow">{formatPrice(product.price)}</p>
                    {product.description && (
                        <p className="description">{product.description}</p>
                    )}
                </div>

                {/* Size Selection */}
                {product.sizes && (
                    <div className="option-section">
                        <h4 className="mb-12">Size</h4>
                        <div className="size-options">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                    {product.priceL && size === 'L' && (
                                        <span className="size-price">+{formatPrice(product.priceL - product.price)}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bean Selection */}
                {product.beans && (
                    <div className="option-section">
                        <h4 className="mb-12">Choice of Beans</h4>
                        <div className="bean-options">
                            {beanOptions.map(bean => (
                                <button
                                    key={bean.id}
                                    className={`bean-btn ${selectedBean === bean.id ? 'active' : ''}`}
                                    onClick={() => setSelectedBean(bean.id)}
                                >
                                    {bean.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add-ons */}
                {(product.category === 'coffee' || product.category === 'signature' || product.category === 'frappe') && (
                    <>
                        <div className="option-section">
                            <h4 className="mb-12">Syrups</h4>
                            <div className="addon-options">
                                {addOns.syrups.map(syrup => (
                                    <button
                                        key={syrup.id}
                                        className={`addon-btn ${selectedAddOns.syrups.includes(syrup.id) ? 'active' : ''}`}
                                        onClick={() => toggleAddOn('syrups', syrup.id)}
                                    >
                                        <span>{syrup.name}</span>
                                        <span className="addon-price">+{formatPrice(syrup.price)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="option-section">
                            <h4 className="mb-12">Extra</h4>
                            <div className="addon-options">
                                {addOns.extra.map(extra => (
                                    <button
                                        key={extra.id}
                                        className={`addon-btn ${selectedAddOns.extra.includes(extra.id) ? 'active' : ''}`}
                                        onClick={() => toggleAddOn('extra', extra.id)}
                                    >
                                        <span>{extra.name}</span>
                                        <span className="addon-price">+{formatPrice(extra.price)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="option-section">
                            <h4 className="mb-12">Dairy Options</h4>
                            <div className="addon-options">
                                {addOns.dairy.map(dairy => (
                                    <button
                                        key={dairy.id}
                                        className={`addon-btn ${selectedAddOns.dairy.includes(dairy.id) ? 'active' : ''}`}
                                        onClick={() => toggleAddOn('dairy', dairy.id)}
                                    >
                                        <span>{dairy.name}</span>
                                        <span className="addon-price">+{formatPrice(dairy.price)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Notes */}
                <div className="option-section">
                    <h4 className="mb-12">Notes (Optional)</h4>
                    <textarea
                        className="input-field notes-field"
                        placeholder="e.g., Less sugar, Extra hot"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows="3"
                    />
                </div>

                {/* Quantity & Add to Cart */}
                <div className="cart-actions">
                    <div className="quantity-selector">
                        <button
                            className="qty-btn"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                            -
                        </button>
                        <span className="qty-display">{quantity}</span>
                        <button
                            className="qty-btn"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                        Add to Cart • {formatPrice(calculateTotal())}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
