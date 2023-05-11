<template>
    <div class="app" id="app">
      <ModeratorHeader></ModeratorHeader>
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
  .chat_panel .v-navigation-drawer__content{
    margin-top: 64px;
  }
  .v-navigation-drawer__content {
  
    height: calc(100vh - 64px) !important;
    z-index: 1000 !important;
  }
  .v-list-item--active  .v-list-item__subtitle{
    color: #ffffff;
  } 
  .v-overlay{
    z-index: 5 !important;
  }
  .theme--light.v-tabs > .v-tabs-bar{
    background-color: transparent !important;
  }
  </style>
  