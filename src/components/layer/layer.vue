<template>
  <transition name="layer">
    <div class="layer" v-show="foldState"></div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      foldState: {
        type: Boolean
      }
    }
  };
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .layer
    position:fixed
    left:0
    bottom:4rem
    width:100%
    height:100%
    z-index:30
    background:rgba(0,0,0,0.2)
    &.layer-enter-active,&.layer-leave-active
      transition:all 0.3 fast
      backdrop-filter:blur(1px)
      opacity:0
    &.layer-enter,&.layer-leave-active
      backdrop-filter:blur(0)
      opacity:1
</style>
