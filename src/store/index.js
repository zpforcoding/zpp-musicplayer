/**
 * Created by ZPP on 2017/3/27.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
      song: 2
    },
  mutations: {
      playsong(state, song) {
          state.song = song;
      }
  },
  actions: {
      playsong(context, song) {
        context.commit('playsong', song);
      }
  },
  getters: {
      play(state) {
        console.log(state.song);
        return state.song.mp3Url;
      }
  }
});
