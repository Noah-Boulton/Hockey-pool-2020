<template>
  <div class="container">
    <div class="create-team">
        <h1>Create Your Team!</h1>
        <form class="form form--team" v-on:submit.prevent="createTeam">
          <div class="form__grouping">
            <div class="form__group form__group--owner">
              <div class="form__item form__item--reqd">
                <label class="form__label" for="name-field">Team name</label>
                <input required id="name-field" type="text" name="Name" v-model="name">
              </div>
              <div class="form__item form__item--reqd">
                <label class="form__label" for="owner-field">Owner name</label>
                <input required id="owner-field" type="text" name="Owner" v-model="owner">
              </div>
              <div class="form__item form__item--reqd">
                <label for="email-field" class="form__label">Email</label>
                <input required type="email" id="email-field" name="Email" v-model="email">
              </div>
            </div>
            <div class="form__group form__group--sid">
              <v-select :options="options" label="title" v-model="sid">
                <template slot="option" slot-scope="option">
                    <img v-if="option.value != 'mo'" :src="getImgUrl(option.cardImage)" width=100 />
                    <img v-if="option.value === 'mo'" :src="getImgUrl(option.cardImage)" width=1 />
                </template>
              </v-select>
            </div>
          </div>
          <div class="rink">
            <div class="form__item form__item--player-group rink-line rink-line--goalies">
              <h3 class="form__label" for="goalies">Pick your goalies</h3>
              <div class="player-group player-group--2">
                <div class="form__item form__item--player-picker">
                  <div class="player-picker__item-wrapper">
                    <input type="text" class="player-picker" id="goalies" name="g1" form="g1"  v-model="g1query" placeholder="Search..."/>
                    <button v-if="g1query" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('g1query')"></button>
                  </div>
                  <div class="player-picker__list">
                    <div class="g1-input-list player-picker__list-item" v-for="player in goalies" :key="player.id">
                      <input v-model="g1" type="radio" :id="'g1-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != g2.id" v-show="player.g1visible" :data-player-name="player.name" :for="'g1-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                        <img :src="player.image" width=35 style='display: unset'>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <div class="player-picker__item-wrapper">
                    <input type="text" class="player-picker" id="goalies" name="g2" form="g2" v-model="g2query" placeholder="Search..."/>
                    <button v-if="g2query" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('g2query')"></button>
                  </div>
                  <div class="player-picker__list">
                    <div class="g2-input-list player-picker__list-item" v-for="player in goalies" :key="player.id">
                      <input v-model="g2" type="radio" :id="'g2-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != g1.id" v-show="player.g2visible" :data-player-name="player.name" :for="'g2-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                        <img :src="player.image" width=35 style='display: unset'>
                      </label>
                    </div>
                  </div>
                </div>
                <img src="../assets/images/faceoff--red.png" class="rink-line__faceoff rink-line__faceoff--left">
                <img src="../assets/images/faceoff--red.png" class="rink-line__faceoff rink-line__faceoff--right">
              </div>
            </div>
            <div class="form__item form__item--player-group rink-line rink-line--defensemen">
              <h3 class="form__label" for="defensemen">Pick your defensemen</h3>
              <div class="player-group player-group--3">
                <div class="form__item form__item--player-picker">
                  <div class="player-picker__item-wrapper">
                    <input type="text" class="player-picker" id="defensemen" name="d1" form="d1" v-model="d1query" placeholder="Search..."/>
                    <button v-if="d1query" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('d1query')"></button>
                  </div>
                  <div class="player-picker__list">
                    <div class="d1-input-list player-picker__list-item" v-for="player in defensemen" :key="player.id">
                      <input v-model="d1" type="radio" :id="'d1-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != d2.id && player.p_id != d3.id" v-show="player.d1visible" :data-player-name="player.name" :for="'d1-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                        <img :src="player.image" width=35 style='display: unset'>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <div class="player-picker__item-wrapper">
                    <input type="text" class="player-picker" id="defensemen" name="d2" form="d2" v-model="d2query" placeholder="Search..."/>
                    <button v-if="d2query" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('d2query')"></button>
                  </div>
                  <div class="player-picker__list">
                    <div class="d2-input-list player-picker__list-item" v-for="player in defensemen" :key="player.id">
                      <input v-model="d2" type="radio" :id="'d2-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != d1.id && player.p_id != d3.id" v-show="player.d2visible" :data-player-name="player.name" :for="'d2-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                        <img :src="player.image" width=35 style='display: unset'>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <div class="player-picker__item-wrapper">
                    <input type="text" class="player-picker" id="defensemen" name="d3" form="d3" v-model="d3query" placeholder="Search..."/>
                    <button v-if="d3query" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('d3query')"></button>
                  </div>
                  <div class="player-picker__list">
                    <div class="d3-input-list player-picker__list-item" v-for="player in defensemen" :key="player.id">
                      <input v-model="d3" type="radio" :id="'d3-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != d1.id && player.p_id != d2.id" v-show="player.d3visible" :data-player-name="player.name" :for="'d3-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                        <img :src="player.image" width=35 style='display: unset'>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form__item form__item--player-group rink-line rink-line--forwards">
              <h3 class="form__label" for="forwards">Pick your forwards</h3>
              <div class="player-group player-group--5">
                <div class="form__item form__item--player-picker">
                  <div class="player-picker__item-wrapper">
                    <input type="text" class="player-picker" id="forwards" name="f1" form="f1" v-model="f1query" placeholder="Search..."/>
                    <button v-if="f1query" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('f1query')"></button>
                  </div>
                  <div class="player-picker__list">
                    <div class="f1-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="f1" type="radio" :id="'f1-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != f2.id && player.p_id != f3.id && player.p_id != f4.id && player.p_id != f5.id" v-show="player.f1visible" :data-player-name="player.name" :for="'f1-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                        <img :src="player.image" width=35 style='display: unset'>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <div class="player-picker__item-wrapper">
                    <input type="text" class="player-picker" id="forwards" name="f2" form="f2" v-model="f2query" placeholder="Search..."/>
                    <button v-if="f2query" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('f2query')"></button>
                  </div>
                  <div class="player-picker__list">
                    <div class="f2-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="f2" type="radio" :id="'f2-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != f1.id && player.p_id != f3.id && player.p_id != f4.id && player.p_id != f5.id" v-show="player.f2visible" :data-player-name="player.name" :for="'f2-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                        <img :src="player.image" width=35 style='display: unset'>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <div class="player-picker__item-wrapper">
                    <input type="text" class="player-picker" id="forwards" name="f3" form="f3" v-model="f3query" placeholder="Search..."/>
                    <button v-if="f3query" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('f3query')"></button>
                  </div>
                  <div class="player-picker__list">
                    <div class="f3-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="f3" type="radio" :id="'f3-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != f1.id && player.p_id != f2.id && player.p_id != f4.id && player.p_id != f5.id" v-show="player.f3visible" :data-player-name="player.name" :for="'f3-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                        <img :src="player.image" width=35 style='display: unset'>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <div class="player-picker__item-wrapper">
                    <input type="text" class="player-picker" id="forwards" name="f4" form="f4" v-model="f4query" placeholder="Search..."/>
                    <button v-if="f4query" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('f4query')"></button>
                  </div>
                  <div class="player-picker__list">
                    <div class="f4-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="f4" type="radio" :id="'f4-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != f1.id && player.p_id != f2.id && player.p_id != f3.id && player.p_id != f5.id" v-show="player.f4visible" :data-player-name="player.name" :for="'f4-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                        <img :src="player.image" width=35 style='display: unset'>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <div class="player-picker__item-wrapper">
                    <input type="text" class="player-picker" id="forwards" name="f5" form="f5" v-model="f5query" placeholder="Search..."/>
                    <button v-if="f5query" class="player-picker__clear" aria-label="clear selection" v-on:click="clear('f5query')"></button>
                  </div>
                  <div class="player-picker__list">
                    <div class="f5-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="f5" type="radio" :id="'f5-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != f1.id && player.p_id != f2.id && player.p_id != f3.id && player.p_id != f4.id" v-show="player.f5visible" :data-player-name="player.name" :for="'f5-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                        <img :src="player.image" width=35 style='display: unset'>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="errors.length" class="card card--horizontal card--errors">
            <img src="../../public/images/error_mo.jpg" alt="Angry Commissioner Mo" class="card__image">
            <div class="card__content">
              <h4 v-if="errors.length == 1" class="card__title">Please correct the following error:</h4>
              <h4 v-if="errors.length > 1" class="card__title">Please correct the following errors:</h4>
              <ul>
                <li v-for="(error, index) in errors"
                v-bind:key="index">{{ error }}</li>
              </ul>
            </div>
          </div>
          <div class="form__team__points"><h2>Team Point Value: {{teamPoints}}</h2></div>
          <button class="button button--team-submit">Submit!</button>
        </form>
    </div>
  </div>
