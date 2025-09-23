const express = require("express");
const { createTeam } = require("../controllers/teamController");
const { validateTeam } = require("../middleware/validation");

const router = express.Router();

// The router now only defines one endpoint for creating a team.
// The GET routes have been removed as they no longer exist in the controller.
router.route("/").post(validateTeam, createTeam);

module.exports = router;
