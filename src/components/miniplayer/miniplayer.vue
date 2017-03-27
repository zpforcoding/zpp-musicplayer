<template>
  <div class="miniplayer">
    <div class="mini-wrapper" >
        <div class="img-wrapper">
          <router-link to="/song">
            <div class="circle-box">
                 <img src="" alt="">
            </div>
          </router-link>
        </div>
        <div class="right-wrapper">
          <div class="control-line"></div>
          <div class="song-info">
            <p class="song-name">我等到花儿也谢了</p>
            <p class="singer">张学友</p>
          </div>
          <div class="control-box">
            <span class="iconfont">&#xe639;</span>
            <span class="iconfont" v-show="false">&#xe640;</span>
            <span class="iconfont">&#xe620;</span>
            <span class="iconfont"  @click="toggle()">&#xe610;</span>
          </div>
        </div>
    </div>
    <transition name="slide-fade" enter-active-class="animated zoomInLeft fast" leave-active-class="animated zoomOutRight fast">
        <div class="mini-playlist"  v-show="showFlag">
          <div class="mini-box">
              <div class="mini-playlist-title">
                <span class="play-inline">播放队列</span>
                <span class="iconfont removeAll">&#xe604;</span>
              </div>
              <div class="playList" ref="playList">
                <ul>
                  <li class="playList-item" v-for="(songs,index) in playListsArr">
                    <div class="mini-num">{{index+1}}</div>
                    <div class="songs-remove-box">
                      <div class="mini-info">
                        <p class="mini-song-name">{{songs.songname}}</p>
                        <p class="mini-singer">{{songs.singer}}</p>
                      </div>
                      <div class="item-mini-remove">
                        <span class="iconfont">&#xe604;</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
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
  export default {
      data() {
        return {
          foldState: true,
          playListsArr: [{
              songname: '我等到花儿也谢了',
              singer: '张学友'
          }, {
            songname: '冰雨',
            singer: '刘德华'
          }, {
            songname: '练习',
            singer: '刘德华'
          }, {
            songname: '练习',
            singer: '刘德华'
          }, {
            songname: '练习',
            singer: '刘德华'
          }, {
            songname: '练习',
            singer: '刘德华'
          }, {
            songname: '练习',
            singer: '刘德华'
          }, {
            songname: '练习',
            singer: '刘德华'
          }, {
            songname: '练习',
            singer: '刘德华'
          }, {
            songname: '练习',
            singer: '刘德华'
          }, {
            songname: '练习',
            singer: '刘德华'
          }, {
            songname: '练习',
            singer: '刘德华'
          }, {
              songname: '练习',
              singer: '刘德华'
            }, {
              songname: '练习',
              singer: '刘德华'
            }, {
              songname: '练习',
              singer: '刘德华'
            }, {
              songname: '练习',
              singer: '刘德华'
            }

          ]
        };
      },
      methods: {
        toggle() {
             if (!this.playListsArr) {
                 return false;
             } else {
                this.foldState = !this.foldState;
             }
          },
        hideFold() {
            this.foldState = true;
        }
      },
    computed: {
          showFlag() {
              if (!this.playListsArr) {
                  this.foldState = true;
                  return false;
              } else {
                  let show = !this.foldState;
                  if (show) {
                      if (!this.playListScroll) {
                        this.$nextTick(() => {
                          this.playListScroll = new BScroll(this.$refs.playList, {
                            click: true,
                            probeType: 3
                          });
                        });
                      } else {
                        this.playListScroll.refresh();
                      }
                  }
                  return show;
              }
          }
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
            background:yellow
            position:relative
            left:0.5rem
            top:-0.5rem
            z-index:103
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
            margin-top:12px
            float:left
            color:#FFF
            .singer
              margin-top:0.3rem
          .control-box
            margin-top:12px
            float:right
            .iconfont
              display:inline-block
              color: #ffffff
              margin-left:1.5rem

      .mini-playlist
        position:absolute
        z-index:99
        left:0
        bottom:4rem
        width:100%
        height:364px
        background:yellowgreen
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
                  margin-top:5px
                  color:#ddd
              .item-mini-remove
                float:right
                padding:12px 8px 0 0
                .iconfont
                  font-size:1.6rem !important
      .layer
        position:fixed
        left:0
        bottom:4rem
        width:100%
        height:100%
        z-index:50
        background:rgba(0,0,0,0.3)
        &.layer-enter-active,&.layer-leave-active
          transition:all 0.3 fast
          backdrop-filter:blur(1px)
          opacity:0
        &.layer-enter,&.layer-leave-active
          backdrop-filter:blur(0)
          opacity:1
</style>
