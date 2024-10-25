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
            <Avatar label="T" shape="circle" />
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
    border-radius: 12px;
    border: 0.5px solid gray;
    display: flex;
    align-items: center
}
</style>