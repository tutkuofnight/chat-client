<script>
import Channel from "@/components/Channel.vue"
export default {
    data() {
        return {
            searchChannel: "",
            user: {
                username: "tutkuofnight",
                id: 1
            },
            channels: [
                {
                    name: "birinci kanal",
                    onlineCount: 12,
                    totalJoiners: 30,
                    maxJoinerCount: 50,
                    creatorId: 1,
                    joiners: [2]
                },
                {
                    name: "tutkunun yeri",
                    onlineCount: 2,
                    totalJoiners: 2,
                    maxJoinerCount: 2,
                    creatorId: 2,
                    joiners: [1]
                },
                {
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
            filterTab: "" // "" = All channels | "my-channels" = My created channels | "joined-channels" = My joined channels
        }
    },
    watch: {
        searchText(val){
            this.filterChannels("search", val)
        },
        fullRooms(val){
            val ? this.filterChannels("hide-full-rooms") : this.filterChannels()
        }

    },
    components: {
        Channel
    },
    methods: {
        filterChannels(filterType, filterText) {
            switch (filterType) {
                case "search":
                    this.filteredChannels = this.channels.filter(chan => chan.name.includes(filterText))
                    break
                case "hide-full-rooms":
                    this.filteredChannels =  this.channels.filter(chan => chan.onlineCount !== chan.totalJoiners)
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
        tabListener(key){
            this.filterTab == key ? this.filterTab = "" : this.filterTab = key
            this.filterChannels(this.filterTab)
        }
    },
    created(){
        this.filteredChannels = this.channels
    }
}
</script>

<template>
    <main>
        <header>
            <div>
                <h1>GoChat</h1>
            </div>
            <div>
                <Button severity="contrast" icon="pi pi-sign-out" rounded label="Logout" />
            </div>
        </header>
        <section class="profile">
            <div class="profile-area">
                <Avatar label="T" size="xlarge" shape="circle" />
                <div class="profile-info">
                    <span class="username">@{{ user.username }}</span>
                    <div class="options">
                        <Button severity="contrast" icon="pi pi-cog" rounded label="Settings" />
                        <Button label="Create Channel" icon="pi pi-plus" rounded />
                    </div>
                </div>
            </div>
        </section>
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
                <Button :severity="filterTab == 'my-channels' ? 'contrast' : ''" label="My Channels" @click="tabListener('my-channels')" />
                <Button :severity="filterTab == 'joined-channels' ? 'contrast' : ''" label="Joined Channels" @click="tabListener('joined-channels')" />
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

.profile {
    width: 100%;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    &-area {
        display: flex;
        gap: 20px;
        align-items: center;
        width: 100%;

        .profile-info {
            display: flex;
            flex-direction: column;
            gap: 10px;
            flex: 1;
        }

        .username {
            font-size: 20px;
        }

        .options {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        }
    }

    .p-avatar-xl {
        width: 120px;
        height: 120px;
        font-size: 4rem;
    }
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

    &>.channel-card {
        margin-bottom: 20px;
    }
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