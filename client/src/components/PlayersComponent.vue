<template>
    <div>
        <h1>The Ho's</h1>
        <p class="error" v-if="error">{{ error }}</p>
        <div>
            <div >
                <table class="players-table" ref="table">
                  <thead>
                    <tr>
                      <th v-for="(column, index) in columns" :key='index'
                      @click="sort(column.key)" class="sortable">{{column.header}}</th>
                    </tr>
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
      columns: {
        name:{
          header: 'Player',
          sort: '',
          key: 'name'
        },
        pos:{
          header: 'Position',
          sort: '',
          key: 'pos'
        },
        team:{
          header: 'Team',
          sort: this.currentSortDir,
          key: 'team'
        },
        pv:{
          header: 'Point Value',
          sort: '',
          key: 'pv'
        },
        goals:{
          header: 'Goals',
          sort: '',
          key: 'goals'
        },
        assists:{
          header: 'Assists',
          sort: '',
          key: 'assists'
        },
        fights:{
          header: 'Fights',
          sort: '',
          key: 'fights'
        },
        points:{
          header: 'Points',
          sort: '',
          key: 'points'
        }
      }
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
    sort:function(sort) {
      if(sort === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.columns[sort].sort = this.currentSortDir;
      this.columns[this.currentSort].sort = '';
      this.currentSort = sort;
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
