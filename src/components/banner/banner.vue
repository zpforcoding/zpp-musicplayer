<template>
  <div class="banner">
      <div class="banner-box" :style="{transform:'translateX(-'+n+'%)',transition:speed}">
        <div class="banner-img" v-for="(img,index) in imgs" :style="{transform:'translateX('+index+'00%)'}"
          @touchstart="touchstart($event)"
          @touchmove="touchmove($event)"
          @touchend="touchend($event)"
        >
          <img :src="img.src" class="img">
        </div>
      </div>
      <div class="control-box">
        <ul class="circle-ul">
          <li class="circle-item" v-for="(item,index) in imgs" :class="{'on':index==on_index}">
          </li>
        </ul>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data() {
          return {
            imgs: [
              {
                src: 'http://p4.music.126.net/ZWitDwDDHNPOMSLadDgEYg==/3420580711233111.jpg'
              }, {
                src: 'http://p3.music.126.net/80905--U1SEboXSL6UgArA==/1421668548695431.jpg'
              }, {
                src: 'http://p4.music.126.net/s86fIMEuVlQa1Iw5o2Jb8w==/3416182637824600.jpg'
              }, {
                src: 'http://p4.music.126.net/Ygu7fqFUDvhvs1LQxYfSfA==/3416182637824593.jpg'
              }, {
                src: 'http://p4.music.126.net/4cp7AOk5WgbV3tNr_rgxdg==/2946691205461038.jpg'
              }
            ],
            n: 0,
            drag: {
                _n: '',
                _startX: '',
                _scrollWidth: '',
                _status: false,
                _length: ''
            },
            speed: '0.5s',
            on_index: 0
          };
      },
      methods: {
        touchstart(event) {
//          console.log('开始接触屏幕');
            let e = event || window.event;
            this.drag._n = this.n;
            this.drag._startX = e.touches[0].clientX;
            this.drag._scrollWidth = e.currentTarget.scrollWidth;
            this.drag._status = true;
            this.drag._length = this.imgs.length;
            this.speed = '0s';
        },
        touchmove(event) {
//            console.log('滑动屏幕');
          let e = event || window.event;
          let nowX = e.touches[0].clientX;
          let moveX = nowX - this.drag._startX;
          let percent = (moveX / this.drag._scrollWidth) * 100;
          if (this.n === 0 && moveX > 0) {
              console.log('!!!!');
              this.n = (this.drag._length - 1) * 100 - percent;
          } else if ((this.n === (this.drag._length - 1) * 100) && moveX < 0) {
              this.n = 0 - percent;
          } else {
              this.n = this.drag._n - percent;
          }
          e.preventDefault();
        },
        touchend(event) {
//            console.log('离开屏幕');
          this.n = this.drag._n;
          let e = event || window.event;
          let endX = e.changedTouches[0].clientX;
          let dragDistance = endX - this.drag._startX;
          if (dragDistance > this.drag._scrollWidth * 0.3) {
//              console.log('向右拖动大于二分之一');
            this.turnPrev();
          } else {
              if (Math.abs(dragDistance) > this.drag._scrollWidth * 0.3) {
//                console.log('向左拖动大于二分之一');
                this.turnNext();
              }
          }
          this.drag._status = false;
          this.speed = '0.5s';
        },
        turnNext() {
          if (this.n === (this.imgs.length - 1) * 100) {
              this.n = 0;
          } else {
              this.n += 100;
          }
          this.setStyle();
        },
        turnPrev() {
          if (this.n === 0) {
              this.n += (this.img.length - 1) * 100;
          } else {
              this.n -= 100;
          }
          this.setStyle();
        },
        setStyle() {
            this.on_index = parseInt(this.n / 100);
        },
        autoChange() {
           if (!this.drag._status) {
                this.turnNext();
           }
        }
      },
     created() {
          let that = this;
         setInterval(function() {
           that.autoChange();
         }, 3000);
      }

    };
</script>

<style lang='stylus' rel="stylesheet/stylus">
.banner
  position:relative
  left:0
  top:4rem
  width:100%
  height:14rem
  overflow:hidden
  .banner-box
    position:relative
    width:100%
    height:100%
    .banner-img
      position:absolute
      width:100%
      height:100%
      .img
        width:100%
        height:100%
  .control-box
    position:absolute
    left:50%
    bottom:10px
    margin-left:-65px
    overflow:hidden
    .circle-ul
      float:left
      .circle-item
        float:left
        width: 15px
        height: 15px
        border-radius:100%
        background:rgba(220,220,220,0.6)
        margin-right:8px
        &.on
          background:#eb3817
</style>
