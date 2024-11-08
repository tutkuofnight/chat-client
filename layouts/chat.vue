<script setup>
import useUserStore from "~/store/user"
import useChannelStore from "~/store/channel"

import { useRouter } from "vue-router"
import { onMounted } from "vue"

const router = useRouter()
const userStore = useUserStore()
const channelStore = useChannelStore()

const filteredChannels = ref([])
const searchText = ref("")
const createChannel = reactive({
  name: "",
  maxMembers: ""
})
const inviteLink = ref("")
const searchBar = ref("")
const showLogoutInfo = ref(false)
const filterTab = ref("")

const filterChannels = (filterType, filterText) => {
  switch (filterType) {
    case "search":
      filteredChannels.value = this.channels.filter((chan) =>
        chan.name.includes(filterText)
      );
      break;
    case "hide-full-rooms":
      filteredChannels.value = this.channels.filter(
        (chan) => chan.onlineCount !== chan.totalJoiners
      );
      break;
    case "my-channels":
      filteredChannels.value = this.channels.filter(
        (chan) => chan.creatorId == this.user.id
      );
      break;
    case "joined-channels":
      filteredChannels.value = this.channels.filter((chan) =>
        chan.joiners.includes(this.user.id)
      );
    default:
      filteredChannels.value = this.channels;
      break;
  }
}
const tabListener = (key) => {
  filterTab.value == key ? (filterTab.value = "") : (filterTab.value = key);
  filterChannels(filterTab.value);
}
const logout = () => {
  const tokenCookie = useCookie("token")
  tokenCookie.value = null
  return router.push("/")
}

watch(searchText, (val) => {
  filterChannels("search", val);
})

onMounted(async () => {
  const res = await userStore.session()
  if (!res) router.push("/")
  const channels = await channelStore.getAll()
  if (!channels) console.log(channels)
})
</script>

<template>
  <div class="chat-template">
    <Splitter>
      <SplitterPanel :size="25">
        <section class="app-filter">
          <div class="tabs">
            <Button :outlined="filterTab == 'my-channels' ? false : true" label="My Channels"
              @click="tabListener('my-channels')" />
            <Button :outlined="filterTab == 'joined-channels' ? false : true" label="Joined Channels"
              @click="tabListener('joined-channels')" />
            <Button icon="pi pi-search" @click="searchBar = !searchBar" />
          </div>
          <Transition>
            <IconField v-if="searchBar">
              <InputIcon class="pi pi-search" />
              <InputText style="width: 100%; margin-top: 10px" id="in_label" v-model="searchText" autocomplete="off"
                variant="filled" placeholder="Search.." />
            </IconField>
          </Transition>
        </section>

        <section class="channel-list" v-if="channelStore.channelList">
          <template v-for="channel in channelStore.channelList">
            <Channel :channel="channel" />
          </template>
        </section>
      </SplitterPanel>

      <SplitterPanel :size="50" class="chat">
        <Toolbar class="custom-toolbar">
          <template #start>
            <Button outlined @click="logout()" icon="pi pi-sign-out" severity="secondary"
              style="transform: rotate(180deg);"></Button>
          </template>

          <template #center>
            <p v-if="channelStore.channel">{{ channelStore.channel.name }}</p>
            <p v-else>GoChat</p>
          </template>

          <template #end>
            <EditProfile />
          </template>
        </Toolbar>
        <slot />
      </SplitterPanel>

      <SplitterPanel :size="25">
        <h3 style="height: 48px">Members</h3>
        <div class="member-list" v-if="channelStore.channel">
          <template v-for="member in channelStore.channel.users">
            <MemberCard :member="member" />
          </template>
        </div>
      </SplitterPanel>
    </Splitter>

  </div>
</template>

<style lang="scss">
.custom-toolbar {
  border: none !important;
  border-bottom: 1px solid var(--p-toolbar-border-color);
  margin-bottom: 40px;
}

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

    .p-button {
      min-width: 50px;

      &:not(:last-child) {
        width: 100%;
      }
    }
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
  display: flex;
  flex-direction: column;
  gap: 20px;
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

      .content-top {
        flex-direction: row-reverse;
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

@media (min-width: 991px) {}
</style>