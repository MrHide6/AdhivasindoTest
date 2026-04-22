export default {
    namespaced: true,

    state: () => ({
        columns : [
            { id:"todo", name: "To Do" },
            { id: "doing", name: "Doing" },
            { id: "completed", name: "Completed" }
        ]
    }),

    mutations: {
        ADD_COLUMN(state, column) {
            state.columns.push(column)
        },
        UPDATE_COLUMN(state, updatedColumn) {
            const index = state.columns.findIndex(c => c.id === updatedColumn.id)
            if(index !== -1) state.columns[index] = updatedColumn
        },
        DELETE_COLUMN(state, columnId) {
            console.log(columnId, 'mutations')
            state.columns = state.columns.filter(c => c.id !== columnId)
            console.log(state.columns)
        }
    },

    actions: {
        addColumn({ commit }, column) {
            commit('ADD_COLUMN', column)
        },
        updatedColumn({ commit }, column) {
            commit('UPDATE_COLUMN', column)
        },
        deleteColumn({ commit, dispatch }, columnId) {
            console.log(columnId)
            commit('DELETE_COLUMN', columnId)

            dispatch('task/deleteTaskByColumn', columnId, { root: true })
        }
    },

    getters: {
        allColumn: (state) => state.columns    }
}