<template >
  <transition name="main" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
      <div class="search animated">
        <div class="search-wrapper">
          <div class="search-header">
            <router-link to="../"><span class="iconfont left-arrow">&#xe6a4;</span></router-link>
            <input type="text" placeholder="请输入搜索音乐、歌手" class="enterInput" v-model.trim="searchContent" @keyup.enter="searchSongs">
            <span class="iconfont searh" @click="searchSongs">&#xe672;</span>
          </div>
          <div class="search-content" ref="searchContent">
            <ul class="search-ul">
              <li class="search-item" v-for="(song,index) in res_songs" @click="play($event,song)" @touchstart="mobileAutoPlay($event)">
                <div class="img-wrapper">
                  <img :src="song.album.picUrl+'?param=100y100'" class="img">
                </div>
                <div class="song-info">
                  <p class="song-name">{{song.name}}</p>
                  <p class="singer">{{song.artists[0].name}}</p>
                </div>
                <transition name="rotate">
                  <span class="iconfont add-icon" @click.stop="addPlayList(index)" :class="{'rotate':clickAddFlag == index}">&#xe605;</span>
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
  import {mapActions} from 'vuex';
  export default {
        data() {
            return {
              searchShow: '',
              searchContent: '',
              res_songs: [],
              clickAddFlag: ''
            };
        },
    methods: {
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
                 if (!this.seachResults) {
                   this.$nextTick(() => {
                     this.seachResults = new BScroll(this.$refs.searchContent, {
                       probeType: 3,
                       click: true
                     });
                   });
                 } else {
                   this.seachResults.refresh();
                 }
               }).catch((error) => {
                 console.log(error);
               });
             }
         },
        play(event, song) {
             if (!event._constructed) {
                 return false;
             } else {
               this.playsong(song);
             }
        },
      mobileAutoPlay(event) {
        document.getElementById('audio').play();
      },
      addPlayList(index) {
        this.clickAddFlag = index;
        console.log(index);
      },
      ...mapActions([
          'playsong'
      ])
    }
  };
</script>

<style lang='stylus' rel="stylesheet/stylus">
  @import '../../assets/css/animate.css';
  .search-wrapper
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
            width:50%
            padding-bottom:0.2rem
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
