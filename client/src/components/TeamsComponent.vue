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
              <td>
                <span class="player-img-wrapper">
                  <img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.forwards.f1.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                  <img v-if="team.team.forwards.f1.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                </span>
              </td>
              <td>{{team.team.forwards.f1.points}}</td>
            </tr>
            <tr>
              <td>F</td>
              <td>{{team.team.forwards.f2.name}}</td>
              <td>
                <span class="player-img-wrapper">
                  <img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.forwards.f2.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                  <img v-if="team.team.forwards.f2.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                </span>
              </td>
              <td>{{team.team.forwards.f2.points}}</td>
            </tr>
            <tr>
              <td>F</td>
              <td>{{team.team.forwards.f3.name}}</td>
              <td>
                <span class="player-img-wrapper">
                  <img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.forwards.f3.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                  <img v-if="team.team.forwards.f3.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                </span>
              </td>
              <td>{{team.team.forwards.f3.points}}</td>
            </tr>
            <tr>
              <td>F</td>
              <td>{{team.team.forwards.f4.name}}</td>
              <td>
                <span class="player-img-wrapper">
                  <img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.forwards.f4.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                  <img v-if="team.team.forwards.f4.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                </span>
              </td>
              <td>{{team.team.forwards.f4.points}}</td>
            </tr>
            <tr>
              <td>F</td>
              <td>{{team.team.forwards.f5.name}}</td>
              <td>
                <span class="player-img-wrapper">
                  <img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.forwards.f5.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                  <img v-if="team.team.forwards.f5.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                </span>
              </td>
              <td>{{team.team.forwards.f5.points}}</td>
            </tr>
            <tr>
              <td>D</td>
              <td>{{team.team.defensemen.d1.name}}</td>
              <td>
                <span class="player-img-wrapper">
                  <img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.defensemen.d1.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                  <img v-if="team.team.defensemen.d1.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                </span>
              </td>
              <td>{{team.team.defensemen.d1.points}}</td>
            </tr>
            <tr>
              <td>D</td>
              <td>{{team.team.defensemen.d2.name}}</td>
              <td>
                <span class="player-img-wrapper">
                  <img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.defensemen.d2.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                  <img v-if="team.team.defensemen.d2.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                </span>
              </td>
              <td>{{team.team.defensemen.d2.points}}</td>
            </tr>
            <tr>
              <td>D</td>
              <td>{{team.team.defensemen.d3.name}}</td>
              <td>
                <span class="player-img-wrapper">
                  <img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.defensemen.d3.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                  <img v-if="team.team.defensemen.d3.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                </span>
              </td>
              <td>{{team.team.defensemen.d3.points}}</td>
            </tr>
            <tr>
              <td>G</td>
              <td>{{team.team.goalies.g1.name}}</td>
              <td>
                <span class="player-img-wrapper">
                  <img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.goalies.g1.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                  <img v-if="team.team.goalies.g1.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                </span>
              </td>
              <td>{{team.team.goalies.g1.points}}</td>
            </tr>
            <tr>
              <td>G</td>
              <td>{{team.team.goalies.g2.name}}</td>
              <td>
                <span class="player-img-wrapper">
                  <img :src="`https://nhl.bamcontent.com/images/headshots/current/168x168/${team.team.goalies.g2.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                  <img v-if="team.team.goalies.g2.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                </span>
              </td>
              <td>{{team.team.goalies.g2.points}}</td>
            </tr>
          </tbody>
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