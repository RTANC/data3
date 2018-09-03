<template>
<div>
  <v-container fluid>
  <v-layout row wrap>
    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        :pagination.sync="pagination"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.key }}</td>
          <td class="text-xs-right">{{ props.item.key }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</v-container>
  <v-btn fixed buttom right fab color="pink" dark>
     <v-icon>add</v-icon>
  </v-btn>
</div>
</template>

<script>
import XLSX from 'xlsx'
import personHeaders from '../meta/personHeaders'
export default {
  name: 'personMgr',
  data () {
    return {
      headers: personHeaders.headers,
      pagination: {
        sortBy: 'rank',
        descending: true
      }
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
