<template>
    <div>
        <h1>The Ho's</h1>
        <p class="error" v-if="error">{{ error }}</p>
        <div>
            <div >
                <table class="players-table" ref="table">
                  <thead>
                    <th class="sortable" v-bind:data-sort="nameSort">
                      <div @click="sort('name')">
                        Player
                      </div>
                      <div class="player-picker__item-wrapper">
                        <input type="text" class="player-picker" id="nameQuery"  v-model="nameQuery" placeholder="Search..."/>
                        <button v-if="nameQuery" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('nameQuery')"></button>
                      </div>
                    </th>
                    <th @click="sort('pos')" class="sortable" v-bind:data-sort="posSort">Position</th>
                    <th @click="sort('team')" class="sortable" v-bind:data-sort="teamSort">Team</th>
                    <th @click="sort('pv')" class="sortable" v-bind:data-sort="pvSort">Player Value</th>
                    <th @click="sort('goals')" class="sortable" v-bind:data-sort="goalsSort">Goals</th>
                    <th @click="sort('assists')" class="sortable" v-bind:data-sort="assistsSort">Assists</th>
                    <th @click="sort('fights')" class="sortable" v-bind:data-sort="fightsSort">Fights</th>
                    <th @click="sort('points')" class="sortable" v-bind:data-sort="pointsSort">Points</th>
                </thead>
                <tbody>
                <tr
                v-for="(player, index) in players"
                v-bind:item="player"
                v-bind:index="index"
                v-bind:key="player._id">
                    <td>{{player.name}}</td>
                    <td>{{player.pos}}</td>
                    <td>
                      {{player.team}}
                      <img :src="player.image" width=35 style='display: unset'>
                    </td>
                    <td>{{player.pv}}</td>
                    <td>{{player.goals}}</td>
                    <td>{{player.assists}}</td>
                    <td>{{player.fights}}</td>
                    <td>{{player.points}}</td>
                </tr>
                </tbody>
                </table>
            </div>
        </div>
        <div>
          <button v-if="pageNumber != 0" v-on:click="back" class="button button--players-back">Back</button>
        </div>
        <div>
          <button v-if="pageNumber != pages" v-on:click="next" class="button button--players-next">Next</button>
        </div>
    </div>
</template>

<script>
import PlayersService from '../PlayersService';

