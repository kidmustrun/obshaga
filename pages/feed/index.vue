<template>
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h1>Лента</h1>
      </div>
      <div class="pt-4 p-3">
        <CardFeed
          v-for="user in users"
          :key="user.id"
          :src="user.photo_url"
          :name="user.name"
          :surname="user.surname"
          :date="user.date"
          :about="user.about"
          :course="user.course"
          :faculty="user.faculty"
          :filters="user.filters"
        />
      </div>
    </div>
</template>

<script>
export default {
  name: 'FeedPage',
  layout: 'app',
  data: () => ({
    chatOpen: false,
    users: [
      {
        id: 1,
        name: 'Ирина',
        surname: 'Громова',
        date: '13.01.2002',
        about: 'Ищу друзей по программированию и буду рада новым знакомствам',
        course: 4,
        photo_url:
          'https://sun1-27.userapi.com/impg/m_uavZ5HEm_Oa_jBKbBVhXRHKBjioxe-R-E9zg/5di_I3euAIY.jpg?size=1620x2160&quality=95&sign=641eeefc25e16874383e3364e0991550&type=album',
        faculty: 'Информационных технологий',
        filters: [
          {
            name: 'дружба',
            color: '#FF9F5A',
          },
          {
            name: 'помощь по учёбе',
            color: '#A35AFF',
          },
          {
            name: 'любовь',
            color: '#FF5A7B',
          },
        ],
        favorite: false,
        unread: true,
      },
      {
        id: 2,
        name: 'Ирина',
        surname: 'Громова',
        date: '13.01.2002',
        about: 'Ищу друзей по программированию и буду рада новым знакомствам',
        course: 4,
        photo_url:
          'https://sun1-27.userapi.com/impg/m_uavZ5HEm_Oa_jBKbBVhXRHKBjioxe-R-E9zg/5di_I3euAIY.jpg?size=1620x2160&quality=95&sign=641eeefc25e16874383e3364e0991550&type=album',
        faculty: 'Информационных технологий',
        filters: [
          {
            name: 'дружба',
            color: '#FF9F5A',
          },
          {
            name: 'помощь по учёбе',
            color: '#A35AFF',
          },
          {
            name: 'любовь',
            color: '#FF5A7B',
          },
        ],
      },
    ],
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
