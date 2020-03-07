const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
dotenv.config();

// Setup email transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

const router = express.Router();

cron.schedule('15 * * * *', () => {
    console.log("Updating teams");
    updateTeams();
});

// Get Teams
router.get('/', async (req, res) => {
    const client = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
    const teams = client.db('teams').collection('teams');
    res.send(await teams.find({}).toArray());
});

// Add Team
router.post('/', async (req, res) => {
    const client = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
    const teams = client.db('teams').collection('teams');
    const f1 = req.body.team.team.forwards.f1;
    const f2 = req.body.team.team.forwards.f2;
    const f3 = req.body.team.team.forwards.f3;
    const f4 = req.body.team.team.forwards.f4;
    const f5 = req.body.team.team.forwards.f5;
    const d1 = req.body.team.team.defensemen.d1;
    const d2 = req.body.team.team.defensemen.d2;
    const d3 = req.body.team.team.defensemen.d3;
    const g1 = req.body.team.team.goalies.g1;
    const g2 = req.body.team.team.goalies.g2;
    await teams.insertOne({
        name: req.body.team.name,
        owner: req.body.team.owner,
        sid: req.body.team.sid,
        team: {
            "forwards":{
                "f1":{"name" : f1.name, "id" : f1.id, "points": 0},
                "f2":{"name" : f2.name, "id" : f2.id, "points": 0},
                "f3":{"name" : f3.name, "id" : f3.id, "points": 0},
                "f4":{"name" : f4.name, "id" : f4.id, "points": 0},
                "f5":{"name" : f5.name, "id" : f5.id, "points": 0}
            },
            "defensemen":{
                "d1":{"name" : d1.name, "id" : d1.id, "points": 0},
                "d2":{"name" : d2.name, "id" : d2.id, "points": 0},
                "d3":{"name" : d3.name, "id" : d3.id, "points": 0}
            },
            "goalies":{
                "g1":{"name" : g1.name, "id" : g1.id, "points": 0},
                "g2":{"name" : g2.name, "id" : g2.id, "points": 0}
            }
        },
        points: 0,
        createdAt: new Date()
    });
    updateTeams();
    sendMail(req.body.team.name, req.body.team.email, req.body.team.owner);
    notifyMo(req.body.team);
    res.status(201).send();
});

function sendMail(name, email, person) {
    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `${name} submitted to Mo's Hockey Ho's 2019-2020!`,
        text: `Dear ${person},
        
Thank you for your submission!
Your team ${name} has officially been submitted!
Teams and Standings will be updated once playoffs start.
May the Top Ho Win.
        
Sincerely,
    Commissioner Mo`
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function notifyMo(team) {
    let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Attention Commissioner Mo: ${team.name} just registered for Mo's Hockey Ho's 2019-2020!`,
        text: `
    Owner: ${team.owner}
    Team Name: ${team.name} 
    Forwards: ${team.team.forwards.f1.name}, ${team.team.forwards.f2.name}, ${team.team.forwards.f3.name}, ${team.team.forwards.f4.name}, ${team.team.forwards.f5.name}
    Defensemen: ${team.team.defensemen.d1.name}, ${team.team.defensemen.d2.name}, ${team.team.defensemen.d3.name}
    Goalies: ${team.team.goalies.g1.name}, ${team.team.goalies.g2.name}

Sincerely,
    Commissioner Mo`
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function updateTeams() {
    const teamsClient = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
    const teamsdb = teamsClient.db('teams').collection('teams');
    const teams = await teamsdb.find({}).toArray();
    const playersClient = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
    const playersdb = playersClient.db('players').collection('players');
    const players = await playersdb.find({}).toArray();
    teams.forEach(async (team) => {
        const newTeam = {
            name: team.name,
            owner: team.owner,
            sid: team.sid,
            team: team.team,
            points: team.points,
            tie_breaker: team.tie_breaker
            };
        let newPoints = 0;
        let newTieBreaker = 0;
        players.forEach(async (player) => {
            switch(player.p_id){
                case Number(team.team.forwards.f1.id) :
                    newTeam.team.forwards.f1.points = player.points;
                    newPoints += player.points;
                    newTieBreaker += player.fights
                    break;
                case Number(team.team.forwards.f2.id) :
                    newTeam.team.forwards.f2.points = player.points;
                    newPoints += player.points;
                    newTieBreaker += player.fights
                    break;
                case Number(team.team.forwards.f3.id) :
                    newTeam.team.forwards.f3.points = player.points;
                    newPoints += player.points;
                    newTieBreaker += player.fights
                    break;
                case Number(team.team.forwards.f4.id) :
                    newTeam.team.forwards.f4.points = player.points;
                    newPoints += player.points;
                    newTieBreaker += player.fights
                    break;
                case Number(team.team.forwards.f5.id) :
                    newTeam.team.forwards.f5.points = player.points;
                    newPoints += player.points;
                    newTieBreaker += player.fights
                    break;
                case Number(team.team.defensemen.d1.id) :
                    newTeam.team.defensemen.d1.points = player.points;
                    newPoints += player.points;
                    newTieBreaker += player.fights
                    break;
                case Number(team.team.defensemen.d2.id) :
                    newTeam.team.defensemen.d2.points = player.points;
                    newPoints += player.points;
                    newTieBreaker += player.fights
                    break;
                case Number(team.team.defensemen.d3.id) :
                    newTeam.team.defensemen.d3.points = player.points;
                    newPoints += player.points;
                    newTieBreaker += player.fights
                    break;
                case Number(team.team.goalies.g1.id) :
                    newTeam.team.goalies.g1.points = player.points;
                    newPoints += player.points;
                    newTieBreaker += player.fights
                    break;
                case Number(team.team.goalies.g2.id) :
                    newTeam.team.goalies.g2.points = player.points;
                    newPoints += player.points;
                    newTieBreaker += player.fights
                    break;
                default:
                    break;
            }
        });
        newTeam.points = newPoints;
        newTeam.tie_breaker = newTieBreaker;
        await teamsdb.replaceOne({_id: team._id}, newTeam, (err, res) => {
            if (err) throw err;
        });
        playersClient.close();
        teamsClient.close();
    });
}

module.exports = router;