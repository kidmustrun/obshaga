<template data-app>
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
       <span>{{ message }}</span></v-col>
        </v-row>
</v-card>

</template>


<script>
export default {
    name: 'Message',
    props: ['src', 'message']
}
</script>
<style scoped>
.message{
    display: inline-block;
    max-width: 50vw;
}

</style>