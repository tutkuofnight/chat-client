<script setup>
const { message } = defineProps(['message'])
import useUserStore from "@/store/user"
const userStore = useUserStore()
</script>


<template>
    <div class="message" :class="{ 'my-message': message.User.Id == userStore.user.id }">
        <div>
            <Avatar :image="`/images/${message.User.profile_image || 'default-avatar.jpg'}`" shape="circle" />
        </div>
        <div class="content">
            <div class="content-top">
                <div class="username">{{ message.User.username }}</div>
                <div class="date"></div>
            </div>
            <div class="text">
                {{ message.text }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.message {
    display: flex;
    gap: 10px;
    width: 60%;

    &.my-message {
        width: 100%;
        flex-direction: row-reverse;

        .content-top {
            flex-direction: row-reverse
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
</style>