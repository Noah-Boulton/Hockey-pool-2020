<template>
   <div class="container">
   <h1>Teams</h1>
    <div>
      <div 
        v-for="(team, index) in teams"
        v-bind:item="team"
        v-bind:index="index"
        v-bind:key="team._id">
        <div class="card card--horizontal card--team">
          <img v-if="team.sid == 'kid'" src="../../public/images/sid-the-kid.jpg" class="card__image" style="border-radius: 50%" width=150 alt="Sid the Kid">
          <img v-if="team.sid == 'man'" src="../../public/images/sid-the-man.jpeg" class="card__image" style="border-radius: 50%" width=150 alt="Sid the Man">
          <img v-if="team.sid == 'beast'" src="../../public/images/sid-the-beast.jpg" class="card__image" style="border-radius: 50%" width=150 alt="Sid the Beast">
          <img v-if="team.sid == 'mo'" src="../../public/images/mo_8.jpg" class="card__image" width=150 style="border-radius: 50%" alt="Commissioner Mo"> 
          <img v-if="team.sid == 'cfb'" src="../../public/images/canadian-finger-bacon.png" class="card__image" width=150 style="border-radius: 50%" alt="Canadian Finger Bacon">
          <img v-if="team.sid == 'chazz'" src="../../public/images/ChazzWazza.png" class="card__image" width=150 style="border-radius: 50%" alt="ChazzWazza's"> 
          <img v-if="team.sid == 'puck-luck'" src="../../public/images/puck-luck.png" class="card__image" width=150 style="border-radius: 50%" alt="Puck Luck">
          <img v-if="team.sid == 'kevin-gravel-grinderz'" src="../../public/images/kevin-gravel-grinderz.png" class="card__image" width=150 style="border-radius: 50%" alt="Kevin Gravel Grinderz">
          <img v-if="team.sid == 'nuck'" src="../../public/images/nuck.png" class="card__image" width=150 style="border-radius: 50%" alt="Nuck">
          <img v-if="team.sid == 'will'" src="../../public/images/will.jpg" class="card__image" width=150 style="border-radius: 50%" alt="Will">
          <div class="card__content">
            <h2 class="card__title">{{ `${team.name}` }}</h2>
            <h3 class="card__subtitle">{{ `${team.owner}` }}</h3>
            <h3 class="card__subtitle">{{ `Points: ${team.points}` }}</h3>
          </div>
        </div>
        
        <table class="team-table">
          <tr>
            <th>Position</th>
            <th>Player</th>
            <th></th>
            <th>Points</th>
          </tr>
          <tr v-for="player in Object.keys(team.team.forwards)" :key="player">
            <td>F</td>
            <td>{{team.team.forwards[player].name}}</td>
            <td><img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.forwards[player].id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
            <td>{{team.team.forwards[player].points}}</td>
          </tr>
          <tr v-for="player in Object.keys(team.team.defensemen)" :key="player">
            <td>D</td>
            <td>{{team.team.defensemen[player].name}}</td>
            <td><img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.defensemen[player].id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
            <td>{{team.team.defensemen[player].points}}</td>
          </tr>
          <tr v-for="player in Object.keys(team.team.goalies)" :key="player">
            <td>G</td>
            <td>{{team.team.goalies[player].name}}</td>
            <td><img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.goalies[player].id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
            <td>{{team.team.goalies[player].points}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import TeamsService from '../TeamsService';
import moImage from '../../public/images/mo_4.jpg';

export default {
  name: 'TeamSubmissionComponent',
  data() {
    return {
      teams: []
    }
  },
  async created() {
    try {
      this.teams = await TeamsService.getTeams();
    } catch(error) {
      this.error = error.message;
    }
  },
  methods:{
    replaceWithMo(e){
      e.target.src= moImage;
    }
  }
};
</script>