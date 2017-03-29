<template>
  <div id="app" class="root">
    <Top-bar></Top-bar>
    <Banner></Banner>
    <Circles></Circles>
    <Hot></Hot>
    <Miniplayer v-if="audioShowFlag"></Miniplayer>
    <transition name="main" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
     <router-view></router-view>
    </transition>
    <audio :src="play.mp3Url" autoplay loop id="audio"></audio>
  </div>
</template>
<script>
  import TopBar from './components/topbar/topbar';
  import Banner from './components/banner/banner';
  import Circles from './components/circle/circle';
  import Hot from './components/hot/hot';
  import Miniplayer from './components/miniplayer/miniplayer';
  import {mapGetters} from 'vuex';
  export default {
    components: {
      TopBar,
      Banner,
      Circles,
      Hot,
      Miniplayer
    },
  computed: {
  ...mapGetters([
      'play', 'audioShowFlag'
    ])
  },
    methods: {
        autoPlay() {
            this.$refs.audio.play();
        }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './assets/stylus/globe.styl';
  .root
    position:absolute
    left:0
    right:0
    width: 100%;
    height: 100%;
</style>
