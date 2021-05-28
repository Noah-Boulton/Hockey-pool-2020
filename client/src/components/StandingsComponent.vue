<template>
    <div class="Standings">
        <div class="content-wrapper">
          <div class="table-wrapper  span-width--66">
            <h1>Standings</h1>
            <table class="standings-table">
                <thead>
                    <th>Position</th>
                    <th>Team</th>
                    <th></th>
                    <th>Points</th>
                </thead>
                <tbody
                v-for="(team, index) in standings"
                v-bind:item="team"
                v-bind:index="index"
                v-bind:key="team._id">
                  <tr>
                    <td v-if="team.tied"><a href="https://getyarn.io/yarn-clip/ab19ac3c-6518-4da7-9043-6e0ce0038c5b#/SJZWeWPh5dH.copy" style="color:black; text-decoration:none">{{team.rank}}</a></td>
                    <td v-if="!team.tied">{{team.rank}}</td>
                    <td class="team__td" v-if="team.sid =='kid'">
                      <span class="player-img-wrapper">
                        <img src="../../public/images/sid-the-kid.jpg" alt="Sid the Kid" height=50 class="team__img" @click="showTeam(index)">
                        <img v-if="Object.keys(team.team.forwards).filter(player => !team.team.forwards[player].eliminated).length === 0 && Object.keys(team.team.defensemen).filter(player => !team.team.defensemen[player].eliminated).length === 0 && Object.keys(team.team.goalies).filter(player => !team.team.goalies[player].eliminated).length === 0" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed" @click="showTeam(index)">
                      </span>
                      <h3 class="team__name">{{team.name}}</h3>
                    </td>
                    <td class="team__td" v-if="team.sid =='man'">
                      <span class="player-img-wrapper">
                        <img src="../../public/images/sid-the-man.jpeg" alt="Sid the Man" height=50 class="team__img" @click="showTeam(index)">
                        <img v-if="Object.keys(team.team.forwards).filter(player => !team.team.forwards[player].eliminated).length === 0 && Object.keys(team.team.defensemen).filter(player => !team.team.defensemen[player].eliminated).length === 0 && Object.keys(team.team.goalies).filter(player => !team.team.goalies[player].eliminated).length === 0" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed" @click="showTeam(index)">
                      </span>
                      <h3 class="team__name">{{team.name}}</h3>
                    </td>
                    <td class="team__td" v-if="team.sid =='beast'">
                      <span class="player-img-wrapper">
                        <img src="../../public/images/sid-the-beast.jpg" alt="Sid the Beast" height=50 class="team__img" @click="showTeam(index)">
                        <img v-if="Object.keys(team.team.forwards).filter(player => !team.team.forwards[player].eliminated).length === 0 && Object.keys(team.team.defensemen).filter(player => !team.team.defensemen[player].eliminated).length === 0 && Object.keys(team.team.goalies).filter(player => !team.team.goalies[player].eliminated).length === 0" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed" @click="showTeam(index)">
                      </span>
                      <h3 class="team__name">{{team.name}}</h3>
                    </td>
                    <td class="team__td" v-if="team.sid =='mo'">
                      <span class="player-img-wrapper">
                        <img src="../../public/images/mo_8.jpg" alt="Commissioner Mo" height=50 class="team__img" @click="showTeam(index)">
                        <img v-if="Object.keys(team.team.forwards).filter(player => !team.team.forwards[player].eliminated).length === 0 && Object.keys(team.team.defensemen).filter(player => !team.team.defensemen[player].eliminated).length === 0 && Object.keys(team.team.goalies).filter(player => !team.team.goalies[player].eliminated).length === 0" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed" @click="showTeam(index)">
                      </span>
                      <h3 class="team__name">{{team.name}}</h3>
                    </td>
                    <td class="team__td" v-if="team.sid =='cfb'">
                      <span class="player-img-wrapper">
                        <img src="../../public/images/canadian-finger-bacon.png" alt="Canadian Finger Bacon" height=50 class="team__img" @click="showTeam(index)">
                        <img v-if="Object.keys(team.team.forwards).filter(player => !team.team.forwards[player].eliminated).length === 0 && Object.keys(team.team.defensemen).filter(player => !team.team.defensemen[player].eliminated).length === 0 && Object.keys(team.team.goalies).filter(player => !team.team.goalies[player].eliminated).length === 0" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed" @click="showTeam(index)">
                      </span>
                      <h3 class="team__name">{{team.name}}</h3>
                    </td>
                    <td class="team__td" v-if="team.sid =='chazz'">
                      <span class="player-img-wrapper">
                        <img src="../../public/images/ChazzWazza.png" alt="ChazzWazza's" height=50 class="team__img" @click="showTeam(index)">
                        <img v-if="Object.keys(team.team.forwards).filter(player => !team.team.forwards[player].eliminated).length === 0 && Object.keys(team.team.defensemen).filter(player => !team.team.defensemen[player].eliminated).length === 0 && Object.keys(team.team.goalies).filter(player => !team.team.goalies[player].eliminated).length === 0" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed" @click="showTeam(index)">
                      </span>
                      <h3 class="team__name">{{team.name}}</h3>
                    </td>
                    <td class="team__td" v-if="team.sid =='puck-luck'">
                      <span class="player-img-wrapper">
                        <img src="../../public/images/puck-luck.png" alt="Puck Luck" height=50 class="team__img" @click="showTeam(index)">
                        <img v-if="Object.keys(team.team.forwards).filter(player => !team.team.forwards[player].eliminated).length === 0 && Object.keys(team.team.defensemen).filter(player => !team.team.defensemen[player].eliminated).length === 0 && Object.keys(team.team.goalies).filter(player => !team.team.goalies[player].eliminated).length === 0" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed" @click="showTeam(index)">
                      </span>
                      <h3 class="team__name">{{team.name}}</h3>
                    </td>
                    <td class="team__td" v-if="team.sid =='kevin-gravel-grinderz'">
                      <span class="player-img-wrapper">
                        <img src="../../public/images/kevin-gravel-grinderz.png" alt="Kevin Gravel Grinderz" height=50 class="team__img" @click="showTeam(index)">
                        <img v-if="Object.keys(team.team.forwards).filter(player => !team.team.forwards[player].eliminated).length === 0 && Object.keys(team.team.defensemen).filter(player => !team.team.defensemen[player].eliminated).length === 0 && Object.keys(team.team.goalies).filter(player => !team.team.goalies[player].eliminated).length === 0" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed" @click="showTeam(index)">
                      </span>
                      <h3 class="team__name">{{team.name}}</h3>
                    </td>
                    <td class="team__td" v-if="team.sid =='nuck'">
                      <span class="player-img-wrapper">
                        <img src="../../public/images/nuck.png" alt="Nuck" height=50 class="team__img" @click="showTeam(index)">
                        <img v-if="Object.keys(team.team.forwards).filter(player => !team.team.forwards[player].eliminated).length === 0 && Object.keys(team.team.defensemen).filter(player => !team.team.defensemen[player].eliminated).length === 0 && Object.keys(team.team.goalies).filter(player => !team.team.goalies[player].eliminated).length === 0" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed" @click="showTeam(index)">
                      </span>
                      <h3 class="team__name">{{team.name}}</h3>
                    </td>
                    <td class="team__td" v-if="team.sid =='will'">
                      <span class="player-img-wrapper">
                        <img src="../../public/images/will.jpg" alt="Will" height=50 class="team__img" @click="showTeam(index)">
                        <img v-if="Object.keys(team.team.forwards).filter(player => !team.team.forwards[player].eliminated).length === 0 && Object.keys(team.team.defensemen).filter(player => !team.team.defensemen[player].eliminated).length === 0 && Object.keys(team.team.goalies).filter(player => !team.team.goalies[player].eliminated).length === 0" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed" @click="showTeam(index)">
                      </span>
                      <h3 class="team__name">{{team.name}}</h3>
                    </td>
                    <td></td>
                    <td v-if="team.points == 69"><a href="https://youtu.be/f6JKM2Na0vg?t=49" style="color:black; text-decoration:none">{{team.points}}</a></td>
                    <td v-if="team.points != 69">{{team.points}}</td>
                  </tr>
                  <thead v-if="show == index">
                    <th>Position</th>
                    <th>Player</th>
                    <th></th>
                    <th>Points</th>
                  </thead>
                  <tr v-if="show == index">
                    <td>F</td>
                    <td>{{team.team.forwards.f1.name}}</td>
                    <td>
                      <span class="player-img-wrapper">
                        <img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.forwards.f1.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                        <img v-if="team.team.forwards.f1.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                      </span>
                    </td>
                    <td>{{team.team.forwards.f1.points}}</td>
                  </tr>
                  <tr v-if="show == index">
                    <td>F</td>
                    <td>{{team.team.forwards.f2.name}}</td>
                    <td>
                      <span class="player-img-wrapper">
                        <img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.forwards.f2.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                        <img v-if="team.team.forwards.f2.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                      </span>
                    </td>
                    <td>{{team.team.forwards.f2.points}}</td>
                  </tr>
                  <tr v-if="show == index">
                    <td>F</td>
                    <td>{{team.team.forwards.f3.name}}</td>
                    <td>
                      <span class="player-img-wrapper">
                        <img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.forwards.f3.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                        <img v-if="team.team.forwards.f3.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                      </span>
                    </td>
                    <td>{{team.team.forwards.f3.points}}</td>
                  </tr>
                  <tr v-if="show == index">
                    <td>F</td>
                    <td>{{team.team.forwards.f4.name}}</td>
                    <td>
                      <span class="player-img-wrapper">
                        <img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.forwards.f4.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                        <img v-if="team.team.forwards.f4.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                      </span>
                    </td>
                    <td>{{team.team.forwards.f4.points}}</td>
                  </tr>
                  <tr v-if="show == index">
                    <td>F</td>
                    <td>{{team.team.forwards.f5.name}}</td>
                    <td>
                      <span class="player-img-wrapper">
                        <img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.forwards.f5.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                        <img v-if="team.team.forwards.f5.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                      </span>
                    </td>
                    <td>{{team.team.forwards.f5.points}}</td>
                  </tr>
                  <tr v-if="show == index">
                    <td>D</td>
                    <td>{{team.team.defensemen.d1.name}}</td>
                    <td>
                      <span class="player-img-wrapper">
                        <img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.defensemen.d1.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                        <img v-if="team.team.defensemen.d1.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                      </span>
                    </td>
                    <td>{{team.team.defensemen.d1.points}}</td>
                  </tr>
                  <tr v-if="show == index">
                    <td>D</td>
                    <td>{{team.team.defensemen.d2.name}}</td>
                    <td>
                      <span class="player-img-wrapper">
                        <img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.defensemen.d2.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                        <img v-if="team.team.defensemen.d2.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                      </span>
                    </td>
                    <td>{{team.team.defensemen.d2.points}}</td>
                  </tr>
                  <tr v-if="show == index">
                    <td>D</td>
                    <td>{{team.team.defensemen.d3.name}}</td>
                    <td>
                      <span class="player-img-wrapper">
                        <img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.defensemen.d3.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                        <img v-if="team.team.defensemen.d3.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                      </span>
                    </td>
                    <td>{{team.team.defensemen.d3.points}}</td>
                  </tr>
                  <tr v-if="show == index">
                    <td>G</td>
                    <td>{{team.team.goalies.g1.name}}</td>
                    <td>
                      <span class="player-img-wrapper">
                        <img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.goalies.g1.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                        <img v-if="team.team.goalies.g1.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                      </span>
                    </td>
                    <td>{{team.team.goalies.g1.points}}</td>
                  </tr>
                  <tr v-if="show == index">
                    <td>G</td>
                    <td>{{team.team.goalies.g2.name}}</td>
                    <td>
                      <span class="player-img-wrapper">
                        <img :src="`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${team.team.goalies.g2.id}.jpg`" @error="replaceWithMo" width=55 height=55 class="player-img">
                        <img v-if="team.team.goalies.g2.eliminated" src='../../public/images/hosed_stamp.png' width=55 height=55 class="hosed">
                      </span>
                    </td>
                    <td>{{team.team.goalies.g2.points}}</td>
                  </tr>
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