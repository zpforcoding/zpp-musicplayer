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
          <div class="control-line"></div>
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
    <transition name="slide-fade" enter-active-class="animated zoomInLeft fast" leave-active-class="animated zoomOutRight fast">
      <div class="mini-playlist"  v-if="showFlag">
        <div class="mini-box">
          <div class="mini-playlist-title">
            <span class="play-inline">播放队列 {{playListsArr.length}}</span>
            <!--<span class="iconfont removeAll" v-show="userPlayLists.length!=0">&#xe604;</span>-->
          </div>
          <div class="playList" ref="list">
            <ul v-if="userPlayLists.length!=0">
              <li class="playList-item" v-for="(songs,index) in playListsArr" @click="plays($event,index)">
                <div class="mini-num">{{index+1}}</div>
                <div class="songs-remove-box">
                  <div class="mini-info">
                    <p class="mini-song-name">{{songs.name}}</p>
                    <span class="mini-singer" v-for="singers in songs.artists">{{singers.name}} </span>
                  </div>
                  <div class="item-mini-remove">
                    <span class="iconfont" @click="remove(index)">&#xe604;</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="emptyPlayList" v-show="playListsArr.length==0">您的播放列表为空</div>
        </div>
      </div>
    </transition>
    <transition name="layer">
      <div class="layer" @click="hideFold" v-show="showFlag"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {mapActions, mapGetters} from 'vuex';
  let cicleTimer;
  let DEG = 1;
  export default {
      data() {
        return {
          foldState: true,
          playListsArr: [
          ]
        };
      },
      methods: {
        ...mapActions([
          'playListSong', 'songShowFlag', 'playStateOn', 'playStatePause', 'nextSong', 'lastSong', 'removeSong'
        ]),
        toggle() {
          if (!this.playListsArr) {
            return false;
          } else {
            this.foldState = !this.foldState;
          }
        },
        hideFold() {
          this.foldState = true;
        },
        rotateCircle() {
          cicleTimer = setInterval(() => {
              this.$refs.circle.style.transform = `rotateZ(${DEG}deg)`;
            DEG += 1;
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
        plays(event, index) {
          if (!event._constructed) {
            return false;
          } else {
            this.playListSong(index);
            this.playStateOn();
          }
        },
        nextPlay() {
          this.nextSong();
          this.playStateOn();
        },
        remove(index) {
            this.playStatePause();
            this.removeSong(index);
        }
      },
    computed: {
      ...mapGetters([
        'playNowSong', 'userPlayLists', 'playState'
      ]),
      showFlag() {
        if (!this.playListsArr) {
          this.foldState = true;
          return false;
        } else {
          let show = !this.foldState;
          if (show) {
              this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.list, {
                  click: true,
                  probeType: 3
                });
              });
          }
          return show;
        }
      }
    },
    watch: {
      playState() {
        if (this.playState) {
          this.rotateCircle();
        } else {
          this.offInterval();
        }
      },
      userPlayLists() {
          this.playListsArr = this.userPlayLists;
      },
      deep: true
    },
    mounted() {
          this.rotateCircle();
    }
  };
</script>

<style lang='stylus' rel="stylesheet/stylus">
    .miniplayer
      position:fixed
      left:0
      bottom:0
      z-index:99
      width:100%
      height:4rem
      background:yellowgreen
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
            z-index:103
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
          .control-line
            width:100%
            height: 2px
            background:#FFF
          .song-info
            margin-top:10px
            float:left
            color:#FFF
            width:6.5rem
            .singer
              display:inline-block
              margin-top:0.3rem
          .control-box
            margin-top:10px
            float:right
            .iconfont
              display:inline-block
              color: #ffffff
              margin-right:0.3rem
      .mini-playlist
        position:absolute
        z-index:99
        left:0
        bottom:4rem
        width:100%
        max-height:364px
        background:rgba(0,0,0,0.6)
        color:#FFF
        overflow:hidden
        .mini-box
          .mini-playlist-title
            width:100%
            height: 40px
            line-height:40px
            border-bottom:1px solid #eee
            overflow:hidden
            .play-inline
              float:left
              padding:0 8px
            .removeAll
              float:right
              padding:0 8px
              font-size:1.6rem
          .playList
            position:relative
            left:0
            top:0
            width:100%
            max-height:20rem
            overflow:hidden
            .playList-item
              width:100%
              height:3.5rem
              display:flex
              .mini-num
                width:15%
                height: 50px
                text-align:center
                line-height:50px
              .songs-remove-box
                width:85%
                overflow:hidden
                border-bottom:1px solid lawngreen
                .mini-info
                  float:left
                  padding:8px
                  .mini-singer
                    display:inline-block
                    margin-top:5px
                    color:#eee
                .item-mini-remove
                  float:right
                  padding:12px 8px 0 0
                  .iconfont
                    font-size:1.6rem !important
          .emptyPlayList
            width:60%
            height: 50px
            line-height:50px
            margin:100px auto
            font-size:1.2rem
            text-align:center
      .layer
        position:fixed
        left:0
        bottom:4rem
        width:100%
        height:100%
        z-index:50
        background:rgba(0,0,0,0.2)
        &.layer-enter-active,&.layer-leave-active
          transition:all 0.3 fast
          backdrop-filter:blur(1px)
          opacity:0
        &.layer-enter,&.layer-leave-active
          backdrop-filter:blur(0)
          opacity:1
</style>
