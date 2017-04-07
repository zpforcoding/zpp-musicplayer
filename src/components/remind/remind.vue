<template>
  <transition name="main" enter-active-class="" leave-active-class="">
    <div class="remind-box">
      <span>{{info}}</span>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          info: {
            type: String,
            default: '已添加到播放列表'
          }
      },
      created() {
          console.log(this.info);
      }
  };
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .remind-box
    width: 180px
    height: 60px
    line-height:60px
    color:#FFF
    text-align:center
    background-color:rgba(76,76,76,0.8)
    border-radius:10px
    position:fixed
    top:50%
    left:50%
    margin-left: -90px
    margin-top: -30px
</style>
