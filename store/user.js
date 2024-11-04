import { defineStore } from 'pinia'
import request from "@/lib/repository"
const userStore = defineStore('user', {
  state:  () => ({ user: null }),

  actions: {
    async signin({username, password}){
      const res = await request("post", "user/login", {
        body: {
          username,
          password
        }
      })
      console.log(res)
      if (res.status !== 200) {
        return {status: res.status, message: res.message}
      }
      this.token = res.token
      this.user = res.user
      this.user.profileImage = res.user.profileImage || "default-avatar.jpg"
      // const cookie = setCookie()
      // setCookie(res, "token", res.token, {
      //   maxAge: res.exp,
      //   sameSite: 'strict'
      // })
      const tokenCookie = useCookie('token', {
        maxAge: res.exp,
        sameSite: 'strict'
      })
      tokenCookie.value = res.token
      
      return {status: res.status, message: res.message}
    },
    async signup({username, password}){
      const { status, message } = await request("post", "user/register", {
        body: {
          username,
          password
        }
      })
      return { status, message }
    },
    async session(){
      const token = useCookie("token")
      if (!token) return false
      const res = await request("get", "user/session")
      if (res.user) {
        this.user = res.user
        return true
      }
      return false
    }
  }
})

export default userStore