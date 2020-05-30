<template>
  <div class="container">
    <div class="Records">
      <h1>Mo’s Hockey Ho’s All Time Records</h1>
      <hr>
      <p><strong>Most Points:</strong> Noah (The Kevin Gravel Grinders) – 129 points (2018)</p>
      <p><strong>Fewest Points:</strong> Luke (Moves Like Jagr) – 19 points (2019)</p>
      <p><strong>Most Zeroed Out Players:</strong> Esrah (Mo’s Top Ho’s) – 4 players (2019)</p>
      <p><strong>Most Points after Round 1:</strong> Noah (The Kevin Gravel Grinders) – 52 points (2018)</p>
      <p><strong>Most Players in a Stanley Cup Final:</strong>  Ian (A Hope and a Dream) - 5 players (2018)</p>
  </div>
  <hr>
   <h1>Mo’s Top Ho by Year</h1>
    <div>
      <div 
        v-for="team in winners"
        :item="team"
        :key="team._id">
        <div class="card card--horizontal card--team">
          <img :src="require('../../public/images/top-ho-'+team.year+'.jpg')" class="card__image" width=150 :alt="`${team.year} Winner`">
          <div class="card__content">
            <h2 class="card__title">{{ `${team.name}` }} {{team.year}}</h2>
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
import WinnersService from '../WinnersService';
import moImage from '../../public/images/mo_4.jpg';

export default {
  name: 'TopHosComponent',
  data() {
    return {
      winners: []
    }
  },
  async created() {
    try {
      this.winners = await WinnersService.getWinners();
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
