<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const joinChannelDialog = ref(false)
const joinChannelId = ref(null)

const joinChannel = () => {
  joinChannelDialog.value = false
  router.push(`/in/${joinChannelId.value}`)
}
</script>

<template>
  <NuxtLayout name="chat">

    <section class="page-in">
      <NuxtImg src="/chat.png" width="150" height="150" />
      <h1>Yo! Welcome to GoChat little gopher</h1>
      <h3>Choose One:</h3>
      <div class="buttons">
        <Button size="large" label="Create" icon="pi pi-plus" />
        <Button size="large" label="Join" icon="pi pi-link" @click="joinChannelDialog = true" />
      </div>
    </section>

    <Dialog v-model:visible="joinChannelDialog" modal header="Join Chanel" :style="{ width: '25rem' }" class="">
      <div class="flex items-center gap-4 mb-4">
        <InputText v-model="joinChannelId" placeholder="Enter Channel ID" id="channelId" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
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