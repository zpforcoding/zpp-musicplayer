<template >
  <transition name="main" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
      <div class="search" v-if="searchComShow">
        <div class="search-wrapper">
          <div class="search-header">
            <router-link to="../"><span class="iconfont left-arrow">&#xe6a4;</span></router-link>
            <input type="text" placeholder="请输入搜索音乐、歌手" class="enterInput" v-model.trim="searchContent" @keyup.enter="searchSongs">
            <span class="iconfont searh" @click="searchSongs">&#xe672;</span>
          </div>
          <div class="search-content" ref="search">
            <ul class="search-ul">
              <li class="search-item" v-for="(song,index) in res_songs" @click.stop="plays($event,song)" @touchstart="mobileAutoPlay()">
                <div class="img-wrapper">
                  <img :src="song.album.picUrl+'?param=100y100'" class="img">
                </div>
                <div class="song-info">
                  <p class="song-name">{{song.name}}</p>
                  <div class="singer-box">
                    <span class="singer" v-for="artist in song.artists">{{artist.name}} </span>
                  </div>
                </div>
                <transition name="rotate">
                  <span class="iconfont add-icon" @click="rotateAddList(song,index,$event)">&#xe605;</span>
                </transition>
              </li>
            </ul>
          </div>
        </div>
        <div class="remind-wrapper">
          <Remind :info="info" v-if="remindShow"></Remind>
        </div>
      </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import {mapActions, mapGetters} from 'vuex';
  import Remind from '../remind/remind.vue';
  const ADD_SUCC = '已添加到播放列表';
//  const ADD_FALSE = '添加到列表失败';
  export default {
      components: {
        Remind
      },
        data() {
            return {
              searchContent: '',
              res_songs: [],
              clickAddFlag: '',
              info: '',
              remindShow: false
            };
        },
    computed: {
      ...mapGetters([
          'searchComShow'
      ])
    },
    methods: {
      ...mapActions([
         'putInPlayLists', 'playStateOn', 'miniPlayerShow'
      ]),
         searchSongs() {
             let name = this.searchContent;
             if (name) {
               axios.get('/search', {
                 params: {
                   name: name,
                   limit: 50,
                   offset: 0
                 }
               }).then((response) => {
                 this.res_songs = response.data.result.songs;
                   this.$nextTick(() => {
                     this.search = new BScroll(this.$refs.search, {
                       probeType: 3,
                       click: true
                     });
                   });
               }).catch((error) => {
                 console.log(error);
               });
             }
         },
        plays(event, song) {
             if (!event._constructed) {
                 return false;
             } else {
               this.putInPlayLists(song);
               this.miniPlayerShow();
               document.getElementById('audio').play();
               this.playStateOn();
               this.info = ADD_SUCC;
               this.remindShow = true;
               setTimeout(() => {
                 this.remindShow = false;
               }, 3000);
             }
        },
       mobileAutoPlay() {
         document.getElementById('audio');
         this.playStateOn();
      },
      rotateAddList(song, index, event) {
          this.clickAddFlag = index;
          this.putInPlayLists(song);
          let e = window.event || event;
          e.target.style.transform = 'rotate(720deg)';
          e.target.style.transition = 'all 1s ease';
      }
    }
  };
</script>

<style lang='stylus' rel="stylesheet/stylus">
  @import '../../assets/stylus/mixin.styl';
  @import '../../assets/css/animate.css';
  .search
    position:fixed
    left:0
    top:0
    width:100%
    height:100%
    z-index:103
    background:#fff
   .search-header
     position:fixed
     z-index:101
     display:flex
     flex-flow:row wrap
     justify-content:space-around
     align-content:space-between
     align-items:center
     width:100%
     height: 4rem
     line-height:4rem
     background:$theme
     .left-arrow
      flex:0,0,50px
      font-size:2rem
      color:#FFF
    .enterInput
      -webkit-appearance:none
      padding-left:15px
      width:60%
      height:2rem
      border-radius:10px
      outline:none
      &::-webkit-input-placeholder
        text-align:center
    .searh
      flex:0,0,50px
      color:#FFF
      cursor:pointer
   .search-content
     position:absolute
     left:0
     top:4rem
     width:100%
     max-height:41rem
     overflow:hidden
    .search-ul
      .search-item
        position:relative
        width:100%
        height:6rem
        background:#fff
        border:1px solid $theme
        .img-wrapper
          display:inline-block
          width:4rem
          height:4rem
          line-height:6rem
          position:absolute
          left:1rem
          top:50%
          margin-top:-2rem
          border-radius:100%
          overflow:hidden
          .img
            width:100%
            height:100%
            vertical-align:top
        .song-info
          position:relative
          left:6rem
          top:2rem
          color:#888
          .song-name
            width:65%
            text-overflow:ellipsis
            padding-bottom:0.2rem
          .singer-box
            width:65%
            overflow:hidden
            text-overflow:ellipsis
            white-space:nowrap
        .add-icon
          font-size:1.5rem
          position:absolute
          right:1rem
          top:2rem
          color: $theme
</style>
