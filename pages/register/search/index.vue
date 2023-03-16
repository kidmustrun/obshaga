<template>
  <div class="">
    <div class="ps-4 search_form d-flex justify-content-around flex-column">
        <div class="">
    <span>Заполни параметры поиска.</span>
    <br>
    <br>
    <p>Информацию в дальнейшем можно будет изменить.</p>
</div>
<div class="">
    <span>Я </span
    ><select
      :style="[gender == 'male' ? { color: '#5a60ff' } : { color: '#ff5a7b' }]"
      @change="resizeWidth($event)"
      v-model="gender"
      class="select_gender"
    >
      <option value="male" >парень</option>
      <option value="female" selected>девушка</option>
    </select>
    <span>, ищу </span>
    <select
      :style="[search != 'friendship' ? search == 'help' ? { color: '#A35AFF' } : { color: '#ff5a7b' } : {color: '#FF9F5A'}]"
      @change="resizeWidth($event)"
      v-model="search"
      class="select_search"
    >
      <option value="friendship" >дружбу</option>
      <option value="help" selected>помощь по учёбе</option>
      <option value="love" selected>любовь</option>
    </select>
</div>
</div>
    <div class="d-flex justify-content-around">
      <NuxtLink class="link_grey" to="/register">назад</NuxtLink>
      <NuxtLink class="link" to="/register/personal">вперед</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPersonalPage',
  layout: 'register',
  data() {
    return {
      gender: 'female',
      search: 'help'
    }
  },
  methods: {
    resizeWidth(event) {
      let inputText =
        event.target.options[event.target.options.selectedIndex].innerHTML
      let font = '28px gilroy'
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      context.font = font
      let width = context.measureText(inputText).width
      let formattedWidth = Math.ceil(width) + 'px'
      event.target.style.width = formattedWidth
    },
  },
}
</script>
<style scoped>
span {
  font-size: 28px;
  line-height: 32px;
}
.search_form{
    height: 70vh
}
select {
  border: none;
  overflow: hidden;
  font-size: 28px;
  line-height: 32px;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
  text-decoration: underline;
  cursor: pointer;
}
select:focus {
  box-shadow: none;
  outline: none !important;
}
select::-ms-expand {
  display: none;
}
.select_gender option:first-child,
.select_gender option:first-child:hover,
.select_gender option:first-child:active,
.select_gender option:first-child:checked,
.select_gender option:first-child:focus {
  background-color: transparent !important;
  color: #5a60ff !important;
}
.select_gender option:last-child,
.select_gender option:last-child:hover,
.select_gender option:last-child:active,
.select_gender option:last-child:checked,
.select_gender option:last-child:focus {
  background-color: transparent !important;
  color: #ff5a7b !important;
}
.select_search option:first-child,
.select_search option:first-child:hover,
.select_search option:first-child:active,
.select_search option:first-child:checked,
.select_search option:first-child:focus {
  background-color: transparent !important;
  color: #FF9F5A !important;
}

.select_search option:nth-child(2),
.select_search option:nth-child(2):hover,
.select_search option:nth-child(2):active,
.select_search option:nth-child(2):checked,
.select_search option:nth-child(2):focus {
  background-color: transparent !important;
  color: #A35AFF !important;
}

.select_search option:last-child,
.select_search option:last-child:hover,
.select_search option:last-child:active,
.select_search option:last-child:checked,
.select_search option:last-child:focus {
  background-color: transparent !important;
  color: #FF5A7B !important;
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
.link:hover {
  color: #3d3d3d;
  text-decoration-color: #3d3d3d;
}
.link_grey:hover {
  color: #696969;
  text-decoration-color: #696969;
}
@media screen and (max-width: 577px) {
  .link_grey,
  .link {
    font-size: 24px;
  }
}
</style>
