<template>
  <div id="home">
    <input type="text" v-model="userName"> 
    <input type="password" v-model="userPw">
    <button @click="login">로그인</button>
  </div>
</template>

<script>
import {authAPI} from '@/api'

export default {
  data() {
    return {
      userName: '1234',
      userPw: 'pw1234'
    }
  },
  methods: {
    login() {
      authAPI({
        method:'post',
        url:'/login',
        data:{
          client_id:1,
          username:this.userName,
          password:this.userPw 
        }
      }).then((data) =>{
        // window.alert('로그인성공')
        localStorage.setItem('token',data.token)
        this.$router.push('/')
      })
      .catch(() => {
        window.alert('로그인실패')
      })
    }
  }
}
</script>

<style>

</style>