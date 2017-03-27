// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import search from './components/search/search';
import song from './components/song/song';
import playlist from './components/playlist/playlist';
import Router from 'vue-router';
import store from './store';
Vue.use(Router);
Vue.config.productionTip = false;
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
    path: '/playlist/:id',
    component: playlist,
    name: 'playlist'
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
