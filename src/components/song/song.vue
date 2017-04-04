<template>
  <transition name="main" enter-active-class="animated rollIn" leave-active-class="animated rollOut">
    <div class="song" v-if="songComShow">
      <div class="song-wrapper">
        <div class="content-head">
          <router-link to="../"><span class="iconfont back" @click="offInterval(),songHideFlag()">&#xe602;</span></router-link>
          <div class="song-info">
            <p class="song-name">{{playNowSong.name}}</p>
            <span class="singer" v-for="artists in playNowSong.artists">{{artists.name}} </span>
          </div>
        </div>
        <div class="content-lrc">
          <div class="song-circle" ref="circlebig">
            <img :src="playNowSong.album.picUrl+'?param=400y400'" class="img">
          </div>
          <div class="lrc-container" >
            <ul class="lrc-box" ref="box" id="lrcBox"></ul>
          </div>
        </div>
        <div class="content-player">
          <div class="song-duration"><span class="alreadyTime" ref="current">0:00</span><span class="duration">{{playNowSong.duration | durationChange}}</span></div>
          <div class="control-box">
            <div class="song-bottom">
              <div class="song-order">
                <span class="iconfont play-order" v-show="orderState === 0"  @click="orderBoxShow()">&#xe630;</span>
                <span class="iconfont play-order" v-show="orderState === 1" @click="orderBoxShow()">&#xe62f;</span>
                <span class="iconfont play-order" v-show="orderState === 2" @click="orderBoxShow()">&#xe680;</span>
                <div class="order-box" v-show="orderBoxFlag">
                  <p class="order-item" :class="{'active':orderState === 0}" @click="orderPlaySong()">顺序播放</p>
                  <p class="order-item" :class="{'active':orderState === 1}" @click="singlePlaySong()">单曲循环</p>
                  <p class="order-item" :class="{'active':orderState === 2}" @click="randomPlaySong()">随机播放</p>
                </div>
              </div>
              <div class="pause-goon">
                <span class="iconfont" @click="lastPlay()">&#xe616;</span>
                <span class="iconfont" v-show="!playState" @click="playGoOn()">&#xe60a;</span>
                <span class="iconfont" v-show="playState" @click="playPause()">&#xe669;</span>
                <span class="iconfont" @click="nextPlay()">&#xe600;</span>
              </div>
              <div class="song-list">
                <span class="iconfont">&#xe610;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import {mapGetters, mapActions} from 'vuex';
  let bigCicleTimer;
  let currentTimer;
  let DEG = 1;
    export default {
        data() {
          return {
            orderShow: true,
            singleShow: false,
            randomShow: false,
            orderBoxFlag: false,
            lyricChangeBefore: [],
            lyricChangeAfter: []
          };
        },
        computed: {
          ...mapGetters([
             'playNowSong', 'songComShow', 'playState', 'orderState'
          ])
        },
      created() {
            console.log('请求歌词');
            this.getSongLrc();
      },
      methods: {
        ...mapActions([
          'playStateOn', 'playStatePause', 'nextSong', 'lastSong', 'inOrderState', 'loopState', 'randomState', 'songHideFlag'
        ]),
        rotateCircle() {
          bigCicleTimer = setInterval(() => {
            this.$refs.circlebig.style.transform = `rotateZ(${DEG}deg)`;
            DEG += 1;
          }, 100);
        },
        currentTimeChange(currentTime) {
            let minute = currentTime / 60;
              minute = parseInt(minute);
            if (minute < 10) {
                minute = '0' + minute;
            }
            let seconds = currentTime % 60;
            seconds = parseInt(seconds);
            if (seconds < 10) {
              seconds = '0' + seconds;
            }
            let currentTimeDis = minute + ':' + seconds;
            return currentTimeDis;
        },
        currentTimeDis() {
          currentTimer = setInterval(() => {
            this.$refs.current.innerHTML = this.currentTimeChange(document.getElementById('audio').currentTime);
          }, 1000);
        },
        offInterval() {
          clearInterval(bigCicleTimer);
          clearInterval(currentTimer);
        },
        playGoOn() {
          document.getElementById('audio').play();
          this.playStateOn();
        },
        playPause() {
          console.log(123123123123);
          document.getElementById('audio').pause();
          this.playStatePause();
        },
        lrcMove() {
          let str = '';
          for (let j = 0; j < this.lyricChangeAfter.length; j++) {
            str += `<li class='lrc-item'>${this.lyricChangeAfter[j][1]}</li>`;
          }
          this.$refs.box.innerHTML = str;
          let audioObj = document.getElementById('audio');
          audioObj.ontimeupdate = () => {
            for (var i = 0; i < this.lyricChangeAfter.length; i++) {
                if (audioObj.currentTime > this.lyricChangeAfter[i][0]) {
                  if (this.songComShow) {
                    this.$refs.box.style.top = -i * 35.2 + 7 + 'px';
                    this.$refs.box.getElementsByTagName('li')[i].style.color = '#444';
                    if (audioObj.ended) {
                      console.log('播放完了');
                      document.getElementById('lrcBox').innerHTML = '';
                      this.getSongLrc();
                    }
                  }
                }
            }
          };
        },
        getSongLrc() {
            let id = this.playNowSong.id;
            axios.get('/lrc', {
                params: {
                    id: id
                }
            }).then((response) => {
               this.lyricChangeBefore = response.data.lrc.lyric.split('\n');
                let length = this.lyricChangeBefore.length;
                this.lyricChangeAfter = [];
                for (let i = 0; i < length; i++) {
                  var d = this.lyricChangeBefore[i].match(/\[\d{2}:\d{2}.\d{3}\]/g);  // 正则匹配播放时间
                  var t = this.lyricChangeBefore[i].split(d); // 以时间为分割点分割每行歌词，数组最后一个为歌词正文
                  if (d != null) { // 过滤掉空行等非歌词正文部分
                    // 换算时间，保留两位小数
                    let dt = String(d).split(':');
                    let _t = parseInt(dt[0].split('[')[1]) * 60 + parseFloat(dt[1].split(']')[0]);
                    this.lyricChangeAfter.push([_t, t[1]]);
                  }
                }
              this.lrcMove();
            }).catch((error) => {
                console.log(error);
            });
        },
        orderBoxShow() {
            this.orderBoxFlag = !this.orderBoxFlag;
        },
        orderPlaySong() {
          this.orderShow = true;
          this.singleShow = false;
          this.randomShow = false;
          this.orderBoxFlag = false;
          this.inOrderState();
        },
        singlePlaySong() {
          this.singleShow = true;
          this.orderShow = false;
          this.randomShow = false;
          this.orderBoxFlag = false;
          this.loopState();
        },
        randomPlaySong() {
          this.randomShow = true;
          this.orderShow = false;
          this.singleShow = false;
          this.orderBoxFlag = false;
          this.randomState();
        },
        lastPlay() {
            this.lastSong();
            this.playStateOn();
        },
        nextPlay() {
          this.nextSong();
          this.playStateOn();
        }
      },
      watch: {
        playState() {
            if (this.playState) {
              this.rotateCircle();
              this.currentTimeDis();
              this.getSongLrc();
            } else {
              this.offInterval();
            }
        },
        playNowSong() {
          console.log(this.playNowSong.id);
          this.getSongLrc();
        },
        deep: true
      },
      mounted() {
            if (this.playState) {
              this.rotateCircle();
              this.currentTimeDis();
              this.getSongLrc();
            }
      }
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
      width:100%
      height:50%
      .song-circle
        position:relative
        width: 18rem
        height: 18rem
        margin:10px auto
        border-radius:100%
        overflow:hidden
        .img
          width:100%
          height:100%
      .lrc-container
        position:relative
        width:100%
        margin:0 auto
        height:6.8rem
        text-align:center
        color: #FFF
        overflow:hidden
        font-size:1.2rem
        font-family:Consolas!important
        line-height:2.2rem
        .lrc-box
          width:100%
          position:absolute
          top:7px
          left:50%
          margin-left:-50%
          li
            width:100%
            text-align:center
            color:#FFF

    .content-player
      position:fixed
      bottom:0
      left:0
      width:100%
      margin-top:20px
      height:90px
      .song-duration
        position:relative
        width:70%
        margin:0 auto
        height:2px
        margin-top:10px
        background:#FFF
        .duration
          position:absolute
          right:-3rem
          top:-0.4rem
          color:#FFF
        .alreadyTime
          position:absolute
          left:-3rem
          top:-0.4rem
          color:#FFF
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
          .order-box
            position:absolute
            top: -7rem
            let:2rem
            border:1px solid #FFF
            border-radius:5px
            .order-item
              padding:0.5rem
              font-size:1rem
              border-bottom:1px solid #FFF
              &.active
                color:#444
          span
            padding:8px
            font-size:2.5rem
        .pause-goon
          span
            padding:8px
            font-size:2.5rem
        .song-list
          color:#FFF
</style>
