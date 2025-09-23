const Team = require("../models/Team");
const { validationResult } = require("express-validator");
const { sendRegistrationEmail } = require("../services/emailService");

// Helper function to get the next unique team ID
// This is a simple approach. For high concurrency, consider a more robust transaction-based method.
async function getNextTeamId() {
  const lastTeam = await Team.findOne().sort({ createdAt: -1 });
  if (!lastTeam || !lastTeam.teamId) {
    return "SS-101"; // Starting number
  }
  const lastId = parseInt(lastTeam.teamId.split("-")[1]);
  return `SS-${lastId + 1}`;
}

// Create a new team
exports.createTeam = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { teamName, members } = req.body;

    // --- NEW: Validate Team Size ---
    if (!members || members.length < 2) {
      return res.status(400).json({
        success: false,
        error: "A team must have at least 2 members.",
      });
    }
    if (members.length > 4) {
      // Optional: You can set a maximum size
      return res.status(400).json({
        success: false,
        error: "A team cannot have more than 4 members.",
      });
    }

    // --- Leader and Duplicate Checks (no changes here) ---
    const leaders = members.filter((m) => m.isLeader);
    if (leaders.length !== 1) {
      return res
        .status(400)
        .json({
          success: false,
          error: "There must be exactly one team leader",
        });
    }
    const leader = leaders[0];

    // ... rest of the function remains the same ...
    if (!leader.email.endsWith("@vitapstudent.ac.in")) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Team leader email must end with @vitapstudent.ac.in",
        });
    }

    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return res
        .status(400)
        .json({ success: false, error: "Team name already exists" });
    }

    const leaderAlreadyRegistered = await Team.findOne({
      "members.email": leader.email,
    });
    if (leaderAlreadyRegistered) {
      return res.status(400).json({
        success: false,
        error: `Team leader with email ${leader.email} is already registered in team '${leaderAlreadyRegistered.teamName}'.`,
      });
    }

    const emails = members.map((m) => m.email);
    if (new Set(emails).size !== emails.length) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Duplicate email addresses found within the team",
        });
    }

    // ... and so on for the rest of the function ...

    const teamId = await getNextTeamId();
    const team = new Team({ teamName, teamId, members });
    const savedTeam = await team.save();

    try {
      await sendRegistrationEmail(leader.email, teamName, teamId);
    } catch (mailErr) {
      console.error(
        `Email sending failed for team ${teamName}:`,
        mailErr.message
      );
    }

    res.status(201).json({
      success: true,
      message:
        "Team registered successfully. The team leader has been sent a confirmation email.",
      redirectUrl: "/success",
      data: savedTeam,
    });
  } catch (error) {
    next(error);
  }
};

// Get all teams
exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single team by ID
exports.getTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        error: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

exports.getTeamSummaries = async (req, res, next) => {
  try {
    // Fetch all teams, but only the fields we absolutely need.
    const teams = await Team.find()
      .select("teamId teamName members")
      .sort({ createdAt: -1 });

    // Transform the full team data into a clean summary format.
    const teamSummaries = teams.map((team) => {
      // Find the leader within the members array for the current team.
      const leader = team.members.find((member) => member.isLeader);

      return {
        teamId: team.teamId,
        teamName: team.teamName,
        // Safely access the leader's email, providing a fallback if not found.
        leaderEmail: leader ? leader.email : "Not available",
      };
    });

    res.status(200).json({
      success: true,
      count: teamSummaries.length,
      data: teamSummaries,
    });
  } catch (error) {
    next(error);
  }
};
