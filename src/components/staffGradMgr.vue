<template>
<v-container grid-list-md>
    <v-layout row wrap>
        <v-flex xs12>
            <p class="heading">การศึกษา {{$route.params.id}}</p>
        </v-flex>
        <v-flex xs12>
            <v-data-table :headers="headers" :items="$store.getters.staffGrads" class="elevation-1" disable-initial-sort :pagination.sync="pagination">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.GRAD_LEV_ID }}</td>
                    <td class="text-xs-right">{{ props.item.GRAD_CURR }}</td>
                    <td class="text-xs-right">{{ props.item.GRAD_ISCED_ID }}</td>
                    <td class="text-xs-right">{{ props.item.GRAD_PROG }}</td>
                    <td class="text-xs-right">{{ props.item.GRAD_UNIV }}</td>
                    <td class="text-xs-right">{{ props.item.GRAD_COUNTRY_ID }}</td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'staffGradMgr',
    data () {
        return {
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
            }],
            pagination: {
                rowsPerPage: 10
            }
        }
    }
}
</script>
