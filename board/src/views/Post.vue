<template>
  <div id="board" >
    <div v-for="item in items" :key="item.id">
      <h2>{{item.title}}</h2>
      <p>{{item.nickname}}</p>
    </div>
    <div v-for="item in items" :key="item.id">
      <p v-html="item.content"></p>
      <p>작성일 : {{date}}</p>
    </div>
    <br><br>
    <button @click="onEdit">수정하기</button>
    <button @click ="onDelete">삭제하기</button>
    <div>
      <br><br><br>
      <Comment></Comment>
    </div>  
  </div>
</template>

<script>
import { boardAPI, authAPI, makeQS } from '@/api'
import moment from 'moment-timezone'
import Comment from '../components/Comment'

export default {
  components:{
    Comment
  },
  data() {return {
    id: this.$route.params.id,
    items:[],
    date:'',
  }},
  created() {
    this.getData()
  },
  mounted() {

  },
  methods: {
    getData() {
      boardAPI({
        method: 'get',
        url: '/post/' + this.id
      }).then(data => {
        this.items = data.result
        var postDate = this.items[0].date_created
        var result = moment(this.items[0].date_created).format('YYYY-MM-DD')
        this.date = result 
        console.log(data.result)   
        console.log(this.id) 
      }).catch(err => {
        console.log('posterror')
      })
    },
    onEdit() {
      this.$router.push('/board/'+ this.id +'/edit')
    },
    onDelete() {
       boardAPI({
         method:'delete',
         url:'/post/' + this.id
       }).then(() => {
         this.$router.push('/board/')
         this.getData()
       }).catch(() => {
         console.log('err')
       })
    }
  }
  // getUser(item) {
  //   authAPI({
  //     method:'get',
  //     auth:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3R5cGUiOjAsImNsaWVudF9pZCI6MSwidXNlcl9pZCI6MSwiaWF0IjoxNTcyMzI3ODk0LCJleHAiOjE1NzI5MzI2OTR9.6_IeSEpvmRtKD55TWib034015gUFTZEqvLkKCeHfJyg',
  //     url:'/user/'+ 1
  //   }).then (data => {
  //     var ret = data.user_result;
  //     console.log(ret)
  //     console.log('ccc')
  //   }).catch(err => {
  //     console.log('ddd')
  //   })
  // },

}
</script>

<style>
  #board {
    margin: 0 auto;
    width: 70%;
  }
</style>