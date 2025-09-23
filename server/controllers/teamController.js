const Team = require("../models/Team");
const { validationResult } = require("express-validator");
const { sendRegistrationEmail } = require("../services/emailService");

/**
 * Generates the next sequential team ID based on the last entry.
 * Starts with SS-101.
 */
async function getNextTeamId() {
  const lastTeam = await Team.findOne().sort({ createdAt: -1 });
  if (!lastTeam || !lastTeam.teamId) {
    return "SS-101"; // Starting ID
  }
  const lastIdNumber = parseInt(lastTeam.teamId.split("-")[1]);
  return `SS-${lastIdNumber + 1}`;
}

/**
 * Creates a new team after extensive validation.
 */
exports.createTeam = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { teamName, members } = req.body;

    // 1. Validate Team Size: Must be 1 or 2 members.
    if (!members || ![1, 2].includes(members.length)) {
      return res.status(400).json({
        success: false,
        error: "A team must have either 1 or 2 members.",
      });
    }

    // 2. Validate Team Name Uniqueness
    const existingTeamName = await Team.findOne({ teamName });
    if (existingTeamName) {
      return res
        .status(400)
        .json({ success: false, error: "This team name is already taken." });
    }

    // 3. Validate for exactly one leader (required for emails etc.)
    const leaders = members.filter((m) => m.isLeader);
    if (leaders.length !== 1) {
      return res.status(400).json({
        success: false,
        error:
          "Internal error: A team must have exactly one designated leader.",
      });
    }
    const leader = leaders[0];

    // 4. Batch Validation for all members
    const emails = members.map((m) => m.email);
    const mobiles = members.map((m) => m.mobile);
    const regNos = members.map((m) => m.regNo);

    // 4a. Check for duplicates within the submitted form data
    if (
      new Set(emails).size !== emails.length ||
      new Set(mobiles).size !== mobiles.length ||
      new Set(regNos).size !== regNos.length
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Duplicate email, mobile, or registration number found within your team.",
      });
    }

    // 4b. Validate format for each member
    for (const member of members) {
      if (!member.email.endsWith("@vitapstudent.ac.in")) {
        return res.status(400).json({
          success: false,
          error: `Invalid email: ${member.email}. All emails must end with @vitapstudent.ac.in`,
        });
      }
      if (!/^\d{10}$/.test(member.mobile)) {
        return res.status(400).json({
          success: false,
          error: `Invalid mobile number: ${member.mobile}. It must be exactly 10 digits.`,
        });
      }
    }

    // 5. Check for uniqueness across the entire database
    const existingMember = await Team.findOne({
      $or: [
        { "members.email": { $in: emails } },
        { "members.mobile": { $in: mobiles } },
        { "members.regNo": { $in: regNos } },
      ],
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        error: `One or more of your members are already registered in another team ('${existingMember.teamName}'). Please ensure email, mobile, and registration numbers are unique.`,
      });
    }

    // All validations passed, proceed to create the team
    const teamId = await getNextTeamId();
    const team = new Team({ teamName, teamId, members });
    const savedTeam = await team.save();

    // Send confirmation email to the leader
    // try {
    //   await sendRegistrationEmail(leader.email, teamName, teamId);
    // } catch (mailErr) {
    //   console.error(
    //     `CRITICAL: Email sending failed for team ${teamName} (${teamId}) but registration was successful. Error:`,
    //     mailErr.message
    //   );
    // }

    // Send success response
    res.status(201).json({
      success: true,
      message:
        "Team registered successfully! The team leader has been sent a confirmation email.",
      redirectUrl: "/success",
      data: savedTeam,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};
