<template data-app>
  <div class="d-flex flex-row align-items-end">
<v-card class="message p-3">
    <v-row
              align="center"
              no-gutters
            >
            <v-col cols="auto">
    <v-avatar
            class="ratio ratio-1x1 me-3"
            width="100%"
            height="auto"
            max-width="50px"
          >
            <v-img
              :src="src"
              alt="Avatar"
              class="ratio ratio-1x1"
              width="100%"
              height="auto"
              max-width="50px"
          /></v-avatar>
        </v-col>
        <v-col>
          <span class="name"> {{ name }}</span><br>
       <span>{{ message }}</span></v-col>
        </v-row>
</v-card>
<span class="grey-text m-1">{{ time }}</span>
</div>
</template>


<script>
export default {
    name: 'Message',
    props: ['src', 'message', 'name', 'time']
}
</script>
<style scoped>
.message{
    display: inline-block;
    max-width: 50vw;
}
.name{
  font-size: 16px;
  font-weight: 600;
}
.grey-text{
  color: #ccc;
}
</style>