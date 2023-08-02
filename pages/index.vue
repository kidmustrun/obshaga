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
        class="chat_panel position-fixed"
        temporary
        stateless
      >
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item
              v-for="user in chats"
              :key="user.id"
              two-line
              class="mx-auto"
              :class="{ chat_user_opened: userOpened.id === user.id }"
              @click="openUserChatMethod(user.id, user.second_user)"
            >
              <v-list-item-avatar>
                <v-img :src="fullSrc(user.photo.place)"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="ms-2">
                <v-list-item-title
                  >{{ user.second_user_name }}, {{ user.year }}
                  <span v-if="!user.is_read" class="unread"
                    >●</span
                  ></v-list-item-title
                >
                <v-list-item-subtitle
                  :style="[
                    userOpened.id === user.id
                      ? { color: '#fff' }
                      : { color: '#000' },
                  ]"
                  >{{ user.message_text }}</v-list-item-subtitle
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
        <div class="messages" v-if="chat[0]">
          <Message
            v-for="messageChat in chat"
            :src="
              messageChat.to_user_id === userIm[0].id
                ? users.find((user) => user.id === messageChat.user_id).photo
                    .place
                : userIm[1].photo.place
            "
            :name="
              messageChat.to_user_id === userIm[0].id
                ? userOpened.name
                : userIm[0].first_name
            "
            :time="
              new Date(messageChat.created_at).toLocaleString('ru', options)
            "
            :message="messageChat.message_text"
          />
        </div>
        <div v-else>Загрузка...</div>
        <div class="position-fixed fixed-bottom input-message py-2 px-3">
          <textarea
            v-model="message"
            class="input_chat p-3"
            placeholder="Напишите сообщение..."
          ></textarea>
          <button class="button_send" @click="sendMessage">
            <img src="~/assets/arrow_send.svg" />
          </button>
        </div>
      </div>
    </div>
    <div class="container px-md-3 pt-0 px-0" v-if="!openUserChat">
      <v-tabs
        v-model="tab"
        style="background-color: transparent !important"
        grow
      >
        <v-tab> Полученные </v-tab>
        <v-tab> Отправленные </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="tab"
        style="background-color: transparent !important"
      >
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
          <div class="pt-4 p-3" v-if="usersReceivedFiltered[0] && userIm[0]">
            <Card
              v-for="user in usersReceivedFiltered"
              :key="user.id"
              :id="user.id"
              :liked="user.id"
              :who_was_liked="userIm[0].id"
              :src="user.photo.place"
              :name="user.name"
              :surname="user.surname"
              :year="user.year"
              :about="user.about"
              :direction="user.direction"
              :faculty="user.faculty"
              :filters="user.interests"
              :favorite="user.favourite"
              :unread="user.unread"
              :gender="user.gender"
              :like_id="user.like_id"
              @openParentChat="openUserChatMethod"
            />
          </div>
          <Loader v-else />
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
          <div class="pt-4 p-3" v-if="usersSentFiltered[0] && userIm[0]">
            <Card
              v-for="user in usersSentFiltered"
              :key="user.id"
              :id="user.id"
              :src="user.photo.place"
              :liked="userIm[0].id"
              :who_was_liked="user.id"
              :name="user.name"
              :surname="user.surname"
              :year="user.year"
              :about="user.about"
              :direction="user.direction"
              :faculty="user.faculty"
              :filters="user.interests"
              :unread="user.unread"
              :favorite="user.favourite"
              :gender="user.gender"
              :like_id="user.like_id"
              @openParentChat="openUserChatMethod(null, user.id)"
            />
          </div>
          <Loader v-else />
          <div class="pt-5 p-3 text-center" v-else>
            <span class="text_no_filters">Ничего нет :(</span>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import Pusher from 'pusher-js'
export default {
  name: 'IndexPage',
  head: {
    title: 'Общага | Мои симпатии',
  },
  layout: 'app',
  middleware: 'auth',
  data: () => ({
    tab: null,
    chatOpen: false,
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
        title: 'Непрочитанные',
        simbol: 'ㅤ●',
        isActive: false,
      },
      {
        id: 3,
        title: 'Избранные',
        simbol: 'ㅤ❤',
        isActive: false,
      },
    ],
    messages: [],
    message: '',
    openUserChat: false,
    width: 0,
    userOpened: {},
    usersReceivedFiltered: [],
    usersSentFiltered: [],
    chat_id: -1,
    filter_nameReceived: 'Фильтры',
    filter_nameSent: 'Фильтры',
  }),
  created() {
    if (process.browser) window.addEventListener('resize', this.updateWidth)
    this.$store.dispatch('getWhoLikedMe')
    this.$store.dispatch('getLiked')
    this.$store.dispatch('getUser')
    this.$store.dispatch('getFilters')
    this.$store.commit('SET_USERS', [])
    this.$store.dispatch('getChats')
  },
  mounted() {
    Pusher.logToConsole = true

    const pusher = new Pusher('0edd8e2d1555ccc46f03', {
      cluster: 'eu',
    })

    const channel = pusher.subscribe('chat')
    channel.bind('App\\Events\\MessageSent', (data) => {
      if (data.message.user_id != this.userIm[0].id) {
        this.chat.push(data.message)
        // this.$store.commit('SET_CHAT_UNREAD', data.message.dialog_id)
        // this.chats.find(chat => chat.id === data.message.user_id).is_read = false
        // this.usersSentFiltered.find(chat => chat.id === data.message.user_id).unread = true
        // this.usersReceivedFiltered.find(chat => chat.id === data.message.user_id).unread = true
      }
      // this.chats.find(chat => chat.id === data.message.dialog_id).message_text = data.message.message_text

      this.message = this.message + ' '
      this.message = this.message.slice(0, -1)
      setTimeout(this.scrollToDown, 0)
    })
  },
  destroyed() {
    this.$store.commit('SET_LIKED', [])
    this.$store.commit('SET_WHO_LIKED_ME', [])
  },
  computed: {
    options() {
      return {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Europe/Moscow',
      }
    },
    userIm() {
      return this.$store.state.user
    },
    chat() {
      return [...this.$store.state.chat].reverse()
    },
    usersSent() {
      return [...this.$store.state.liked].reverse()
    },
    usersReceived() {
      return [...this.$store.state.who_liked_me].reverse()
    },
    base_url() {
      return this.$store.state.url_base
    },
    chats() {
      return [...this.$store.state.chats]
    },
    users() {
      return this.usersReceived
        .filter((a) => this.usersSent.find((b) => b.id === a.id) === undefined)
        .concat(this.usersSent)
    },
  },
  methods: {
    fullSrc(photo) {
      if (photo) return `${this.base_url}${photo}`
      else return require('~/assets/no_photo.svg')
    },
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
          (user) => user.favourite === true
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
      if (filter.title == 'Непрочитанные')
        this.usersSentFiltered = this.usersSent.filter(
          (user) => user.unread === true
        )
      if (filter.title == 'Избранные')
        this.usersSentFiltered = this.usersSent.filter(
          (user) => user.favourite === true
        )
    },
    updateWidth() {
      this.width = window.innerWidth
      if (this.openUserChat && this.width > 768) this.chatOpen = true
    },
    openUserChatMethod(id, second_user_id) {
      if (!id)
        id = this.chats.find((chat) => chat.second_user === second_user_id).id
      this.$store.dispatch('getChat', id)
      this.chat_id = id
      this.userOpened = this.users.find((user) => user.id === second_user_id)
      console.log(id)
      console.log(second_user_id)
      // this.users.find((user) => user.id === id).unread = false
      // this.messages = this.user.messages;
      this.openUserChat = true
      this.updateWidth()
      if (this.width <= 768) this.chatOpen = false
      else this.chatOpen = true
    },
    scrollToDown() {
      const el = this.$el.querySelector('#chat')
      if (el) {
        el.scrollTop = el.scrollHeight
      }
    },
    sendMessage() {
      this.$store.dispatch('sendMessage', {
        chat_id: this.chat_id,
        message: this.message,
      })
      this.chat.push({
        id: this.chat[this.chat.length - 1].id + 1,
        message_text: this.message,
        user_id: this.userIm[0].id,
        to_user_id: this.userOpened.id,
        created_at: new Date(),
      })
      // this.chats.find(chat => chat.id === this.chat_id).message_text = this.message
      setTimeout(this.scrollToDown, 0)
      this.message = ''
    },
  },
  watch: {
    openUserChat() {
      setTimeout(this.scrollToDown, 0)
    },
    chat() {
      setTimeout(this.scrollToDown, 0)
    },
    usersReceived() {
      this.usersReceivedFiltered = this.usersReceived.sort((a, b) =>
        a.unread < b.unread ? 1 : -1
      )
    },
    usersSent() {
      this.usersSentFiltered = this.usersSent.sort((a, b) =>
        a.unread < b.unread ? 1 : -1
      )
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
  margin-bottom: 90px;
}
.input-message {
  left: 256px;
  background-color: #f5f5f5;
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
