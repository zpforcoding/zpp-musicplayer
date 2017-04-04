/**
 * Created by ZPP on 2017/3/27.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
      audioShow: false,
      searchComShow: false,
      songComShow: false,
      playState: false,
      userPlayLists: [],
      songNowIndex: 0,
      loopFlag: false,
      orderState: 0 // 0顺序播放// 1单曲循环// 2随机播放
    },
  mutations: {
    playsong(state) {
      },
    putInPlayLists(state, song) {
      if (state.userPlayLists.length === 0) {
        state.userPlayLists.push(song);
        state.songNowIndex = 0;
      } else {
        let notInList = true;
        state.userPlayLists.forEach((i) => {
          if (song.id === i.id) {
            notInList = false;
            return notInList;
          }
        });
        if (notInList) {
          state.userPlayLists.push(song);
          state.songNowIndex = state.userPlayLists.length - 1;
        }
      }
    },
    miniPlayerShow(state) {
        state.audioShow = true;
    },
    searchShowFlag(state) {
      state.searchComShow = true;
    },
    songShowFlag(state) {
        state.songComShow = true;
    },
    songHideFlag(state) {
      state.songComShow = false;
    },
    playStateOn(state) {
        state.playState = true;
    },
    playStatePause(state) {
      state.playState = false;
    },
    playListSong(state, index) {
      state.songNowIndex = index;
    },
    nextSong(state) {
      state.orderState = 0;
      state.songNowIndex++;
      if (state.songNowIndex > state.userPlayLists.length - 1) {
        state.songNowIndex = 0;
      }
    },
    lastSong(state) {
      state.songNowIndex--;
      if (state.songNowIndex < 0) {
        state.songNowIndex = state.userPlayLists.length - 1;
      }
    },
    inOrderState(state) {
      state.orderState = 0;
    },
    loopState(state) {
      state.orderState = 1;
    },
    randomState(state) {
      state.orderState = 2;
    },
    randomPlay(state) {
      state.songNowIndex = Math.ceil(Math.random() * (state.userPlayLists.length - 1));
    },
    loopPlay(state) {
      state.songNowIndex = state.songNowIndex;
    },
    removeSong(state, index) {
      state.userPlayLists.splice(index, 1);
    }
  },
  actions: {
    playsong(context) {
      console.log('playsong');
        context.commit('playsong');
    },
    putInPlayLists(context, song) {
      console.log('putInPlayLists');
      context.commit('putInPlayLists', song);
    },
    miniPlayerShow(context) {
      console.log('miniPlayerShow');
        context.commit('miniPlayerShow');
    },
    searchShowFlag(context) {
      console.log('searchShowFlag');
      context.commit('searchShowFlag');
    },
    songShowFlag(context) {
      console.log('songShowFlag');
        context.commit('songShowFlag');
    },
    songHideFlag(context) {
      console.log('songHideFlag');
      context.commit('songHideFlag');
    },
    playStateOn(context) {
      console.log('playStateOn');
        context.commit('playStateOn');
    },
    playStatePause(context) {
      console.log('playStatePause');
      context.commit('playStatePause');
    },
    playListSong(context, index) {
      console.log('playListSong');
      context.commit('playListSong', index);
    },
    nextSong(context) {
      console.log('nextSong');
      context.commit('nextSong');
    },
    lastSong(context) {
      console.log('lastSong');
      context.commit('lastSong');
    },
    inOrderState(context) {
      console.log('inOrderState');
      context.commit('inOrderState');
    },
    loopState(context) {
      console.log('loopState');
      context.commit('loopState');
    },
    randomState(context) {
      console.log('randomState');
      context.commit('randomState');
    },
    randomPlay(context) {
      console.log('randomPlay');
      context.commit('randomPlay');
    },
    loopPlay(context) {
      console.log('loopPlay');
      context.commit('loopPlay');
    },
    removeSong(context, index) {
      console.log('removeSong');
      context.commit('removeSong', index);
    }
  },
  getters: {
    playNowSong(state) {
      return state.userPlayLists[state.songNowIndex];
    },
    userPlayLists(state) {
      return state.userPlayLists;
    },
    audioShowFlag(state) {
        return state.audioShow;
    },
    searchComShow(state) {
      return state.searchComShow;
    },
    songComShow(state) {
        return state.songComShow;
    },
    playState(state) {
        return state.playState;
    },
    loopFlag(state) {
      return state.loopFlag;
    },
    orderState(state) {
      return state.orderState;
    }
  }
});
