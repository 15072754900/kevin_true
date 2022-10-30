import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',

    userInfo: {
      username: ''
    }
  },
  getters: {
  },
  mutations: {
    updateToken (state, value) {
      state.token = value
    },
    updateUserInfo (state, info) {
      // state.nickname = info.nickname,
      // state.email = info.email,
      // state.username = info.username
      state.userInfo = info
    }
  },
  actions: {
    async getUserInfoActions (store) {
      const res = await getUserInfoAPI()
      console.log(res)
      store.commit('updateUserInfo', res.data.data)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