</template>

<script>
import TeamsService from '../TeamsService';
import PlayersService from '../PlayersService';

export default {
  name: 'TeamSubmissionComponent',
  data() {
    return {
      forwards: [],
      defensemen: [],
      goalies: [],
      errors: [],
      f1query: '',
      f2query: '',
      f3query: '',
      f4query: '',
      f5query: '',
      d1query: '',
      d2query: '',
      d3query: '',
      g1query: '',
      g2query: '',
      teamPoints: 0,
      name: '',
      owner: '',
      email: '',
      sid: '',
      f1: '',
      f2: '',
      f3: '',
      f4: '',
      f5: '',
      d1: '',
      d2: '',
      d3: '',
      g1: '',
      g2: '',
      options: [
        {
          title: "Kid",
          cardImage: "sid-the-kid.jpg",
          value: "kid"
        },
        {
          title: "Man",
          cardImage: "sid-the-man.jpeg",
          value: "man"
        },
        {
          title: "Beast",
          cardImage: "sid-the-beast.jpg",
          value: "beast"
        },
        {
          title: "ChazzWazza's",
          cardImage: "ChazzWazza.png",
          value: "chazz"
        },
        {
          title: "Canadian Finger bacon",
          cardImage: "canadian-finger-bacon.png",
          value: "cfb"
        },
        {
          title: "Puck Luck",
          cardImage: "puck-luck.png",
          value: "puck-luck"
        },
        {
          title: "Kevin Gravel Grinderz",
          cardImage: "kevin-gravel-grinderz.png",
          value: "kevin-gravel-grinderz"
        },
        {
          title: "Mo",
          cardImage: "mo_8.jpg",
          value: "mo"
        },
        {
          title: "Nuck",
          cardImage: "nuck.png",
          value: "nuck"
        },
        {
          title: "Will",
          cardImage: "will.jpg",
          value: "will"
        }
      ]
    }
  },
  async created() {
    try {
      const skaters = await PlayersService.getPlayersArrays();
      this.forwards = skaters[0];
      this.defensemen = skaters[1];
      this.goalies = skaters[2];
      this.forwards.forEach(player => {
        player.f1visible = true;
        player.f2visible = true;
        player.f3visible = true;
        player.f4visible = true;
        player.f5visible = true;
        player.image = this.getTeamLogo(player.team);
      });
      this.defensemen.forEach(player => {
        player.d1visible = true;
        player.d2visible = true;
        player.d3visible = true;
        player.image = this.getTeamLogo(player.team);
      });
      this.goalies.forEach(player => {
        player.g1visible = true;
        player.g2visible = true;
        player.image = this.getTeamLogo(player.team);
      });
    } catch(error) {
      this.error = error.message;
    }
  },
  methods: {
    getTeamLogo(teamName) {
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
      }
    },
    clear(key) {
      event.preventDefault();
      this[key] = '';
    },
    getImgUrl(pic) {
      return require('../../public/images/'+pic)
    },
    async createTeam() {
      this.errors = [];
      if(!this.name){
        this.errors.push('Please add a team name');
      }
      if(!this.owner){
        this.errors.push('Please add a team owner');
      }
      if(!this.email) {
        this.errors.push('Please enter your email');
      }
      if(!this.f1 || !this.f2 || !this.f3 || !this.f4 || !this.f5){
        this.errors.push('Please select 5 forwards');
      }
      if(!this.d1 || !this.d2 || !this.d3){
        this.errors.push('Please select 3 defensemen');
      }
      if(!this.g1 || !this.g2){
        this.errors.push('Please select 2 goalies');
      }
      if(!this.sid){
        this.errors.push('Please select a team logo');
      }
      if(this.teamPoints > 25){
        this.errors.push('Your team is over the allowed point total of 25');
      }
      if(this.errors.length){
        return;
      }
      await TeamsService.insertTeam(
        {
          name:this.name,
          owner:this.owner,
          email:this.email,
          sid:this.sid.value,
          team: {
                forwards:{
                  f1:this.f1,
                  f2:this.f2,
                  f3:this.f3,
                  f4:this.f4,
                  f5:this.f5
                },
                defensemen:{
                  d1:this.d1,
                  d2:this.d2,
                  d3:this.d3
                },
                goalies:{
                  g1:this.g1,
                  g2:this.g2
              }
          }
        }
      );
      this.$router.push('/team-submitted');
    },
    updateTeamPoints(){
      this.teamPoints = 0;
      if(!isNaN(this.f1.pv)){
        this.teamPoints += this.f1.pv;
      }
      if(!isNaN(this.f2.pv)){
        this.teamPoints += this.f2.pv;
      }
      if(!isNaN(this.f3.pv)){
        this.teamPoints += this.f3.pv;
      }
      if(!isNaN(this.f4.pv)){
        this.teamPoints += this.f4.pv;
      }
      if(!isNaN(this.f5.pv)){
        this.teamPoints += this.f5.pv;
      }
      if(!isNaN(this.d1.pv)){
        this.teamPoints += this.d1.pv;
      }
      if(!isNaN(this.d2.pv)){
        this.teamPoints += this.d2.pv;
      }
      if(!isNaN(this.d3.pv)){
        this.teamPoints += this.d3.pv;
      }
      if(!isNaN(this.g1.pv)){
        this.teamPoints += this.g1.pv;
      }
      if(!isNaN(this.g2.pv)){
        this.teamPoints += this.g2.pv;
      }
    }
  },
  watch:{
    f1query:function() {
      if(this.f1query.length < 3){
        this.forwards.map(player => player.f1visible = true);
        return;
      }
      this.forwards.forEach(player => {
        if(!player.name.toLowerCase().includes(this.f1query.toLowerCase())){
          player.f1visible = false;
        }
      });
    },
    f2query:function() {
      if(this.f2query.length < 3){
        this.forwards.map(player => player.f2visible = true);
        return;
      }
      this.forwards.forEach(player => {
        if(!player.name.toLowerCase().includes(this.f2query.toLowerCase())){
          player.f2visible = false;
        }
      });
    },
    f3query:function() {
      if(this.f3query.length < 3){
        this.forwards.map(player => player.f3visible = true);
        return;
      }
      this.forwards.forEach(player => {
        if(!player.name.toLowerCase().includes(this.f3query.toLowerCase())){
          player.f3visible = false;
        }
      });
    },
    f4query:function() {
      if(this.f4query.length < 3){
        this.forwards.map(player => player.f4visible = true);
        return;
      }
      this.forwards.forEach(player => {
        if(!player.name.toLowerCase().includes(this.f4query.toLowerCase())){
          player.f4visible = false;
        }
      });
    },
    f5query:function() {
      if(this.f5query.length < 3){
        this.forwards.map(player => player.f5visible = true);
        return;
      }
      this.forwards.forEach(player => {
        if(!player.name.toLowerCase().includes(this.f5query.toLowerCase())){
          player.f5visible = false;
        }
      });
    },
    d1query:function() {
      if(this.d1query.length < 3){
        this.defensemen.map(player => player.d1visible = true);
        return;
      }
      this.defensemen.forEach(player => {
        if(!player.name.toLowerCase().includes(this.d1query.toLowerCase())){
          player.d1visible = false;
        }
      });
    },
    d2query:function() {
      if(this.d2query.length < 3){
        this.defensemen.map(player => player.d2visible = true);
        return;
      }
      this.defensemen.forEach(player => {
        if(!player.name.toLowerCase().includes(this.d2query.toLowerCase())){
          player.d2visible = false;
        }
      });
    },
    d3query:function() {
      if(this.d3query.length < 3){
        this.defensemen.map(player => player.d3visible = true);
        return;
      }
      this.defensemen.forEach(player => {
        if(!player.name.toLowerCase().includes(this.d3query.toLowerCase())){
          player.d3visible = false;
        }
      });
    },
    g1query:function() {
      if(this.g1query.length < 3){
        this.goalies.map(player => player.g1visible = true);
        return;
      }
      this.goalies.forEach(player => {
        if(!player.name.toLowerCase().includes(this.g1query.toLowerCase())){
          player.g1visible = false;
        }
      });
    },
    g2query:function() {
      if(this.g2query.length < 3){
        this.goalies.map(player => player.g2visible = true);
        return;
      }
      this.goalies.forEach(player => {
        if(!player.name.toLowerCase().includes(this.g2query.toLowerCase())){
          player.g2visible = false;
        }
      });
    },
    f1:function() {
      this.f1query = this.f1.name;
      this.updateTeamPoints();
    },
    f2:function() {
      this.f2query = this.f2.name;
      this.updateTeamPoints();
    },
    f3:function() {
      this.f3query = this.f3.name;
      this.updateTeamPoints();
    },
    f4:function() {
      this.f4query = this.f4.name;
      this.updateTeamPoints();
    },
    f5:function() {
      this.f5query = this.f5.name;
      this.updateTeamPoints();
    },
    d1:function() {
      this.d1query = this.d1.name;
      this.updateTeamPoints();
    },
    d2:function() {
      this.d2query = this.d2.name;
      this.updateTeamPoints();
    },
    d3:function() {
      this.d3query = this.d3.name;
      this.updateTeamPoints();
    },
    g1:function() {
      this.g1query = this.g1.name;
      this.updateTeamPoints();
    },
    g2:function() {
      this.g2query = this.g2.name;
      this.updateTeamPoints();
    }
  }
};
</script>