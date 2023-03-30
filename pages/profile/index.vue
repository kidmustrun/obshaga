<template>
  <div class="container">
    <h1>Профиль</h1>
    <v-card class="py-3 px-5 mt-3">
      <button class="link_pink float-end">выйти</button>
      <div class="row container-fluid mt-1 mb-5">
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
          <span class="big_text">Ирина Громова</span>
          <br />
          <v-icon left> mdi-account </v-icon>
          <v-chip style="background-color: #ff5a7b; color: #fff" small
            >женский</v-chip
          ><br />
          <span><v-icon left>mdi-calendar</v-icon>13.01.2002</span><br />
          <span>
            <v-icon left>mdi-school</v-icon>информационные технологии,
            веб-технологии, 4 курс
          </span>

          <v-card>
            <v-textarea
              flat
              solo
              clearable
              auto-grow
              name="about_me"
              label="О себе..."
              class="mt-2"
            >
            </v-textarea>
            <v-autocomplete
              v-model="values"
              :items="filters"
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
              open-on-clear
              clearable
              prefix="я ищу..."
              name="filters"
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
          </v-card>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <button class="link_pink">удалить аккаунт</button>
        <button class="button_pink">редактировать</button>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  layout: 'app',
  data: () => ({
    file: null,
    content: '',
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
    values: ['помощь по учёбе'],
    value: null,
  }),
  methods: {
    remove(item) {
      const index = this.values.indexOf(item.name)
      if (index >= 0) this.values.splice(index, 1)
    },
    selectImage(file) {
      let reader = new FileReader()
      reader.onload = this.onImageLoad
      reader.readAsDataURL(this.file)
    },
    previewThumbnail(e) {
      if (this.file) this.selectImage(this.file)
      else this.content = require('~/assets/no_photo.svg')
    },
    onImageLoad(e) {
      this.content = e.target.result
      let filename = this.file instanceof File ? this.file.name : ''
      // Dispatch new input event with filename
      this.$emit('input', filename)
      // Dispatch new event with image content
      this.$emit('image-changed', this.content)
    },
  },
  computed: {
    src() {
      if (this.content) {
        return this.content
      }
      return require('~/assets/no_photo.svg')
    },
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
