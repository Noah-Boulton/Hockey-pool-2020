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

cron.schedule('45 * * * *', () => {
    console.log("Updating goalies");
    updateGoaliePoints();
});

// Get Players
router.get('/', async (req, res) => {
    const client = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
    const players = client.db('players').collection('players');
    res.send(await players.find({}).toArray());
    client.close();
});

// Add Players
router.post('/', async (req, res) => {
    const client = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
    const players = client.db('players').collection('players');
    await players.insertOne({
        name: req.body.name,
        p_id: req.body.p_id,
        pos: req.body.pos,
        team: req.body.team,
        points: 0,
        goals: 0,
        assists: 0,
        pv: 1
    });
    client.close();
    res.status(201).send();
});

async function updatePlayers() {
    try {
        const client = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
        const playersdb = client.db('players').collection('players');
        const players = await playersdb.find({}).toArray();
        players.forEach(async (player) => {
            const query = {p_id : player.p_id};
            if(player.p_id == 1){
                return;
            }
            const url = `https://statsapi.web.nhl.com/api/v1/people/${player.p_id}/stats?stats=statsSingleSeason`;
            const res = await axios.get(url).catch((err) => console.error(err));
            if(!res.err && res.data.stats[0].splits && res.data.stats[0].splits[0] && res.data.stats[0].splits[0].stat){
                    
                const data = res.data.stats[0].splits[0].stat;
                var points = 0;
                var goals = 0;
                var assists = 0;
                var pv = 1;
                var games = data.games;
                if(player.pos == "G"){
                    // Goalie
                    points = 2*data.wins;
                    if(data.shutouts){
                        points += data.shutouts;
                    }
                    //Use the values we already have for goalies because we have to 
                    // track goalie goals and assists seperately
                    goals = player.goals;
                    assists = player.assists;
                    points = points + goals + assists;
                    pv = Math.round(((2*data.shutouts + data.wins)/(data.games+1))*2.3);
                } else {
                    // Skater
                    goals = data.goals;
                    assists = data.assists;
                    points = goals + assists;
                    pv = Math.round(((2*goals + assists)/(data.games+1))*1.9);
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
                if(points != player.points || pv != player.pv){
                    var newValues = { $set: {points: points, goals: goals, assists: assists, pv: pv, games: games} };
                    await playersdb.updateOne(query, newValues, (err, res) => {
                        if (err) throw err;
                    });
                }
            }
        });
        client.close();
    }catch(e){
        console.error(e);
    }
}

async function updateGoaliePoints(){
    try {
        const client = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
        const playersdb = client.db('players').collection('players');
        const players = await playersdb.find({}).toArray();
        players.forEach(async (player) => {
            if(player.pos != "G"){
                return;
            }
            const query = {p_id : player.p_id};

            const url = 'https://statsapi.web.nhl.com/api/v1/schedule';
            const res = await axios.get(url).catch((err) => console.error(err));
            const games = res.data.dates[0].games;
            //Get all the game links for the current day
            var goals = player.goals;
            var assists = player.assists;
            games.forEach(async game => {
                //Use each games scoring plays to check for goalie points 
                const gameURL = `https://statsapi.web.nhl.com${game.link}`;
                const gameres = await axios.get(gameURL).catch((err) => console.error(err));
                if(res.err){
                    return;
                }
                if(!gameres || !gameres.data){
                    return;
                }
                const gameData = gameres.data;
                const scoringPlays = gameData.liveData.plays.scoringPlays;
                scoringPlays.forEach(play => {
                    const data = gameData.liveData.plays.allPlays[play];
                    data.players.forEach(skater => {
                        if(skater.player.id == player.p_id){
                            if(skater.playerType == "Scorer"){
                                goals++;
                            } else if(skater.playerType == "Assist") {
                                assists++;
                            }
                        }
                    })
                });
            });
            if(goals > player.goals && assists > player.assists){
                var newValues = { $set: {goals: goals, assists: assists} };
                await playersdb.updateOne(query, newValues, (err, res) => {
                    if (err) throw err;
                });
            } else if(goals > player.goals){
                var newValues = { $set: {goals: goals} };
                await playersdb.updateOne(query, newValues, (err, res) => {
                    if (err) throw err;
                });
            } else if (assists > player.assists){
                var newValues = { $set: {assists: assists} };
                await playersdb.updateOne(query, newValues, (err, res) => {
                    if (err) throw err;
                });
            }
        });
        client.close();
    }catch(e){
        console.error(e);
    }
}

module.exports = router;