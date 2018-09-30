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
  <v-dialog v-model="dialog" persistent max-width="500px" scrollable>
    <v-card>
      <v-card-title>
        <span class="headline">ข้อมูลบุคลากร</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-lg fluid>
          <v-layout column>
            <v-flex xs6>
              <v-text-field label="เลขประจำตัวประชาชน" required></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-select
                :items="refRank"
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
              <v-menu
                ref="menuRef"
                lazy
                :close-on-content-click="false"
                v-model="birthdayMenu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="staff.BIRDTHDAY"
              >
                <v-text-field
                  slot="activator"
                  label="วันเดือนปีเกิด"
                  v-model="staff.BIRDTHDAY"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                  <v-date-picker v-model="staff.BIRDTHDAY" no-title scrollable locale="th">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="birthdayMenu = false">ยกเลิก</v-btn>
                    <v-btn flat color="primary" @click="$refs.menuRef.save(staff.BIRDTHDAY)">ตกลง</v-btn>
                  </v-date-picker>
              </v-menu>
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
              <v-autocomplete v-model="staff.SUB_DISTRICT_ID" :items="refSubDistrict" label="ตำบล"></v-autocomplete>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="หมายเลขโทรศัพท์"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <!-- zipcode -->
              <v-text-field
                label="รหัสไปรษณีย์"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-autocomplete v-model="staff.NATION_ID" :items="refNation" label="สัญชาติ"></v-autocomplete>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="[{value: '1', text: 'ข้าราชการ'},{value: '2', text: 'พนักงานมหาวิทยาลัย'},{value: '3', text: 'ลูกจ้างประจำ'},{value: '4', text: 'ลูกจ้างชั่วคราว'},{value: '5', text: 'พนักงานราชการ'},]"
                v-model="staff.STAFFTYPE_ID"
                label="ประเภทบุคลากร"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="refTimeContact"
                v-model="staff.TIME_CONTACT_ID"
                label="ระยะเวลาจ้างในสัญญา"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="refAdmin"
                v-model="staff.ADMIN_POSITION_ID"
                label="ตำแหน่งบริหาร"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="refPosition"
                v-model="staff.POSITION_ID"
                label="ระดับตำแหน่ง"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="ตำแหน่ง"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-autocomplete :items="refFac" v-model="staff.DEPARTMENT_ID" label="คณะ / หน่วยงานที่สังกัด"></v-autocomplete>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="menuRef2"
                lazy
                :close-on-content-click="false"
                v-model="dateWork"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="staff.DATE_INWORK"
              >
                <v-text-field
                  slot="activator"
                  label="วันที่บรรจุ"
                  v-model="staff.DATE_INWORK"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                  <v-date-picker v-model="staff.DATE_INWORK" no-title scrollable locale="th">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dateWork = false">ยกเลิก</v-btn>
                    <v-btn flat color="primary" @click="$refs.menuRef2.save(staff.DATE_INWORK)">ตกลง</v-btn>
                  </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="menuRef3"
                lazy
                :close-on-content-click="false"
                v-model="dateU"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="staff.DATE_START_THIS_U"
              >
                <v-text-field
                  slot="activator"
                  label="วันที่เริ่มงาน"
                  v-model="staff.DATE_START_THIS_U"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                  <v-date-picker v-model="staff.DATE_START_THIS_U" no-title scrollable locale="th">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dateU = false">ยกเลิก</v-btn>
                    <v-btn flat color="primary" @click="$refs.menuRef3.save(staff.DATE_START_THIS_U)">ตกลง</v-btn>
                  </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-autocomplete :items="refISCED" v-model="staff.SPECIAL_NAME_ID" label="สาขาวิชาที่เชี่ยวชาญ"></v-autocomplete>
            </v-flex>
            <v-flex xs4>
              <v-autocomplete :items="refISCED" v-model="staff.TEACH_ISCED_ID" label="สาขาวิชาที่สอน"></v-autocomplete>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="[{value: '01', text: 'หมวดศึกษาทั่วไป'},{value: '02', text: 'หมวดวิชาเฉพาะ'},{value: '03', text: 'หมวดวิชาเลือก'},{value: '-', text: 'ไม่มีชั่วโมงสอน'}]"
                v-model="staff.TEACH_SUBJECTGROUP_ID"
                label="หมวดวิชาที่สอน"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="refDeform"
                v-model="staff.DEFROM_ID"
                label="ความพิการ"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="[{value: '01',text: '≤ 15,000'},{value: '02',text: '15,001 - 30,000'},{value: '03',text: '30,001 - 45,000'},{value: '04',text: '45,001 - 60,000'},{value: '05',text: '> 60,000'}]"
                v-model="staff.INCOME_ID"
                label="ช่วงรายได้ต่อเดือน"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="refReligion"
                v-model="staff.RELIGION_ID"
                label="ศาสนา"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="refMovmentType"
                v-model="staff.MOVEMENT_TYPE_ID"
                label="ประเภทการดำรงรับตำแหน่ง"
              ></v-select>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                label="เครื่องราชอิสริยาภรณ์สูงสุดที่ได้รับ"
              ></v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="menuRef4"
                lazy
                :close-on-content-click="false"
                v-model="datePassStart"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="staff.PASSPORT_STARTDATE"
              >
                <v-text-field
                  slot="activator"
                  label="วันเริ่มต้น Passport"
                  v-model="staff.PASSPORT_STARTDATE"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                  <v-date-picker v-model="staff.PASSPORT_STARTDATE" no-title scrollable locale="th">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="datePassStart = false">ยกเลิก</v-btn>
                    <v-btn flat color="primary" @click="$refs.menuRef4.save(staff.PASSPORT_STARTDATE)">ตกลง</v-btn>
                  </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-menu
                ref="menuRef5"
                lazy
                :close-on-content-click="false"
                v-model="datePassEnd"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="staff.PASSPORT_ENDDATE"
              >
                <v-text-field
                  slot="activator"
                  label="วันที่ Passport หมดอายุ"
                  v-model="staff.PASSPORT_ENDDATE"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                  <v-date-picker v-model="staff.PASSPORT_ENDDATE" no-title scrollable locale="th">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="datePassEnd = false">ยกเลิก</v-btn>
                    <v-btn flat color="primary" @click="$refs.menuRef5.save(staff.PASSPORT_ENDDATE)">ตกลง</v-btn>
                  </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs4>
              <v-select
                :items="[{value: 'Y',text: 'เล่มเดิม'},{value: 'N',text: 'เล่มใหม่'}]"
                v-model="staff.PASSPORT_STATUS"
                label="สถานะ PASSPORT"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">ยกเลิก</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">บันทึก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-btn fixed buttom right fab color="pink" dark @click.stop="add">
     <v-icon>add</v-icon>
  </v-btn>
