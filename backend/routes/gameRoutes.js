const express = require("express");
const { getAllGames, getGameById, createGame } = require("../controllers/gameController");
const validateGame = require("../middleware/validateGame");

const router = express.Router();

router.get("/", getAllGames);
router.get("/:id", getGameById);
router.post("/", validateGame, createGame);

module.exports = router;