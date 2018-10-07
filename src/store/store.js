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
        staffGrads: (state) => {
            return state.staffGrads
        },
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
            state.staffs[payload.index] = payload.staff
        },
        removeStaff: (state, index) => {
            state.staffs.splice(index, 1)
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
        removeStaff: (context, index) => {
            context.commit('removeStaff', index)
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