<template>
  <div
    class="container-fluid d-flex flex-column justify-content-center align-items-center position-relative"
  >
    <img class="logo" src="~/assets/logo.svg" />
    <div class="mt-4 text-center">
      <div class="auth_form">
        <input
          class="auth_input"
          type="text"
          id="login"
          name="login"
          v-model="login"
          required
          readonly
          onfocus="this.removeAttribute('readonly')"
        />
        <span class="floating-label">логин</span>
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
          onfocus="this.removeAttribute('readonly')"
        />
        <span class="floating-label">пароль</span>
        <span class="error-label"></span>
      </div>
      <div class="mt-3">
        <button class="button-link" @click="sendLogin">войти</button>
      </div>
      <div class="mt-2">
        <NuxtLink class="link" to="/register">зарегистрироваться</NuxtLink>
      </div>
      <div class="mt-5 alert alert-danger" v-if="error">
        <span>{{ error }}</span>
      </div>
    </div>
    <NuxtLink class="link_grey about" to="auth/about">о приложении</NuxtLink>
    <OverlayLoader/>
  </div>
</template>

<script>
export default {
  name: 'AuthPage',
  head: {
    title: 'Общага | Авторизация',
  },
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    sendLogin() {
      this.$store.dispatch('login', {
        login: this.login,
        password: this.password,
        remember: true,
      })
      this.overlay=false;
    },
  },
  computed: {
    error() {
      return this.$store.state.error
    },
 
  },
}
</script>
<style scoped>
.container-fluid {
  height: 100vh;
}
.logo {
  max-width: 240px;
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
  font-size: 28px;
  line-height: 32px;
  margin-bottom: 34px;
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
.button-link {
  color: #ff5a7b;
  text-decoration: underline #ff5a7b;
  border: none;
  font-size: 28px;
  line-height: 32px;
  background-color: transparent;
}
.link_grey {
  color: #838383;
  font-size: 28px;
  line-height: 32px;
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
.about {
  position: absolute;
  bottom: 5vh;
}
</style>
