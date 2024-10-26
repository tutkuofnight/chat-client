<script>
import Channel from "../../components/Channel.vue";
import MemberCard from "../../components/MemberCard.vue";
export default {
    components: {
        Channel,
        MemberCard,
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
            user: {
                username: "tutkuofnight",
                id: 1,
                avatar: "GW3q7jcW8AAQWgb.jpeg"
            },
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
                                <Channel :channel="channel" :previewUsers="false" />
                            </template>
                        </TabPanel>
                        <TabPanel value="1">
                            <template v-for="channel in channels">
                                <Channel :channel="channel" :previewUsers="false" />
                            </template>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </SplitterPanel>
            <SplitterPanel :size="100" class="chat">
                <div class="channel-header">
                    <Button icon="pi pi-arrow-left" severity="secondary" raised @click="$router.go(-1)" />
                    <p class="title">{{ channel.name }}</p>
                    <div></div>
                </div>
                <ScrollPanel style="width: 100%; height: 100%" class="messages-area">
                    <div class="message-list">
                        <div class="message-wrapper">
                            <div class="message">
                                <div>
                                    <Avatar :image="`/images/${user.avatar}`"
                                        :label="!user.avatar ? user.username[0] : null" shape="circle" />
                                </div>
                                <div class="content">
                                    <div class="content-top">
                                        <div class="username">{{ user.username }}</div>
                                        <div class="date"></div>
                                    </div>
                                    <div class="text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus enim
                                        quae
                                        magni
                                        inventore corrupti culpa, ratione error quos esse maxime repudiandae reiciendis
                                        fuga
                                        voluptatibus eaque aspernatur veritatis ducimus odio consequatur!
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="message-wrapper">
                            <div class="message my-message">
                                <div>
                                    <Avatar :image="`/images/${user.avatar}`"
                                        :label="!user.avatar ? user.username[0] : null" shape="circle" />
                                </div>
                                <div class="content">
                                    <div class="content-top">
                                        <div class="username">{{ user.username }}</div>
                                        <div class="date"></div>
                                    </div>
                                    <div class="text">
                                        asdasdasdasdasdasdasdasd
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </ScrollPanel>
                <div class="chat-input">
                    <InputText size="large" type="text" placeholder="Text here.." v-model="text" variant="filled" />
                    <Button size="large" icon="pi pi-send" severity="secondary" raised />
                </div>
            </SplitterPanel>
            <SplitterPanel :size="50">
                <h3 style="height: 48px;">Members</h3>
                <div class="member-list">
                    <MemberCard :user="user" />
                </div>
            </SplitterPanel>
        </Splitter>
    </div>
</template>

<style lang="scss">
.p-tablist-tab-list {
    background: none;
}

.p-tabpanels {
    background: none;
    padding: 20px 0 !important;
}

.p-tabpanel {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.member-list {
    margin-top: 20px;
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
.chat {
    display: flex;
    flex-direction: column;
    .messages-area {
        flex: 1;
    }
}
.channel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    .title {
        font-weight: bold;
        font-size: 24px;
    }
}
.message-list {
    width: 100%;

}
.messages-area {
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .message-wrapper {
        width: 100%;
        position: relative;
        margin-bottom: 20px;
    }

    .message {
        display: flex;
        gap: 10px;
        width: 60%;

        &.my-message {
            flex-direction: row-reverse;
            position: absolute;
            right: 0;

            .content-top {
                flex-direction: row-reverse
            }
        }

        .content-top {
            display: flex;
            justify-content: space-between;
        }

        .username,
        .date {
            font-size: 12px;
            color: lightgray;
            margin-bottom: 5px;
        }

        .text {
            font-size: 14px;
            border-radius: 6px;
            background: var(--item-background);
            padding: 15px;
        }
    }

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