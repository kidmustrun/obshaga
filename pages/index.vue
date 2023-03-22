<template>
  <div
    class="position-relative"
    data-app
    style="min-height: calc(100vh - 64px)"
  >
    <button
      class="chat_btn"
      :class="{ chat_btn_open: chatOpen }"
      @click="chatOpen = !chatOpen"
    >
      <v-icon v-if="chatOpen" class="chat_icon float-end">mdi-close</v-icon>
      <v-icon v-else class="chat_icon float-end">mdi-email-outline</v-icon>
    </button>
    <v-navigation-drawer v-model="chatOpen" absolute class="chat_panel">
      <v-list nav dense>
        <v-list-item-group
        >
          <v-list-item v-for="user in users" :key="user.id" two-line class="mx-auto">
            <v-list-item-avatar>
              <v-img :src="user.photo_url"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="ms-2">
              <v-list-item-title>{{ user.name }} {{ user.surname }}, {{ user.date }}</v-list-item-title>
            <v-list-item-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore perferendis ipsam, odit provident velit consectetur, quam sint maiores illum ducimus illo, alias praesentium quia neque! Totam molestias error, ea soluta similique nam libero numquam blanditiis laboriosam deserunt! Eveniet minima doloremque neque facilis beatae dolorem, error distinctio et? Voluptates, minus veritatis! Enim dolores pariatur error, tenetur doloribus sunt ab nisi dolorum earum laudantium impedit perspiciatis praesentium et ut officia odio doloremque voluptas soluta quam molestias iste eius repellat? Asperiores provident minus atque iste? Eos a minima eveniet fugiat expedita magni sint ut maiores totam? Possimus voluptatum optio dolores ad fugiat nobis?</v-list-item-subtitle>
          </v-list-item-content>
           
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h1>Мои симпатии</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <span class="filters" v-bind="attrs" v-on="on"> Фильтры </span>
          </template>
          <v-list>
            <v-list-item v-for="filter in filters" :key="filter.id">
              <v-list-item-title
                class="filter d-flex justify-content-between"
                @click="makeFilterActive(filter)"
                ><span :class="{ active: filter.isActive }">{{
                  filter.title
                }}</span
                ><span class="symbol">{{
                  filter.simbol
                }}</span></v-list-item-title
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
          :unread="user.unread"
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
        favorite: false,
        unread: true,
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
        simbol: 'ㅤ●',
        isActive: false,
      },
      {
        id: 3,
        title: 'Избранные',
        simbol: '❤',
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
.symbol {
  color: #ff5a7b;
}
.chat_btn {
  background-color: #ff5a7b;
  color: #ffffff;
  position: fixed;
  width: 84px;
  height: 64px;
  border-radius: 200px;
  left: -42px;
  top: calc(50vh - 64px);
  z-index: 1;
  padding: 8px;
  box-sizing: border-box;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.chat_btn_open {
  left: 214px;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.chat_icon {
  color: #ffffff !important;
  font-size: 32px !important;
}

</style>
