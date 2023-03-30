<template>
  <div class="app" id="app">
    <Header></Header>
    <div class="root">
      <Nuxt />
  </div>
</div>
</template>

<style>
.app {
  background-color: #f5f5f5;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow: auto !important;
  box-sizing: border-box;
}
.root{
  padding-top: 64px;
}
html{
    overflow: auto !important;
}
.v-navigation-drawer__content {
  height: calc(100vh - 64px) !important;
  z-index: 1000 !important;
}
.v-list-item--active  .v-list-item__subtitle{
  color: #ffffff !important;
} 
</style>
