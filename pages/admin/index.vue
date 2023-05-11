<template>
    <div class="mt-3">
    <h3 class="ms-3">Пользователи</h3>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="10"
    loading
    loading-text="Загрузка данных о пользователях..."
    class="elevation-1 mt-2"
    :footer-props="{
      'items-per-page-all-text': 'Все',
      'items-per-page-text': 'Отображать строк: ',
      'page-text': ''
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
    <template v-slot:item.moderator="{ item }">
        <v-icon v-if="item.moderator" color="#00e600">
        mdi-check
      </v-icon>
      <v-icon v-else color="#ff0000">
        mdi-close
      </v-icon>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="!item.moderator" small class="mr-2 check" @click="makeUserModerator(item)" title="Назначить модератором">
        mdi-lock-check-outline
      </v-icon>
      <v-icon v-else small class="mr-2 close" @click="removeUserModerator(item)" title="Удалить права модератора">
        mdi-lock-remove-outline
      </v-icon>
      <v-icon small class="close" @click="deleteUser(item)" title="Удалить анкету">
        mdi-close
      </v-icon>
    </template>
    </v-data-table
  >
</div>
</template>

<script>
export default {
  name: 'AdminPage',
  layout: 'admin',
  head: {
    title: 'Общага | Панель администратора',
  },
  middleware: ['auth','admin'],
  methods: {
    getColor(claims) {
      if (claims >= 3) return 'red'
      else if (claims >= 1 && claims < 3) return 'orange'
      else return 'green'
    },
    makeUserModerator(user){

    },
    removeUserModerator(user){

    },
    deleteUser(user){

    }
  },
  data() {
    return {
      headers: [
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
        { text: 'Возраст', value: 'year' },
        { text: 'Группа', value: 'group' },
        { text: 'Факультет', value: 'faculty' },
        { text: 'Направление', value: 'direction' },
        { text: 'О себе', value: 'about' },
        { text: 'Фото', value: 'photo' },
        { text: 'Жалобы', value: 'claims' },
        { text: 'Модератор', value: 'moderator' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      users: [
        {
          first_name: 'Ирина',
          last_name: 'Громова',
          year: 21,
          group: '191-321',
          faculty: 'sfsfa',
          direction: 'fdsdfsf',
          claims: 3,
          about: 'обо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвыобо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвы',
          photo: 'https://cdna.artstation.com/p/assets/images/images/050/089/394/large/steven-lo-ji-1.jpg',
          moderator: false
        },
        {
          first_name: 'Ирина',
          last_name: 'Громова',
          year: 21,
          group: '191-321',
          faculty: 'sfsfa',
          direction: 'fdsdfsf',
          claims: 0,
          about: 'обо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвыобо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвы',
          photo: 'https://cdna.artstation.com/p/assets/images/images/050/089/394/large/steven-lo-ji-1.jpg',
          moderator: true
        },
        {
          first_name: 'Ирина',
          last_name: 'Громова',
          year: 21,
          group: '191-321',
          faculty: 'sfsfa',
          direction: 'fdsdfsf',
          claims: 2,
          about: 'обо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвыобо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвы',
          photo: 'https://cdna.artstation.com/p/assets/images/images/050/089/394/large/steven-lo-ji-1.jpg',
          moderator: false
        },
      ],
    }
  },
}
</script>
<style scoped>
.close:hover {
  color: red;
}
.check:hover {
  color: rgb(0, 198, 0);
}
</style>
