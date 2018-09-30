<template>
    <label class="file-upload">
        <input type="file" @change="handleFileStaff($event)">
    </label>
</template>

<script>
import XLSX from 'xlsx'
export default {
  methods: {
    handleFileStaff(e) {
      var rABS = true // true: readAsBinaryString  false: readAsArrayBuffer
      var files = e.target.files,
        f = files[0]
      var reader = new FileReader()
      reader.onload = e => {
        var data = e.target.result
        if (!rABS) data = new Uint8Array(data)
        var workbook = XLSX.read(data, { type: rABS ? "binary" : "array" })
        var first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
        var data = XLSX.utils.sheet_to_json(first_worksheet)
        this.$emit("load", data)
      }
      if (rABS) reader.readAsBinaryString(f)
      else reader.readAsArrayBuffer(f)
    }
  }
}
</script>

