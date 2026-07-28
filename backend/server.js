require("dotenv").config();

const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// Environment variables
const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
const APP_NAME = process.env.APP_NAME || "GameVault API";

// Read the SSL paths from environment variables
const sslKeyPath = process.env.SSL_KEY_PATH || "certificates/privatekey.pem";
const sslCertPath = process.env.SSL_CERT_PATH || "certificates/certificate.pem";

// Convert relative paths to absolute paths using __dirname
const resolvedKeyPath = path.resolve(__dirname, sslKeyPath);
const resolvedCertPath = path.resolve(__dirname, sslCertPath);

// Read the private key and certificate files
const httpsOptions = {
    key: fs.readFileSync(resolvedKeyPath),
    cert: fs.readFileSync(resolvedCertPath)
};

// In-memory games collection
let games = [
    {
        id: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Action-Adventure",
        platform: "Nintendo Switch",
        releaseYear: 2017,
        ageRating: "E10+",
        available: true
    },
    {
        id: 2,
        title: "God of War Ragnarök",
        genre: "Action",
        platform: "PlayStation 5",
        releaseYear: 2022,
        ageRating: "M",
        available: true
    },
    {
        id: 3,
        title: "Minecraft",
        genre: "Sandbox",
        platform: "PC",
        releaseYear: 2011,
        ageRating: "E10+",
        available: false
    }
];

// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        application: APP_NAME,
        message: "Welcome to the GameVault API"
    });
});

// About route
app.get("/about", (req, res) => {
    res.status(200).json({
        application: APP_NAME,
        description: "GameVault is a secure video game collection API.",
        purpose: "It allows users to manage and retrieve video game information.",
        stage: "Learning Unit 1 - Backend Foundations"
    });
});

// Health-check route
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        application: APP_NAME,
        protocol: "HTTPS",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });
});

// Get all games
app.get("/games", (req, res) => {
    res.status(200).json({
        count: games.length,
        data: games
    });
});

// Get a single game by ID
app.get("/games/:id", (req, res) => {
    const gameId = Number(req.params.id);

    if (!Number.isInteger(gameId)) {
        return res.status(400).json({
            error: "Game ID must be a whole number."
        });
    }

    const game = games.find((game) => game.id === gameId);

    if (!game) {
        return res.status(404).json({
            error: "Game not found."
        });
    }

    res.status(200).json({
        data: game
    });
});

// Add a new game
app.post("/games", (req, res) => {
    const {
        title,
        genre,
        platform,
        releaseYear,
        ageRating
    } = req.body;

    // Validation
    if (
        !title ||
        !genre ||
        !platform ||
        releaseYear === undefined ||
        !ageRating
    ) {
        return res.status(400).json({
            error: "Title, genre, platform, release year and age rating are required."
        });
    }

    if (
        typeof title !== "string" ||
        typeof genre !== "string" ||
        typeof platform !== "string" ||
        typeof ageRating !== "string"
    ) {
        return res.status(400).json({
            error: "Title, genre, platform and age rating must be text."
        });
    }

    // Clean and validate strings
    const cleanedTitle = title.trim();
    const cleanedGenre = genre.trim();
    const cleanedPlatform = platform.trim();
    const cleanedAgeRating = ageRating.trim().toUpperCase();

    if (cleanedTitle.length < 2 || cleanedTitle.length > 100) {
        return res.status(400).json({
            error: "Title must contain between 2 and 100 characters."
        });
    }

    if (cleanedGenre.length < 2 || cleanedGenre.length > 50) {
        return res.status(400).json({
            error: "Genre must contain between 2 and 50 characters."
        });
    }

    if (cleanedPlatform.length < 2 || cleanedPlatform.length > 50) {
        return res.status(400).json({
            error: "Platform must contain between 2 and 50 characters."
        });
    }

    const currentYear = new Date().getFullYear();

    if (
        typeof releaseYear !== "number" ||
        !Number.isInteger(releaseYear) ||
        releaseYear < 1950 ||
        releaseYear > currentYear + 2
    ) {
        return res.status(400).json({
            error: `Release year must be a whole number between 1950 and ${currentYear + 2}.`
        });
    }

    const allowedAgeRatings = ["E", "E10+", "T", "M", "18"];

    if (!allowedAgeRatings.includes(cleanedAgeRating)) {
        return res.status(400).json({
            error: `Age rating must be one of: ${allowedAgeRatings.join(", ")}.`
        });
    }

    // Create new game
    const nextId = games.length > 0 ? Math.max(...games.map(game => game.id)) + 1 : 1;

    const newGame = {
        id: nextId,
        title: cleanedTitle,
        genre: cleanedGenre,
        platform: cleanedPlatform,
        releaseYear,
        ageRating: cleanedAgeRating,
        available: true
    };

    games.push(newGame);

    res.status(201).json({
        message: "Game created successfully.",
        data: newGame
    });
});

// Invalid route handler (must be after all valid routes)
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found."
    });
});

// General error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: "Internal server error"
    });
});

// Create and start the HTTPS server
https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`${APP_NAME} is running securely on https://localhost:${HTTPS_PORT}`);
});