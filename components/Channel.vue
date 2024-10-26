<script>
export default {
    props: {
        channel: Object,
        previewUsers: Boolean
    },
    data(){
        return {
            user: {
                username: "tutkuofnight"
            }
        }
    }
}
</script>

<template>
    <NuxtLink :to="`/channel/${channel.id}`">
        <div class="channel-card">
        <div class="channel-info">
            <div class="channel-title">
                <p>{{ channel.name }}</p>
                <span>{{ channel.totalJoiners }}/{{ channel.maxJoinerCount }}</span>
            </div>
            <small>Author: {{ user.username }}</small>
        </div>
        <div class="right">
            <div v-if="previewUsers" class="users">
                <Avatar label="H" class="mr-2" style="background-color: #dee9fc; color: #1a2551" shape="circle" />
                <Avatar label="B" class="mr-2" style="background-color: red; color: white" shape="circle" />
                <Avatar label="T" class="mr-2" style="background-color: purple; color: white" shape="circle" />
                <Avatar label="S" class="mr-2" style="background-color: blue; color: white" shape="circle" />
                <Avatar label="M" class="mr-2" style="background-color: aqua; color: #1a2551" shape="circle" />
                <i class="pi pi-plus" style="font-size: 12px; margin-left: 8px;"></i>
            </div>
            <div class="online-status">
                <div class="icon"></div>
                {{ channel.onlineCount }}
            </div>
        </div>
    </div>
    </NuxtLink>
</template>

<style scoped lang="scss">
.channel-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border: 1px dotted var(--p-primary-400);
    border-radius: 6px;
    transition: 300ms all;
    width: 100%;
    padding: 20px;
    background: var(--item-background);
    &:hover {
        border-style: solid;
    }
    .channel-info {
        .channel-title {
            font-size: 18px;
            font-style: italic;
            display: flex;
            align-items: center;
            gap: 10px;
            span {
                font-weight: bold;
            }
        }
        small {
            color: gray;
        }
    }
    .right {
        display: flex;
        align-items: center;
        gap: 20px;
        .users {
            .p-avatar {
                margin-left: -6px;
            }
        }
    }
    .online-status {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 5px;
        width: 60px;
        font-weight: bold;
        .icon {
            background: var(--p-primary-400);
            width: 7px;
            height: 7px;
            border-radius: 50%;
        }
    }
}
</style>