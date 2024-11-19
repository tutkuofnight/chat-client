<script setup>
useHead({
  title: "GoChat | Live Chatting Platform"
})
import { useRouter } from 'vue-router'
import useChannelStore from "@/store/channel"
const router = useRouter()
const channelStore = useChannelStore()
const joinChannelDialog = ref(false)
const joinChannelId = ref(null)

const joinChannel = () => {
  joinChannelDialog.value = false
  router.push(`/in/${joinChannelId.value}`)
}

const createChannelDialog = ref(false)
const channelName = ref("")

const createChannel = async () => {
  const res = await channelStore.create(channelName.value)
  if (res) {
    createChannelDialog.value = false
  }
}
</script>

<template>
  <NuxtLayout name="chat">
    <Toast />
    <section class="page-in">
      <NuxtImg src="/chat.png" width="150" height="150" />
      <h1>Yo! Welcome to GoChat little gopher</h1>
      <h3>Choose One:</h3>
      <div class="buttons">
        <Button size="large" label="Create" icon="pi pi-plus" @click="createChannelDialog = true" />
        <Button size="large" label="Join" icon="pi pi-link" @click="joinChannelDialog = true" />
      </div>
    </section>

    <Dialog v-model:visible="createChannelDialog" modal header="Create Channel" :style="{ width: '25rem' }" class="">
      <div>
        <InputText v-model="channelName" placeholder="Enter Channel Name" id="channelId" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex-end">
        <Button type="button" label="Cancel" severity="secondary" @click="createChannelDialog = false"></Button>
        <Button type="button" label="Create" @click="createChannel()"></Button>
      </div>
    </Dialog>

    <Dialog v-model:visible="joinChannelDialog" modal header="Join Channel" :style="{ width: '25rem' }" class="">
      <div>
        <InputText v-model="joinChannelId" placeholder="Paste your join link" id="channelId" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex-end">
        <Button type="button" label="Cancel" severity="secondary" @click="joinChannelDialog = false"></Button>
        <Button type="button" label="Join" @click="joinChannel()"></Button>
      </div>
    </Dialog>

  </NuxtLayout>
</template>

<style lang="scss" scoped>
.page-in {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    height: 100vh;
    width: 100%;
    gap: 20px;
    .buttons {
        display: flex;
        gap: 20px;
    }
}
</style>