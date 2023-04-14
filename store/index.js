import Cookies from 'js-cookie'
const requestHeaders = {
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
}
const url_base = 'http://4f75-95-165-9-250.ngrok-free.app'
export const state = () => ({
  user: {},
})
export const getters = {
  TOKEN: () => {
    return Cookies.get('token')
  },
  USER: (state) => {
    return state.user
  },
}
export const mutations = {
  SET_TOKEN: (state, payload) => {
    Cookies.set('token', payload)
  },
  DELETE_TOKEN: (state) => {
    Cookies.remove('token')
  },
  SET_USER: (state, payload) => {
    state.user = payload
  },
}
export const actions = {
  async registerUser(context, user) {
    const response = await this.$axios.$post(
      `${url_base}register`,
      user,
      requestHeaders
    )
    context.commit('SET_TOKEN', response[1])
    location.reload()
  },
  async login(context, user) {
    const response = await this.$axios.$post(
      `${url_base}login`,
      user,
      requestHeaders
    )
    context.commit('SET_TOKEN', response[1])
    location.reload()
  },
  async logout(context) {
    const response = await this.$axios.$post(`${url_base}logout`, null, {
      headers: { Authorization: Cookies.get('token') },
    })
    context.commit('DELETE_TOKEN')
    location.reload()
  },
}
