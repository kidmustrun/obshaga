<template>
  <div class="">
    <div class="row">
      <div
        class="col-md d-md-flex d-none justify-content-center flex-column align-items-center"
      >
        <img class="register_img" src="~/assets/register.svg" />
      </div>
      <div class="col-md d-flex justify-content-center">
        <div class="auth_form_container">
          <div class="auth_form">
            <input
              v-model="name"
              class="auth_input"
              type="text"
              id="name"
              name="name"
              @change="setUserData"
              required
              :readonly="name == ''"
              onfocus="this.removeAttribute('readonly')"
            />
            <span class="floating-label">имя</span>
            <span class="error-label"></span>
          </div>
          <div class="auth_form">
            <input
              v-model="surname"
              class="auth_input"
              type="text"
              id="surname"
              name="surname"
              @change="setUserData"
              required
              readonly
              :readonly="surname == ''"
              onfocus="this.removeAttribute('readonly')"
            />
            <span class="floating-label">фамилия</span>
            <span class="error-label"></span>
          </div>
          <div class="auth_form">
            <input
              v-model="login"
              @change="setUserData"
              class="auth_input"
              type="text"
              id="login"
              name="login"
              required
              readonly
              :readonly="login == ''"
              onfocus="this.removeAttribute('readonly')"
            />
            <span class="floating-label">логин</span>
            <span class="error-label"></span>
          </div>
          <div class="auth_form">
            <input
              v-model="birthday"
              class="auth_input"
              type="text"
              id="birthday"
              name="birthday"
              @change="setUserData"
              required
              onfocus="(this.type='date')"
              onblur="if(!this.value)this.type='text'"
            />
            <span class="floating-label">дата рождения</span>
            <span class="error-label"></span>
          </div>
          <div class="auth_form">
            <select
              v-model="faculty"
              class="auth_input"
              type="text"
              id="faculty"
              name="faculty"
              @change="setUserData"
              required
            >
              <option value="" disabled selected hidden></option>
              <option v-for="faculty in faculties" :value="faculty.id">{{ faculty.name }}</option>
            </select>
            <span class="floating-label">факультет</span>
            <span class="error-label"></span>
          </div>
          <div class="auth_form">
            <select
              v-model="direction"
              class="auth_input"
              type="text"
              id="direction"
              name="direction"
              @change="setUserData"
              required
            >
              <option value="" disabled selected hidden></option>
              <option v-for="direction in directionsFiltered" :value="direction.dir_id">
                {{ direction.name }}
              </option>
            </select>
            <span class="floating-label">направление</span>
            <span class="error-label"></span>
          </div>
          <div class="auth_form">
            <select
              v-model="course"
              class="auth_input"
              type="text"
              id="course"
              name="course"
              @change="setUserData"
              required
            >
              <option value="" disabled selected hidden></option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
            <span class="floating-label">курс</span>
            <span class="error-label"></span>
          </div>
          <div class="auth_form">
            <input
              class="auth_input"
              type="password"
              id="password"
              name="password"
              v-model="password"
              required
              readonly
              @change="setUserData"
              :readonly="password == ''"
              onfocus="this.removeAttribute('readonly')"
            />
            <span class="floating-label">пароль</span>
            <span class="error-label"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-around">
      <NuxtLink class="link_grey" to="/auth">назад</NuxtLink>
      <button
        @click="toSearch"
        class="link"
        :style="[warning ? { color: '#FF5A7B' } : { color: '#ddd' }]"
      >
        вперед
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  layout: 'register',
  head: {
    title: 'Общага | Регистрация',
  },
  middleware: 'user',
  data() {
    return {
      name: '',
      surname: '',
      login: '',
      birthday: '',
      faculty: '',
      direction: '',
      course: '',
      password: '',
      warning: false,
    }
  },
  created() {
    if (this.user.name) this.name = this.user.name
    if (this.user.surname) this.surname = this.user.surname
    if (this.user.login) this.login = this.user.login
    if (this.user.birthday) this.birthday = this.user.birthday
    if (this.user.faculty) this.faculty = this.user.faculty
    if (this.user.direction) this.direction = this.user.direction
    if (this.user.course) this.course = this.user.course
    if (this.user.password) this.password = this.user.password
    this.$store.commit('SET_USER', this.user)
    if (
      Object.values(this.user).every((item) => item != '') &&
      Object.values(this.user).some((item) => item != '')
    )
      this.warning = true
    else this.warning = false
    this.$store.dispatch('getFaculties')
    this.$store.dispatch('getDirections')
  },
  computed: {
    user() {
      return this.$store.getters.USER
    },
    faculties() {
      return this.$store.state.faculties
    },
    directions() {
      return this.$store.state.directions
    },
    directionsFiltered() {
      if (this.faculty) {
       const directionsFilteredTemp = this.directions.filter(
          direction => {
           return direction.f_id == this.faculty}
        )
        return directionsFilteredTemp
      }
    },
  },
  methods: {
    toSearch() {
      if (
        Object.values(this.user).every((item) => item != '') &&
        Object.values(this.user).some((item) => item != '')
      )
        this.$nuxt.$options.router.push('/register/search')
      else this.warning = false
    },
    setUserData() {
      this.$store.commit('SET_USER', {
        name: this.name,
        surname: this.surname,
        login: this.login,
        birthday: this.birthday,
        faculty: this.faculty,
        direction: this.direction,
        course: this.course,
        password: this.password,
      })
      if (
        Object.values(this.user).every((item) => item != '') &&
        Object.values(this.user).some((item) => item != '')
      )
        this.warning = true
      else this.warning = false
    },
  },
}
</script>
<style scoped>
.logo {
  width: 150px;
}
.register_img {
  width: 80%;
}
.auth_form_container {
  width: 80%;
}
.auth_form {
  font-weight: 300;
  position: relative;
}
.auth_input {
  border: none;
  border-bottom: 1px solid #838383;
  background-color: transparent;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  padding: 0;
  width: 100%;
  margin-bottom: 34px;
  box-sizing: border-box;
}
.auth_input:focus {
  outline: none;
}
.auth_input:focus ~ .floating-label,
.auth_input:not(:focus):valid ~ .floating-label {
  top: -18px;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  opacity: 1;
  color: #a0a0a4;
}

.floating-label {
  position: absolute;
  pointer-events: none;
  top: 0px;
  left: 0;
  font-weight: 400;
  font-size: 28px;
  line-height: 32px;
  transition: 0.2s ease all;
  color: #a0a0a4;
}
.error-label {
  font-weight: 400;
  font-size: 28px;
  line-height: 32px;
  color: #f55123;
}
.auth_input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 50px white inset; /* Change the color to your own background color */
  -webkit-text-fill-color: #000;
}

.auth_input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 50px white inset; /*your box-shadow*/
  -webkit-text-fill-color: #000;
}
.link_grey {
  color: #838383;
  font-size: 28px;
  line-height: 32px;
  text-decoration: underline #838383;
}
.link {
  color: #000;
  font-size: 28px;
  line-height: 32px;
}
.link:hover {
  color: #3d3d3d;
  text-decoration-color: #3d3d3d;
}
.link_grey:hover {
  color: #696969;
  text-decoration-color: #696969;
}
@media screen and (max-width: 577px) {
  .link_grey,
  .link {
    font-size: 24px;
  }
}
</style>
