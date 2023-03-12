<template>
    <div class="">

      <div class="d-flex justify-content-around">
        <NuxtLink class="link_grey" to="/register">назад</NuxtLink>
        <NuxtLink class="link" to="/register/search">вперед</NuxtLink>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'RegisterSearchPage', layout: 'register'
  }
  </script>
  <style scoped>
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
  