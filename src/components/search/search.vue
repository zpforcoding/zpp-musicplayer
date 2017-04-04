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
              <li class="search-item" v-for="(song,index) in res_songs" @click.stop="plays($event,song)" @touchstart="mobileAutoPlay($event)">
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
                  <span class="iconfont add-icon" @click="rotateAddList(song,index)" :class="{'rotate':clickAddFlag == index}">&#xe605;</span>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import {mapActions, mapGetters} from 'vuex';
  export default {
        data() {
            return {
              searchContent: '',
              res_songs: [],
              clickAddFlag: ''
            };
        },
    computed: {
      ...mapGetters([
          'searchComShow'
      ])
    },
    methods: {
      ...mapActions([
        'playsong', 'putInPlayLists', 'playStateOn', 'miniPlayerShow'
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
                 if (!this.search) {
                   this.$nextTick(() => {
                     this.search = new BScroll(this.$refs.search, {
                       probeType: 3,
                       click: true
                     });
                   });
                 } else {
                   this.search.refresh();
                 }
               }).catch((error) => {
                 console.log(error);
               });
             }
         },
        plays(event, song) {
             if (!event._constructed) {
                 return false;
             } else {
               this.playsong(song);
               this.putInPlayLists(song);
               this.miniPlayerShow();
               this.playStateOn();
             }
        },
       mobileAutoPlay(event) {
        setTimeout(() => {
          document.getElementById('audio').play();
        }, 500);
      },
      rotateAddList(song, index) {
          this.clickAddFlag = index;
          this.putInPlayLists(song);
      }
    }
  };
</script>

<style lang='stylus' rel="stylesheet/stylus">
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
     background:yellowgreen
     .left-arrow
      flex:0,0,50px
      font-size:2rem
      color:#FFF
    .enterInput
      -webkit-appearance:none
      padding-left:15px
      width:60%
      height:2rem
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
        border:1px solid yellowgreen
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
          color: yellowgreen
          &.rotate
            opacity: 1
            transition:all 0.5s ease
            transform: rotate(720deg)
</style>
