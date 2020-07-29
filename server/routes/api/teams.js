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
    const teamsDb = client.db('teams').collection('teams');
    const teams = await teamsDb.find({}).toArray()
    
    client.close();
    res.send(teams);
});

// Add Team
router.post('/', async (req, res) => {
    const client = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
    const teams = client.db('teams').collection('teams');
    const newTeam = req.body.team.team;
    const team = {
        forwards: {},
        defensemen: {},
        goalies: {}
    };

    Object.keys(newTeam).forEach(key => {
        Object.keys(newTeam[key]).forEach(posistion => {
            team[key][posistion] = {
                name: newTeam[key][posistion].name, 
                id: newTeam[key][posistion].id, 
                points: 0
            };
        });
    })

    await teams.insertOne({
        name: req.body.team.name,
        owner: req.body.team.owner,
        sid: req.body.team.sid,
        team,
        points: 0,
        createdAt: new Date()
    });

    client.close();

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
    Forwards: ${team.team.forwards.f1.name}, ${team.team.forwards.f2.name}, ${team.team.forwards.f3.name}, ${team.team.forwards.f4.name}, ${team.team.forwards.f5.name}, ${team.team.forwards.f6.name}, ${team.team.forwards.f7.name}, ${team.team.forwards.f8.name}
    Defensemen: ${team.team.defensemen.d1.name}, ${team.team.defensemen.d2.name}, ${team.team.defensemen.d3.name}, ${team.team.defensemen.d4.name}, ${team.team.defensemen.d5.name}
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
    const client = await mongodb.MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true });
    const teamsdb = client.db('teams').collection('teams');
    const teams = await teamsdb.find({}).toArray();
    const playersdb = client.db('players').collection('players');
    const players = await playersdb.find({}).toArray();

    await Promise.all(teams.map(async (team) => {
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

        players.map(player => {
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

        await teamsdb.replaceOne({_id: team._id}, newTeam);
    }));

    client.close();
}

module.exports = router;