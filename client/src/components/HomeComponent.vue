<template>
  <div class="Home">
    <div class="description span-width--66">
        <h1>History</h1>
        <p>Mo’s Hockey Hosers <em>(Mo's Hockey Ho's)</em> was founded in 2018 by Commissioner Mo.</p>
        <p>After trying out many different Fantasy Hockey Leagues, Mo just couldn't 
            seem to find a format that fit his style. He wanted a way to be involved 
            with fantasy hockey without any of the responsibility of Team Upkeep. 
            Thus, in 2018 Mo's Hockey Ho's was born. Mo's Hockey Ho's 2018 consisted 
            of Mo building multiple Google Spreadsheet files and linking them 
            together to keep track of all the points and standings. The format was 
            a success and Mo's Hockey Ho's was renewed for 2019 by Mo.</p>
        <p>In 2019, Mo wanted to try something new. Teaming up with Noro, Eddie, 
            J-Spot and E-siz, they fluffed around ideas of creating a website. 
            Very ambitious at first, the website seemed like it was going to be a 
            grand spectacle. Of course, after several months of just talking about 
            how great it was going to be, it became too late to really develop any 
            of these ideas. With this procrastination leading the charge, 
            Moshockeyhos.wordpress.com was born! An amazingly shitty website with 
            very janky work arounds and ideas thrown together to make something 
            miraculous! In 2020 Mo's Hockey Ho's was renewed by Mo!</p>
        <p>This year multiple changes were made to the Website! With Noro and E-siz 
            at the helm of Mo's Web Dev Team, they were able to make dreams a 
            reality. The grand spectacle that was thought up in 2019, finally 
            became a reality.
        <p>I hope you enjoy yourself while being involved with Mo's Hockey Ho's 
            and I hope to continue to run this league for years to come.</p>
        <p>Sincerely,</p>
        <img src="../../public/images/signature.png" alt="Signature" width=200>
        <p>Commissioner Mo</p>
    </div>
    <div class="twitter span-width--33">
      <h2>The Penalty Box</h2>
      <component-view id="moromiles" class="twitter__timeline" sourceType="profile" :options="{ tweetLimit: '5'}"></component-view>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import { Timeline } from 'vue-tweet-embed';

  export default {
    components: {
      'component-view': Timeline
    },
    created() {

    }
  }
</script>
