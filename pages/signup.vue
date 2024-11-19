<script setup>
import useUserStore from "@/store/user"
import { useRouter } from "vue-router"

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { loginSchema } from "@/lib/validation-schemas"

const router = useRouter()

const error = reactive({
    status: null,
    message: ""
})
const waiting = ref(false)

const { errors, defineField, values } = useForm({
    validationSchema: toTypedSchema(loginSchema),
})
const [username, usernameAttrs] = defineField('username')
const [password, passwordAttrs] = defineField('password')
const [matchPassword, matchPasswordAttrs] = defineField('matchPassword')

const signup = async () => {
    waiting.value = true
    if (password.value !== matchPassword.value) {
        return error = {
            status: 404,
            message: "Password is not matched"
        }
    }
    if (Object.keys(values).length == 0 || Object.keys(errors).length > 0){
        return waiting.value = false
    }

    const store = useUserStore()
    const { status, message } = await store.signup({ username: username.value, password: password.value })
    error = { status, message }
    
    if (status) {
        this.waiting = false
    }
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
                        <InputText id="username" v-model="username" v-bind="usernameAttrs" />
                        <label for="username">Username</label>
                    </FloatLabel>
                    <FloatLabel variant="in">
                        <Password v-model="password" v-bind="passwordAttrs" toggleMask />
                        <label for="password">Password</label>
                    </FloatLabel>
                    <FloatLabel variant="in">
                        <Password v-model="matchPassword" v-bind="matchPasswordAttrs" toggleMask />
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