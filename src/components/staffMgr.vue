<template>
<v-container fluid fill-height>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
      <v-toolbar dense card class="elevation-1">
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
            <v-btn color="info" icon flat @click="update(props.item);"><v-icon>create</v-icon></v-btn>
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
      <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field :rules="[checkNull]" label="เลขประจำตัวประชาชน" mask="#-####-#####-##-#" v-model="CITIZEN_ID"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md2>
              <v-select :rules="[checkNull]" :items="refRank" v-model="PREFIX_NAME_ID" label="ยศ"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <v-text-field :rules="[checkNull]" label="ชื่อ" v-model="STF_FNAME"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <v-text-field :rules="[checkNull]" label="นามสกุล" v-model="STF_LNAME" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md7>
              <v-radio-group v-model="GENDER_ID" row label="เพศ">
                <v-radio label="ชาย" value="1" ></v-radio>
                <v-radio label="หญิง" value="2"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 sm6 md5>
              <v-text-field :rules="[checkNull]" label="วันเกิด" v-model="BIRTHDAY" mask="####-##-##" hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint required return-masked-value></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field :rules="[checkNull]" label="บ้านเลขที่" v-model="HOMEADD"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md2>
              <v-text-field :rules="[checkNull]" label="หมู่ที่" v-model="MOO"></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field :rules="[checkNull]" label="ถนน"  v-model="STREET"></v-text-field>
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
              <v-text-field :rules="[checkNull]" v-model="DATE_INWORK" label="วันบรรจุ" mask="####-##-##" hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint required return-masked-value></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field :rules="[checkNull]" v-model="DATE_START_THIS_U" label="วันที่เข้าทำงานในสถาบันปัจจุบัน" mask="####-##-##" hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint required return-masked-value></v-text-field>
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
            <v-flex xs12>
              <v-select :rules="[checkNull]" :items="refMovmentType" v-model="MOVEMENT_TYPE_ID" label="ประเภทการดำรงรับตำแหน่ง"></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field :rules="[checkNull]" v-model="DECORATION" label="เครื่องราชอิสริยาภรณ์สูงสุดที่ได้รับ"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="PASSPORT_STARTDATE" label="วันที่ออก Passport" mask="####-##-##" hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint required return-masked-value></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="PASSPORT_ENDDATE" label="วันหมดอายุ Passport" mask="####-##-##" hint="รูปแบบ: YYYY-mm-dd (พ.ศ.)" persistent-hint required return-masked-value></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-select :items="[ { value: '-', text: '-'}, { value: 'Y', text: 'เล่มเดิม' },{ value: 'N', text: 'เล่มใหม่' } ]" v-model="PASSPORT_STATUS" label="สถานะ Passport"></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="clear">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
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
  methods: {
    create () {
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
      if (!this.CITIZEN_ID) {
        //add 
        this.$store.dispatch('addStaff', staff)
      } else {
        //update
        const i = this.$store.getters.staffs.findIndex(e => {
          return e.CITIZEN_ID === this.CITIZEN_ID
        })
        this.$store.dispatch('editStaff', {index: i, staff: {
          YEAR: this.YEAR,
          UNIV_ID: this.UNIV_ID,
          CITIZEN_ID: this.CITIZEN_ID,
          PREFIX_NAME_ID: this.PREFIX_NAME_ID,
          STF_FNAME: this.STF_FNAME,
          STF_MNAME: this.STF_MNAME,
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
          DECORATION: this.DECORATION,
          PASSPORT_STARTDATE: this.PASSPORT_STARTDATE,
          PASSPORT_ENDDATE: this.PASSPORT_ENDDATE,
          PASSPORT_STATUS: this.PASSPORT_STATUS
      }})
      }
      this.clear()
    },
    clear () {
      this.$refs.form.reset()
      this.CITIZEN_ID = null
      this.STF_MNAME = '-'
      this.dialog = false
    },
    checkNull (v) {
      return !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้'
    }
  }
}
</script>
