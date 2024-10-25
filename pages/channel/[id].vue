<script>
import Channel from "../../components/Channel.vue";
export default {
    components: {
        Channel
    },
    data(){
        return {
            channels: [
            {
                    id: 1,
                    name: "birinci kanal",
                    onlineCount: 12,
                    totalJoiners: 30,
                    maxJoinerCount: 50,
                    creatorId: 1,
                    joiners: [2]
                },
                {
                    id: 2,
                    name: "tutkunun yeri",
                    onlineCount: 2,
                    totalJoiners: 2,
                    maxJoinerCount: 2,
                    creatorId: 2,
                    joiners: [1]
                },
                {
                    id: 3,
                    name: "bosver",
                    onlineCount: 1253,
                    totalJoiners: 2000,
                    maxJoinerCount: 5000,
                    creatorId: 1,
                    joiners: [2]
                }
            ],
            channel: null
        }
    },
    created(){
        // this.channel: ChannelType = this.channels.find(chan => chan.id == this.$route.params.id)
        console.log(this.$route.params.id)
    }
}
</script>
<template>
    <div class="chat-template">
        <section>
            <Tabs value="0">
                <TabList>
                    <Tab value="0">My Channels</Tab>
                    <Tab value="1">Joined Channels</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <template v-for="channel in channels">
                            <Channel :channel="channel" />
                        </template>
                    </TabPanel>
                    <TabPanel value="1">
                        <template v-for="channel in channels">
                            <Channel :channel="channel" />
                        </template>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </section>
        <main>
            <div class="channel-header">
                <Button icon="pi pi-arrow-left" severity="secondary" raised />
                <p class="title">Channel 1</p>
                <div></div>
            </div>
            <div class="chat-input">
                <InputText type="text" v-model="text" variant="filled" />
            </div>
        </main>
        <section>
            <h2>Members</h2>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.p-tablist-tab-list {
    background: none;
}
.p-tabpanels { 
    background: none;
    padding: 20px 0;

}
.p-tabpanel {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.chat-template {
    display: flex;
    flex-direction: column;
    height: 100vh;

    main {
        flex: 1;
    }

    .channel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-weight: bold;
            font-size: 24px;
        }
    }
}

@media (min-width: 991px) {
    .chat-template {
        flex-direction: row;

        section {
            border: 1px solid lime;
            width: 30%;
        }

        main,
        section {
            padding: 20px;
        }
    }
}
</style>