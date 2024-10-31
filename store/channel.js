import { defineStore } from "pinia"
import request from "@/lib/repository"
const channelStore = defineStore("channel", {
    state: () => ({
        currentChannel: null,
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
            this.currentChannel = res.channel   
        },
    }
})

export default channelStore