<template>
  <v-container fluid fill-height>
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
    <v-flex xs12>
      <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="เลขประจำตัวประชาชน" mask="#-####-#####-##-#" v-model="staff.CITIZEN_ID"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md2>
              <v-select :items="refRank" v-model="staff.PREFIX_NAME_ID" label="ยศ"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <v-text-field label="ชื่อ"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <v-text-field label="นามสกุล" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md7>
              <v-radio-group v-model="staff.GENDER_ID" row label="เพศ">
                <v-radio label="ชาย" value="1" ></v-radio>
                <v-radio label="หญิง" value="2"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <v-text-field label="วันเกิด" v-model="staff.BIRTHDAY" mask="####-##-##" hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field label="บ้านเลขที่" v-model="staff.HOMEADD"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md2>
              <v-text-field label="หมู่ที่" type="number" v-model="staff.MOO"></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field label="ถนน"  v-model="staff.STREET"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete label="ตำบล" v-model="staff.SUB_DISTRICT_ID" :items="refSubDistrict"></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field label="เบอร์โทรศัพท์ (ที่ทำงาน)"  v-model="staff.TELEPHONE"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field label="รหัสไปรษณีย์"  v-model="staff.ZIPCODE"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-autocomplete label="สัญชาติ" v-model="staff.NATION_ID"></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select v-model="staff.STAFFTYPE_ID" label="ประเภทบุคลากร" :items="[{value: '1', text: 'ข้าราชการ'},{value: '2', text: 'พนักงานมหาวิทยาลัย'},{value: '3', text: 'ลูกจ้างประจำ'},{value: '4', text: 'ลูกจ้างชั่วคราว'},{value: '5', text: 'พนักงานราชการ'}]"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-radio-group v-model="staff.SUBSTAFFTYPE_ID" row>
                <v-radio label="มีชั่วโมงสอน" value="1" ></v-radio>
                <v-radio label="ไม่มีชั่วโมงสอน" value="2"></v-radio>
                <v-radio label="มีชั่วโมงช่วยสอน" value="3"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select v-model="staff.TIME_CONTACT_ID" label="ระยะเวลาจ้างในสัญญา" :items="refTimeContact"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select v-model="staff.BUDGET_ID" label="ประเภทเงินจ้าง" :items="refBudget"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select v-model="staff.ADMIN_POSITION_ID" label="ตำแหน่งบริหาร" :items="refAdmin"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="staff.POSITION_WORK" label="ชื่อตำแหน่ง"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select v-model="staff.POSITION_ID" label="ระดับตำแหน่ง" :items="refPosition"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete :items="refFac" v-model="staff.DEPARTMENT_ID" label="คณะ / หน่วยงานที่สังกัด"></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="staff.DATE_INWORK" label="วันบรรจุ" mask="####-##-##" hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="staff.DATE_START_THIS_U" label="วันที่เข้าทำงานในสถาบันปัจจุบัน" mask="####-##-##" hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete :items="refISCED" v-model="staff.SPECIAL_NAME_ID" label="สาขาวิชาที่เชี่ยวชาญ"></v-autocomplete>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete :items="refISCED" v-model="staff.TEACH_ISCED_ID" label="สาขาวิชาที่สอน"></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select  v-model="staff.TEACH_SUBJECTGROUP_ID" label="หมวดวิชาที่สอน" :items="[{value: '01', text: 'หมวดศึกษาทั่วไป'},{value: '02', text: 'หมวดวิชาเฉพาะ'},{value: '03', text: 'หมวดวิชาเลือก'},{value: '-', text: 'ไม่มีชั่วโมงสอน'}]"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select  :items="refDeform" v-model="staff.DEFROM_ID" label="ความพิการ"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select  v-model="staff.INCOME_ID" label="ช่วงรายได้ต่อเดือน" :items="[{value: '01',text: '≤ 15,000'},{value: '02',text: '15,001 - 30,000'},{value: '03',text: '30,001 - 45,000'},{value: '04',text: '45,001 - 60,000'},{value: '05',text: '> 60,000'}]"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :items="refReligion" v-model="staff.RELIGION_ID" label="ศาสนา"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-select :items="refMovmentType" v-model="staff.MOVEMENT_TYPE_ID" label="ประเภทการดำรงรับตำแหน่ง"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="staff.DECORATION" label="เครื่องราชอิสริยาภรณ์สูงสุดที่ได้รับ"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="staff.PASSPORT_STARTDATE" label="วันที่ออก Passport" mask="####-##-##" hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="staff.PASSPORT_ENDDATE" label="วันหมดอายุ Passport" mask="####-##-##" hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :items="[ { value: 'Y', text: 'เล่มเดิม' },{ value: 'N', text: 'เล่มใหม่' } ]" v-model="staff.PASSPORT_STATUS" label="สถานะ Passport"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
    </v-flex>
  <v-flex xs12>
    <v-btn fixed buttom right fab color="pink" dark @click.stop="add">
     <v-icon>add</v-icon>
  </v-btn>
  </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import XLSX from 'xlsx'
import moment from 'moment'
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
      year: parseInt(moment().format('YYYY')) + 543,
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
