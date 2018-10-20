import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        staffs: [],
        staffGrads: []
    },
    getters: {
        staffs: state => state.staffs,
        staffGrads: state => state.staffGrads,
        staffGradById: state => id => state.staffGrads.filter(x => x.CITIZEN_ID === id)
    },
    mutations: {
        setStaffs: (state, staffs) => {
            state.staffs = staffs
        },
        setStaffGrads: (state, staffGrads) => {
            state.staffGrads = staffGrads
        },
        addStaff: (state, staff) => {
            state.push(staff)
        },
        editStaff: (state, payload) => {
            state.staffs[payload.index].CITIZEN_ID = payload.staff.CITIZEN_ID
            state.staffs[payload.index].PREFIX_NAME_ID = payload.staff.PREFIX_NAME_ID
            state.staffs[payload.index].STF_FNAME = payload.staff.STF_FNAME
            state.staffs[payload.index].STF_MNAME = '-'
            state.staffs[payload.index].STF_LNAME = payload.staff.STF_LNAME
            state.staffs[payload.index].GENDER_ID = payload.staff.GENDER_ID
            state.staffs[payload.index].BIRTHDAY = payload.staff.BIRTHDAY
            state.staffs[payload.index].HOMEADD = payload.staff.HOMEADD
            state.staffs[payload.index].MOO = payload.staff.MOO
            state.staffs[payload.index].STREET = payload.staff.STREET
            state.staffs[payload.index].SUB_DISTRICT_ID = payload.staff.SUB_DISTRICT_ID
            state.staffs[payload.index].TELEPHONE = payload.staff.TELEPHONE
            state.staffs[payload.index].ZIPCODE = payload.staff.ZIPCODE
            state.staffs[payload.index].NATION_ID = payload.staff.NATION_ID
            state.staffs[payload.index].STAFFTYPE_ID = payload.staff.STAFFTYPE_ID
            state.staffs[payload.index].TIME_CONTACT_ID = payload.staff.TIME_CONTACT_ID
            state.staffs[payload.index].BUDGET_ID = payload.staff.BUDGET_ID
            state.staffs[payload.index].SUBSTAFFTYPE_ID = payload.staff.SUBSTAFFTYPE_ID
            state.staffs[payload.index].ADMIN_POSITION_ID = payload.staff.ADMIN_POSITION_ID
            state.staffs[payload.index].POSITION_ID = payload.staff.POSITION_ID
            state.staffs[payload.index].POSITION_WORK = payload.staff.POSITION_WORK
            state.staffs[payload.index].DEPARTMENT_ID = payload.staff.DEPARTMENT_ID
            state.staffs[payload.index].DATE_INWORK = payload.staff.DATE_INWORK
            state.staffs[payload.index].DATE_START_THIS_U = payload.staff.DATE_START_THIS_U
            state.staffs[payload.index].SPECIAL_NAME_ID = payload.staff.SPECIAL_NAME_ID
            state.staffs[payload.index].TEACH_ISCED_ID = payload.staff.TEACH_ISCED_ID
            state.staffs[payload.index].TEACH_SUBJECTGROUP_ID = payload.staff.TEACH_SUBJECTGROUP_ID
            state.staffs[payload.index].DEFROM_ID = payload.staff.DEFROM_ID
            state.staffs[payload.index].INCOME_ID = payload.staff.INCOME_ID
            state.staffs[payload.index].RELIGION_ID = payload.staff.RELIGION_ID
            state.staffs[payload.index].MOVEMENT_TYPE_ID = payload.staff.MOVEMENT_TYPE_ID
            state.staffs[payload.index].MOVEMENT_DATE = payload.staff.MOVEMENT_DATE
            state.staffs[payload.index].DECORATION = payload.staff.DECORATION
            state.staffs[payload.index].PASSPORT_STARTDATE = payload.staff.PASSPORT_STARTDATE
            state.staffs[payload.index].PASSPORT_ENDDATE = payload.staff.PASSPORT_ENDDATE
            state.staffs[payload.index].PASSPORT_STATUS = payload.staff.PASSPORT_STATUS
        },
        removeStaff: (state, payload) => {
            state.staffs.splice(payload.index, 1)
            state.staffGrads = state.staffGrads.filter(staffGrad => {
                return staffGrad.CITIZEN_ID != payload.key
            })
        },
        addStaffGrad: (state, staffGrad) => {
            state.staffGrads.push(staffGrad)
        },
        editStaffGrad: (state, payload) => {
            state.staffGrads[payload.index] = payload.staffGrad
        },
        removeStaffGrad: (state, index) => {
            state.staffGrads.splice(index, 1)
        }
    },
    actions: {
        setStaffs: (context, staffs) => {
            context.commit('setStaffs', staffs)
        },
        setStaffGrads: (context, staffGrads) => {
            context.commit('setStaffGrads', staffGrads)
        },
        addStaff: (context, staff) => {
            context.commit('addStaff', staff)
        },
        editStaff: (context, payload) => {
            context.commit('editStaff', payload)
        },
        removeStaff: (context, payload) => {
            context.commit('removeStaff', payload)
        },
        addStaffGrad: (context, staffGrad) => {
            context.commit('addStaffGrad', staffGrad)
        },
        editStaffGrad: (context, payload) => {
            context.commit('editStaffGrad', payload)
        },
        removeStaffGrad: (context, index) => {
            context.commit('removeStaffGrad', index)
        }
    }
})