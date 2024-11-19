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
        async create(channelName) {
            const res = await request("post", "channel/create" , {
                body: {
                    name: channelName
                }
            })
            console.log(res)
            if (res.status == 200) {
                this.getAll()
                return true
            }
            return false
        },
        async get(id) {
            this.channel = ""
            this.messages = []
            const res = await request("get", `channel/${id}`)
            if (res.status !== 200) return res
            this.channel = res.channel
            if (res.messages){
                this.messages.push(...res.messages)
            }
        },
        async getAll(){
            const res = await request("get", "channel/all")
            console.log(res)
            if (res.status !== 200) return false
            this.channelList = res.channels
            return res.channels
        },
        async initiateChannels(channels){
            this.channelList = channels
        },
        async createInviteLink(channelId, exp){
            const res = await request("post", "channel/invite/create" , {
                body: {
                    channelId,
                    exp
                }
            })
            console.log(res)
            return res
        },
        getMessageUser(id){
            return this.channel.users.find(user => user.id == id)
        },
        connect(id){
            this.ws = new WebSocket(`ws://localhost:3001/ws/${id}`)
            this.ws.onopen = (event) => {
                if (event){
                    this.ws.send(1)
                }
            }
        },
        sendMessage(data){
            this.ws.send(JSON.stringify(data))
        },
        recieveMessageWatcher(){
            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data)
                console.log(data)
                if (!data.message) {
                    this.onlineMembersCount = data
                } else {
                    this.messages.push(data.message)
                }
            };
        }
    }
})

export default channelStore