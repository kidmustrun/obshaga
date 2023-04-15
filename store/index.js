import Cookies from 'js-cookie'
const requestHeaders = {
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
}
const url_base = 'https://f7a5-95-165-9-250.ngrok-free.app/'
export const state = () => ({
  user: {},
  users: [],
  faculties: [],
  directions: [],
  all_profiles: [],
  error: '',
})
export const getters = {
  TOKEN: () => {
    return Cookies.get('token')
  },
  USER: (state) => {
    return state.user
  },
  ERROR: (state) => {
    return state.error
  },
  USER_ID: (state) => {
    return state.user.id
  },
}
export const mutations = {
  SET_TOKEN: (state, payload) => {
    Cookies.set('token', payload)
  },
  DELETE_TOKEN: (state) => {
    Cookies.remove('token')
  },
  SET_ERROR: (state, payload) => {
    state.error = payload
  },
  SET_USER: (state, payload) => {
    state.user = payload
  },
  SET_USER_ID: (state, payload) => {
    state.user.id = payload
  },
  SET_USERS: (state, payload) => {
    state.users = payload
  },
  SET_FACULTIES: (state, payload) => {
    state.faculties = payload
  },
  SET_DIRECTIONS: (state, payload) => {
    state.directions = payload
  },
  SET_ALL_PROFILES: (state, payload) => {
    state.all_profiles = payload
  },
}
export const actions = {
  async registerUser({ commit, dispatch }, data) {
    const response = await this.$axios.$post(
      `${url_base}register`,
      data[0],
      requestHeaders
    )
    this.commit('SET_USER_ID', response)
    data[1][0].id = response
    data[1][1].user_id = response
    this.dispatch('createProfile', data[1])
  },
  async createProfile(context, data) {
    const response = await this.$axios.$post(
      `${url_base}reg/createProfile`,
      data[0],
      requestHeaders
    )
    // context.commit('SET_TOKEN', response[1])
    this.dispatch('loadPhoto', data[1])
  },
  async loadPhoto(context, photo) {
    let user = photo.user_id
    delete photo.user_id
    let formData = new FormData()
    formData.append('image', photo.image)
    const response = await this.$axios.$post(
      `${url_base}addUserPhoto/${user}`,
      formData,
      { 'Content-Type': 'multipart/form-data' }
    )
    this.$router.push('/auth')
  },
  async login(context, user) {
    this.$axios
      .$post(`${url_base}login`, user, requestHeaders)
      .then((response) => {
        context.commit('SET_TOKEN', response)
        this.$router.push('/')
        location.reload()
      })
      .catch((error) => context.commit('SET_ERROR', error.response.data[1]))
  },
  async logout(context) {
    // const response = await this.$axios.$post(`${url_base}logout`, null, {
    //   headers: { Authorization: Cookies.get('token') },
    // })
    context.commit('DELETE_TOKEN')
    location.reload()
  },
  async getUser(context) {
    const response = await this.$axios.$get(`${url_base}user`, {
      headers: { Authorization: Cookies.get('token') },
    })
    context.commit('SET_USER', response)
  },
  async getFaculties(context) {
    const response = await this.$axios.$get(
      `${url_base}faculties`,
      requestHeaders
    )
    context.commit('SET_FACULTIES', response)
  },
  async getDirections(context) {
    const response = await this.$axios.$get(
      `${url_base}directions`,
      requestHeaders
    )
    context.commit('SET_DIRECTIONS', response)
  },
  async getAllProfiles() {
    const response = await this.$axios.$get(`${url_base}api/v1/allProfiles`, {
      headers: { Authorization: Cookies.get('token') },
    })
    context.commit('SET_ALL_PROFILES', response)
  },
}
