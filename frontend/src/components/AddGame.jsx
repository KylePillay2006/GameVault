import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../api/gameApi';
import { FaPlus, FaGamepad, FaFilm, FaDesktop, FaCalendar, FaStar, FaArrowLeft } from 'react-icons/fa';

function AddGame() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        platform: '',
        releaseYear: new Date().getFullYear(),
        ageRating: 'E10+'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const ageRatings = ['E', 'E10+', 'T', 'M', '18'];
    const platforms = ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'Mobile'];
    const genres = ['Action', 'Adventure', 'RPG', 'FPS', 'Sports', 'Racing', 'Puzzle', 'Strategy', 'Sandbox', 'MMO', 'Horror', 'Fighting'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'releaseYear' ? parseInt(value) || 0 : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await createGame(formData);
            setSuccess(true);
            setFormData({
                title: '',
                genre: '',
                platform: '',
                releaseYear: new Date().getFullYear(),
                ageRating: 'E10+'
            });
            setTimeout(() => navigate('/games'), 1500);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create game');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-game">
            <div className="add-game-header">
                <button className="btn-back" onClick={() => navigate('/games')}>
                    <FaArrowLeft /> Back
                </button>
                <div className="add-game-title">
                    <FaGamepad className="title-icon" />
                    <h2>Add New Game</h2>
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    <span className="alert-icon">⚠️</span>
                    {error}
                </div>
            )}
            
            {success && (
                <div className="alert alert-success">
                    <span className="alert-icon">✅</span>
                    Game created successfully! Redirecting...
                </div>
            )}

            <form onSubmit={handleSubmit} className="game-form">
                <div className="form-row">
                    <div className="form-group full-width">
                        <label htmlFor="title">
                            <FaGamepad className="label-icon" /> Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Enter game title..."
                            value={formData.title}
                            onChange={handleChange}
                            required
                            minLength={2}
                            maxLength={100}
                        />
                        <small className="helper-text">2-100 characters</small>
                    </div>
                </div>

                <div className="form-row two-col">
                    <div className="form-group">
                        <label htmlFor="genre">
                            <FaFilm className="label-icon" /> Genre
                        </label>
                        <select
                            id="genre"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select genre...</option>
                            {genres.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="platform">
                            <FaDesktop className="label-icon" /> Platform
                        </label>
                        <select
                            id="platform"
                            name="platform"
                            value={formData.platform}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select platform...</option>
                            {platforms.map(platform => (
                                <option key={platform} value={platform}>{platform}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row two-col">
                    <div className="form-group">
                        <label htmlFor="releaseYear">
                            <FaCalendar className="label-icon" /> Release Year
                        </label>
                        <input
                            id="releaseYear"
                            type="number"
                            name="releaseYear"
                            value={formData.releaseYear}
                            onChange={handleChange}
                            required
                            min={1950}
                            max={new Date().getFullYear() + 2}
                        />
                        <small className="helper-text">1950 - {new Date().getFullYear() + 2}</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ageRating">
                            <FaStar className="label-icon" /> Age Rating
                        </label>
                        <select
                            id="ageRating"
                            name="ageRating"
                            value={formData.ageRating}
                            onChange={handleChange}
                            required
                        >
                            {ageRatings.map(rating => (
                                <option key={rating} value={rating}>{rating}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={loading} className="btn-submit">
                        <FaPlus />
                        {loading ? 'Adding Game...' : 'Add Game'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddGame;