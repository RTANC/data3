<template>
<v-container fluid fill-height>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
      <v-toolbar dense card class="elevation-1">
        <v-btn color="success" @click="exportToCSV">บันทึกเป็น CSV</v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title class="heading">ข้อมูลทั่วไป</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="create">เพิ่ม</v-btn>
      </v-toolbar>
      <v-data-table :headers="headers" :items="$store.getters.staffs" class="elevation-1" disable-initial-sort :pagination.sync="pagination">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.CITIZEN_ID }}</td>
          <td class="text-xs-left">{{ (refRank.find(e => e.value == props.item.PREFIX_NAME_ID)).text }}</td>
          <td class="text-xs-left">{{ props.item.STF_FNAME }}</td>
          <td class="text-xs-left">{{ props.item.STF_LNAME }}</td>
          <td class="text-xs-left">{{ props.item.POSITION_WORK }}</td>
          <td class="text-xs-center">
            <v-btn color="success" :to="{ name: 'staffGradMgr', params: { id: props.item.CITIZEN_ID } }" icon flat><v-icon>school</v-icon></v-btn>
            <v-btn color="info" icon flat @click="idx = props.index;update(props.item);"><v-icon>create</v-icon></v-btn>
            <v-btn color="red" dark @click="remove(props.index, props.item.CITIZEN_ID);" icon flat><v-icon>delete</v-icon></v-btn>
          </td>
        </template>
      </v-data-table>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-dialog v-model="dialogStartup" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">เปิดไฟล์</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs3>
                  <v-text-field label="ปีการศึกษา" v-model="YEAR"></v-text-field>
                </v-flex>
                <v-flex xs9>
                  <v-select v-model="UNIV_ID" :items="refUniv" label="สถาบันของท่าน"></v-select>
                </v-flex>
                <v-flex xs12 v-if="YEAR !== null && UNIV_ID !== null">
                  <v-subheader>ไฟล์ข้อมูลบุคลากร</v-subheader>
                  <file-upload :YEAR="YEAR" :UNIV_ID="UNIV_ID"></file-upload>
                </v-flex>
                <v-flex xs12 v-if="YEAR !== null && UNIV_ID !== null">
                  <v-subheader>ไฟล์ข้อมูลการศึกษาบุคลากร</v-subheader>
                   <file-upload></file-upload>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="primary" @click="dialogStartup = false;"  :disabled="(($store.getters.staffs.length == 0 || $store.getters.staffGrads.length == 0) ? true : false)">ตกลง</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
    <v-flex xs12>
      <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">ข้อมูลบุคลากร</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field :rules="[checkNull, v => v.length <= 13 || 'เลขบัตรประชาชนมี 13 หลัก']" label="เลขประจำตัวประชาชน"  v-model="CITIZEN_ID"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md2>
              <v-select :rules="[checkNull]" :items="refRank" v-model="PREFIX_NAME_ID" label="ยศ"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <v-text-field :rules="[checkNull]" label="ชื่อ" v-model="STF_FNAME"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <v-text-field :rules="[checkNull]" label="นามสกุล" v-model="STF_LNAME"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md7>
              <v-radio-group v-model="GENDER_ID" row label="เพศ">
                <v-radio label="ชาย" value="1" ></v-radio>
                <v-radio label="หญิง" value="2"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <v-menu v-model="menu[0]" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="birthdayFormatted" label="วันเกิด" prepend-icon="event" readonly hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint></v-text-field>
                <v-date-picker v-model="BIRTHDAY" @input="menu[0] = false" locale="th"></v-date-picker>              
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field :rules="[checkNull]" label="บ้านเลขที่" v-model="HOMEADD"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md2>
              <v-text-field  label="หมู่ที่" v-model="MOO"></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field  label="ถนน"  v-model="STREET"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete :rules="[checkNull]" label="ตำบล" v-model="SUB_DISTRICT_ID" :items="refSubDistrict"></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field label="เบอร์โทรศัพท์ (ที่ทำงาน)"  v-model="TELEPHONE"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field :rules="[checkNull]" label="รหัสไปรษณีย์" mask="#####"  v-model="ZIPCODE"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-autocomplete :rules="[checkNull]" label="สัญชาติ" v-model="NATION_ID" :items="refNation"></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :rules="[checkNull]" v-model="STAFFTYPE_ID" label="ประเภทบุคลากร" :items="[{value: '1', text: 'ข้าราชการ'},{value: '2', text: 'พนักงานมหาวิทยาลัย'},{value: '3', text: 'ลูกจ้างประจำ'},{value: '4', text: 'ลูกจ้างชั่วคราว'},{value: '5', text: 'พนักงานราชการ'}]"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-radio-group v-model="SUBSTAFFTYPE_ID" row>
                <v-radio label="มีชั่วโมงสอน" value="1" ></v-radio>
                <v-radio label="ไม่มีชั่วโมงสอน" value="2"></v-radio>
                <v-radio label="มีชั่วโมงช่วยสอน" value="3"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :rules="[checkNull]" v-model="TIME_CONTACT_ID" label="ระยะเวลาจ้างในสัญญา" :items="refTimeContact"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :rules="[checkNull]" v-model="BUDGET_ID" label="ประเภทเงินจ้าง" :items="refBudget"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :rules="[checkNull]" v-model="ADMIN_POSITION_ID" label="ตำแหน่งบริหาร" :items="refAdmin"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field :rules="[checkNull]" v-model="POSITION_WORK" label="ชื่อตำแหน่ง"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :rules="[checkNull]" v-model="POSITION_ID" label="ระดับตำแหน่ง" :items="refPosition"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete :rules="[checkNull]" :items="refFac" v-model="DEPARTMENT_ID" label="คณะ / หน่วยงานที่สังกัด"></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-menu v-model="menu[1]" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="dateInworkFormatted" label="วันบรรจุ" prepend-icon="event" readonly hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint></v-text-field>
                <v-date-picker v-model="DATE_INWORK" @input="menu[1] = false" locale="th"></v-date-picker>              
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-menu v-model="menu[2]" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="startThisUFormatted" label="วันที่เข้าทำงานในสถาบันปัจจุบัน" prepend-icon="event" readonly hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint></v-text-field>
                <v-date-picker v-model="DATE_START_THIS_U" @input="menu[2] = false" locale="th"></v-date-picker>              
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete :rules="[checkNull]" :items="refISCED" v-model="SPECIAL_NAME_ID" label="สาขาวิชาที่เชี่ยวชาญ"></v-autocomplete>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete :rules="[checkNull]" :items="refISCED" v-model="TEACH_ISCED_ID" label="สาขาวิชาที่สอน"></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :rules="[checkNull]"  v-model="TEACH_SUBJECTGROUP_ID" label="หมวดวิชาที่สอน" :items="[{value: '01', text: 'หมวดศึกษาทั่วไป'},{value: '02', text: 'หมวดวิชาเฉพาะ'},{value: '03', text: 'หมวดวิชาเลือก'},{value: '-', text: 'ไม่มีชั่วโมงสอน'}]"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :rules="[checkNull]" :items="refDeform" v-model="DEFROM_ID" label="ความพิการ"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :rules="[checkNull]" v-model="INCOME_ID" label="ช่วงรายได้ต่อเดือน" :items="[{value: '01',text: '≤ 15,000'},{value: '02',text: '15,001 - 30,000'},{value: '03',text: '30,001 - 45,000'},{value: '04',text: '45,001 - 60,000'},{value: '05',text: '> 60,000'}]"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :rules="[checkNull]" :items="refReligion" v-model="RELIGION_ID" label="ศาสนา"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :rules="[checkNull]" :items="refMovmentType" v-model="MOVEMENT_TYPE_ID" label="ประเภทการดำรงรับตำแหน่ง"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-menu v-model="menu[3]" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="movementDateFormatted" label="วันที่เข้ารับตำแหน่งปัจจุบัน" prepend-icon="event" readonly hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint></v-text-field>
                <v-date-picker v-model="MOVEMENT_DATE" @input="menu[3] = false" locale="th"></v-date-picker>              
              </v-menu>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="DECORATION" label="เครื่องราชอิสริยาภรณ์สูงสุดที่ได้รับ"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-menu v-model="menu[4]" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="passportStartFormatted" label="วันที่ออก Passport" prepend-icon="event" readonly hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint></v-text-field>
                <v-date-picker v-if="NATION_ID !== 'TH'" v-model="PASSPORT_STARTDATE" @input="menu[4] = false" locale="th"></v-date-picker>              
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-menu v-model="menu[5]" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <v-text-field slot="activator" v-model="passportEndFormatted" label="วันที่ Passport หมดอายุ" prepend-icon="event" readonly hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint></v-text-field>
                <v-date-picker v-if="NATION_ID !== 'TH'" v-model="PASSPORT_ENDDATE" @input="menu[5] = false" locale="th"></v-date-picker>              
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :items="[ { value: '-', text: '-'}, { value: 'Y', text: 'เล่มเดิม' },{ value: 'N', text: 'เล่มใหม่' } ]" v-model="PASSPORT_STATUS" label="สถานะ Passport"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <small>* จำเป็น</small>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" flat @click="dialog = false">ยกเลิก</v-btn>
        <v-btn color="blue darken-1" flat @click="save" :disabled="!valid">บันทึก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
    </v-flex>
  <v-flex xs12>
    <simplert :useRadius="true"
          :useIcon="true"
          ref="simplert">
    </simplert>
  </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import moment from 'moment'
