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
    <div class="w-100">
      <v-navigation-drawer
        ref="menu"
        v-model="chatOpen"
        absolute
        class="chat_panel"
        temporary
        stateless
      >
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item
              v-for="user in users"
              :key="user.id"
              two-line
              class="mx-auto"
              :class="{ chat_user_opened: userOpened.id === user.id }"
              @click="openUserChatMethod(user.id)"
            >
              <v-list-item-avatar>
                <v-img :src="user.photo_url"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="ms-2">
                <v-list-item-title
                  >{{ user.name }} {{ user.surname }}, {{ user.date }}
                  <span v-if="user.unread" class="unread"
                    >●</span
                  ></v-list-item-title
                >
                <v-list-item-subtitle
                  :style="[
                    userOpened.id === user.id
                      ? { color: '#fff' }
                      : { color: '#000' },
                  ]"
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore perferendis ipsam, odit provident velit consectetur,
                  quam sint maiores illum ducimus illo, alias praesentium quia
                  neque! Totam molestias error, ea soluta similique nam libero
                  numquam blanditiis laboriosam deserunt! Eveniet minima
                  doloremque neque facilis beatae dolorem, error distinctio et?
                  Voluptates, minus veritatis! Enim dolores pariatur error,
                  tenetur doloribus sunt ab nisi dolorum earum laudantium
                  impedit perspiciatis praesentium et ut officia odio doloremque
                  voluptas soluta quam molestias iste eius repellat? Asperiores
                  provident minus atque iste? Eos a minima eveniet fugiat
                  expedita magni sint ut maiores totam? Possimus voluptatum
                  optio dolores ad fugiat nobis?</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <div v-if="openUserChat" class="openUserChat p-4" id="chat">
        <div class="position-fixed fixed-top button p-2">
          <button
            @click="
              chatOpen = true
              openUserChat = false
              userOpened = { id: -1 }
            "
            class="d-block button_link"
          >
            Назад
          </button>
        </div>
        <div class="messages">
          <Message
            :src="userOpened.photo_url"
            :message="'Lorem ipsumfb afjsfhusa jfbjsakf sdfsfaf sahdghasfgahgsf fdgasf fhf hdfghasfi dfhbhjfd hfd fhfsagfa'"
          />
        </div>
        <div class="position-fixed fixed-bottom input-message py-4 px-5">
          <textarea
            v-model="chat"
            class="input_chat p-3"
            placeholder="Напишите сообщение..."
          ></textarea>
          <button class="button_send">
            <img src="~/assets/arrow_send.svg" />
          </button>
        </div>
      </div>
    </div>
    <div class="container pt-md-3 px-md-3 pt-0 px-0" v-if="!openUserChat">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab> Полученные </v-tab>
        <v-tab> Отправленные </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <span
                class="filters float-end px-3 py-1"
                v-bind="attrs"
                v-on="on"
                >{{ filter_nameReceived }}</span
              >
              <div class="clearfix"></div>
            </template>
            <v-list>
              <v-list-item v-for="filter in filtersReceived" :key="filter.id">
                <v-list-item-title
                  class="filter d-flex justify-content-between"
                  @click="makeFilterReceivedActive(filter)"
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
          <div class="pt-4 p-3" v-if="usersReceivedFiltered[0]">
            <Card
              v-for="user in usersReceivedFiltered"
              :key="user.id"
              :id="user.id"
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
              @openParentChat="openUserChatMethod"
              @changeFavorite="changeFavoriteReceivedMethod"
            />
            <Loader />
          </div>
          <div class="pt-5 p-3 text-center" v-else>
            <span class="text_no_filters">Ничего нет :(</span>
          </div>
        </v-tab-item>
        <v-tab-item>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <span
                class="filters float-end px-3 py-1"
                v-bind="attrs"
                v-on="on"
                >{{ filter_nameSent }}</span
              >
              <div class="clearfix"></div>
            </template>
            <v-list>
              <v-list-item v-for="filter in filtersSent" :key="filter.id">
                <v-list-item-title
                  class="filter d-flex justify-content-between"
                  @click="makeFilterSentActive(filter)"
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
          <div class="pt-4 p-3" v-if="usersSentFiltered[0]">
            <Card
              v-for="user in usersSentFiltered"
              :key="user.id"
              :id="user.id"
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
              @openParentChat="openUserChatMethod"
              @changeFavorite="changeFavoriteSentMethod"
            />
            <Loader />
          </div>
          <div class="pt-5 p-3 text-center" v-else>
            <span class="text_no_filters">Ничего нет :(</span>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  head: {
    title: 'Общага | Мои симпатии',
  },
  layout: 'app',
  // middleware: 'auth',
  data: () => ({
    tab: null,
    chatOpen: false,
    users: [],
    usersReceived: [
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
          'https://sun9-24.userapi.com/impg/OVhLzZ5n0hyQdXbSJpmzE5NMtoHZarSHTC4lZg/IySh5Ym3iRM.jpg?size=1620x2160&quality=95&sign=b52b9205acbbf5045e1f4963594ff01d&type=album',
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
        favorite: true,
        unread: false,
      },
    ],
    usersSent: [
      {
        id: 3,
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
        id: 5,
        name: 'Ирина',
        surname: 'Громова',
        date: '13.01.2002',
        about: 'Ищу друзей по программированию и буду рада новым знакомствам',
        course: 4,
        photo_url:
          'https://sun9-24.userapi.com/impg/OVhLzZ5n0hyQdXbSJpmzE5NMtoHZarSHTC4lZg/IySh5Ym3iRM.jpg?size=1620x2160&quality=95&sign=b52b9205acbbf5045e1f4963594ff01d&type=album',
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
        favorite: true,
        unread: false,
      },
    ],
    filtersReceived: [
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
    filtersSent: [
      {
        id: 1,
        title: 'Все',
        isActive: true,
      },
      {
        id: 2,
        title: 'Избранные',
        simbol: 'ㅤ❤',
        isActive: false,
      },
    ],
    messages: [],
    openUserChat: false,
    width: 0,
    chat: '',
    userOpened: {},
    usersReceivedFiltered: [],
    usersSentFiltered: [],
    filter_nameReceived: 'Фильтры',
    filter_nameSent: 'Фильтры',
  }),
  created() {
    if (process.browser) window.addEventListener('resize', this.updateWidth)
    this.usersReceivedFiltered = this.usersReceived
    this.usersSentFiltered = this.usersSent
    this.users = this.usersReceived.concat(this.usersSent)
  },
  methods: {
    makeFilterReceivedActive(filter) {
      this.filtersReceived = this.filtersReceived.map((filter) => {
        filter.isActive = false
        return filter
      })
      this.filtersReceived.find((item) => item.id === filter.id).isActive = true
      this.filter_nameReceived = filter.title
      if (filter.title == 'Все') {
        this.usersReceivedFiltered = this.usersReceived
        this.filter_nameReceived = 'Фильтры'
      }
      if (filter.title == 'Непрочитанные')
        this.usersReceivedFiltered = this.usersReceived.filter(
          (user) => user.unread === true
        )
      if (filter.title == 'Избранные')
        this.usersReceivedFiltered = this.usersReceived.filter(
          (user) => user.favorite === true
        )
    },
    makeFilterSentActive(filter) {
      this.filtersSent = this.filtersSent.map((filter) => {
        filter.isActive = false
        return filter
      })
      this.filtersSent.find((item) => item.id === filter.id).isActive = true
      this.filter_nameSent = filter.title
      if (filter.title == 'Все') {
        this.usersSentFiltered = this.usersSent
        this.filter_nameSent = 'Фильтры'
      }
      if (filter.title == 'Избранные')
        this.usersSentFiltered = this.usersSent.filter(
          (user) => user.favorite === true
        )
    },
    updateWidth() {
      this.width = window.innerWidth
      if (this.openUserChat && this.width > 768) this.chatOpen = true
    },
    openUserChatMethod(id) {
      this.userOpened = this.users.find((user) => user.id === id)
      this.users.find((user) => user.id === id).unread = false
      // this.messages = this.user.messages;
      this.openUserChat = true
      this.updateWidth()
      if (this.width <= 768) this.chatOpen = false
      else this.chatOpen = true
    },
    changeFavoriteReceivedMethod(id) {
      this.usersReceived.find((user) => user.id === id).favorite =
        !this.usersReceived.find((user) => user.id === id).favorite
    },
    changeFavoriteSentMethod(id) {
      this.usersSent.find((user) => user.id === id).favorite =
        !this.usersSent.find((user) => user.id === id).favorite
    },
    scrollToDown() {
      const el = this.$el.querySelector('#chat')
      if (el) {
        el.scrollTop = el.scrollHeight
      }
    },
  },
  watch: {
    openUserChat() {
      setTimeout(this.scrollToDown, 0)
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
.text_no_filters {
  color: #ccc;
  font-size: 32px;
}
.symbol,
.unread {
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
  z-index: 7;
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
.chat_user_opened {
  background-color: #ff5a7b;
  color: #ffffff !important;
}
.openUserChat {
  position: absolute;
  left: 256px;
  top: 0;
  z-index: 1000;
  background-color: #f5f5f5;
  height: calc(100vh - 64px) !important;
  overflow: auto;
  width: calc(100% - 256px);
}
.button {
  top: 64px;
  left: 256px;
  background-color: #f5f5f5;
}

.button_link {
  font-weight: 600;
}
.messages {
  margin-top: 16px;
  margin-bottom: 32px;
}
.input-message {
  left: 256px;
}
textarea {
  resize: none;
}
.button_send {
  position: absolute;
  background-color: #ffffff;
  right: 70px;
  bottom: 33%;
}
.button_send img {
  width: 50px;
}
.input_chat {
  position: relative;
  background: #ffffff;
  border-radius: 10px;
  width: 100%;
  padding-right: 70px !important;
}
.input_chat:focus {
  outline: #ddd 1px solid;
}
@media screen and (max-width: 768px) {
  .openUserChat,
  .button,
  .input-message {
    left: 0;
  }
  .openUserChat {
    width: 100%;
  }
}
</style>
