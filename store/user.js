import { defineStore } from 'pinia'
import request from "@/lib/repository"
const userStore = defineStore('user', {
  state:  () => ({ user: null, token: null }),

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
    setToken(token) {
      this.token = token
    },
    update(){}
  }

})

export default userStore