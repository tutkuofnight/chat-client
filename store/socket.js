import { defineStore } from 'pinia'

const socketStore = defineStore('socket', {
    state: () => ({
        ws: null
    }),

    actions: {
        connect(id){
            this.ws = new WebSocket(`ws://localhost:3001/ws/${id}`)
        },
        sendMessage(text){
            // 
        }
    }

})

export default socketStore