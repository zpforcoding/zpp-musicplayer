<template>
  <transition name="main" enter-active-class="animated bounceInUp">
  <div class="hot">
    <div class="hot-wrapper">
      <div class="hot-title">
        <span class="iconfont fire">&#xe64f;</span>
        <h1 class="title">热门歌单</h1>
      </div>
      <div class="hotul-fa">
        <ul class="hot-ul">
          <li class="hot-item" v-for="(list,index) in hostLists">
            <router-link :to="{name: 'hotplaylist',params:{id:list.id}}">
            <div class="earphone-hotsNum">
              <span class="iconfont earphone">&#xe6aa;</span>
              <span class="hotsNum">{{list.playCount > 10000 ? (Math.floor(list.playCount / 10000) + '万') : list.playCount}}</span>
            </div>
                <div class="poster-wrapper">
                 <img :src="list.coverImgUrl" class="poster">
                </div>
            <p class="poster-words">{{list.name}}</p>
          </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</transition>
</template>
<script type="text/ecmascript-6">
  import axios from 'axios';
  export default {
      data() {
        return {
            hostLists: []
        };
      },
        methods: {
            getHotList() {
              axios.get('/topPlaylists', {
                  params: {
                      limit: 30,
                      offset: 0
                  }
              }).then((response) => {
                    this.hostLists = response.data.playlists;
                }).catch((error) => {
                  console.log(error);
              });
            }
        },
        created() {
            this.getHotList();
        }
  };
</script>

<style lang='stylus' rel="stylesheet/stylus">
  .hot
    position:relative
    top: 4.2rem
    left:0
    margin-top:3rem
    width:100%
    .hot-title
      padding-left:0.4rem
      .fire
        color:#e83817
      .title
        display:inline-block
    .hot-ul
      width:100%
      margin-top:0.5rem
      font-size:0
      display:flex
      flex-flow:row wrap
      align-content: space-around
      justify-content:space-around
      .hot-item
       position:relative
       display:inline-block
       flex:0 0 31.5%
      .poster
        width:100%
        height:100%
       .poster-words
         display:inline-block
         font-size:0.9rem
         color:#333
         text-indent:1rem
         line-height:1.2rem
        .earphone-hotsNum
            font-size:0.8rem
            position:absolute
            left: 0.1rem
            top:0.3rem
            color:#FFF
</style>
