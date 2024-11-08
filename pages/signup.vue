<script setup>
import useUserStore from "@/store/user"
import { useRouter } from "vue-router"

const router = useRouter()
const store = useUserStore()

const username = ref("")
const password = ref("")
const matchPassword = ref("")
const error = reactive({
    status: null,
    message: ""
})
const waiting = ref(false)

const signup = async () => {
    waiting.valueOf = true
    if (password.value !== matchPassword.value) {
        return error = {
            status: 404,
            message: "Password is not matched"
        }
    }
    const store = useUserStore()
    const { status, message } = await store.signup({ username: username.value, password: password.value })
    error = { status, message }
    if (status) this.waiting = false
    if (status == 300) {
        setTimeout(() => {
            router.push("/")
        }, 500)
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
            <h3>Create Account</h3>
            <Message style="margin-bottom: 20px;" v-if="error.message.length > 0"
                :severity="error.status == 200 ? 'success' : 'error'">{{ error.message }}</Message>
            <form @submit.prevent="signup()">
                <div class="auth-card">
                    <FloatLabel variant="in">
                        <InputText id="username" v-model="username" />
                        <label for="username">Username</label>
                    </FloatLabel>
                    <FloatLabel variant="in">
                        <Password v-model="password" toggleMask />
                        <label for="password">Password</label>
                    </FloatLabel>
                    <FloatLabel variant="in">
                        <Password v-model="matchPassword" toggleMask />
                        <label for="matchPassword">Confirm Password</label>
                    </FloatLabel>
                </div>
                <div class="bottom">
                    <Button :disabled="waiting ? true : false" class="submit-btn" type="submit" label="Sign Up"
                        severity="success" raised size="large" />
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