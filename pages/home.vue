<script>
import Channel from "@/components/Channel.vue"
import Profile from "@/components/Profile.vue";
export default {
    data() {
        return {
            searchChannel: "",
            user: {
                username: "tutkuofnight",
                id: 1,
                avatar: "GW3q7jcW8AAQWgb.jpeg"

            },
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
            filteredChannels: [],
            fullRooms: false,
            searchText: "",
            inviteModal: false,
            createChannelModal: false,
            test: null,
            createChannel: {
                name: "",
                maxMembers: null
            },
            inviteLink: "",
            filterTab: "" // "" = All channels | "my-channels" = My created channels | "joined-channels" = My joined channels
        }
    },
    watch: {
        searchText(val) {
            this.filterChannels("search", val)
        },
        fullRooms(val) {
            val ? this.filterChannels("hide-full-rooms") : this.filterChannels()
        }

    },
    components: {
        Channel, Profile
    },
    methods: {
        filterChannels(filterType, filterText) {
            switch (filterType) {
                case "search":
                    this.filteredChannels = this.channels.filter(chan => chan.name.includes(filterText))
                    break
                case "hide-full-rooms":
                    this.filteredChannels = this.channels.filter(chan => chan.onlineCount !== chan.totalJoiners)
                    break
                case "my-channels":
                    this.filteredChannels = this.channels.filter(chan => chan.creatorId == this.user.id)
                    break
                case "joined-channels":
                    this.filteredChannels = this.channels.filter(chan => chan.joiners.includes(this.user.id))
                default:
                    this.filteredChannels = this.channels
                    break
            }
        },
        tabListener(key) {
            this.filterTab == key ? this.filterTab = "" : this.filterTab = key
            this.filterChannels(this.filterTab)
        },
    },
    created() {
        this.filteredChannels = this.channels
    }
}
</script>

<template>
    <main>
        <header>
            <div>
                <h1 class="logo">GoChat</h1>
            </div>
            <div>
                <Button severity="contrast" icon="pi pi-sign-out" rounded label="Logout" />
            </div>
        </header>
        
        <Dialog v-model:visible="inviteModal" modal header="Paste Your Invite Link" :style="{ width: '400px' }">
            <div>
                <InputText v-model="inviteLink" style="width: 100%;" id="link" class="flex-auto" autocomplete="off"
                    placeholder="Paste here..." />
            </div>
            <div class="dialog-bottom">
                <Button type="button" label="Cancel" severity="secondary" @click="inviteModal = false"></Button>
                <Button type="button" label="Join" @click="inviteModal = false"></Button>
            </div>
        </Dialog>

        <Dialog v-model:visible="createChannelModal" modal header="Create a Channel" :style="{ width: '400px' }">
            <div class="create-channel-form">
                <InputText v-model="createChannel.name" id="channel-name" class="flex-auto" autocomplete="off" placeholder="Channel Name" />
                <InputMask v-model="createChannel.maxMembers" id="max-members" mask="99" placeholder="Max Members" />
            </div>
            <div class="dialog-bottom">
                <Button type="button" label="Cancel" severity="secondary" @click="createChannelModal = false"></Button>
                <Button type="button" label="Save" @click="createChannelModal = false"></Button>
            </div>
        </Dialog>

        <Profile :user="user" @showInviteModal="(event) => inviteModal = event" @showCreateChannelModal="(event) => createChannelModal = event" />
        
        <section class="app-filter">
            <div class="search">
                <IconField>
                    <InputIcon class="pi pi-search" />
                    <InputText id="in_label" v-model="searchText" autocomplete="off" variant="filled"
                        placeholder="Search.." />
                </IconField>
                <div class="flex items-center">
                    <Checkbox v-model="fullRooms" inputId="rooms" :binary="true" />
                    <label for="rooms" class="ml-2" style="user-select: none;"> Hide full rooms </label>
                </div>
            </div>
            <div class="tabs">
                <Button :outlined="filterTab == 'my-channels' ? false : true" label="My Channels"
                    @click="tabListener('my-channels')" />
                <Button :outlined="filterTab == 'joined-channels' ? false : true" label="Joined Channels"
                    @click="tabListener('joined-channels')" />
            </div>
        </section>

        <section class="channel-list">
            <template v-for="(channel) in filteredChannels">
                <Channel :channel="channel" />
            </template>
        </section>

    </main>
</template>

<style lang="scss" scoped>
.logo {
    color: var(--p-primary-400);
}

main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: baseline;
    align-items: center;
    flex-direction: column;
}

header {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .right {
        display: flex;
        align-items: center;
        gap: 10px;

        .profile-popover {
            cursor: pointer;
        }

        .p-avatar {
            width: 38px;
            height: 38px;
        }
    }
}
.create-channel-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.app-filter {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .search {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .tabs {
        display: flex;
        gap: 10px;

        .p-button {
            &:first-child {
                border-top-left-radius: 2rem;
                border-bottom-left-radius: 2rem;
            }

            &:last-child {
                border-top-right-radius: 2rem;
                border-bottom-right-radius: 2rem;
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

@media (min-width: 991px) {
    $width: 991px;

    header {
        width: $width;
        padding: 0;
    }

    .app-filter,
    .channel-list,
    .profile {
        width: $width;
    }
}
</style>