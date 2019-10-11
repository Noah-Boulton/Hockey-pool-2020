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
                <tr
                v-for="(team, index) in standings"
                v-bind:item="team"
                v-bind:index="index"
                v-bind:key="team._id">
                    <td v-if="team.tied"><a href="https://getyarn.io/yarn-clip/ab19ac3c-6518-4da7-9043-6e0ce0038c5b#/SJZWeWPh5dH.copy" style="color:black; text-decoration:none">{{team.rank}}</a></td>
                    <td v-if="!team.tied">{{team.rank}}</td>
                    <td v-if="team.sid =='kid'"> <img src="../../public/images/sid-the-kid.jpg" alt="Sid the Kid" height=50>  {{team.name}}</td>
                    <td v-if="team.sid =='man'"> <img src="../../public/images/sid-the-man.jpeg" alt="Sid the Man" height=50>  {{team.name}}</td>
                    <td v-if="team.sid =='beast'"> <img src="../../public/images/sid-the-beast.jpg" alt="Sid the Beast" height=50>  {{team.name}}</td>
                    <td v-if="team.sid =='mo'"> <img src="../../public/images/mo_8.jpg" alt="Commissioner Mo" height=50>  {{team.name}}</td>
                    <td v-if="team.points == 69"><a href="https://youtu.be/f6JKM2Na0vg?t=49" style="color:black; text-decoration:none">{{team.points}}</a></td>
                    <td v-if="team.points != 69">{{team.points}}</td>
                </tr>
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
      error: ''
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
      });
    } catch(error) {
      this.error = error.message;
    }
  },
};

import { Timeline } from 'vue-tweet-embed';
</script>