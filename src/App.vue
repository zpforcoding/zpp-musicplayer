<template>
  <div id="app" class="root">
    <Top-bar></Top-bar>
    <Banner></Banner>
    <Circles></Circles>
    <Hot></Hot>
    <Miniplayer v-if="audioShowFlag"></Miniplayer>
    <router-view></router-view>
      <audio :src="mp3Url" autoplay id="audio" @ended="order()">您的浏览器不支持 audio 元素。</audio>
  </div>
</template>
<script>
  import TopBar from './components/topbar/topbar';
  import Banner from './components/banner/banner';
  import Circles from './components/circle/circle';
  import Hot from './components/hot/hot';
  import Miniplayer from './components/miniplayer/miniplayer';
  import {mapActions, mapGetters} from 'vuex';
  export default {
      data() {
        return {
          loopFlag: false,
          mp3Url: ''
        };
      },
    components: {
      TopBar,
      Banner,
      Circles,
      Hot,
      Miniplayer
    },
  computed: {
  ...mapGetters([
      'playNowSong', 'audioShowFlag', 'orderState', 'userPlayLists'
    ])
  },
    methods: {
      ...mapActions([
          'nextSong', 'randomPlay', 'loopPlay', 'playStatePause'
      ]),
      order() {
        if (this.orderState === 0) {
          if (this.userPlayLists.length === 1) {
           this.playStatePause();
          } else {
            this.nextSong();
            console.log('顺序播放');
          }
        } else if (this.orderState === 2) {
          if (this.userPlayLists.length === 1) {
            this.playStatePause();
          } else {
            this.randomPlay();
            console.log('随机播放');
          }
        } else {
          document.getElementById('audio').pause();
          this.loopPlay();
          document.getElementById('audio').play();
        }
      }
    },
    watch: {
      playNowSong() {
          this.mp3Url = this.playNowSong.mp3Url;
      },
      deep: true
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
