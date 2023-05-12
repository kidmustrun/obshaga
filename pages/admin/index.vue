<template>
  <div class="mt-3">
    <v-tabs v-model="tab">
      <v-tab>Пользователи</v-tab>
      <v-tab>Регистрация модератора</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
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
              @click="deleteUser(item.id)"
              title="Удалить анкету"
            >
              mdi-close
            </v-icon>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item class="container">
        <v-form ref="form">
          <v-text-field
            v-model="first_name"
            label="Имя"
            required
          ></v-text-field>
          <v-text-field
            v-model="last_name"
            label="Фамилия"
            required
          ></v-text-field>
          <v-text-field v-model="login" label="Логин" required></v-text-field>
          <v-text-field
            v-model="password"
            label="Пароль"
            type="password"
            required
          ></v-text-field>
          <v-radio-group v-model="gender">
            <v-radio value="male" label="Мужской"></v-radio>
            <v-radio value="female" label="Женский"></v-radio>
          </v-radio-group>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Дата рождения"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="date"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>

          <v-btn
            elevation="2"
            class="float-end"
            @click="makeUserModerator"
          >зарегистрировать</v-btn>
          <div class="clearfix"></div>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  layout: 'admin',
  head: {
    title: 'Общага | Панель администратора',
  },
  middleware: ['auth'],
  created() {
    this.$store.dispatch('getModerators')
    this.$store.dispatch('getUsersAdmin')
  },
  methods: {
    save (date) {
        this.$refs.menu.save(date)
      },
    getColor(claims) {
      if (claims >= 3) return 'red'
      else if (claims >= 1 && claims < 3) return 'orange'
      else return 'green'
    },
    makeUserModerator() {
      this.$store.dispatch('registerModerator', {
        login: this.login,
        first_name: this.first_name,
        password: this.password,
        password_confirmation: this.password,
        last_name: this.last_name,
        second_name: 'Отчество',
        gender: this.gender,
        birth_date: this.date,
      })
    },
    removeUserModerator(user) {},
    deleteUser(id) {
      this.$store.dispatch('deleteUserAdmin', id)
    },
  },
  computed: {
    users() {
      return [...this.$store.state.moderators].concat([
        ...this.$store.state.users_admin,
      ])
    },
    moderators() {
      return [...this.$store.state.moderators]
    },
  },
  data() {
    return {
      options: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
      tab: null,
      login: '',
      first_name: '',
      last_name: '',
      password: '',
      activePicker: null,
      date: null,
      menu: false,
      gender: 'male',
      headers: [
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
        { text: 'Модератор', value: 'moderator' },
        { text: 'Действия', value: 'actions', sortable: false },
      ],
    }
  },
  watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
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
