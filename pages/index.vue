<script setup>
import useUserStore from "@/store/user"
import { useRouter } from "vue-router"

const router = useRouter()
const store = useUserStore()

const username = ref("")
const password = ref("")
const error = reactive({
    status: null,
    message: ""
})
const waiting = ref(false)

const signin = async () => {
    waiting.valueOf = true
    const { status, message } = await store.signin({ username: username.value, password: password.value })
    if (status) waiting.value = false
    if (status == 200) router.push("/in")
    else error = { message, status }
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
            <Message style="margin-bottom: 20px;" v-if="error.message"
                :severity="error.status == 200 ? 'success' : 'error'">{{ error.message }}</Message>
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
                    <Button :disabled="waiting ? true : false" type="submit" class="submit-btn" label="Sign In"
                        severity="success" raised size="large" />
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