import { defineStore } from "pinia"
import request from "@/lib/repository"
const channelStore = defineStore("channel", {
    state: () => ({
        ws: null,
        channel: null,
        messages: [],
        channelList: [
            {
                id: 1,
                name: "birinci kanal",
                onlineCount: 12,
                totalJoiners: 30,
                maxJoinerCount: 50,
                creatorId: 1,
                joiners: [2],
            },
            {
                id: 2,
                name: "tutkunun yeri",
                onlineCount: 2,
                totalJoiners: 2,
                maxJoinerCount: 2,
                creatorId: 2,
                joiners: [1],
            },
            {
                id: 3,
                name: "bosver",
                onlineCount: 1253,
                totalJoiners: 2000,
                maxJoinerCount: 5000,
                creatorId: 1,
                joiners: [2],
            },
        ]
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
            const res = await request("get", `channel/${id}`)
            if (res.status !== 200) return res
            this.channel = res.channel
            this.messages.push(...res.channel.messages)
        },
        async getAll(){
            const res = await request("get", "channel/all")
            if (res.status !== 200) return false
            this.channelList = res.channels
            return res.channels
        },

        connect(id){
            this.ws = new WebSocket(`ws://localhost:3001/ws/${id}`)
        },
        sendMessage(data){
            this.ws.send(JSON.stringify(data))
        },
        recieveMessageWatcher(){
            this.ws.onmessage = (event) => {
                this.messages.push(JSON.parse(event.data))
            };
        }

    }
})

export default channelStore