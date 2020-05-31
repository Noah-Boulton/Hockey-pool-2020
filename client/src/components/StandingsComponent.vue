<template>
    <div class="Standings">
        <div class="content-wrapper">
          <div class="table-wrapper  span-width--66">
            <h1>Standings</h1>
            <table class="standings-table">
                <tr>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Points</th>
                </tr>
                <tbody 
                v-for="(team, index) in standings"
                v-bind:item="team"
                v-bind:index="index"
                v-bind:key="team._id">
                  <tr>
                    <td v-if="team.tied"><a href="https://getyarn.io/yarn-clip/ab19ac3c-6518-4da7-9043-6e0ce0038c5b#/SJZWeWPh5dH.copy" style="color:black; text-decoration:none">{{team.rank}}</a></td>
                    <td v-if="!team.tied">{{team.rank}}</td>
                    <td v-if="team.sid =='kid'"> <img src="../../public/images/sid-the-kid.jpg" alt="Sid the Kid" height=50 @click="showTeam(index)">{{team.name}}</td>
                    <td v-if="team.sid =='man'"> <img src="../../public/images/sid-the-man.jpeg" alt="Sid the Man" height=50 @click="showTeam(index)">  {{team.name}}</td>
                    <td v-if="team.sid =='beast'"> <img src="../../public/images/sid-the-beast.jpg" alt="Sid the Beast" height=50 @click="showTeam(index)">  {{team.name}}</td>
                    <td v-if="team.sid =='mo'"> <img src="../../public/images/mo_8.jpg" alt="Commissioner Mo" height=50 @click="showTeam(index)">  {{team.name}}</td>
                    <td v-if="team.sid =='cfb'"> <img src="../../public/images/canadian-finger-bacon.png" alt="Canadian Finger Bacon" height=50 @click="showTeam(index)">  {{team.name}}</td>
                    <td v-if="team.sid =='chazz'"> <img src="../../public/images/ChazzWazza.png" alt="ChazzWazza's" height=50 @click="showTeam(index)">  {{team.name}}</td>
                    <td v-if="team.sid =='puck-luck'"> <img src="../../public/images/puck-luck.png" alt="Puck Luck" height=50 @click="showTeam(index)">  {{team.name}}</td>
                    <td v-if="team.sid =='kevin-gravel-grinderz'"> <img src="../../public/images/kevin-gravel-grinderz.png" alt="Kevin Gravel Grinderz" height=50 @click="showTeam(index)">  {{team.name}}</td>
                    <td v-if="team.sid =='nuck'"> <img src="../../public/images/nuck.png" alt="Nuck" height=50 @click="showTeam(index)">  {{team.name}}</td>
                    <td v-if="team.sid =='will'"> <img src="../../public/images/will.jpg" alt="Will" height=50 @click="showTeam(index)">  {{team.name}}</td>
                    <td v-if="team.points == 69"><a href="https://youtu.be/f6JKM2Na0vg?t=49" style="color:black; text-decoration:none">{{team.points}}</a></td>
                    <td v-if="team.points != 69">{{team.points}}</td>
                  </tr>
                  <template v-if="show == index"> 
                    <tr>                      
                      <th>Position</th>
                      <th>Player</th>
                      <th>Points</th>
                    </tr>
                    <tr v-for="player in Object.keys(team.team.forwards)" :key="player">
                      <td>F</td>
                      <td>{{team.team.forwards[player].name}}</td>
                      <td>{{team.team.forwards[player].points}}</td>
                    </tr>
                    <tr v-for="player in Object.keys(team.team.defensemen)" :key="player">
                      <td>D</td>
                      <td>{{team.team.defensemen[player].name}}</td>
                      <td>{{team.team.defensemen[player].points}}</td>
                    </tr>
                    <tr v-for="player in Object.keys(team.team.goalies)" :key="player">
                      <td>G</td>
                      <td>{{team.team.goalies[player].name}}</td>
                      <td>{{team.team.goalies[player].points}}</td>
                    </tr>
                  </template>
                </tbody>
            </table>
          </div>
            <div class="twitter span-width--33">
              <h2>The Penalty Box</h2>
              <component-view id="moromiles" class="twitter__timeline" sourceType="profile" :options="{ tweetLimit: '5'}"></component-view>
            </div>
        </div>
    </div>
</template>

<script>
import TeamsService from '../TeamsService';

export default {
  components: {
    'component-view': Timeline
  },
  name: 'TeamsComponent',
  data() {
    return {
      standings: [],
      error: '',
      show: -1
    }
  },
  async created() {
    try {
      this.standings = await TeamsService.getStandings();
      var i = 1;
      var prev = null;
      this.standings.forEach(team => {
        if(prev === null){
          team.rank = i;
          team.tied = false;
        } else if(team.points === prev.points){
          team.rank = prev.rank;
          prev.tied = true;
          team.tied = true;
        } else{
          team.rank = i;
          team.tied = false;
        }
        i++;
        prev = team;
        team.show = false;
      });
    } catch(error) {
      this.error = error.message;
    }
  },
  methods:{
    showTeam(index){
      if(this.show == index){
        this.show = -1;
      } else {
        this.show = index;
      }
    }
  },
  watch:{
    show:function(){
      
    }
  },
};

import { Timeline } from 'vue-tweet-embed';
</script>