const express = require('express');
const axios = require('axios');

const router = express.Router();

// Get Skaters
router.get('/', async (req, res) => {
    const skaters = await getSkaters();

    res.json(skaters);
});

async function getSkaters() {
    const teamIds = [];
    try {
        let teams = await axios.get('https://statsapi.web.nhl.com/api/v1/teams');

        teams = teams.data.teams;
        teams.forEach(team => teamIds.push(team.id));
        const playerIds = []

        for (const teamId of teamIds) {
            if (teamId === 55) continue; //Kraken have no roster

            let roster = await axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/roster`);

            roster = roster.data.roster;
            roster.forEach(player => playerIds.push(player.person.id));
        }

        let skaters = []

        for (const playerId of playerIds) {
            let skater = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`);

            skater = skater.data;

            let pos = 'F';
            const pv = 1;
            const number = skater.people[0].primaryNumber;
            const points = 0;
            const goals = 0;
            const assists = 0;
            const games = 0;
            const fights = 0;

            if(skater.people[0].primaryPosition.type === 'Defenseman') {
                pos = 'D';
            }
            if(skater.people[0].primaryPosition.type === 'Goalie') {
                pos = 'G'
            }

            skaters.push({
                name: skater.people[0].fullName.toString(),
                p_id: playerId,
                pos,
                team: skater.people[0].currentTeam.name.toString(),
                games,
                goals,
                assists,
                pv,
                points,
                fights,
            });
        }

        skaters.sort((a,b) => (a.team > b.team) ? 1 : ((b.pos > a.pos) ? -1 : 0))

        return skaters;
    } catch(error) {
        console.error(error);
    }
}

module.exports = router;