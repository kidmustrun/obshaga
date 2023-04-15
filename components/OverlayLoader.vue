<template>
  <v-overlay :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'OverlayLoader',
  computed: {
    overlay() {
      return this.$store.state.overlay
    },
  },
}
</script>
