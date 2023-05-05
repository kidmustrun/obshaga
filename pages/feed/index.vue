<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Лента</h1>
    </div>
    <div class="pt-4 p-3" v-if="users[0]">
      <CardFeed 
        v-for="user in users"
        :key="user.id"
        :id="user.id"
        :src="user.photo.place"
        :name="user.name"
        :surname="user.surname"
        :date="user.year"
        :about="user.about"
        :direction="user.direction"
        :faculty="user.faculty"
        :filters="user.interests"
      />
    {{ users }}
    </div>
    <Loader v-else />
  </div>
</template>

<script>
export default {
  name: 'FeedPage',
  layout: 'app',
  head: {
    title: 'Общага | Лента',
  },
  middleware: 'auth',
  created() {
    this.$store.dispatch('getAllProfiles')
    this.$store.dispatch('getFilters')
  },
  destroyed(){
    this.$store.commit('SET_USERS', [])
  },
  computed: {
    users() {
      return this.$store.state.users
    },
    // srcs() {
    //   let arr = []
    //   if(this.users)
    //   for (user in this.users){
    //     if (user.photo.place)
    //       arr.push({
    //         id: user.id,
    //         photo: `${this.base_url}${this.user.photo.place}`,
    //       })
    //     else arr.push({ id: user.id, photo: require('~/assets/no_photo.svg') })}
    //   return arr
    // },
  },
  data: () => ({
    chatOpen: false,
  }),
}
</script>
<style>
h1 {
  font-size: 30px;
  font-weight: 600;
  line-height: 36px;
}
</style>
