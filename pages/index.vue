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
              :class="{chat_user_opened: userOpened.id === user.id}"
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
                <v-list-item-subtitle :style="[(userOpened.id === user.id) ? {color: '#fff'} : {color: '#000'}]"
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
              chatOpen = true;
              openUserChat = false;
              userOpened = {id: -1};
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
        <div class="position-fixed fixed-bottom input-message">
          <input v-model="chat" class="form-control" />
        </div>
      </div>
    </div>
    <div class="container" v-if="!openUserChat">
      <div class="d-flex justify-content-between align-items-center">
        <h1>Мои симпатии</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <span class="filters" v-bind="attrs" v-on="on"> Фильтры </span>
          </template>
          <v-list>
            <v-list-item v-for="filter in filters" :key="filter.id">
              <v-list-item-title
                class="filter d-flex justify-content-between"
                @click="makeFilterActive(filter)"
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
      </div>
      <div class="pt-4 p-3">
        <Card
          v-for="user in users"
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
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'app',
  data: () => ({
    chatOpen: false,
    users: [
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
        favorite: false,
        unread: true,
      },
    ],
    filters: [
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
    messages: [],
    openUserChat: false,
    width: 0,
    chat: '',
    userOpened: {},
  }),
  created() {
    if (process.browser) window.addEventListener('resize', this.updateWidth)
  },
  methods: {
    makeFilterActive(filter) {
      this.filters = this.filters.map((filter) => {
        filter.isActive = false
        return filter
      })
      this.filters.find((item) => item.id === filter.id).isActive = true
    },
    updateWidth() {
      this.width = window.innerWidth
      if (this.openUserChat && this.width > 768) this.chatOpen = true
    },
    openUserChatMethod(id) {
      this.userOpened = this.users.find((user) => user.id === id)
      // this.messages = this.user.messages;
      this.openUserChat = true;
      this.updateWidth()
      if (this.width <= 768) this.chatOpen = false
      else this.chatOpen = true;
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
