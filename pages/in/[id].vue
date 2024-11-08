<script setup>
import useChannelStore from "~/store/channel";
import useUserStore from "~/store/user";
import { useRoute } from 'vue-router'
import { onMounted, onDeactivated } from "vue";

const route = useRoute()
const id = route.params.id
const channelStore = useChannelStore()
const userStore = useUserStore()
const err = await channelStore.getChannel(id)
if (!err) channelStore.connect(id)

const text = ref("")
const handleMessageText = () => {
    channelStore.sendMessage({
        text: text.value,
        user: userStore.user
    })
    text.value = ""
}

onMounted(() => this.channelStore.recieveMessageWatcher())
onDeactivated(() => {
    window.addEventListener("beforeunload", () => {
        if (channelStore.ws) {
            channelStore.ws.close()
        }
    })
})
</script>

<template>
    <NuxtLayout name="chat">
        <ScrollPanel style="width: 100%; height: 100%" class="messages-area">
            <div class="message-list">
                <div class="message-wrapper" v-for="(msg, index) in channelStore.messages" :key="index">
                    <ChatMessage :message="msg" />
                </div>
            </div>

        </ScrollPanel>

        <form @submit.prevent.enter="handleMessageText()" class="chat-input">
            <InputText size="large" type="text" placeholder="Text here.." v-model="text" variant="filled" />
            <Button type="submit" size="large" icon="pi pi-send" severity="secondary" raised />
        </form>

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
    display: flex;
    flex-direction: column;
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