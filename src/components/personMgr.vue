<template>
<v-card>
  <v-card-text>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs3>
          <v-select
            :items="items"
            v-model="year"
            label="ปีการศึกษา"
          ></v-select>
        </v-flex>
        <v-flex xs3>
          <input type="file" @change="handleFile">
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-text>
</v-card>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'personMgr',
  data () {
    return {
      items: [2559,2560,2561,2562,2563],
      year: null
    }
  },
  methods: {
    handleFile(e) {
      var rABS = true // true: readAsBinaryString ; false: readAsArrayBuffer
      var files = e.target.files, f = files[0]
      var reader = new FileReader()
      reader.onload = function(e) {
        var data = e.target.result
        if(!rABS) data = new Uint8Array(data)
        var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'})
        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
        var data = XLSX.utils.sheet_to_json(first_worksheet)
        console.log(data)
        
        /* DO SOMETHING WITH workbook HERE */
      };
      if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
    }
  }
}
</script>
