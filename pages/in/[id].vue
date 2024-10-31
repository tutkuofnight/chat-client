<script>
import Channel from "../../components/Channel.vue";
import MemberCard from "../../components/MemberCard.vue";
import useSocketStore from "~/store/socket";
import useChannelStore from "~/store/channel";
import useUserStore from "~/store/user";
import { useRoute } from 'vue-router'
export default {
    components: {
        Channel,
        MemberCard,
    },
    data() {
        return {
            text: ""
        }
    },
    methods: {

    },
    async setup(){
        const route = useRoute()    
        const id = route.params.id
        const channelStore = useChannelStore()
        const socketStore = useSocketStore()
        const userStore = useUserStore()
        const err = await channelStore.getChannel(id)
        if (!err) socketStore.connect(id)
        return { socket: socketStore, channel: channelStore, user: userStore }
    }
    
}
</script>   
<template>
    <NuxtLayout name="chat">

        <div class="channel-header">
            <Button icon="pi pi-arrow-left" severity="secondary" raised @click="$router.go(-1)" />
            <p class="title">{{ channel.currentChannel.name }}</p>
            <div></div>
        </div>

        <ScrollPanel style="width: 100%; height: 100%" class="messages-area">
            <div class="message-list">
                <div class="message-wrapper">
                    <div class="message">
                        <div>
                            <Avatar :image="`/images/${user.avatar}`" :label="!user.avatar ? user.username : null"
                                shape="circle" />
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
                            <Avatar :image="`/images/${user.avatar}`" :label="!user.avatar ? user.username : null"
                                shape="circle" />
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

    </NuxtLayout>
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

.p-iconfield {
    width: 100%;
}

.app-filter {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-direction: column;

    .search {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .tabs {
        display: flex;
        gap: 10px;
        width: 100%;
        justify-content: space-between;
    }
}

.channel-list {
    width: 100%;
    margin-top: 20px;
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

        // section {
        //     width: 30%;

        //     &:first-child {
        //         border-right: 0.5px solid rgb(34, 34, 34);
        //     }

        //     &:last-child {
        //         border-left: 0.5px solid rgb(34, 34, 34);
        //     }
        // }

    }
}
</style>