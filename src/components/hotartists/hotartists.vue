<template>
  <transition name="main" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
    <div class="hotartists-wrapper">
      <div class="hotartists-header">
        <router-link to="../"><span class="iconfont left-arrow">&#xe6a4;</span></router-link>
        <span>热门歌手</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang='stylus' rel="stylesheet/stylus">
  @import '../../assets/stylus/mixin.styl';
.hotartists-wrapper
  position:fixed
  left:0
  top:0
  width:100%
  height:100%
  background:#FFF
  z-index:103
  .hotartists-header
    position:fixed
    left:0
    top:0
    width:100%
    height: 4rem
    background: $theme
    display:flex
    flex-flow:row wrap
    justify-content:space-around
    align-content:space-between
    align-items:center
    .left-arrow
      flex:0,0,50px
      font-size:2rem
      color:#FFF
</style>