import Simplert from 'vue2-simplert'
import fileUpload from './fileUpload'
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
import refUniv from '../json/refUniv'
import Papa from 'papaparse'

export default {
  name: 'staffMgr',
  components: { fileUpload , Simplert },
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
      refUniv: refUniv,
      refISCED: refISCED,
      dialog: false,
      dialogStartup: ((this.$store.getters.staffs.length == 0 || this.$store.getters.staffGrads.length == 0) ? true : false),
      valid: false,
      pagination: {
        rowsPerPage: 10
      },
      headers: [{
        text: 'รหัสประจำตัวประชาชน',
        align: 'center',
        value: 'citizen'
      }, {
        text: 'ยศ',
        value: 'PREFIX_NAME_ID',
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
      YEAR: parseInt(moment().format('YYYY')) + 543,
      UNIV_ID: null,
      CITIZEN_ID: null,
      PREFIX_NAME_ID: null,
      STF_FNAME: null,
      STF_MNAME: '-',
      STF_LNAME: null,
      GENDER_ID: null,
      BIRTHDAY: null,
      HOMEADD: null,
      MOO: '-',
      STREET: '-',
      SUB_DISTRICT_ID: null,
      TELEPHONE: '-',
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
      DECORATION: '-',
      PASSPORT_STARTDATE: '-',
      PASSPORT_ENDDATE: '-',
      PASSPORT_STATUS: '-',
      idx: null,
      menu: [false, false, false, false, false, false],
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return '-'
      const [year, month, day] = date.split('-')
      return `${parseInt(year) + 543}-${month}-${day}`
    },
    create () {
      this.CITIZEN_ID = null
      this.STF_MNAME = '-'
      this.MOO = '-'
      this.STREET = '-'
      this.TELEPHONE = '-'
      this.DECORATION = '-'
      this.PASSPORT_STARTDATE = '-'
      this.PASSPORT_ENDDATE = '-'
      this.PASSPORT_STATUS = '-'
      this.dialog = true
    },
    update (obj) {
      this.CITIZEN_ID = obj.CITIZEN_ID
      this.PREFIX_NAME_ID = obj.PREFIX_NAME_ID
      this.STF_FNAME = obj.STF_FNAME
      this.STF_MNAME = '-'
      this.STF_LNAME = obj.STF_LNAME
      this.GENDER_ID = obj.GENDER_ID
      this.BIRTHDAY = obj.BIRTHDAY
      this.HOMEADD = obj.HOMEADD
      this.MOO = obj.MOO
      this.STREET = obj.STREET
      this.SUB_DISTRICT_ID = obj.SUB_DISTRICT_ID
      this.TELEPHONE = obj.TELEPHONE
      this.ZIPCODE = obj.ZIPCODE
      this.NATION_ID = obj.NATION_ID
      this.STAFFTYPE_ID = obj.STAFFTYPE_ID
      this.TIME_CONTACT_ID = obj.TIME_CONTACT_ID
      this.BUDGET_ID = obj.BUDGET_ID
      this.SUBSTAFFTYPE_ID = obj.SUBSTAFFTYPE_ID
      this.ADMIN_POSITION_ID = obj.ADMIN_POSITION_ID
      this.POSITION_ID = obj.POSITION_ID
      this.POSITION_WORK = obj.POSITION_WORK
      this.DEPARTMENT_ID = obj.DEPARTMENT_ID
      this.DATE_INWORK = obj.DATE_INWORK
      this.DATE_START_THIS_U = obj.DATE_START_THIS_U
      this.SPECIAL_NAME_ID = obj.SPECIAL_NAME_ID
      this.TEACH_ISCED_ID = obj.TEACH_ISCED_ID
      this.TEACH_SUBJECTGROUP_ID = obj.TEACH_SUBJECTGROUP_ID
      this.DEFROM_ID = obj.DEFROM_ID
      this.INCOME_ID = obj.INCOME_ID
      this.RELIGION_ID = obj.RELIGION_ID
      this.MOVEMENT_TYPE_ID = obj.MOVEMENT_TYPE_ID
      this.MOVEMENT_DATE = obj.MOVEMENT_DATE
      this.DECORATION = obj.DECORATION
      this.PASSPORT_STARTDATE = obj.PASSPORT_STARTDATE
      this.PASSPORT_ENDDATE = obj.PASSPORT_ENDDATE
      this.PASSPORT_STATUS = obj.PASSPORT_STATUS
      this.dialog = true
    },
    remove (index, key) {
      const obj = {
        title: 'คำเตือน',
        message: 'ท่านยืนยันที่จะลบข้อมูลดังกล่าว ใช่ หรือ ไม่',
        type: 'warning',
        useConfirmBtn: true,
        onConfirm: () =>  {
          index = ((this.pagination.page - 1) * this.pagination.rowsPerPage) + index
          this.$store.dispatch('removeStaff', {index: index,key: key})
        },
        customConfirmBtnText: 'ใช่',
        customCloseBtnText: 'ไม่'
      }
      this.$refs.simplert.openSimplert(obj)
    },
    save () {
      if (this.$refs.form.validate()) {
        const staff = {
          YEAR: this.YEAR,
          UNIV_ID: this.UNIV_ID,
          CITIZEN_ID: this.CITIZEN_ID,
          PREFIX_NAME_ID: this.PREFIX_NAME_ID,
          STF_FNAME: this.STF_FNAME,
          STF_MNAME: this.STF_MNAME || '-',
          STF_LNAME: this.STF_LNAME,
          GENDER_ID: this.GENDER_ID,
          BIRTHDAY: this.BIRTHDAY,
          HOMEADD: this.HOMEADD,
          MOO: this.MOO,
          STREET: this.STREET,
          SUB_DISTRICT_ID: this.SUB_DISTRICT_ID,
          TELEPHONE: this.TELEPHONE,
          ZIPCODE: this.ZIPCODE,
          NATION_ID: this.NATION_ID,
          STAFFTYPE_ID: this.STAFFTYPE_ID,
          TIME_CONTACT_ID: this.TIME_CONTACT_ID,
          BUDGET_ID: this.BUDGET_ID,
          SUBSTAFFTYPE_ID: this.SUBSTAFFTYPE_ID,
          ADMIN_POSITION_ID: this.ADMIN_POSITION_ID,
          POSITION_ID: this.POSITION_ID,
          POSITION_WORK: this.POSITION_WORK,
          DEPARTMENT_ID: this.DEPARTMENT_ID,
          DATE_INWORK: this.DATE_INWORK,
          DATE_START_THIS_U: this.DATE_START_THIS_U,
          SPECIAL_NAME_ID: this.SPECIAL_NAME_ID,
          TEACH_ISCED_ID: this.TEACH_ISCED_ID,
          TEACH_SUBJECTGROUP_ID: this.TEACH_SUBJECTGROUP_ID,
          DEFROM_ID: this.DEFROM_ID,
          INCOME_ID: this.INCOME_ID,
          RELIGION_ID: this.RELIGION_ID,
          MOVEMENT_TYPE_ID: this.MOVEMENT_TYPE_ID,
          MOVEMENT_DATE: this.MOVEMENT_DATE,
          DECORATION: this.DECORATION || '-',
          PASSPORT_STARTDATE: this.PASSPORT_STARTDATE || '-',
          PASSPORT_ENDDATE: this.PASSPORT_ENDDATE || '-',
          PASSPORT_STATUS: this.PASSPORT_STATUS
      }
      if (!this.CITIZEN_ID) {
        //add 
        this.$store.dispatch('addStaff', staff)
      } else {
        //update
        this.$store.dispatch('editStaff', {index: ((this.pagination.page - 1) * this.pagination.rowsPerPage) + this.idx, staff: staff})
      }
      this.dialog = false
      }
    },
    checkNull (v) {
      return !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้'
    },
    exportToCSV () {
      const staffs = this.$store.getters.staffs
      staffs.forEach((r, i, arr) => {
        arr[i].BIRTHDAY = (parseInt(r.BIRTHDAY.substr(0,4)) + 543) + r.BIRTHDAY.substr(4,10)
        arr[i].DATE_INWORK = (parseInt(r.DATE_INWORK.substr(0,4)) + 543) + r.DATE_INWORK.substr(4,10)
        arr[i].DATE_START_THIS_U = (parseInt(r.DATE_START_THIS_U.substr(0,4)) + 543) + r.DATE_START_THIS_U.substr(4,10)
        arr[i].MOVEMENT_DATE = (parseInt(r.MOVEMENT_DATE.substr(0,4)) + 543) + r.MOVEMENT_DATE.substr(4,10)
        arr[i].PASSPORT_STARTDATE = (r.NATION_ID !== 'TH') ? (parseInt(r.PASSPORT_STARTDATE.substr(0,4)) + 543) + r.PASSPORT_STARTDATE.substr(4,10) : '-'
        arr[i].PASSPORT_ENDDATE = (r.NATION_ID !== 'TH') ? (parseInt(r.PASSPORT_ENDDATE.substr(0,4)) + 543) + r.PASSPORT_ENDDATE.substr(4,10) : '-'
      })
      const csv = Papa.unparse(staffs, {
        header: false
      })
      const csvContent = "data:text/csv;charset=utf-8," + csv
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", "STAFF_" + this.YEAR + ".csv")
      document.body.appendChild(link); // Required for FF
      link.click(); // This will download the data file named "my_data.csv".

      const staffGrads = this.$store.getters.staffGrads
      staffGrads.forEach((r, i, arr) => {
        arr[i] = {
          CITIZEN_ID: r.CITIZEN_ID,
          GRAD_LEV_ID: r.GRAD_LEV_ID,
          GRAD_CURR: r.GRAD_CURR,
          GRAD_ISCED_ID: r.GRAD_ISCED_ID,
          GRAD_PROG: r.GRAD_PROG,
          GRAD_UNIV: r.GRAD_UNIV,
          GRAD_COUNTRY_ID: r.GRAD_COUNTRY_ID
        }
      })
      const staffGradCsv = Papa.unparse(staffGrads, {
        header: false
      })
      const staffGradCsvContent = "data:text/csv;charset=utf-8," + staffGradCsv
      const encodedUri2 = encodeURI(staffGradCsvContent)
      const link2 = document.createElement("a")
      link2.setAttribute("href", encodedUri2)
      link2.setAttribute("download", "STAFF_GRAD_" + this.YEAR + ".csv")
      document.body.appendChild(link2); // Required for FF
      link2.click(); // This will download the data file named "my_data.csv".
    }
  },
  watch : {
    SUBSTAFFTYPE_ID (v) {
      if (v == 2) {
        this.TEACH_ISCED_ID = '-----------'
        this.TEACH_SUBJECTGROUP_ID = '-'
      }
    },
    NATION_ID (v) {
      if (v == 'TH') {
        this.PASSPORT_STATUS = '-'
      }
    },
    STAFFTYPE_ID (v) {
      if (v == 1) {
        this.TIME_CONTACT_ID = '0'
      }
    }
  },
  computed: {
    birthdayFormatted () {
      return this.formatDate(this.BIRTHDAY)
    },
    dateInworkFormatted () {
      return this.formatDate(this.DATE_INWORK)
    },
    startThisUFormatted () {
      return this.formatDate(this.DATE_START_THIS_U)
    },
    movementDateFormatted () {
      return this.formatDate(this.MOVEMENT_DATE)
    },
    passportStartFormatted () {
      return this.formatDate(this.PASSPORT_STARTDATE)
    },
    passportEndFormatted () {
      return this.formatDate(this.PASSPORT_ENDDATE)
    }
  }
}
</script>
