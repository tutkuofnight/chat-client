<script>
export default {
    data() {
        return {
            username: "",
            email: "",
            password: ""
        }
    },
    methods: {

    }
}
</script>

<template>
    <main class="auth-page">
        <div class="auth">
            <h1>GoChat</h1>
            <h3>Sign In</h3>
            <form>
                <div class="auth-card">
                    <FloatLabel variant="in">
                        <InputText id="username" v-model="username" />
                        <label for="username">Username</label>
                    </FloatLabel>
                    <FloatLabel variant="in">
                        <InputText id="email" v-model="email" />
                        <label for="email">Email</label>
                    </FloatLabel>
                    <FloatLabel variant="in">
                        <Password v-model="password" toggleMask />
                        <label for="password">Password</label>
                    </FloatLabel>
                </div>
                <div class="bottom">
                    <Button class="submit-btn" label="Sign In" severity="success" raised size="large" />
                    <div class="redirect-link">
                        <NuxtLink to="/">Do you have account? Sign In</NuxtLink>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<style lang="scss">
@import url("~/assets/scss/auth.scss");
</style>