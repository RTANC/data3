<template>
<v-container grid-list-md fluid>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-toolbar dense card class="elevation-1">
                    <v-toolbar-title>ข้อมูลการศึกษา</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="clear;dialog = true;">เพิ่ม</v-btn>
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
                            <v-btn color="info" @click="staffGrad = props.item;idx = props.index;dialog = true;" icon flat><v-icon>create</v-icon></v-btn>
                            <v-btn color="error" @click="remove(props.item.CITIZEN_ID, props.index)" icon flat><v-icon>delete</v-icon></v-btn>
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
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12 sm6 md4>
                                        <v-select
                                            :items="gradLvl"
                                            v-model="staffGrad.GRAD_LEV_ID"
                                            label="ระดับการศึกษาที่จบ"
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md8>
                                        <v-text-field label="ชื่อหลักสูตร" v-model="staffGrad.GRAD_CURR"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md12>
                                        <v-autocomplete :items="refISCED" v-model="staffGrad.GRAD_ISCED_ID" label="ประเภทวิชาเอก"></v-autocomplete>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="วิชาเอก" v-model="staffGrad.GRAD_PROG" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="ชื่อสถาบัน" v-model="staffGrad.GRAD_UNIV" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <v-autocomplete label="ประเทศที่จบ" :items="refNation" v-model="staffGrad.GRAD_COUNTRY_ID"></v-autocomplete>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="dialog = false;clear;">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
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
export default {
    name: 'staffGradMgr',
    components: { Simplert },
    data () {
        return {
            gradLvl: refGradLevId,
            dialog: false,
            refISCED: refISCED,
            refNation: refNation,
            idx: null,
            staffGrad: {
                CITIZEN_ID: null,
                GRAD_LEV_ID: null,
                GRAD_CURR: null,
                GRAD_ISCED_ID: null,
                GRAD_PROG: null,
                GRAD_UNIV: null,
                GRAD_COUNTRY_ID: null
            },
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
        clear () {
            this.staffGrad = {
                CITIZEN_ID: null,
                GRAD_LEV_ID: null,
                GRAD_CURR: null,
                GRAD_ISCED_ID: null,
                GRAD_PROG: null,
                GRAD_UNIV: null,
                GRAD_COUNTRY_ID: null
            }
        },
        save () {
            if (!this.staffGrad.CITIZEN_ID) {
                //add
                this.$store.dispatch('addStaffGrad', this.staffGrad)
            } else {
                //edit
                const i = this.$store.getters.staffGrads.findIndex(e => {
                    return e.CITIZEN_ID === this.staffGrad.CITIZEN_ID
                })
                this.$store.dispatch('editStaffGrad', {index: (i + this.idx),staffGrad:  this.staffGrad})
            }
            this.dialog = false
            this.clear()
        },
        remove (key, index) {
            const obj = {
                title: 'คำเตือน',
                message: 'ท่านยืนยันที่จะลบข้อมูลดังกล่าว ใช่ หรือ ไม่',
                type: 'warning',
                useConfirmBtn: true,
                onConfirm: () =>  {
                  const i = this.$store.getters.staffGrads.findIndex(e => {
                      return e.CITIZEN_ID === key
                    })
                  this.$store.dispatch('removeStaffGrad', index + i)
                },
                customConfirmBtnText: 'ใช่',
                customCloseBtnText: 'ไม่'
            }
            this.$refs.simplert.openSimplert(obj)
        }
    }
}
</script>
