// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import search from './components/search/search';
import song from './components/song/song';
import hotplaylist from './components/hotplaylist/hotplaylist';
import hotartists from './components/hotartists/hotartists';
import recommend from './components/recommend/recommend';
import biaoge from './components/biaoge/biaoge';
import Router from 'vue-router';
import store from './store';
Vue.use(Router);
Vue.config.productionTip = false;
// 定义一个时间戳过滤器
Vue.filter('durationChange', (currentTime) => {
  let minute = currentTime / 1000 / 60;
  minute = parseInt(minute);
  if (minute < 10) {
    minute = '0' + minute;
  }
  let seconds = currentTime / 1000 % 60;
  seconds = parseInt(seconds);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  let currentTimeDis = minute + ':' + seconds;
  return currentTimeDis;
});
const routes = [
  {
      path: '/search',
      component: search,
      name: 'search'
  },
  {
    path: '/song',
    component: song,
    name: 'song'
  },
  {
    path: '/hotplaylist/:id',
    component: hotplaylist,
    name: 'hotplaylist'
  },
  {
    path: '/hotartist',
    component: hotartists,
    name: 'hotartist'
  },
  {
    path: '/recommend',
    component: recommend,
    name: 'recommend'
  },
  {
    path: '/biaoge',
    component: biaoge,
    name: 'biaoge'
  }
];

const router = new Router({
  routes
});

const routerApp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
export default routerApp;
