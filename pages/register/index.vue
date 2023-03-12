<template>
  <div class="">
    <div class="row">
      <div class="col-md d-md-flex d-none justify-content-center flex-column align-items-center">
        <img class="register_img" src="~/assets/register.svg" />
      </div>
      <div class="col-md d-flex justify-content-center">
        <div class="auth_form_container">
        <div class="auth_form">
          <input
            class="auth_input"
            type="text"
            id="name"
            name="name"
            required
            readonly
            onfocus="this.removeAttribute('readonly')"
          />
          <span class="floating-label">имя</span>
          <span class="error-label"></span>
        </div>
        <div class="auth_form">
          <input
            class="auth_input"
            type="text"
            id="surname"
            name="surname"
            required
            readonly
            onfocus="this.removeAttribute('readonly')"
          />
          <span class="floating-label">фамилия</span>
          <span class="error-label"></span>
        </div>
        <div class="auth_form">
          <input
            class="auth_input"
            type="text"
            id="login"
            name="login"
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
            type="text"
            id="birthday"
            name="birthday"
            required
            onfocus="(this.type='date')"
            onblur="if(!this.value)this.type='text'"
          />
          <span class="floating-label">дата рождения</span>
          <span class="error-label"></span>
        </div>
        <div class="auth_form">
          <select
            class="auth_input"
            type="text"
            id="faculty"
            name="faculty"
            required
          >
          <option value="" disabled selected hidden></option>
        <option>Информациооных технологий</option>
        <option>2</option>
        <option>3</option>
        </select>
          <span class="floating-label">факультет</span>
          <span class="error-label"></span>
        </div>
        <div class="auth_form">
          <select
            class="auth_input"
            type="text"
            id="course"
            name="course"
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
            required
            readonly
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
      <NuxtLink class="link" to="/register/search">вперед</NuxtLink>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RegisterPage', layout: 'register'
}
</script>
<style scoped>
.logo {
  width: 150px;
}
.register_img{
  width: 80%;
}
.auth_form_container{
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
</style>