export default {
  name: 'PlayersComponent',
  data() {
    return {
      players: [],
      filteredList: [],
      fullList: [],
      pageNumber: 0,
      pages: 1,
      error: '',
      currentSort:'team',
      currentSortDir:'desc',
      nameSort: '',
      posSort: '',
      teamSort: '',
      pvSort: '',
      goalsSort: '',
      assistsSort: '',
      fightsSort: '',
      pointsSort: '',
      nameQuery: ''
    }
  },
  async created() {
    try {
      this.fullList = await PlayersService.getPlayers();
      this.fullList.forEach(player => {
        player.image = this.getTeamLogo(player.team);
      });
      this.pages = Math.floor(this.fullList.length / 25) -1;
      this.filteredList = this.fullList;
      this.players = this.filteredList.slice(0, 25);
    } catch(error) {
      this.error = error.message;
    }
  },
  methods:{
    clear(key) {
      event.preventDefault();
      this[key] = '';
    },
    getTeamLogo(teamName) {
      // TODO: Add all team logos
      switch(teamName) {
        case 'New York Islanders':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/2_dark.svg';
        case 'Philadelphia Flyers':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/4_dark.svg';
        case 'Boston Bruins':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/6_dark.svg';
        case 'Arizona Coyotes':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/53_dark.svg';
        case 'Calgary Flames':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/20_dark.svg';
        case 'Carolina Hurricanes':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/12_dark.svg';
        case 'Chicago Blackhawks':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/16_dark.svg';
        case 'Colorado Avalanche':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/21_dark.svg';
        case 'Columbus Blue Jackets':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/29_dark.svg';
        case 'Dallas Stars':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/25_dark.svg';
        case 'Montréal Canadiens':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/8_dark.svg';
        case 'St. Louis Blues':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/19_dark.svg';
        case 'Tampa Bay Lightning':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/14_dark.svg';
        case 'Vancouver Canucks':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/23_dark.svg';
        case 'Vegas Golden Knights':
          return 'https://www-league.nhlstatic.com/images/logos/teams-current-primary-dark/54.svg';
        case 'Washington Capitals':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/15_dark.svg';
        case 'Florida Panthers':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/13_dark.svg';
        case 'Toronto Maple Leafs':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/10_dark.svg';
        case 'Nashville Predators':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/18_dark.svg';
        case 'Edmonton Oilers':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/22_dark.svg';
        case 'Minnesota Wild':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/30_dark.svg';
        case 'Winnipeg Jets':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/52_dark.svg';
        case 'Pittsburgh Penguins':
          return 'https://www-league.nhlstatic.com/builds/site-core/01c1bfe15805d69e3ac31daa090865845c189b1d_1458063644/images/team/logo/current/5_dark.svg';
      }
    },
    sort:function(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      if(s == 'name'){
        this.nameSort = this.currentSortDir;
        this.posSort = '';
        this.teamSort = '';
        this.pvSort = '';
        this.goalsSort='';
        this.assistsSort='';
        this.fightsSort='';
        this.pointsSort = '';
      } else if(s == 'pos'){
        this.nameSort = '';
        this.posSort = this.currentSortDir;
        this.teamSort = '';
        this.pvSort = '';
        this.goalsSort='';
        this.assistsSort='';
        this.fightsSort='';
        this.pointsSort = '';
      }else if(s == 'team'){
        this.nameSort = '';
        this.posSort = '';
        this.teamSort = this.currentSortDir;
        this.pvSort = '';
        this.goalsSort='';
        this.assistsSort='';
        this.fightsSort='';
        this.pointsSort = '';
      }else if(s == 'pv'){
        this.nameSort = '';
        this.posSort = '';
        this.teamSort = '';
        this.pvSort = this.currentSortDir;
        this.goalsSort='';
        this.assistsSort='';
        this.fightsSort='';
        this.pointsSort = '';
      }else if(s == 'points'){
        this.nameSort = '';
        this.posSort = '';
        this.teamSort = '';
        this.pvSort = '';
        this.goalsSort='';
        this.assistsSort='';
        this.fightsSort='';
        this.pointsSort = this.currentSortDir;
      }
      else if(s == 'goals'){
        this.nameSort = '';
        this.posSort = '';
        this.teamSort = '';
        this.pvSort = '';
        this.goalsSort=this.currentSortDir;
        this.assistsSort='';
        this.fightsSort='';
        this.pointsSort = '';
      }
      else if(s == 'assists'){
        this.nameSort = '';
        this.posSort = '';
        this.teamSort = '';
        this.pvSort = '';
        this.goalsSort='';
        this.assistsSort=this.currentSortDir;
        this.fightsSort='';
        this.pointsSort = '';
      }
      else if(s == 'fights'){
        this.nameSort = '';
        this.posSort = '';
        this.teamSort = '';
        this.pvSort = '';
        this.goalsSort='';
        this.assistsSort='';
        this.fightsSort=this.currentSortDir;
        this.pointsSort = '';
      }
      this.currentSort = s;
    },
    back: function() {
      this.pageNumber--;
      this.players = this.filteredList.slice(this.pageNumber*25, this.pageNumber*25 + 25);
    },
    next: function() {
      this.pageNumber++;
      this.players = this.filteredList.slice(this.pageNumber*25, this.pageNumber*25 + 25);
    }
  },
  watch:{
    nameQuery:function() {
      if (this.nameQuery === '') {
        this.filteredList = this.fullList;
        this.pages = Math.floor(this.filteredList.length / 25) -1;
        this.pageNumber = 0;
        this.players = this.fullList.slice(this.pageNumber*25, this.pageNumber*25 + 25);
      } else {
        this.filteredList = this.filteredList.filter(player => {
          return player.name.toLowerCase().includes(this.nameQuery.toLowerCase());
        });
        this.pages = Math.floor(this.filteredList.length / 25) -1;
        this.pageNumber = 0;
        this.players = this.filteredList.slice(this.pageNumber*25, this.pageNumber*25 + 25);
      }
    },
    currentSort:function() {
      this.players = this.filteredList.sort((a,b) => {
        let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
      }).slice(this.pageNumber*25, this.pageNumber*25 + 25);
    },
    currentSortDir:function() {
      this.players = this.filteredList.sort((a,b) => {
        let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
      }).slice(this.pageNumber*25, this.pageNumber*25 + 25);
    }
  }
};
</script>
