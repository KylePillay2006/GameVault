import React from 'react';
import { FaShieldAlt, FaNodeJs, FaReact, FaDatabase, FaLock, FaRocket } from 'react-icons/fa';
import { SiExpress, SiMongodb } from 'react-icons/si';

function About() {
    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="about-icon">🎮</div>
                <h2>About <span className="highlight">GameVault</span></h2>
                <p className="about-subtitle">Your secure video game collection platform</p>
            </div>

            <div className="about-content">
                <div className="about-description">
                    <h3>📖 What is GameVault?</h3>
                    <p>
                        GameVault is a secure, full-stack web application designed for video game enthusiasts 
                        to build and manage their personal game collections. With a sleek interface and 
                        robust backend, GameVault provides a seamless experience for organizing your gaming library.
                    </p>
                </div>

                <div className="about-features">
                    <h3>✨ Key Features</h3>
                    <div className="about-features-grid">
                        <div className="about-feature-item">
                            <span className="feature-emoji">🎮</span>
                            <span>Browse your game collection</span>
                        </div>
                        <div className="about-feature-item">
                            <span className="feature-emoji">📝</span>
                            <span>Add new games with ease</span>
                        </div>
                        <div className="about-feature-item">
                            <span className="feature-emoji">🔒</span>
                            <span>Secure HTTPS encryption</span>
                        </div>
                        <div className="about-feature-item">
                            <span className="feature-emoji">⚡</span>
                            <span>Fast and responsive design</span>
                        </div>
                        <div className="about-feature-item">
                            <span className="feature-emoji">📱</span>
                            <span>Mobile-friendly interface</span>
                        </div>
                        <div className="about-feature-item">
                            <span className="feature-emoji">🎯</span>
                            <span>Detailed game information</span>
                        </div>
                    </div>
                </div>

                <div className="about-tech">
                    <h3>🛠️ Built With</h3>
                    <div className="about-tech-grid">
                        <div className="tech-item">
                            <FaNodeJs className="tech-icon" />
                            <span>Node.js</span>
                        </div>
                        <div className="tech-item">
                            <SiExpress className="tech-icon" />
                            <span>Express</span>
                        </div>
                        <div className="tech-item">
                            <FaReact className="tech-icon" />
                            <span>React</span>
                        </div>
                        <div className="tech-item">
                            <FaShieldAlt className="tech-icon" />
                            <span>HTTPS</span>
                        </div>
                        <div className="tech-item">
                            <SiMongodb className="tech-icon" />
                            <span>MongoDB (Coming Soon)</span>
                        </div>
                    </div>
                </div>

                <div className="about-security">
                    <div className="security-card">
                        <FaLock className="security-icon" />
                        <div>
                            <h4>🔐 Secure by Design</h4>
                            <p>
                                All data transmitted between the frontend and backend is encrypted using 
                                HTTPS/TLS protocols. Your game collection stays private and secure.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="about-status">
                    <div className="status-badge-about">
                        <span className="status-dot"></span>
                        <span>Current Stage: <strong>Learning Unit 3 - Frontend Foundations</strong></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;