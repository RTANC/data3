<template>
    <label class="file-upload">
        <input type="file" @change="handleFile($event)">
    </label>
</template>

<script>
import Papa from 'papaparse'
import moment from 'moment'
import uuid from 'uuid'
export default {
  name: 'fileUpload',
  props: {
    YEAR: {
      default: parseInt(moment().format('YYYY')) + 543
    },
    UNIV_ID: {
      default: null
    }
  },
  methods: {
    handleFile(e) {
      var files = e.target.files,f = files[0]
      Papa.parse(
        f,
        {
          config: { encoding: 'UTF-8' },
          complete: results => {
            results = results.data
            if (this.UNIV_ID) {
              const staffs = []
              results.forEach(r => {
                staffs.push({
                  YEAR: this.YEAR,
                  UNIV_ID: this.UNIV_ID,
                  CITIZEN_ID: r[2],
                  PREFIX_NAME_ID: r[3],
                  STF_FNAME: r[4],
                  STF_MNAME: '-',
                  STF_LNAME: r[6],
                  GENDER_ID: r[7],
                  BIRTHDAY: r[8],
                  HOMEADD: r[9],
                  MOO: r[10],
                  STREET: r[11],
                  SUB_DISTRICT_ID: r[12],
                  TELEPHONE: r[13],
                  ZIPCODE: r[14],
                  NATION_ID: r[15],
                  STAFFTYPE_ID: r[16],
                  TIME_CONTACT_ID: r[17],
                  BUDGET_ID: r[18],
                  SUBSTAFFTYPE_ID: r[19],
                  ADMIN_POSITION_ID: r[20],
                  POSITION_ID: r[21],
                  POSITION_WORK: r[22],
                  DEPARTMENT_ID: r[23],
                  DATE_INWORK: r[24],
                  DATE_START_THIS_U: r[25],
                  SPECIAL_NAME_ID: r[26],
                  TEACH_ISCED_ID: r[27],
                  TEACH_SUBJECTGROUP_ID: r[28],
                  DEFROM_ID: r[29],
                  INCOME_ID: r[30],
                  RELIGION_ID: r[31],
                  MOVEMENT_TYPE_ID: r[32],
                  MOVEMENT_DATE: r[33],
                  DECORATION: r[34],
                  PASSPORT_STARTDATE: r[35],
                  PASSPORT_ENDDATE: r[36],
                  PASSPORT_STATUS: r[37]
                })
              })
              this.$store.dispatch('setStaffs', staffs)
            } else {
              const staffGrads = []
              results.forEach(r => {
                staffGrads.push({
                  key: uuid(),
                  CITIZEN_ID: r[0],
                  GRAD_LEV_ID: r[1],
                  GRAD_CURR: r[2],
                  GRAD_ISCED_ID: r[3],
                  GRAD_PROG: r[4],
                  GRAD_UNIV: r[5],
                  GRAD_COUNTRY_ID: r[6]
                })
              })
              this.$store.dispatch('setStaffGrads', staffGrads)
            }
          }
        }
      )
      // var rABS = true // true: readAsBinaryString  false: readAsArrayBuffer
      // var files = e.target.files,
      //   f = files[0]
      // var reader = new FileReader()
      // reader.onload = e => {
      //   var data = e.target.result
      //   if (!rABS) data = new Uint8Array(data)
      //   var workbook = XLSX.read(data, { type: rABS ? "binary" : "array" })
      //   var first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
      //   var data = XLSX.utils.sheet_to_json(first_worksheet)
      //   this.$emit("load", data)
      // }
      // if (rABS) reader.readAsBinaryString(f)
      // else reader.readAsArrayBuffer(f)
    }
  }
}
</script>

