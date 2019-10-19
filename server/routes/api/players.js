const axios = require('axios');
const dotenv = require('dotenv');
const cron = require('node-cron');
dotenv.config();

const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

cron.schedule('0 * * * *', () => {
    console.log("Updating players");
    updatePlayers();
});

// Get Players
router.get('/', async (req, res) => {
    const players = await loadPlayersCollection();
    res.send(await players.find({}).toArray());
});

// Add Players
router.post('/', async (req, res) => {
    const players = await loadPlayersCollection();
    await players.insertOne({
        name: req.body.name,
        p_id: req.body.p_id,
        pos: req.body.pos,
        team: req.body.team,
        points: 0
    });
    res.status(201).send();
});

async function loadPlayersCollection() {
    const client = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
    return client.db('players').collection('players');
}

async function updatePlayers() {
    try {
        const playersdb = await loadPlayersCollection();
        const players = await playersdb.find({}).toArray();
    } catch(e){
        console.error(e);
    }
    players.forEach(async (player) => {
        const query = {p_id : player.p_id};
        const url = `https://statsapi.web.nhl.com/api/v1/people/${player.p_id}/stats?stats=statsSingleSeason`
        try{
            const res = await axios.get(url);
        } catch(e){
            console.error(e);
        }
        if(!res.err && res.data.stats[0].splits && res.data.stats[0].splits[0] && res.data.stats[0].splits[0].stat){
                
            const data = res.data.stats[0].splits[0].stat;
            var points = 0;
            var pv = 1;
            if(data.wins){
                // Goalie
                points = 2*data.wins;
                if(data.shutouts){
                    points += data.shutouts;
                }
                pv = Math.round(((2*data.shutouts + data.wins)/(data.games+1))*1.8)
            } else {
                // Skater
                points = data.goals + data.assists;
                pv = Math.round(((2*data.goals + data.assists)/(data.games+1))*1.5)
            }
            if(isNaN(points)){
                points = 0;
            }
            if(pv < 1){
                pv = 1;
            }
            if(pv > 4){
                pv = 4;
            }
            if(points != player.points){
                var newValues = { $set: {points: points, pv: pv} };
                await playersdb.updateOne(query, newValues, (err, res) => {
                    if (err) throw err;
                });
            }
        }
    });
}

module.exports = router;
