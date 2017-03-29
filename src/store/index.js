/**
 * Created by ZPP on 2017/3/27.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
      nowSong: '',
      audioShow: false,
      songComShow: false
    },
  mutations: {
      playsong(state, song) {
          state.nowSong = song;
      },
      miniPlayerShow(state) {
        state.audioShow = true;
    },
    songShowFlag(state) {
        state.songComShow = true;
    }
  },
  actions: {
      playsong(context, song) {
        context.commit('playsong', song);
      },
      miniPlayerShow(context) {
        context.commit('miniPlayerShow');
    },
    songShowFlag(context) {
        context.commit('songShowFlag');
    }
  },
  getters: {
      play(state) {
        console.log(state);
        return state.nowSong;
      },
    audioShowFlag(state) {
        return state.audioShow;
    },
    songComShow(state) {
        return state.songComShow;
    }
  }
});
