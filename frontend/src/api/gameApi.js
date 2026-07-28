import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:4000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get all games
export const getGames = async () => {
    try {
        const response = await api.get('/games');
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};

// Get a single game by ID
export const getGameById = async (id) => {
    try {
        const response = await api.get(`/games/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching game:', error);
        throw error;
    }
};

// Create a new game
export const createGame = async (gameData) => {
    try {
        const response = await api.post('/games', gameData);
        return response.data;
    } catch (error) {
        console.error('Error creating game:', error);
        throw error;
    }
};

// Health check
export const checkHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        console.error('Health check failed:', error);
        throw error;
    }
};