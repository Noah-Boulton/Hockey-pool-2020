<template>
  <div id="app">
    <header class="header">
      <router-link class="logo" to="/"><img alt="Mo's Top Ho's logo" src="./assets/logo.png" class="logo__img"></router-link>
      <nav class="nav nav--main">
        <ul class="menu">
          <li v-if="Date.now() >= new Date('August 11, 2020')"  class="menu__item">
            <router-link class="menu__link" to="/standings">Standings</router-link>
          </li>
          <li v-if="Date.now() >= new Date('August 8, 2020') && Date.now() < new Date('August 11, 2020')" class="menu__item">
            <router-link class="menu__link" to="/team-submission">Submit a Team</router-link>
          </li>
          <li v-if="Date.now() >= new Date('August 11, 2020')" class="menu__item">
            <router-link class="menu__link" to="/teams">Teams</router-link>
          </li>
          <li class="menu__item"><router-link class="menu__link" to="/rules">Rules</router-link></li>
          <li class="menu__item"><router-link class="menu__link" to="/questions">Questions</router-link></li>
          <li class="menu__item"><router-link class="menu__link" to="/records">The Record Books</router-link></li>
          <li class="menu__item"><router-link class="menu__link" to="/players">The Ho's</router-link></li>
          <li class="menu__item"><router-link class="menu__link" to="/podcast">Extras</router-link></li>
        </ul>
      </nav>
    </header>
    <router-view></router-view>
    <footer class="footer">
      <div class="footer__copyright">
        <a href="https://youtu.be/PJFVQcSTb_w?t=3" style="color:black; text-decoration:none">&copy; {{ new Date().getFullYear() }} Commissioner Mo</a>
        </div>
    </footer>
  </div>
</template>

<script>

export default {
 data() {
   return {

   }
 }
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Gochi+Hand|PT+Sans:400,700&display=swap';
@import './assets/styles.css';
</style>