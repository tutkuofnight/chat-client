<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>
<template>
    <div class="member-card">
        <div class="profile">
            <Avatar :image="`/images/${user.avatar}`" :label="!user.avatar ? user.username : null" shape="circle" />
            <p>@{{ user.username }}</p>
        </div>
        <div class="role">
            Member
        </div>
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
}
</style>