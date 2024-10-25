<script>
export default {
    props: {
        user: { type: Object, required: true }
    }
}
</script>
<template>
    <section class="profile">
        <div class="profile-area">
            <Avatar label="T" size="xlarge" shape="circle" />
            <div class="profile-info">
                <span class="username">@{{ user.username }}</span>
                <div class="options">
                    <Button severity="contrast" icon="pi pi-cog" rounded label="Settings" />
                    <div class="options-right">
                        <Button label="Create" icon="pi pi-plus" rounded />
                        <Button label="Join" icon="pi pi-link" rounded @click="this.$emit('showInviteModal', true)" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.profile {
    width: 100%;
    margin: 40px 0 60px;
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

            &-right {
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
    }

    .p-avatar-xl {
        width: 120px;
        height: 120px;
        font-size: 4rem;
    }
}
</style>