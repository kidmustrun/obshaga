<template>
  <div data-app>
    <v-card elevation="1" class="mb-5">
      <div class="row p-3">
        <div class="col-md-2 text-center col-11">
          <v-avatar
            class="ratio ratio-1x1"
            width="100%"
            height="auto"
            max-width="200px"
          >
            <v-img
              :src="src"
              alt="Avatar"
              class="ratio ratio-1x1"
              width="100%"
              height="auto"
              max-width="250px"
          /></v-avatar>
        </div>
        <div class="col-md-9 order-lg-1 order-last">
          <div class="name mb-2">{{ name }} {{ surname }}, {{ date }}</div>
          <div class="about mb-2">{{ about }}</div>
          <div class="mb-2">
            <v-icon left>mdi-school</v-icon>{{ faculty }}, {{ course }} курс
          </div>

          <div class="mb-2">
            <v-icon left>mdi-magnify</v-icon>
            <v-chip
              v-for="(filter, index) in filters"
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
            <v-dialog v-model="clickBtnChat" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="btn_chat"
                  :class="{ button_active: upBtnChat }"
                  @mouseover="upBtnChat = true"
                  @mouseleave="upBtnChat = false"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span v-if="upBtnChat">написать </span
                  ><v-icon> mdi-forum-outline </v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  Написать сообщение
                </v-card-title>
                <v-card-text>
                  Вы можете отправить одно сообщение, после чего Ваш профиль появится у этого пользователя в разделе "Мои симпатии".</v-card-text
                >
                <v-textarea
                  flat
                  solo
                  clearable
                  auto-grow
                  name="message"
                  label="Сообщение..."
                  class="mt-2 ms-3"
                >
                </v-textarea>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="clickBtnChat = false">
                    Отмена
                  </v-btn>
                  <v-btn color="primary" text @click="clickBtnChat = false">
                    Отправить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="clickBtnClose" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="btn_close"
                  :class="{ button_active: upBtnClose }"
                  @mouseover="upBtnClose = true"
                  @mouseleave="upBtnClose = false"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon> mdi-close </v-icon
                  ><span v-if="upBtnClose"> скрыть</span>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="grey lighten-2 text-wrap">
                  Вы уверены?
                </v-card-title>
                <v-card-text>
                  Если скрыть этого пользователя, он больше не будет
                  отображаться в Вашей ленте.</v-card-text
                >
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="clickBtnClose = false">
                    Отмена
                  </v-btn>
                  <v-btn color="primary" text @click="clickBtnClose = false">
                    Скрыть
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'CardFeed',
  data() {
    return {
      upBtnChat: false,
      upBtnClose: false,
      clickBtnChat: false,
      clickBtnClose: false,
    }
  },
  props: [
    'src',
    'name',
    'surname',
    'date',
    'about',
    'course',
    'faculty',
    'filters',
    'favorite',
    'unread',
  ],
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
