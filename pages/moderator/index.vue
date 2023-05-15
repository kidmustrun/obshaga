<template>
  <div class="mt-3">
    <v-tabs v-model="tab">
      <v-tab>Пользователи</v-tab>
      <v-tab>Заявки</v-tab>
      <v-tab>Жалобы</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-data-table
          :headers="headersUsers"
          :items="users"
          :items-per-page="10"
          loading
          loading-text="Загрузка данных о пользователях..."
          class="elevation-1 mt-2"
          :footer-props="{
            'items-per-page-all-text': 'Все',
            'items-per-page-text': 'Отображать строк: ',
            'page-text': '',
          }"
        >
          <template v-slot:item.claims="{ item }">
            <v-chip :style="{ 'background-color': getColor(item.claims) }" dark>
              {{ item.claims }}
            </v-chip>
          </template>
          <template v-slot:item.birth_date="{ item }">
            {{ new Date(item.birth_date).toLocaleString('ru', options) }}

          </template>
          
          <template v-slot:item.moderator="{ item }">
            <v-icon v-if="item.moderator" color="#00e600"> mdi-check </v-icon>
            <v-icon v-else color="#ff0000"> mdi-close </v-icon>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="close"
              @click="blockUser(item.id)"
              title="Заблокировать анкету"
            >
              mdi-block-helper
            </v-icon>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="headersRequests"
          :items="requests"
          :items-per-page="10"
          loading
          loading-text="Нет заявок"
          class="elevation-1 mt-2"
          :footer-props="{
            'items-per-page-all-text': 'Все',
            'items-per-page-text': 'Отображать строк: ',
            'page-text': '',
          }"
        >
          <template v-slot:item.photo="{ item }">
            <a :href="srcFull(item.photo.place)" target="_blank">Фотография</a>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="check"
              @click="approveUser(item.id)"
              title="Одобрить заявку"
            >
              mdi-check
            </v-icon>
          </template></v-data-table
        >
      </v-tab-item>
      <v-tab-item>
        <v-data-table
          :headers="headersClaims"
          :items="claims"
          :items-per-page="10"
          loading
          loading-text="Загрузка данных о жалобах..."
          class="elevation-1 mt-2"
          :footer-props="{
            'items-per-page-all-text': 'Все',
            'items-per-page-text': 'Отображать строк: ',
            'page-text': '',
          }"
        >
          <template v-slot:item.claims="{ item }">
            <v-chip :style="{ 'background-color': getColor(item.claims) }" dark>
              {{ item.claims }}
            </v-chip>
          </template>
          <template v-slot:item.photo="{ item }">
            <a :href="item.photo" target="_blank">Фотография</a>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="block"
              @click="blockUser(item)"
              title="Заблокировать анкету"
            >
              mdi-block-helper
            </v-icon>
          </template></v-data-table
        >
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'ModeratorPage',
  layout: 'moderator',
  head: {
    title: 'Общага | Панель модератора',
  },
  middleware: ['auth'],
  created() {
    this.$store.dispatch('getUsersAdmin')
    this.$store.dispatch('getRequests')
    this.$store.dispatch('getClaims')
  },
  methods: {
    getColor(claims) {
      if (claims >= 3) return 'red'
      else if (claims >= 1 && claims < 3) return 'orange'
      else return 'green'
    },
    approveUser(id) {
      this.$store.dispatch('approveUser', id)
    },
    blockUser(id) {
      this.$store.dispatch('blockUser', id)
    },
    srcFull(src) {
      if (src) return `${this.base_url}${src}`
      else return require('~/assets/no_photo.svg')
    },
  },
  data() {
    return {
      tab: null,
      options: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
      headersUsers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Имя',
          align: 'start',
          value: 'first_name',
        },
        {
          text: 'Фамилия',
          align: 'start',
          value: 'last_name',
        },
        {
          text: 'Пол',
          align: 'start',
          value: 'gender',
        },
        { text: 'Дата рождения', value: 'birth_date' },
        { text: 'Логин', value: 'login' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      headersRequests: [
        {
          text: 'Имя',
          align: 'start',
          value: 'first_name',
        },
        {
          text: 'Фамилия',
          align: 'start',
          value: 'last_name',
        },
        { text: 'Дата рождения', value: 'birth_date' },
        { text: 'Группа', value: 'group' },
        { text: 'Факультет', value: 'faculty' },
        { text: 'Направление', value: 'direction' },
        { text: 'О себе', value: 'about' },
        { text: 'Фото', value: 'photo' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      headersClaims: [
      {
          text: 'ID нарушителя',
          align: 'start',
          value: 'intruder',
        },
        {
          text: 'Имя',
          align: 'start',
          value: 'first_name',
        },
        {
          text: 'Фамилия',
          align: 'start',
          value: 'last_name',
        },
        {
          text: 'ID отправившего жалобу',
          align: 'start',
          value: 'complaining',
        },
        { text: 'Жалоба', value: 'text' },
      ],
    }
  },
  computed: {
    claims() {
      return [...this.$store.state.claims]
    },
    requests() {
      return [...this.$store.state.requests]
    },
    users(){
      return [...this.$store.state.users_admin]
    },
    base_url() {
      return this.$store.state.url_base
    },
  },
}
</script>
<style scoped>
.block:hover {
  color: red;
}
.close:hover {
  color: red;
}
.check:hover {
  color: rgb(0, 198, 0);
}
</style>
