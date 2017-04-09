<template>
    <div class="circle">
      <div class="circle-wrapper">
        <div class="circle-box">
          <router-link :to="{name: 'biaoge'}">
          <div class="out-circle green">
            <span class="iconfont">&#xecc3;</span>
          </div>
          </router-link>
          <p class="words">飙歌榜</p>
        </div>
        <div class="circle-box ">
          <router-link :to="{name: 'recommend'}">
            <div class="out-circle blue">
            <span class="iconfont">&#xe603;</span>
          </div>
          </router-link>
          <p class="words">每日推荐</p>
        </div>
          <div class="circle-box ">
            <router-link :to="{name: 'hotartist'}">
              <div class="out-circle red">
                <span class="iconfont">&#xe63a;</span>
              </div>
            </router-link>
            <p class="words">热门歌手</p>
          </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
  };
</script>

<style lang='stylus' rel="stylesheet/stylus">
.circle-wrapper
  position:relative
  left:0
  top:3.8rem
  width:100%
  height:4rem
  display:flex
  z-index:98
  .circle-box
    flex:1
    text-align:center
    display:inline-block
    position:relative
    margin-top:0.8rem
    .out-circle
      position:absolute
      left:50%
      top:0
      margin-left:-2rem
      width:4rem
      height:4rem
      line-height:4rem
      border-radius:100%
      color:#FFF
      font-size:20px
    .green
      background:#3b977c
    .blue
      background:#407ac5
    .red
      background:#e83817
    .words
      display:inline-block
      position:relative
      top:4.6rem
      left:0.2rem
      color:#555
</style>
