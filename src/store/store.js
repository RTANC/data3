import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        staffs: [],
        staffGrads: []
    },
    getters: {
        staffs: state => {
            return state.staffs
        },
        staffGrads: state => {
            return state.staffGrads
        }
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
        editStaff: (state, index, staff) => {
            state.staffs[index] = staff
        },
        removeStaff: (state, index) => {
            state.staffs.splice(index, 1)
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
        editStaff: (context, index, staff) => {
            context.commit('editStaff', index, staff)
        },
        removeStaff: (context, index) => {
            context.commit('removeStaff', index)
        }
    }
})