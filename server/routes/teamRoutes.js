const express = require('express');
const {
  createTeam,
  getTeams,
  getTeam,
  getTeamSummaries
} = require('../controllers/teamController');
const { validateTeam } = require('../middleware/validation');

const router = express.Router();

router.route('/')
  .post(createTeam)
  .get(getTeams);

  router.route('/summary').get(getTeamSummaries);
router.route('/:id')
  .get(getTeam);


module.exports = router;