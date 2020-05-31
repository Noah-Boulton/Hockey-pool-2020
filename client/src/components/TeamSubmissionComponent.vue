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
                  <input type="text" class="player-picker" id="g1" name="g1" form="g1"  v-model="team.goalies.g1.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="g1-input-list player-picker__list-item" v-for="player in goalies" :key="player.id">
                      <input v-model="team.goalies.g1.skater" type="radio" :id="'g1-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.goalies.g2.skater.id" v-show="player.g1visible" :data-player-name="player.name" :for="'g1-radio-' + player.p_id">{{player.name}} {{player.pv}}</label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="g2" name="g2" form="g2" v-model="team.goalies.g2.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="g2-input-list player-picker__list-item" v-for="player in goalies" :key="player.id">
                      <input v-model="team.goalies.g2.skater" type="radio" :id="'g2-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.goalies.g1.skater.id" v-show="player.g2visible" :data-player-name="player.name" :for="'g2-radio-' + player.p_id">{{player.name}} {{player.pv}}</label>
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
                  <input type="text" class="player-picker" id="d1" name="d1" form="d1" v-model="team.defensemen.d1.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="d1-input-list player-picker__list-item" v-for="player in defensemen" :key="player.id">
                      <input v-model="team.defensemen.d1.skater" type="radio" :id="'d1-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.defensemen.d2.skater.id && player.p_id != team.defensemen.d3.skater.id && player.p_id != team.defensemen.d4.skater.id && player.p_id != team.defensemen.d5.skater.id" 
                      v-show="player.d1visible" :data-player-name="player.name" :for="'d1-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="d2" name="d2" form="d2" v-model="team.defensemen.d2.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="d2-input-list player-picker__list-item" v-for="player in defensemen" :key="player.id">
                      <input v-model="team.defensemen.d2.skater" type="radio" :id="'d2-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.defensemen.d1.skater.id && player.p_id != team.defensemen.d3.skater.id && player.p_id != team.defensemen.d4.skater.id && player.p_id != team.defensemen.d5.skater.id" 
                      v-show="player.d2visible" :data-player-name="player.name" :for="'d2-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="d3" name="d3" form="d3" v-model="team.defensemen.d3.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="d3-input-list player-picker__list-item" v-for="player in defensemen" :key="player.id">
                      <input v-model="team.defensemen.d3.skater" type="radio" :id="'d3-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.defensemen.d1.skater.id && player.p_id != team.defensemen.d2.skater.id && player.p_id != team.defensemen.d4.skater.id && player.p_id != team.defensemen.d5.skater.id"
                      v-show="player.d3visible" :data-player-name="player.name" :for="'d3-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="d4" name="d4" form="d4" v-model="team.defensemen.d4.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="d4-input-list player-picker__list-item" v-for="player in defensemen" :key="player.id">
                      <input v-model="team.defensemen.d4.skater" type="radio" :id="'d4-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.defensemen.d1.skater.id && player.p_id != team.defensemen.d2.skater.id && player.p_id != team.defensemen.d3.skater.id && player.p_id != team.defensemen.d5.skater.id"
                      v-show="player.d4visible" :data-player-name="player.name" :for="'d4-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="d5" name="d5" form="d5" v-model="team.defensemen.d5.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="d5-input-list player-picker__list-item" v-for="player in defensemen" :key="player.id">
                      <input v-model="team.defensemen.d5.skater" type="radio" :id="'d5-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.defensemen.d1.skater.id && player.p_id != team.defensemen.d2.skater.id && player.p_id != team.defensemen.d3.skater.id && player.p_id != team.defensemen.d4.skater.id"
                      v-show="player.d5visible" :data-player-name="player.name" :for="'d5-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
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
                  <input type="text" class="player-picker" id="f1" name="f1" form="f1" v-model="team.forwards.f1.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="f1-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="team.forwards.f1.skater" type="radio" :id="'f1-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.forwards.f2.skater.id && player.p_id != team.forwards.f3.skater.id && player.p_id != team.forwards.f4.skater.id && player.p_id != team.forwards.f5.skater.id && player.p_id != team.forwards.f6.skater.id && player.p_id != team.forwards.f7.skater.id && player.p_id != team.forwards.f8.skater.id"
                      v-show="player.f1visible" :data-player-name="player.name" :for="'f1-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="f2" name="f2" form="f2" v-model="team.forwards.f2.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="f2-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="team.forwards.f2.skater" type="radio" :id="'f2-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.forwards.f1.skater.id && player.p_id != team.forwards.f3.skater.id && player.p_id != team.forwards.f4.skater.id && player.p_id != team.forwards.f5.skater.id && player.p_id != team.forwards.f6.skater.id && player.p_id != team.forwards.f7.skater.id && player.p_id != team.forwards.f8.skater.id"
                      v-show="player.f2visible" :data-player-name="player.name" :for="'f2-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="f3" name="f3" form="f3" v-model="team.forwards.f3.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="f3-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="team.forwards.f3.skater" type="radio" :id="'f3-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.forwards.f1.skater.id && player.p_id != team.forwards.f2.skater.id && player.p_id != team.forwards.f4.skater.id && player.p_id != team.forwards.f5.skater.id && player.p_id != team.forwards.f6.skater.id && player.p_id != team.forwards.f7.skater.id && player.p_id != team.forwards.f8.skater.id"
                      v-show="player.f3visible" :data-player-name="player.name" :for="'f3-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="f4" name="f4" form="f4" v-model="team.forwards.f4.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="f4-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="team.forwards.f4.skater" type="radio" :id="'f4-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.forwards.f1.skater.id && player.p_id != team.forwards.f2.skater.id && player.p_id != team.forwards.f3.skater.id && player.p_id != team.forwards.f5.skater.id && player.p_id != team.forwards.f6.skater.id && player.p_id != team.forwards.f7.skater.id && player.p_id != team.forwards.f8.skater.id"
                      v-show="player.f4visible" :data-player-name="player.name" :for="'f4-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="f5" name="f5" form="f5" v-model="team.forwards.f5.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="f5-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="team.forwards.f5.skater" type="radio" :id="'f5-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.forwards.f1.skater.id && player.p_id != team.forwards.f2.skater.id && player.p_id != team.forwards.f3.skater.id && player.p_id != team.forwards.f4.skater.id && player.p_id != team.forwards.f6.skater.id && player.p_id != team.forwards.f7.skater.id && player.p_id != team.forwards.f8.skater.id"
                      v-show="player.f5visible" :data-player-name="player.name" :for="'f5-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="f6" name="f6" form="f6" v-model="team.forwards.f6.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="f5-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="team.forwards.f6.skater" type="radio" :id="'f6-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.forwards.f1.skater.id && player.p_id != team.forwards.f2.skater.id && player.p_id != team.forwards.f3.skater.id && player.p_id != team.forwards.f4.skater.id && player.p_id != team.forwards.f5.skater.id && player.p_id != team.forwards.f7.skater.id && player.p_id != team.forwards.f8.skater.id"
                      v-show="player.f6visible" :data-player-name="player.name" :for="'f6-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="f7" name="f7" form="f7" v-model="team.forwards.f7.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="f7-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="team.forwards.f7.skater" type="radio" :id="'f7-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.forwards.f1.skater.id && player.p_id != team.forwards.f2.skater.id && player.p_id != team.forwards.f3.skater.id && player.p_id != team.forwards.f4.skater.id && player.p_id != team.forwards.f5.skater.id && player.p_id != team.forwards.f6.skater.id && player.p_id != team.forwards.f8.skater.id"
                      v-show="player.f7visible" :data-player-name="player.name" :for="'f7-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form__item form__item--player-picker">
                  <input type="text" class="player-picker" id="f8" name="f8" form="f8" v-model="team.forwards.f8.search" placeholder="Search..."/>
                  <div class="player-picker__list">
                    <div class="f8-input-list player-picker__list-item" v-for="player in forwards" :key="player.id">
                      <input v-model="team.forwards.f8.skater" type="radio" :id="'f8-radio-' + player.p_id" :value='{"name":player.name, "id":player.p_id, "pv":player.pv}'>
                      <label v-if="player.p_id != team.forwards.f1.skater.id && player.p_id != team.forwards.f2.skater.id && player.p_id != team.forwards.f3.skater.id && player.p_id != team.forwards.f4.skater.id && player.p_id != team.forwards.f5.skater.id && player.p_id != team.forwards.f6.skater.id && player.p_id != team.forwards.f7.skater.id"
                      v-show="player.f8visible" :data-player-name="player.name" :for="'f8-radio-' + player.p_id">
                        {{player.name}} {{player.pv}}
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
      team: {
        forwards: {
          f1: {
            skater: '',
            search: ''
          },
          f2: {
            skater: '',
            search: ''
          },
          f3: {
            skater: '',
            search: ''
          },
          f4: {
            skater: '',
            search: ''
          },
          f5: {
            skater: '',
            search: ''
          },
          f6: {
            skater: '',
            search: ''
          },
          f7: {
            skater: '',
            search: ''
          },
          f8: {
            skater: '',
            search: ''
          }
        },
        defensemen: {
          d1: {
            skater: '',
            search: ''
          },
          d2: {
            skater: '',
            search: ''
          },
          d3: {
            skater: '',
            search: ''
          },
          d4: {
            skater: '',
            search: ''
          },
          d5: {
            skater: '',
            search: ''
          }
        },
        goalies: {
          g1: {
            skater: '',
            search: ''
          },
          g2: {
            skater: '',
            search: ''
          }
        }
      },
      teamPoints: 0,
      name: '',
      owner: '',
      email: '',
      sid: '',
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
        Object.keys(this.team.forwards).forEach(key => {
          player[`${key}visible`] = true;
        });
      });
      this.defensemen.forEach(player => {
        Object.keys(this.team.defensemen).forEach(key => {
          player[`${key}visible`] = true;
        });
      });
      this.goalies.forEach(player => {
        Object.keys(this.team.goalies).forEach(key => {
          player[`${key}visible`] = true;
        });
      });
    } catch(error) {
      this.error = error.message;
    }
  },
  methods: {
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

      const forwardsSelected = Object.keys(this.team.forwards).every(forward => {
        return !!this.team.forwards[forward].skater;
      });
      const defensemenSelected = Object.keys(this.team.defensemen).every(dman => {
        return !!this.team.defensemen[dman].skater;
      });
      const goaliesSelected = Object.keys(this.team.goalies).every(goalie => {
        return !!this.team.goalies[goalie].skater;
      });

      if(!forwardsSelected){
        this.errors.push(`Please select ${Object.keys(this.team.forwards).length} forwards`);
      }
      if(!defensemenSelected){
        this.errors.push(`Please select ${Object.keys(this.team.defensemen).length} defensemen`);
      }
      if(!goaliesSelected){
        this.errors.push(`Please select ${Object.keys(this.team.goalies).length} goalies`);
      }
      if(!this.sid){
        this.errors.push('Please select a team logo');
      }
      if(this.teamPoints > 30){
        this.errors.push('Your team is over the allowed point total of 30');
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
                  f1:this.team.forwards.f1.skater,
                  f2:this.team.forwards.f2.skater,
                  f3:this.team.forwards.f3.skater,
                  f4:this.team.forwards.f4.skater,
                  f5:this.team.forwards.f5.skater,
                  f6:this.team.forwards.f4.skater,
                  f7:this.team.forwards.f4.skater,
                  f8:this.team.forwards.f4.skater
                },
                defensemen:{
                  d1:this.team.defensemen.d1.skater,
                  d2:this.team.defensemen.d2.skater,
                  d3:this.team.defensemen.d3.skater,
                  d4:this.team.defensemen.d3.skater,
                  d5:this.team.defensemen.d3.skater
                },
                goalies:{
                  g1:this.team.goalies.g1.skater,
                  g2:this.team.goalies.g2.skater
              }
          }
        }
      );
      this.$router.push('/team-submitted');
    },
    updateTeamPoints(){
      this.teamPoints = 0;
      Object.keys(this.team.forwards).forEach(skater => {
        if(!isNaN(this.team.forwards[skater].skater.pv)){
          this.teamPoints += this.team.forwards[skater].skater.pv;
        }
      });
      Object.keys(this.team.defensemen).forEach(skater => {
        if(!isNaN(this.team.defensemen[skater].skater.pv)){
          this.teamPoints += this.team.defensemen[skater].skater.pv;
        }
      });
      Object.keys(this.team.goalies).forEach(skater => {
        if(!isNaN(this.team.goalies[skater].skater.pv)){
          this.teamPoints += this.team.goalies[skater].skater.pv;
        }
      });
    }
  },
  watch:{
    team: {
     handler() {
       this.updateTeamPoints();
       
       Object.keys(this.team.forwards).forEach(skater => {
        if(!this.team.forwards[skater].search || this.team.forwards[skater].search.length < 3) {
           this.forwards.map(player => player[`${skater}visible`] = true);
          return;
        }

        this.forwards.forEach(player => {
          if(!player.name.toLowerCase().includes(this.team.forwards[skater].search.toLowerCase())){
            player[`${skater}visible`] = false;
          }
        });
       });

       Object.keys(this.team.defensemen).forEach(skater => {
        if(!this.team.defensemen[skater].search || this.team.defensemen[skater].search.length < 3) {
           this.defensemen.map(player => player[`${skater}visible`] = true);
          return;
        }

        this.defensemen.forEach(player => {
          if(!player.name.toLowerCase().includes(this.team.defensemen[skater].search.toLowerCase())){
            player[`${skater}visible`] = false;
          }
        });
       });

       Object.keys(this.team.goalies).forEach(skater => {
        if(!this.team.goalies[skater].search || this.team.goalies[skater].search.length < 3) {
           this.goalies.map(player => player[`${skater}visible`] = true);
          return;
        }

        this.goalies.forEach(player => {
          if(!player.name.toLowerCase().includes(this.team.goalies[skater].search.toLowerCase())){
            player[`${skater}visible`] = false;
          }
        });
       });
     },
     deep: true
  }
  }
};
</script>