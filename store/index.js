import Vue from 'vue'
import Vuex from 'vuex'
import geo from './module/geo'
import home from './module/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    async nuxtServerInit({commit}, {req, app}) {
      const {
        status,
        data: {province, city}
      } = await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition', status === 200 ? {city, province} : {city: '', province: ''})
      const {
        status: status2,
        data: {menu}
      } = await app.$axios.get('/geo/menu')
      commit('home/setMenu', status2 === 200 ? menu : [])
      const {
        status: status3,
        data: {result}
      } = await app.$axios('/search/hotPlace', {
        params: {
          city: app.store.state.geo.position.city.replace('市', '')
        }
      })
      commit('home/setHotPlace', status3 === 200 ? result : [])
    }
  }
})

export default store
