import Cookies from 'js-cookie'
const requestHeaders = {
  'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
}
const url_base = 'https://e743-95-165-9-250.ngrok-free.app/'
export const state = () => ({
  user: {},
  users: [],
  faculties: [],
  directions: [],
  error: '',
  overlay: false,
  loader: false,
  auth: false,
  url_base: 'https://e743-95-165-9-250.ngrok-free.app',
  filters: [],
  interests: [],
  genders: [],
  about: '',
  liked: [],
  who_liked_me: [],
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
  DELETE_USER_WITH_LIKE: state => id => {
    return state.users.filter((user) => user.id != id)
  }
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
  SET_GENDERS: (state, payload) => {
    state.genders = payload
  },
  SET_ABOUT: (state, payload) => {
    state.about = payload
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
  SET_LIKED: (state, payload) => {
    state.liked = payload
  },
  SET_WHO_LIKED_ME: (state, payload) => {
    state.who_liked_me = payload
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
    context.commit('SET_LOADER', true)
    const response = await this.$axios.$get(`${url_base}api/v1/user/full`, {
      headers: { Authorization: Cookies.get('token') },
    })
    context.commit('SET_USER', response)
    context.commit('SET_ABOUT', response[1][0].about)

    context.commit('SET_GENDERS', response[1][0].prefer_gender)
    context.commit('SET_INTERESTS', response[2].interests)
    context.commit('SET_AUTH', true)
    context.commit('SET_LOADER', false)
  },
  async updateUser(context, user) {
    context.commit('SET_OVERLAY', true)
    if (user.about) {
      const responseAbout = await this.$axios.$post(
        `${url_base}api/v1/user/updateAbout`,
        user.about,
        {
          headers: { Authorization: Cookies.get('token') },
        }
      )
    }
    if (user.interests) {
      console.log(user)
      const responseInterests = await this.$axios.$post(
        `${url_base}api/v1/user/updateInterests`,
        user.interests,
        {
          headers: { Authorization: Cookies.get('token') },
        }
      )
    }
    if (user.image) {
      let formData = new FormData()
      formData.append('image', user.image)
      const responsePhoto = await this.$axios.$post(
        `${url_base}api/v1/user/addPhoto`,
        formData,
        {
          headers: { Authorization: Cookies.get('token') },
        }
      )
    }
    context.dispatch('getUser')
    context.commit('SET_OVERLAY', false)
    // location.reload()
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
  async getAllProfiles(context) {
    context.commit('SET_LOADER', true)
    const response = await this.$axios.$post(
      `${url_base}api/v1/allProfiles`,
      {},
      {
        headers: { Authorization: Cookies.get('token') },
      }
    )
    context.commit('SET_USERS', response)
    context.commit('SET_LOADER', false)
  },
  setLike(context, { id, message }) {
    this.$axios
      .$post(
        `${url_base}api/v1/setLike/${id}`,
        {},
        {
          headers: { Authorization: Cookies.get('token') },
        }
      )
      .then(() => {
        context.commit('SET_USERS', context.getters.DELETE_USER_WITH_LIKE(id))
        context.dispatch('getAllProfiles')
        // context.dispatch('startChat', { id: id, message: message })
      })
  },
  startChat(context, { id, message }) {
    this.$axios
      .$post(
        `${url_base}api/v1/chatAPI/startChat/${id}`,
        {},
        {
          headers: { Authorization: Cookies.get('token') },
        }
      )
      .then((response) =>
        context.dispatch('sendMessage', { chat_id: response, message: message })
      )
  },
  async sendMessage(context, { chat_id, message }) {
    const response = await this.$axios.$post(
      `${url_base}api/v1/chatAPI/sendMessage/chat/${chat_id}`,
      { message: message },
      {
        headers: { Authorization: Cookies.get('token') },
      }
    )
  },
  async getLiked(context) {
    context.commit('SET_LOADER', true)
    const response = await this.$axios
      .$post(
        `${url_base}api/v1/getLiked`,
        {},
        {
          headers: { Authorization: Cookies.get('token') },
        }
      )
      .then((response) => {
        console.log(response)
        context.commit('SET_LIKED', response)
        context.commit('SET_LOADER', false)
      })
  },
  async getWhoLikedMe(context) {
    context.commit('SET_LOADER', true)
    this.$axios
      .$post(
        `${url_base}api/v1/getWhoLikedMe`,
        {},
        {
          headers: { Authorization: Cookies.get('token') },
        }
      )
      .then((response) => {
        console.log(response)
        context.commit('SET_WHO_LIKED_ME', response)
        context.commit('SET_LOADER', false)
      })
  },
}
