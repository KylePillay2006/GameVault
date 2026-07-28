const games = require("../data/games");

const getAllGames = (req, res) => {
    return res.status(200).json({
        count: games.length,
        data: games
    });
};

const getGameById = (req, res) => {
    const gameId = Number(req.params.id);

    if (!Number.isInteger(gameId)) {
        return res.status(400).json({
            error: "Game ID must be a whole number."
        });
    }

    const game = games.find(currentGame => currentGame.id === gameId);

    if (!game) {
        return res.status(404).json({
            error: "Game not found."
        });
    }

    return res.status(200).json({
        data: game
    });
};

const createGame = (req, res) => {
    const { title, genre, platform, releaseYear, ageRating } = req.validatedGame;

    const nextId = games.length > 0 ? Math.max(...games.map(game => game.id)) + 1 : 1;

    const newGame = {
        id: nextId,
        title,
        genre,
        platform,
        releaseYear,
        ageRating,
        available: true
    };

    games.push(newGame);

    return res.status(201).json({
        message: "Game created successfully.",
        data: newGame
    });
};

module.exports = { getAllGames, getGameById, createGame };