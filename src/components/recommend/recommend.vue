<template>
  <transition name="main" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
    <div class="recommend-wrapper">
      <div class="recommend-header">
        <router-link to="../"><span class="iconfont back">&#xe602;</span></router-link>
        <span class="recommend-title">每日推荐</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang='stylus' rel="stylesheet/stylus">
  @import '../../assets/stylus/mixin.styl';
  .recommend-wrapper
    position:fixed
    left:0
    top:0
    width:100%
    height:100%
    background:#FFF
    z-index:103
    .recommend-header
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
      .recommend-title
        font-size:1.2rem
</style>
