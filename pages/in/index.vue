
<script>
export default {
  data(){
    return {
      joinChannelDialog: false,
      joinChannelId: null
    }
  },
  methods: {
    joinChannel(){
      this.joinChannelDialog = false
      this.$router.push('/in/' + this.joinChannelId)  
    }
  }   
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

    <Dialog v-model:visible="joinChannelDialog" modal header="Edit Profile" :style="{ width: '25rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Enter Channel ID</span>
      <div class="flex items-center gap-4 mb-4">
        <label for="channelId" class="font-semibold w-24">Channel ID</label>
        <InputText v-model="joinChannelId" id="channelId" class="flex-auto" autocomplete="off" />
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