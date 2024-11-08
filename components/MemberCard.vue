<script setup>
const { member } = defineProps(["member"])
</script>

<template>
    <div class="member-card">
        <div class="profile">
            <Avatar :image="`/images/${member.profileImage || 'default-avatar.jpg'}`" shape="circle" />
            <p>@{{ member.username }}</p>
        </div>
        <small class="role">
            Member
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