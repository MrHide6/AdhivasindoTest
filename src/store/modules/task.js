import Olaf from '@/assets/img/Olaf.jpg'

export default {
    namespaced: true,

    state: () => ({
        tasks: [
            {
                id: 1,
                title: "Tugas 1",
                assignee: "bla bla",
                dueDate: "2026-11-28",
                columnId: "todo",
                board: 'medium',
                priority: 'high',
                label: 'bug',
                description: 'jajjajajaj',
                cover: Olaf,
                checklist: [
                    { text: 'hahahaha', done: true },
                    { text: 'bala', done: false }
                ],
                attachment: [],
                completed: false,
            },
            {
                title: "Tugas 2",
                assignee: "bla bla",
                dueDate: "2026-11-28",
                columnId: "doing",
                board: 'medium',
                priority: 'high',
                label: 'feature',
                description: 'jajjajajaj',
                cover: '',
                checklist: [
                    { text: 'hahahaha', done: true },
                    { text: 'bala', done: false }
                ],
                attachment: [],
                completed: false,
            },
            {
                title: "Tugas 3",
                assignee: "bla bla",
                dueDate: "2026-11-28",
                columnId: "completed",
                board: 'medium',
                priority: 'high',
                label: 'issue',
                description: 'jajjajajaj',
                cover: Olaf,
                checklist: [
                    { text: 'hahahaha', done: true },
                    { text: 'bala', done: false }
                ],
                attachment: [],
                completed: false,
            }
        ]
    }),
    mutations: {
        ADD_TASK(state, task){
            console.log('ADD KE STORE:', task)
            state.tasks.push(task)
        },
        UPDATE_TASK(state, updatedTask){
            console.log('UPDAYE', updatedTask)
            const index = state.tasks.findIndex(t => t.id === updatedTask.id)
            if(index !== -1) state.tasks[index] = updatedTask
        },
        DELETE_TASK(state, taskId){
            state.tasks = state.tasks.filter(t => t.id !== taskId)
        },
        DELETE_TASK_BY_COLUMN(state, columnId){
            state.tasks = state.tasks.filter(t => t.columnId !== columnId)
        }
    },
    actions: {
        addTask({ commit }, task){
            commit('ADD_TASK', task)
        },
        updateTask({ commit }, task){
            commit('UPDATE_TASK', task)
        },
        deleteTask({ commit }, task){
            commit('DELETE_TASK', task)
        },
        deleteTaskByColumn({ commit }, columnId){
            console.log(columnId,'task')
            commit('DELETE_TASK_BY_COLUMN', columnId)
        }
    },
    getters: {
        taskByColumn: (state) => (columnId) => {
            return state.tasks.filter(t => t.columnId === columnId)
        }
    }
}