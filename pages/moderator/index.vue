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
      <v-tab-item>
        <v-data-table
          :headers="headersRequests"
          :items="requests"
          :items-per-page="10"
          loading
          loading-text="Загрузка данных о заявках..."
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
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2 check"
              @click="approveUser(item)"
              title="Одобрить заявку"
            >
              mdi-check
            </v-icon>
            <v-icon
              small
              class="block"
              @click="blockUser(item)"
              title="Заблокировать заявку"
            >
              mdi-block-helper
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
      'page-text': ''
    }"
        >
        <template v-slot:item.photo="{ item }">
            <a :href="item.photo" target="_blank">Фотография</a>
          </template>
          <template v-slot:item.claims="{ item }">
            <v-chip :style="{ 'background-color': getColor(item.claims) }" dark>
              {{ item.claims }}
            </v-chip>
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
  // middleware: ['auth','moderator'],
  methods: {
    getColor(claims) {
      if (claims >= 3) return 'red'
      else if (claims >= 1 && claims < 3) return 'orange'
      else return 'green'
    },
    approveUser(user) {},
    blockUser(user) {},
  },
  data() {
    return {
      tab: null,
      headersUsers: [
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
        { text: 'Возраст', value: 'year' },
        { text: 'Группа', value: 'group' },
        { text: 'Факультет', value: 'faculty' },
        { text: 'Направление', value: 'direction' },
        { text: 'О себе', value: 'about' },
        { text: 'Фото', value: 'photo' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
      headersClaims: [
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
        { text: 'Жалоба', value: 'claim' },
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
          about:
            'обо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвыобо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвы',
          photo:
            'https://cdna.artstation.com/p/assets/images/images/050/089/394/large/steven-lo-ji-1.jpg',
        },
      ],
      requests: [
        {
          first_name: 'Ирина',
          last_name: 'Громова',
          year: 21,
          group: '191-321',
          faculty: 'sfsfa',
          direction: 'fdsdfsf',
          about:
            'обо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвыобо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвы',
          photo:
            'https://cdna.artstation.com/p/assets/images/images/050/089/394/large/steven-lo-ji-1.jpg',
        },
        {
          first_name: 'Ирина2',
          last_name: 'Громова2',
          year: 21,
          group: '191-321',
          faculty: 'sfsfa',
          direction: 'fdsdfsf',
          about:
            'обо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвыобо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвы',
          photo:
            'https://cdna.artstation.com/p/assets/images/images/050/089/394/large/steven-lo-ji-1.jpg',
        },
      ],
      claims: [
        {
          first_name: 'Ирина',
          last_name: 'Громова',
          year: 21,
          group: '191-321',
          faculty: 'sfsfa',
          direction: 'fdsdfsf',
          about:
            'обо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвыобо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвы',
          photo:
            'https://cdna.artstation.com/p/assets/images/images/050/089/394/large/steven-lo-ji-1.jpg',
            claim: 'плохо себя ведет'
        },
        {
          first_name: 'Ирина2',
          last_name: 'Громова2',
          year: 21,
          group: '191-321',
          faculty: 'sfsfa',
          direction: 'fdsdfsf',
          about:
            'обо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвыобо мне раляляля тополя влалцуатдлцутавыь ылдтвп вп лывлпрвы',
          photo:
            'https://cdna.artstation.com/p/assets/images/images/050/089/394/large/steven-lo-ji-1.jpg',
            claim: 'плохо себя ведет'
        },
      ],
    }
  },
}
</script>
<style scoped>
.block:hover {
  color: red;
}
.check:hover {
  color: rgb(0, 198, 0);
}
</style>
