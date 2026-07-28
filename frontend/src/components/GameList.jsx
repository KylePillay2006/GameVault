import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../api/gameApi';
import { 
    FaEye, 
    FaCheck, 
    FaTimes, 
    FaSearch,
    FaFilter,
    FaGamepad,
    FaSortAmountDown,
    FaSortAmountUp,
    FaPlusCircle
} from 'react-icons/fa';

function GameList() {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPlatform, setFilterPlatform] = useState('all');
    const [filterGenre, setFilterGenre] = useState('all');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        loadGames();
    }, []);

    useEffect(() => {
        let result = [...games];

        if (searchTerm) {
            result = result.filter(game => 
                game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.genre.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterPlatform !== 'all') {
            result = result.filter(game => game.platform === filterPlatform);
        }

        if (filterGenre !== 'all') {
            result = result.filter(game => game.genre === filterGenre);
        }

        result.sort((a, b) => {
            let valA = a[sortBy] || '';
            let valB = b[sortBy] || '';
            
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredGames(result);
    }, [games, searchTerm, filterPlatform, filterGenre, sortBy, sortOrder]);

    const loadGames = async () => {
        try {
            setLoading(true);
            const data = await getGames();
            setGames(data.data || []);
            setError(null);
        } catch (err) {
            setError('Failed to load games');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const platforms = ['all', ...new Set(games.map(g => g.platform))];
    const genres = ['all', ...new Set(games.map(g => g.genre))];

    if (loading) return (
        <div className="loading">
            <div className="spinner"></div>
            <p>Loading your games...</p>
        </div>
    );
    
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="game-list">
            <div className="game-list-header">
                <div className="header-left">
                    <FaGamepad className="header-icon" />
                    <h2>Game Collection</h2>
                </div>
                <Link to="/add" className="btn btn-primary btn-add">
                    <FaPlusCircle /> Add Game
                </Link>
            </div>

            <div className="game-stats">
                <span className="stat-item">
                    <strong>{filteredGames.length}</strong> games
                    {filteredGames.length !== games.length && ` (of ${games.length})`}
                </span>
            </div>

            <div className="game-controls">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search games by title or genre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <div className="filter-item">
                        <FaFilter className="filter-icon" />
                        <select 
                            value={filterPlatform} 
                            onChange={(e) => setFilterPlatform(e.target.value)}
                        >
                            {platforms.map(p => (
                                <option key={p} value={p}>
                                    {p === 'all' ? 'All Platforms' : p}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-item">
                        <select 
                            value={filterGenre} 
                            onChange={(e) => setFilterGenre(e.target.value)}
                        >
                            {genres.map(g => (
                                <option key={g} value={g}>
                                    {g === 'all' ? 'All Genres' : g}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-item sort-item">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="title">Sort by Title</option>
                            <option value="releaseYear">Sort by Year</option>
                            <option value="genre">Sort by Genre</option>
                            <option value="platform">Sort by Platform</option>
                        </select>
                        <button className="btn-sort" onClick={toggleSortOrder}>
                            {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                        </button>
                    </div>
                </div>
            </div>

            {filteredGames.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🎮</div>
                    <h3>No games found</h3>
                    <p>Try adjusting your filters or add a new game to your collection.</p>
                    <Link to="/add" className="btn btn-primary">Add Your First Game</Link>
                </div>
            ) : (
                <div className="games-grid">
                    {filteredGames.map((game, index) => (
                        <div className="game-card" key={game.id} style={{ animationDelay: `${index * 0.05}s` }}>
                            <div className="game-card-header">
                                <h3>{game.title}</h3>
                                <div className={`game-status ${game.available ? 'available' : 'unavailable'}`}>
                                    {game.available ? <FaCheck /> : <FaTimes />}
                                    {game.available ? 'Available' : 'Unavailable'}
                                </div>
                            </div>
                            <div className="game-meta">
                                <span className="game-tag purple">🎭 {game.genre}</span>
                                <span className="game-tag gold">📱 {game.platform}</span>
                                <span className="game-tag year">📅 {game.releaseYear}</span>
                                <span className="game-tag rating">⭐ {game.ageRating}</span>
                            </div>
                            <div className="card-actions">
                                <Link to={`/games/${game.id}`} className="btn btn-primary">
                                    <FaEye /> View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GameList;