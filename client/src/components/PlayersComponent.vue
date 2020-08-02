<template>
    <div>
        <h1>The Ho's</h1>
        <p class="error" v-if="error">{{ error }}</p>
        <div>
            <div >
                <table class="players-table" ref="table">
                  <thead>
                    <th @click="sort('name')" class="sortable" v-bind:data-sort="nameSort">Player</th>
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
                    <td>{{player.team}}</td>
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
      pointsSort: ''
    }
  },
  async created() {
    try {
      this.fullList = await PlayersService.getPlayers();
      // this.players = this.players.slice(0,25);
      this.pages = Math.floor(this.fullList.length / 25);
      this.players = this.fullList.slice(0, 25);
    } catch(error) {
      this.error = error.message;
    }
  },
  methods:{
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
      this.players = this.fullList.slice(this.pageNumber*25, this.pageNumber*25 + 25);
    },
    next: function() {
      this.pageNumber++;
      this.players = this.fullList.slice(this.pageNumber*25, this.pageNumber*25 + 25);
      // this.$refs.table.refresh();
    }
  },
  watch:{
    currentSort:function() {
      this.players = this.fullList.sort((a,b) => {
        let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
      }).slice(this.pageNumber*25, this.pageNumber*25 + 25);
    },
    currentSortDir:function() {
      this.players = this.fullList.sort((a,b) => {
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
