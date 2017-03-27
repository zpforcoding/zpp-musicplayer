<template>
    <div class="song">
      <div class="song-wrapper">
        <div class="content-head">
          <router-link to="../"><span class="iconfont back">&#xe602;</span></router-link>
          <div class="song-info">
            <p class="song-name">遥远的她</p>
            <p class="song-singer">张学友</p>
          </div>
        </div>
        <div class="content-lrc">
          <div class="song-circle">
            <img src="../../assets/img/jay.jpg" class="img">
          </div>
          <div class="lrc-container">
            <p>123123123dsfasdfas</p>
            <p>123123123dsfasdfas</p>
            <p>123123123dsfasdfas</p>
            <p>123123123dsfasdfas</p>
            <p>123123123dsfasdfas</p>
            <p>123123123dsfasdfas</p>
            <p>123123123dsfasdfas</p>
            <p>123123123dsfasdfas</p>
          </div>
        </div>
        <div class="content-player">
          <div class="song-duration"></div>
          <div class="control-box">
            <div class="song-bottom">
              <div class="song-order">
                <span class="iconfont play-order">&#xe630;</span>
                <span class="iconfont" v-show="false">&#xe62f;</span>
                <span class="iconfont" v-show="false">&#xe680;</span>
              </div>
              <div class="pause-goon">
                <span class="iconfont">&#xe616;</span>
                <span class="iconfont" v-show="false">&#xe60a;</span>
                <span class="iconfont">&#xe669;</span>
                <span class="iconfont">&#xe600;</span>
              </div>
              <div class="song-list">
                <span class="iconfont">&#xe610;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
    };
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .song
    position:fixed
    left:0
    top:0
    width:100%
    height:100%
    z-index:103
    background:yellowgreen
    .content-head
      width:100%
      height: 4rem
      line-height:4rem
      position:relative
      .back
        color:#FFF
        padding:6px
        padding-left:0.5rem
      .song-info
        position:absolute
        left:50%
        top:50%
        width:200px
        height:40px
        margin-top: -20px
        margin-left:-100px
        color:#fff
        line-height:1.4rem
        text-align:center
    .content-lrc
      position:relative
      .song-circle
        width: 18rem
        height: 18rem
        margin:30px auto
        border-radius:100%
        overflow:hidden
        .img
          width:100%
          height:100%
      .lrc-container
        width:80%
        margin:0 auto
        text-align:center
        color: #ffffff

    .content-player
      position:fixed
      bottom:0
      left:0
      width:100%
      margin-top:20px
      height:90px
      .song-duration
        width:80%
        margin:0 auto
        height:2px
        margin-top:10px
        background:#FFF
      .song-bottom
        width:100%
        margin-top:25px
        display:flex
        box-sizing:border-box
        padding:0 20px
        justify-content:space-between
        align-content:space-between
        .song-order,.pause-goon
          color:#FFF
        .song-order
          .play-order
            font-size:1.5rem!important
          span
            padding:8px
            font-size:2.5rem
        .pause-goon
          span
            font-size:2.5rem
        .song-list
          color:#FFF
</style>
