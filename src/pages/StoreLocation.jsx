import { useNavigate } from 'react-router-dom';
import './StoreLocation.css';

function StoreLocation() {
    const navigate = useNavigate();

    const stores = [
        {
            id: 1,
            name: '+62 Coffee & Space - Central Jakarta',
            address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220',
            phone: '+62 21 1234 5678',
            hours: 'Mon-Sun: 07:00 - 22:00',
            mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1944491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1234567890',
        },
    ];

    const handleGetDirections = (address) => {
        const encodedAddress = encodeURIComponent(address);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    };

    return (
        <div className="app-container">
            <div className="page location-page">
                {/* Header */}
                <div className="header">
                    <button className="btn-icon" onClick={() => navigate(-1)}>
                        ←
                    </button>
                    <h3>Store Locations</h3>
                    <div style={{ width: '48px' }}></div>
                </div>

                {/* Location Info */}
                <div className="location-intro">
                    <h1>
                        <span className="text-yellow">+62</span> Locations
                    </h1>
                    <p>Visit our stores and experience Indonesian coffee culture</p>
                </div>

                {/* Store List */}
                {stores.map((store) => (
                    <div key={store.id} className="store-card">
                        <div className="store-header">
                            <h3>{store.name}</h3>
                            <span className="store-badge">Open</span>
                        </div>

                        {/* Map Embed */}
                        <div className="map-container">
                            <iframe
                                src={store.mapUrl}
                                width="100%"
                                height="300"
                                style={{ border: 0, borderRadius: '16px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Map for ${store.name}`}
                            ></iframe>
                        </div>

                        {/* Store Details */}
                        <div className="store-details">
                            <div className="detail-row">
                                <span className="detail-icon">📍</span>
                                <div>
                                    <p className="detail-label">Address</p>
                                    <p className="detail-value">{store.address}</p>
                                </div>
                            </div>

                            <div className="detail-row">
                                <span className="detail-icon">📞</span>
                                <div>
                                    <p className="detail-label">Phone</p>
                                    <p className="detail-value">{store.phone}</p>
                                </div>
                            </div>

                            <div className="detail-row">
                                <span className="detail-icon">🕐</span>
                                <div>
                                    <p className="detail-label">Operating Hours</p>
                                    <p className="detail-value">{store.hours}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="store-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleGetDirections(store.address)}
                            >
                                Get Directions
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => window.open(`tel:${store.phone}`)}
                            >
                                Call Store
                            </button>
                        </div>
                    </div>
                ))}

                {/* Bottom Navigation */}
                <div className="bottom-nav">
                    <div className="nav-item" onClick={() => navigate('/home')}>
                        <span className="nav-icon">🏠</span>
                        <span>Home</span>
                    </div>
                    <div className="nav-item" onClick={() => navigate('/cart')}>
                        <span className="nav-icon">🛒</span>
                        <span>Cart</span>
                    </div>
                    <div className="nav-item active">
                        <span className="nav-icon">📍</span>
                        <span>Location</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreLocation;
