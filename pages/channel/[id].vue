<script>
import Channel from "../../components/Channel.vue";
export default {
    components: {
        Channel
    },
    data() {
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
    created() {
        this.channel = this.channels.find(chan => chan.id == this.$route.params.id)
    }
}
</script>
<template>
    <div class="chat-template">
        <Splitter>
            <SplitterPanel :size="50" :minSize="10">
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
            </SplitterPanel>
            <SplitterPanel :size="100">
                <div class="channel-header">
                    <Button icon="pi pi-arrow-left" severity="secondary" raised />
                    <p class="title">{{ channel.name }}</p>
                    <div></div>
                </div>
                <div class="messages-area">

                </div>
                <div class="chat-input">
                    <InputText type="text" placeholder="Text here.." v-model="text" variant="filled" />
                    <Button icon="pi pi-send" severity="secondary" raised />
                </div>
            </SplitterPanel>
            <SplitterPanel :size="50">
                <h2>Members</h2>
            </SplitterPanel>
        </Splitter>
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
    .router-link {
        margin-bottom: 20px;
    }
}

.chat-template {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;

    main {
        flex: 1;
        position: relative;



    }
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

.messages-area {
    height: 85%;
}

.chat-input {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    gap: 10px;

    .p-inputtext {
        width: 100%;
    }
}

.p-splitter {
    height: 100vh;
}
.p-splitterpanel {
    padding: 20px;
}
@media (min-width: 991px) {
    .chat-template {

        section {
            width: 30%;

            &:first-child {
                border-right: 0.5px solid rgb(34, 34, 34);
            }

            &:last-child {
                border-left: 0.5px solid rgb(34, 34, 34);
            }
        }

        main,
        section {
            padding: 20px;
        }
    }
}
</style>