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
        v-model="chatOpen"
        absolute
        class="chat_panel"
        temporary
        stateless
      >
        <v-list nav dense>
          <v-list-item-group active-class="chat_user_opened">
            <v-list-item
              v-for="user in users"
              :key="user.id"
              two-line
              class="mx-auto"
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
      <div v-if="openUserChat" class="openUserChat p-4">
        <button @click="chatOpen = true;  openUserChat = false" class="d-block button_link">Назад</button>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime dolore
        similique in, minus, alias quaerat delectus quibusdam sed assumenda odio
        distinctio, et eius perferendis nesciunt. Molestias eveniet nihil neque
        laboriosam, sequi ipsam amet qui excepturi a dolor cupiditate aperiam?
        Harum pariatur reiciendis nesciunt iste velit vel eius animi esse
        provident, in eveniet. Sunt temporibus corporis quod quas voluptatum
        expedita mollitia obcaecati dicta modi odio! Ipsam repellendus
        laboriosam distinctio quam inventore maiores, autem quas, deserunt, ipsa
        laborum quaerat tempora? Magni odit unde ipsam dolore illum asperiores
        nesciunt consequatur beatae, rerum voluptate fugiat excepturi?
        Cupiditate totam vel quasi aut aliquam molestiae quae inventore eaque.
        Atque porro, eligendi repellat qui voluptatum reprehenderit consequuntur
        ipsam maxime aliquid delectus, incidunt accusantium ad mollitia
        consectetur, quia velit neque? Omnis eveniet nostrum nihil asperiores
        corporis aliquid repellendus, dolor natus voluptate ullam ad in tenetur
        architecto optio, incidunt voluptatem necessitatibus deserunt
        laudantium. Maxime veniam vitae nam dolorem fugit. Molestiae,
        necessitatibus molestias, dolor obcaecati amet aliquid inventore error
        est nulla ipsum explicabo nam eveniet dignissimos veritatis? Quos velit
        consequuntur praesentium eveniet, veritatis iste itaque, suscipit ipsum
        molestias dolore ratione modi! Odit natus rerum deserunt illo voluptas
        culpa aut. Obcaecati iste aut doloremque, tenetur, optio perferendis
        eaque nam ducimus blanditiis unde inventore dignissimos quasi cum
        deserunt tempore hic quod! Quibusdam laborum beatae, quo quas odit non
        fugit rerum eligendi ad quam, ipsum, dolores nostrum at perspiciatis
        ducimus corrupti tempora similique corporis commodi a. Ex, minima
        facilis rerum doloremque ea recusandae ipsum esse, eligendi facere enim
        a delectus fugiat eaque neque, sit suscipit aperiam sint optio.
        Laboriosam error aperiam eum vero quis ipsa soluta ducimus placeat dicta
        earum voluptatum maiores animi nisi delectus quos, eveniet debitis
        repellat asperiores repellendus culpa minima! Pariatur magni possimus
        recusandae unde? Nostrum, quasi esse unde provident inventore nobis
        dicta ullam aliquid. Quae, tenetur deserunt, sunt quasi quas porro eius
        cumque suscipit possimus eos fuga! Necessitatibus velit nesciunt facere
        rerum similique esse, maiores excepturi officia sequi recusandae aliquid
        dicta assumenda ullam repudiandae laboriosam commodi accusantium
        tempora. Exercitationem quod dignissimos eveniet blanditiis quos, harum
        quisquam voluptas itaque aut eaque vitae vero esse ex, corrupti
        voluptatem, dicta ab! Hic voluptatum sunt sint consequuntur, enim
        molestiae iusto debitis odio quae maiores nobis ab impedit omnis quos
        beatae quis id labore eius quo maxime autem accusantium? Saepe a omnis
        quasi hic adipisci! Odit sint omnis quod ea, consequuntur deleniti
        distinctio commodi non eligendi fugiat explicabo ipsa. Atque consectetur
        optio, assumenda doloribus, officia a, eos sint obcaecati perferendis
        mollitia sequi similique repellendus possimus nostrum fugiat? Pariatur
        nesciunt alias harum eius sint. Non maiores hic quae fugit consequatur,
        eius animi iusto ad nemo aliquid, libero consectetur natus. Nemo
        cupiditate doloribus consequuntur voluptate. Laudantium unde, alias
        beatae perferendis vel officiis quia harum magnam aspernatur nam rem
        eaque animi amet voluptas quas sint eos eum accusamus atque doloribus
        accusantium repudiandae sit minus. Minus vero explicabo voluptatibus
        quisquam sint eligendi, quos quo natus mollitia voluptatem, earum fuga
        rerum dolore esse provident architecto, deleniti illo? Quo aliquam
        eligendi suscipit vitae fuga beatae maxime magni laudantium, aspernatur
        rem. Repellendus voluptas soluta consequatur in vero doloremque nihil
        dicta tenetur architecto id! Nobis, sed, cumque quisquam ab tempora
        incidunt non deleniti voluptatum et repudiandae magni, maiores est
        necessitatibus consequuntur aperiam hic iusto. Dignissimos fuga illum
        quaerat tenetur ratione, placeat quisquam. Impedit, quae officiis.
        Recusandae vero fugit eligendi, eveniet quasi dolores obcaecati atque
        porro illum, perferendis molestiae quos nisi laudantium numquam corrupti
        veritatis molestias adipisci ipsam modi maiores dolorum! Adipisci,
        delectus aspernatur iste ducimus ullam explicabo sint quas fugit
        inventore fuga eaque, molestias est iusto suscipit, error distinctio
        corrupti dolorem libero sit ipsam consequuntur! Fugiat perspiciatis,
        accusamus ullam explicabo accusantium corporis eaque, facere animi
        quisquam porro dolore nesciunt neque hic! Ab rem quas neque vero
        obcaecati nam. Enim voluptatibus voluptate necessitatibus sunt numquam
        est iure labore hic adipisci, ad molestiae odio quia repellendus
        eveniet. A adipisci vitae non illum quibusdam nemo tenetur, molestias
        ipsam voluptas. Eos nihil mollitia beatae alias harum totam doloremque
        minima magnam error, repellendus at corrupti ex odio autem accusantium
        necessitatibus quibusdam nostrum voluptatibus iste fugiat quidem fugit
        aliquid eius aut! Minima aspernatur veritatis dolorum, voluptatum
        explicabo quis repellendus voluptates ratione doloribus, accusantium
        exercitationem deserunt beatae voluptatem provident fuga ad consequuntur
        dicta expedita, cumque reiciendis fugiat dolore magni? Quia libero sed
        cupiditate porro dignissimos error debitis, quod sunt corporis, eligendi
        corrupti adipisci possimus aspernatur odio quos blanditiis ipsum sequi
        laborum. Consectetur eligendi a veniam dolores fugiat nisi animi quas
        voluptatem fuga. Delectus tempore quasi aut, ducimus beatae corporis
        assumenda ipsam reprehenderit totam voluptatum vitae quo quia nihil
        harum illum accusamus dolorum consequuntur ex eius doloremque! Provident
        voluptatum illo alias illum culpa sequi cum nobis eum delectus, sunt
        perferendis vero accusamus omnis fugiat dicta in eaque error corporis
        tempora optio impedit inventore aperiam dignissimos. Harum eligendi
        fugit, corporis eius ex laboriosam earum non modi aut quod sequi tenetur
        sapiente, enim quasi, libero velit molestias rem. Iure labore corrupti
        neque beatae odio vero, architecto qui quam exercitationem a quae,
        commodi sapiente! Autem non dolores harum obcaecati saepe laborum
        quibusdam, reprehenderit at eligendi laboriosam modi repellat molestias
        voluptates ut cum itaque minima earum suscipit alias error. At explicabo
        consequuntur beatae ullam quidem dicta repellendus nesciunt modi,
        corporis, reprehenderit illo repudiandae ad quia saepe voluptatibus
        possimus sapiente odit nobis dolore tempore veritatis praesentium? Illum
        non nostrum rerum corrupti et quaerat, totam architecto quidem numquam
        illo. Id placeat temporibus consequatur cumque ipsam, atque quos, ipsa
        consequuntur fuga a eaque nulla perspiciatis? Quia soluta architecto
        magni voluptas nam, eum, nobis ad culpa debitis sapiente minus incidunt
        perspiciatis quod mollitia maiores labore. Tempora tempore voluptatum
        eligendi est? Recusandae rem repellendus ad aut inventore! Et quae, quos
        natus autem, pariatur debitis magnam eligendi alias molestias, possimus
        assumenda! Nam nostrum nobis eum. Consequatur fuga sequi, voluptates
        similique reiciendis minima ex sapiente, architecto quod optio modi
        magnam pariatur autem, corporis repudiandae! Exercitationem fugiat animi
        pariatur quisquam commodi, praesentium minima odit, quam similique
        voluptatem hic accusantium quis necessitatibus libero illum soluta ea
        sit fugit quo inventore! Blanditiis neque suscipit eos, corrupti
        praesentium quisquam voluptatem error commodi vitae quo. Pariatur.
      </div>
    </div>
    <div class="container">
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
  }),
  created() {
    if (process.browser)
    window.addEventListener('resize', this.updateWidth)
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
      this.width = window.innerWidth;
      if(this.openUserChat && this.width>768)
      this.chatOpen = true;
    },
    openUserChatMethod(id) {
      this.messages = this.users.find((user) => user.id === id).messages
      this.openUserChat = true
      if (this.width <= 768) this.chatOpen = false
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
  z-index: 1000;
  background-color: #f5f5f5;
  height: calc(100vh - 64px) !important;
  overflow: auto;
}

.button_link{
  font-weight: 600;
}

@media screen and (max-width: 768px) {
  .openUserChat {
    left: 0;
  }
}
</style>
