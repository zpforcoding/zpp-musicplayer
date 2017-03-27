<template>
    <div class="hot-playlist">
      <div class="hotinfo-wrapper">
        <div class="hotinfo-top">
            <div class="hotinfo-header">
              <router-link to="../"><span class="iconfont left-arrow">&#xe6a4;</span></router-link>
              <span class="playlist-title">歌单</span>
              <div class="img-box">
                <div class="img-wrapper">
                  <div class="wrapper-left">
                    <img :src="dataObj.coverImgUrl" class="img">
                  </div>
                  <div class="wrapper-right" v-if="dataObj.creator">
                      <p class="desc">{{dataObj.name}}</p>
                    <div class="small-wrapper">
                      <div class="small-circle">
                        <img :src="dataObj.creator.avatarUrl+'?param=30y30'" >
                      </div>
                      <span class="singer-name">{{dataObj.creator.nickname}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="hotinfo-content">
          <div class="play-all-title">
            <span class="iconfont playall-icon">&#xe7a0;</span>
            <span>播放全部<span class="text-muted">(共{{dataObj.trackCount}}首)</span></span>
          </div>
          <div class="list-ul-wrapper" ref='playlist'>
            <ul>
              <li class="list-item" v-for="(songs,index) in dataObj.tracks">
                <div class="list-num">{{index<9?'0'+(index+1):index+1}}</div>
                <div class="song-info">
                  <p class="song-name">{{songs.name}}</p>
                  <p class="singer-name">{{songs.artists[0].name}}</p>
                </div>
                <div class="iconfont add">&#xe605;</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  export default {
      data() {
          return {
              dataObj: '',
            dataReady: false
          };
      },
     created() {
         let id = this.$route.params.id;
         axios.get('/playlists', {
             params: {
                 id: id
               }
         }).then((response) => {
             this.dataObj = response.data.result;
           if (!this.scroll) {
             this.$nextTick(() => {
               this.playlistScroll = new BScroll(this.$refs.playlist, {
                 probeType: 3,
                 click: true
               });
             });
           } else {
             this.playlistScroll.refresh();
           }
         }).catch((error) => {
             console.log(error);
         });
     }
  };
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .hot-playlist
    position:fixed
    left:0
    top:0
    width:100%
    height:100%
    background:#FFF
    z-index:103
    .hotinfo-top
      width:100%
      height:16.5rem
      .hotinfo-header
        width:100%
        height:4rem
        line-height:4rem
        position:absolute
        left:0
        top:0
        background:yellowgreen
        text-align center
        .left-arrow,.playlist-title
          color: #ffffff
        .left-arrow
          position:absolute
          left:0
          padding-left:8px
          font-size:2rem
        .playlist-title
          font-size:1.2rem
        .img-box
          width:100%
          height: 12rem
          background:yellowgreen
          border-bottom:1px solid yellowgreen
          .img-wrapper
            width:90%
            margin:0 auto
            height:100%
            display:flex
            justify-content:space-around
            align-content:space-around
            .wrapper-left,.wrapper-right
              display:inline-block
              margin-top:2rem
              height:6rem
            .wrapper-left
              flex:0,0,6rem
              padding-left:1.5rem
              .img
                width:8rem
                height:8rem
            .wrapper-right
              color:#FFF
              padding-left:1.5rem
              .desc
                line-height:1.5rem
              .small-wrapper
                height: 2.5rem
                position:relative
                left:0
                top:1.5rem
                font-size:0
                display:table-cell
                .small-circle
                  display:inline-block
                  width: 2.5rem
                  height: 2.5rem
                  border-radius:100%
                  overflow:hidden
                .singer-name
                  display:inline-block
                  font-size:1rem
                  position:relative
                  left:0.5rem
                  bottom:0.6rem
    .play-all-title
      padding:1rem 0 0 1.5rem
      .playall-icon
        color:yellowgreen
      .text-muted
        color:#777
    .list-ul-wrapper
      width:100%
      overflow:hidden
      max-height:24.5rem
      .list-item
        display:flex
        justify-content:space-between
        align-content:space-between
        width:100%
        height:4rem
        border-bottom:1px solid yellowgreen
        .list-num,.add
          flex: 0 0 50px
          height:100%
          line-height:4rem
          text-align:center
          color:yellowgreen
          font-size:1rem
        .song-info
          flex:1
          padding-top:0.8rem
          line-height:1.4rem
          text-align:left
          .singer-name
            color: #aaa
          .song-name
            color:#222
</style>
