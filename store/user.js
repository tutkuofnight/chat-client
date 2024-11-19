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
      
      if (res.status !== 200) {
        return {status: res.status, message: res.message}
      }

      this.token = res.token
      this.user = res.user
      this.user.profileImage = res.user.profileImage || "default-avatar.jpg"

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
    },
    async updateProfileImage(file) {
      const formData = new FormData()
      console.log(file)
      formData.append("profileImage", file)
      
      // const res = await request("post", "user/update-profile-image", {
      //   body: formData
      // })
      const res = await fetch("http://localhost:3001/user/update-profile-image", {
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: "POST",
        credentials: 'include'
      })
      if (res.status !== 200) {
        console.log("yuklenmedi knk")
      }
      return res
    }
  }
})

export default userStore
