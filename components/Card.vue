<template>
  <div data-app>
    <v-card elevation="1" class="mb-5">
      <div class="row p-3">
        <div class="col-md-2 text-center col-10">
          <v-avatar
            class="ratio ratio-1x1"
            width="100%"
            height="auto"
            max-width="200px"
          >
            <v-img
              :src="srcFull"
              alt="Avatar"
              class="ratio ratio-1x1"
              width="100%"
              height="auto"
              max-width="250px"
          /></v-avatar>
        </div>
        <div class="col-md-9 order-lg-1 order-last">
          <div class="name mb-2">
            {{ name }}, {{ year }}
            <span v-if="unread" class="unread">●</span>
          </div>
          <div class="about mb-2">{{ about }}</div>
          <div class="mb-2 d-flex align-items-start">
            <v-icon left>mdi-school</v-icon>
            <div>
              {{ faculty.slice(0, -1) }}<br />Направление:
              {{ direction.toLowerCase() }}
            </div>
          </div>

          <div class="mb-2">
            <v-icon left>mdi-magnify</v-icon>
            <v-chip
              v-for="(filter, index) in filtersColors"
              :key="index"
              :style="{
                'background-color': filter.color,
                color: '#fff',
              }"
              dark
              small
              class="me-1"
            >
              {{ filter.name }}
            </v-chip>
          </div>
          <div class="buttons float-end">
            <v-btn
              class="btn_chat"
              :class="{ button_active: upBtnChat }"
              @mouseover="upBtnChat = true"
              @mouseleave="upBtnChat = false"
              @click="openChat"
            >
              <span v-if="upBtnChat">написать </span
              ><v-icon> mdi-forum-outline </v-icon>
            </v-btn>
            <v-btn
              class="btn_close"
              :class="{ button_active: upBtnClose }"
              @mouseover="upBtnClose = true"
              @mouseleave="upBtnClose = false"
            >
              <v-icon> mdi-close </v-icon
              ><span v-if="upBtnClose"> удалить</span>
            </v-btn>
          </div>
        </div>
        <div class="col-2 col-md-1 order-lg-last order-3">
          <v-icon v-if="favorite" class="heart" @click="changeFavorite">mdi-heart</v-icon>
          <v-icon v-else-if="(favorite === false)" class="heart" @click="changeFavorite"
            >mdi-heart-outline</v-icon
          >
          <v-dialog v-model="clickBtnClaim" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-icon class="claim" v-bind="attrs"
                  v-on="on">mdi-email-alert-outline</v-icon>
              </template>

              <v-card>
                <v-card-title class="grey lighten-2 text-wrap">
                  Жалоба
                </v-card-title>
                <v-card-text>
                  Вы уверены, что хотите пожаловаться на этого пользователя? Он будет удален из Ваших симпатий, а жалоба будет отправлена администратору.</v-card-text
                >
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="clickBtnClaim = false">
                    Отмена
                  </v-btn>
                  <v-btn color="primary" text @click="clickBtnClaim = false">
                    Пожаловаться
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  computed: {
    base_url() {
      return this.$store.state.url_base
    },
    srcFull() {
      if (this.src) return `${this.base_url}${this.src}`
      else return require('~/assets/no_photo.svg')
    },
    filtersAll() {
      return [...this.$store.state.filters]
    },
    filtersColors() {
      const arr = []
      if (this.filters)
        this.filters.forEach((value) => {
          this.filtersAll.forEach((filter) => {
            if (value == filter.name) arr.push(filter)
          })
        })
      return arr
    },
  },
  data() {
    return {
      upBtnChat: false,
      upBtnClose: false,
      clickBtnClaim: false
    }
  },
  props: [
    'id',
    'src',
    'name',
    'surname',
    'year',
    'about',
    'direction',
    'faculty',
    'filters',
    'favorite',
    'unread',
  ],
  methods: {
    openChat(){
      this.$emit('openParentChat', this.id)
    },
    changeFavorite(){
      this.$emit('changeFavorite', this.id)
    }
  }
}
</script>
<style scoped>
.name {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
}
.about {
  font-weight: 300;
  font-size: 20px;
  line-height: 23px;
}
.heart {
  color: #ff5a7b;
  cursor: pointer;
}
.unread {
  color: #ff5a7b;
}
.claim:hover{
  color: #ff1a48;
  cursor: pointer;
}
.btn_chat,
.btn_close {
  box-sizing: border-box;
  transition: 0.3s ease;
  background: #ffffff !important;
  box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.36) !important;
  height: 45px !important;
  border-radius: 50%;
  padding: 6px !important;
  min-width: 45px !important;
  text-transform: lowercase !important;
}
.btn_chat {
  color: #ff5a7b;
  background-color: #ffffff !important;
}
.btn_close {
  color: #ff1a48;
  background-color: #ffffff !important;
}

.btn_chat:hover {
  color: #ffffff;
  background-color: #ff5a7b !important;
}
.btn_close:hover {
  color: #ffffff;
  background-color: #ff1a48 !important;
}
.theme--light.v-btn:hover::before {
  opacity: 0 !important;
}
.button_active {
  border-radius: 100000px !important;
}
</style>
