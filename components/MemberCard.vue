<script setup>
import { computed } from "vue"
import useChannelStore from "~/store/channel"

const { member } = defineProps(["member"])
const channelStore = useChannelStore()

console.log(member.id, channelStore.channel.authorId)
const memberRole = computed(() => {
    return member.id == channelStore.channel.authorId  ? "Owner" : "Member"
})
</script>

<template>
    <div class="member-card" :class="{'owner': member.id == channelStore.channel.authorId}">
        <div class="profile">
            <!-- <Avatar :image="`/images/${member.profileImage || 'default-avatar.jpg'}`" shape="circle" /> -->
            <p>@{{ member.username }}</p>
        </div>
        <small class="role">
            {{ memberRole }}
        </small>
    </div>
</template>

<style lang="scss" scoped>
.member-card {
    padding: 20px;
    border-radius: 6px;
    border: 0.5px solid gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--item-background);
    &.owner {
        border-color: cadetblue;
        .role {
            color: cadetblue;
        }
    }
    .profile {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .role {
        color: rgb(185, 185, 185);
    }
}
</style>