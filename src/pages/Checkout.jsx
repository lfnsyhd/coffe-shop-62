import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../data/menuData';
import './Checkout.css';

function Checkout() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [orderType, setOrderType] = useState('delivery'); // delivery or pickup
    const [paymentMethod, setPaymentMethod] = useState(''); // cash, qris, transfer
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);
    }, []);

    const getTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.total, 0);
    };

    const getTotalWithTax = () => {
        return getTotal() * 1.1;
    };

    const handlePlaceOrder = () => {
        if (!customerName || !customerPhone || !paymentMethod) {
            alert('Please fill in all required fields');
            return;
        }

        if (orderType === 'delivery' && !deliveryAddress) {
            alert('Please enter delivery address');
            return;
        }

        // Simulate order placement
        const order = {
            items: cartItems,
            orderType,
            paymentMethod,
            deliveryAddress: orderType === 'delivery' ? deliveryAddress : null,
            customerName,
            customerPhone,
            total: getTotalWithTax(),
            orderTime: new Date().toISOString(),
        };

        console.log('Order placed:', order);

        // Clear cart
        localStorage.setItem('cart', JSON.stringify([]));

        alert('✅ Order placed successfully! Thank you for your order.');
        navigate('/home');
    };

    return (
        <div className="app-container">
            <div className="page checkout-page">
                {/* Header */}
                <div className="header">
                    <button className="btn-icon" onClick={() => navigate(-1)}>
                        ←
                    </button>
                    <h3>Checkout</h3>
                    <div style={{ width: '48px' }}></div>
                </div>

                {/* Order Type */}
                <div className="checkout-section">
                    <h4 className="mb-12">Order Type</h4>
                    <div className="option-buttons">
                        <button
                            className={`option-btn ${orderType === 'delivery' ? 'active' : ''}`}
                            onClick={() => setOrderType('delivery')}
                        >
                            🚗 Delivery
                        </button>
                        <button
                            className={`option-btn ${orderType === 'pickup' ? 'active' : ''}`}
                            onClick={() => setOrderType('pickup')}
                        >
                            🏪 Pick-up
                        </button>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="checkout-section">
                    <h4 className="mb-12">Customer Information</h4>
                    <div className="input-group">
                        <label>Name *</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Enter your name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Phone Number *</label>
                        <input
                            type="tel"
                            className="input-field"
                            placeholder="08xxxxxxxxxx"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                    </div>
                </div>

                {/* Delivery Address */}
                {orderType === 'delivery' && (
                    <div className="checkout-section">
                        <h4 className="mb-12">Delivery Address</h4>
                        <div className="input-group">
                            <textarea
                                className="input-field"
                                placeholder="Enter your complete address"
                                rows="3"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Payment Method */}
                <div className="checkout-section">
                    <h4 className="mb-12">Payment Method</h4>
                    <div className="payment-options">
                        <button
                            className={`payment-btn ${paymentMethod === 'cash' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('cash')}
                        >
                            <span className="payment-icon">💵</span>
                            <span>Cash</span>
                        </button>
                        <button
                            className={`payment-btn ${paymentMethod === 'qris' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('qris')}
                        >
                            <span className="payment-icon">📱</span>
                            <span>QRIS</span>
                        </button>
                        <button
                            className={`payment-btn ${paymentMethod === 'transfer' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('transfer')}
                        >
                            <span className="payment-icon">🏦</span>
                            <span>Bank Transfer</span>
                        </button>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="checkout-section">
                    <h4 className="mb-12">Order Summary</h4>
                    <div className="summary-card">
                        <div className="summary-row">
                            <span>Items ({cartItems.length})</span>
                            <span className="text-yellow">{formatPrice(getTotal())}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax (10%)</span>
                            <span className="text-yellow">{formatPrice(getTotal() * 0.1)}</span>
                        </div>
                        {orderType === 'delivery' && (
                            <div className="summary-row">
                                <span>Delivery Fee</span>
                                <span className="text-yellow">FREE</span>
                            </div>
                        )}
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Total Payment</span>
                            <span className="text-yellow">{formatPrice(getTotalWithTax())}</span>
                        </div>
                    </div>
                </div>

                {/* Place Order Button */}
                <div className="place-order-section">
                    <button className="btn btn-primary place-order-btn" onClick={handlePlaceOrder}>
                        Place Order • {formatPrice(getTotalWithTax())}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
