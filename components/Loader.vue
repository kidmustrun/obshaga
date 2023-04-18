<template>
  <div class="text-center" v-if="loader">
    <v-progress-circular
      :size="70"
      :width="7"
      indeterminate
    ></v-progress-circular>
  </div>
</template>
<script>
export default {
  name: 'Loader',
  computed: {
    loader() {
      return this.$store.state.loader
    },
  },
}
</script>
