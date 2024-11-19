<script setup>
import useChannelStore from "@/store/channel"
const type = defineProps(['type'])
const channelStore = useChannelStore()
const inviteLink = ref('')
const visible = ref(false)
const linkCreatedStatus = ref(false)
const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink.value)
    copiedMessage()
}
const createInviteLink = async () => {
    const { status, message } = await channelStore.createInviteLink()
    if (status == 200) {
        linkCreatedStatus.value = true
        toast.add({ severity: 'success',  })
    }
}

const dateSetter = (value) => {
    let date = new Date()
    date.setHours(value)
    return date
}

const selectedExp = ref();
const times = ref([
    { name: '1 Hours', code: dateSetter(1) },
    { name: '3 Hours', code: dateSetter(3) },
    { name: '5 Hours', code: dateSetter(5) },
    { name: '10 Hours', code: dateSetter(10) },
    { name: 'Never', code: 'never' }
]);

onMounted(() => {
    if (visible.value) {
        inviteLink.value = window.location.origin + '/join/' + channelStore.channel.id
    }
})

import { useToast } from "primevue/usetoast";
const toast = useToast();

const copiedMessage = () => {
    toast.add({ severity: 'success', summary: 'Copied!', detail: 'Invite link copied to clipboard', life: 3000 });
};
</script>

<template>
    <Button label="Invite Friends" icon="pi pi-user-plus" severity="secondary" @click="visible = true" />
    <Toast />
    <Dialog v-model:visible="visible" modal header="Create Invite Link" :style="{ width: '35rem' }">
        <div class="link-area" v-if="linkCreatedStatus">
            <div class="link">
                {{ inviteLink }}
            </div>
            <Button icon="pi pi-copy" class="copy-btn" severity="secondary" @click="copyToClipboard()" />
        </div>
        <Select style="width: 100%; margin-bottom: 20px;" v-model="selectedExp" :options="times" optionLabel="name" placeholder="Select Expire Time" />
        <div class="bottom">
            <Button label="Close" severity="secondary"  />
            <Button label="Create Link" @click="createInviteLink" v-if="!linkCreatedStatus" />
        </div>
    </Dialog>
</template>

<style lang="scss" scoped>
.link-area {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    background: black;
    padding: 0px 5px;
    padding-left: 15px;
    border-radius: 6px;
    border: 0.5px solid var(--p-surface-700);
    margin-bottom: 10px;
    .link {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .copy-btn {
        background: none;
        border: none;
        &:hover {
            background: none;
            border: none;
        }
    }
}
.bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
}
</style>