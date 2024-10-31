<script>
import useUserStore from "@/store/user"
export default {
    data() {
        return {
            username: "",
            password: "",
            error: {
                status: null,
                message: ""
            },
            waiting: false
        }
    },
    methods: {
        async signin(){
            this.waiting = true
            const store = useUserStore()
            const { status, message } = await store.signin({username: this.username, password: this.password})
            if (status) this.waiting = false
            if(status == 200)
                this.$router.push("/in")
            else this.error = { message,status }
        }
    }
}
</script>

<template>
    <main class="auth-page">
        <div class="auth">
            <div>
                <NuxtImg src="/chat.png" width="150" height="150" />
                <h1>GoChat</h1>
            </div>
            <h3>Sign In</h3>
            <Message style="margin-bottom: 20px;" v-if="error.message" :severity="error.status == 200 ? 'success' : 'error'">{{ error.message }}</Message>
            <form @submit.prevent="signin()">
                <div class="auth-card">
                    <FloatLabel variant="in">
                        <InputText id="username" v-model="username" />
                        <label for="username">Username</label>
                    </FloatLabel>
                    <FloatLabel variant="in">
                        <Password v-model="password" toggleMask />
                        <label for="password">Password</label>
                    </FloatLabel>
                </div>
                <div class="bottom">
                    <Button type="submit" class="submit-btn" label="Sign In" severity="success" raised size="large" />
                    <div class="redirect-link">
                        <NuxtLink to="/signup">Create account</NuxtLink>
                    </div>
                </div>
            </form>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@import url("~/assets/scss/auth.scss");
</style>