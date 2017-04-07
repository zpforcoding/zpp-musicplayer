<template>
  <div class="header">
      <div class="header-wrapp">
        <span class="iconfont icon-menu">&#xe61d;</span>
        <div class="header-words">
          <span class="iconfont icon-words">&#xe601;</span> Belongs <span class="iconfont icon-words">&#xe601;</span>
        </div>
        <router-link to="/search"><span class="iconfont icon-search" @click="searchShowFlag()">&#xe672;</span></router-link>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from 'vuex';
    export default {
        methods: {
          ...mapActions([
              'searchShowFlag'
          ])
        }
    };
</script>

<style lang='stylus' rel="stylesheet/stylus">
  @import '../../assets/stylus/mixin.styl';
  .header-wrapp
    position:fixed
    left:0
    top:0
    width:100%
    height: 4rem
    background:$theme
    line-height:4rem
    display:flex
    justify-content:space-around
    align-content:space-around
    overflow:hidden
    z-index:100
    .iconfont
      display:inline-block
      color:#FFF
    .icon-menu,.icon-search
      flex:1
    .icon-menu
      padding-left:1rem
    .icon-search
      padding-right:1rem
    .header-words
      flex:2
      font-size:1.4rem
      color:#fff
</style>
