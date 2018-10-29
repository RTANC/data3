<template>
  <v-app>
    <v-toolbar color="grey darken-4" dark>
      <v-toolbar-title>โปรแกรมจัดการฐานข้อมูลส่ง สกอ.</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view/>
      </v-slide-y-transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
