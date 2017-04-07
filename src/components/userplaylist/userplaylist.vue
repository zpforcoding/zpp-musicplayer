<template>
  <transition name="slide-fade" enter-active-class="animated zoomInLeft fast" leave-active-class="animated zoomOutRight fast">
    <div class="mini-playlist" v-show="!foldState">
      <div class="mini-box">
        <div class="mini-playlist-title">
          <span class="play-inline">播放队列 {{userPlayLists.length}}</span>
          <!--<span class="iconfont removeAll" v-show="userPlayLists.length!=0">&#xe604;</span>-->
        </div>
        <div class="playList" ref="list">
          <ul v-if="userPlayLists.length!=0">
            <li class="playList-item" v-for="(songs,index) in userPlayLists" @click="plays($event,index)">
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
        <div class="emptyPlayList" v-show="userPlayLists.length==0">您的播放列表为空</div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {mapGetters, mapActions} from 'vuex';
  export default {
      props: {
        foldState: {
            type: Boolean
        }
      },
      computed: {
        ...mapGetters([
            'userPlayLists'
        ])
      },
      methods: {
        ...mapActions([
            'playListSong', 'playStateOn', 'removeSong', 'playStatePause'
        ]),
        plays(event, index) {
          if (!event._constructed) {
            return false;
          } else {
            this.playListSong(index);
            this.playStateOn();
          }
        },
        remove(index) {
          this.playStatePause();
          this.removeSong(index);
        }
      },
    watch: {
      foldState() {
        let show = !this.foldState;
        if (show) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.list, {
              click: true,
              probeType: 3
            });
          });
        }
      },
      deep: true
    }
  };
</script>
<style lang='stylus' rel="stylesheet/stylus">
  @import '../../assets/stylus/mixin.styl';
  .mini-playlist
    position:absolute
    z-index:105
    left:0
    bottom:4rem
    width:100%
    max-height:384px
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
        max-height:21.5rem
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
            border-bottom:1px solid $theme
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
</style>
