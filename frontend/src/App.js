import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import GameList from './components/GameList';
import AddGame from './components/AddGame';
import About from './components/About';
import { FaGamepad, FaPlus, FaInfoCircle, FaHome, FaShieldAlt } from 'react-icons/fa';

function App() {
    const [health, setHealth] = useState(null);
    const [error, setError] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetch('https://localhost:4000/health')
            .then(res => res.json())
            .then(data => setHealth(data))
            .catch(err => {
                console.error('API connection error:', err);
                setError('Cannot connect to GameVault API');
            });
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Router>
            <div className="App">
                {/* Navbar */}
                <nav className="navbar">
                    <div className="nav-container">
                        <div className="nav-brand">
                            <FaGamepad className="brand-icon" />
                            <h1>GameVault</h1>
                        </div>

                        {/* Hamburger Menu Button */}
                        <div className="hamburger" onClick={toggleMenu}>
                            <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                            <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                            <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                        </div>

                        {/* Nav Links */}
                        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                            <li>
                                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                                    <FaHome className="nav-icon" /> Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/games" onClick={() => setIsMenuOpen(false)}>
                                    <FaGamepad className="nav-icon" /> Games
                                </Link>
                            </li>
                            <li>
                                <Link to="/add" onClick={() => setIsMenuOpen(false)}>
                                    <FaPlus className="nav-icon" /> Add Game
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                                    <FaInfoCircle className="nav-icon" /> About
                                </Link>
                            </li>
                        </ul>

                        {/* Status Badge */}
                        <div className="status-badge">
                            {health ? (
                                <span className="status-online">
                                    <FaShieldAlt /> {health.protocol || 'HTTPS'}
                                </span>
                            ) : error ? (
                                <span className="status-offline">
                                    ⚠️ {error}
                                </span>
                            ) : (
                                <span className="status-loading">Connecting...</span>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="main-content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/games" element={<GameList />} />
                            <Route path="/add" element={<AddGame />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </div>
                </main>

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>🎮 GameVault</h3>
                            <p>Your secure video game collection</p>
                            <p className="footer-protocol">🔐 All data encrypted with HTTPS</p>
                        </div>
                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <Link to="/">Home</Link>
                            <Link to="/games">Games</Link>
                            <Link to="/add">Add Game</Link>
                            <Link to="/about">About</Link>
                        </div>
                        <div className="footer-section">
                            <h4>Tech Stack</h4>
                            <p>React • Node.js • Express</p>
                            <p>HTTPS • REST API</p>
                        </div>
                        <div className="footer-section">
                            <h4>Status</h4>
                            {health ? (
                                <p className="status-online">🟢 API Online</p>
                            ) : (
                                <p className="status-offline">🔴 API Offline</p>
                            )}
                            <p className="footer-timestamp">
                                {new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2026 GameVault. Built with 💜</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

// Home Component
function Home() {
    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">🔐 Secure</div>
                    <h1 className="hero-title">
                        Welcome to <span className="highlight">GameVault</span>
                    </h1>
                    <p className="hero-subtitle">
                        Your secure video game collection and review platform
                    </p>
                    <div className="hero-buttons">
                        <Link to="/games" className="btn btn-primary">
                            <FaGamepad /> Browse Games
                        </Link>
                        <Link to="/add" className="btn btn-secondary">
                            <FaPlus /> Add Game
                        </Link>
                    </div>
                </div>
                <div className="hero-decoration">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>
            </div>

            <div className="features-section">
                <h2 className="section-title">Why GameVault?</h2>
                <div className="features-grid">
                    <div className="feature-card glass">
                        <div className="feature-icon">🎮</div>
                        <h3>Browse Games</h3>
                        <p>Explore your collection of video games with detailed information</p>
                    </div>
                    <div className="feature-card glass">
                        <div className="feature-icon">📝</div>
                        <h3>Add Games</h3>
                        <p>Easily add new games to your vault with all the details</p>
                    </div>
                    <div className="feature-card glass">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure</h3>
                        <p>All data is encrypted with HTTPS for maximum security</p>
                    </div>
                    <div className="feature-card glass">
                        <div className="feature-icon">⚡</div>
                        <h3>Fast</h3>
                        <p>Built with modern tech for lightning-fast performance</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;