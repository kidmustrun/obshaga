<template>
    <div data-app>
      <v-app-bar class="header position-fixed">
        <v-app-bar-nav-icon
          class="d-md-none d-block"
          @click="drawer = true"
        ></v-app-bar-nav-icon>
  
        <NuxtLink to="/admin"><img class="logo" src="~/assets/logo.svg" /></br><b>Панель модератора</b></NuxtLink>
        <v-spacer></v-spacer>
        <button class="link_pink" @click="logout">выйти</button>
      </v-app-bar>
  
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        class="header_menu"
      >
        <v-list nav dense>
          <v-list-item-group>
            <NuxtLink to="/admin">
              <v-list-item>
                <v-list-item-title>Панель модератора</v-list-item-title>
              </v-list-item>
            </NuxtLink>
            <v-list-item>
            <button class="link_pink" @click="logout">выйти</button>
        </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModeratorHeader',
    data: () => ({
      drawer: false,
    }),
    methods:{
    logout() {
      this.$store.dispatch('logout')
    },
  }
  }

  </script>
  <style scoped>
  .header {
    background-color: #fff !important;
    box-shadow: none !important;
    z-index: 1000000 !important;
    height: 64px !important;
  }
  .header_menu {
    z-index: 10000000 !important;
  }
  .logo {
    height: 40px;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  .nuxt-link-exact-active {
    color: #000;
  }
  .link_pink {
  color: #ff5a7b;
  font-weight: 500;
  font-size: 24px;
}
.link_pink:hover {
  opacity: 0.95;
}
  </style>
  