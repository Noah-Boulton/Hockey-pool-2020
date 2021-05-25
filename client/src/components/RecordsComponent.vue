<template>
  <div class="container">
    <div class="Records">
      <h1>Mo’s Hockey Ho’s All Time Records</h1>
      <hr>
      <p><strong>Most Points:</strong> Commissioner Mo (Commissioner Mo's Young Guns) – 130 points (2020)</p>
      <p><strong>Fewest Points:</strong> Noah (Tod and the boys) – 13 points (2021)</p>
      <p><strong>Most Zeroed Out Players:</strong> Mark (Mark the Shark) – 6 players (2020)</p>
      <p><strong>Most Points after Round 1:</strong> Noah (The Kevin Gravel Grinders) – 52 points (2018)</p>
      <p><strong>Most Players in a Stanley Cup Final:</strong>  Ian (A Hope and a Dream) - 5 players (2018)</p>
  </div>
  <hr>
   <h1>Mo’s Top Ho by Year</h1>
    <div>
      <div
        v-for="(team, index) in winners"
        v-bind:item="team"
        v-bind:index="index"
        v-bind:key="team._id">
        <div class="card card--horizontal card--team">
          <img :src="require('../../public/images/top-ho-'+team.year+'.jpg')" class="card__image" width=150 :alt="`${team.year} Winner`">
          <div class="card__content">
            <h2 class="card__title">{{ `${team.name}` }} {{team.year}}</h2>
            <h3 class="card__subtitle">{{ `${team.owner}` }}</h3>
            <h3 class="card__subtitle">{{ `Points: ${team.points}` }}</h3>
          </div>
        </div>

        <table class="team-table">
          <tbody>
            <tr>
              <th>Position</th>
              <th>Player</th>
              <th></th>
              <th>Points</th>
            </tr>
            <tr>
              <td>F</td>
              <td>{{team.team.forwards.f1.name}}</td>
              <td><img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.forwards.f1.id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
              <td>{{team.team.forwards.f1.points}}</td>
            </tr>
            <tr>
              <td>F</td>
              <td>{{team.team.forwards.f2.name}}</td>
              <td><img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.forwards.f2.id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
              <td>{{team.team.forwards.f2.points}}</td>
            </tr>
            <tr>
              <td>F</td>
              <td>{{team.team.forwards.f3.name}}</td>
              <td><img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.forwards.f3.id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
              <td>{{team.team.forwards.f3.points}}</td>
            </tr>
            <tr>
              <td>F</td>
              <td>{{team.team.forwards.f4.name}}</td>
              <td><img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.forwards.f4.id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
              <td>{{team.team.forwards.f4.points}}</td>
            </tr>
            <tr>
              <td>F</td>
              <td>{{team.team.forwards.f5.name}}</td>
              <td><img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.forwards.f5.id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
              <td>{{team.team.forwards.f5.points}}</td>
            </tr>
            <tr>
              <td>D</td>
              <td>{{team.team.defensemen.d1.name}}</td>
              <td><img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.defensemen.d1.id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
              <td>{{team.team.defensemen.d1.points}}</td>
            </tr>
            <tr>
              <td>D</td>
              <td>{{team.team.defensemen.d2.name}}</td>
              <td><img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.defensemen.d2.id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
              <td>{{team.team.defensemen.d2.points}}</td>
            </tr>
            <tr>
              <td>D</td>
              <td>{{team.team.defensemen.d3.name}}</td>
              <td><img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.defensemen.d3.id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
              <td>{{team.team.defensemen.d3.points}}</td>
            </tr>
            <tr>
              <td>G</td>
              <td>{{team.team.goalies.g1.name}}</td>
              <td><img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.goalies.g1.id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
              <td>{{team.team.goalies.g1.points}}</td>
            </tr>
            <tr>
              <td>G</td>
              <td>{{team.team.goalies.g2.name}}</td>
              <td><img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.goalies.g2.id}.jpg`" @error="replaceWithMo" width=55 height=55></td>
              <td>{{team.team.goalies.g2.points}}</td>
            </tr>
          </tbody>
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
