require("dotenv").config();

const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;
const APP_NAME = process.env.APP_NAME || "GameVault API";

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
    message: `Welcome to ${APP_NAME}!`
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
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// Get all games
app.get("/games", (req, res) => {
  res.status(200).json({
    count: games.length,
    games: games
  });
});

// Get a single game by ID
app.get("/games/:id", (req, res) => {
  const gameId = Number(req.params.id);

  const game = games.find((game) => game.id === gameId);

  if (!game) {
    return res.status(404).json({
      message: "Game not found"
    });
  }

  res.status(200).json(game);
});

// Add a new game
app.post("/games", (req, res) => {
  const {
    title,
    genre,
    platform,
    releaseYear,
    ageRating,
    available
  } = req.body;

  // Validation
  if (
    !title ||
    !genre ||
    !platform ||
    !releaseYear ||
    !ageRating ||
    available === undefined
  ) {
    return res.status(400).json({
      message: "All game fields are required"
    });
  }

  if (
    typeof title !== "string" ||
    typeof genre !== "string" ||
    typeof platform !== "string" ||
    typeof ageRating !== "string"
  ) {
    return res.status(400).json({
      message: "Text fields must contain valid text values"
    });
  }

  if (typeof releaseYear !== "number") {
    return res.status(400).json({
      message: "Release year must be a number"
    });
  }

  if (typeof available !== "boolean") {
    return res.status(400).json({
      message: "Availability must be true or false"
    });
  }

  // Create new game
  const newGame = {
    id: games.length + 1,
    title,
    genre,
    platform,
    releaseYear,
    ageRating,
    available
  };

  games.push(newGame);

  res.status(201).json({
    message: "Game added successfully",
    game: newGame
  });
});

// Invalid route handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error"
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on port ${PORT}`);
});