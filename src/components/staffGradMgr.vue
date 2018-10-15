<template>
<v-container grid-list-md fluid>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-toolbar dense card class="elevation-1">
                    <v-toolbar-title>ข้อมูลการศึกษา</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click.native="create">เพิ่ม</v-btn>
                </v-toolbar>
                <v-data-table :headers="headers" :items="$store.getters.staffGradById($route.params.id)" class="elevation-1" disable-initial-sort :pagination.sync="pagination">
                    <template slot="items" slot-scope="props">
                        <td>{{ (gradLvl.find(x => x.value == props.item.GRAD_LEV_ID )).text }}</td>
                        <td class="text-xs-right">{{ props.item.GRAD_CURR }}</td>
                        <td class="text-xs-right">{{ props.item.GRAD_ISCED_ID }}</td>
                        <td class="text-xs-right">{{ props.item.GRAD_PROG }}</td>
                        <td class="text-xs-right">{{ props.item.GRAD_UNIV }}</td>
                        <td class="text-xs-right">{{ props.item.GRAD_COUNTRY_ID }}</td>
                        <td class="text-xs-center">
                            <v-btn color="info" @click="edit(props.item);" icon flat><v-icon>create</v-icon></v-btn>
                            <v-btn color="error" @click="remove(props.item.key)" icon flat><v-icon>delete</v-icon></v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
        <v-flex xs12>
            <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent max-width="500px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">ข้อมูลการศึกษา</span>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="form" v-model="valid">
                                <v-select :items="gradLvl" v-model="GRAD_LEV_ID" label="ระดับการศึกษาที่จบ" :rules="[v  => !!v || 'ท่านจำเป็นต้องเลือก ระดับการศึกษา']" required></v-select>
                                <v-text-field label="ชื่อหลักสูตร" v-model="GRAD_CURR" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้']" required></v-text-field>
                                <v-autocomplete :items="refISCED" v-model="GRAD_ISCED_ID" label="ประเภทวิชาเอก" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้']" required></v-autocomplete>
                                <v-text-field label="วิชาเอก" v-model="GRAD_PROG" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้']" required></v-text-field>
                                <v-text-field label="ชื่อสถาบันที่จบ" v-model="GRAD_UNIV" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้']" required></v-text-field>
                                <v-autocomplete label="ประเทศที่จบ" :items="refNation" v-model="GRAD_COUNTRY_ID" :rules="[v => !!v || 'ท่านจำเป็นต้องกรอกข้อมูลนี้']" required></v-autocomplete>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="clear">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click="save" :disabled="!valid">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-layout>
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
import refGradLevId from '../json/refGradLevId'
import refISCED from '../json/refISCED'
import refNation from '../json/refNation'
import Simplert from 'vue2-simplert'
import uuid from 'uuid'
export default {
    name: 'staffGradMgr',
    components: { Simplert },
    data () {
        return {
            gradLvl: refGradLevId,
            dialog: false,
            refISCED: refISCED,
            refNation: refNation,
            valid: false,
            key: null,
            CITIZEN_ID: null,
            GRAD_LEV_ID: null,
            GRAD_CURR: null,
            GRAD_ISCED_ID: null,
            GRAD_PROG: null,
            GRAD_UNIV: null,
            GRAD_COUNTRY_ID: null,
            headers: [{
                text: 'ระดับการศึกษาที่จบ',
                align: 'center',
                value: 'GRAD_LEV_ID'
            }, {
                text: 'ชื่อหลักสูตร',
                align: 'center',
                value: 'GRAD_CURR'
            }, {
                text: 'ประเภทวิชาเอก',
                align: 'center',
                value: 'GRAD_ISCED_ID'
            }, {
                text: 'วิชาเอก',
                align: 'center',
                value: 'GRAD_PROG'
            }, {
                text: 'ชื่อสถาบัน',
                align: 'center',
                value: 'GRAD_UNIV'
            }, {
                text: 'ประเทศที่จบ',
                align: 'center',
                value: 'GRAD_COUNTRY_ID'
            }, {
                text: 'แก้ไข / ลบ',
                align: 'center',
                value: 'actions'
            }],
            pagination: {
                rowsPerPage: 10
            }
        }
    },
    methods: {
        edit (val) {
            this.key = val.key
            this.CITIZEN_ID = val.CITIZEN_ID
            this.GRAD_LEV_ID = val.GRAD_LEV_ID
            this.GRAD_CURR = val.GRAD_CURR
            this.GRAD_ISCED_ID = val.GRAD_ISCED_ID
            this.GRAD_PROG = val.GRAD_PROG
            this.GRAD_UNIV = val.GRAD_UNIV
            this.GRAD_COUNTRY_ID = val.GRAD_COUNTRY_ID
            this.dialog = true
        },
        clear () {
            this.$refs.form.reset()
            this.key = null
            this.dialog = false
        },
        create () {
            this.dialog = true
        },
        save () {
            console.log(this.key)
            if (!this.key) {
                //add
                this.$store.dispatch('addStaffGrad', {
                    key: uuid(),
                    CITIZEN_ID: this.$route.params.id,
                    GRAD_LEV_ID: this.GRAD_LEV_ID,
                    GRAD_CURR: this.GRAD_CURR,
                    GRAD_ISCED_ID: this.GRAD_ISCED_ID,
                    GRAD_PROG: this.GRAD_PROG,
                    GRAD_UNIV: this.GRAD_UNIV,
                    GRAD_COUNTRY_ID: this.GRAD_COUNTRY_ID
                })
            } else {
                //edit
                const i = this.$store.getters.staffGrads.findIndex(e => {
                    return e.key === this.key
                })
                this.$store.dispatch('editStaffGrad', {index: i,staffGrad: {
                key: this.key,
                CITIZEN_ID: this.CITIZEN_ID,
                GRAD_LEV_ID: this.GRAD_LEV_ID,
                GRAD_CURR: this.GRAD_CURR,
                GRAD_ISCED_ID: this.GRAD_ISCED_ID,
                GRAD_PROG: this.GRAD_PROG,
                GRAD_UNIV: this.GRAD_UNIV,
                GRAD_COUNTRY_ID: this.GRAD_COUNTRY_ID
            }})
            }
            this.clear()
        },
        remove (key) {
            const obj = {
                title: 'คำเตือน',
                message: 'ท่านยืนยันที่จะลบข้อมูลดังกล่าว ใช่ หรือ ไม่',
                type: 'warning',
                useConfirmBtn: true,
                onConfirm: () =>  {
                    const i = this.$store.getters.staffGrads.findIndex(e => {
                      return e.key === key
                    })
                  this.$store.dispatch('removeStaffGrad', i)
                },
                customConfirmBtnText: 'ใช่',
                customCloseBtnText: 'ไม่'
            }
            this.$refs.simplert.openSimplert(obj)
        }
    }
}
</script>
