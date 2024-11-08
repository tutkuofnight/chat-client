import { defineStore } from "pinia"
import request from "@/lib/repository"
const channelStore = defineStore("channel", {
    state: () => ({
        ws: null,
        channel: null,
        messages: [],
        onlineMembersCount: 0,
        channelList: []
    }),
    getters: {
        // getMembers: ({ channel }) => channel.members,
        // getMemberCount: ({ channel }) => channel.members.length,
    },
    actions: {
        // setCurrentChannel(id) {
        //     this.currentChannel = this.channelList.find(chan => chan.id == id)
        // },
        async getChannel(id) {
            this.channel = ""
            this.messages = []
            const res = await request("get", `channel/${id}`)
            if (res.status !== 200) return res
            this.channel = res.channel
            this.messages.push(...res.messages)
        },
        async getAll(){
            const res = await request("get", "channel/all")
            console.log(res)
            if (res.status !== 200) return false
            this.channelList = res.channels
            return res.channels
        },
        getMessageUser(id){
            return this.channel.users.find(user => user.id == id)
        },
        connect(id){
            this.ws = new WebSocket(`ws://localhost:3001/ws/${id}`)
        },
        sendMessage(data){
            this.ws.send(JSON.stringify(data))
        },
        recieveMessageWatcher(){
            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data)
                console.log(data)
                this.messages.push(data.message)
                this.onlineMembersCount = data.onlineCount
            };
        }
    }
})

export default channelStore