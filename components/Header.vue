<template>
  <div data-app>
    <v-app-bar class="header position-fixed">
      <v-app-bar-nav-icon
        class="d-md-none d-block"
        @click="drawer = true"
      ></v-app-bar-nav-icon>

      <NuxtLink to="/"><img class="logo" src="~/assets/logo.svg" /></NuxtLink>
      <v-spacer></v-spacer>

      <NuxtLink to="/feed" class="d-md-inline-block d-none me-3"
        >Лента
      </NuxtLink>
      <NuxtLink to="/" class="d-md-inline-block d-none me-3"
        >Мои симпатии
      </NuxtLink>
      <NuxtLink to="/profile" class="d-md-inline-block d-none me-3"
        >Профиль
      </NuxtLink>
      <NuxtLink to="/about" class="d-md-inline-block d-none me-3"
        >О приложении
      </NuxtLink>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title>
              <NuxtLink to="/feed">Лента </NuxtLink></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <NuxtLink to="/">Мои симпатии </NuxtLink></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <NuxtLink to="/profile">Профиль </NuxtLink></v-list-item-title
            >
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <NuxtLink to="/about">О приложении </NuxtLink></v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: () => ({
    drawer: false,
  }),
}
</script>
<style scoped>
.header {
  background-color: #fff !important;
  box-shadow: none !important;
  z-index: 1000000 !important;
  height: 64px !important;
}
.logo {
  height: 56px;
}
a {
  text-decoration: none;
  color: #000;
}
.nuxt-link-exact-active {
  color: #ff5a7b;
  font-weight: 600;
}
</style>
