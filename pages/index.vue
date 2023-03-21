<template>
  <div class="" data-app>
    <div class="container mt-3">
      <div class="d-flex justify-content-between align-items-center">
        <h1>Мои симпатии</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <span class="filters" v-bind="attrs" v-on="on"> Фильтры </span>
          </template>
          <v-list>
            <v-list-item v-for="filter in filters" :key="filter.id">
              <v-list-item-title
                :class="{ active: filter.isActive }"
                class="filter"
                @click="makeFilterActive(filter)"
                >{{ filter.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="pt-4">
        <Card
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
          :favorite="user.favorite"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'app',
  data: () => ({
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
      },
    ],
    filters: [
      {
        id: 1,
        title: 'Все',
        isActive: true,
      },
      {
        id: 2,
        title: 'Непрочитанные',
        isActive: false,
      },
      {
        id: 3,
        title: 'Избранные',
        isActive: false,
      },
    ],
   
  }),
  methods: {
    makeFilterActive(filter) {
      this.filters = this.filters.map((filter) => {
        filter.isActive = false
        return filter
      })
      this.filters.find((item) => item.id === filter.id).isActive = true
    },
  },
}
</script>
<style scoped>
h1 {
  font-size: 30px;
  font-weight: 600;
  line-height: 36px;
}
.filters {
  font-weight: 300;
  font-size: 24px;
  line-height: 28px;
  text-decoration-line: underline;
  color: #000000;
}
.filter {
  cursor: pointer;
}
.active {
  text-decoration-line: underline;
}
</style>
