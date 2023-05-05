<template data-app>
  <div class="d-flex flex-row align-items-end">
    <v-card class="message p-3">
      <div class="d-flex flex-column flex-md-row">
        <div>
          <v-avatar
            class="ratio ratio-1x1 me-3"
            width="100%"
            height="auto"
            max-width="50px"
          >
            <v-img
              :src="srcFull"
              alt="Avatar"
              class="ratio ratio-1x1"
              width="100%"
              height="auto"
              max-width="50px" /></v-avatar
          >  
          <span class="name d-inline d-md-none">{{ name }}</span
          >
        </div>
        <div  class="mt-1">
          <span class="name d-none d-md-inline">{{ name }}</span
          ><br class="d-none d-md-inline">
          <span>{{ message }}</span>
        </div>
      </div>
    </v-card>
    <span class="grey-text m-1">{{ time }}</span>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: ['src', 'message', 'name', 'time'],
  computed: {
    base_url() {
      return this.$store.state.url_base
    },
    srcFull() {
      if (this.src) return `${this.base_url}${this.src}`
      else return require('~/assets/no_photo.svg')
    },
  },
}
</script>
<style scoped>
.message {
  display: inline-block;
  max-width: 50vw;
}
.name {
  font-size: 16px;
  font-weight: 600;
}
.grey-text {
  color: #ccc;
}
</style>
