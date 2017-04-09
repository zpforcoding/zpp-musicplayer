<template>
  <div class="miniplayer">
    <div class="mini-wrapper" >
        <div class="img-wrapper">
          <router-link to="/song">
            <div class="circle-box" ref="circle" @click="songShowFlag">
                <img :src="playNowSong.album.picUrl+'?param=400y400'" class="mini-img">
            </div>
          </router-link>
        </div>
        <div class="right-wrapper">
          <div class="song-info">
           <p class="song-name">{{playNowSong.name}}</p>
           <span class="singer" v-for="artists in playNowSong.artists">{{artists.name}} </span>
          </div>
          <div class="control-box">
            <span class="iconfont" v-show="!playState" @click="playGoOn()">&#xe639;</span>
            <span class="iconfont" v-show="playState" @click="playPause()">&#xe640;</span>
            <span class="iconfont" @click="nextPlay()">&#xe620;</span>
            <span class="iconfont"  @click="toggle()">&#xe610;</span>
          </div>
        </div>
    </div>
    <Userplaylist :foldState="foldState"></Userplaylist>
    <div class="layer-wrapper"  @click="hideFold()">
      <Layer :foldState="!foldState"></Layer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions, mapGetters} from 'vuex';
  import Userplaylist from '../userplaylist/userplaylist';
  import Layer from '../layer/layer';
  let cicleTimer;
  let DEG = 1;
  export default {
      components: {
        Userplaylist,
        Layer
      },
      data() {
        return {
          foldState: true,
          playListArr: []
        };
      },
      methods: {
        ...mapActions([
          'songShowFlag', 'playStateOn', 'playStatePause', 'nextSong', 'lastSong'
        ]),
        toggle() {
          this.foldState = !this.foldState;
        },
        hideFold() {
          this.foldState = true;
        },
        rotateCircle() {
          cicleTimer = setInterval(() => {
              this.$refs.circle.style.transform = `rotateZ(${DEG}deg)`;
            DEG++;
            }, 100);
        },
        playGoOn() {
          document.getElementById('audio').play();
          this.playStateOn();
        },
        playPause() {
          document.getElementById('audio').pause();
          this.playStatePause();
        },
        offInterval() {
          clearInterval(cicleTimer);
        },
        nextPlay() {
          this.nextSong();
          this.playStateOn();
        }
      },
    beforeMount() {

    },
    computed: {
      ...mapGetters([
        'playNowSong', 'playState'
      ])
    },
    watch: {
      playState: {
          handler: function() {
            if (this.playState) {
              this.rotateCircle();
            } else {
              this.offInterval();
            }
          },
        deep: true
      }
    },
    mounted() {
          this.rotateCircle();
    }
  };
</script>

<style lang='stylus' rel="stylesheet/stylus">
  @import '../../assets/stylus/mixin.styl';
    .miniplayer
      position:fixed
      left:0
      bottom:0
      z-index:103
      width:100%
      height:4rem
      background:$theme
      .mini-wrapper
        position:relative
        z-index:100
        width:100%
        height:100%
        display:flex
        .img-wrapper
          flex: 0 0 90px
          .circle-box
            width: 4rem
            height:4rem
            border-radius:100%
            position:relative
            left:0.5rem
            top:-0.5rem
            z-index:108
            overflow:hidden
            .mini-img
              text-align:center
              width:100%
              height:100%
        .right-wrapper
          position:relative
          flex:1
          box-sizing:border-box
          padding:8px 8px 0 0
          overflow:hidden
          font-size:0.8rem!important
          .song-info
            margin-top:5px
            float:left
            color:#FFF
            width:6.5rem
            .song-name
              font-size:0.8rem
            .singer
              color:yellowgreen
              display:inline-block
              margin-top:8px
              font-size:0.7rem
          .control-box
            margin-top:5px
            float:right
            .iconfont
              display:inline-block
              color: #ffffff
              margin-right:0.3rem
</style>
