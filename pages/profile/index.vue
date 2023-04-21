<template>
  <div class="container">
    <h1>Профиль</h1>
    <v-card class="py-3 px-md-5 px-2 mt-3">
      <button class="link_pink float-end">выйти</button>
      <div class="row mt-1 mb-1 w-100 px-3">
        <div class="col-md-3 p-md-0 p-3 text-center">
          <v-avatar
            class="ratio ratio-1x1"
            width="100%"
            height="auto"
            max-width="250px"
          >
            <v-img :src="src" alt="Avatar"
          /></v-avatar>
          <v-file-input
            v-model="file"
            accept="image/*"
            clearable
            style="max-width: 250px; margin: 0 auto"
            label="Фото профиля"
            prepend-icon="mdi-paperclip"
            @change="previewThumbnail"
          >
          </v-file-input>
        </div>
        <div class="col-md-8 offset-lg-1">
          <v-row>
            <v-col cols="12" md="2" class="p-0 px-1">
              <v-text-field
                class="big_text p-0"
                v-model="user.name"
                required
                hide-details
                @change="change = true"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3" class="p-0 px-1">
              <v-text-field
                class="big_text p-0"
                v-model="user.surname"
                required
                hide-details
                @change="change = true"
              ></v-text-field>
            </v-col>
          </v-row>
          <br />
          <v-icon left>mdi-account</v-icon
          ><v-chip
            v-if="this.user.gender === 'female'"
            style="background-color: #ff5a7b; color: #fff"
            small
            >женский</v-chip
          ><v-chip
            v-if="this.user.gender === 'male'"
            style="background-color: #a35aff; color: #fff"
            small
            >мужской</v-chip
          >
          <v-icon @click="changeGender">mdi-swap-vertical</v-icon>
          <br />
          <span><v-icon left>mdi-calendar</v-icon>13.01.2002</span><br />
          <span>
            <v-icon left>mdi-school</v-icon>Информационных технологий,
            веб-технологии
          </span>

          <v-card class="mb-5">
            <v-textarea
              v-model="user.about"
              flat
              solo
              clearable
              auto-grow
              name="about_me"
              label="О себе..."
              class="mt-2"
              @change="change = true"
            >
            </v-textarea>
            <v-autocomplete
              v-model="user.values"
              :items="filters"
              solo
              dense
              chips
              hide-details
              flat
              small-chips
              hide-selected
              hide-no-data
              item-text="name"
              item-value="name"
              multiple
              open-on-clear
              clearable
              prefix="я ищу..."
              name="filters"
              @change="change = true"
            >
              <template v-slot:selection="data">
                <v-chip
                  :style="{
                    'background-color': data.item.color,
                    color: '#fff',
                  }"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  dark
                  multiple
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>

              <template v-slot:item="data">
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
              <template v-slot:no-data>
                <div class="px-4">Нет такого фильтра :(</div>
              </template>
            </v-autocomplete>
            <v-autocomplete
              v-model="user.values_genders"
              :items="filters_genders"
              solo
              dense
              chips
              flat
              small-chips
              hide-selected
              hide-no-data
              item-text="name"
              item-value="name"
              multiple
              hide-details
              open-on-clear
              clearable
              prefix="поиск по полу:"
              name="filters"
              @change="change = true"
            >
              <template v-slot:selection="data">
                <v-chip
                  :style="{
                    'background-color': data.item.color,
                    color: '#fff',
                  }"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  dark
                  multiple
                  @click="data.select"
                  @click:close="removeGender(data.item)"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>

              <template v-slot:item="data">
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
              <template v-slot:no-data>
                <div class="px-4">Нет такого фильтра :(</div>
              </template>
            </v-autocomplete>
            
          </v-card>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <button class="link_pink">удалить аккаунт</button>
        <button class="button_pink" :disabled="!this.change">редактировать</button>
      </div>
    </v-card>
    <OverlayLoader />
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',

  layout: 'app',
  head: {
    title: 'Общага | Мой профиль',
  },
  // middleware: 'auth',
  data: () => ({
    file: null,
    content: '',
    user: {
      gender: 'female',
      name: 'Ирина',
      surname: 'Громова',
      about: 'Обо мне',
      values: ['помощь по учёбе'],
      values_genders: ['мужской'],
    },
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
    filters_genders: [
      {
        name: 'мужской',
        color: '#A35AFF',
      },
      {
        name: 'женский',
        color: '#FF5A7B',
      },
    ],
 change: false,

    value: null,
  }),
  methods: {
    remove(item) {
      const index = this.user.values.indexOf(item.name)
      if (index >= 0) this.user.values.splice(index, 1)
      this.change = true
    },
    removeGender(item) {
      const index = this.user.values_genders.indexOf(item.name)
      if (index >= 0) this.user.values_genders.splice(index, 1)
      this.change = true
    },
    selectImage(file) {
      let reader = new FileReader()
      reader.onload = this.onImageLoad
      reader.readAsDataURL(this.file)
    },
    previewThumbnail(e) {
      if (this.file) this.selectImage(this.file)
      else this.content = require('~/assets/no_photo.svg')
      this.change = true
    },
    onImageLoad(e) {
      this.content = e.target.result
      let filename = this.file instanceof File ? this.file.name : ''
      this.$emit('input', filename)
      this.$emit('image-changed', this.content)
    },
    changeGender() {
      if (this.user.gender === 'male') {
        this.user.gender = 'female'
      } else this.user.gender = 'male'
      this.change = true
    },
  },
  created() {
    // this.$store.dispatch('getUser')
  },
  computed: {
    src() {
      if (this.content) {
        return this.content
      }
      return require('~/assets/no_photo.svg')
    },
    // user(){
    //   return this.$store.getters.USER
    // }
  },
}
</script>
<style scoped>
.link_pink {
  color: #ff5a7b;
  font-weight: 500;
  font-size: 24px;
}
.button_pink {
  background: #ff5a7b;
  box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.25);
  border-radius: 100000px;
  color: #ffffff;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  padding: 8px 16px;
}
.button_pink:disabled{
  opacity: 0.5;
}
.button_pink:hover,
.link_pink:hover {
  opacity: 0.95;
}
h1 {
  font-size: 30px;
  font-weight: 600;
  line-height: 36px;
}
</style>
