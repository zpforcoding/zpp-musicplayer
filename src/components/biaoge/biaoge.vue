<template>
  <transition name="main" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
    <div class="biaoge-wrapper">
      <div class="biaoge-header">
        <router-link to="../"><span class="iconfont back">&#xe602;</span></router-link>
        <span class="biaoge-title">飙歌榜</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang='stylus' rel="stylesheet/stylus">
  @import '../../assets/stylus/mixin.styl';
  .biaoge-wrapper
    position:fixed
    left:0
    top:0
    width:100%
    height:100%
    background:#FFF
    z-index:103
    .biaoge-header
      position:fixed
      left:0
      top:0
      width:100%
      height: 4rem
      line-height:4rem
      background: $theme
      text-align:center
      color:#FFF
      .back
        float:left
        padding:6px
        padding-left:0.5rem
        color:#FFF
        line-height:3.2rem
      .biaoge-title
        font-size:1.2rem
</style>
