<template>
  <v-app>
    <v-toolbar app color="green darken-4" dark>
      <h3>โปรแกรมจัดการข้อมูลส่ง สกอ.</h3>
    </v-toolbar>
    <v-content>
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex md12>
            <v-card>
              <v-card-text>
                <v-radio-group v-model="func" row>
                  <v-radio label="อาจารย์ / บุคลากร" value="0" ></v-radio>
                  <v-radio label="นักศึกษา" value="1"></v-radio>
                  <v-radio label="ผู้สำเร็จการศึกษา" value="2"></v-radio>
                </v-radio-group>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex md12>
             <v-slide-y-transition mode="out-in">
              <router-view/>
            </v-slide-y-transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      func: '0'
    }
  },
  name: 'App'
}
</script>