</div>
</template>

<script>
import XLSX from 'xlsx'
import axios from 'axios'
import refSubDistrict from '../json/refSubDistrict'
import refRank from '../json/refRank'
import refNation from '../json/refNation'
import refTimeContact from '../json/refTimeContact'
import refBudget from '../json/refBudget'
import refSubStaffType from '../json/refSubStaffType'
import refAdmin from '../json/refAdmin'
import refPosition from '../json/refPosition'
import refDeform from '../json/refDeform'
import refLev from '../json/refLev'
import refMovmentType from '../json/refMovmentType'
import refReligion from '../json/refReligion'
import refISCED from '../json/refISCED'
import refFac from '../json/refFac'
import prov from '../json/refProvince'
import distr from '../json/refDistrict'
export default {
  name: 'staffMgr',
  data () {
    return {
      refSubDistrict: refSubDistrict,
      refRank: refRank,
      refNation: refNation,
      refTimeContact: refTimeContact,
      refBudget: refBudget,
      refSubStaffType: refSubStaffType,
      refAdmin: refAdmin,
      refPosition: refPosition,
      refDeform: refDeform,
      refLev: refLev,
      refMovmentType: refMovmentType,
      refNation: refNation,
      refPosition: refPosition,
      refReligion: refReligion,
      refTimeContact: refTimeContact,
      refFac: refFac,
      refISCED: refISCED,
      dialog: false,
      birthdayMenu: false,
      dateWork: false,
      dateU: false,
      datePassEnd: false,
      datePassStart: false,
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
      pagination: {
        sortBy: 'rank',
        descending: true
      },
      items: [],
      zipcodes: [],
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
      },
      prov: prov,
      distr: distr
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
      this.clear()
      this.dialog = true
    },
    clear () {
      this.staff = {
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
    },
    async getZipCodes () {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/rathpanyowat/Thai-zip-code-latitude-and-longitude/master/data.json')
        this.zipcodes = response.data
      } catch (error) {
        console.log('Get zipcode error')
      }
    },
    sortJSON () {
     const cc =  this.refSubDistrict.map((sd) => {
        var did = sd.value.substring(0, 2)
        return {
          value: sd.value,
          text: sd.text + ' ' + (this.prov.find((d) => {
            return d.value == did
          })).text
        }
      })
      console.log(JSON.stringify(cc))
    }
  },
  mounted () {
    // this.sortJSON()
  }
}
</script>
