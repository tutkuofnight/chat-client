import { defineStore } from 'pinia'

const socketStore = defineStore('socket', {
    state: () => ({
        ws: null
    }),

    actions: {

    }

})

export default socketStore