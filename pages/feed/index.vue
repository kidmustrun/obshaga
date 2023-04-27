<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <h1>Лента</h1>
    </div>
    <div class="pt-4 p-3">
      <CardFeed
        v-for="user in users"
        :key="user.id"
        :src="user.photo.place"
        :name="user.name"
        :surname="user.surname"
        :date="user.year"
        :about="user.about"
        :direction="user.direction"
        :faculty="user.faculty"
        :filters="user.interests"
      />
      <Loader />
    </div>
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
    // users: [
    //   {
    //     id: 1,
    //     name: 'Ирина',
    //     surname: 'Громова',
    //     date: '13.01.2002',
    //     about: 'Ищу друзей по программированию и буду рада новым знакомствам',
    //     course: 4,
    //     photo_url:
    //       'https://sun1-27.userapi.com/impg/m_uavZ5HEm_Oa_jBKbBVhXRHKBjioxe-R-E9zg/5di_I3euAIY.jpg?size=1620x2160&quality=95&sign=641eeefc25e16874383e3364e0991550&type=album',
    //     faculty: 'Информационных технологий',
    //     filters: [
    //       {
    //         name: 'дружба',
    //         color: '#FF9F5A',
    //       },
    //       {
    //         name: 'помощь по учёбе',
    //         color: '#A35AFF',
    //       },
    //       {
    //         name: 'любовь',
    //         color: '#FF5A7B',
    //       },
    //     ],
    //     favorite: false,
    //     unread: true,
    //   },
    //   {
    //     id: 2,
    //     name: 'Ирина',
    //     surname: 'Громова',
    //     date: '13.01.2002',
    //     about: 'Ищу друзей по программированию и буду рада новым знакомствам',
    //     course: 4,
    //     photo_url:
    //       'https://sun1-27.userapi.com/impg/m_uavZ5HEm_Oa_jBKbBVhXRHKBjioxe-R-E9zg/5di_I3euAIY.jpg?size=1620x2160&quality=95&sign=641eeefc25e16874383e3364e0991550&type=album',
    //     faculty: 'Информационных технологий',
    //     filters: [
    //       {
    //         name: 'дружба',
    //         color: '#FF9F5A',
    //       },
    //       {
    //         name: 'помощь по учёбе',
    //         color: '#A35AFF',
    //       },
    //       {
    //         name: 'любовь',
    //         color: '#FF5A7B',
    //       },
    //     ],
    //   },
    // ],
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
