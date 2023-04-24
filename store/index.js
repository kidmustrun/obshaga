import Cookies from 'js-cookie'
const requestHeaders = {
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
}
const url_base = 'https://7d1e-95-165-9-250.ngrok-free.app/'
export const state = () => ({
  user: {},
  users: [],
  faculties: [],
  directions: [],
  all_profiles: [],
  error: '',
  overlay: false,
  loader: false,
  auth: false,
  url_base: 'https://7d1e-95-165-9-250.ngrok-free.app',
  filters: [],
  interests: []
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
  SET_AUTH: (state, payload) => {
    state.auth = payload
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
  SET_OVERLAY: (state, payload) => {
    state.overlay = payload
  },
  SET_LOADER: (state, payload) => {
    state.loader = payload
  },
  SET_USERS: (state, payload) => {
    state.users = payload
  },
  SET_INTERESTS: (state, payload) => {
    state.interests = payload
  },
  SET_FACULTIES: (state, payload) => {
    state.faculties = payload
  },
  SET_FILTERS: (state, payload) => {
    state.filters = payload
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
    this.commit('SET_OVERLAY', true)
    this.$axios
      .$post(`${url_base}register`, data[0], requestHeaders)
      .then((response) => {
        this.commit('SET_USER_ID', response)
        data[1][0].id = response
        data[1][1].user_id = response
        this.dispatch('createProfile', data[1])
      })
      .catch((error) => {
        this.commit('SET_ERROR', error.response.data.error.errors)
        this.commit('SET_OVERLAY', false)
      })
  },
  async createProfile(context, data) {
    this.$axios
      .$post(`${url_base}reg/createProfile`, data[0], requestHeaders)
      .then(() => this.dispatch('loadPhoto', data[1]))
      .catch((error) => {
        context.commit('SET_ERROR', error.response.data.error.errors)
        context.commit('SET_OVERLAY', false)
      })
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
    context.commit('SET_OVERLAY', false)
    this.$router.push('/auth')
  },
  async login(context, user) {
    context.commit('SET_OVERLAY', true)
    this.$axios
      .$post(`${url_base}login`, user, requestHeaders)
      .then((response) => {
        context.commit('SET_TOKEN', response[1])
        context.commit('SET_AUTH', true)
        context.commit('SET_OVERLAY', false)
        this.$router.push('/')
      })
      .catch((error) => {
        context.commit('SET_ERROR', error.response.data[1])
        context.commit('SET_OVERLAY', false)
      })
  },
  async logout(context) {
    this.$axios
      .$post(`${url_base}logout`, null, {
        headers: { Authorization: Cookies.get('token') },
      })
      .then(() => {
        context.commit('SET_AUTH', false)
        context.commit('DELETE_TOKEN')
        this.$router.push('/auth').catch(() => {})
      })
  },
  async getUser(context) {
    const response = await this.$axios.$get(`${url_base}api/v1/user/full`, {
      headers: { Authorization: Cookies.get('token') },
    })
    context.commit('SET_USER', response)
    context.commit('SET_INTERESTS', response[2].interests)
    context.commit('SET_AUTH', true)
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
  async getFilters(context) {
    const response = await this.$axios.$get(
      `${url_base}interests`,
      requestHeaders
    )
    context.commit('SET_FILTERS', response)
  },
  async getAllProfiles() {
    const response = await this.$axios.$get(`${url_base}api/v1/allProfiles`, {
      headers: { Authorization: Cookies.get('token') },
    })
    context.commit('SET_ALL_PROFILES', response)
  },
}
