<template>
  <div data-app>
    <div class="ps-md-4 d-flex justify-content-around flex-column search_form">
      <div class="">
        <span class="big_text">Почти готово!</span>
        <br />
        <br />
        <p>Проверь свои данные и добавь дополнительную информацию о себе.</p>
      </div>
      <div class="row container-fluid mt-3 mx-md-1">
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
    </div>
    <div class="d-flex justify-content-around mt-3">
      <NuxtLink class="link_grey" to="/register/search">назад</NuxtLink>
      <NuxtLink class="link" to="/register/search">зарегистрироваться</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterSearchPage',
  layout: 'register',
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
.big_text {
  font-size: 28px;
  line-height: 32px;
}
.search_form {
  min-height: 70vh;
}
.link_grey {
  color: #838383;
  font-size: 28px;
  line-height: 32px;
  text-decoration: underline #838383;
}
.link {
  color: #000;
  font-size: 28px;
  line-height: 32px;
}
@media screen and (max-width: 577px) {
  .link_grey,
  .link {
    font-size: 24px;
  }
}
.link:hover {
  color: #3d3d3d;
  text-decoration-color: #3d3d3d;
}
.link_grey:hover {
  color: #696969;
  text-decoration-color: #696969;
}
</style>
