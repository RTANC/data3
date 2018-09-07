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
<v-layout row justify-center>
  <v-dialog v-model="dialog" persistent max-width="900px" scrollable>
    <v-card>
      <v-card-title>
        <span class="headline">ข้อมูลบุคลากร</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field label="เลขประจำตัวประชาชน" required></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-select
                :items="ranks"
                v-model="staff.PREFIX_NAME_ID"
                label="ยศ"
              ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="ชื่อ"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="นามสกุล" required></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-select
                :items="[{value: '2', text: 'หญิง'},{value: '1', text: 'ชาย'}]"
                v-model="staff.GENDER_ID"
                label="เพศ"
              ></v-select>
            </v-flex>
            <v-flex xs5>
              <v-subheader>วัน/เดือน/ปี เกิด</v-subheader>
              <v-date-picker
                :first-day-of-week="0"
                locale="th"
                v-model="staff.BIRTHDAY"
              ></v-date-picker>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                label="บ้านเลขที่"
              ></v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-text-field
                label="หมู่ที่"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="ถนน"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-autocomplete v-model="staff.SUB_DISTRICT_ID" :items="refSubDistricts" label="ตำบล"></v-autocomplete>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="หมายเลขโทรศัพท์"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              <v-autocomplete v-model="staff.NATION_ID" :items="nations" label="สัญชาติ"></v-autocomplete>
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
            <v-flex xs4>
              
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
  <v-btn fixed buttom right fab color="pink" dark @click.stop="add">
     <v-icon>add</v-icon>
  </v-btn>
</div>
</template>

<script>
import XLSX from 'xlsx'
import subDistricts from '../json/refSubDistrict'
import axios from 'axios'
import ranks from '../json/refRank.json'
import nations from '../json/refNation'
export default {
  name: 'personMgr',
  data () {
    return {
      dialog: false,
      headers: [{
        text: 'รหัสประจำตัวประชาชน',
        align: 'center',
        value: 'citizen'
      }, {
        text: 'ยศ',
        value: 'rank',
        align: 'center'
      }, {
        text: 'ชื่อ',
        align: 'center',
        value: 'fname'
      }, {
        text: 'นามสกุล',
        align: 'center',
        value: 'lname'
      }, {
        text: "ตำแหน่ง",
        align: 'center',
        value: 'position'
      }, {
        text: 'วุฒิ / แก้ไข / ลบ',
        align: 'center',
        value: 'cmd',
        sortable: false
    }],
      refSubDistricts: subDistricts,
      pagination: {
        sortBy: 'rank',
        descending: true
      },
      items: [],
      zipcodes: [],
      ranks: ranks,
      nations: nations,
      staff: {
        CITIZEN_ID: null,
        PREFIX_NAME_ID: null,
        STF_FNAME: null,
        STF_MNAME: '-',
        STF_LNAME: null,
        GENDER_ID: null,
        BIRTHDAY: null,
        HOMEADD: null,
        MOO: null,
        STREET: null,
        SUB_DISTRICT_ID: null,
        TELEPHONE: null,
        ZIPCODE: null,
        NATION_ID: null,
        STAFFTYPE_ID: null,
        TIME_CONTACT_ID: null,
        BUDGET_ID: null,
        SUBSTAFFTYPE_ID: null,
        ADMIN_POSITION_ID: null,
        POSITION_ID: null,
        POSITION_WORK: null,
        DEPARTMENT_ID: null,
        DATE_INWORK: null,
        DATE_START_THIS_U: null,
        SPECIAL_NAME_ID: null,
        TEACH_ISCED_ID: null,
        TEACH_SUBJECTGROUP_ID: null,
        DEFROM_ID: null,
        INCOME_ID: null,
        RELIGION_ID: null,
        MOVEMENT_TYPE_ID: null,
        MOVEMENT_DATE: null,
        DECORATION: null,
        PASSPORT_STARTDATE: null,
        PASSPORT_ENDDATE: null,
        PASSPORT_STATUS: null
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
    }, 
    add () {
      this.dialog = true
    },
    async getZipCodes () {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/rathpanyowat/Thai-zip-code-latitude-and-longitude/master/data.json')
        this.zipcodes = response.data
      } catch (error) {
        console.log('Get zipcode error')
      }
    }
  },
  mounted () {
    this.getZipCodes()
  }
}
</script>
