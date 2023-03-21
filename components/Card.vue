<template>
  <div data-app>
    <v-card elevation="1" class="row p-3">
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
          <v-btn
            class="btn_chat "
            :class="{ button_active: upBtnChat}"
            @mouseover="upBtnChat= true"
            @mouseleave="upBtnChat = false"
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
            <v-icon> mdi-close </v-icon><span v-if="upBtnClose">  закрыть</span
            >
          </v-btn>
        </div>
      </div>
      <div class="col-1 order-lg-last order-3">
        <v-icon v-if="favorite" class="heart">mdi-heart</v-icon>
        <v-icon v-else class="heart">mdi-heart-outline</v-icon>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      upBtnChat: false,
      upBtnClose: false
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
.btn_chat, .btn_close {
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
  color: #FF1A48;
  background-color: #ffffff !important;
}
.btn_chat:hover {
  color: #ffffff;
  background-color: #ff5a7b !important;
}
.btn_close:hover {
  color: #ffffff;
  background-color: #FF1A48 !important;
}
.theme--light.v-btn:hover::before {
  opacity: 0 !important;
}
.button_active {
  border-radius: 100000px !important;
}
</style>
