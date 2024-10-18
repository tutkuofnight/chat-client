<script>
import Channel from "@/components/Channel.vue"
export default {
    data() {
        return {
            searchChannel: "",
            channels: [
                {
                    name: "Channel 1",
                    onlineCount: 12
                },
                {
                    name: "Channel 2",
                    onlineCount: 2
                },
                {
                    name: "Channel 3",
                    onlineCount: 1.253
                }
            ],
            full_rooms: false
        }
    },
    components: {
        Channel
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
                    <span class="username">@tutkuofnight</span>
                    <div class="options">
                        <Button severity="contrast" icon="pi pi-cog" rounded label="Settings" />
                    </div>
                </div>
            </div>
        </section>
        <section class="app-filter">
            <div class="search">
                <IconField>
                    <InputIcon class="pi pi-search" />
                    <InputText id="in_label" v-model="searchChannel" autocomplete="off" variant="filled"
                        placeholder="Search.." />
                </IconField>
                <div class="flex items-center">
                    <Checkbox v-model="full_rooms" inputId="ingredient1" name="full_rooms" value="Cheese" />
                    <label for="ingredient1" class="ml-2"> Filter full rooms </label>
                </div>
            </div>
            <div class="tabs">
                <Button label="Create Channel" icon="pi pi-plus" />
                <Button severity="contrast" label="My Channels" />
                <Button label="Joined Channels" />
            </div>
        </section>

        <section class="channel-list">
            <template v-for="(channel) in channels">
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

        .profile-info {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .username {
            font-size: 20px;
        }

        .options {
            display: flex;
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